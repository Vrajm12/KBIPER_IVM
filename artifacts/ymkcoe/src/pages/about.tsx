import { AppLayout } from "@/components/layout/AppLayout";
import { Building2, Target, Eye, Award, Quote } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function About() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <AppLayout>
      {/* Hero Section with Parallax */}
      <section ref={containerRef} className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden bg-primary">
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          <img 
            src={`${import.meta.env.BASE_URL}hero-building.png`} 
            alt="KBIPER Campus" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#023859]/90 to-[#023859]/60 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
        </motion.div>

        <div className="container mx-auto px-4 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl"
          >
            <div className="inline-block px-3 py-1 bg-accent/20 border border-accent/50 text-accent rounded-full text-sm font-semibold tracking-wider mb-6">
              ESTABLISHED 1965
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
              Empowering <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#e6d080]">Future</span> Pharmacy Leaders
            </h1>
            <p className="text-lg md:text-xl text-white/80 border-l-4 border-accent pl-4 max-w-2xl drop-shadow">
              Nurturing pharmaceutical excellence, fostering innovation, and building the leaders of tomorrow at Krishnarao Bhegade Institute of Pharmaceutical Education and Research.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Overlapping Vision & Mission */}
      <section className="py-24 bg-background relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row gap-8 md:gap-0">
            {/* Vision Panel */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="md:w-7/12 bg-primary text-white p-10 md:p-16 rounded-3xl md:rounded-r-none relative z-10 shadow-2xl overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 transform translate-x-1/4 -translate-y-1/4 group-hover:scale-110 transition-transform duration-700">
                <Eye className="w-64 h-64" />
              </div>
              <div className="relative z-20">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-1 bg-accent rounded-full" />
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Our Vision</h2>
                </div>
                <p className="text-xl md:text-2xl leading-relaxed text-white/90 font-light">
                  "To provide higher &amp; quality education and enable the students from economically weaker sections to become professionals in today's competitive world."
                </p>
              </div>
            </motion.div>

            {/* Mission Panel */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="md:w-6/12 bg-white p-10 md:p-16 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] md:-ml-12 md:mt-16 relative z-20 border border-muted/50"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-1 bg-primary rounded-full" />
                <h2 className="text-3xl md:text-4xl font-bold text-primary tracking-tight">Our Mission</h2>
              </div>
              <ul className="space-y-6 text-muted-foreground">
                {[
                  "To foster excellence in teaching, scholarship & service to develop a cadre of students with positive attitude, leadership skills & habit of lifelong learning.",
                  "To create an academic environment where the highest standards of scholarship & professional practice are observed.",
                  "To ensure achievement of overall education goals through effective administration.",
                  "To use latest technology for the betterment of students and staff."
                ].map((item, idx) => (
                  <motion.li 
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + (idx * 0.1) }}
                    className="flex gap-4 group"
                  >
                    <Target className="w-6 h-6 text-accent flex-shrink-0 mt-1 transition-transform group-hover:scale-125 group-hover:rotate-12" />
                    <span className="leading-relaxed text-base md:text-lg">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Glassmorphic Accreditations */}
      <section className="py-24 bg-[#EEF2F6] relative overflow-hidden">
        {/* Background blobs for glassmorphism */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-accent/20 rounded-full blur-[80px]" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-primary mb-4"
            >
              Excellence Recognized
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-muted-foreground"
            >
              We hold ourselves to the highest standards of educational quality and professional practice.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Award, title: "AICTE Approved", desc: "Approved by the All India Council for Technical Education." },
              { icon: Building2, title: "DBATU Affiliated", desc: "Affiliated to Dr. Babasaheb Ambedkar Technological University, Lonere." },
              { icon: Award, title: "Established 1965", desc: "Over 60 years of academic excellence under Indrayani Vidya Mandir." },
              { icon: Building2, title: "15-Acre Campus", desc: "State-of-the-art infrastructure on a sprawling campus at Talegaon Dabhade." }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white/60 backdrop-blur-xl border border-white/40 p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(2,56,89,0.1)] hover:border-accent/50 transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 group-hover:bg-accent/10 transition-colors">
                  <item.icon className="w-8 h-8 text-primary group-hover:text-accent transition-colors" />
                </div>
                <h3 className="font-bold text-xl text-primary mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Leadership Section */}
      <section className="py-32 bg-primary relative overflow-hidden text-white">
        {/* Subtle geometric overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              {/* Image Column */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, type: "spring" }}
                className="lg:w-2/5 relative"
              >
                <div className="aspect-[3/4] rounded-3xl overflow-hidden relative shadow-2xl border-4 border-white/10">
                  <img src={`${import.meta.env.BASE_URL}president.jpg`} alt="Dr. Sanjay R. Arote" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
                </div>
                {/* Floating badge */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="absolute -bottom-6 -right-6 bg-accent text-primary p-6 rounded-2xl shadow-xl backdrop-blur-sm border border-accent/50"
                >
                  <p className="font-bold text-xl">Principal</p>
                  <p className="text-sm font-medium opacity-80">Since 2015</p>
                </motion.div>
              </motion.div>

              {/* Text Column */}
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="lg:w-3/5 relative"
              >
                <Quote className="absolute -top-16 -left-10 w-40 h-40 text-white/5 -z-10 rotate-180" />
                
                <h2 className="text-sm font-bold tracking-[0.2em] text-accent uppercase mb-4">Leadership Message</h2>
                <h3 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                  Dr. Sanjay R. Arote <span className="block text-xl md:text-2xl font-medium text-white/60 mt-2">(M. Pharm., Ph.D.)</span>
                </h3>
                
                <div className="space-y-6 text-lg md:text-xl leading-relaxed text-white/80 font-light relative">
                  <p>
                    "Welcome to Krishnarao Bhegade Institute of Pharmaceutical Education and Research (KBIPER). Pharmacy is a noble profession that serves the healthcare system of the nation."
                  </p>
                  <p>
                    "At KBIPER, we strive to build a strong foundation for our students by providing them with an ideal environment for learning and growth. Our state-of-the-art laboratories, experienced faculty, and industry-oriented curriculum ensure that our students are equipped to face the challenges of the rapidly evolving pharmaceutical landscape."
                  </p>
                </div>
                
                <div className="mt-12 pt-8 border-t border-white/10 flex items-center gap-6">
                  <div className="w-16 h-16 rounded-full border-2 border-accent flex items-center justify-center">
                    <span className="font-serif text-3xl font-bold text-accent italic">S</span>
                  </div>
                  <div>
                    <p className="font-serif italic text-xl">Dr. Sanjay R. Arote</p>
                    <p className="text-sm text-accent tracking-widest uppercase mt-1">Principal, KBIPER</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  );
}
