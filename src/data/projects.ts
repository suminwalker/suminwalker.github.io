import type { Project } from '@/types';

// Import app screenshots
import betterVideoAiLanding from '@/assets/better-video-ai-landing.png';
import betterVideoAiFeatures from '@/assets/better-video-ai-features.png';
import betterVideoAiDashboard from '@/assets/better-video-ai-dashboard.png';
import betterVideoAiDemo from '@/assets/better-video-ai-demo.mp4';
import deckCraftHero from '@/assets/deckcraft-hero.png';
import deckCraftFeatures from '@/assets/deckcraft-features.png';
import deckCraftLab from '@/assets/deckcraft-lab.png';

export const projects: Project[] = [
  {
    id: '1',
    title: 'Better Video AI',
    category: 'web-app',
    year: '2026',
    slug: 'better-video-ai',
    coverImage: betterVideoAiLanding,
    coverVideo: betterVideoAiDemo,
    description: 'Better Video AI is a video assistant that helps people create better videos—faster and with less guesswork. You upload a video (or describe what you want to make), and the platform analyzes things like pacing, visuals, framing, lighting, structure, and engagement to give clear, actionable feedback and suggestions. It can help you brainstorm ideas, improve edits, and adapt content for different platforms, all without needing technical skills. Behind the scenes, Better Video AI uses computer vision and advanced AI models to "watch" and understand videos the way a human creative director would—turning complex video analysis into simple guidance anyone can use.',
    client: 'Personal Project',
    camera: 'Mobile & Desktop App',
    images: [
      {
        id: '1-1',
        src: betterVideoAiLanding,
        alt: 'Better Video AI landing page with hero section',
        aspectRatio: 'landscape'
      },
      {
        id: '1-2',
        src: betterVideoAiFeatures,
        alt: 'Better Video AI features page showcasing Digital Twin',
        aspectRatio: 'landscape'
      },
      {
        id: '1-3',
        src: betterVideoAiDashboard,
        alt: 'Better Video AI dashboard and video editor interface',
        aspectRatio: 'landscape'
      }
    ]
  },
  {
    id: '2',
    title: 'DeckCraft',
    category: 'web-app',
    year: '2026',
    slug: 'deckcraft',
    coverImage: deckCraftHero,
    description: 'Presentation intelligence platform that uses AI to analyze, understand, and transform decks into compelling stories. Features multimodal analysis, typography audits, layout alignment, and story flow analysis.',
    client: 'Personal Project',
    camera: 'Web Application',
    images: [
      {
        id: '2-1',
        src: deckCraftHero,
        alt: 'DeckCraft hero section with presentation intelligence',
        aspectRatio: 'landscape'
      },
      {
        id: '2-2',
        src: deckCraftFeatures,
        alt: 'DeckCraft features page showing multimodal analysis',
        aspectRatio: 'landscape'
      },
      {
        id: '2-3',
        src: deckCraftLab,
        alt: 'DeckCraft Lab showcasing use cases for Pitch, Strategy, Sales, and Training',
        aspectRatio: 'landscape'
      }
    ]
  }
];

// Helper function to get project by slug
export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find(project => project.slug === slug);
};

// Helper function to get projects by category
export const getProjectsByCategory = (category: string): Project[] => {
  if (category === 'all') return projects;
  return projects.filter(project => project.category === category);
};

// Helper function to get featured projects (first 4)
export const getFeaturedProjects = (): Project[] => {
  return projects.slice(0, 4);
};

// Helper function to get next/previous project
export const getAdjacentProjects = (currentSlug: string): { prev: Project | null; next: Project | null } => {
  const currentIndex = projects.findIndex(p => p.slug === currentSlug);
  
  return {
    prev: currentIndex > 0 ? projects[currentIndex - 1] : null,
    next: currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null
  };
};
