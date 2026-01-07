import { useEffect } from 'react';

// Project demo videos (imported assets get hashed URLs)
import betterVideoAiDemo from '@/assets/better-video-ai-demo.mp4';
import deckCraftDemo from '@/assets/deckcraft-demo.mp4';

const ASSET_VIDEOS = [betterVideoAiDemo, deckCraftDemo];

// Start preloading immediately when module loads (before React renders)
const preloadedVideos: HTMLVideoElement[] = [];

function preloadVideoImmediately(src: string) {
  const video = document.createElement('video');
  video.preload = 'auto';
  video.muted = true;
  video.playsInline = true;
  video.src = src;
  
  // Start loading immediately
  video.load();
  
  // Buffer more content for smoother playback
  video.addEventListener('loadeddata', () => {
    // Try to buffer ahead by playing briefly (muted)
    video.play().catch(() => {
      // Autoplay blocked is fine, video is still buffering
    });
    // Pause after a short time to keep buffer without playing
    setTimeout(() => video.pause(), 100);
  }, { once: true });
  
  preloadedVideos.push(video);
}

// Execute preloading immediately on module load
if (typeof window !== 'undefined') {
  ASSET_VIDEOS.forEach(preloadVideoImmediately);
}

/**
 * Hook to ensure videos are preloaded - the actual preloading happens
 * immediately when the module is imported, this hook just ensures
 * the module is included in the bundle
 */
export function useVideoPreloader() {
  useEffect(() => {
    // Videos are already preloading from module initialization
    // This effect ensures the preload persists and provides a hook interface
    return () => {
      // Cleanup: pause any playing videos on unmount
      preloadedVideos.forEach(video => video.pause());
    };
  }, []);
}
