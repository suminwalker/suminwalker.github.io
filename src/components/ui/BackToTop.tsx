import { useState, useEffect } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

export function BackToTop() {
  const [isAtTop, setIsAtTop] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const location = useLocation();
  
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setIsAtTop(scrollTop < 100);
      setIsAtBottom(scrollTop > docHeight - 100);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
  };

  if (!isHomePage) return null;

  return (
    <>
      {/* Scroll Down - Top of page */}
      <AnimatePresence>
        {isAtTop && (
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            onClick={scrollToBottom}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-1 text-neutral-400 hover:text-neutral-600 transition-colors"
            aria-label="Scroll down"
          >
            <motion.div
              className="flex flex-col items-center gap-1"
              animate={{ y: [0, 4, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <span className="text-xs font-medium tracking-wider uppercase">Scroll Down</span>
              <ArrowDown className="h-4 w-4" />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Scroll Up - Bottom of page */}
      <AnimatePresence>
        {isAtBottom && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={scrollToTop}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-1 text-neutral-400 hover:text-neutral-600 transition-colors"
            aria-label="Scroll to top"
          >
            <motion.div
              className="flex flex-col items-center gap-1"
              animate={{ y: [0, -4, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <ArrowUp className="h-4 w-4" />
              <span className="text-xs font-medium tracking-wider uppercase">Scroll Up</span>
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
