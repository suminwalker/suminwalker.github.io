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

const CACHE_NAME = 'portfolio-assets-v1';
const ASSET_VIDEOS = [betterVideoAiDemo, deckCraftDemo];
const ASSET_IMAGES = [
  betterVideoAiLanding,
  betterVideoAiFeatures,
  betterVideoAiDashboard,
  deckCraftHero,
  deckCraftFeatures,
  deckCraftLab,
];

// Preloaded assets storage (for current session)
const preloadedVideos: HTMLVideoElement[] = [];
const preloadedImages: HTMLImageElement[] = [];

// Cache assets using Cache API for persistence across sessions
async function cacheAsset(url: string): Promise<void> {
  try {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(url);
    
    if (!cachedResponse) {
      // Not in cache, fetch and store
      const response = await fetch(url);
      if (response.ok) {
        await cache.put(url, response.clone());
      }
    }
  } catch {
    // Cache API not available or failed - fallback to normal loading
  }
}

function preloadVideoImmediately(src: string) {
  // Cache for persistence
  cacheAsset(src);
  
  const video = document.createElement('video');
  video.preload = 'auto';
  video.muted = true;
  video.playsInline = true;
  video.src = src;
  
  // Start loading immediately
  video.load();
  
  // Buffer more content for smoother playback
  video.addEventListener('loadeddata', () => {
    video.play().catch(() => {});
    setTimeout(() => video.pause(), 100);
  }, { once: true });
  
  preloadedVideos.push(video);
}

function preloadImageImmediately(src: string) {
  // Cache for persistence
  cacheAsset(src);
  
  const img = new Image();
  img.src = src;
  preloadedImages.push(img);
}

// Execute preloading immediately on module load
if (typeof window !== 'undefined') {
  ASSET_IMAGES.forEach(preloadImageImmediately);
  ASSET_VIDEOS.forEach(preloadVideoImmediately);
}

/**
 * Hook to ensure videos and images are preloaded and cached.
 * Assets are cached using the Cache API for instant loading on repeat visits.
 */
export function useVideoPreloader() {
  useEffect(() => {
    return () => {
      preloadedVideos.forEach(video => video.pause());
    };
  }, []);
}
