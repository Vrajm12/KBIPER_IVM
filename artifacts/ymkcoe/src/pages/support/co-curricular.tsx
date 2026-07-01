import { AppLayout } from "@/components/layout/AppLayout";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BookOpen, 
  Building, 
  Clock, 
  FileText, 
  Download, 
  GraduationCap, 
  ExternalLink,
  Award,
  Users,
  Briefcase
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const INDUSTRIAL_VISITS = [
  {
    industry: "Lupin Research Park",
    location: "Pune, India",
    batch: "Final Year B.Pharm",
    date: "March 12, 2026",
    focus: "Novel Drug Delivery Systems & Analytical Instruments",
    details: "Students toured high-throughput screening labs, stability chambers, and advanced HPLC/GC-MS facilities.",
    status: "Completed"
  },
  {
    industry: "Cipla Manufacturing Unit",
    location: "Kurkumbh, India",
    batch: "Third Year B.Pharm & D.Pharm",
    date: "February 22, 2026",
    focus: "Good Manufacturing Practices (GMP) & Formulation Lines",
    details: "Detailed walkthrough of automated tablet packaging lines, sterile liquid injectables filling, and QA testing desks.",
    status: "Completed"
  },
  {
    industry: "Emcure Pharmaceuticals Ltd.",
    location: "Bhosari, India",
    batch: "M.Pharm (Pharmaceutics)",
    date: "September 15, 2025",
    focus: "Regulatory Affairs & Validation Systems",
    details: "Understood standard operating procedures (SOPs), safety guidelines, and clinical trials documentation.",
    status: "Completed"
  }
];

const GPAT_SCHEDULE = [
  {
    subject: "Pharmaceutics & Physical Pharmacy",
    faculty: "Dr. Vivek Sharma",
    date: "Every Monday & Wednesday",
    time: "04:30 PM - 06:00 PM",
    topics: "Rheology, Micromeritics, Kinetics, Tablet Formulations"
  },
  {
    subject: "Pharmacology & Toxicology",
    faculty: "Dr. Rekha Patil",
    date: "Every Tuesday & Friday",
    time: "04:30 PM - 06:00 PM",
    topics: "ANS, CNS, Cardiovascular drugs, Bioassays"
  },
  {
    subject: "Pharmaceutical Chemistry",
    faculty: "Prof. Milind Gaikwad",
    date: "Every Thursday",
    time: "04:30 PM - 06:00 PM",
    topics: "SAR of Cardiovascular agents, Spectroscopy (IR, NMR, UV)"
  }
];

