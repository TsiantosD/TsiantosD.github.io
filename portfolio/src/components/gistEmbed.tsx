import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Code2 } from "lucide-react";

export function GistEmbed({ gistId }: { gistId: string }) {
  const [isOpen, setIsOpen] = useState(false); // Collapsed by default
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Only run the iframe logic if it's open
    if (!isOpen || !iframeRef.current) return;

    const iframe = iframeRef.current;
    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!doc) return;

    const scriptSrc = `https://gist.github.com/${gistId}.js`;
    const content = `
      <html>
        <head>
          <base target="_blank">
          <style>
            body { margin: 0; padding: 0; }
            .gist .gist-file { margin-bottom: 0 !important; }
          </style>
        </head>
        <body>
          <script src="${scriptSrc}"></script>
        </body>
      </html>
    `;

    doc.open();
    doc.write(content);
    doc.close();
  }, [gistId, isOpen]);

  return (
    <div className="my-8 w-full overflow-hidden rounded-lg border border-border shadow-sm bg-card">
      {/* Header / Toggle Button */}
      <Button 
        variant="ghost" 
        className="w-full flex items-center justify-between p-4 h-auto hover:bg-muted/50 transition-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium">View Source Code (Gist)</span>
        </div>
        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </Button>

      {/* Conditional Iframe Rendering */}
      {isOpen && (
        <div className="bg-white">
          <iframe
            ref={iframeRef}
            width="100%"
            frameBorder="0"
            title={`gist-${gistId}`}
            scrolling="no"
            className="min-h-[150px]" 
            onLoad={(e) => {
              const iframe = e.currentTarget;
              if (iframe.contentWindow) {
                // Adjust height after content loads
                setTimeout(() => {
                   iframe.style.height = iframe.contentWindow?.document.body.scrollHeight + "px";
                }, 100);
              }
            }}
          />
        </div>
      )}
    </div>
  );
}