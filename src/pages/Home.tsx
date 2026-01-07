import { motion } from 'framer-motion';
import { photographerInfo } from '@/data/photographer';
import { getFeaturedProjects } from '@/data/projects';
import { ProjectCard } from '@/components/portfolio/ProjectCard';
import { ScrollIndicator } from '@/components/ui/ScrollIndicator';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { TypewriterText } from '@/components/ui/TypewriterText';
import { SEOHead } from '@/components/seo/SEOHead';
import { ArrowRight, GripVertical } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';

/**
 * Homepage with immersive hero section and featured projects grid
 * Showcases photographer's best work with minimal, elegant design
 */
export default function Home() {
  const featuredProjects = getFeaturedProjects();

  return (
    <>
      <SEOHead />
      
      <div className="min-h-screen">
        {/* Hero Section - Resizable two column layout */}
        <section className="relative h-screen w-full hidden lg:block">
          <ResizablePanelGroup direction="horizontal" className="h-full">
            {/* Left Panel - Video */}
            <ResizablePanel defaultSize={50} minSize={30} maxSize={100}>
              <div className="relative w-full h-full">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover"
                >
                  <source src="/videos/hero_background.mp4" type="video/mp4" />
                </video>
              </div>
            </ResizablePanel>

            {/* Resize Handle with Visual Indicator */}
            <ResizableHandle className="w-3 bg-transparent hover:bg-black/10 transition-colors data-[resize-handle-active]:bg-black/20 relative group">
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center">
                {/* Grip indicator */}
                <div className="flex flex-col gap-1 p-2 rounded-full bg-black/5 group-hover:bg-black/10 transition-colors">
                  <GripVertical className="size-4 text-black/40 group-hover:text-black/60 transition-colors" />
                </div>
                {/* Tooltip */}
                <div className="absolute left-1/2 -translate-x-1/2 top-[calc(50%+30px)] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                    Drag to resize
                  </div>
                </div>
              </div>
            </ResizableHandle>

            {/* Right Panel - Text Content */}
            <ResizablePanel defaultSize={50} minSize={0} maxSize={70}>
              <div className="w-full h-full flex flex-col items-center justify-center px-8 md:px-16 bg-neutral-100 relative">
                <motion.div
                  className="text-center space-y-6 max-w-xl"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                >
                  <motion.h1
                    className="text-5xl md:text-6xl lg:text-7xl font-extralight tracking-widest text-black"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                  >
                    {photographerInfo.name.toUpperCase()}
                  </motion.h1>
                  
                  <motion.p
                    className="text-xl md:text-2xl font-light tracking-wide text-black/80"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4 }}
                  >
                    {photographerInfo.tagline}
                  </motion.p>

                  <p className="text-base md:text-lg font-light leading-relaxed text-black/70 max-w-md mx-auto">
                    <TypewriterText 
                      text={photographerInfo.heroIntroduction} 
                      delay={1000} 
                      speed={70}
                    />
                  </p>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                  className="absolute bottom-12 left-1/2 -translate-x-1/2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                >
                  <ScrollIndicator />
                </motion.div>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </section>

        {/* Mobile Hero - Stacked layout (no resize) */}
        <section className="relative min-h-screen w-full flex flex-col lg:hidden">
          {/* Video */}
          <div className="relative w-full h-[50vh]">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="w-full h-full object-cover"
            >
              <source src="/videos/hero_background.mp4" type="video/mp4" />
            </video>
          </div>

          {/* Text Content */}
          <div className="w-full h-[50vh] flex flex-col items-center justify-center px-8 bg-neutral-100 relative">
            <motion.div
              className="text-center space-y-6 max-w-xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <motion.h1
                className="text-5xl md:text-6xl font-extralight tracking-widest text-black"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                {photographerInfo.name.toUpperCase()}
              </motion.h1>
              
              <motion.p
                className="text-xl md:text-2xl font-light tracking-wide text-black/80"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
              >
                {photographerInfo.tagline}
              </motion.p>

              <p className="text-base md:text-lg font-light leading-relaxed text-black/70 max-w-md mx-auto">
                <TypewriterText 
                  text={photographerInfo.heroIntroduction} 
                  delay={1000} 
                  speed={70}
                />
              </p>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              className="absolute bottom-12 left-1/2 -translate-x-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <ScrollIndicator />
            </motion.div>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="py-24 md:py-32 px-6 lg:px-8 bg-background">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <ScrollReveal>
              <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-light tracking-wide">About Sumin's Work</h2>
            <div className="space-y-4 text-lg font-light leading-relaxed text-muted-foreground text-left">
              <p>
                Sumin Walker is a product designer and app developer focused on creating AI-driven, cross-platform experiences across mobile, web, and desktop. She designs and builds everything from websites and interactive prototypes to scalable MVPs and full production apps. With expertise in computer vision, generative AI, and multimodal design systems, she bridges design and engineering to turn complex technologies into intuitive, human-centered products.
              </p>
              <p>
                Driven by a passion for clarity and innovation, Sumin crafts data-informed experiences that empower both creators and professionals. Her work blends machine learning, creative design, and modern UX to deliver elegant, high-impact tools that enhance the way people create, communicate, and connect.
              </p>
            </div>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-base font-light tracking-wide text-foreground hover:text-muted-foreground transition-colors group"
                >
                  <span>Learn More About Sumin</span>
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Featured Projects Section */}
        <section className="py-24 md:py-32 border-t border-border bg-neutral-100">
          {/* Section Header */}
          <ScrollReveal>
            <div className="text-center mb-16 space-y-4 px-6">
              <h2 className="text-4xl md:text-5xl font-light tracking-wide text-black">
                Featured Projects
              </h2>
              <p className="text-lg text-black/70 font-light tracking-wide">
                A selection of recent work
              </p>
            </div>
          </ScrollReveal>

          {/* Projects Grid - Aligned with header container */}
          <div className="max-w-7xl mx-auto px-2 lg:px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-stretch">
              {featuredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  aspectRatio="landscape"
                  showCategory={true}
                  index={index}
                />
              ))}
            </div>
          </div>

          {/* View All Link */}
          <ScrollReveal delay={0.4}>
            <div className="flex justify-center mt-16 px-6">
              <Link
                to="/portfolio"
                className="group inline-flex items-center gap-2 text-lg font-light tracking-wide text-black hover:text-black/70 transition-colors"
              >
                <span>View All Projects</span>
                <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </ScrollReveal>
        </section>
      </div>
    </>
  );
}
