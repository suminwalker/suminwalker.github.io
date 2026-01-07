import { useEffect } from 'react';

// Check if we're on mobile
const isMobile = () => window.innerWidth < 768;

// All videos used in the application (with WebM variants for mobile)
const VIDEO_URLS_MP4 = [
  '/videos/Home_Background_Video.mp4',
  '/videos/About_Video.mp4',
];

const VIDEO_URLS_WEBM = [
  '/videos/Home_Background_Video.webm',
  '/videos/About_Video.webm',
];

// Project demo videos (imported assets get hashed URLs, so we'll preload them separately)
import betterVideoAiDemo from '@/assets/better-video-ai-demo.mp4';
import deckCraftDemo from '@/assets/deckcraft-demo.mp4';

const ASSET_VIDEOS = [betterVideoAiDemo, deckCraftDemo];

/**
 * Preloads all videos in the application to eliminate lag when navigating
 * Uses WebM format on mobile for smaller file sizes
 */
export function useVideoPreloader() {
  useEffect(() => {
    const preloadVideo = (src: string) => {
      const video = document.createElement('video');
      video.preload = 'auto';
      video.muted = true;
      video.src = src;
      // Start loading the video
      video.load();
    };

    // On mobile, prioritize WebM; on desktop, use MP4
    const publicVideos = isMobile() ? VIDEO_URLS_WEBM : VIDEO_URLS_MP4;
    publicVideos.forEach(preloadVideo);
    
    // Preload asset videos (project demos)
    ASSET_VIDEOS.forEach(preloadVideo);
  }, []);
}
