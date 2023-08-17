import {redirect} from "@sveltejs/kit";
import {base} from "$app/paths";
import type {PageServerLoad} from "./$types";

export const load: PageServerLoad = ({params}) => {
    throw redirect(307, `${base}/blog/tags/${params.tag}/0`);
}