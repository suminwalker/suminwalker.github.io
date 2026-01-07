import { useState, useEffect } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function BackToTop() {
  const [isAtTop, setIsAtTop] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      
      setScrollProgress(progress);
      setIsAtTop(scrollTop < 100);
      setIsAtBottom(scrollTop > docHeight - 100);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    if (isAtTop) {
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const showButton = isAtTop || isAtBottom;
  const totalDots = 5;
  const activeDot = Math.min(Math.floor(scrollProgress * totalDots), totalDots - 1);

  return (
    <AnimatePresence>
      {showButton && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-3"
        >
          {/* Dot Progress Indicator */}
          <div className="flex gap-2">
            {Array.from({ length: totalDots }).map((_, i) => (
              <motion.div
                key={i}
                className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30"
                animate={{
                  backgroundColor: i <= activeDot ? "hsl(var(--primary))" : "hsl(var(--muted-foreground) / 0.3)",
                  scale: i === activeDot ? [1, 1.3, 1] : 1,
                }}
                transition={{
                  backgroundColor: { duration: 0.3 },
                  scale: { duration: 0.4, ease: "easeOut" },
                }}
              />
            ))}
          </div>

          {/* Scroll Button */}
          <motion.button
            onClick={handleClick}
            className="flex flex-col items-center gap-1 text-primary hover:text-primary/80 transition-colors"
            aria-label={isAtTop ? "Scroll down" : "Scroll to top"}
            animate={{ y: [0, 6, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
            {isAtTop ? (
              <ArrowDown className="h-4 w-4" />
            ) : (
              <ArrowUp className="h-4 w-4" />
            )}
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
