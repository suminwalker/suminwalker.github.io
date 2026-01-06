import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ProjectCard } from "./ProjectCard";

const projects = [
  {
    title: "Minimal E-Commerce",
    category: "Web Design & Development",
    description: "A refined shopping experience focusing on product presentation and seamless checkout flow.",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
  },
  {
    title: "Brand Identity System",
    category: "Branding & Design",
    description: "Complete visual identity for a luxury hospitality brand including digital and print assets.",
    imageUrl: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=800&q=80",
  },
  {
    title: "Architecture Portfolio",
    category: "Web Development",
    description: "An immersive portfolio showcasing architectural works through elegant interactions.",
    imageUrl: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&q=80",
  },
  {
    title: "Finance Dashboard",
    category: "UI/UX Design",
    description: "Data visualization platform with intuitive controls and real-time market insights.",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  },
];

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="work" className="py-32 px-6 bg-secondary/30" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">
            Selected Work
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-medium tracking-tight">
            Recent <span className="italic">Projects</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              {...project}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
