import { AppLayout } from "@/components/layout/AppLayout";
import { motion, useScroll, useTransform } from "framer-motion";
import { Calendar, ImageIcon } from "lucide-react";
import { useRef } from "react";

export interface GalleryEvent {
  id: string | number;
  title: string;
  date: string;
  description: string;
  imageUrl?: string;
}

interface GalleryLayoutProps {
  title: string;
  subtitle: string;
  description?: string;
  events: GalleryEvent[];
}

export function GalleryLayout({ title, subtitle, description, events }: GalleryLayoutProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Create subtle parallax effects for different columns
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  // Split events into two columns for masonry look
  const col1 = events.filter((_, i) => i % 2 === 0);
  const col2 = events.filter((_, i) => i % 2 !== 0);

  return (
    <AppLayout>
      {/* Hero Section */}
      <section className="bg-primary text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 rounded-full bg-accent/20 text-accent font-semibold tracking-wider text-sm mb-6 border border-accent/30"
          >
            {subtitle}
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-white/60"
          >
            {title}
          </motion.h1>
          {description && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-primary-foreground/70 max-w-2xl mx-auto font-light"
            >
              {description}
            </motion.p>
          )}
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 bg-background relative overflow-hidden" ref={containerRef}>
        <div className="container mx-auto px-4 max-w-7xl">
          
          {events.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-20" />
              <p className="text-lg">No events found for this category yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              
              {/* Column 1 (Scrolls up faster) */}
              <motion.div style={{ y: y1 }} className="flex flex-col gap-8 md:gap-12 md:mt-12">
                {col1.map((event, idx) => (
                  <EventCard key={event.id} event={event} index={idx} />
                ))}
              </motion.div>

              {/* Column 2 (Scrolls down slightly) */}
              <motion.div style={{ y: y2 }} className="flex flex-col gap-8 md:gap-12">
                {col2.map((event, idx) => (
                  <EventCard key={event.id} event={event} index={idx + col1.length} />
                ))}
              </motion.div>

            </div>
          )}

        </div>
      </section>
    </AppLayout>
  );
}

function EventCard({ event, index }: { event: GalleryEvent; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-3xl bg-muted/30 border border-border"
    >
      <div className="aspect-[4/3] w-full relative overflow-hidden bg-primary/5">
        {event.imageUrl ? (
          <img 
            src={event.imageUrl} 
            alt={event.title} 
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ImageIcon className="w-16 h-16 text-primary/20" />
          </div>
        )}
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
        
        {/* Content Container */}
        <div className="absolute inset-0 p-8 flex flex-col justify-end">
          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <div className="flex items-center gap-2 text-accent mb-3">
              <Calendar className="w-4 h-4" />
              <span className="text-sm font-semibold tracking-wide uppercase">{event.date}</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">{event.title}</h3>
            <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-500 overflow-hidden">
              <p className="text-white/80 text-sm md:text-base line-clamp-3">
                {event.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
