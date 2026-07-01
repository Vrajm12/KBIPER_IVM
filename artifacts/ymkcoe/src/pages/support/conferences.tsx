import { AppLayout } from "@/components/layout/AppLayout";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Award, 
  Send, 
  CheckCircle,
  FileText,
  Calendar,
  Clock,
  Sparkles,
  Users,
  Building,
  Briefcase,
  ExternalLink
} from "lucide-react";
import { useState, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";

const GUEST_LECTURES = [
  {
    topic: "AI Applications in Drug Discovery & Clinical Trials",
    speaker: "Dr. Sunil Patil",
    designation: "Senior Principal Scientist (R&D)",
    organization: "Lupin Research Park, Pune",
    date: "April 18, 2026",
    target: "B.Pharm Final Year & M.Pharm Students",
    details: "Explored machine learning algorithms for molecular docking, predicting pharmacokinetic profiles, and validation."
  },
  {
    topic: "Good Manufacturing Practices (GMP) & Regulatory Compliance",
    speaker: "Mr. Satish Shinde",
    designation: "Head of Quality Assurance",
    organization: "Cipla Ltd., Kurkumbh",
    date: "March 08, 2026",
    target: "Third Year B.Pharm & D.Pharm Students",
    details: "Discussed USFDA inspection procedures, standard operating procedures, and cleanroom validation categories."
  },
  {
    topic: "Career Avenues in Clinical Research & Pharmacovigilance",
    speaker: "Mrs. Shraddha More",
    designation: "Principal Formulation Scientist",
    organization: "Pfizer Global Supply",
    date: "January 20, 2026",
    target: "All B.Pharm & M.Pharm Students",
    details: "Interactive guidelines explaining case safety reports processing, clinical data management systems, and safety reporting."
  }
];

export default function Conferences() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"lectures" | "register">("lectures");

  // Registration Form State
  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [selectedLecture, setSelectedLecture] = useState("AI Applications in Drug Discovery & Clinical Trials");
  const [email, setEmail] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  const isFormValid = useMemo(() => {
    return name.trim().length > 2 && rollNo.trim().length > 3 && email.trim().includes("@");
  }, [name, rollNo, email]);

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      toast({
        title: "Registration Incomplete",
        description: "Please fill out required fields (Name, Roll No, Email).",
      });
      return;
    }

    setIsRegistered(true);
    toast({
      title: "Seminar Registration Complete",
      description: `Your registration for the guest lecture on "${selectedLecture}" is confirmed.`,
    });
  };

  const handleResetForm = () => {
    setName("");
    setRollNo("");
    setEmail("");
    setSelectedLecture("AI Applications in Drug Discovery & Clinical Trials");
    setIsRegistered(false);
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
              <Award className="w-7 h-7" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
              Conferences & <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#e6d080]">Lectures</span>
            </h1>
            <p className="text-base md:text-lg text-white/80 font-light max-w-2xl mx-auto">
              Connecting students with global industry experts, academic researchers, and regulatory specialists to foster clinical and scientific skills.
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
                onClick={() => setActiveTab("lectures")}
                className={`cursor-pointer px-5.5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 whitespace-nowrap inline-flex items-center gap-1.5 ${
                  activeTab === "lectures" ? "bg-primary text-white shadow-md" : "text-muted-foreground hover:text-primary"
                }`}
              >
                <Users className="w-4 h-4" /> Guest Lectures
              </button>
              <button
                onClick={() => {
                  setActiveTab("register");
                  setIsRegistered(false);
                }}
                className={`cursor-pointer px-5.5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 whitespace-nowrap inline-flex items-center gap-1.5 ${
                  activeTab === "register" ? "bg-primary text-white shadow-md" : "text-muted-foreground hover:text-primary"
                }`}
              >
                <Send className="w-4 h-4" /> Seminar Registration
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "lectures" && (
              /* =========================================================================
                 🎙️ GUEST LECTURES TAB
                 ========================================================================= */
              <motion.div
                key="lectures-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              >
                {/* Left side highlights */}
                <div className="lg:col-span-4 space-y-6">
                  <div className="bg-primary text-white rounded-3xl p-6.5 shadow-xl relative overflow-hidden group">
                    <div className="absolute -bottom-8 -right-8 opacity-10 pointer-events-none group-hover:scale-105 transition-transform duration-500">
                      <Sparkles className="w-48 h-48" strokeWidth={0.5} />
                    </div>

                    <h3 className="text-xs font-extrabold uppercase tracking-widest text-accent mb-6 flex items-center gap-2">
                      <Sparkles className="w-4.5 h-4.5 text-accent" /> Seminar Highlights
                    </h3>

                    <div className="space-y-4">
                      <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                        <span className="text-[10px] uppercase font-bold text-white/60 tracking-wider block">Lectures Conducted (Annual)</span>
                        <div className="text-3xl font-black text-accent mt-1 tracking-tight">10+ Seminars</div>
                      </div>

                      <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                        <span className="text-[10px] uppercase font-bold text-white/60 tracking-wider block">Average Student Attendance</span>
                        <div className="text-3xl font-black text-accent mt-1 tracking-tight">150+ Students</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right side Lectures list */}
                <div className="lg:col-span-8 space-y-6">
                  {GUEST_LECTURES.map((lecture, idx) => (
                    <div 
                      key={idx}
                      className="bg-white border border-muted p-6.5 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.01)] hover:border-accent/40 hover:shadow-lg transition-all duration-300 space-y-4"
                    >
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <h4 className="text-base font-extrabold text-primary leading-tight">{lecture.topic}</h4>
                          <p className="text-[10px] text-muted-foreground font-semibold mt-0.5 flex items-center gap-1">
                            <Briefcase className="w-3.5 h-3.5 text-accent" /> {lecture.speaker} • {lecture.designation}
                          </p>
                          <p className="text-[10px] text-muted-foreground/80 flex items-center gap-1">
                            <Building className="w-3.5 h-3.5 text-accent" /> {lecture.organization}
                          </p>
                        </div>
                        <span className="inline-flex px-2 py-0.5 bg-muted text-[10px] text-primary font-bold rounded-lg border border-muted-border shrink-0">
                          {lecture.date}
                        </span>
                      </div>

                      <p className="text-xs text-muted-foreground leading-relaxed">{lecture.details}</p>

                      <div className="pt-2 border-t border-muted/50 text-xs text-muted-foreground flex items-center gap-2">
                        <span><strong>Target Audience:</strong> {lecture.target}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "register" && (
              /* =========================================================================
                 📝 SEMINAR REGISTRATION TAB
                 ========================================================================= */
              <motion.div
                key="register-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="max-w-xl mx-auto"
              >
                {!isRegistered ? (
                  <form onSubmit={handleRegisterSubmit} className="bg-white border border-muted p-6 md:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-6">
                    <div>
                      <h3 className="text-lg font-extrabold text-primary">Guest Lecture Registration Portal</h3>
                      <p className="text-xs text-muted-foreground mt-1">Register to attend upcoming guest seminars. Registration is mandatory to receive certificates.</p>
                    </div>

                    <div className="space-y-4 text-xs">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wide">Student Full Name</label>
                          <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Shraddha More"
                            className="w-full px-4 py-3 rounded-xl border border-muted bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent placeholder:text-muted-foreground/35"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wide">Roll Number / Class ID</label>
                          <input
                            type="text"
                            required
                            value={rollNo}
                            onChange={(e) => setRollNo(e.target.value)}
                            placeholder="e.g. KB-2024-055"
                            className="w-full px-4 py-3 rounded-xl border border-muted bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent placeholder:text-muted-foreground/35"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wide">Select Guest Lecture Topic</label>
                          <select 
                            value={selectedLecture}
                            onChange={(e) => setSelectedLecture(e.target.value)}
                            className="flex h-12 w-full rounded-xl bg-white border border-muted px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                          >
                            <option>AI Applications in Drug Discovery & Clinical Trials</option>
                            <option>Good Manufacturing Practices (GMP) & Regulatory Compliance</option>
                            <option>Career Avenues in Clinical Research & Pharmacovigilance</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wide">Contact Email Address</label>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="e.g. shraddha.m@student.kbiper.edu.in"
                            className="w-full px-4 py-3 rounded-xl border border-muted bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent placeholder:text-muted-foreground/35"
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={!isFormValid}
                      className={`cursor-pointer w-full py-4 rounded-xl text-white text-sm font-bold flex items-center justify-center gap-2 transition-all duration-300 ${
                        isFormValid
                          ? "bg-primary hover:bg-accent shadow-md shadow-primary/20"
                          : "bg-muted text-muted-foreground/50 border border-muted-border cursor-not-allowed"
                      }`}
                    >
                      <Send className="w-4.5 h-4.5" /> Submit Seminar RSVP
                    </button>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white border border-muted p-8 md:p-10 rounded-3xl shadow-2xl relative text-center space-y-6"
                  >
                    <div className="absolute top-0 right-0 w-44 h-44 bg-accent/10 rounded-full blur-[60px] pointer-events-none" />

                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto border border-blue-100 shadow-sm text-primary">
                      <CheckCircle className="w-9 h-9" />
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-primary">Registration Confirmed</h3>
                      <p className="text-xs text-muted-foreground mt-1 max-w-xs mx-auto">Your seat has been reserved. A confirmation email with the joining coordinates and schedule has been dispatched.</p>
                    </div>

                    <button
                      onClick={handleResetForm}
                      className="cursor-pointer w-full py-3 px-4 bg-primary hover:bg-accent text-white rounded-xl text-xs font-bold transition-all"
                    >
                      New Registration
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </section>
    </AppLayout>
  );
}
