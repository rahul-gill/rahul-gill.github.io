export type ProjectLinkType = 'GitHub' | 'Website';
export type ProjectInfo = {
    title: string;
    description: string[];//TODO
    imageSrc: string,
    imageRatio: number,
    links: { type: ProjectLinkType, href: string }[]
}

export function formatLinkType(linkType: ProjectLinkType): string {
    const texts: Record<ProjectLinkType, string> = {
        GitHub: 'See the project on Github',
        Website: 'Go to the website',
        GPlayStore: 'Get on Google PlayStore'
    };

    return texts[linkType];
}
export const UserProjectsInfo: ProjectInfo[] = [
    {
        title: "Students Attendance Tracker",
        description: [
            "Student can add scheduled classes or extra classes",
            "material you design with focus on ux",
            "libraries used: jetpack fragments and navigation, sqldelight, kmm settings"
        ],
        links: [
            { type: 'GitHub', href: "https://github.com/rahul-gill/Self-attendance-tracker"},
            { type: 'GPlayStore', href: "https://play.google.com/store/apps/details?id=com.github.rahul_gill.attendance" }
        ],
        imageSrc: "/attendance-tracker.png",
        imageRatio: 56
    },
    {
        title: "NITH Results",
        description: [
            "Parsing the result of students from NIT Hamirpur website, saving to SQLite and showing it to users using a frontend website",
            "Used golang and goquery for the web scraping parsing",
            "Used svelte-kit for frontend and github actions for automatic deployment on vercel"
        ],
        links: [
            { type: 'GitHub', href: "https://github.com/rahul-gill/NITH-Result"},
            { type: 'Website', href: "https://result-nith-rg.vercel.app/"},
        ],
        imageSrc: "/nith-result.gif",
        imageRatio: 56
    },
    {
        title: "p5.js Illustrations",
        description: [
            "Illustrations made with p5.js drawing library",
            "Visualization of Sudoku solving by backtracking",
            "Snake game",
            "Gravity simulation, Congestion Control in Networking visualizer etc."
        ],
        links: [
            { type: 'GitHub', href: "https://github.com/rahul-gill/p5.js-codes/"},
            { type: 'Website', href: "https://rahul-gill.github.io/p5.js-codes/"},
        ],
        imageSrc: "/p5gravity.gif",
        imageRatio: 56
    }
]
