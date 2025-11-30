import { Container } from "@/components/layout/container";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {ChevronUpIcon} from "../ui/icons/lucide-chevron-up.tsx";
import {ChevronDownIcon} from "../ui/icons/lucide-chevron-down.tsx";
import {useState} from "react";
import {SectionHeader} from "../section-header.tsx";
import {projects} from "../../data/projects.ts";
import {ProjectCard} from "../project-card.tsx";
import {TimelineItem} from "../timeline-item.tsx";
import {timeline} from "../../data/timeline.ts";
import {Button} from "../ui/button.tsx";
import {ArrowUpRightIcon} from "lucide-react";
import { BackgroundPaths } from "@/components/ui/shadcn-io/background-paths";

export default function Home() {
  const [isReversed, setIsReversed] = useState(false);
  const toggleOrder = () => setIsReversed(!isReversed);
  const displayedTimeline = isReversed ? [...timeline].reverse() : timeline;

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
        {/*{displayedTimeline.map((item, i) => (*/}
        {/*  <TimelineItem key={i} {...item} />*/}
        {/*))}*/}
      </section>
      <section id="timeline" className="py-20 w-full">
        <Container>
          <div className="flex items-center justify-between">
            <SectionHeader
              title="Timeline"
              subtitle="A quick overview of my education and achievements."
            />
          </div>
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
            {projects.map((p, i) => (
              <ProjectCard key={i} {...p} />
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