export default function CoCurricular() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"visits" | "gpat">("visits");

  const handleRegisterMockTest = () => {
    toast({
      title: "Registration Recorded",
      description: "You have been registered for the upcoming weekly GPAT online mock test.",
    });
  };

  return (
    <AppLayout>
      {/* Hero Header */}
      <section className="bg-primary text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-700/15 via-primary to-[#011a2a]" />
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '30px 30px' }} />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="w-14 h-14 bg-accent/10 text-accent rounded-2xl flex items-center justify-center mx-auto mb-5 border border-accent/20 backdrop-blur-md">
              <BookOpen className="w-7 h-7" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
              Co-Curricular <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#e6d080]">Activities</span>
            </h1>
            <p className="text-base md:text-lg text-white/80 font-light max-w-2xl mx-auto">
              Bridging classroom learning with pharmacy industry insights, specialized GPAT coaching, and active scientific seminars.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Dashboard */}
      <section className="py-12 bg-background relative min-h-[60vh]">
        <div className="container mx-auto px-4 max-w-6xl">
          
          {/* Main Navigation Segmented Switcher */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex p-1.5 bg-muted/80 backdrop-blur rounded-2xl border border-muted/50 shadow-sm gap-1 overflow-x-auto no-scrollbar max-w-full">
              <button
                onClick={() => setActiveTab("visits")}
                className={`cursor-pointer px-5.5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 whitespace-nowrap inline-flex items-center gap-1.5 ${
                  activeTab === "visits" ? "bg-primary text-white shadow-md" : "text-muted-foreground hover:text-primary"
                }`}
              >
                <Building className="w-4 h-4" /> Industrial Visits
              </button>
              <button
                onClick={() => setActiveTab("gpat")}
                className={`cursor-pointer px-5.5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 whitespace-nowrap inline-flex items-center gap-1.5 ${
                  activeTab === "gpat" ? "bg-primary text-white shadow-md" : "text-muted-foreground hover:text-primary"
                }`}
              >
                <GraduationCap className="w-4 h-4" /> GPAT & Career Desk
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "visits" && (
              /* =========================================================================
                 🔬 INDUSTRIAL VISITS TAB
                 ========================================================================= */
              <motion.div
                key="visits-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6"
              >
                <div className="text-left mb-6">
                  <h3 className="text-xl font-extrabold text-primary">Industrial Exposure & Training</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">Visits scheduled to leading pharmaceutical research centers and manufacturing units in Maharashtra.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6.5">
                  {INDUSTRIAL_VISITS.map((visit, idx) => (
                    <div key={idx} className="bg-white border border-muted p-6.5 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.01)] hover:border-accent/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
                      <div className="space-y-4">
                        <div className="flex justify-between items-start gap-4">
                          <div>
                            <h4 className="text-base font-extrabold text-primary leading-tight">{visit.industry}</h4>
                            <span className="text-[10px] text-muted-foreground font-bold flex items-center gap-1 mt-1">
                              <Building className="w-3.5 h-3.5 text-accent" /> {visit.location}
                            </span>
                          </div>
                          <span className="inline-flex px-2 py-0.5 bg-green-50 border border-green-200 text-green-700 text-[10px] font-bold rounded-lg shrink-0">
                            {visit.status}
                          </span>
                        </div>

                        <p className="text-xs text-muted-foreground leading-relaxed">{visit.details}</p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          <div className="p-3 bg-muted/40 border border-muted rounded-xl">
                            <strong className="text-primary block mb-0.5">Class Target:</strong>
                            <span className="text-muted-foreground font-medium">{visit.batch}</span>
                          </div>
                          <div className="p-3 bg-muted/40 border border-muted rounded-xl">
                            <strong className="text-primary block mb-0.5">Focus Area:</strong>
                            <span className="text-muted-foreground font-medium">{visit.focus}</span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 mt-4 border-t border-muted/50 text-[10px] font-bold text-muted-foreground flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-accent" />
                        <span>Conducted on: {visit.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "gpat" && (
              /* =========================================================================
                 📚 GPAT & CAREER DESK TAB
                 ========================================================================= */
              <motion.div
                key="gpat-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              >
                {/* Left side: stats & action */}
                <div className="lg:col-span-4 space-y-6">
                  <div className="bg-primary text-white rounded-3xl p-6.5 shadow-xl relative overflow-hidden group">
                    <div className="absolute -bottom-8 -right-8 opacity-10 pointer-events-none group-hover:scale-105 transition-transform duration-500">
                      <GraduationCap className="w-48 h-48" strokeWidth={0.5} />
                    </div>

                    <h3 className="text-xs font-extrabold uppercase tracking-widest text-accent mb-6 flex items-center gap-2">
                      <Award className="w-4.5 h-4.5 text-accent" /> GPAT Desk Metrics
                    </h3>

                    <div className="space-y-4">
                      <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                        <span className="text-[10px] uppercase font-bold text-white/60 tracking-wider block">GPAT Qualified (2024 batch)</span>
                        <div className="text-3xl font-black text-accent mt-1 tracking-tight">12 Students</div>
                      </div>

                      <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                        <span className="text-[10px] uppercase font-bold text-white/60 tracking-wider block">Weekly Online Mock Tests</span>
                        <div className="text-3xl font-black text-accent mt-1 tracking-tight">Every Saturday</div>
                      </div>
                    </div>

                    <hr className="border-white/10 my-5" />

                    <button 
                      onClick={handleRegisterMockTest}
                      className="cursor-pointer flex items-center gap-1.5 text-xs font-bold text-white bg-accent hover:bg-[#e6d080] px-4 py-3 rounded-xl transition-all shadow-md w-full justify-center text-primary"
                    >
                      Register for Next Mock Test
                    </button>
                  </div>
                </div>

                {/* Right side: lecture schedule */}
                <div className="lg:col-span-8 space-y-6">
                  <div className="bg-white border border-muted p-6 md:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-6">
                    <div>
                      <h4 className="text-base font-extrabold text-primary">GPAT Coaching & Mentoring Schedule</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">Special tutoring sessions held after regular college hours to prepare B.Pharm students.</p>
                    </div>

                    <div className="space-y-4">
                      {GPAT_SCHEDULE.map((schedule, idx) => (
                        <div key={idx} className="flex gap-4 items-start border-b border-muted/50 pb-4 last:border-b-0 last:pb-0 text-xs">
                          <div className="w-8 h-8 bg-primary/5 text-primary font-bold rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                            0{idx+1}
                          </div>
                          <div className="flex-1 space-y-1">
                            <div className="flex flex-wrap justify-between items-center gap-2">
                              <h5 className="font-extrabold text-primary text-sm">{schedule.subject}</h5>
                              <span className="text-[9px] uppercase font-bold text-muted-foreground tracking-wider">{schedule.date}</span>
                            </div>
                            <p className="text-muted-foreground font-semibold">Mentor: {schedule.faculty} • Time: {schedule.time}</p>
                            <p className="text-muted-foreground font-medium pt-1">Core Topics: {schedule.topics}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </section>
    </AppLayout>
  );
}
