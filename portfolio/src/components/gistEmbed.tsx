import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { Code2, ExternalLink, Github, X } from "lucide-react";

const githubMonospaceFontStack =
  'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace';

export function GistEmbed({ gistId }: { gistId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const gistUrl = `https://gist.github.com/${gistId}`;

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
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
            body { margin: 0; padding: 0; background: #ffffff; }
            .gist .gist-file { margin-bottom: 0 !important; border-radius: 0 !important; }
            .gist,
            .gist .gist-file,
            .gist .gist-data,
            .gist .blob-wrapper,
            .gist .highlight,
            .gist table,
            .gist pre,
            .gist code,
            .gist .blob-num,
            .gist .blob-code,
            .gist .blob-code-inner {
              font-family: ${githubMonospaceFontStack} !important;
            }
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

  const resizeIframeToContent = () => {
    const iframe = iframeRef.current;
    const iframeDocument = iframe?.contentWindow?.document;
    if (!iframe || !iframeDocument) return;

    iframe.style.height = `${iframeDocument.body.scrollHeight}px`;
  };

  const modal = isOpen ? (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-slate-950/75 p-2 backdrop-blur-sm sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="GitHub Gist source code"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          setIsOpen(false);
        }
      }}
    >
      <div className="flex max-h-[calc(100dvh-1rem)] w-full max-w-5xl flex-col overflow-hidden rounded-t-3xl border border-slate-700 bg-white shadow-2xl shadow-slate-950/40 sm:max-h-[min(760px,calc(100dvh-3rem))] sm:rounded-3xl">
        <div className="flex items-center justify-between gap-3 border-b border-slate-200 bg-slate-950 px-4 py-3 text-white sm:px-5">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300 ring-1 ring-emerald-300/30">
              <Github className="h-4 w-4" />
            </span>
            <div className="min-w-0">
              <h2 className="truncate text-sm font-semibold">Source code</h2>
              <p className="truncate text-xs text-slate-400">GitHub Gist</p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <a
              href={gistUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 items-center gap-2 rounded-full border border-slate-700 px-3 text-xs font-semibold text-emerald-200 transition-colors hover:border-emerald-300/70 hover:bg-emerald-300/10"
            >
              <span className="hidden sm:inline">Open gist</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full text-slate-300 hover:bg-white/10 hover:text-white"
              onClick={() => setIsOpen(false)}
              aria-label="Close gist modal"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto bg-white">
          <iframe
            ref={iframeRef}
            width="100%"
            frameBorder="0"
            title={`gist-${gistId}`}
            scrolling="no"
            className="block min-h-[240px] w-full"
            onLoad={() => {
              resizeIframeToContent();
              setTimeout(resizeIframeToContent, 150);
              setTimeout(resizeIframeToContent, 500);
            }}
          />
        </div>
      </div>
    </div>
  ) : null;

  return (
    <div className="my-8 w-full">
      <Button
        type="button"
        variant="ghost"
        className="group h-auto w-full justify-between rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-left text-white shadow-lg shadow-slate-950/10 transition-colors hover:border-emerald-400/70 hover:bg-slate-900 hover:text-white sm:px-5"
        onClick={() => setIsOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <span className="flex min-w-0 items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300 ring-1 ring-emerald-300/30 transition-colors group-hover:bg-emerald-300 group-hover:text-slate-950">
            <Code2 className="h-4 w-4" />
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-semibold leading-tight">View source code</span>
            <span className="mt-1 block truncate text-xs font-medium text-slate-400">GitHub Gist</span>
          </span>
        </span>
        <span className="ml-3 inline-flex shrink-0 items-center gap-2 rounded-full border border-slate-700 px-3 py-1 text-xs font-semibold text-emerald-200 transition-colors group-hover:border-emerald-300/70 group-hover:bg-emerald-300/10">
          <Github className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">View gist</span>
        </span>
      </Button>

      {modal && createPortal(modal, document.body)}
    </div>
  );
}
