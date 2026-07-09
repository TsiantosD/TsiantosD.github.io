import { useRef, useState } from "react";
import { Container } from "@/components/layout/container";

const STATIC_VISUALIZER_URL = "/ece338-gpgpu-3d/visualizer.html";

export default function Gpgpu3DVisualizer() {
  const [iframeKey, setIframeKey] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const reloadFrame = () => setIframeKey((key) => key + 1);
  const openPreviewFullscreen = () => {
    void iframeRef.current?.requestFullscreen?.();
  };

  return (
    <main className="w-full bg-slate-950 text-white min-h-screen pt-24 pb-12">
      <Container className="space-y-8">
        <section className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-blue-300">ECE338 · Simple GPGPU</p>
          <h1 className="text-4xl md:text-5xl font-bold">3D n-body GPGPU Visualizer</h1>
        </section>

        <section className="grid gap-4 lg:grid-cols-[1fr_320px]">
          <div className="relative h-[72vh] overflow-hidden rounded-2xl border border-slate-700 bg-black shadow-2xl">
            <button
              type="button"
              onClick={openPreviewFullscreen}
              aria-label="Fullscreen visualizer preview"
              title="Fullscreen preview"
              className="absolute right-3 top-3 z-10 rounded-lg border border-slate-500/70 bg-slate-950/75 p-2 text-white shadow-lg backdrop-blur transition hover:bg-slate-800"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M8 3H5a2 2 0 0 0-2 2v3" />
                <path d="M16 3h3a2 2 0 0 1 2 2v3" />
                <path d="M21 16v3a2 2 0 0 1-2 2h-3" />
                <path d="M8 21H5a2 2 0 0 1-2-2v-3" />
              </svg>
            </button>
            <iframe
              ref={iframeRef}
              key={iframeKey}
              src={STATIC_VISUALIZER_URL}
              title="ECE338 3D n-body visualizer with in-browser dummy backend"
              className="h-full w-full border-0"
              allow="fullscreen"
              allowFullScreen
            />
          </div>

          <aside className="rounded-2xl border border-slate-700 bg-slate-900/80 p-5 shadow-xl space-y-5 h-fit">
            <div>
              <h2 className="text-xl font-bold mb-2">Built-in dummy backend</h2>
              <p className="text-sm text-slate-300">
                The n-body model is ported from the ECE338 dummy backend to client-side JavaScript. It loads the bundled ECE338 JSON datasets and uses the same
                integer force/update rules for a self-contained demo.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={reloadFrame}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold hover:bg-blue-500"
              >
                Reload visualizer
              </button>
              <a
                href={STATIC_VISUALIZER_URL}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg bg-slate-700 px-4 py-2 text-sm font-bold hover:bg-slate-600"
              >
                Open in new tab
              </a>
            </div>

            <div className="text-sm text-slate-300 space-y-2">
              <h3 className="font-semibold text-white">Controls</h3>
              <p>Drag to orbit, scroll to zoom.</p>
              <p><kbd className="rounded bg-slate-800 px-1">Space</kbd>/<kbd className="rounded bg-slate-800 px-1">p</kbd> play-pause.</p>
              <p><kbd className="rounded bg-slate-800 px-1">n</kbd> step, <kbd className="rounded bg-slate-800 px-1">r</kbd> reset, <kbd className="rounded bg-slate-800 px-1">+</kbd>/<kbd className="rounded bg-slate-800 px-1">-</kbd> speed.</p>
            </div>
          </aside>
        </section>
      </Container>
    </main>
  );
}
