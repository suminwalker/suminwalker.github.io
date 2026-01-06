import { motion } from "framer-motion";

interface ProjectCardProps {
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  index: number;
}

export function ProjectCard({ title, category, description, imageUrl, index }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group cursor-pointer"
    >
      <div className="relative overflow-hidden bg-muted aspect-[4/3] mb-6">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-500" />
      </div>
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {category}
        </p>
        <h3 className="font-display text-2xl font-medium tracking-tight group-hover:text-accent transition-colors duration-300">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground font-light leading-relaxed">
          {description}
        </p>
      </div>
    </motion.article>
  );
}
