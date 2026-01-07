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
    <>
      {/* Dot Navigation - Desktop only, right side */}
      <div className="hidden md:flex fixed right-8 top-1/2 -translate-y-1/2 z-50 flex-col items-center">
        <div className="relative flex flex-col gap-3">
          {/* Background track line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-2 bottom-2 w-[2px] bg-neutral-200" />
          
          {/* Progress fill line */}
          <motion.div 
            className="absolute left-1/2 -translate-x-1/2 top-2 w-[2px] bg-primary origin-top"
            style={{ 
              height: `calc(100% - 16px)`,
              scaleY: scrollProgress,
            }}
            transition={{ duration: 0.1, ease: "easeOut" }}
          />
          
          {/* Dots */}
          {Array.from({ length: totalDots }).map((_, i) => (
            <motion.button
              key={i}
              onClick={() => scrollToSection(i)}
              className="group relative w-4 h-4 flex items-center justify-center cursor-pointer z-10"
              aria-label={`Scroll to section ${i + 1}`}
              whileHover={{ scale: 1.2 }}
              transition={{ duration: 0.2 }}
            >
              {/* Outer ring with background */}
              <span className={`absolute inset-0 rounded-full border-2 bg-background transition-all duration-300 ${
                i <= activeDot 
                  ? "border-primary" 
                  : "border-neutral-300 group-hover:border-neutral-400"
              }`} />
              {/* Inner fill */}
              <motion.span 
                className="relative w-2 h-2 rounded-full bg-primary"
                initial={false}
                animate={{ 
                  scale: i <= activeDot ? 1 : 0,
                  opacity: i <= activeDot ? 1 : 0
                }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Scroll to Top Button - Center aligned, separate from dots */}
      <AnimatePresence>
        {isAtBottom && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={scrollToTop}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-1 text-primary hover:text-primary/80 transition-colors"
            aria-label="Scroll to top"
          >
            <motion.div
              className="flex flex-col items-center"
              animate={{ y: [0, -4, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <ArrowUp className="h-5 w-5" />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
