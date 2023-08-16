import {redirect} from "@sveltejs/kit";

export function load({ params }) {
    throw redirect(307, `/blog/tags/${params.tag}/0`);
}