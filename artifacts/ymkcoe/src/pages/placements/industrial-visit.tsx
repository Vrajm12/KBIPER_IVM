import { AppLayout } from "@/components/layout/AppLayout";
import { motion } from "framer-motion";
import { 
  Calendar,
  Building,
  Users,
  Compass,
  Award,
  ChevronRight,
  BookOpen,
  MapPin,
  Clock,
  ShieldCheck
} from "lucide-react";

interface IndustrialVisit {
  company: string;
  location: string;
  date: string;
  studentsCount: number;
  targetBatch: string;
  objective: string;
  outcomes: string[];
  facultyCoordinators: string[];
  industryOfficials: string[];
}

const VISITS_DATA: IndustrialVisit[] = [
  {
    company: "Dr. Balaji Tambe Health Care Pvt. Ltd.",
    location: "Atmasantulana Village, Karla, Maval, Pune",
    date: "November 18, 2025 (Monday)",
    studentsCount: 55,
    targetBatch: "Final Year B.Pharmacy",
    objective: "To provide guidance to students regarding Ayurvedic formulations manufacturing, industrial guidelines, work culture, and documentation.",
    outcomes: [
      "Observed stainless steel manufacturing instruments of SS 304L and 316L grades.",
      "Learnt the manufacturing process of Chyavanprash and the concept of 'Bhavana' related to drug potency.",
      "Observed pill rolling machines and understood the critical importance of weight uniformity.",
      "Studied vacuum dryers for controlled heat drying and isolation of volatile oils, and industrial boilers for steam control.",
      "Learnt to identify adulterated oils (pure oils must look brown in color).",
      "Measured BRICS value of solutions using a Refractometer.",
      "Studied Sandhan Kalpana (Asav & Arishta using decoction bases) and sterilization protocols at 70-75°C.",
      "Learnt identification of Swarna Bhasma using XRD analysis, gold Shodhan, and traditional quality markers (Rekha purnantva, Varitatva, Niswadhy, Nirdhuva, Nishchandra)."
    ],
    facultyCoordinators: ["Mr. Shyam S. Awate (TPO)", "Ms. Mugdha A. Joshi", "Ms. Vilasini Pandav"],
    industryOfficials: ["Dr. Sunil Balaji Tambe (Director)", "Mr. Vijeesh V. Kattakallam (HOD)", "Mr. Kulkarni (Production Dept)"]
  },
  {
    company: "MAGS IATRC Research and Training Pvt. Ltd.",
    location: "Bhosari, Pune, Maharashtra - 411026",
    date: "August 23, 2024 (Friday)",
    studentsCount: 64,
    targetBatch: "Final Year B.Pharmacy",
    objective: "To provide hands-on training on various advanced analytical instruments and guidance regarding industrial documentation, work culture, and guidelines.",
    outcomes: [
      "Participated in live training sessions on various analytical instruments and understood their application in pharmaceutical research.",
      "Learnt the operating protocols and calibration steps of UV-Spectrophotometer.",
      "Observed Gas Chromatography (GC) methods for compound separations.",
      "Tested formulation release rates using Dissolution and Disintegration test apparatus.",
      "Learnt moisture estimation using Karl Fisher titration apparatus.",
      "Studied compound profiling using High-Performance Liquid Chromatography (HPLC) analytical benches."
    ],
    facultyCoordinators: ["Prof. Shyam S. Awate (TPO)", "Prof. Shraddha S. Satkar", "Prof. Amol S. Deshmukh"],
    industryOfficials: ["Dr. Sandesh Kate (Director)", "Mr. Govind Deshpande (Director)", "Mr. Ashish (Instrument Trainer)"]
  }
];

const STUDENT_FEEDBACK = [
  {
    quote: "Testing Swarna Bhasma using XRD and understanding the weight uniformity of pill rolling machines at Dr. Balaji Tambe Health Care was an eye-opener. It perfectly bridged our pharmacology theory with real production lines.",
    student: "Ms. Snehal Shinde",
    batch: "B.Pharm Final Year"
  },
  {
    quote: "The hands-on calibration of Gas Chromatography and HPLC systems at MAGS IATRC Research helped me clear my technical round with confidence during campus interviews.",
    student: "Mr. Rohit Jagtap",
    batch: "B.Pharm Final Year"
  }
];

