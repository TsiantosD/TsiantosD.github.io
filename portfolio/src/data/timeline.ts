const workaduLink = "<a href='https://www.workadu.com/' class='font-medium text-fg-brand underline hover:no-underline' target='_blank' rel=\"noopener noreferrer\">Workadu</a>";
const hackathonLink = "<a class='font-medium text-fg-brand underline hover:no-underline'" +
"   href='https://www.nationalcoalition.gov.gr/article/1o-hackathon-tis-eyropaikis-evdomadas-program/'" +
"   target='_blank' rel=\"noopener noreferrer\">" +
"Article" +
"</a>"
const eceLink = "<a href='https://www.e-ce.uth.gr/?lang=en' class='font-medium text-fg-brand underline hover:no-underline' target='_blank' rel=\"noopener noreferrer\">" +
  "Electrical and Computer Engineering" +
  "</a>";
const uthLink = "<a href='https://www.uth.gr/en/' class='font-medium text-fg-brand underline hover:no-underline' target='_blank' rel=\"noopener noreferrer\">" +
  "University of Thessaly" +
  "</a>";
const cs50wLink = "<a href='https://cs50.harvard.edu/web/2020/' class='font-medium text-fg-brand underline hover:no-underline' target='_blank' rel=\"noopener noreferrer\">" +
  "CS50 Web Programming with Python and JavaScript" +
  "</a>";
const uthAppLink = "<a href='/course/uthapp' class='font-medium text-fg-brand underline hover:no-underline'>UTH App</a>";

export interface TimelineItem {
  start: string;
  end: string | null;
  period: string;
  title: string;
  description: string;
}

// `end` is exclusive so consecutive activities meet at the same month without overlapping.
export const timeline: TimelineItem[] = [
  {
    start: "2020-09",
    end: "2022-06",
    period: "Sep 2020 – May 2022",
    title: "Vocational High School",
    description: "Learned about computer science: software development, computer networks, and web technologies.",
  },
  {
    start: "2021-05",
    end: "2021-11",
    period: "May – Oct 2021",
    title: "EU CodeWeek Hackathon Greece",
    description: "Won 1st place for designing a business model and developing an application to address store" +
      " overcrowding during the pandemic; received a 2,000€ prize. " + hackathonLink,
  },
  {
    start: "2021-06",
    end: "2022-12",
    period: "Jun 2021 – Nov 2022",
    title: "CS50W Projects",
    description: "Completed Harvard's " + cs50wLink + " course and developed five web applications.",
  },
  {
    start: "2022-07",
    end: "2023-09",
    period: "Jul 2022 – Sep 2023",
    title: "Software Engineer",
    description: "Worked on " + workaduLink + ", a multi-tenant ERP platform.",
  },
  {
    start: "2022-09",
    end: null,
    period: "Sep 2022 – present",
    title: "ECE Student at UTH",
    description: "Studying " + eceLink + " at the " + uthLink + ".",
  },
  {
    start: "2023-07",
    end: "2025-11",
    period: "Jul 2023 – Oct 2025",
    title: "UTH App",
    description: "Developed and published the " + uthAppLink +
      ", a React Native and Django app for grade tracking and academic statistics that reached 7,500+ downloads and approximately 2,500 daily active users.",
  },
  {
    start: "2023-09",
    end: "2024-05",
    period: "Sep 2023 – Apr 2024",
    title: "DevOps Engineer",
    description: "Continued work on " + workaduLink +
      ", focusing on infrastructure automation, CI/CD pipelines, and cloud deployment.",
  },
  {
    start: "2025-09",
    end: "2026-02",
    period: "Sept 2025 – Feb 2026",
    title: "Teaching Assistant",
    description: "Helping students with Computer Organization & Design assignments.",
  },
];
