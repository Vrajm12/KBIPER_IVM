import { AppLayout } from "@/components/layout/AppLayout";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight, BookOpen, Download } from "lucide-react";

const NEWSLETTERS = [
  {
    id: 1,
    issue: "Volume 5, Issue 2",
    date: "Dec 2024",
    title: "Pharma Pulse - Winter Edition",
    cover: "/placeholder-cover-1.jpg", // Using abstract color if missing
    color: "from-blue-600 to-indigo-900",
    highlights: ["AI in Drug Discovery", "Alumni Success Stories", "National Pharmacy Week Highlights"]
  },
  {
    id: 2,
    issue: "Volume 5, Issue 1",
    date: "Jul 2024",
    title: "Pharma Pulse - Monsoon Edition",
    color: "from-emerald-600 to-teal-900",
    highlights: ["Research Grants 2024", "New Lab Inauguration", "Industrial Visit Report"]
  },
  {
    id: 3,
    issue: "Volume 4, Issue 2",
    date: "Dec 2023",
    title: "Pharma Pulse - Winter Edition",
    color: "from-accent to-orange-800",
    highlights: ["100% Placement Milestone", "Guest Lecture Series", "Cultural Fest Review"]
  }
];

export default function Newsletter() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % NEWSLETTERS.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + NEWSLETTERS.length) % NEWSLETTERS.length);

  const active = NEWSLETTERS[currentIndex];

  return (
    <AppLayout>
      <section className="bg-background min-h-[90vh] py-20 flex flex-col justify-center relative overflow-hidden">
        
        {/* Dynamic Background */}
        <div className="absolute inset-0 opacity-10 transition-colors duration-1000 ease-in-out">
          <div className={`absolute inset-0 bg-gradient-to-br ${active.color} blur-3xl scale-150`} />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
          
          <div className="text-center mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold text-primary mb-4"
            >
              Institute <span className="text-accent">Newsletter</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground text-lg max-w-2xl mx-auto"
            >
              Stay updated with the latest happenings, research breakthroughs, and campus events through our biannual publication 'Pharma Pulse'.
            </motion.p>
          </div>

          {/* Magazine Slider */}
          <div className="w-full max-w-5xl flex flex-col md:flex-row items-center gap-12">
            
            {/* Left Control */}
            <button 
              onClick={prev}
              className="hidden md:flex w-12 h-12 rounded-full bg-white shadow-lg items-center justify-center text-primary hover:bg-accent hover:text-white transition-colors shrink-0 z-20"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Main Display */}
            <div className="flex-1 w-full relative aspect-[3/4] md:aspect-[2/1] perspective-1000">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, rotateY: 10, scale: 0.95 }}
                  animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                  exit={{ opacity: 0, rotateY: -10, scale: 0.95 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full flex flex-col md:flex-row bg-white rounded-3xl shadow-2xl overflow-hidden border border-muted"
                >
                  {/* Cover Side */}
                  <div className={`w-full md:w-1/2 h-1/2 md:h-full bg-gradient-to-br ${active.color} p-12 flex flex-col justify-between relative`}>
                    <div className="absolute inset-0 bg-black/10" />
                    <div className="relative z-10">
                      <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-bold uppercase tracking-wider mb-6">
                        {active.issue}
                      </span>
                      <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                        {active.title}
                      </h2>
                    </div>
                    <div className="relative z-10 flex items-center justify-between">
                      <span className="text-white/80 font-medium">{active.date}</span>
                      <BookOpen className="w-12 h-12 text-white/20" />
                    </div>
                  </div>
                  
                  {/* Content Side */}
                  <div className="w-full md:w-1/2 h-1/2 md:h-full p-8 md:p-12 flex flex-col justify-center bg-zinc-50">
                    <h3 className="text-xl font-bold text-primary mb-6 uppercase tracking-wider border-b border-border pb-4">
                      In this Issue
                    </h3>
                    <ul className="space-y-6 flex-1">
                      {active.highlights.map((highlight, idx) => (
                        <motion.li 
                          key={idx}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + (idx * 0.1) }}
                          className="flex items-start gap-4"
                        >
                          <span className="text-accent font-bold text-lg mt-0.5">{idx + 1}.</span>
                          <span className="text-lg text-primary/80 font-medium">{highlight}</span>
                        </motion.li>
                      ))}
                    </ul>
                    
                    <button className="mt-8 w-full py-4 bg-primary text-white rounded-xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-primary/90 transition-colors group">
                      <Download className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                      Download PDF
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Control */}
            <button 
              onClick={next}
              className="hidden md:flex w-12 h-12 rounded-full bg-white shadow-lg items-center justify-center text-primary hover:bg-accent hover:text-white transition-colors shrink-0 z-20"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            
            {/* Mobile Controls */}
            <div className="flex md:hidden gap-4 mt-8">
              <button onClick={prev} className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-primary">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button onClick={next} className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-primary">
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

          </div>
          
        </div>
      </section>
    </AppLayout>
  );
}
