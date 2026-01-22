import { Container } from "@/components/layout/container";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {ChevronUpIcon} from "../ui/icons/lucide-chevron-up.tsx";
import {ChevronDownIcon} from "../ui/icons/lucide-chevron-down.tsx";
import {useState} from "react";
import {SectionHeader} from "../section-header.tsx";
import {courses} from "@/data/courses.ts";
import {CourseCard} from "../course-card.tsx";
import {TimelineItem} from "../timeline-item.tsx";
import {timeline} from "@/data/timeline.ts";
import {Button} from "../ui/button.tsx";
import {ArrowUpRightIcon} from "lucide-react";
import { BackgroundPaths } from "@/components/ui/shadcn-io/background-paths";
import { Marquee, MarqueeContent, MarqueeFade, MarqueeItem } from "@/components/ui/shadcn-io/marquee";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const [isReversed, setIsReversed] = useState(false);
  const toggleOrder = () => setIsReversed(!isReversed);
  const displayedTimeline = isReversed ? [...timeline].reverse() : timeline;
  const skills = [...new Set(courses.flatMap(p => p.tags))];
  const featuredProjects = courses.flatMap(course => 
    (course.projects || [])
      .filter(project => project.featured)
      .map(project => ({
        ...project,
        courseTitle: course.title,
        courseSlug: course.slug
      }))
  );

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
        <Container className="py-20">
          <SectionHeader
            title="Favourite Projects"
            subtitle=""
          />
          <Carousel
            opts={{ align: "start", loop: true }}
            className="w-full relative"
          >
            <CarouselContent className="-ml-4">
              {featuredProjects.map((project, index) => (
                <CarouselItem key={index} className="m-2 pl-4 basis-full md:basis-1/2 lg:basis-1/3">
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
