const workaduLink = "<a href='https://www.workadu.com/' class='font-medium text-fg-brand underline hover:no-underline' target='_blank'>Workadu</a>";
const hackathonLink = "<a class='font-medium text-fg-brand underline hover:no-underline'" +
"   href='https://www.nationalcoalition.gov.gr/article/1o-hackathon-tis-eyropaikis-evdomadas-program/'" +
"   target='_blank'>" +
"Article" +
"</a>"
const eceLink = "<a href='https://www.e-ce.uth.gr/?lang=en' class='font-medium text-fg-brand underline hover:no-underline' target='_blank'>" +
  "Electrical and Computer Engineering" +
  "</a>";
const uthLink = "<a href='https://www.uth.gr/en/' class='font-medium text-fg-brand underline hover:no-underline' target='_blank'>" +
  "University of Thessaly" +
  "</a>";
const cs50wLink = "<a href='https://cs50.harvard.edu/web/2020/' class='font-medium text-fg-brand underline hover:no-underline' target='_blank'>" +
  "CS50 Web Programming with Python and JavaScript" +
  "</a>";

export const timeline = [
  {
    year: "2020-2022",
    title: "Vocational High School",
    description: "Learned about computer science: software development, computer networks, and web technologies.",
  },
  {
    year: "2021-2022",
    title: "CS50W",
    description: "Completed Harvard's " + cs50wLink + " course.",
  },
  {
    year: "2021",
    title: "EU CodeWeek Hackathon Greece",
    description: "Won 1st place for designing a business model and developing an application to address store" +
      "overcrowding during the pandemic; received a 2,000€ prize. " + hackathonLink,
  },
  {
    year: "2022–2023",
    title: "Software Engineer",
    description: "Worked on " + workaduLink + ", a multi-tenant ERP platform.",
  },
  {
    year: "2022–today",
    title: "ECE Student at UTH",
    description: "Studying " + eceLink + " at the " + uthLink + ".",
  },
  {
    year: "2023–2024",
    title: "DevOps Engineer",
    description: "Continued work on " + workaduLink + ", focusing on infrastructure automation, CI/CD pipelines, and cloud deployment.",
  },
  {
    year: "2025",
    title: "Teaching Assistant",
    description: "Helping students with Computer Organization & Design assignments.",
  },
];
