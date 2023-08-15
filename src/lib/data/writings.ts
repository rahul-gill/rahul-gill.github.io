import {basename} from "path";


export type WritingPreview = {
    title: string;
    slug: string;
    description: string;
    datetime: string;
    tags: string[];
};

export function getBlogPosts(): WritingPreview[] {
    const svxFiles = import.meta.glob('../../writings/*.svx', { eager: true });

    return Object.entries(svxFiles)
        .filter(([path]) => {
            const fileIsHidden = basename(path).startsWith('_');
            return !fileIsHidden;
        })
        .map(([path, data]) => {
            const {metadata} = data as { metadata: Omit<WritingPreview, 'slug'> };

            const {title, description, datetime, tags} = metadata;

            return {
                title,
                description,
                datetime,
                tags,
                slug: basename(path, '.svx')
            };
        })
        .sort(
            ({datetime: firstDatetime}, {datetime: secondDatetime}) =>
                -firstDatetime.localeCompare(secondDatetime)
        );
}
