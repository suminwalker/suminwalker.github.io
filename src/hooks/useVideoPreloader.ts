import { useEffect } from 'react';

// All videos used in the application (only preload on desktop)
const VIDEO_URLS = [
  '/videos/Home_Background_Video.mp4',
  '/videos/About_Video.mp4',
];

// Project demo videos (imported assets get hashed URLs, so we'll preload them separately)
import betterVideoAiDemo from '@/assets/better-video-ai-demo.mp4';
import deckCraftDemo from '@/assets/deckcraft-demo.mp4';

const ASSET_VIDEOS = [betterVideoAiDemo, deckCraftDemo];

/**
 * Preloads all videos in the application to eliminate lag when navigating
 * Only preloads on desktop (>= 1024px) to save mobile bandwidth
 */
export function useVideoPreloader() {
  useEffect(() => {
    // Only preload on desktop to save mobile bandwidth
    const isDesktop = window.innerWidth >= 1024;
    if (!isDesktop) return;

    const preloadVideo = (src: string) => {
      const video = document.createElement('video');
      video.preload = 'auto';
      video.muted = true;
      video.src = src;
      // Start loading the video
      video.load();
    };

    // Preload public videos
    VIDEO_URLS.forEach(preloadVideo);
    
    // Preload asset videos
    ASSET_VIDEOS.forEach(preloadVideo);
  }, []);
}
