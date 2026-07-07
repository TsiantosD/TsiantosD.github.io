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
import {Badge} from "@/components/ui/badge.tsx";
import YouTube from 'react-youtube';
import { memo } from 'react';
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
  h1: ({node, ...props}) => <h1 className="text-4xl font-bold my-4" {...props} />,
  h2: ({node, ...props}) => <h2 className="text-3xl font-bold my-3" {...props} />,
  h3: ({node, ...props}) => <h3 className="text-2xl font-bold my-2" {...props} />, // Changed h1 to h3
  h4: ({node, ...props}) => <h4 className="text-xl font-bold my-2" {...props} />,  // Changed h1 to h4

  a: ({node, ...props}) => (
    <span className="inline-flex items-center"> {/* Wrap to keep icon with text */}
      <a className="underline text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer" {...props} />
                    <FontAwesomeIcon className="ml-1 text-xs text-gray-500" icon={faExternalLinkAlt} />
                  </span>
  ),
  p: ({node, ...props}) => (
    <p className="mb-6 leading-relaxed text-gray-700" {...props} />
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
            className="rounded-lg shadow-md mx-auto block w-full"
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
    let imgClasses = "rounded-lg shadow-md mx-auto block ";
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
    <ul className="list-disc ml-6 mb-6 text-gray-700 space-y-2" {...props} />
  ),
  ol: ({node, ...props}) => (
    <ol className="list-decimal ml-6 mb-6 text-gray-700 space-y-2" {...props} />
  ),
  li: ({node, ...props}) => (
    <li className="leading-relaxed" {...props} />
  ),
}

export default function Course() {
  const { slug } = useParams<{ slug: string }>();

  const course: CourseType|undefined = courses.find((p) => p.slug === slug);

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
  <>
    {/* --- Sticky Navigation Bar --- */}
    <nav className="sticky top-[52px] z-50 w-full bg-white/70 backdrop-blur border-border/40 transition-shadow duration-300">
      <Container>
        <div className="flex items-center justify-between py-3">
          <button 
            className="hover:cursor-pointer p-2 -ml-2 transition-all hover:bg-muted rounded-full" 
            onClick={handleBack}
            aria-label="Back"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-6">
            {course?.link && (
              <a
                href={course.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <FontAwesomeIcon icon={faGithub} />
                <span>Repository</span>
                <FontAwesomeIcon icon={faExternalLinkAlt} className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            )}
          </div>
        </div>
      </Container>
    </nav>

    {/* --- Main Course Header --- */}
    <section className="pt-16 pb-12 w-full">
      <Container>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              {course?.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-1.5 px-3 py-1 bg-gray-700 text-slate-50 rounded-full border border-slate-800 shadow-sm transition-colors hover:bg-slate-800">
                {[...Array(course?.people)].map((_, index) => (
                  <FontAwesomeIcon key={index} icon={faUser} className="text-xs" />
                ))}
                <span className="ml-1 text-xs font-bold">
                  {course?.people === 1 ? 'Solo Project' : `Team of ${course?.people}`}
                </span>
              </div>
              {course?.inProgress === true && (
                <Badge variant="outline" className="animate-pulse bg-blue-50 text-blue-700 border-blue-200">
                  <span className="mr-1.5 h-2 w-2 rounded-full bg-blue-600"></span>
                  In Progress
                </Badge>
              )}
              <div className="flex flex-wrap gap-2">
                {course?.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {course?.grade !== undefined && (
            <div className="flex flex-col items-center gap-2">
              <GradeCircle grade={course.grade} />
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Final Grade
              </span>
            </div>
          )}
        </div>
      </Container>
    </section>

    {/* --- Content Grid --- */}
    <main className="py-12">
      <Container>
        <div className="max-w-3xl mx-auto"> {/* Constraining width for readability */}
          <p className="text-xl text-muted-foreground mb-16 leading-relaxed italic border-l-4 pl-6 border-primary/20">
            {course?.description}
          </p>

          {course?.projects.map((project: Project) => (
            <section key={project.slug} className="mb-24 last:mb-0">
              <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8 scroll-mt-40" id={project.slug}>
                <h3 className="text-3xl font-bold tracking-tight">
                  {project.title}
                </h3>
                
                {project?.topOfClass && (
                  <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 border-amber-200 dark:border-amber-800/50 font-semibold">
                    <FontAwesomeIcon className="mr-2 text-xs" icon={faAward} />
                    {project.topOfClass}
                  </Badge>
                )}
              </div>

              <div className="prose prose-slate dark:prose-invert lg:prose-lg max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkUnwrapImages]}
                  components={MARKDOWN_COMPONENTS}
                >
                  {project?.content ?? ""}
                </ReactMarkdown>
              </div>
            </section>
          ))}
        </div>
      </Container>
      <TeamSection members={course?.members ?? []} />
    </main>
  </>
);
}