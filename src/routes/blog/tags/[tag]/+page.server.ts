import {redirect} from "@sveltejs/kit";
import type {PageServerLoad} from "./$types";


export const load: PageServerLoad = ({params}) => {
    throw redirect(307, `/blog/tags/${params.tag}/0`);
}