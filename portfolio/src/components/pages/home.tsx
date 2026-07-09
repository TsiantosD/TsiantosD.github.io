import { Container } from "@/components/layout/container";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {ChevronUpIcon} from "../ui/icons/lucide-chevron-up.tsx";
import {ChevronDownIcon} from "../ui/icons/lucide-chevron-down.tsx";
import {useState} from "react";
import {SectionHeader} from "../section-header.tsx";
import {courses, type Project} from "@/data/courses.ts";
import {CourseCard} from "../course-card.tsx";
import {TimelineItem} from "../timeline-item.tsx";
import {timeline} from "@/data/timeline.ts";
import {Button} from "../ui/button.tsx";
import {ArrowUpRightIcon} from "lucide-react";
import { BackgroundPaths } from "@/components/ui/shadcn-io/background-paths";
import { Marquee, MarqueeContent, MarqueeFade, MarqueeItem } from "@/components/ui/shadcn-io/marquee";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

type FeaturedProject = Project & { 
  courseSlug: string; 
  courseTitle: string; 
};

export default function Home() {
  const [isReversed, setIsReversed] = useState(false);
  const toggleOrder = () => setIsReversed(!isReversed);
  const displayedTimeline = isReversed ? [...timeline].reverse() : timeline;
  const skills = [...new Set(courses.flatMap(p => p.tags))];
  const featuredProjects: FeaturedProject[] = courses.flatMap(course => 
    (course.projects || [])
      .filter(project => project.featured)
      .map(project => ({
        ...project,
        courseTitle: course.title,
        courseSlug: course.slug
      }))
  );
  const allCollaborators = courses.flatMap(course => course.members || []);
  const uniqueCollaborators = Array.from(
    new Map(allCollaborators.map(m => [m.linkedin || m.name, m])).values()
  ).filter(m => !m.name.toLowerCase().includes("tsiantos")); // Replace with your actual name filter

  return (
    <>
      <section className="relative h-screen w-full">
        <BackgroundPaths title="Tsiantos Dimitrios" />
      </section>
      <section id="about" className="py-20 w-full">
        <Container className="text-center">
          <Avatar className="w-64 h-64 mx-auto mb-6">
            <AvatarImage src="/me.jpg" alt="Me" />
          </Avatar>
          <h1 className="text-4xl font-bold mb-4">
            Hi, I'm Dimitris
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Electrical & Computer Engineering undergraduate, Software and DevOps Engineer from Greece. 🇬🇷️
          </p>
        </Container>
        <Container className="py-20">
          <Marquee>
            <MarqueeFade side="left" />
            <MarqueeFade side="right" />
            <MarqueeContent>
              {skills.map((value, index) => (
                <MarqueeItem className="p-5" key={index}>
                  <span>{value}</span>
                </MarqueeItem>
              ))}
            </MarqueeContent>
          </Marquee>
        </Container>
        <Container>
          <SectionHeader
            title="Favourite Projects"
            subtitle=""
          />
          <Carousel
            opts={{ align: "start", loop: true }}
            className="w-full relative"
          >
            <CarouselContent className="my-10 mx-5">
              {featuredProjects.map((project, index) => (
                <CarouselItem key={index} className="basis-full flex justify-center md:basis-1/2 lg:basis-1/3">
                  <CourseCard
                    slug={project.courseSlug}
                    title={project?.title ?? ''}
                    description={project?.description ?? ''}
                    scrollId={project.slug}
                    image={project.image}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Navigation Controls */}
            <div className="hidden md:block">
              <CarouselPrevious className="-left-12 border-none bg-background shadow-lg" />
              <CarouselNext className="-right-12 border-none bg-background shadow-lg" />
            </div>
          </Carousel>
        </Container>
        {/* <Container>
          <SectionHeader
            title="Philosoply"
            subtitle=""
          />
          <h2 className="text-3xl font-bold mb-2">Correctness</h2>
          <h2 className="text-3xl font-bold mb-2">Security</h2>
          <h2 className="text-3xl font-bold mb-2">Verifiability</h2>
          <h2 className="text-3xl font-bold mb-2">Cooperation</h2>
          <h2 className="text-3xl font-bold mb-2">Scalability</h2>
        </Container> */}
      </section>
      <section id="timeline" className="py-20 w-full">
        <Container>
          <SectionHeader
            title="Timeline"
            subtitle="A quick overview of my education and achievements."
          />
          <div
            onClick={toggleOrder}
            className="flex items-center cursor-pointer mt-4 text-fg-muted hover:text-fg-primary transition-colors w-max"
            title="Toggle timeline order"
          >
            {isReversed ? <ChevronUpIcon size={32} /> : <ChevronDownIcon size={32} />}
          </div>
          <div className="mt-10">
            {displayedTimeline.map((item, i) => (
              <TimelineItem key={i} {...item} />
            ))}
          </div>
        </Container>
      </section>
      <section id="projects" className="py-20 w-full">
        <Container>
          <SectionHeader
            title="Projects"
            subtitle="Some of the things I've worked on."
          />
          <div className="grid gap-6 sm:grid-cols-2">
            {courses.map((p) => (
              <CourseCard key={p.title} {...p} />
            ))}
          </div>
        </Container>
      </section>
      <section id="tools" className="py-20 w-full">
        <Container className="space-x-6">
          <SectionHeader
            title="Tools"
            subtitle="Online helper tools."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Tomasulo Algorithm Card */}
            <a href="/tomasulo" className="group">
              <div className="p-6 border border-gray-200 rounded-xl hover:border-black hover:shadow-xl transition-all duration-300 bg-white">
                {/* Icon Container with Black Accent */}
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-black transition-colors duration-300">
                  <svg 
                    className="w-6 h-6 text-black group-hover:text-white" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">Tomasulo Visualizer</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Step-by-step interactive simulation of dynamic instruction scheduling, reservation stations, and register renaming.
                </p>
                
                <span className="text-black font-semibold text-sm flex items-center border-b-2 border-transparent group-hover:border-black w-fit transition-all">
                  Launch Simulator
                  <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </div>
            </a>

            {/* ECE338 3D GPGPU Visualizer Card */}
            <a href="/gpgpu-3d" className="group">
              <div className="p-6 border border-gray-200 rounded-xl hover:border-black hover:shadow-xl transition-all duration-300 bg-white">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-black transition-colors duration-300">
                  <svg
                    className="w-6 h-6 text-black group-hover:text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12l8-4.5M12 12v9M12 12L4 7.5" />
                  </svg>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">GPGPU 3D Visualizer</h3>
                <p className="text-gray-600 text-sm mb-4">
                  three.js n-body demo UI for the ECE338 Simple GPGPU project, with the dummy backend running in-browser.
                </p>

                <span className="text-black font-semibold text-sm flex items-center border-b-2 border-transparent group-hover:border-black w-fit transition-all">
                  Launch Tool
                  <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </div>
            </a>
          </div>
        </Container>
      </section>
      <section id="collaborators" className="py-20 w-full">
        <Container>
          <SectionHeader
            title="Collaborators"
            subtitle="The talented people I've had the pleasure of working with on various projects."
          />
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
            {uniqueCollaborators.map((member) => (
              <a
                key={member.linkedin || member.name}
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col h-full items-center text-center p-6 bg-background border rounded-2xl transition-all hover:shadow-md hover:border-primary/50"
              >
                {/* Avatar logic: Image or Initial fallback */}
                <div className={`
                  w-16 h-16 rounded-full bg-black dark:bg-white text-white dark:text-black 
                  flex items-center justify-center font-bold text-xl mb-4 overflow-hidden 
                  shrink-0 border-2 group-hover:border-primary transition-all
                  ${!member.avatar ? "border-gray-200 dark:border-gray-800" : "border-transparent"}
                `}>
                  {member.avatar ? (
                    <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                  ) : (
                    member.name.charAt(0)
                  )}
                </div>
                
                <h3 className="font-bold text-sm group-hover:text-primary transition-colors">
                  {member.name}
                </h3>

                <div className="mt-auto pt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                    View Profile
                  </span>
                </div>
              </a>
            ))}
          </div>
        </Container>
      </section>
      <section id="contact" className="py-20 w-full">
        <Container className="space-x-6">
          <SectionHeader
            title="Contact"
            subtitle="Write me an email or DM me on LinkedIn!"
          />
          <Button
            asChild
            variant="outline"
            size="default"
          >
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSchD7dRpaz4QXcKSyzURG8qRyZv1erO9FMpEjBjJvo0ekzfGg/viewform?usp=dialog"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Form <ArrowUpRightIcon />
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="default"
          >
            <a
              href="https://www.linkedin.com/in/tsiantosd/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn <ArrowUpRightIcon />
            </a>
          </Button>
        </Container>
      </section>
    </>
  );
}
