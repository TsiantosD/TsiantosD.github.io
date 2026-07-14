import { lazy, Suspense, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Navbar } from "./components/layout/navbar";
import { ChevronUpIcon } from "lucide-react";
import {Footer2} from "./components/footer2.tsx";
import { BrowserRouter, Routes, Route, useLocation, useNavigationType } from "react-router-dom";

const Home = lazy(() => import("./components/pages/home.tsx"));
const Course = lazy(() => import("./components/pages/course.tsx"));
const Tomasulo = lazy(() => import("./components/pages/tomasulo.tsx"));
const Gpgpu3DVisualizer = lazy(() => import("./components/pages/gpgpu-3d.tsx"));

function RouteLoadingFallback() {
  return (
    <main className="flex min-h-[60vh] w-full items-center justify-center bg-slate-50 px-4 text-slate-600">
      <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-semibold shadow-sm">
        Loading page…
      </div>
    </main>
  );
}

export function ScrollToHash() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Small timeout ensures the DOM has rendered before we try to scroll
      const timeout = setTimeout(() => {
        const element = document.getElementById(hash.replace("#", ""));
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);

      return () => clearTimeout(timeout);
    }
  }, [hash]);

  return null;
}

const scrollStorageKey = (locationKey: string) => `portfolio-scroll:${locationKey}`;

function saveScrollPosition(locationKey: string) {
  sessionStorage.setItem(
    scrollStorageKey(locationKey),
    JSON.stringify({ x: window.scrollX, y: window.scrollY })
  );
}

function readScrollPosition(locationKey: string): { x: number; y: number } | null {
  const raw = sessionStorage.getItem(scrollStorageKey(locationKey));
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as { x?: unknown; y?: unknown };
    return typeof parsed.x === "number" && typeof parsed.y === "number"
      ? { x: parsed.x, y: parsed.y }
      : null;
  } catch {
    return null;
  }
}

function ScrollRestoration() {
  const location = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    const originalScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    return () => {
      window.history.scrollRestoration = originalScrollRestoration;
    };
  }, []);

  useLayoutEffect(() => {
    if (location.hash) return;

    if (navigationType === "POP") {
      const savedPosition = readScrollPosition(location.key);
      window.scrollTo(savedPosition?.x ?? 0, savedPosition?.y ?? 0);
      return;
    }

    window.scrollTo(0, 0);
  }, [location, navigationType]);

  useEffect(() => {
    const key = location.key;
    const saveCurrentPosition = () => saveScrollPosition(key);

    window.addEventListener("pagehide", saveCurrentPosition);
    return () => {
      saveCurrentPosition();
      window.removeEventListener("pagehide", saveCurrentPosition);
    };
  }, [location.key]);

  return null;
}

export default function App() {
  const [showTop, setShowTop] = useState(false);

  const showTopRef = useRef(false);
  const scrollFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const updateShowTop = () => {
      scrollFrameRef.current = null;
      const nextShowTop = window.scrollY > 100;

      if (showTopRef.current !== nextShowTop) {
        showTopRef.current = nextShowTop;
        setShowTop(nextShowTop);
      }
    };

    const onScroll = () => {
      if (scrollFrameRef.current !== null) return;
      scrollFrameRef.current = window.requestAnimationFrame(updateShowTop);
    };

    updateShowTop();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollFrameRef.current !== null) {
        window.cancelAnimationFrame(scrollFrameRef.current);
      }
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <BrowserRouter>
      <ScrollRestoration />
      <ScrollToHash />
      <Navbar />
      <div className="w-full justify-items-center">
        <Suspense fallback={<RouteLoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/course/:slug" element={<Course />} />
            <Route path="/tomasulo/" element={<Tomasulo />} />
            <Route path="/gpgpu-3d/" element={<Gpgpu3DVisualizer />} />
          </Routes>
        </Suspense>

        <Footer2 />
        <button
          type="button"
          aria-label="Scroll to top"
          aria-hidden={!showTop}
          onClick={scrollToTop}
          className={`fixed bottom-10 right-10 p-3 bg-white rounded-full shadow-lg focus:outline-none transform-gpu 
        transition-all duration-300 ease-in-out ${
            showTop
              ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
              : "opacity-0 translate-y-6 scale-95 pointer-events-none"
          }`}
        >
          <ChevronUpIcon className="w-5 h-5 text-black" />
        </button>
      </div>
    </BrowserRouter>
  );
}
