
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function get_all_dirty_from_scope($$scope) {
        if ($$scope.ctx.length > 32) {
            const dirty = [];
            const length = $$scope.ctx.length / 32;
            for (let i = 0; i < length; i++) {
                dirty[i] = -1;
            }
            return dirty;
        }
        return -1;
    }
    function null_to_empty(value) {
        return value == null ? '' : value;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_style(node, key, value, important) {
        if (value === null) {
            node.style.removeProperty(key);
        }
        else {
            node.style.setProperty(key, value, important ? 'important' : '');
        }
    }
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? 'add' : 'remove'](name);
    }
    function custom_event(type, detail, bubbles = false) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            while (flushidx < dirty_components.length) {
                const component = dirty_components[flushidx];
                flushidx++;
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.46.4' }, detail), true));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src/components/Header.svelte generated by Svelte v3.46.4 */

    const file$9 = "src/components/Header.svelte";

    function create_fragment$9(ctx) {
    	let div;
    	let span0;
    	let h2;
    	let t1;
    	let span1;
    	let button0;
    	let t3;
    	let button1;
    	let t5;
    	let button2;
    	let t7;
    	let button3;
    	let div_class_value;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div = element("div");
    			span0 = element("span");
    			h2 = element("h2");
    			h2.textContent = "Rahul Gill";
    			t1 = space();
    			span1 = element("span");
    			button0 = element("button");
    			button0.textContent = "Home";
    			t3 = space();
    			button1 = element("button");
    			button1.textContent = "About";
    			t5 = space();
    			button2 = element("button");
    			button2.textContent = "Projects";
    			t7 = space();
    			button3 = element("button");
    			button3.textContent = "Experience";
    			attr_dev(h2, "class", "svelte-1jbgbm7");
    			add_location(h2, file$9, 21, 2, 547);
    			attr_dev(span0, "class", "pre-header-content");
    			set_style(span0, "display", "inline-block");
    			add_location(span0, file$9, 20, 1, 480);
    			attr_dev(button0, "class", "pre-header-content svelte-1jbgbm7");
    			add_location(button0, file$9, 25, 2, 603);
    			attr_dev(button1, "class", "pre-header-content svelte-1jbgbm7");
    			add_location(button1, file$9, 26, 2, 677);
    			attr_dev(button2, "class", "pre-header-content svelte-1jbgbm7");
    			add_location(button2, file$9, 27, 2, 773);
    			attr_dev(button3, "class", "pre-header-content svelte-1jbgbm7");
    			add_location(button3, file$9, 28, 2, 875);
    			attr_dev(span1, "class", "buttons svelte-1jbgbm7");
    			add_location(span1, file$9, 24, 1, 578);
    			attr_dev(div, "class", div_class_value = "header font-changa text-white position-fixed " + (/*scrolledHeader*/ ctx[0] ? 'scrolled-header' : '') + " svelte-1jbgbm7");
    			add_location(div, file$9, 19, 0, 378);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, span0);
    			append_dev(span0, h2);
    			append_dev(div, t1);
    			append_dev(div, span1);
    			append_dev(span1, button0);
    			append_dev(span1, t3);
    			append_dev(span1, button1);
    			append_dev(span1, t5);
    			append_dev(span1, button2);
    			append_dev(span1, t7);
    			append_dev(span1, button3);

    			if (!mounted) {
    				dispose = [
    					listen_dev(button0, "click", scrollToTop, false, false, false),
    					listen_dev(button1, "click", scrollNavigationHandler('about'), false, false, false),
    					listen_dev(button2, "click", scrollNavigationHandler('projects'), false, false, false),
    					listen_dev(button3, "click", scrollNavigationHandler('experience'), false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*scrolledHeader*/ 1 && div_class_value !== (div_class_value = "header font-changa text-white position-fixed " + (/*scrolledHeader*/ ctx[0] ? 'scrolled-header' : '') + " svelte-1jbgbm7")) {
    				attr_dev(div, "class", div_class_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$9.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function scrollNavigationHandler(id) {
    	return () => {
    		let top = document.getElementById(id).getBoundingClientRect().top - document.body.getBoundingClientRect().top;
    		window.scrollTo({ top, behavior: 'smooth' });
    	};
    }

    function scrollToTop() {
    	window.scrollTo({ top: 0, behaviour: 'smooth' });
    }

    function instance$9($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Header', slots, []);
    	let { scrolledHeader } = $$props;
    	const writable_props = ['scrolledHeader'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Header> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('scrolledHeader' in $$props) $$invalidate(0, scrolledHeader = $$props.scrolledHeader);
    	};

    	$$self.$capture_state = () => ({
    		scrolledHeader,
    		scrollNavigationHandler,
    		scrollToTop
    	});

    	$$self.$inject_state = $$props => {
    		if ('scrolledHeader' in $$props) $$invalidate(0, scrolledHeader = $$props.scrolledHeader);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [scrolledHeader];
    }

    class Header extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$9, create_fragment$9, safe_not_equal, { scrolledHeader: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Header",
    			options,
    			id: create_fragment$9.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*scrolledHeader*/ ctx[0] === undefined && !('scrolledHeader' in props)) {
    			console.warn("<Header> was created without expected prop 'scrolledHeader'");
    		}
    	}

    	get scrolledHeader() {
    		throw new Error("<Header>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set scrolledHeader(value) {
    		throw new Error("<Header>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const SVG = {
    	GitHub: 'fab fa-github',
    	Website: 'fas fa-globe'
    };

    function makeBtn(href, name){
    	return { name, href, svg: SVG[name] };
    }

    const ThingsIKnowIconSize = 70;

    const ThingsIKnow = [
    		{
    			text: "Kotlin",
    			icon: `https://img.icons8.com/color/${ThingsIKnowIconSize}/000000/kotlin.png`,
    		},
    		{
    			text: "Android",
    			icon: `https://img.icons8.com/color/${ThingsIKnowIconSize}/000000/android-studio--v3.png`,
    		},
    		{
    			text: "Git",
    			icon: `https://img.icons8.com/color/${ThingsIKnowIconSize}/000000/git.png`,
    		},
    		{
    			text: "Linux",
    			icon: `https://img.icons8.com/color/${ThingsIKnowIconSize}/000000/linux--v1.png`,
    		},
    		{
    			text: "C++",
    			icon: `https://img.icons8.com/color/${ThingsIKnowIconSize}/000000/c-plus-plus-logo.png`,
    		},
    		{
    			text: "Java",
    			icon: `https://img.icons8.com/color/${ThingsIKnowIconSize}/000000/java-coffee-cup-logo--v1.png`,
    		},
    ];

    const SocialLinks = [
    	{ name: 'fab fa-github', url: 'https://github.com/rahul-gill', color: '211f1f' },
    	// { name: 'fab fa-twitter', url: 'https://twitter.com/artisticent001', color: '1da1f2' },
    	{ name: 'fab fa-linkedin-in', url: 'https://www.linkedin.com/in/rahul-gill-466a1620a/', color: '7298da' },
    	// { name: 'fab fa-youtube', url: 'https: //www.youtube.com/channel/UCJmd8iqn8x87VfHYwTRfuXg', color: 'ff0000' },
    	{ name: 'fab fa-stack-overflow', url: 'https://stackoverflow.com/users/15812773/rahul-gill', color: 'dc7928'},
    	{ name: 'fas fa-envelope', url: 'mailto:rgill1@protonmail.com', color: '211f1f' },
    	{ name: 'fas fa-rss', url: 'https://rahul-gill.github.io/Blog-and-Notes/', color: 'dc7928' }
    ];

    const Projects = [
    	{
    		name: "Cricket Scoreboard",
    		description: "Professional cricket matches like scoreboard on mobile",
    		buttons: [
    			makeBtn('https://github.com/rahul-gill/scoreboard', 'GitHub'),
    		],
    		languages: [],
    		link: '',
    		projectIcon: '/scoreboard-app.svg'
    	},
    	{
    		name: "Recurrence",
    		description: "Notification scheduler app",
    		buttons: [
    			makeBtn('https://github.com/rahul-gill/Recurrence', 'GitHub')
    		],
    		languages: [],
    		projectIcon: '/recurrence-app.svg'
    	},
    	{
    		name: "p5.js Illustrations",
    		description: "Snake game, Sudoku solver etc.",
    		buttons: [
    			makeBtn('https://github.com/rahul-gill/p5.js-codes', 'GitHub'),
    			makeBtn('https://rahul-gill.github.io/p5.js-codes/', 'Website')
    		],
    		languages: [],
    		projectIcon: '/p5-js.svg'
    	},
    	{
    		name: "CollegeSpace",
    		description: "....",
    		buttons: [
    			makeBtn('https://github.com/rahul-gill/College-Space', 'GitHub')
    		],
    		languages: [],
    		projectIcon: '/favicon.png'
    	},
    	{
    		name: "MilkCard",
    		description: "Dairy record app",
    		buttons: [
    			makeBtn('https://github.com/rahul-gill/milkCard', 'GitHub')
    		],
    		languages: [],
    		projectIcon: '/milkcard-app.svg'
    	},
    ];

    const histEvents = [
    	{
    		name: "Stock Register",
    		link: "https://play.google.com/store/apps/details?id=stock.register.godown.stock.record.shop.stock.ledger",
    		date: "Jan-March 2022",
    		description: "Stock register app"
    	},
    ];

    /* src/components/Intro.svelte generated by Svelte v3.46.4 */
    const file$8 = "src/components/Intro.svelte";

    function get_each_context$4(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[0] = list[i];
    	return child_ctx;
    }

    // (19:2) {#each SocialLinks as link}
    function create_each_block$4(ctx) {
    	let i;

    	const block = {
    		c: function create() {
    			i = element("i");
    			set_style(i, "--hover-color", "#" + /*link*/ ctx[0].color);
    			attr_dev(i, "class", "pre-socialcard socialcard " + /*link*/ ctx[0].name + " fa-lg socialItemProps" + " svelte-1uxpvb1");
    			add_location(i, file$8, 19, 4, 854);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, i, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(i);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$4.name,
    		type: "each",
    		source: "(19:2) {#each SocialLinks as link}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$8(ctx) {
    	let div2;
    	let div0;
    	let h1;
    	let t1;
    	let h2;
    	let t3;
    	let ul;
    	let li0;
    	let t4;
    	let a;
    	let t5;
    	let t6;
    	let li1;
    	let t8;
    	let li2;
    	let t10;
    	let li3;
    	let t12;
    	let div1;
    	let each_value = SocialLinks;
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$4(get_each_context$4(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			h1 = element("h1");
    			h1.textContent = "Rahul Gill";
    			t1 = space();
    			h2 = element("h2");
    			h2.textContent = "Student; Software Engineer to be";
    			t3 = space();
    			ul = element("ul");
    			li0 = element("li");
    			t4 = text("Would like to have a Software engineering job ");
    			a = element("a");
    			t5 = text("resume");
    			t6 = space();
    			li1 = element("li");
    			li1.textContent = "Contact for preparing for interviews together";
    			t8 = space();
    			li2 = element("li");
    			li2.textContent = "mostly doing Android development right now";
    			t10 = space();
    			li3 = element("li");
    			li3.textContent = "pursuing B.Tech in Electrical Engineering at NIT Hamirpur";
    			t12 = space();
    			div1 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(h1, "class", "pre-intro-content svelte-1uxpvb1");
    			add_location(h1, file$8, 7, 2, 264);
    			attr_dev(h2, "class", "pre-intro-content svelte-1uxpvb1");
    			set_style(h2, "color", "#D0D0D0");
    			set_style(h2, "font-size", "2rem");
    			add_location(h2, file$8, 8, 2, 312);
    			attr_dev(a, "href", resumeLink);
    			set_style(a, "color", "#1da1f2");
    			add_location(a, file$8, 10, 53, 532);
    			add_location(li0, file$8, 10, 3, 482);
    			add_location(li1, file$8, 11, 3, 595);
    			add_location(li2, file$8, 12, 3, 653);
    			add_location(li3, file$8, 13, 3, 708);
    			attr_dev(ul, "class", "pre-intro-content");
    			set_style(ul, "font-size", "1.2rem");
    			add_location(ul, file$8, 9, 2, 422);
    			attr_dev(div0, "class", "content");
    			add_location(div0, file$8, 6, 1, 240);
    			attr_dev(div1, "class", "socialcards svelte-1uxpvb1");
    			add_location(div1, file$8, 17, 1, 794);
    			attr_dev(div2, "class", "intro text-white font-changa flex svelte-1uxpvb1");
    			attr_dev(div2, "id", "intro");
    			add_location(div2, file$8, 5, 0, 180);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			append_dev(div0, h1);
    			append_dev(div0, t1);
    			append_dev(div0, h2);
    			append_dev(div0, t3);
    			append_dev(div0, ul);
    			append_dev(ul, li0);
    			append_dev(li0, t4);
    			append_dev(li0, a);
    			append_dev(a, t5);
    			append_dev(ul, t6);
    			append_dev(ul, li1);
    			append_dev(ul, t8);
    			append_dev(ul, li2);
    			append_dev(ul, t10);
    			append_dev(ul, li3);
    			append_dev(div2, t12);
    			append_dev(div2, div1);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div1, null);
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*SocialLinks*/ 0) {
    				each_value = SocialLinks;
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$4(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$4(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div1, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const resumeLink = "https://drive.google.com/drive/folders/1QvVPsxVubqS0HBzt5innG6qhk8JGCSDP?usp=sharing";

    function instance$8($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Intro', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Intro> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ SocialLinks, resumeLink });
    	return [];
    }

    class Intro extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$8, create_fragment$8, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Intro",
    			options,
    			id: create_fragment$8.name
    		});
    	}
    }

    /* src/components/Section.svelte generated by Svelte v3.46.4 */

    const file$7 = "src/components/Section.svelte";

    // (6:1) {#if display}
    function create_if_block(ctx) {
    	let div;
    	let h1;
    	let span;
    	let t0;
    	let t1;
    	let t2;
    	let t3;
    	let t4;
    	let t5;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[5].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[4], null);

    	const block = {
    		c: function create() {
    			div = element("div");
    			h1 = element("h1");
    			span = element("span");
    			t0 = text("0");
    			t1 = text(/*i*/ ctx[2]);
    			t2 = text(".");
    			t3 = space();
    			t4 = text(/*name*/ ctx[3]);
    			t5 = space();
    			if (default_slot) default_slot.c();
    			attr_dev(span, "class", "svelte-1ut98e9");
    			add_location(span, file$7, 8, 4, 192);
    			attr_dev(h1, "class", "section-title m-0 svelte-1ut98e9");
    			add_location(h1, file$7, 7, 3, 157);
    			attr_dev(div, "class", "section-inner svelte-1ut98e9");
    			add_location(div, file$7, 6, 2, 126);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, h1);
    			append_dev(h1, span);
    			append_dev(span, t0);
    			append_dev(span, t1);
    			append_dev(span, t2);
    			append_dev(h1, t3);
    			append_dev(h1, t4);
    			append_dev(div, t5);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (!current || dirty & /*i*/ 4) set_data_dev(t1, /*i*/ ctx[2]);
    			if (!current || dirty & /*name*/ 8) set_data_dev(t4, /*name*/ ctx[3]);

    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 16)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[4],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[4])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[4], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(6:1) {#if display}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$7(ctx) {
    	let div;
    	let div_class_value;
    	let current;
    	let if_block = /*display*/ ctx[1] && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (if_block) if_block.c();
    			attr_dev(div, "class", div_class_value = "section font-changa text-white " + /*id*/ ctx[0] + " svelte-1ut98e9");
    			attr_dev(div, "id", /*id*/ ctx[0]);
    			add_location(div, file$7, 4, 0, 54);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			if (if_block) if_block.m(div, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*display*/ ctx[1]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*display*/ 2) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(div, null);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}

    			if (!current || dirty & /*id*/ 1 && div_class_value !== (div_class_value = "section font-changa text-white " + /*id*/ ctx[0] + " svelte-1ut98e9")) {
    				attr_dev(div, "class", div_class_value);
    			}

    			if (!current || dirty & /*id*/ 1) {
    				attr_dev(div, "id", /*id*/ ctx[0]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Section', slots, ['default']);
    	let { id, display, i, name } = $$props;
    	const writable_props = ['id', 'display', 'i', 'name'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Section> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('id' in $$props) $$invalidate(0, id = $$props.id);
    		if ('display' in $$props) $$invalidate(1, display = $$props.display);
    		if ('i' in $$props) $$invalidate(2, i = $$props.i);
    		if ('name' in $$props) $$invalidate(3, name = $$props.name);
    		if ('$$scope' in $$props) $$invalidate(4, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ id, display, i, name });

    	$$self.$inject_state = $$props => {
    		if ('id' in $$props) $$invalidate(0, id = $$props.id);
    		if ('display' in $$props) $$invalidate(1, display = $$props.display);
    		if ('i' in $$props) $$invalidate(2, i = $$props.i);
    		if ('name' in $$props) $$invalidate(3, name = $$props.name);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [id, display, i, name, $$scope, slots];
    }

    class Section extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, { id: 0, display: 1, i: 2, name: 3 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Section",
    			options,
    			id: create_fragment$7.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*id*/ ctx[0] === undefined && !('id' in props)) {
    			console.warn("<Section> was created without expected prop 'id'");
    		}

    		if (/*display*/ ctx[1] === undefined && !('display' in props)) {
    			console.warn("<Section> was created without expected prop 'display'");
    		}

    		if (/*i*/ ctx[2] === undefined && !('i' in props)) {
    			console.warn("<Section> was created without expected prop 'i'");
    		}

    		if (/*name*/ ctx[3] === undefined && !('name' in props)) {
    			console.warn("<Section> was created without expected prop 'name'");
    		}
    	}

    	get id() {
    		throw new Error("<Section>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set id(value) {
    		throw new Error("<Section>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get display() {
    		throw new Error("<Section>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set display(value) {
    		throw new Error("<Section>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get i() {
    		throw new Error("<Section>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set i(value) {
    		throw new Error("<Section>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get name() {
    		throw new Error("<Section>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set name(value) {
    		throw new Error("<Section>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/ImageLoader.svelte generated by Svelte v3.46.4 */
    const file$6 = "src/components/ImageLoader.svelte";

    function create_fragment$6(ctx) {
    	let img;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			img = element("img");
    			if (!src_url_equal(img.src, img_src_value = /*src*/ ctx[0])) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", /*alt*/ ctx[1]);
    			attr_dev(img, "style", /*styles*/ ctx[4]);
    			attr_dev(img, "loading", "lazy");
    			attr_dev(img, "class", "svelte-1oaio5y");
    			toggle_class(img, "loaded", /*loaded*/ ctx[2]);
    			add_location(img, file$6, 33, 0, 542);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    			/*img_binding*/ ctx[7](img);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*src*/ 1 && !src_url_equal(img.src, img_src_value = /*src*/ ctx[0])) {
    				attr_dev(img, "src", img_src_value);
    			}

    			if (dirty & /*alt*/ 2) {
    				attr_dev(img, "alt", /*alt*/ ctx[1]);
    			}

    			if (dirty & /*loaded*/ 4) {
    				toggle_class(img, "loaded", /*loaded*/ ctx[2]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    			/*img_binding*/ ctx[7](null);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ImageLoader', slots, []);
    	let { src } = $$props;
    	let { alt } = $$props;
    	let { size = 50 } = $$props;
    	let { borderRadius = 0 } = $$props;
    	let loaded = false;
    	let thisImage;

    	onMount(() => {
    		$$invalidate(
    			3,
    			thisImage.onload = () => {
    				$$invalidate(2, loaded = true);
    			},
    			thisImage
    		);
    	});

    	let styles = `
        width: ${size};
        height: ${size};
        border-radius: ${size};
    `;

    	const writable_props = ['src', 'alt', 'size', 'borderRadius'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ImageLoader> was created with unknown prop '${key}'`);
    	});

    	function img_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			thisImage = $$value;
    			$$invalidate(3, thisImage);
    		});
    	}

    	$$self.$$set = $$props => {
    		if ('src' in $$props) $$invalidate(0, src = $$props.src);
    		if ('alt' in $$props) $$invalidate(1, alt = $$props.alt);
    		if ('size' in $$props) $$invalidate(5, size = $$props.size);
    		if ('borderRadius' in $$props) $$invalidate(6, borderRadius = $$props.borderRadius);
    	};

    	$$self.$capture_state = () => ({
    		src,
    		alt,
    		size,
    		borderRadius,
    		onMount,
    		loaded,
    		thisImage,
    		styles
    	});

    	$$self.$inject_state = $$props => {
    		if ('src' in $$props) $$invalidate(0, src = $$props.src);
    		if ('alt' in $$props) $$invalidate(1, alt = $$props.alt);
    		if ('size' in $$props) $$invalidate(5, size = $$props.size);
    		if ('borderRadius' in $$props) $$invalidate(6, borderRadius = $$props.borderRadius);
    		if ('loaded' in $$props) $$invalidate(2, loaded = $$props.loaded);
    		if ('thisImage' in $$props) $$invalidate(3, thisImage = $$props.thisImage);
    		if ('styles' in $$props) $$invalidate(4, styles = $$props.styles);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [src, alt, loaded, thisImage, styles, size, borderRadius, img_binding];
    }

    class ImageLoader extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, { src: 0, alt: 1, size: 5, borderRadius: 6 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ImageLoader",
    			options,
    			id: create_fragment$6.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*src*/ ctx[0] === undefined && !('src' in props)) {
    			console.warn("<ImageLoader> was created without expected prop 'src'");
    		}

    		if (/*alt*/ ctx[1] === undefined && !('alt' in props)) {
    			console.warn("<ImageLoader> was created without expected prop 'alt'");
    		}
    	}

    	get src() {
    		throw new Error("<ImageLoader>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set src(value) {
    		throw new Error("<ImageLoader>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get alt() {
    		throw new Error("<ImageLoader>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set alt(value) {
    		throw new Error("<ImageLoader>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get size() {
    		throw new Error("<ImageLoader>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<ImageLoader>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get borderRadius() {
    		throw new Error("<ImageLoader>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set borderRadius(value) {
    		throw new Error("<ImageLoader>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/sections/About.svelte generated by Svelte v3.46.4 */
    const file$5 = "src/sections/About.svelte";

    function get_each_context$3(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[0] = list[i];
    	return child_ctx;
    }

    // (19:3) {#each ThingsIKnow as thing}
    function create_each_block$3(ctx) {
    	let imageloader;
    	let current;

    	imageloader = new ImageLoader({
    			props: {
    				src: /*thing*/ ctx[0].icon,
    				alt: /*thing*/ ctx[0].text,
    				size: ThingsIKnowIconSize,
    				class: "cursor-pointer"
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(imageloader.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(imageloader, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(imageloader.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(imageloader.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(imageloader, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$3.name,
    		type: "each",
    		source: "(19:3) {#each ThingsIKnow as thing}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$5(ctx) {
    	let div6;
    	let div2;
    	let div1;
    	let div0;
    	let t0;
    	let div5;
    	let t1;
    	let strong0;
    	let t3;
    	let br0;
    	let br1;
    	let t4;
    	let strong1;
    	let t6;
    	let strong2;
    	let t8;
    	let strong3;
    	let t10;
    	let strong4;
    	let t12;
    	let br2;
    	let br3;
    	let t13;
    	let div3;
    	let t14;
    	let div4;
    	let current;
    	let each_value = ThingsIKnow;
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$3(get_each_context$3(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			div6 = element("div");
    			div2 = element("div");
    			div1 = element("div");
    			div0 = element("div");
    			t0 = space();
    			div5 = element("div");
    			t1 = text("Hi, I'm ");
    			strong0 = element("strong");
    			strong0.textContent = "Rahul Gill";
    			t3 = text(". I am an engineering student and want to be a software engineer");
    			br0 = element("br");
    			br1 = element("br");
    			t4 = text("\n\t\tI am pursuing B.Tech in Electrical Engineering from NIT Hamirpur in ");
    			strong1 = element("strong");
    			strong1.textContent = "India";
    			t6 = text(". I'm currently in pre-final year. I started programming with ");
    			strong2 = element("strong");
    			strong2.textContent = "Javascript";
    			t8 = text(" in ");
    			strong3 = element("strong");
    			strong3.textContent = "2018";
    			t10 = text(" then I tooke admission in NIT Hamirpur. Learned about Linux, Android development with ");
    			strong4 = element("strong");
    			strong4.textContent = "Kotlin";
    			t12 = text(".");
    			br2 = element("br");
    			br3 = element("br");
    			t13 = text("\n\t\tThings I Know:\n\n\t\t");
    			div3 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t14 = space();
    			div4 = element("div");
    			attr_dev(div0, "class", "pfp cursor-pointer svelte-1k7sbmq");
    			add_location(div0, file$5, 8, 3, 225);
    			set_style(div1, "padding-right", "20px");
    			add_location(div1, file$5, 7, 2, 187);
    			add_location(div2, file$5, 6, 1, 179);
    			attr_dev(strong0, "class", "svelte-1k7sbmq");
    			add_location(strong0, file$5, 13, 10, 307);
    			add_location(br0, file$5, 13, 101, 398);
    			add_location(br1, file$5, 13, 106, 403);
    			attr_dev(strong1, "class", "svelte-1k7sbmq");
    			add_location(strong1, file$5, 14, 70, 479);
    			attr_dev(strong2, "class", "svelte-1k7sbmq");
    			add_location(strong2, file$5, 14, 154, 563);
    			attr_dev(strong3, "class", "svelte-1k7sbmq");
    			add_location(strong3, file$5, 14, 185, 594);
    			attr_dev(strong4, "class", "svelte-1k7sbmq");
    			add_location(strong4, file$5, 14, 293, 702);
    			add_location(br2, file$5, 14, 317, 726);
    			add_location(br3, file$5, 14, 322, 731);
    			attr_dev(div3, "class", "flex flex-wrap");
    			set_style(div3, "margin-top", "6px");
    			add_location(div3, file$5, 17, 2, 757);
    			set_style(div4, "height", "80px");
    			add_location(div4, file$5, 27, 2, 989);
    			attr_dev(div5, "class", "text svelte-1k7sbmq");
    			add_location(div5, file$5, 12, 1, 278);
    			attr_dev(div6, "class", "about-flex svelte-1k7sbmq");
    			add_location(div6, file$5, 5, 0, 153);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div6, anchor);
    			append_dev(div6, div2);
    			append_dev(div2, div1);
    			append_dev(div1, div0);
    			append_dev(div6, t0);
    			append_dev(div6, div5);
    			append_dev(div5, t1);
    			append_dev(div5, strong0);
    			append_dev(div5, t3);
    			append_dev(div5, br0);
    			append_dev(div5, br1);
    			append_dev(div5, t4);
    			append_dev(div5, strong1);
    			append_dev(div5, t6);
    			append_dev(div5, strong2);
    			append_dev(div5, t8);
    			append_dev(div5, strong3);
    			append_dev(div5, t10);
    			append_dev(div5, strong4);
    			append_dev(div5, t12);
    			append_dev(div5, br2);
    			append_dev(div5, br3);
    			append_dev(div5, t13);
    			append_dev(div5, div3);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div3, null);
    			}

    			append_dev(div5, t14);
    			append_dev(div5, div4);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*ThingsIKnow, ThingsIKnowIconSize*/ 0) {
    				each_value = ThingsIKnow;
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$3(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$3(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div3, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div6);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('About', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<About> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		ThingsIKnow,
    		ThingsIKnowIconSize,
    		ImageLoader
    	});

    	return [];
    }

    class About extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "About",
    			options,
    			id: create_fragment$5.name
    		});
    	}
    }

    /* src/components/Project.svelte generated by Svelte v3.46.4 */

    const file$4 = "src/components/Project.svelte";

    function get_each_context$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[1] = list[i];
    	return child_ctx;
    }

    // (19:3) {#each project.buttons as button}
    function create_each_block$2(ctx) {
    	let a;
    	let i;
    	let i_class_value;
    	let t;
    	let a_href_value;

    	const block = {
    		c: function create() {
    			a = element("a");
    			i = element("i");
    			t = space();
    			attr_dev(i, "class", i_class_value = "" + (null_to_empty(/*button*/ ctx[1].svg) + " svelte-vpi0hv"));
    			add_location(i, file$4, 20, 5, 529);
    			attr_dev(a, "href", a_href_value = /*button*/ ctx[1].href);
    			attr_dev(a, "class", "cursor-pointer text-white svelte-vpi0hv");
    			add_location(a, file$4, 19, 4, 467);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);
    			append_dev(a, i);
    			append_dev(a, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*project*/ 1 && i_class_value !== (i_class_value = "" + (null_to_empty(/*button*/ ctx[1].svg) + " svelte-vpi0hv"))) {
    				attr_dev(i, "class", i_class_value);
    			}

    			if (dirty & /*project*/ 1 && a_href_value !== (a_href_value = /*button*/ ctx[1].href)) {
    				attr_dev(a, "href", a_href_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$2.name,
    		type: "each",
    		source: "(19:3) {#each project.buttons as button}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$4(ctx) {
    	let div2;
    	let header;
    	let div0;
    	let img;
    	let img_src_value;
    	let img_alt_value;
    	let t0;
    	let h3;
    	let t1_value = /*project*/ ctx[0].name + "";
    	let t1;
    	let t2;
    	let p;
    	let t3_value = /*project*/ ctx[0].description + "";
    	let t3;
    	let t4;
    	let div1;
    	let t5;
    	let footer;
    	let span;
    	let each_value = /*project*/ ctx[0].buttons;
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			header = element("header");
    			div0 = element("div");
    			img = element("img");
    			t0 = space();
    			h3 = element("h3");
    			t1 = text(t1_value);
    			t2 = space();
    			p = element("p");
    			t3 = text(t3_value);
    			t4 = space();
    			div1 = element("div");
    			t5 = space();
    			footer = element("footer");
    			span = element("span");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			if (!src_url_equal(img.src, img_src_value = /*project*/ ctx[0].projectIcon)) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "class", "project-icon svelte-vpi0hv");
    			attr_dev(img, "alt", img_alt_value = /*project*/ ctx[0].name);
    			add_location(img, file$4, 7, 3, 125);
    			set_style(h3, "padding-top", "5px");
    			attr_dev(h3, "class", "svelte-vpi0hv");
    			add_location(h3, file$4, 8, 3, 202);
    			attr_dev(div0, "class", "title svelte-vpi0hv");
    			add_location(div0, file$4, 6, 2, 102);
    			attr_dev(p, "class", "text-description m-0 projectDescription svelte-vpi0hv");
    			add_location(p, file$4, 11, 2, 263);
    			set_style(div1, "height", "10px");
    			add_location(div1, file$4, 12, 2, 342);
    			add_location(header, file$4, 5, 1, 91);
    			attr_dev(span, "class", "svg-links svelte-vpi0hv");
    			add_location(span, file$4, 17, 2, 401);
    			add_location(footer, file$4, 15, 1, 389);
    			attr_dev(div2, "class", "project-card pre-project-card flex svelte-vpi0hv");
    			add_location(div2, file$4, 4, 0, 41);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, header);
    			append_dev(header, div0);
    			append_dev(div0, img);
    			append_dev(div0, t0);
    			append_dev(div0, h3);
    			append_dev(h3, t1);
    			append_dev(header, t2);
    			append_dev(header, p);
    			append_dev(p, t3);
    			append_dev(header, t4);
    			append_dev(header, div1);
    			append_dev(div2, t5);
    			append_dev(div2, footer);
    			append_dev(footer, span);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(span, null);
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*project*/ 1 && !src_url_equal(img.src, img_src_value = /*project*/ ctx[0].projectIcon)) {
    				attr_dev(img, "src", img_src_value);
    			}

    			if (dirty & /*project*/ 1 && img_alt_value !== (img_alt_value = /*project*/ ctx[0].name)) {
    				attr_dev(img, "alt", img_alt_value);
    			}

    			if (dirty & /*project*/ 1 && t1_value !== (t1_value = /*project*/ ctx[0].name + "")) set_data_dev(t1, t1_value);
    			if (dirty & /*project*/ 1 && t3_value !== (t3_value = /*project*/ ctx[0].description + "")) set_data_dev(t3, t3_value);

    			if (dirty & /*project*/ 1) {
    				each_value = /*project*/ ctx[0].buttons;
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$2(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$2(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(span, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Project', slots, []);
    	let { project } = $$props;
    	const writable_props = ['project'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Project> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('project' in $$props) $$invalidate(0, project = $$props.project);
    	};

    	$$self.$capture_state = () => ({ project });

    	$$self.$inject_state = $$props => {
    		if ('project' in $$props) $$invalidate(0, project = $$props.project);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [project];
    }

    class Project extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, { project: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Project",
    			options,
    			id: create_fragment$4.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*project*/ ctx[0] === undefined && !('project' in props)) {
    			console.warn("<Project> was created without expected prop 'project'");
    		}
    	}

    	get project() {
    		throw new Error("<Project>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set project(value) {
    		throw new Error("<Project>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/sections/Projects.svelte generated by Svelte v3.46.4 */
    const file$3 = "src/sections/Projects.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[1] = list[i];
    	return child_ctx;
    }

    // (9:1) {#each Projects.slice(0, displayAll ? Projects.length : 6) as project}
    function create_each_block$1(ctx) {
    	let project;
    	let current;

    	project = new Project({
    			props: { project: /*project*/ ctx[1] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(project.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(project, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(project.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(project.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(project, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(9:1) {#each Projects.slice(0, displayAll ? Projects.length : 6) as project}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let div;
    	let current;
    	let each_value = Projects.slice(0, /*displayAll*/ ctx[0] ? Projects.length : 6);
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div, "class", "project-list flex flex-wrap svelte-r624wt");
    			add_location(div, file$3, 7, 0, 149);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*Projects, displayAll*/ 1) {
    				each_value = Projects.slice(0, /*displayAll*/ ctx[0] ? Projects.length : 6);
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Projects', slots, []);
    	let displayAll = false;
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Projects> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Project, Projects, displayAll });

    	$$self.$inject_state = $$props => {
    		if ('displayAll' in $$props) $$invalidate(0, displayAll = $$props.displayAll);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [displayAll];
    }

    class Projects_1 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Projects_1",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    /* src/components/TimeLineEvent.svelte generated by Svelte v3.46.4 */

    const file$2 = "src/components/TimeLineEvent.svelte";

    function create_fragment$2(ctx) {
    	let div4;
    	let div3;
    	let div2;
    	let div0;
    	let h3;
    	let a;
    	let t0;
    	let t1;
    	let div1;
    	let h5;
    	let t2;
    	let t3;
    	let p;
    	let t4;

    	const block = {
    		c: function create() {
    			div4 = element("div");
    			div3 = element("div");
    			div2 = element("div");
    			div0 = element("div");
    			h3 = element("h3");
    			a = element("a");
    			t0 = text(/*name*/ ctx[0]);
    			t1 = space();
    			div1 = element("div");
    			h5 = element("h5");
    			t2 = text(/*date*/ ctx[2]);
    			t3 = space();
    			p = element("p");
    			t4 = text(/*description*/ ctx[3]);
    			attr_dev(a, "href", /*link*/ ctx[1]);
    			set_style(a, "color", "white");
    			add_location(a, file$2, 16, 34, 422);
    			attr_dev(h3, "class", "cell svelte-12k31jg");
    			add_location(h3, file$2, 16, 16, 404);
    			attr_dev(div0, "class", "column svelte-12k31jg");
    			add_location(div0, file$2, 15, 12, 367);
    			attr_dev(h5, "class", "cell svelte-12k31jg");
    			add_location(h5, file$2, 19, 16, 561);
    			attr_dev(div1, "class", "column alignAccordingly svelte-12k31jg");
    			add_location(div1, file$2, 18, 12, 506);
    			attr_dev(div2, "class", "row svelte-12k31jg");
    			add_location(div2, file$2, 14, 8, 337);
    			add_location(p, file$2, 23, 8, 633);
    			attr_dev(div3, "class", "eventContent svelte-12k31jg");
    			add_location(div3, file$2, 13, 4, 302);
    			attr_dev(div4, "class", "container svelte-12k31jg");
    			attr_dev(div4, "id", /*eventID*/ ctx[5]);
    			toggle_class(div4, "left", /*left*/ ctx[4]);
    			toggle_class(div4, "right", !/*left*/ ctx[4]);
    			add_location(div4, file$2, 10, 0, 220);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div4, anchor);
    			append_dev(div4, div3);
    			append_dev(div3, div2);
    			append_dev(div2, div0);
    			append_dev(div0, h3);
    			append_dev(h3, a);
    			append_dev(a, t0);
    			append_dev(div2, t1);
    			append_dev(div2, div1);
    			append_dev(div1, h5);
    			append_dev(h5, t2);
    			append_dev(div3, t3);
    			append_dev(div3, p);
    			append_dev(p, t4);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*name*/ 1) set_data_dev(t0, /*name*/ ctx[0]);

    			if (dirty & /*link*/ 2) {
    				attr_dev(a, "href", /*link*/ ctx[1]);
    			}

    			if (dirty & /*date*/ 4) set_data_dev(t2, /*date*/ ctx[2]);
    			if (dirty & /*description*/ 8) set_data_dev(t4, /*description*/ ctx[3]);

    			if (dirty & /*eventID*/ 32) {
    				attr_dev(div4, "id", /*eventID*/ ctx[5]);
    			}

    			if (dirty & /*left*/ 16) {
    				toggle_class(div4, "left", /*left*/ ctx[4]);
    			}

    			if (dirty & /*left*/ 16) {
    				toggle_class(div4, "right", !/*left*/ ctx[4]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div4);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('TimeLineEvent', slots, []);
    	let { name = "New Year's Day" } = $$props;
    	let { link = "" } = $$props;
    	let { date = "Jan. 1, 2017" } = $$props;
    	let { description = "Yeah yeah yeah" } = $$props;
    	let { left = true } = $$props;
    	let { eventID } = $$props;
    	const writable_props = ['name', 'link', 'date', 'description', 'left', 'eventID'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<TimeLineEvent> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('name' in $$props) $$invalidate(0, name = $$props.name);
    		if ('link' in $$props) $$invalidate(1, link = $$props.link);
    		if ('date' in $$props) $$invalidate(2, date = $$props.date);
    		if ('description' in $$props) $$invalidate(3, description = $$props.description);
    		if ('left' in $$props) $$invalidate(4, left = $$props.left);
    		if ('eventID' in $$props) $$invalidate(5, eventID = $$props.eventID);
    	};

    	$$self.$capture_state = () => ({
    		name,
    		link,
    		date,
    		description,
    		left,
    		eventID
    	});

    	$$self.$inject_state = $$props => {
    		if ('name' in $$props) $$invalidate(0, name = $$props.name);
    		if ('link' in $$props) $$invalidate(1, link = $$props.link);
    		if ('date' in $$props) $$invalidate(2, date = $$props.date);
    		if ('description' in $$props) $$invalidate(3, description = $$props.description);
    		if ('left' in $$props) $$invalidate(4, left = $$props.left);
    		if ('eventID' in $$props) $$invalidate(5, eventID = $$props.eventID);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [name, link, date, description, left, eventID];
    }

    class TimeLineEvent extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {
    			name: 0,
    			link: 1,
    			date: 2,
    			description: 3,
    			left: 4,
    			eventID: 5
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "TimeLineEvent",
    			options,
    			id: create_fragment$2.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*eventID*/ ctx[5] === undefined && !('eventID' in props)) {
    			console.warn("<TimeLineEvent> was created without expected prop 'eventID'");
    		}
    	}

    	get name() {
    		throw new Error("<TimeLineEvent>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set name(value) {
    		throw new Error("<TimeLineEvent>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get link() {
    		throw new Error("<TimeLineEvent>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set link(value) {
    		throw new Error("<TimeLineEvent>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get date() {
    		throw new Error("<TimeLineEvent>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set date(value) {
    		throw new Error("<TimeLineEvent>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get description() {
    		throw new Error("<TimeLineEvent>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set description(value) {
    		throw new Error("<TimeLineEvent>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get left() {
    		throw new Error("<TimeLineEvent>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set left(value) {
    		throw new Error("<TimeLineEvent>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get eventID() {
    		throw new Error("<TimeLineEvent>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set eventID(value) {
    		throw new Error("<TimeLineEvent>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/sections/Experiences.svelte generated by Svelte v3.46.4 */
    const file$1 = "src/sections/Experiences.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[0] = list[i].name;
    	child_ctx[1] = list[i].date;
    	child_ctx[2] = list[i].desc;
    	child_ctx[3] = list[i].link;
    	child_ctx[5] = i;
    	return child_ctx;
    }

    // (10:8) {#each histEvents as {name, date, desc, link}
    function create_each_block(ctx) {
    	let timelineevent;
    	let current;

    	timelineevent = new TimeLineEvent({
    			props: {
    				name: /*name*/ ctx[0],
    				date: /*date*/ ctx[1],
    				left: /*i*/ ctx[5] % 2 === 0,
    				eventID: /*name*/ ctx[0],
    				description: /*desc*/ ctx[2],
    				link: /*link*/ ctx[3]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(timelineevent.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(timelineevent, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(timelineevent.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(timelineevent.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(timelineevent, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(10:8) {#each histEvents as {name, date, desc, link}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let main;
    	let div;
    	let current;
    	let each_value = histEvents;
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			main = element("main");
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div, "class", "timeline svelte-rpzwdd");
    			add_location(div, file$1, 8, 4, 156);
    			attr_dev(main, "class", "svelte-rpzwdd");
    			add_location(main, file$1, 7, 0, 145);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, div);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*histEvents*/ 0) {
    				each_value = histEvents;
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Experiences', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Experiences> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ histEvents, TimeLineEvent });
    	return [];
    }

    class Experiences extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Experiences",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src/App.svelte generated by Svelte v3.46.4 */

    const { Object: Object_1 } = globals;
    const file = "src/App.svelte";

    // (100:0) <Section  i=1  id="about"  name="About me"  display={displayStates.about} >
    function create_default_slot_2(ctx) {
    	let about;
    	let current;
    	about = new About({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(about.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(about, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(about.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(about.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(about, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2.name,
    		type: "slot",
    		source: "(100:0) <Section  i=1  id=\\\"about\\\"  name=\\\"About me\\\"  display={displayStates.about} >",
    		ctx
    	});

    	return block;
    }

    // (109:0) <Section  i=2  id="projects"  name="Projects"  display={displayStates.projects} >
    function create_default_slot_1(ctx) {
    	let projects;
    	let current;
    	projects = new Projects_1({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(projects.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(projects, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(projects.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(projects.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(projects, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1.name,
    		type: "slot",
    		source: "(109:0) <Section  i=2  id=\\\"projects\\\"  name=\\\"Projects\\\"  display={displayStates.projects} >",
    		ctx
    	});

    	return block;
    }

    // (118:0) <Section   i=3   id="experience"   name="Experience"   display={displayStates.experience} >
    function create_default_slot(ctx) {
    	let experiences;
    	let current;
    	experiences = new Experiences({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(experiences.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(experiences, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(experiences.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(experiences.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(experiences, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(118:0) <Section   i=3   id=\\\"experience\\\"   name=\\\"Experience\\\"   display={displayStates.experience} >",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let div;
    	let t0;
    	let header;
    	let t1;
    	let intro;
    	let t2;
    	let section0;
    	let t3;
    	let section1;
    	let t4;
    	let section2;
    	let current;

    	header = new Header({
    			props: {
    				scrolledHeader: /*scrolledHeader*/ ctx[0]
    			},
    			$$inline: true
    		});

    	intro = new Intro({ $$inline: true });

    	section0 = new Section({
    			props: {
    				i: "1",
    				id: "about",
    				name: "About me",
    				display: /*displayStates*/ ctx[1].about,
    				$$slots: { default: [create_default_slot_2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	section1 = new Section({
    			props: {
    				i: "2",
    				id: "projects",
    				name: "Projects",
    				display: /*displayStates*/ ctx[1].projects,
    				$$slots: { default: [create_default_slot_1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	section2 = new Section({
    			props: {
    				i: "3",
    				id: "experience",
    				name: "Experience",
    				display: /*displayStates*/ ctx[1].experience,
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			t0 = space();
    			create_component(header.$$.fragment);
    			t1 = space();
    			create_component(intro.$$.fragment);
    			t2 = space();
    			create_component(section0.$$.fragment);
    			t3 = space();
    			create_component(section1.$$.fragment);
    			t4 = space();
    			create_component(section2.$$.fragment);
    			attr_dev(div, "class", "background position-fixed svelte-dj19aa");
    			add_location(div, file, 94, 0, 3037);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(header, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(intro, target, anchor);
    			insert_dev(target, t2, anchor);
    			mount_component(section0, target, anchor);
    			insert_dev(target, t3, anchor);
    			mount_component(section1, target, anchor);
    			insert_dev(target, t4, anchor);
    			mount_component(section2, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const header_changes = {};
    			if (dirty & /*scrolledHeader*/ 1) header_changes.scrolledHeader = /*scrolledHeader*/ ctx[0];
    			header.$set(header_changes);
    			const section0_changes = {};
    			if (dirty & /*displayStates*/ 2) section0_changes.display = /*displayStates*/ ctx[1].about;

    			if (dirty & /*$$scope*/ 64) {
    				section0_changes.$$scope = { dirty, ctx };
    			}

    			section0.$set(section0_changes);
    			const section1_changes = {};
    			if (dirty & /*displayStates*/ 2) section1_changes.display = /*displayStates*/ ctx[1].projects;

    			if (dirty & /*$$scope*/ 64) {
    				section1_changes.$$scope = { dirty, ctx };
    			}

    			section1.$set(section1_changes);
    			const section2_changes = {};
    			if (dirty & /*displayStates*/ 2) section2_changes.display = /*displayStates*/ ctx[1].experience;

    			if (dirty & /*$$scope*/ 64) {
    				section2_changes.$$scope = { dirty, ctx };
    			}

    			section2.$set(section2_changes);
    		},
    		i: function intro$1(local) {
    			if (current) return;
    			transition_in(header.$$.fragment, local);
    			transition_in(intro.$$.fragment, local);
    			transition_in(section0.$$.fragment, local);
    			transition_in(section1.$$.fragment, local);
    			transition_in(section2.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(header.$$.fragment, local);
    			transition_out(intro.$$.fragment, local);
    			transition_out(section0.$$.fragment, local);
    			transition_out(section1.$$.fragment, local);
    			transition_out(section2.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (detaching) detach_dev(t0);
    			destroy_component(header, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(intro, detaching);
    			if (detaching) detach_dev(t2);
    			destroy_component(section0, detaching);
    			if (detaching) detach_dev(t3);
    			destroy_component(section1, detaching);
    			if (detaching) detach_dev(t4);
    			destroy_component(section2, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function sleep(ms) {
    	return new Promise(r => setTimeout(r, ms));
    }

    async function checkPreElements(className, type) {
    	let preElements = document.querySelectorAll(`.${className}`);

    	for (let i = 0; i < preElements.length; i++) {
    		if (preElements[i][type]()) {
    			preElements[i].classList.remove(className);
    			await sleep(1000);
    		}
    	}
    }

    async function animateIntroPage() {
    	let intoContentElements = document.querySelectorAll('.pre-intro-content');

    	for (let i = 0; i < intoContentElements.length; i++) {
    		await sleep(200);
    		intoContentElements[i].classList.remove('pre-intro-content');
    	}

    	await sleep(600);
    	let socialCardElements = document.querySelectorAll('.pre-socialcard');

    	for (let i = 0; i < socialCardElements.length; i++) {
    		await sleep(200);
    		socialCardElements[i].classList.remove('pre-socialcard');
    	}
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	const SECTIONS = ['about', 'projects', 'experience'];
    	let scrolledHeader = false;

    	let displayStates = {
    		about: false,
    		projects: false,
    		experience: false
    	};

    	Element.prototype.inViewport = function () {
    		var { top, bottom } = this.getBoundingClientRect();
    		var windowHeight = window.innerHeight || document.documentElement.clientHeight;
    		return top - windowHeight <= 0 && bottom - windowHeight <= 0;
    	};

    	Element.prototype.hasPartInViewport = function () {
    		var { top, height } = this.getBoundingClientRect();
    		return top + height / 3 <= (window.innerHeight || document.documentElement.clientHeight);
    	};

    	Element.prototype.almostInViewport = function () {
    		var { top, height } = this.getBoundingClientRect();
    		return top + height / 1.5 <= (window.innerHeight || document.documentElement.clientHeight);
    	};

    	function headerScrolled() {
    		$$invalidate(0, scrolledHeader = (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop) > 20);
    	}

    	async function checkSections() {
    		for (let i = 0; i < SECTIONS.length; i++) {
    			let id = SECTIONS[i];
    			if (!displayStates[id] && document.getElementById(id).hasPartInViewport()) $$invalidate(1, displayStates = Object.defineProperty(displayStates, id, { value: true }));
    		}

    		checkPreElements('pre-project-card', 'inViewport');
    	}

    	const onRefresh = () => {
    		checkSections();
    		headerScrolled();
    	};

    	window.addEventListener('load', async () => {
    		let headerContentElements = document.querySelectorAll('.pre-header-content');

    		for (let i = headerContentElements.length - 1; i >= 0; i--) {
    			headerContentElements[i].classList.remove('pre-header-content');
    			await sleep(200);
    		}

    		animateIntroPage();
    		checkSections();
    		headerScrolled();
    	});

    	window.addEventListener('scroll', onRefresh);
    	window.addEventListener('resize', onRefresh);
    	const writable_props = [];

    	Object_1.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Header,
    		Intro,
    		Section,
    		About,
    		Projects: Projects_1,
    		Experiences,
    		SECTIONS,
    		scrolledHeader,
    		displayStates,
    		sleep,
    		headerScrolled,
    		checkPreElements,
    		checkSections,
    		animateIntroPage,
    		onRefresh
    	});

    	$$self.$inject_state = $$props => {
    		if ('scrolledHeader' in $$props) $$invalidate(0, scrolledHeader = $$props.scrolledHeader);
    		if ('displayStates' in $$props) $$invalidate(1, displayStates = $$props.displayStates);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [scrolledHeader, displayStates];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    var main = new App({ target: document.body });

    return main;

})();
