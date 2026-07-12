import { Container } from "@/components/layout/container";
import {ChevronUpIcon} from "../ui/icons/lucide-chevron-up.tsx";
import {ChevronDownIcon} from "../ui/icons/lucide-chevron-down.tsx";
import {useMemo, useState} from "react";
import {courses, type Course, type Project} from "@/data/courses.ts";
import {timeline} from "@/data/timeline.ts";
import {Button} from "../ui/button.tsx";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  BookOpenIcon,
  CpuIcon,
  GraduationCapIcon,
  Layers3Icon,
  LinkedinIcon,
  MedalIcon,
  SparklesIcon,
  UsersIcon,
  WrenchIcon,
} from "lucide-react";
import { Marquee, MarqueeContent, MarqueeFade, MarqueeItem } from "@/components/ui/shadcn-io/marquee";
import {Badge} from "@/components/ui/badge.tsx";

const highlightedCourseSlugs = [
  "parallel-computer-architecture",
  "microprocessor-design",
  "radhard-circuit-design",
  "high-performance-computing",
  "embedded-systems",
  "operating-systems",
  "wireless-comunications"
];

type FeaturedProject = Project & {
  courseSlug: string;
  courseTitle: string;
};

function sectionEyebrow(label: string) {
  return (
    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-bold uppercase tracking-[0.22em] text-slate-500 shadow-sm">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
      {label}
    </div>
  );
}

