import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Project } from '@/types';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
  aspectRatio?: 'portrait' | 'landscape' | 'square';
  showCategory?: boolean;
  index?: number;
}

/**
 * Project card component with image, hover overlay, and smooth animations
 * Used in homepage featured projects and portfolio grid
 */
export function ProjectCard({ 
  project, 
  aspectRatio, 
  showCategory = true,
  index = 0 
}: ProjectCardProps) {
  const [isVideoReady, setIsVideoReady] = React.useState(false);
  const [videoError, setVideoError] = React.useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Force video to play when loaded
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !project.coverVideo) return;
    
    const playVideo = async () => {
      try {
        video.muted = true; // Ensure muted for autoplay
        await video.play();
        setIsVideoReady(true);
      } catch (err) {
        console.log('Video autoplay failed:', err);
        setVideoError(true);
      }
    };
    
    if (video.readyState >= 3) {
      playVideo();
    } else {
      video.addEventListener('canplay', playVideo, { once: true });
    }
    
    return () => {
      video.removeEventListener('canplay', playVideo);
    };
  }, [project.coverVideo]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        to={`/project/${project.slug}`}
        className="group block relative overflow-hidden rounded-sm"
      >
        {/* Image/Video Container - fixed aspect ratio ensures same height */}
        <div className="relative overflow-hidden bg-black aspect-[4/3]">
          {project.coverVideo && !videoError ? (
            <video
              ref={videoRef}
              src={project.coverVideo}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className={cn(
                "w-full h-full object-contain transition-all duration-700 group-hover:scale-110",
                isVideoReady ? "opacity-100" : "opacity-0"
              )}
              onError={() => setVideoError(true)}
            />
          ) : null}
          
          {/* Show cover image as fallback or while video loads */}
          {(!project.coverVideo || videoError || !isVideoReady) && (
            <img
              src={project.coverImage}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
              loading={index < 6 ? 'eager' : 'lazy'}
            />
          )}
          
          {/* Subtle hover border effect */}
          <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/10 transition-colors duration-500" />
        </div>
        
        {/* Project info below video */}
        <div className="pt-3 space-y-1">
          <h3 className="text-foreground text-sm font-medium tracking-wide">
            {project.title}
          </h3>
          {showCategory && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground font-light tracking-wide">
              <span className="capitalize">{project.category === 'production-app' ? 'Production-App' : project.category}</span>
              <span>•</span>
              <span>{project.year}</span>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
