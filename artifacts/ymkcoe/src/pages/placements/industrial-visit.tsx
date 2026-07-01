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
  Clock
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
}

const VISITS_DATA: IndustrialVisit[] = [
  {
    company: "Lupin Research Park",
    location: "Nande, Pune",
    date: "March 15, 2026",
    studentsCount: 45,
    targetBatch: "Final Year B.Pharm & M.Pharm",
    objective: "To demonstrate pilot-scale formulation, modern drug delivery development, and automated packaging systems.",
    outcomes: [
      "Observed automated tablet punchers and dry-granulators in real-time execution.",
      "Interacted with senior formulation scientists working on liposomal drug development.",
      "Understood GMP clinical data logging protocols and standard operating procedures (SOP)."
    ],
    facultyCoordinators: ["Prof. Sandeep R. Bhegade", "Dr. Nilesh Patil"]
  },
  {
    company: "Cipla Limited",
    location: "Kurkumbh, MIDC",
    date: "February 22, 2026",
    studentsCount: 52,
    targetBatch: "Third Year B.Pharm",
    objective: "To study bulk drug manufacturing, cleanroom validation grades, and HVAC system setups in parenteral formulations.",
    outcomes: [
      "Toured cleanroom Class A & B sterile formulation zones.",
      "Learned the operation of double-cone blenders and fluid-bed dryers.",
      "Explored quality control systems including high-performance liquid chromatography (HPLC) units."
    ],
    facultyCoordinators: ["Mrs. Priya Deshpande", "Mr. Vicky Salve"]
  },
  {
    company: "Serum Institute of India",
    location: "Hadapsar, Pune",
    date: "September 18, 2025",
    studentsCount: 40,
    targetBatch: "M.Pharm (Pharmaceutics)",
    objective: "To expose students to large-scale bioreactor operations, vaccine production lines, and sterile freeze-drying procedures.",
    outcomes: [
      "Examined industrial-grade fermenter operations and cell-culture scaling vessels.",
      "Observed automated vial washing, sterile filling, and aluminum capping assembly lines.",
      "Learned vaccine cold-chain logistics and thermal validation metrics."
    ],
    facultyCoordinators: ["Dr. Rekha Patil", "Prof. Sandeep R. Bhegade"]
  },
  {
    company: "Alkem Laboratories",
    location: "Baddi, Himachal Pradesh",
    date: "January 10, 2025",
    studentsCount: 38,
    targetBatch: "Final Year B.Pharm",
    objective: "To study soft gelatin capsule encapsulation processes, dissolution tests, and regulatory auditing standards.",
    outcomes: [
      "Observed gelatin ribbon formulation and rotary-die encapsulation machines.",
      "Learned analytical stability testing chambers and standard environmental parameters.",
      "Understood USFDA inspection readiness and validation protocol documentation."
    ],
    facultyCoordinators: ["Prof. Sandeep R. Bhegade", "Mrs. Priya Deshpande"]
  }
];

const STUDENT_FEEDBACK = [
  {
    quote: "Seeing the pilot formulation plants at Lupin helped me connect academic lecture notes on tableting to physical manufacturing steps.",
    student: "Ms. Snehal Shinde",
    batch: "B.Pharm Final Year"
  },
  {
    quote: "The cleanroom sterilization protocols at Cipla gave me clear insights into aseptic processing. It motivated me to seek QC positions.",
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
                <Building className="w-5 h-5 text-accent" /> Why Industrial Visits Matter?
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Industrial visits are a core curriculum component at KBIPER. They provide students with direct visual contact of high-volume tablet machines, quality check HPLC arrays, sterile vaccine lines, and bulk drug reactors. This real exposure builds practical competency and increases employability in placement interviews.
              </p>
            </div>
            <div className="flex gap-4 shrink-0 bg-primary/5 p-4 rounded-2xl border border-primary/10">
              <div className="text-center px-4">
                <span className="block font-black text-primary text-2xl tracking-tight">4+</span>
                <span className="text-[10px] text-muted-foreground font-semibold uppercase">Visits / Year</span>
              </div>
              <div className="w-px bg-muted-border" />
              <div className="text-center px-4">
                <span className="block font-black text-primary text-2xl tracking-tight">180+</span>
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
                        <span className="inline-flex px-2 py-0.5 bg-muted text-[10px] text-primary font-bold rounded-lg border border-muted-border self-start sm:self-auto">
                          {visit.date}
                        </span>
                      </div>

                      <div className="space-y-1.5 text-xs text-muted-foreground leading-relaxed">
                        <p><strong>Objective:</strong> {visit.objective}</p>
                        
                        <div className="bg-muted/30 p-4 rounded-xl border border-muted/30 space-y-2 mt-2">
                          <span className="text-[10px] uppercase font-bold text-primary tracking-wide block">Key Learning Outcomes:</span>
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

                      <div className="pt-3 border-t border-muted/50 flex flex-wrap justify-between items-center text-[10px] text-muted-foreground gap-2">
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-accent" /> <strong>Accompanying Faculty:</strong> {visit.facultyCoordinators.join(", ")}
                        </span>
                        <span className="bg-primary/5 text-primary px-2 py-0.5 rounded font-semibold border border-primary/10">
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
                  <Award className="w-4 h-4" /> Student Experiences
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
                    <span>Permission slips signed by guardians must be submitted to the TPO cell 3 days prior.</span>
                  </li>
                  <li className="flex items-start gap-1">
                    <ChevronRight className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                    <span>All students must wear formal clean uniform and standard ID cards.</span>
                  </li>
                  <li className="flex items-start gap-1">
                    <ChevronRight className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                    <span>Safety aprons and hairnets must be worn inside formulation laboratories.</span>
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
