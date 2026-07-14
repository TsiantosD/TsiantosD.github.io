import {useParams} from "react-router-dom";
import {Container} from "@/components/layout/container";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAward, faUser} from "@fortawesome/free-solid-svg-icons";
import {courses, type Course as CourseType, type Project} from "@/data/courses.ts";
import {faGithub} from "@fortawesome/free-brands-svg-icons";
import {faExternalLinkAlt, faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import ReactMarkdown, {type Components} from "react-markdown";
import remarkUnwrapImages from "remark-unwrap-images";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import {Badge} from "@/components/ui/badge.tsx";
import YouTube from 'react-youtube';
import { memo, useEffect, useMemo, useRef, useState } from 'react';
import {GistEmbed} from "@/components/gistEmbed.tsx";
import {GradeCircle} from "@/components/grade-circle.tsx";
import TeamSection from "../team-section";
import {SlideDeck} from "@/components/slide-deck.tsx";

interface SlideDeckConfig {
  slides: string[];
  title?: string;
  pdfUrl?: string;
}

function parseSlideDeckConfig(raw: string): SlideDeckConfig {
  const lines = raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const settings = new Map<string, string>();
  const explicitSlides: string[] = [];

  for (const line of lines) {
    const separator = line.indexOf("=");
    if (separator > 0) {
      settings.set(line.slice(0, separator).trim(), line.slice(separator + 1).trim());
    } else {
      explicitSlides.push(line);
    }
  }

  const base = settings.get("base");
  const count = Number(settings.get("count") ?? "0");
  const slides = base && count > 0
    ? Array.from({ length: count }, (_, index) => `${base}/slide-${String(index + 1).padStart(2, "0")}.webp`)
    : explicitSlides;

  return {
    slides,
    title: settings.get("title"),
    pdfUrl: settings.get("pdf"),
  };
}

function markdownNodeText(node: any): string {
  if (!node) return "";
  if (typeof node.value === "string") return node.value;
  if (Array.isArray(node.children)) {
    return node.children.map(markdownNodeText).join("");
  }
  return "";
}

function remarkTableCaptions() {
  return (tree: any) => {
    if (!Array.isArray(tree.children)) return;

    for (let i = 0; i < tree.children.length - 1; i++) {
      const current = tree.children[i];
      const next = tree.children[i + 1];
      if (current?.type !== "table" || next?.type !== "paragraph") continue;

      const captionMatch = markdownNodeText(next).trim().match(/^(?:Table caption|Caption):\s*(.+)$/i);
      if (!captionMatch) continue;

      current.data = current.data ?? {};
      current.data.hProperties = current.data.hProperties ?? {};
      current.data.hProperties["data-caption"] = captionMatch[1];
      tree.children.splice(i + 1, 1);
    }
  };
}

const VideoEmbed = memo(({ videoId }: { videoId: string }) => (
  <div style={{ position: 'relative', paddingTop: '56.25%', height: 0, marginBottom: '20px' }}>
    <YouTube
      videoId={videoId}
      className="absolute top-0 left-0 w-full h-full"
      opts={{ width: '100%', height: '100%', playerVars: { autoplay: 0, mute: 1 } }}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
    />
  </div>
));

const MARKDOWN_COMPONENTS: Components = {
  h1: ({node, ...props}) => <h1 className="my-4 text-4xl font-black tracking-tight text-slate-950" {...props} />,
  h2: ({node, ...props}) => <h2 className="my-4 text-3xl font-black tracking-tight text-slate-950" {...props} />,
  h3: ({node, ...props}) => <h3 className="my-3 text-2xl font-black tracking-tight text-slate-950" {...props} />,
  h4: ({node, ...props}) => <h4 className="my-3 text-xl font-black tracking-tight text-slate-950" {...props} />,

  a: ({node, ...props}) => (
    <span className="inline-flex items-center">
      <a className="font-semibold text-emerald-700 underline decoration-emerald-300 underline-offset-4 transition hover:text-emerald-900" target="_blank" rel="noopener noreferrer" {...props} />
      <FontAwesomeIcon className="ml-1 text-xs text-emerald-500" icon={faExternalLinkAlt} />
    </span>
  ),
  p: ({node, ...props}) => (
    <p className="mb-6 leading-relaxed text-slate-700" {...props} />
  ),

  img: ({node, ...props}) => {
    const isSmall = props.src?.endsWith('#small');
    const isMedium = props.src?.endsWith('#medium');
    const isYoutubeEmbed = props.src?.endsWith('#youtube');
    const isVideo = props.src?.endsWith('#video') || /\.(mp4|webm|ogg)$/i.test(props.src?.replace(/#.*$/, '') ?? '');

    const cleanSrc: string = props.src?.replace(/#.*$/, '') ?? '';

    if (isVideo) {
      const hasCaption = props.alt && props.alt.trim() !== "";

      return (
        <figure className="my-10 flex flex-col items-center">
          <video
            src={cleanSrc}
            controls
            preload="metadata"
            className="mx-auto block w-full rounded-2xl border border-slate-200 shadow-lg shadow-slate-200/70"
          >
            Your browser does not support the video tag.
          </video>
          {hasCaption && (
            <figcaption className="text-center text-sm text-gray-500 mt-2 italic">
              {props.alt}
            </figcaption>
          )}
        </figure>
      );
    }

    if (isYoutubeEmbed) {
      // Extract ID
      let videoId = '';
      try {
        const urlObj = new URL(cleanSrc);
        videoId = urlObj.searchParams.get('v') || '';
      } catch (e) {
        // Handles youtu.be or raw ID strings
        videoId = cleanSrc.split('v=')[1]?.split('&')[0] || cleanSrc.split('/').pop() || '';
      }

      // Pass the extracted ID to our memoized component
      return <VideoEmbed videoId={videoId} />;
    }

    // Base classes
    let imgClasses = "mx-auto block rounded-2xl border border-slate-200 shadow-lg shadow-slate-200/70 ";
    if (isSmall) imgClasses += "w-1/3";
    else if (isMedium) imgClasses += "w-3/4";
    else imgClasses += "w-full";

    // Check if we have an alt text to use as a caption
    const hasCaption = props.alt && props.alt.trim() !== "";

    return (
      <figure className="my-10 flex flex-col items-center">
        <img
          {...props}
          src={cleanSrc}
          className={imgClasses}
          alt={props.alt}
        />
        {hasCaption && (
          <figcaption className="text-center text-sm text-gray-500 mt-2 italic">
            {props.alt}
          </figcaption>
        )}
      </figure>
    );
  },
  code: ({ node, inline, className, children, ...props }: any) => {
    const match = /language-(\w+)/.exec(className || '');
    const isGist = match && match[1] === 'gist';
    const isSlideDeck = match && match[1] === 'slidedeck';
    
    // Ensure children is treated as a clean string ID
    const codeContent = Array.isArray(children) 
      ? children[0].toString().trim() 
      : children.toString().trim();

    if (!inline && isSlideDeck) {
      const config = parseSlideDeckConfig(codeContent);

      return (
        <SlideDeck
          slides={config.slides}
          title={config.title}
          pdfUrl={config.pdfUrl}
        />
      );
    }

    if (!inline && isGist) {
      return (
        <div className="my-8 w-full">
          <GistEmbed gistId={codeContent} />
        </div>
      );
    }

    return <code className={className} {...props}>{children}</code>;
  },
  pre: ({ children }) => {
    // If the child is our GistEmbed, don't wrap it in <pre>
    return <>{children}</>;
  },
  ul: ({node, ...props}) => (
    <ul className="mb-6 ml-6 list-disc space-y-2 text-slate-700 marker:text-emerald-500" {...props} />
  ),
  ol: ({node, ...props}) => (
    <ol className="mb-6 ml-6 list-decimal space-y-2 text-slate-700 marker:text-emerald-600" {...props} />
  ),
  li: ({node, ...props}) => (
    <li className="leading-relaxed" {...props} />
  ),
  table: ({node, ...props}) => {
    const {children, ...tableProps} = props as any;
    const caption = tableProps["data-caption"];
    delete tableProps["data-caption"];

    return (
      <figure className="my-8">
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-200/70">
          <table className="min-w-full border-collapse text-sm" {...tableProps}>
            {children}
          </table>
        </div>
        {caption && (
          <figcaption className="mt-2 text-center text-sm text-gray-500 italic">
            {caption}
          </figcaption>
        )}
      </figure>
    );
  },
  thead: ({node, ...props}) => (
    <thead className="bg-slate-100 text-slate-900" {...props} />
  ),
  th: ({node, ...props}) => (
    <th className="border-b border-slate-200 px-4 py-3 text-left font-semibold" {...props} />
  ),
  td: ({node, ...props}) => (
    <td className="border-b border-slate-100 px-4 py-3 align-top" {...props} />
  ),
}

interface CourseSectionLink {
  id: string;
  label: string;
  depth?: 0 | 1;
}

function CourseSectionNav({
  links,
  activeSection,
  repoLink,
}: {
  links: CourseSectionLink[];
  activeSection: string;
  repoLink?: string;
}) {
  const navLinkClass = (link: CourseSectionLink) => {
    const isActive = activeSection === link.id;
    const baseClass = link.depth === 1
      ? "block rounded-xl px-3 py-2 pl-6 text-sm font-semibold transition-colors"
      : "block rounded-xl px-3 py-2.5 font-black transition-colors";

    return `${baseClass} ${
      isActive
        ? "bg-emerald-300 text-slate-950 shadow-lg shadow-emerald-950/10"
        : "text-slate-500 hover:bg-slate-100 hover:text-slate-950"
    }`;
  };

  return (
    <aside className="sticky top-40 z-20 hidden max-h-[calc(100vh-11rem)] self-start overflow-y-auto rounded-[1.75rem] border border-slate-200/90 bg-white/95 p-4 shadow-xl shadow-slate-200/70 backdrop-blur lg:block">
      <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-slate-500">
        Sections
      </p>
      <nav aria-label="Course sections" className="space-y-1 text-sm">
        {links.map((link) => (
          <a key={link.id} href={`#${link.id}`} className={navLinkClass(link)}>
            {link.label}
          </a>
        ))}
      </nav>
      {repoLink && (
        <div className="mt-4 border-t border-slate-200 pt-4">
          <a
            href={repoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-950 px-3 py-2.5 text-sm font-black text-white shadow-sm transition hover:border-emerald-300 hover:bg-emerald-300 hover:text-slate-950"
          >
            <FontAwesomeIcon icon={faGithub} />
            Repository
            <FontAwesomeIcon icon={faExternalLinkAlt} className="text-[10px] transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      )}
    </aside>
  );
}

export default function Course() {
  const { slug } = useParams<{ slug: string }>();

  const course: CourseType|undefined = courses.find((p) => p.slug === slug);

  const sectionLinks = useMemo<CourseSectionLink[]>(() => {
    if (!course) return [];

    return [
      { id: "overview", label: "Overview" },
      ...(course.projects.length > 0 ? [{ id: "projects", label: "Projects" } as CourseSectionLink] : []),
      ...course.projects.map((project) => ({ id: project.slug, label: project.title, depth: 1 as const })),
      ...((course.members?.length ?? 0) > 0 ? [{ id: "team", label: "Team" } as CourseSectionLink] : []),
    ];
  }, [course]);

  const [activeSection, setActiveSection] = useState("overview");
  const [readingProgress, setReadingProgress] = useState(0);
  const activeSectionRef = useRef("overview");
  const readingProgressRef = useRef(0);
  const scrollFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const updateScrollState = () => {
      scrollFrameRef.current = null;

      const scrollTop = window.scrollY;
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollableHeight > 0 ? (scrollTop / scrollableHeight) * 100 : 0;
      const nextReadingProgress = Math.min(100, Math.max(0, progress));

      // Avoid forcing a React render on every mobile scroll tick. Updating the
      // sticky progress bar in whole percentages is visually identical but much
      // cheaper, especially in Firefox Android.
      if (Math.round(readingProgressRef.current) !== Math.round(nextReadingProgress)) {
        readingProgressRef.current = nextReadingProgress;
        setReadingProgress(nextReadingProgress);
      }

      const anchorOffset = 180;
      let currentSection = sectionLinks[0]?.id ?? "overview";

      for (const link of sectionLinks) {
        const element = document.getElementById(link.id);
        if (!element) continue;

        if (element.getBoundingClientRect().top <= anchorOffset) {
          currentSection = link.id;
        } else {
          break;
        }
      }

      if (activeSectionRef.current !== currentSection) {
        activeSectionRef.current = currentSection;
        setActiveSection(currentSection);
      }
    };

    const scheduleScrollStateUpdate = () => {
      if (scrollFrameRef.current !== null) return;
      scrollFrameRef.current = window.requestAnimationFrame(updateScrollState);
    };

    activeSectionRef.current = sectionLinks[0]?.id ?? "overview";
    readingProgressRef.current = 0;
    updateScrollState();
    window.addEventListener("scroll", scheduleScrollStateUpdate, { passive: true });
    window.addEventListener("resize", scheduleScrollStateUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleScrollStateUpdate);
      window.removeEventListener("resize", scheduleScrollStateUpdate);
      if (scrollFrameRef.current !== null) {
        window.cancelAnimationFrame(scrollFrameRef.current);
      }
    };
  }, [sectionLinks]);

  const navigate = useNavigate();

  const handleBack = () => {
    // Check if the history stack has more than one entry
    // Note: window.history.length includes the current page
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      // Fallback to the menu if no internal history exists
      navigate('/', { replace: true });
    }
  };

  return (
    <div className="relative w-full bg-slate-100 text-slate-950">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(45,212,191,0.12),transparent_30%),radial-gradient(circle_at_86%_10%,rgba(59,130,246,0.10),transparent_28%),linear-gradient(rgba(15,23,42,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.035)_1px,transparent_1px)] bg-[size:100%_100%,100%_100%,56px_56px,56px_56px]" />

      {/* --- Course Action Bar --- */}
      <nav className="sticky top-[65px] z-40 w-full border-y border-slate-800 bg-slate-950/92 text-white shadow-lg shadow-slate-950/20 backdrop-blur-xl transition-shadow duration-300 md:top-[70px]">
        <Container>
          <div className="flex items-center gap-2 py-2">
            <button
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-700 bg-slate-900/70 text-slate-200 transition hover:border-emerald-300 hover:bg-emerald-300 hover:text-slate-950"
              onClick={handleBack}
              aria-label="Back"
              title="Back"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="h-4 w-4" />
            </button>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-black leading-tight text-white">
                {course?.title ?? "Course"}
              </p>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-200/80">
                Course page
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              {course?.link && (
                <a
                  href={course.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open course repository"
                  title="Open repository"
                  className="group inline-flex h-9 items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/70 px-3 text-sm font-bold text-slate-200 transition hover:border-emerald-300 hover:bg-emerald-300 hover:text-slate-950"
                >
                  <FontAwesomeIcon icon={faGithub} />
                  <span>Repository</span>
                  <FontAwesomeIcon icon={faExternalLinkAlt} className="text-[10px] transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              )}
            </div>
          </div>
        </Container>
        <div className="h-1 w-full bg-slate-800">
          <div
            className="h-full bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 transition-[width] duration-150 ease-out"
            style={{ width: `${readingProgress}%` }}
            aria-hidden="true"
          />
        </div>
      </nav>

      <div className="relative py-10 md:py-14">
        {course?.image && (
          <section className="relative">
            <Container>
              <div className="overflow-hidden rounded-[2.25rem] border border-slate-800 bg-slate-950 shadow-2xl shadow-slate-300/70">
                <img
                  src={course.image}
                  alt={`${course.title} cover`}
                  className="h-[18rem] w-full object-cover object-center md:h-[26rem]"
                />
              </div>
            </Container>
          </section>
        )}

        {/* --- Main Course Header --- */}
        <section id="overview" className="relative w-full scroll-mt-36 pt-10 md:pt-14">
          <Container>
            <div className="rounded-[2.25rem] border border-slate-200/90 bg-white/95 p-6 shadow-xl shadow-slate-200/70 backdrop-blur md:p-10 lg:p-12">
              <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
                <div className="space-y-5">
                  <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-black uppercase tracking-[0.22em] text-slate-500 shadow-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Course
                  </div>
                  <h1 className="text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
                    {course?.title}
                  </h1>

                  <div className="flex flex-wrap items-center gap-3 text-slate-500">
                    <div className="flex items-center gap-1.5 rounded-full border border-emerald-300/50 bg-emerald-300 px-3 py-1.5 text-slate-950 shadow-sm transition-colors hover:bg-emerald-200">
                      {[...Array(course?.people ?? 0)].map((_, index) => (
                        <FontAwesomeIcon key={index} icon={faUser} className="text-xs" />
                      ))}
                      <span className="ml-1 text-xs font-black">
                        {course?.people === 1 ? 'Solo Project' : `Team of ${course?.people}`}
                      </span>
                    </div>
                    {course?.inProgress === true && (
                      <Badge variant="outline" className="animate-pulse rounded-full border-cyan-200 bg-cyan-50 text-cyan-700">
                        <span className="mr-1.5 h-2 w-2 rounded-full bg-cyan-500"></span>
                        In Progress
                      </Badge>
                    )}
                    <div className="flex flex-wrap gap-2">
                      {course?.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="rounded-full border-slate-200 bg-slate-50 px-3 py-1 font-bold text-slate-700 hover:border-emerald-300 hover:text-slate-950">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {course?.grade !== undefined && (
                  <div className="flex shrink-0 flex-col items-center gap-2 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5 shadow-sm">
                    <GradeCircle grade={course.grade} />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                      Final Grade
                    </span>
                  </div>
                )}
              </div>
            </div>
          </Container>
        </section>

        {/* --- Content Grid --- */}
        <main className="relative py-10">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[16rem_minmax(0,1fr)]">
              <CourseSectionNav links={sectionLinks} activeSection={activeSection} repoLink={course?.link} />

              <div className="min-w-0 rounded-[2.25rem] border border-slate-200/90 bg-white/95 p-6 shadow-xl shadow-slate-200/70 backdrop-blur md:p-10 lg:p-12">
                <p className="mb-16 border-l-4 border-emerald-300 pl-6 text-xl italic leading-relaxed text-slate-700">
                  {course?.description}
                </p>

                {(course?.projects.length ?? 0) > 0 && (
                  <div id="projects" className="mb-10 scroll-mt-36">
                    <p className="text-xs font-black uppercase tracking-[0.25em] text-emerald-600">
                      Course work
                    </p>
                    <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
                      Projects
                    </h2>
                  </div>
                )}

                {course?.projects.map((project: Project) => (
                  <section key={project.slug} className="mb-24 last:mb-0">
                    <div className="mb-8 flex scroll-mt-40 flex-col gap-4 md:flex-row md:items-center" id={project.slug}>
                      <h3 className="text-3xl font-black tracking-tight text-slate-950">
                        {project.title}
                      </h3>

                      {project?.topOfClass && (
                        <Badge className="rounded-full border border-amber-200 bg-amber-100 font-bold text-amber-900">
                          <FontAwesomeIcon className="mr-2 text-xs" icon={faAward} />
                          {project.topOfClass}
                        </Badge>
                      )}
                    </div>

                    <div className="prose prose-slate lg:prose-lg max-w-none">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm, remarkMath, remarkTableCaptions, remarkUnwrapImages]}
                        rehypePlugins={[rehypeKatex]}
                        components={MARKDOWN_COMPONENTS}
                      >
                        {project?.content ?? ""}
                      </ReactMarkdown>
                    </div>
                  </section>
                ))}
              </div>
            </div>
          </Container>
          <div id="team" className="scroll-mt-36">
            <TeamSection members={course?.members ?? []} />
          </div>
        </main>
      </div>
    </div>
  );
}
