import { AppLayout } from "@/components/layout/AppLayout";
import { motion } from "framer-motion";
import { ShieldCheck, ExternalLink, CheckCircle, FileText, ArrowRight } from "lucide-react";

export default function Mahadbt() {
  return (
    <AppLayout>
      <section className="bg-primary text-white py-24 relative overflow-hidden min-h-[90vh] flex items-center">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '30px 30px' }} />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-accent/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6"
            >
              <ShieldCheck className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium tracking-wide uppercase text-accent">Scholarship Portal</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 tracking-tight leading-tight"
            >
              Government <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#e6d080]">Scholarships</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-primary-foreground/70 mb-10 font-light leading-relaxed max-w-lg"
            >
              Apply for MahaDBT scholarships to support your pharmaceutical education. Ensure you have all necessary documents ready before starting your application.
            </motion.p>
            
            <motion.a 
              href="https://mahadbt.maharashtra.gov.in/" 
              target="_blank" 
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="group inline-flex items-center gap-3 bg-accent text-primary px-8 py-4 rounded-full font-bold text-lg hover:shadow-[0_0_40px_rgba(244,182,9,0.4)] transition-all duration-300 transform hover:-translate-y-1"
            >
              Visit MahaDBT Portal
              <ExternalLink className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </motion.a>
          </div>

          {/* Right Glassmorphic Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="perspective-1000"
          >
            <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-8 md:p-12 rounded-3xl shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/30 to-transparent rounded-bl-full opacity-50" />
              
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <FileText className="w-6 h-6 text-accent" />
                Required Documents
              </h3>
              
              <div className="space-y-6">
                {[
                  "Aadhaar Card (Linked with Mobile & Bank)",
                  "Income Certificate (Issued by Tahsildar)",
                  "Caste Certificate & Validity (If applicable)",
                  "Non-Creamy Layer Certificate",
                  "Previous Year Marksheets",
                  "Fee Receipt & Bonafide Certificate",
                  "Domicile Certificate"
                ].map((doc, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + (idx * 0.1) }}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-accent transition-colors">
                      <CheckCircle className="w-4 h-4 text-accent group-hover:text-primary transition-colors" />
                    </div>
                    <span className="text-primary-foreground/90 font-medium group-hover:text-white transition-colors">{doc}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-10 pt-8 border-t border-white/10">
                <a href="/admissions" className="inline-flex items-center gap-2 text-accent text-sm font-semibold hover:text-white transition-colors">
                  View full admission details
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
          
        </div>
      </section>
    </AppLayout>
  );
}
