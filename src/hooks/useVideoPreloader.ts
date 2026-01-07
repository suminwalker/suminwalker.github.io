import { useEffect } from 'react';

// Project demo videos (imported assets get hashed URLs)
import betterVideoAiDemo from '@/assets/better-video-ai-demo.mp4';
import deckCraftDemo from '@/assets/deckcraft-demo.mp4';

const ASSET_VIDEOS = [betterVideoAiDemo, deckCraftDemo];

/**
 * Preloads project demo videos to eliminate lag when navigating
 */
export function useVideoPreloader() {
  useEffect(() => {
    const preloadVideo = (src: string) => {
      const video = document.createElement('video');
      video.preload = 'auto';
      video.muted = true;
      video.src = src;
      video.load();
    };

    ASSET_VIDEOS.forEach(preloadVideo);
  }, []);
}
