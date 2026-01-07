import { motion } from 'framer-motion';
import { photographerInfo } from '@/data/photographer';
import { getFeaturedProjects } from '@/data/projects';
import { ProjectCard } from '@/components/portfolio/ProjectCard';
import { ScrollIndicator } from '@/components/ui/ScrollIndicator';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { TypewriterText } from '@/components/ui/TypewriterText';
import { SEOHead } from '@/components/seo/SEOHead';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

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
        {/* Hero Section - Two column layout */}
        <section className="relative min-h-screen w-full flex flex-col lg:flex-row">
          {/* Left Column - Video */}
          <div className="relative w-full lg:w-1/2 h-[50vh] lg:h-screen">
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

          {/* Right Column - Text Content */}
          <div className="w-full lg:w-1/2 h-[50vh] lg:h-screen flex flex-col items-center justify-center px-8 md:px-16 bg-neutral-100">
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
                  speed={35}
                />
              </p>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              className="absolute bottom-12 left-1/2 lg:left-3/4 -translate-x-1/2"
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
        <section className="py-24 md:py-32 border-t border-border bg-white">
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

          {/* Projects Grid - Edge to edge with minimal gaps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
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
