import { Card, CardContent } from "@/components/ui/card";

interface TimelineItem2Props {
  index: number;
  year: string;
  title: string;
  subtitle: string;
  description: string;
}

export function TimelineItem2({ index, year, title, description }: TimelineItem2Props) {
  return (
    <div key={index} className="relative mb-10 pl-8">
      <div className="bg-foreground absolute left-0 top-3.5 flex size-4 items-center justify-center rounded-full" />
      <h4 className="rounded-xl py-2 text-xl font-bold tracking-tight xl:mb-4 xl:px-3">
        {title}
      </h4>

      <h5 className="text-md -left-34 text-muted-foreground top-3 rounded-xl tracking-tight xl:absolute">
        {year}
      </h5>

      <Card className="my-5 border-none shadow-none">
        <CardContent className="px-0 xl:px-2">
          <div
            className="prose dark:prose-invert text-foreground"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
