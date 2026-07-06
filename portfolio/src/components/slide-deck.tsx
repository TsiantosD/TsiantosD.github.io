import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";

import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

interface SlideDeckProps {
  slides: string[];
  title?: string;
  pdfUrl?: string;
}

export function SlideDeck({ slides, title = "Presentation", pdfUrl }: SlideDeckProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(1);

  useEffect(() => {
    if (!api) return;

    const updateCurrent = () => {
      setCurrent(api.selectedScrollSnap() + 1);
    };

    updateCurrent();
    api.on("select", updateCurrent);
    api.on("reInit", updateCurrent);

    return () => {
      api.off("select", updateCurrent);
      api.off("reInit", updateCurrent);
    };
  }, [api]);

  if (slides.length === 0) return null;

  return (
    <section className="not-prose my-10 rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h4 className="text-lg font-semibold text-slate-900">{title}</h4>
          <p className="text-sm text-slate-500">
            Slide {current} of {slides.length}
          </p>
        </div>
        {pdfUrl && (
          <Button asChild variant="outline" size="sm" className="w-fit">
            <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
              View PDF
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        )}
      </div>

      <Carousel setApi={setApi} opts={{ align: "start", loop: false }} className="w-full">
        <CarouselContent className="ml-0">
          {slides.map((src, index) => (
            <CarouselItem key={src} className="pl-0">
              <figure className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <img
                  src={src}
                  alt={`${title} slide ${index + 1}`}
                  loading={index === 0 ? "eager" : "lazy"}
                  className="aspect-video w-full object-contain"
                />
              </figure>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2 bg-white/90 shadow-md sm:-left-12" />
        <CarouselNext className="right-2 bg-white/90 shadow-md sm:-right-12" />
      </Carousel>
    </section>
  );
}
