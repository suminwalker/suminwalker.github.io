import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function BackToTop() {
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      
      setScrollProgress(progress);
      setIsAtBottom(scrollTop > docHeight - 100);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const totalDots = 5;
  const activeDot = Math.min(Math.floor(scrollProgress * totalDots), totalDots - 1);

  const scrollToSection = (dotIndex: number) => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const targetScroll = (dotIndex / (totalDots - 1)) * docHeight;
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-3">
      {/* Dot Progress Indicator - Always visible */}
      <div className="flex flex-col gap-2.5 bg-white/90 backdrop-blur-sm px-2.5 py-4 rounded-full shadow-lg border border-neutral-200">
        {Array.from({ length: totalDots }).map((_, i) => (
          <motion.button
            key={i}
            onClick={() => scrollToSection(i)}
            className={`w-3 h-3 rounded-full cursor-pointer transition-colors border-2 ${
              i <= activeDot 
                ? "bg-primary border-primary" 
                : "bg-transparent border-neutral-400 hover:border-primary/70"
            }`}
            animate={{
              scale: i === activeDot ? [1, 1.3, 1] : 1,
            }}
            transition={{
              scale: { duration: 0.4, ease: "easeOut" },
            }}
            aria-label={`Scroll to section ${i + 1}`}
          />
        ))}
      </div>

      {/* Scroll to Top Button - Only at bottom */}
      <AnimatePresence>
        {isAtBottom && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            onClick={scrollToTop}
            className="flex flex-col items-center gap-1 text-primary hover:text-primary/80 transition-colors mt-2"
            aria-label="Scroll to top"
          >
            <motion.div
              className="flex flex-col items-center gap-0.5"
              animate={{ y: [0, -4, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <ArrowUp className="h-4 w-4" />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
