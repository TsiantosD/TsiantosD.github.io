import { ArrowUpRightIcon, CpuIcon, MailIcon, SparklesIcon } from "lucide-react";

interface MenuItem {
  title: string;
  links: {
    text: string;
    url: string;
  }[];
}

interface Footer2Props {
  logo?: {
    url: string;
    src: string | null | undefined;
    alt: string;
    title: string;
  };
  tagline?: string;
  menuItems?: MenuItem[];
  copyright?: string;
  bottomLinks?: {
    text: string;
    url: string;
  }[];
}

const Footer2 = ({
  logo = {
    src: null,
    alt: "",
    title: "tsiantosd.tech",
    url: "https://www.tsiantosd.tech",
  },
  tagline = "Hardware, software, and architecture tools with an emphasis on correctness, automation, and performance.",
  menuItems = [
    {
      title: "Socials",
      links: [
        { text: "GitHub", url: "https://github.com/TsiantosD/" },
        { text: "LinkedIn", url: "https://www.linkedin.com/in/tsiantosd/" },
        { text: "ORCID", url: "https://orcid.org/0009-0002-3323-5335" },
        { text: "ResearchGate", url: "https://www.researchgate.net/profile/Dimitrios-Tsiantos" },
      ],
    },
    {
      title: "University",
      links: [
        { text: "University of Thessaly", url: "https://www.uth.gr/en" },
        { text: "ECE Department", url: "https://www.e-ce.uth.gr/?lang=en" },
      ],
    },
    {
      title: "Contact",
      links: [
        { text: "LinkedIn message", url: "https://www.linkedin.com/in/tsiantosd/" },
        { text: "Google Form", url: "https://docs.google.com/forms/d/e/1FAIpQLSchD7dRpaz4QXcKSyzURG8qRyZv1erO9FMpEjBjJvo0ekzfGg/viewform" },
      ],
    }
  ],
  copyright = "Created by me. © 2026 tsiantosd.tech. All rights reserved.",
  bottomLinks = [],
}: Footer2Props) => {
  return (
    <section className="relative w-full overflow-hidden border-t border-slate-800 bg-slate-950 py-20 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(45,212,191,0.18),transparent_30%),radial-gradient(circle_at_85%_0%,rgba(59,130,246,0.16),transparent_28%),linear-gradient(rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.06)_1px,transparent_1px)] bg-[size:100%_100%,100%_100%,48px_48px,48px_48px]" />
      <div className="relative mx-auto max-w-5xl px-4">
        <footer className="overflow-hidden rounded-[2.25rem] border border-slate-800 bg-slate-950/80 shadow-2xl shadow-slate-950/40 backdrop-blur">
          <div className="grid gap-10 p-6 md:p-10 lg:grid-cols-[1.1fr_1.4fr] lg:p-12">
            <div className="relative overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/20">
              <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-emerald-300/10 blur-3xl" />
              <div className="relative">
                <a href={logo.url} className="inline-flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-300/50 bg-emerald-300 text-sm font-black text-slate-950 shadow-lg shadow-emerald-950/30">
                    DT
                  </span>
                  <div>
                    <p className="text-2xl font-black tracking-tight">{logo.title}</p>
                    <p className="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-emerald-200">ECE portfolio</p>
                  </div>
                </a>

                <p className="mt-6 max-w-sm text-sm leading-7 text-slate-300">{tagline}</p>

                <div className="mt-8 grid gap-3 text-sm font-semibold text-slate-300 sm:grid-cols-2 lg:grid-cols-1">
                  <a href="/#tools" className="group flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/80 px-4 py-3 transition hover:border-emerald-300/70 hover:bg-slate-900">
                    <span className="inline-flex items-center gap-2"><CpuIcon className="h-4 w-4 text-emerald-300" /> Tools & demos</span>
                    <ArrowUpRightIcon className="h-4 w-4 text-slate-500 transition group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-emerald-200" />
                  </a>
                  <a href="/#contact" className="group flex items-center justify-between rounded-2xl border border-emerald-300/40 bg-emerald-300 px-4 py-3 font-black text-slate-950 transition hover:bg-emerald-200">
                    <span className="inline-flex items-center gap-2"><MailIcon className="h-4 w-4" /> Get in touch</span>
                    <ArrowUpRightIcon className="h-4 w-4 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </a>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(9.5rem,1.18fr)_minmax(0,1fr)]">
              {menuItems.map((section, sectionIdx) => (
                <div key={sectionIdx} className="min-w-0 rounded-[1.75rem] border border-slate-800 bg-slate-900/55 p-4 transition hover:border-slate-700 hover:bg-slate-900/80 lg:p-5">
                  <h3 className="mb-5 flex min-w-0 items-center gap-2 text-xs font-black uppercase tracking-[0.12em] text-emerald-200">
                    <SparklesIcon className="h-3.5 w-3.5 shrink-0" />
                    <span className="min-w-0 break-words">{section.title}</span>
                  </h3>
                  <ul className="space-y-3">
                    {section.links.map((link, linkIdx) => (
                      <li key={linkIdx}>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-300 transition hover:text-emerald-200"
                        >
                          {link.text}
                          <ArrowUpRightIcon className="h-3.5 w-3.5 opacity-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-between gap-4 border-t border-slate-800 px-6 py-6 text-sm font-medium text-slate-400 md:flex-row md:items-center md:px-10 lg:px-12">
            <p>{copyright}</p>
            {bottomLinks.length > 0 && (
              <ul className="flex gap-4">
                {bottomLinks.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <a href={link.url} className="text-slate-400 underline transition hover:text-emerald-200">{link.text}</a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </footer>
      </div>
    </section>
  );
};

export { Footer2 };
