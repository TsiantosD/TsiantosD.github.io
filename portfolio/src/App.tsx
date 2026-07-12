import { useEffect, useState } from "react";
import { Navbar } from "./components/layout/navbar";
import Home from "./components/pages/home.tsx";
import Course from "./components/pages/course.tsx";
import Tomasulo from "./components/pages/tomasulo.tsx";
import Gpgpu3DVisualizer from "./components/pages/gpgpu-3d.tsx";
import { ChevronUpIcon } from "lucide-react";
import {Footer2} from "./components/footer2.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";

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

export default function App() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 100);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <BrowserRouter>
      <ScrollToHash />
      <Navbar />
      <div className="w-full justify-items-center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/course/:slug" element={<Course />} />
          <Route path="/tomasulo/" element={<Tomasulo />} />
          <Route path="/gpgpu-3d/" element={<Gpgpu3DVisualizer />} />
        </Routes>

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