export default function PlacementsIndustrialVisit() {
  return (
    <AppLayout>
      {/* Hero Header */}
      <section className="bg-primary text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-700/15 via-primary to-[#011a2a]" />
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '30px 30px' }} />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="w-14 h-14 bg-accent/10 text-accent rounded-2xl flex items-center justify-center mx-auto mb-5 border border-accent/20 backdrop-blur-md">
              <Compass className="w-7 h-7" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
              Industrial <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#e6d080]">Visits</span>
            </h1>
            <p className="text-base md:text-lg text-white/80 font-light max-w-2xl mx-auto">
              Bridging classroom theories with real-world pharmaceutical assembly lines, pilot formulation plants, and research facilities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Intro Overview */}
      <section className="py-12 bg-muted/20 border-b border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="bg-white border border-muted rounded-3xl p-6.5 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl text-xs md:text-sm">
              <h2 className="text-lg font-extrabold text-primary flex items-center gap-1.5">
                <Building className="w-5 h-5 text-accent" /> Visualizing Industry Standards
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Industrial visits are a core competency requirement at KBIPER. By visiting state-of-the-art analytical research hubs and traditional formulations manufacturers, students experience the strict standards of GMP, sterile areas, quality controls, and advanced machinery.
              </p>
            </div>
            <div className="flex gap-4 shrink-0 bg-primary/5 p-4 rounded-2xl border border-primary/10">
              <div className="text-center px-4">
                <span className="block font-black text-primary text-2xl tracking-tight">2 Large</span>
                <span className="text-[10px] text-muted-foreground font-semibold uppercase">Visits Logged</span>
              </div>
              <div className="w-px bg-muted-border" />
              <div className="text-center px-4">
                <span className="block font-black text-primary text-2xl tracking-tight">119</span>
                <span className="text-[10px] text-muted-foreground font-semibold uppercase">Students Covered</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industrial Visits Timeline/List */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Timeline cards */}
            <div className="lg:col-span-8 space-y-8">
              <div className="border-l-2 border-muted pl-4 md:pl-6 space-y-10 relative">
                {VISITS_DATA.map((visit, idx) => (
                  <div key={idx} className="relative">
                    {/* Bullet marker */}
                    <div className="absolute -left-7.5 md:-left-9.5 top-1.5 w-5 h-5 rounded-full bg-white border-4 border-accent flex items-center justify-center shadow" />
                    
                    <div className="bg-white border border-muted p-6 rounded-2xl.5 shadow-[0_4px_20px_rgb(0,0,0,0.01)] hover:border-accent/40 transition-all duration-300 space-y-4">
                      
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                        <div>
                          <h3 className="text-base font-extrabold text-primary leading-tight flex items-center gap-1.5">
                            {visit.company}
                          </h3>
                          <p className="text-[10px] text-muted-foreground font-semibold mt-0.5 flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-accent" /> {visit.location}
                          </p>
                        </div>
                        <span className="inline-flex px-2.5 py-0.5 bg-muted text-[10px] text-primary font-bold rounded-lg border border-muted-border self-start sm:self-auto shrink-0">
                          {visit.date}
                        </span>
                      </div>

                      <div className="space-y-2 text-xs text-muted-foreground leading-relaxed">
                        <p><strong>Objective:</strong> {visit.objective}</p>
                        
                        <div className="bg-muted/30 p-4 rounded-xl border border-muted/30 space-y-2 mt-2">
                          <span className="text-[10px] uppercase font-bold text-primary tracking-wide block">Key Learnings & Outcomes:</span>
                          <ul className="space-y-1.5 list-none pl-0 text-[11px]">
                            {visit.outcomes.map((outcome, oIdx) => (
                              <li key={oIdx} className="flex items-start gap-1.5">
                                <ChevronRight className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                                <span>{outcome}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="bg-primary/5 p-3 rounded-xl border border-primary/10 text-[10px] text-primary space-y-1.5">
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4 text-accent shrink-0" />
                          <span><strong>Key Industry Officials:</strong> {visit.industryOfficials.join(", ")}</span>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-muted/50 flex flex-wrap justify-between items-center text-[10px] text-muted-foreground gap-2">
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-accent" /> <strong>Faculty Escorts:</strong> {visit.facultyCoordinators.join(", ")}
                        </span>
                        <span className="bg-primary/5 text-primary px-2.5 py-0.5 rounded-full font-bold border border-primary/10">
                          {visit.studentsCount} Students ({visit.targetBatch})
                        </span>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Side Testimonials & Info card */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Testimonials */}
              <div className="bg-primary text-white rounded-3xl p-6.5 shadow-xl relative overflow-hidden">
                <div className="absolute -bottom-8 -right-8 opacity-10 pointer-events-none">
                  <BookOpen className="w-48 h-48" strokeWidth={0.5} />
                </div>
                <h4 className="text-xs font-extrabold uppercase tracking-widest text-accent mb-6 flex items-center gap-1.5">
                  <Award className="w-4 h-4" /> Student Feedback
                </h4>
                
                <div className="space-y-6">
                  {STUDENT_FEEDBACK.map((fb, idx) => (
                    <div key={idx} className="space-y-2 text-xs border-b border-white/10 pb-4 last:border-0 last:pb-0">
                      <p className="italic text-white/80 leading-relaxed">
                        "{fb.quote}"
                      </p>
                      <div className="text-[10px] font-bold text-accent">
                        — {fb.student} <span className="text-white/60 font-normal">({fb.batch})</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Guidelines to visit */}
              <div className="bg-white border border-muted p-5.5 rounded-2xl shadow-sm space-y-3">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-primary flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-accent" /> Industrial Visit Rules
                </h4>
                <ul className="space-y-2 pl-0 list-none text-[11px] text-muted-foreground">
                  <li className="flex items-start gap-1">
                    <ChevronRight className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                    <span>Consent forms signed by parent must be submitted to the TPO cell 3 days prior.</span>
                  </li>
                  <li className="flex items-start gap-1">
                    <ChevronRight className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                    <span>All students must wear clean college uniforms and standard identity cards.</span>
                  </li>
                  <li className="flex items-start gap-1">
                    <ChevronRight className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                    <span>Safety aprons, face masks, and hair caps must be worn inside pharmaceutical sterile zones.</span>
                  </li>
                </ul>
              </div>

            </div>

          </div>
        </div>
      </section>

    </AppLayout>
  );
}
