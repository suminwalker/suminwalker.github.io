import React from 'react';
import { motion } from 'framer-motion';

interface GlitchGridOverlayProps {
  videoSrc: string;
  rows?: number;
  cols?: number;
}

const GlitchGridOverlay: React.FC<GlitchGridOverlayProps> = ({ 
  videoSrc, 
  rows = 5, 
  cols = 5 
}) => {
  const totalTiles = rows * cols;
  
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* The Glitch/Mirror Grid Overlay */}
      <div 
        className="absolute inset-0 grid" 
        style={{ 
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)` 
        }}
      >
        {[...Array(totalTiles)].map((_, i) => {
          const row = Math.floor(i / cols);
          const col = i % cols;
          
          // Mirror logic: Flip every other column or row
          const isMirrored = (row + col) % 2 === 0;
          
          return (
            <motion.div
              key={i}
              className="relative overflow-hidden border-[0.5px] border-white/10"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ 
                opacity: [0.7, 1, 0.8],
                scale: [1, 1.05, 1],
                rotateY: isMirrored ? [0, 10, 0] : [0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.05,
                ease: "easeInOut"
              }}
            >
              <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute object-cover"
                style={{
                  width: `${cols * 100}%`,
                  height: `${rows * 100}%`,
                  left: `-${col * 100}%`,
                  top: `-${row * 100}%`,
                  transform: isMirrored ? 'scaleX(-1)' : 'none',
                  filter: `brightness(${1 + (i % 3) * 0.1}) contrast(1.2)`,
                }}
                src={videoSrc}
              />
              
              {/* Subtle Glitch Overlay per Tile */}
              <motion.div 
                className="absolute inset-0 bg-cyan-500/5 mix-blend-overlay"
                animate={{ opacity: [0, 0.2, 0] }}
                transition={{ duration: 0.2, repeat: Infinity, delay: Math.random() }}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Aesthetic "Scanline" Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_4px,3px_100%]" />
    </div>
  );
};

export default GlitchGridOverlay;