function CourseShowcaseCard({ course, featured = false }: { course: Course; featured?: boolean }) {
  const gradePercent = course.grade !== undefined ? Math.round((course.grade / 10) * 100) : null;
  const visibleTags = course.tags.slice(0, featured ? 5 : 3);
  const hiddenTagCount = course.tags.length - visibleTags.length;

  return (
    <a
      href={`/course/${course.slug}`}
      className={`group relative flex h-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-2xl hover:shadow-slate-200/80 ${featured ? "lg:grid lg:grid-cols-[1.05fr_0.95fr]" : "flex-col"}`}
    >
      {course.image && (
        <div className={`relative overflow-hidden bg-slate-100 ${featured ? "min-h-[22rem]" : "aspect-video"}`}>
          <img
            src={course.image}
            alt={course.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />
          {gradePercent !== null && (
            <div className="absolute left-4 top-4 rounded-2xl bg-white/90 px-3 py-2 text-sm font-black text-slate-950 shadow-lg backdrop-blur">
              {gradePercent}%
            </div>
          )}
        </div>
      )}

      <div className={`flex flex-1 flex-col p-6 ${featured ? "justify-between" : ""}`}>
        <div>
          <div className="mb-4 flex flex-wrap gap-2">
            {visibleTags.map((tag) => (
              <Badge key={tag} variant="outline" className="rounded-full bg-slate-50 text-[11px]">
                {tag}
              </Badge>
            ))}
            {hiddenTagCount > 0 && (
              <Badge variant="outline" className="rounded-full bg-slate-50 text-[11px] text-slate-500">
                +{hiddenTagCount}
              </Badge>
            )}
          </div>

          <h3 className={`${featured ? "text-3xl" : "text-xl"} font-black tracking-tight text-slate-950`}>
            {course.title}
          </h3>
          <p className={`mt-3 text-sm leading-6 text-slate-600 ${featured ? "md:text-base" : "line-clamp-3"}`}>
            {course.description}
          </p>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-4 text-sm text-slate-500">
          <span className="inline-flex items-center gap-2 font-semibold">
            <BookOpenIcon className="h-4 w-4" />
            {course.projects.length} {course.projects.length === 1 ? "project" : "projects"}
          </span>
          <span className="inline-flex items-center gap-2 font-semibold">
            <UsersIcon className="h-4 w-4" />
            {course.people === 1 ? "Solo" : `${course.people} people`}
          </span>
          <span className="ml-auto inline-flex items-center gap-1 font-bold text-slate-950">
            Open <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </a>
  );
}

function FeaturedProjectCard({ project }: { project: FeaturedProject }) {
  return (
    <a
      href={`/course/${project.courseSlug}#${project.slug}`}
      className="group grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl sm:grid-cols-[11rem_1fr]"
    >
      {project.image && (
        <div className="relative min-h-44 overflow-hidden bg-slate-100">
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent" />
        </div>
      )}
      <div className="flex flex-col justify-between p-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">{project.courseTitle}</p>
          <h3 className="mt-2 text-lg font-black text-slate-950">{project.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{project.description}</p>
        </div>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-slate-950">
          Read case study <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </a>
  );
}

function ToolCard({ href, title, description, label, icon }: { href: string; title: string; description: string; label: string; icon: React.ReactNode }) {
  return (
    <a href={href} className="group relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 p-6 text-white shadow-xl shadow-slate-950/20 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300/70">
      <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-emerald-400/10 blur-2xl transition group-hover:bg-emerald-300/20" />
      <div className="relative flex h-full flex-col">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div className="rounded-2xl border border-slate-700 bg-slate-900 p-3 text-emerald-300 transition-colors group-hover:border-emerald-300/60 group-hover:bg-emerald-300 group-hover:text-slate-950">
            {icon}
          </div>
          <ArrowUpRightIcon className="h-5 w-5 text-slate-500 transition group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-emerald-200" />
        </div>
        <h3 className="text-2xl font-black tracking-tight">{title}</h3>
        <p className="mt-3 flex-1 text-sm leading-6 text-slate-300">{description}</p>
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-emerald-200">
          {label} <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </a>
  );
}

export default function Home() {
  const [isReversed, setIsReversed] = useState(true);
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
  ).filter(m => !m.name.toLowerCase().includes("tsiantos"));

  const highlightedCourses = useMemo(() => {
    const priority = new Map(highlightedCourseSlugs.map((slug, index) => [slug, index]));
    return [...courses]
      .filter((course) => priority.has(course.slug))
      .sort((a, b) => (priority.get(a.slug) ?? 999) - (priority.get(b.slug) ?? 999));
  }, []);

  const secondaryCourses = courses.filter((course) => !highlightedCourseSlugs.includes(course.slug));
  const gradedCourses = courses.filter((course) => course.grade !== undefined);
  const averageGrade = gradedCourses.length > 0
    ? Math.round(gradedCourses.reduce((sum, course) => sum + (course.grade ?? 0), 0) / gradedCourses.length * 10)
    : null;
  const projectCount = courses.reduce((sum, course) => sum + course.projects.length, 0);
  const topTags = skills.slice(0, 8);

  return (
    <>
      <section className="relative w-full overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(37,99,235,0.28),transparent_32%),radial-gradient(circle_at_80%_10%,rgba(14,165,233,0.18),transparent_28%),linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:100%_100%,100%_100%,48px_48px,48px_48px]" />
        <Container className="relative grid min-h-[82vh] items-center gap-12 py-24 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/70 px-4 py-2 text-m text-slate-300 shadow-lg shadow-blue-950/20">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Electrical & Computer Engineering undergraduate
            </div>

            <div className="space-y-5">
              <h1 className="max-w-4xl text-5xl font-bold tracking-tight md:text-7xl">
                Dimitris Tsiantos
              </h1>
              <p className="max-w-2xl text-xl leading-8 text-slate-300">
                I build <b>Hardware</b> and <b>Software</b> systems and tools with an emphasis on correctness, automation, and performance.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 text-sm font-semibold text-slate-200">
              {['HPC', 'Computer Architecture', 'Computer Networks'].map((item) => (
                <span key={item} className="rounded-full border border-slate-700 bg-slate-900/65 px-4 py-2">
                  {item}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <a href="#projects" className="rounded-xl bg-white px-5 py-3 font-bold text-slate-950 transition hover:bg-blue-100">
                View projects
              </a>
              <a href="https://github.com/TsiantosD/" target="_blank" rel="noopener noreferrer" className="rounded-xl border border-slate-600 bg-slate-900/70 px-5 py-3 font-bold text-white transition hover:border-blue-300 hover:bg-slate-800">
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/tsiantosd/" target="_blank" rel="noopener noreferrer" className="rounded-xl border border-slate-600 bg-slate-900/70 px-5 py-3 font-bold text-white transition hover:border-blue-300 hover:bg-slate-800">
                LinkedIn
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -inset-4 rounded-[2rem] bg-blue-500/20 blur-3xl" />
            <div className="relative overflow-hidden rounded-3xl border border-slate-700 bg-slate-950/80 shadow-2xl shadow-blue-950/40 backdrop-blur">
              <img
                src="/me.jpg"
                alt="Dimitris Tsiantos"
                className="h-[28rem] w-full object-cover object-center grayscale-[15%]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/88 to-transparent p-6 pt-24">
                <div className="rounded-2xl border border-slate-700/80 bg-slate-950/80 p-4 font-mono text-sm shadow-xl backdrop-blur">
                  <div className="mb-3 flex items-center gap-2 border-b border-slate-800 pb-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                    <span className="ml-2 text-slate-400">~/portfolio</span>
                  </div>
                  <p className="text-blue-300">$ currently</p>
                  <p className="mt-1 text-slate-200">learning about HPC, architecture, networks, AI and building fun projects</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
      <section className="w-full border-y border-emerald-300/20 bg-emerald-950 text-white shadow-lg shadow-emerald-950/20">
        <Marquee>
          <MarqueeFade side="left" className="from-emerald-950" />
          <MarqueeFade side="right" className="from-emerald-950" />
          <MarqueeContent>
            {skills.map((value, index) => (
              <MarqueeItem className="px-8 py-5" key={index}>
                <span className="text-sm font-bold uppercase tracking-[0.22em] text-emerald-100">{value}</span>
              </MarqueeItem>
            ))}
          </MarqueeContent>
        </Marquee>
      </section>

      <div className="relative isolate w-full overflow-hidden bg-slate-100 py-14 md:py-20">
        <div className="pointer-events-none absolute left-1/2 top-0 h-full w-screen -translate-x-1/2 bg-[radial-gradient(circle_at_20%_0%,rgba(16,185,129,0.10),transparent_28%),radial-gradient(circle_at_85%_18%,rgba(59,130,246,0.08),transparent_30%),linear-gradient(rgba(15,23,42,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.035)_1px,transparent_1px)] bg-[size:100%_100%,100%_100%,56px_56px,56px_56px]" />

        <section id="overview" className="relative scroll-mt-24">
          <Container>
            <div className="overflow-hidden rounded-[2.25rem] border border-slate-200/90 bg-white/92 p-6 shadow-xl shadow-slate-200/70 backdrop-blur md:p-10 lg:p-12">
              <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
                <div>
                  {sectionEyebrow("Snapshot")}
                  <h2 className="max-w-2xl text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
                    Progress & Stats
                  </h2>
                </div>
                <p className="max-w-2xl text-lg leading-8 text-slate-600">
                  My progress so far at the Electrical and Computer Engineering department.
                </p>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                  <GraduationCapIcon className="mb-5 h-6 w-6 text-emerald-600" />
                  <p className="text-3xl font-black text-slate-950">{courses.length}</p>
                  <p className="mt-1 text-sm font-semibold text-slate-500">courses</p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                  <Layers3Icon className="mb-5 h-6 w-6 text-blue-600" />
                  <p className="text-3xl font-black text-slate-950">{projectCount}</p>
                  <p className="mt-1 text-sm font-semibold text-slate-500">documented projects</p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                  <MedalIcon className="mb-5 h-6 w-6 text-amber-600" />
                  <p className="text-3xl font-black text-slate-950">{averageGrade ?? "—"}%</p>
                  <p className="mt-1 text-sm font-semibold text-slate-500">average listed grade</p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                  <UsersIcon className="mb-5 h-6 w-6 text-purple-600" />
                  <p className="text-3xl font-black text-slate-950">{uniqueCollaborators.length}</p>
                  <p className="mt-1 text-sm font-semibold text-slate-500">collaborators</p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section id="projects" className="relative mt-10 scroll-mt-24 md:mt-12">
          <Container>
            <div className="rounded-[2.25rem] border border-slate-200/90 bg-white/95 p-6 shadow-xl shadow-slate-200/70 md:p-10 lg:p-12">
              <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                <div>
                  {sectionEyebrow("Selected work")}
                  <h2 className="text-4xl font-black tracking-tight text-slate-950 md:text-5xl">Courses</h2>
                  <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
                    Some important courses and projects. This portfolio only covers the most notable courses, you can check the entire course list at the <a href="https://www.e-ce.uth.gr/studies/undergraduate/?lang=en" target="_blank" className="font-medium text-fg-brand underline hover:no-underline">department's website</a>.
                  </p>
                </div>
                {/* <a href="#tools" className="inline-flex w-fit items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:border-slate-900 hover:text-slate-950">
                  Jump to tools <ArrowRightIcon className="h-4 w-4" />
                </a> */}
              </div>

              {highlightedCourses[0] && (
                <CourseShowcaseCard course={highlightedCourses[0]} featured />
              )}

              <div className="mt-6 grid gap-6 lg:grid-cols-3">
                {highlightedCourses.slice(1).map((course) => (
                  <CourseShowcaseCard key={course.slug} course={course} />
                ))}
              </div>

              <div className="mt-14 rounded-[2rem] border border-slate-200 bg-slate-50 p-4 md:p-6">
                <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-xl font-black text-slate-950">More courses</h3>
                    {/* <p className="text-sm text-slate-500">Fast scan index for the remaining coursework and portfolio entries.</p> */}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {topTags.map((tag) => (
                      <Badge key={tag} variant="outline" className="rounded-full bg-white">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  {secondaryCourses.map((course) => (
                    <a
                      key={course.slug}
                      href={`/course/${course.slug}`}
                      className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-md"
                    >
                      {course.image && (
                        <img src={course.image} alt={course.title} className="h-16 w-20 rounded-xl object-cover" />
                      )}
                      <div className="min-w-0 flex-1">
                        <h4 className="truncate font-black text-slate-950">{course.title}</h4>
                        <p className="mt-1 line-clamp-1 text-sm text-slate-500">{course.description}</p>
                      </div>
                      <ArrowRightIcon className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-slate-950" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section id="featured-projects" className="relative mt-10 scroll-mt-24 md:mt-12">
          <Container>
            <div className="rounded-[2.25rem] border border-slate-200/90 bg-white/95 p-6 shadow-xl shadow-slate-200/70 md:p-10 lg:p-12">
              <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                <div>
                  {sectionEyebrow("Featured")}
                  <h2 className="text-4xl font-black tracking-tight text-slate-950 md:text-5xl">Featured projects</h2>
                  <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
                    Some of my personal favourite projects.
                  </p>
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                {featuredProjects.slice(0, 6).map((project) => (
                  <FeaturedProjectCard key={`${project.courseSlug}-${project.slug}`} project={project} />
                ))}
              </div>
            </div>
          </Container>
        </section>

        <section id="timeline" className="relative mt-10 scroll-mt-24 md:mt-12">
          <Container>
            <div className="overflow-hidden rounded-[2.25rem] border border-slate-200/90 bg-white/95 p-6 shadow-xl shadow-slate-200/70 md:p-10 lg:p-12">
              <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                <div>
                  {sectionEyebrow("Timeline")}
                  <h2 className="text-4xl font-black tracking-tight text-slate-950 md:text-5xl">My progress</h2>
                  <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
                    Education, professional experience, and milestones.
                  </p>
                </div>
                <button
                  onClick={toggleOrder}
                  className="inline-flex w-fit items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:border-slate-900 hover:text-slate-950"
                  title="Toggle timeline order"
                >
                  {isReversed ? <ChevronUpIcon size={18} /> : <ChevronDownIcon size={18} />}
                  {isReversed ? "Newest first" : "Oldest first"}
                </button>
              </div>

              <div className="relative -mx-6 overflow-x-auto px-6 pb-4 md:-mx-10 md:px-10 lg:-mx-12 lg:px-12">
                <div className="relative flex min-w-max gap-5 py-8">
                  <div className="absolute left-0 right-0 top-[3.15rem] h-px bg-gradient-to-r from-emerald-300 via-slate-300 to-blue-300" />
                  {displayedTimeline.map((item, index) => (
                    <article key={`${item.year}-${item.title}`} className="relative w-72 shrink-0 pt-14">
                      <div className="absolute left-6 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border-4 border-white bg-slate-950 text-xs font-black text-emerald-300 shadow-lg shadow-slate-300/70">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                      <div className="h-full rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm transition hover:-translate-y-1 hover:border-slate-300 hover:bg-white hover:shadow-lg">
                        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-800">{item.year}</span>
                        <h3 className="mt-5 text-lg font-black text-slate-950">{item.title}</h3>
                        <p className="mt-3 text-sm leading-6 text-slate-600" dangerouslySetInnerHTML={{ __html: item.description }} />
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section id="tools" className="relative mt-10 scroll-mt-24 md:mt-12">
          <Container>
            <div className="rounded-[2.25rem] border border-slate-200/90 bg-white/95 p-6 shadow-xl shadow-slate-200/70 md:p-10 lg:p-12">
              <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                <div>
                  {sectionEyebrow("Interactive tools")}
                  <h2 className="text-4xl font-black tracking-tight text-slate-950 md:text-5xl">Online tools</h2>
                  <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
                    Tools used by myself and my colleagues.
                  </p>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <ToolCard
                  href="/tomasulo"
                  title="Tomasulo Visualizer"
                  description="Step-by-step interactive simulation of dynamic instruction scheduling, reservation stations, and register renaming."
                  label="Launch visualizer"
                  icon={<CpuIcon className="h-6 w-6" />}
                />
                <ToolCard
                  href="/gpgpu-3d"
                  title="GPGPU 3D Visualizer"
                  description="three.js n-body demo UI for the ECE338 Simple GPGPU project, with the dummy backend running in-browser."
                  label="Launch tool"
                  icon={<WrenchIcon className="h-6 w-6" />}
                />
              </div>
            </div>
          </Container>
        </section>

        <section id="collaborators" className="relative mt-10 scroll-mt-24 md:mt-12">
          <Container>
            <div className="rounded-[2.25rem] border border-slate-200/90 bg-white/95 p-6 shadow-xl shadow-slate-200/70 md:p-10 lg:p-12">
              <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
                <div className="lg:sticky lg:top-28">
                  {sectionEyebrow("Collaborators")}
                  <h2 className="text-4xl font-black tracking-tight text-slate-950 md:text-5xl">People behind the projects</h2>
                  <p className="mt-4 text-lg leading-8 text-slate-600">
                    The talented people I had the pleasure working with. Check out their LinkedIn profiles.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {uniqueCollaborators.map((member) => (
                    <a
                      key={member.linkedin || member.name}
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white hover:shadow-lg"
                    >
                      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-slate-950 text-lg font-black text-white ring-1 ring-slate-200">
                        {member.avatar ? (
                          <img src={member.avatar} alt={member.name} className="h-full w-full object-cover" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">{member.name.charAt(0)}</div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="truncate font-black text-slate-950">{member.name}</h3>
                        <p className="mt-1 text-sm font-semibold text-slate-500">Project collaborator</p>
                      </div>
                      <LinkedinIcon className="h-5 w-5 text-slate-300 transition group-hover:text-[#0077b5]" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section id="contact" className="relative mt-10 scroll-mt-24 md:mt-12">
          <Container>
            <div className="overflow-hidden rounded-[2.25rem] border border-slate-200/90 bg-white/95 p-6 shadow-xl shadow-slate-200/70 md:p-10 lg:p-12">
              <div className="rounded-[2rem] border border-slate-800 bg-slate-950 p-8 text-white shadow-2xl shadow-slate-950/20 md:p-10">
                <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
                  <div>
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs font-bold uppercase tracking-[0.22em] text-slate-400">
                      <SparklesIcon className="h-3.5 w-3.5" />
                      Contact
                    </div>
                    <h2 className="text-3xl font-black tracking-tight md:text-5xl">Want to discuss?</h2>
                    <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
                      Send a short message. LinkedIn is best for quick conversations; the form is better for structured requests.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
                    <Button asChild variant="outline" size="default" className="rounded-xl border-slate-700 bg-transparent font-bold text-white hover:bg-white hover:text-slate-950">
                      <a
                        href="https://docs.google.com/forms/d/e/1FAIpQLSchD7dRpaz4QXcKSyzURG8qRyZv1erO9FMpEjBjJvo0ekzfGg/viewform?usp=dialog"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Google Form <ArrowUpRightIcon />
                      </a>
                    </Button>
                    <Button asChild variant="outline" size="default" className="rounded-xl border-slate-700 bg-transparent font-bold text-white hover:bg-white hover:text-slate-950">
                      <a
                        href="https://www.linkedin.com/in/tsiantosd/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        LinkedIn <ArrowUpRightIcon />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </div>
    </>
  );
}
