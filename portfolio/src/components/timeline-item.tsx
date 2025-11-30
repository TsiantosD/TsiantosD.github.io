interface TimelineItemProps {
  year: string;
  title: string;
  description: string;
}

export function TimelineItem({ year, title, description }: TimelineItemProps) {
  return (
    <div className="border-l pl-6 relative pb-10">
      <div className="absolute left-0 top-1 -translate-x-1/2 h-3 w-3 rounded-full bg-primary" />

      <p className="text-sm text-muted-foreground">{year}</p>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-1 text-muted-foreground" dangerouslySetInnerHTML={{ __html: description }}></p>
    </div>
  );
}
