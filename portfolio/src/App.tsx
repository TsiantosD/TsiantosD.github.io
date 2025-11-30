import { useEffect, useState } from "react";
import { Navbar } from "./components/layout/navbar";
import Home from "./components/pages/home.tsx";
import { ChevronUpIcon } from "lucide-react";
import {Footer2} from "./components/footer2.tsx";

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
    <>
      <Navbar />
      <div className="justify-items-center">
        <Home />
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
    </>
  );
}