import React from 'react';
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
  const [isLoaded, setIsLoaded] = React.useState(false);
  const ratio = aspectRatio || 'landscape';
  
  const aspectRatioClasses = {
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[3/2]',
    square: 'aspect-square'
  };

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
          {/* Loading placeholder */}
          {!isLoaded && (
            <div className="absolute inset-0 bg-black" />
          )}
          
          {project.coverVideo ? (
            <video
              src={project.coverVideo}
              autoPlay
              loop
              muted
              playsInline
              className={cn(
                'w-full h-full object-contain transition-all duration-700',
                isLoaded ? 'opacity-100' : 'opacity-0',
                'group-hover:scale-110'
              )}
              onLoadedData={() => setIsLoaded(true)}
            />
          ) : (
            <motion.img
              src={project.coverImage}
              alt={project.title}
              className={cn(
                'w-full h-full object-contain transition-all duration-700',
                isLoaded ? 'opacity-100' : 'opacity-0',
                'group-hover:scale-110'
              )}
              loading={index < 6 ? 'eager' : 'lazy'}
              onLoad={() => setIsLoaded(true)}
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
