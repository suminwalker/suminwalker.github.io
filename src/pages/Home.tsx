import { motion } from 'framer-motion';
import { photographerInfo } from '@/data/photographer';
import { getFeaturedProjects } from '@/data/projects';
import { ProjectCard } from '@/components/portfolio/ProjectCard';

import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { TypewriterText } from '@/components/ui/TypewriterText';
import { SEOHead } from '@/components/seo/SEOHead';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroBackground from '@/assets/open-water.jpg';

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
        {/* Hero Section - Desktop */}
        <section className="relative h-screen w-full hidden lg:flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center scale-125"
            style={{ 
              backgroundImage: `url(${heroBackground})`,
              backgroundPosition: 'center 70%'
            }}
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/40" />
          <motion.div
            className="relative z-10 text-center space-y-6 max-w-xl px-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-extralight tracking-widest text-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              {photographerInfo.name.toUpperCase()}
            </motion.h1>
            
            <motion.p
              className="text-xl md:text-2xl font-light tracking-wide text-foreground/90"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              {photographerInfo.tagline}
            </motion.p>

            <p className="text-base md:text-lg font-light leading-relaxed text-muted-foreground max-w-md mx-auto">
              <TypewriterText 
                text={photographerInfo.heroIntroduction} 
                delay={1000} 
                speed={70}
              />
            </p>
          </motion.div>
        </section>

        {/* Mobile Hero */}
        <section className="relative h-screen w-full lg:hidden flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center scale-150"
            style={{ 
              backgroundImage: `url(${heroBackground})`,
              backgroundPosition: 'center 80%'
            }}
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/40" />
          <motion.div
            className="relative z-10 text-center space-y-6 max-w-xl px-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.h1
              className="text-5xl md:text-6xl font-extralight tracking-widest text-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              {photographerInfo.name.toUpperCase()}
            </motion.h1>
            
            <motion.p
              className="text-xl md:text-2xl font-light tracking-wide text-foreground/90"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              {photographerInfo.tagline}
            </motion.p>

            <p className="text-base md:text-lg font-light leading-relaxed text-muted-foreground max-w-md mx-auto">
              <TypewriterText 
                text={photographerInfo.heroIntroduction} 
                delay={1000} 
                speed={70}
              />
            </p>
          </motion.div>
        </section>

        {/* Introduction Section */}
        <section className="py-9 md:py-32 px-6 lg:px-8 bg-background">
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
        <section className="py-12 md:py-32 border-t border-border bg-background">
          {/* Section Header */}
          <ScrollReveal>
            <div className="text-center mb-16 space-y-4 px-6">
              <h2 className="text-4xl md:text-5xl font-light tracking-wide text-foreground">
                Featured Projects
              </h2>
              <p className="text-lg text-muted-foreground font-light tracking-wide">
                A selection of recent work
              </p>
            </div>
          </ScrollReveal>

          {/* Projects Grid - Aligned with header container */}
          <div className="max-w-7xl mx-auto px-2 lg:px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-start">
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
                className="group inline-flex items-center gap-2 text-lg font-light tracking-wide text-foreground hover:text-muted-foreground transition-colors"
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
