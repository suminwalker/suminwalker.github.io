import { useEffect } from 'react';

// Project demo videos
import betterVideoAiDemo from '@/assets/better-video-ai-demo.mp4';
import deckCraftDemo from '@/assets/deckcraft-demo.mp4';

// Project images
import betterVideoAiLanding from '@/assets/better-video-ai-landing.png';
import betterVideoAiFeatures from '@/assets/better-video-ai-features.png';
import betterVideoAiDashboard from '@/assets/better-video-ai-dashboard.png';
import deckCraftHero from '@/assets/deckcraft-hero.png';
import deckCraftFeatures from '@/assets/deckcraft-features.png';
import deckCraftLab from '@/assets/deckcraft-lab.png';

const ASSET_VIDEOS = [betterVideoAiDemo, deckCraftDemo];
const ASSET_IMAGES = [
  betterVideoAiLanding,
  betterVideoAiFeatures,
  betterVideoAiDashboard,
  deckCraftHero,
  deckCraftFeatures,
  deckCraftLab,
];

// Preloaded assets storage
const preloadedVideos: HTMLVideoElement[] = [];
const preloadedImages: HTMLImageElement[] = [];

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

function preloadImageImmediately(src: string) {
  const img = new Image();
  img.src = src;
  preloadedImages.push(img);
}

// Execute preloading immediately on module load (before React renders)
if (typeof window !== 'undefined') {
  // Preload images first (smaller, faster)
  ASSET_IMAGES.forEach(preloadImageImmediately);
  // Then preload videos
  ASSET_VIDEOS.forEach(preloadVideoImmediately);
}

/**
 * Hook to ensure videos and images are preloaded - the actual preloading happens
 * immediately when the module is imported, this hook just ensures
 * the module is included in the bundle
 */
export function useVideoPreloader() {
  useEffect(() => {
    // Videos and images are already preloading from module initialization
    // This effect ensures the preload persists and provides a hook interface
    return () => {
      // Cleanup: pause any playing videos on unmount
      preloadedVideos.forEach(video => video.pause());
    };
  }, []);
}
