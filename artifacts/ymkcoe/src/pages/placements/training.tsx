import { AppLayout } from "@/components/layout/AppLayout";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useLocation } from "wouter";
import { 
  Calendar,
  Clock,
  Sparkles,
  Users,
  Award,
  Send,
  BookOpen,
  Briefcase,
  TrendingUp,
  FileCheck,
  ChevronDown
} from "lucide-react";
import { useState, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";

interface TrainingSession {
  title: string;
  category: "Technical" | "Aptitude" | "Soft Skills" | "Mock Prep";
  trainer: string;
  agency: string;
  hours: number;
  dateRange: string;
  target: string;
  description: string;
}

const TRAINING_DATABASE: Record<string, {
  stats: { hours: number; sessions: number; enrollment: number; rating: string };
  sessions: TrainingSession[];
}> = {
  "2023-24": {
    stats: { hours: 120, sessions: 18, enrollment: 145, rating: "4.8/5.0" },
    sessions: [
      {
        title: "Technical Formulation & Novel Drug Delivery Drills",
        category: "Technical",
        trainer: "Dr. Sunil Patil",
        agency: "Lupin Research Park, Pune",
        hours: 30,
        dateRange: "Feb 10 - Mar 05, 2024",
        target: "Final Year B.Pharm & M.Pharm Students",
        description: "Practical lectures focusing on liposomal formulations, micro-encapsulation methods, and scale-up validation parameters in modern manufacturing."
      },
      {
        title: "Quantitative Aptitude & Logical Reasoning Boot camp",
        category: "Aptitude",
        trainer: "Prof. Vinayak Salve & Team",
        agency: "Global Aptitude Academy",
        hours: 45,
        dateRange: "Jan 05 - Jan 28, 2024",
        target: "Third Year & Final Year B.Pharm Students",
        description: "Intensive drills on math aptitude, logical sequences, data interpretation, and speed arithmetic needed for multinational recruitment screens."
      },
      {
        title: "Corporate Etiquette, Soft Skills & Group Discussions",
        category: "Soft Skills",
        trainer: "Mrs. Priya Deshpande",
        agency: "Apex Soft Skills Consultants",
        hours: 25,
        dateRange: "Mar 12 - Mar 26, 2024",
        target: "All B.Pharm & D.Pharm Students",
        description: "Refining business verbal communication, corporate presentation tactics, group discussion mock rounds, and email writing etiquettes."
      },
      {
        title: "Industrial HR Panel Simulation & Technical Mock Interviews",
        category: "Mock Prep",
        trainer: "Mr. Satish Shinde & Pfizer HR Team",
        agency: "Cipla & Pfizer Collaborative Panel",
        hours: 20,
        dateRange: "April 02 - April 10, 2024",
        target: "Final Year B.Pharm & M.Pharm Students",
        description: "Simulating corporate evaluation layouts. Students undergo direct interview feedback from senior industrial scientists and HR professionals."
      }
    ]
  },
  "2022-23": {
    stats: { hours: 105, sessions: 15, enrollment: 138, rating: "4.7/5.0" },
    sessions: [
      {
        title: "Regulatory Compliance (USFDA) & GMP Guidelines",
        category: "Technical",
        trainer: "Mr. Rajesh Shinde",
        agency: "Cipla Quality Assurance",
        hours: 25,
        dateRange: "Jan 15 - Feb 08, 2023",
        target: "Third Year & Final Year B.Pharm",
        description: "In-depth review of good manufacturing practices, clinical trials validation procedures, and auditing standards required by global regulators."
      },
      {
        title: "Pharma Ethics, Professional Morale & Communication",
        category: "Soft Skills",
        trainer: "Prof. Sandeep R. Bhegade",
        agency: "KBIPER Professional Cell",
        hours: 20,
        dateRange: "Feb 12 - Feb 25, 2023",
        target: "All B.Pharm & D.Pharm Students",
        description: "Seminars regarding pharmacist code of conduct, physician interaction etiquettes, and patient counseling oral guidelines."
      },
      {
        title: "Pharmaceutical Chemistry Analytical Training",
        category: "Technical",
        trainer: "Dr. Rekha Patil",
        agency: "KBIPER Labs & Analytical Systems",
        hours: 35,
        dateRange: "Mar 02 - Mar 25, 2023",
        target: "Final Year B.Pharm & M.Pharm Students",
        description: "Hands-on calibration training for HPLC, UV-Spectrophotometer, and dissolution testers to improve Quality Control placement prospects."
      },
      {
        title: "Introductory Pharmacovigilance & Safety Data Management",
        category: "Aptitude",
        trainer: "Pfizer Safety Experts",
        agency: "Pfizer Global Support Unit",
        hours: 25,
        dateRange: "Apr 05 - Apr 18, 2023",
        target: "B.Pharm & M.Pharm Students",
        description: "Interactive seminars exploring individual case safety reports processing, clinical research databases, and pharmacovigilance safety coding."
      }
    ]
  }
};

const YEARS = ["2023-24", "2022-23"];

export default function PlacementsTraining() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const selectedYear = params.year && YEARS.includes(params.year) ? params.year : "2023-24";
  
  const [activeTab, setActiveTab] = useState<"all" | "Technical" | "Aptitude" | "Soft Skills" | "Mock Prep">("all");
  const [studentName, setStudentName] = useState("");
  const [studentRoll, setStudentRoll] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [selectedSession, setSelectedSession] = useState("");
  const [isEnrolled, setIsEnrolled] = useState(false);

  const data = TRAINING_DATABASE[selectedYear];

  const filteredSessions = useMemo(() => {
    if (activeTab === "all") return data.sessions;
    return data.sessions.filter(s => s.category === activeTab);
  }, [data.sessions, activeTab]);

  const handleYearChange = (year: string) => {
    setLocation(`/placements/training/${year}`);
    setActiveTab("all");
  };

  const isFormValid = useMemo(() => {
    return studentName.trim().length > 2 && studentRoll.trim().length > 3 && studentEmail.trim().includes("@") && selectedSession !== "";
  }, [studentName, studentRoll, studentEmail, selectedSession]);

  const handleEnroll = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      toast({
        title: "Registration Failed",
        description: "Please complete all fields before submitting.",
        variant: "destructive"
      });
      return;
    }

    setIsEnrolled(true);
    toast({
      title: "Enrollment Confirmed",
      description: `Dear ${studentName}, you have registered for the upcoming sessions of "${selectedSession}". Check email for syllabus and schedule.`,
    });
  };

  const handleReset = () => {
    setStudentName("");
    setStudentRoll("");
    setStudentEmail("");
    setSelectedSession("");
    setIsEnrolled(false);
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
              Details of <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#e6d080]">Training</span>
            </h1>
            <p className="text-base md:text-lg text-white/80 font-light max-w-2xl mx-auto">
              Empowering students with systematic guidance on technical formulation, aptitude solving, and corporate mock evaluations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Year Selector & Dashboard Stats */}
      <section className="py-12 bg-muted/20 border-b border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
            <div>
              <h2 className="text-xl font-extrabold text-primary flex items-center gap-2">
                <Calendar className="w-5 h-5 text-accent" /> Academic Training Year
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">Explore training reports, session durations, and student placements.</p>
            </div>
            
            {/* Custom Year Selector buttons */}
            <div className="flex gap-2">
              {YEARS.map(year => (
                <button
                  key={year}
                  onClick={() => handleYearChange(year)}
                  className={`cursor-pointer px-5 py-2.5 rounded-xl font-bold text-xs transition-all duration-300 ${
                    selectedYear === year 
                      ? "bg-primary text-white shadow-md" 
                      : "bg-white text-muted-foreground border border-muted hover:text-primary"
                  }`}
                >
                  AY {year}
                </button>
              ))}
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-muted p-5.5 rounded-2xl shadow-sm">
              <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block">Training Duration</span>
              <div className="text-2xl font-black text-primary mt-1 tracking-tight flex items-baseline gap-1">
                {data.stats.hours} <span className="text-xs font-normal text-muted-foreground">Hours</span>
              </div>
            </div>
            <div className="bg-white border border-muted p-5.5 rounded-2xl shadow-sm">
              <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block">Total Sessions</span>
              <div className="text-2xl font-black text-primary mt-1 tracking-tight flex items-baseline gap-1">
                {data.stats.sessions} <span className="text-xs font-normal text-muted-foreground">Chapters</span>
              </div>
            </div>
            <div className="bg-white border border-muted p-5.5 rounded-2xl shadow-sm">
              <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block">Students Enrolled</span>
              <div className="text-2xl font-black text-primary mt-1 tracking-tight flex items-baseline gap-1">
                {data.stats.enrollment} <span className="text-xs font-normal text-muted-foreground">Students</span>
              </div>
            </div>
            <div className="bg-white border border-muted p-5.5 rounded-2xl shadow-sm">
              <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block">Average Satisfaction</span>
              <div className="text-2xl font-black text-accent mt-1 tracking-tight flex items-baseline gap-1">
                {data.stats.rating}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Training Session List */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left: Interactive Curriculum List */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Filter tabs */}
              <div className="flex bg-muted/50 p-1 rounded-xl border border-muted gap-1 overflow-x-auto no-scrollbar max-w-full">
                {(["all", "Technical", "Aptitude", "Soft Skills", "Mock Prep"] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`cursor-pointer px-4 py-2 rounded-lg text-xs font-bold transition-all duration-200 whitespace-nowrap capitalize ${
                      activeTab === tab 
                        ? "bg-white text-primary shadow-sm" 
                        : "text-muted-foreground hover:text-primary"
                    }`}
                  >
                    {tab === "all" ? "All Modules" : tab}
                  </button>
                ))}
              </div>

              {/* Sessions mapping */}
              <div className="space-y-6">
                <AnimatePresence mode="wait">
                  {filteredSessions.map((session, idx) => (
                    <motion.div
                      key={session.title}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25, delay: idx * 0.05 }}
                      className="bg-white border border-muted p-6.5 rounded-2xl.5 shadow-[0_8px_30px_rgb(0,0,0,0.01)] hover:border-accent/40 hover:shadow-md transition-all duration-300 space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                        <div>
                          <span className="inline-flex px-2 py-0.5 bg-primary/10 text-[10px] text-primary font-extrabold rounded border border-primary/20 mb-2 uppercase tracking-wide">
                            {session.category}
                          </span>
                          <h3 className="text-base font-extrabold text-primary leading-tight">{session.title}</h3>
                          <p className="text-[10px] text-muted-foreground font-semibold mt-1 flex items-center gap-1">
                            <Users className="w-3.5 h-3.5 text-accent" /> Delivered by: <span className="text-foreground">{session.trainer}</span> ({session.agency})
                          </p>
                        </div>
                        <span className="inline-flex items-center gap-1 bg-muted px-2.5 py-1 text-[10px] font-bold text-primary rounded-lg border border-muted-border shrink-0 self-start sm:self-auto">
                          <Clock className="w-3.5 h-3.5 text-accent" /> {session.hours} Hours
                        </span>
                      </div>

                      <p className="text-xs text-muted-foreground leading-relaxed bg-muted/20 p-3 rounded-xl border border-muted/30">
                        {session.description}
                      </p>

                      <div className="flex flex-wrap justify-between items-center text-[10px] text-muted-foreground pt-2 border-t border-muted/50 gap-2">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-accent" /> <strong>Schedule:</strong> {session.dateRange}
                        </span>
                        <span><strong>Target Batch:</strong> {session.target}</span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {filteredSessions.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground bg-white border border-muted border-dashed rounded-2xl">
                    No sessions found under this module.
                  </div>
                )}
              </div>

            </div>

            {/* Right: Enrollment Form */}
            <div className="lg:col-span-4">
              <div className="bg-white border border-muted p-6.5 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-6 sticky top-28">
                <div>
                  <h3 className="text-base font-extrabold text-primary flex items-center gap-1.5">
                    <FileCheck className="w-5 h-5 text-accent" /> Seminar Registration Portal
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">Register for the training workshops or mock drills below. Attendance is monitored.</p>
                </div>

                {!isEnrolled ? (
                  <form onSubmit={handleEnroll} className="space-y-4 text-xs">
                    <div>
                      <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wide">Student Full Name</label>
                      <input
                        type="text"
                        required
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        placeholder="e.g. Rohini Jagtap"
                        className="w-full px-4 py-3 rounded-xl border border-muted bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent placeholder:text-muted-foreground/35"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wide">Student Roll / ID Number</label>
                      <input
                        type="text"
                        required
                        value={studentRoll}
                        onChange={(e) => setStudentRoll(e.target.value)}
                        placeholder="e.g. KB-2024-033"
                        className="w-full px-4 py-3 rounded-xl border border-muted bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent placeholder:text-muted-foreground/35"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wide">Email Address</label>
                      <input
                        type="email"
                        required
                        value={studentEmail}
                        onChange={(e) => setStudentEmail(e.target.value)}
                        placeholder="e.g. rohini@gmail.com"
                        className="w-full px-4 py-3 rounded-xl border border-muted bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent placeholder:text-muted-foreground/35"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wide">Select Workshop Session</label>
                      <div className="relative">
                        <select
                          required
                          value={selectedSession}
                          onChange={(e) => setSelectedSession(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-muted bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent text-foreground appearance-none pr-10"
                        >
                          <option value="">-- Choose training program --</option>
                          {data.sessions.map(s => (
                            <option key={s.title} value={s.title}>{s.title}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3.5 top-3.5 w-4 h-4 text-muted-foreground pointer-events-none" />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={!isFormValid}
                      className="cursor-pointer w-full py-3 bg-primary hover:bg-primary/95 text-white font-bold rounded-xl shadow-md transition-all duration-300 inline-flex items-center justify-center gap-2 hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4" /> Register For Session
                    </button>
                  </form>
                ) : (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-5 text-center space-y-4">
                    <div className="w-12 h-12 bg-emerald-500/10 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto border border-emerald-500/20">
                      <Award className="w-6 h-6 animate-pulse" />
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-primary">Registration Saved</h4>
                      <p className="text-[11px] text-muted-foreground mt-1 leading-normal">
                        Successful enrollment! Schedule, study materials, and guidelines have been sent to <span className="font-bold text-primary">{studentEmail}</span>.
                      </p>
                    </div>
                    <button
                      onClick={handleReset}
                      className="cursor-pointer px-4 py-2 bg-primary text-white font-bold rounded-xl text-xs hover:bg-primary/95 transition-colors"
                    >
                      New Enrollment
                    </button>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>
    </AppLayout>
  );
}
