import { Logo, LogoImage, LogoText } from "@/components/shadcnblocks/logo";

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
    src: string;
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
  tagline = "",
  menuItems = [
    {
      title: "Socials",
      links: [
        { text: "github.com", url: "https://github.com/TsiantosD/" },
        { text: "linkedin.com", url: "https://www.linkedin.com/in/tsiantosd/" },
        { text: "orcid.org", url: "https://orcid.org/0009-0002-3323-5335" },
        { text: "researchgate.net", url: "https://www.researchgate.net/profile/Dimitrios-Tsiantos" },
      ],
    },
    {
      title: "University",
      links: [
        { text: "uth.gr", url: "https://www.uth.gr/en" },
        { text: "e-ce.uth.gr", url: "https://www.e-ce.uth.gr/?lang=en" },
      ],
    },
    {
      title: "Contact",
      links: [
        { text: "linkedin.com", url: "https://www.linkedin.com/in/tsiantosd/" },
        { text: "docs.google.com", url: "https://docs.google.com/forms/d/e/1FAIpQLSchD7dRpaz4QXcKSyzURG8qRyZv1erO9FMpEjBjJvo0ekzfGg/viewform" },
      ],
    }
  ],
  copyright = "Hand crafted by me. © 2025 tsiantosd.tech. All rights reserved.",
  bottomLinks = [
    // { text: "", url: "#" },
  ],
}: Footer2Props) => {
  return (
    <section className="py-32">
      <div className="container">
        <footer>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-6">
            <div className="col-span-2 mb-8 lg:mb-0">
              <div className="flex items-center gap-2 lg:justify-start">
                <Logo url="https://shadcnblocks.com">
                  <LogoImage
                    src={logo.src}
                    alt={logo.alt}
                    title={logo.title}
                    className="h-10 dark:invert"
                  />
                  <LogoText className="text-xl">{logo.title}</LogoText>
                </Logo>
              </div>
              <p className="mt-4 font-bold">{tagline}</p>
            </div>
            {menuItems.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold">{section.title}</h3>
                <ul className="text-muted-foreground space-y-4">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="hover:text-primary font-medium hover:underline"
                    >
                      <a href={link.url} target="_blank" rel="noopener noreferrer">{link.text}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="text-muted-foreground mt-24 flex flex-col justify-between gap-4 border-t pt-8 text-sm font-medium md:flex-row md:items-center">
            <p>{copyright}</p>
            <ul className="flex gap-4">
              {bottomLinks.map((link, linkIdx) => (
                <li key={linkIdx} className="hover:text-primary underline">
                  <a href={link.url}>{link.text}</a>
                </li>
              ))}
            </ul>
          </div>
        </footer>
      </div>
    </section>
  );
};

export { Footer2 };
