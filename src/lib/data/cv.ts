// Interface representing the resume data format
interface Resume {
    name: string;
    location: string;
    email: string;
    github: string;
    linkedin: string;
    personalSite: string;
    workExperience: Work[];
    education: Education[];
    projects: Project[];
    skills: Skills;
  }
  
  interface Work {
    title: string;
    company: string;
    location: string;
    dates: { startDate: string; endDate: string };
    responsibilities: string[];
    technologies: string[];
    links?: { description: string; url: string }[];
  }
  
  interface Education {
    institution: string;
    location: string;
    degree: string;
    dates: { startDate: string; endDate: string };
  }
  
  interface Project {
    name: string;
    url: string;
    dates: { startDate: string; endDate: string };
    description: string[];
    technologies: string[];
    links?: { description: string; url: string }[];
  }
  
  interface Skills {
    programmingLanguages: string[];
    technologies: string[];
  }
  
  // Object holding Rahul Gill's resume data
  export const resumeData: Resume = {
    name: "Rahul Gill",
    location: "Bangalore, India",
    email: "rgill1@protonmail.com",
    github: "github.com/rahul-gill",
    linkedin: "linkedin.com/in/gillrahul",
    personalSite: "rahul-gill.github.io",
    workExperience: [
      {
        title: "Associate Consultant",
        company: "Oracle",
        location: "Bangalore, India",
        dates: { startDate: "June 2023", endDate: "Present" },
        responsibilities: [
          "Implemented customizations of the payments product, setting up environments, and helping with technical specifications.",
          "Worked with NEFT, RTGS, and other transaction processing customizations.",
        ],
        technologies: ["Java", "Oracle Database", "SQL", "JBoss Wildfly", "Java EE", "Docker"],
      },
      {
        title: "Student Developer Intern",
        company: "Google Summer of Code (Mifos Initiative)",
        location: "Remote",
        dates: { startDate: "June 2022", endDate: "September 2022" },
        responsibilities: [
          "Built an open-source UI library to be consumed by Mifos Android apps.",
          "Implemented lint rules, migrated from Findbugs to Spotbugs, and updated UI components to Material/AndroidX.",
        ],
        technologies: ["Android", "Material Design", "Spotbugs", "Java"],
        links: [
          {
            description: "Commits in source code",
            url: "https://github.com/search?q=org%3AopenMF+author%3Arahul-gill&type=commits&ref=advsearch",
          },
        ],
      },
      {
        title: "Android Developer Intern",
        company: "Stock Register",
        location: "Remote",
        dates: { startDate: "January 2022", endDate: "March 2022" },
        responsibilities: [
          "Designed and developed the Stock Register Android app, an inventory management mobile app with 50,000+ downloads.",
          "Migrated the codebase from Java to Kotlin, improving crash-free users from 95% to 98.5%.",
          "Added features like multiple access levels and additional transaction options, boosting user engagement.",
        ],
        technologies: ["Kotlin", "Android", "JSON Serialization"],
        links: [
          {
            description: "Stock Register on Play Store",
            url: "https://play.google.com/store/apps/details?id=stock.register.godown.stock.record.shop.stock.ledger",
          },
        ],
      },
    ],
    education: [
      {
        institution: "NIT Hamirpur",
        location: "",
        degree: "Bachelor of Technology, Electrical Engineering",
        dates: { startDate: "2019", endDate: "2023" },
      },
    ],
    projects: [
      {
        name: "Result-NITH",
        url: "https://result-nith-rg.vercel.app/",
        dates: { startDate: "July 2023", endDate: "Present" },
        description: [
          "Parsed student results from the NIT Hamirpur website and stored them in SQLite using Golang and Goquery.",
          "Automated data extraction and built a user-friendly front-end using SvelteKit, deployed on Vercel.",
        ],
        technologies: ["Golang", "Goquery", "SQLite", "SvelteKit"],
      },
      {
        name: "Student-Attendance-Tracker",
        url: "https://play.google.com/store/apps/details?id=com.github.rahul_gill.attendance",
        dates: { startDate: "January 2024", endDate: "Present" },
        description: [
          "Developed an Android app for students to track attendance, manage schedules, and handle extra classes.",
          "Built using Kotlin, Jetpack Fragments, Navigation, and SQLDelight for database management.",
        ],
        technologies: ["Kotlin", "Jetpack Fragments", "Navigation", "SQLDelight"],
      },
      {
        name: "Portfolio and Blog",
        url: "https://rahul-gill.github.io",
        dates: { startDate: "July 2023", endDate: "Present" },
        description: [
          "Created a personal portfolio and blog showcasing projects and notes.",
          "Built with SvelteKit SSG, TailwindCSS, and Mdsvex for fast and efficient web rendering.",
        ],
        technologies: ["SvelteKit", "TailwindCSS", "Mdsvex"],
      },
    ],
    skills: {
      programmingLanguages: ["Java", "Kotlin", "JavaScript", "Go"],
      technologies: ["Java EE", "Android Development", "Linux", "Docker", "Git", "Bash"],
    },
  };
  