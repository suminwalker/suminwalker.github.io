import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-32 px-6" ref={ref}>
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="grid md:grid-cols-2 gap-16 items-start"
        >
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">
              About
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-medium tracking-tight">
              Building with
              <br />
              <span className="italic">intention</span>
            </h2>
          </div>
          <div className="space-y-6">
            <p className="text-muted-foreground font-light leading-relaxed">
              I'm a creative developer passionate about the intersection of design and technology. 
              With over 5 years of experience, I specialize in creating digital experiences that 
              are both visually compelling and technically robust.
            </p>
            <p className="text-muted-foreground font-light leading-relaxed">
              My approach combines minimalist aesthetics with thoughtful interaction design, 
              ensuring every project delivers meaningful value to its users. I believe in 
              the power of simplicity and the impact of well-crafted details.
            </p>
            <div className="pt-6 border-t border-border">
              <div className="grid grid-cols-3 gap-8">
                <div>
                  <p className="font-display text-3xl font-medium">5+</p>
                  <p className="text-sm text-muted-foreground mt-1">Years Experience</p>
                </div>
                <div>
                  <p className="font-display text-3xl font-medium">40+</p>
                  <p className="text-sm text-muted-foreground mt-1">Projects Completed</p>
                </div>
                <div>
                  <p className="font-display text-3xl font-medium">15+</p>
                  <p className="text-sm text-muted-foreground mt-1">Happy Clients</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
