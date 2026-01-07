import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MessageSquare, Target, Lightbulb, CheckCircle, CreditCard, ArrowRight } from 'lucide-react';
import { SEOHead } from '@/components/seo/SEOHead';
import { Button } from '@/components/ui/button';

const steps = [
  {
    number: '01',
    title: 'Submit Your Inquiry',
    description: 'Reach out through the contact form or send me an email with details about your project.',
    details: [
      'What type of app are you looking for (Website, Prototype, MVP, Full App)',
      'Your budget range and timeline constraints',
      'A brief description of your vision and goals'
    ],
    icon: MessageSquare
  },
  {
    number: '02',
    title: 'Alignment & Discovery',
    description: "We'll have a conversation to fully understand your needs and ensure we're aligned on scope.",
    details: [
      'Deep dive into your project requirements',
      'Discuss target users and key features',
      'Clarify technical constraints and preferences'
    ],
    icon: Target
  },
  {
    number: '03',
    title: 'Recommendations & Proposal',
    description: "I'll provide my professional recommendations along with a clear project proposal.",
    details: [
      'Suggested tech stack and approach',
      'Detailed scope and deliverables',
      'Timeline breakdown with milestones'
    ],
    icon: Lightbulb
  },
  {
    number: '04',
    title: 'Agreement & Kickoff',
    description: 'If everything looks good, we finalize the agreement and begin work.',
    details: [
      'Initial upfront deposit to begin',
      'Clear milestone definitions',
      'Communication cadence established'
    ],
    icon: CheckCircle
  },
  {
    number: '05',
    title: 'Milestone-Based Delivery',
    description: 'Payment is tied to performance milestones, ensuring you only pay for delivered results.',
    details: [
      'Regular progress updates and demos',
      'Payments released upon milestone completion',
      'Iterative feedback and refinement'
    ],
    icon: CreditCard
  }
];

export default function Process() {
  return (
    <>
      <SEOHead
        title="Process"
        description="Learn how we work together—from initial inquiry to milestone-based delivery. A transparent, collaborative approach to building AI-powered apps."
      />

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="py-24 md:py-32 px-6 lg:px-8 border-b border-border">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-wide mb-4">
                Process
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground font-light tracking-wide max-w-2xl mx-auto">
                A transparent, milestone-based approach to bringing your ideas to life
              </p>
            </motion.div>
          </div>
        </section>

        {/* Process Steps */}
        <section className="py-16 md:py-24 px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-16 md:space-y-24">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="grid md:grid-cols-[120px_1fr] gap-6 md:gap-12">
                    {/* Step Number */}
                    <div className="flex md:flex-col items-center md:items-start gap-4">
                      <span className="text-5xl md:text-6xl font-light text-muted-foreground/30">
                        {step.number}
                      </span>
                      <step.icon className="size-6 text-foreground" />
                    </div>

                    {/* Step Content */}
                    <div className="space-y-4">
                      <h2 className="text-2xl md:text-3xl font-light tracking-wide">
                        {step.title}
                      </h2>
                      <p className="text-lg text-muted-foreground font-light leading-relaxed">
                        {step.description}
                      </p>
                      <ul className="space-y-2 pt-2">
                        {step.details.map((detail, detailIndex) => (
                          <li
                            key={detailIndex}
                            className="flex items-start gap-3 text-muted-foreground font-light"
                          >
                            <ArrowRight className="size-4 mt-1 flex-shrink-0" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute left-[60px] top-[120px] w-px h-[calc(100%-40px)] bg-border" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 px-6 lg:px-8 bg-muted/30 border-t border-border">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-light tracking-wide">
              Ready to get started?
            </h2>
            <p className="text-lg text-muted-foreground font-light">
              Let's discuss your project and see how we can work together.
            </p>
            <Button asChild size="lg" className="px-8">
              <Link to="/contact">
                Start a Conversation
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </motion.div>
        </section>

        {/* Bottom spacing */}
        <div className="h-24" />
      </div>
    </>
  );
}
