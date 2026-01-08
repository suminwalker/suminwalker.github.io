import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

const STORAGE_KEY = 'welcome-modal-dismissed';

export function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user has dismissed the modal before
    const dismissed = sessionStorage.getItem(STORAGE_KEY);
    if (!dismissed) {
      // Show immediately with hero text
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem(STORAGE_KEY, 'true');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />
          
          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-6 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative bg-white text-black max-w-md w-full p-10 pointer-events-auto"
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 hover:bg-black/5 transition-colors rounded"
                aria-label="Close modal"
              >
                <X className="size-5 text-black/60" />
              </button>

              {/* Content */}
              <div className="text-center space-y-6">
                <h2 className="text-2xl md:text-3xl font-light tracking-[0.3em] uppercase">
                  Let's Build
                </h2>
                
                <p className="text-base font-light leading-relaxed text-black/80">
                  Looking for a product designer to bring your AI app to life?
                  <br />
                  Let's discuss your project or subscribe for updates on my latest work.
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    to="/contact"
                    onClick={handleClose}
                    className="px-8 py-3 bg-black text-white text-sm font-medium tracking-widest uppercase hover:bg-black/80 transition-colors"
                  >
                    Start a Project
                  </Link>
                  <Link
                    to="/portfolio"
                    onClick={handleClose}
                    className="px-8 py-3 bg-black text-white text-sm font-medium tracking-widest uppercase hover:bg-black/80 transition-colors"
                  >
                    View Work
                  </Link>
                </div>

                <p className="text-xs text-black/50 font-light">
                  Available for freelance projects
                </p>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}