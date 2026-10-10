import {redirect} from "@sveltejs/kit";
import { resolve } from '$app/paths';

export function load() {
    redirect(307, resolve('/blog/page/[pageno]', { pageno: '0' }));
}