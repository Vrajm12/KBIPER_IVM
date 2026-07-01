import { AppLayout } from "@/components/layout/AppLayout";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Pill, FlaskConical, Beaker, Microscope, ArrowRight } from "lucide-react";

const DEPARTMENTS = [
  {
    id: "bpharm",
    title: "B. Pharmacy",
    subtitle: "Bachelor of Pharmacy",
    duration: "4 Years",
    intake: 100,
    accent: "text-blue-500",
    bgAccent: "bg-blue-500",
    description: "A comprehensive four-year undergraduate program designed to produce competent pharmacists with profound knowledge of drug manufacturing, dispensing, and patient care. This degree forms the bedrock of pharmaceutical sciences, blending rigorous theoretical knowledge with extensive hands-on laboratory experience.",
    modules: [
      { title: "Pharmaceutics & Formulations", desc: "Design and development of novel drug delivery systems." },
      { title: "Pharmacology & Toxicology", desc: "Understanding drug action, interactions, and therapeutic uses." },
      { title: "Pharmaceutical Chemistry", desc: "Synthesis, characterization, and analysis of drug molecules." },
      { title: "Pharmacognosy", desc: "Extraction and study of drugs from natural botanical sources." }
    ],
    icon: Pill
  },
  {
    id: "dpharm",
    title: "D. Pharmacy",
    subtitle: "Diploma in Pharmacy",
    duration: "2 Years",
    intake: 60,
    accent: "text-emerald-500",
    bgAccent: "bg-emerald-500",
    description: "A foundational two-year diploma program focusing on the practical aspects of pharmacy, preparing students for vital roles in community and hospital pharmacy. It provides the quickest pathway to becoming a registered pharmacist.",
    modules: [
      { title: "Community Pharmacy", desc: "Patient counseling, prescription handling, and inventory management." },
      { title: "Hospital Pharmacy", desc: "Clinical workflows, inpatient drug distribution, and safety." },
      { title: "Drug Store Management", desc: "Regulatory compliance, storage logistics, and business operations." },
      { title: "Basic Therapeutics", desc: "Fundamental understanding of common diseases and their treatments." }
    ],
    icon: FlaskConical
  },
  {
    id: "mpharm",
    title: "M. Pharmacy",
    subtitle: "Master of Pharmacy",
    duration: "2 Years",
    intake: 30,
    accent: "text-[#F4B609]",
    bgAccent: "bg-[#F4B609]",
    description: "An advanced postgraduate program offering specializations in Pharmaceutics and Quality Assurance, aimed at creating industry-ready research professionals and future leaders in pharmaceutical manufacturing.",
    modules: [
      { title: "Advanced Pharmaceutics", desc: "Targeted drug delivery, nanotechnology, and biopharmaceutics." },
      { title: "Quality Assurance", desc: "TQM, validation, cGMP compliance, and regulatory affairs." },
      { title: "Research Methodology", desc: "Experimental design, biostatistics, and scientific writing." },
      { title: "Industrial Pharmacokinetics", desc: "Absorption, distribution, metabolism, and excretion modeling." }
    ],
    icon: Beaker
  }
];

export default function DepartmentalInfo() {
  const [activeTab, setActiveTab] = useState(DEPARTMENTS[0].id);
  
  const activeDept = DEPARTMENTS.find(d => d.id === activeTab) || DEPARTMENTS[0];

  return (
    <AppLayout>
      
      {/* Compact 50/50 Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-primary text-white overflow-hidden">
        {/* Dynamic deep background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/20 via-primary to-[#011a2a]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            
            {/* Left: Text */}
            <div className="md:w-1/2 text-center md:text-left">
              <motion.h1 
                initial={{ opacity: 0, x: -30 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-tight mb-6"
              >
                Academic <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#e6d080] to-accent drop-shadow-2xl">
                  Departments
                </span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, x: -30 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-lg md:text-xl text-white/70 font-light max-w-lg leading-relaxed mx-auto md:mx-0"
              >
                Explore the cornerstone programs that define our legacy in pharmaceutical education and research.
              </motion.p>
            </div>
            
            {/* Right: Graphic / Faded Overlay Element */}
            <div className="md:w-1/2 flex justify-center md:justify-end relative">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }} 
                animate={{ opacity: 0.15, scale: 1 }} 
                transition={{ duration: 1.5, ease: "easeOut" }} 
                className="absolute bg-accent/30 blur-[100px] w-64 h-64 md:w-96 md:h-96 rounded-full right-0" 
              />
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="relative z-10 opacity-20"
              >
                <Microscope className="w-40 h-40 md:w-64 md:h-64 text-white" strokeWidth={0.5} />
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* Interactive Tabbed Canvas */}
      <section className="py-16 md:py-24 bg-background min-h-screen">
        <div className="container mx-auto px-4 max-w-6xl">
          
          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 md:gap-4 mb-16 border-b border-muted pb-4">
            {DEPARTMENTS.map((dept) => {
              const isActive = activeTab === dept.id;
              const Icon = dept.icon;
              return (
                <button
                  key={dept.id}
                  onClick={() => setActiveTab(dept.id)}
                  className={`relative flex items-center gap-2 px-6 py-4 rounded-xl text-lg font-bold transition-all duration-300 ${
                    isActive ? "text-primary bg-muted/50" : "text-muted-foreground hover:text-primary hover:bg-muted/30"
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? dept.accent : ""}`} />
                  {dept.title}
                  
                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute bottom-[-17px] left-0 right-0 h-[2px] bg-accent"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Dynamic Content Area (No Bento Boxes) */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDept.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex flex-col gap-16"
              >
                
                {/* Header & Stats */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                  <div>
                    <h2 className="text-4xl md:text-5xl font-black text-primary mb-2 tracking-tight">
                      {activeDept.title}
                    </h2>
                    <h3 className="text-xl text-muted-foreground font-light tracking-wide">
                      {activeDept.subtitle}
                    </h3>
                  </div>
                  
                  <div className="flex gap-12">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Intake</span>
                      <span className={`text-5xl font-black ${activeDept.accent}`}>{activeDept.intake}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Duration</span>
                      <span className={`text-5xl font-black ${activeDept.accent}`}>{activeDept.duration.split(' ')[0]} <span className="text-2xl font-medium text-muted-foreground tracking-normal">{activeDept.duration.split(' ')[1]}</span></span>
                    </div>
                  </div>
                </div>

                {/* Elegant Overview (Border Left style, no box) */}
                <div className="relative pl-6 md:pl-10">
                  <div className={`absolute left-0 top-2 bottom-2 w-1 ${activeDept.bgAccent} rounded-full`} />
                  <p className="text-xl md:text-2xl font-light text-primary/80 leading-relaxed max-w-4xl">
                    {activeDept.description}
                  </p>
                </div>

                {/* Floating Modules List (Staggered, no boxes) */}
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-8">Core Competencies</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                    {activeDept.modules.map((mod, idx) => (
                      <motion.div 
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + (idx * 0.1), duration: 0.5 }}
                        className="flex items-start gap-6 group"
                      >
                        <div className={`mt-1.5 w-1.5 h-1.5 rounded-full ${activeDept.bgAccent} group-hover:scale-150 transition-transform duration-300 shrink-0 shadow-[0_0_10px_rgba(0,0,0,0.1)]`} />
                        <div>
                          <h5 className="text-xl font-bold text-primary mb-2 flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-300">
                            {mod.title}
                            <ArrowRight className={`w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ${activeDept.accent}`} />
                          </h5>
                          <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                            {mod.desc}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>
          
        </div>
      </section>
      
    </AppLayout>
  );
}
