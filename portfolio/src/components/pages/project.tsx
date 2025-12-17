import {useParams} from "react-router-dom";
import {Container} from "@/components/layout/container";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {projects, type Project} from "@/data/projects.ts";
import {faGithub} from "@fortawesome/free-brands-svg-icons";
import {faExternalLinkAlt, faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import ReactMarkdown, {type Components} from "react-markdown";
import remarkUnwrapImages from "remark-unwrap-images";
import {CardDescription} from "@/components/ui/card.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import YouTube from 'react-youtube';
import { memo } from 'react';

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
  // Fixed: Use the correct tag (h1-h6) for each header level
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

    const cleanSrc: string = props.src?.replace(/#.*$/, '') ?? '';

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
  }
}

export default function Project() {
  const { slug } = useParams<{ slug: string }>();

  const project: Project | undefined = projects.find(
    (p): p is Project => p.slug === slug
  );

  const navigate = useNavigate();

  return (
    <>
      <section className="py-10 w-full">
        <Container>
          <div className="flex items-center justify-between mb-4 pb-8">
            <button className="hover:cursor-pointer" onClick={() => navigate(-1)}>
              <FontAwesomeIcon icon={faArrowLeft} size="lg" />
            </button>
            {project?.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-gray-600 hover:text-black"
              >
                GitHub
                <FontAwesomeIcon icon={faGithub} />
                Repository
                <FontAwesomeIcon icon={faExternalLinkAlt} />
              </a>
            )}
          </div>
          <h1 className="text-4xl font-bold">
            {project?.title}
          </h1>
          <div
            className="flex flex-wrap pt-4 gap-2"
            title={(project?.people ?? 1 > 1)
              ? `${project?.people}` + ' people in the team'
              : 'solo project'
            }>
            <span>
              {[...Array(project?.people)].map((index) => (
                <FontAwesomeIcon key={index} icon={faUser} />
              ))}
            </span>
            {project?.tags && (
              <CardDescription className="flex flex-wrap gap-2">
                {project?.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </CardDescription>
            )}
          </div>
        </Container>
      </section>
      <section className="pb-5 w-full">
        <Container>
          <p className="text-left text-muted-foreground mx-auto italic">
            {project?.description}
          </p>
        </Container>
      </section>
      <section className="pb-20 w-full">
        <Container>
          {/* 'prose' styles HTML elements automatically.
              'prose-slate' sets the color theme.
              'lg:prose-xl' makes it larger on desktop. */}
          <div className="prose prose-slate lg:prose-lg max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkUnwrapImages]}
              components={MARKDOWN_COMPONENTS}
            >
              {project?.content ?? ""}
            </ReactMarkdown>
          </div>
        </Container>
      </section>
    </>
  );
}