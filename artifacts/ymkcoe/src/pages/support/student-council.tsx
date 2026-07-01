import { AppLayout } from "@/components/layout/AppLayout";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, 
  Send, 
  CheckCircle, 
  HelpCircle,
  Building,
  UserCheck,
  ChevronRight,
  Printer,
  ExternalLink,
  Award,
  BookOpen,
  Mail,
  Phone
} from "lucide-react";
import { useState, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";

interface CouncilMember {
  id: string;
  name: string;
  role: string;
  designation: string;
  department: string;
  email: string;
  photoInitials: string;
}

const COUNCIL_MEMBERS: CouncilMember[] = [
  {
    id: "1",
    name: "Mr. Rohit Jagtap",
    role: "Student Council President",
    designation: "Student (Final Year B.Pharm)",
    department: "Student Representative Board",
    email: "rohit.jagtap@student.kbiper.edu.in",
    photoInitials: "RJ"
  },
  {
    id: "2",
    name: "Ms. Sneha Kulkarni",
    role: "General Secretary",
    designation: "Student (Third Year B.Pharm)",
    department: "Student Representative Board",
    email: "sneha.k@student.kbiper.edu.in",
    photoInitials: "SK"
  },
  {
    id: "3",
    name: "Mr. Rahul Shinde",
    role: "Sports Secretary",
    designation: "Student (Final Year B.Pharm)",
    department: "Sports Department Board",
    email: "rahul.s@student.kbiper.edu.in",
    photoInitials: "RS"
  },
  {
    id: "4",
    name: "Ms. Ananya Deshpande",
    role: "Cultural Secretary",
    designation: "Student (Third Year B.Pharm)",
    department: "Cultural Department Board",
    email: "ananya.d@student.kbiper.edu.in",
    photoInitials: "AD"
  },
  {
    id: "5",
    name: "Mr. Vicky Salve",
    role: "NSS Representative",
    designation: "Student (Second Year B.Pharm)",
    department: "Social Services Unit",
    email: "vicky.s@student.kbiper.edu.in",
    photoInitials: "VS"
  }
];

const STUDENT_CLUBS = [
  {
    name: "KBIPER Pharma Club",
    desc: "Organizes pharmaceutical debates, GPAT quiz sessions, guest workshops, and scientific model design competitions.",
    coordinator: "Prof. Milind Gaikwad",
    email: "milind.gaikwad@kbiper.edu.in",
    activities: "Annual GPAT Mock Tests, Model Exhibitions"
  },
  {
    name: "Cultural Fiesta Committee",
    desc: "Coordinates dance contests, singing contests, drama fests, and KBIPER's annual 'Pharma-Fiesta'.",
    coordinator: "Prof. Anjali Jadhav",
    email: "anjali.jadhav@kbiper.edu.in",
    activities: "Pharma-Fiesta, Independence Day fests"
  },
  {
    name: "KBIPER Sports Association",
    desc: "Schedules annual cricket tournaments, chess meets, football leagues, and badminton championships.",
    coordinator: "Prof. Sushma Kamble",
    email: "sushma.kamble@kbiper.edu.in",
    activities: "Pharma-Cup Annual Sports Week"
  },
  {
    name: "Literary & Research Society",
    desc: "Publishes the campus wall-magazine, student research newsletters, and hosts seminar presentations.",
    coordinator: "Dr. Vivek Sharma",
    email: "vivek.sharma@kbiper.edu.in",
    activities: "Wall-Magazine editing, Research workshops"
  }
];

export default function StudentCouncil() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"members" | "clubs" | "suggestion">("members");

  // Suggestion Form State
  const [studentName, setStudentName] = useState("");
  const [suggestionCategory, setSuggestionCategory] = useState("Academic Infrastructure");
  const [suggestionText, setSuggestionText] = useState("");
  const [submissionCode, setSubmissionCode] = useState<string | null>(null);

  const isFormValid = useMemo(() => {
    return suggestionText.trim().length > 10;
  }, [suggestionText]);

  const handleSuggestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      toast({
        title: "Suggestion Empty",
        description: "Please write a detailed suggestion before submitting.",
      });
      return;
    }

    const code = `SUG-${new Date().getFullYear()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    setSubmissionCode(code);

    toast({
      title: "Suggestion Received",
      description: `Thank you! Suggestion registered under code ${code}.`,
    });
  };

  const handleResetForm = () => {
    setStudentName("");
    setSuggestionText("");
    setSubmissionCode(null);
  };

  const handleEnrollClub = (clubName: string) => {
    toast({
      title: "Club Application Sent",
      description: `Your application to join ${clubName} has been routed to the coordinator.`,
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
              <Users className="w-7 h-7" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
              Student <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#e6d080]">Council</span>
            </h1>
            <p className="text-base md:text-lg text-white/80 font-light max-w-2xl mx-auto">
              Empowering student voice, coordinating academic clubs, planning sports fests, and fostering campus collaboration.
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
                onClick={() => setActiveTab("members")}
                className={`cursor-pointer px-5.5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 whitespace-nowrap inline-flex items-center gap-1.5 ${
                  activeTab === "members" ? "bg-primary text-white shadow-md" : "text-muted-foreground hover:text-primary"
                }`}
              >
                <Users className="w-4 h-4" /> Council Members
              </button>
              <button
                onClick={() => setActiveTab("clubs")}
                className={`cursor-pointer px-5.5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 whitespace-nowrap inline-flex items-center gap-1.5 ${
                  activeTab === "clubs" ? "bg-primary text-white shadow-md" : "text-muted-foreground hover:text-primary"
                }`}
              >
                <Award className="w-4 h-4" /> Student Clubs
              </button>
              <button
                onClick={() => {
                  setActiveTab("suggestion");
                  setSubmissionCode(null);
                }}
                className={`cursor-pointer px-5.5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 whitespace-nowrap inline-flex items-center gap-1.5 ${
                  activeTab === "suggestion" ? "bg-primary text-white shadow-md" : "text-muted-foreground hover:text-primary"
                }`}
              >
                <Send className="w-4 h-4" /> Suggestion Box
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "members" && (
              /* =========================================================================
                 👥 COUNCIL MEMBERS TAB
                 ========================================================================= */
              <motion.div
                key="members-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6.5"
              >
                {COUNCIL_MEMBERS.map((member) => (
                  <div key={member.id} className="group relative flex flex-col h-full">
                    <div className="absolute inset-0 bg-primary/5 rounded-3xl transform group-hover:translate-x-1.5 group-hover:translate-y-1.5 transition-transform duration-500 ease-out" />
                    
                    <div className="relative bg-white border border-muted p-6.5 rounded-3xl shadow-[0_6px_25px_rgb(0,0,0,0.01)] group-hover:border-accent/40 transition-all duration-300 flex flex-col h-full overflow-hidden z-10">
                      <div className="flex justify-between items-start mb-4">
                        <span className="inline-flex items-center px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-wider rounded-md border bg-primary/5 border-primary/10 text-primary">
                          {member.role}
                        </span>
                      </div>

                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/5 to-accent/5 border border-muted flex items-center justify-center mb-4 shrink-0 group-hover:scale-105 transition-transform duration-300">
                        <span className="text-lg font-black text-primary/80">{member.photoInitials}</span>
                      </div>

                      <h4 className="text-base font-bold text-primary group-hover:text-accent transition-colors leading-tight mb-1">{member.name}</h4>
                      <p className="text-xs text-muted-foreground font-semibold mb-1">{member.designation}</p>
                      <p className="text-[10px] text-muted-foreground/80 flex items-center gap-1 mb-6">
                        <Building className="w-3.5 h-3.5 text-accent" /> {member.department}
                      </p>

                      <div className="space-y-2 mt-auto pt-4 border-t border-muted/50 text-xs font-semibold text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Mail className="w-3.5 h-3.5 text-accent" />
                          <a href={`mailto:${member.email}`} className="text-primary hover:text-accent hover:underline break-all">{member.email}</a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === "clubs" && (
              /* =========================================================================
                 🏆 STUDENT CLUBS TAB
                 ========================================================================= */
              <motion.div
                key="clubs-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6.5"
              >
                {STUDENT_CLUBS.map((club, idx) => (
                  <div key={idx} className="bg-white border border-muted p-6.5 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.01)] hover:border-accent/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <h4 className="text-base font-extrabold text-primary leading-tight">{club.name}</h4>
                          <span className="text-[9px] uppercase font-bold text-accent tracking-wider block mt-1">Mentor: {club.coordinator}</span>
                        </div>
                        <span className="w-8 h-8 rounded-full bg-accent/15 flex items-center justify-center text-accent text-xs font-bold">✓</span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{club.desc}</p>
                      
                      <div className="p-3 bg-muted/40 border border-muted rounded-xl text-xs space-y-1.5">
                        <strong className="text-primary block">Major Activities:</strong>
                        <span className="text-muted-foreground font-medium">{club.activities}</span>
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-muted/50 flex flex-wrap justify-between items-center gap-3">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Mail className="w-3.5 h-3.5 text-accent" />
                        <a href={`mailto:${club.email}`} className="hover:text-accent hover:underline">{club.email}</a>
                      </div>
                      <button 
                        onClick={() => handleEnrollClub(club.name)}
                        className="cursor-pointer bg-primary hover:bg-accent text-white font-bold text-xs px-4 py-2 rounded-lg transition-all"
                      >
                        Enroll Now
                      </button>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === "suggestion" && (
              /* =========================================================================
                 📢 SUGGESTION BOX TAB
                 ========================================================================= */
              <motion.div
                key="suggestion-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="max-w-xl mx-auto"
              >
                {!submissionCode ? (
                  <form onSubmit={handleSuggestionSubmit} className="bg-white border border-muted p-6 md:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-6">
                    <div>
                      <h3 className="text-lg font-extrabold text-primary">Student Council Suggestion Box</h3>
                      <p className="text-xs text-muted-foreground mt-1">Submit ideas or requests for events, library acquisitions, canteen menus, or administrative reforms.</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wide">Your Name (Optional)</label>
                        <input
                          type="text"
                          value={studentName}
                          onChange={(e) => setStudentName(e.target.value)}
                          placeholder="e.g. Vicky Salve"
                          className="w-full px-4 py-3 rounded-xl border border-muted bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent placeholder:text-muted-foreground/35"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wide">Suggestion Category</label>
                        <select 
                          value={suggestionCategory}
                          onChange={(e) => setSuggestionCategory(e.target.value)}
                          className="flex h-12 w-full rounded-xl bg-white border border-muted px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                        >
                          <option>Academic Infrastructure</option>
                          <option>Cultural & Sports Events</option>
                          <option>Canteen & Cleanliness</option>
                          <option>Other Feedback</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wide">Detailed Suggestion (At least 10 characters)</label>
                        <textarea
                          required
                          value={suggestionText}
                          onChange={(e) => setSuggestionText(e.target.value)}
                          placeholder="Describe your idea or recommendation here..."
                          className="w-full min-h-[140px] px-4 py-3.5 rounded-xl border border-muted bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent placeholder:text-muted-foreground/35 resize-none"
                        />
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
                      <Send className="w-4.5 h-4.5" /> Submit Suggestion
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
                      <h3 className="text-2xl font-bold text-primary">Suggestion Logged</h3>
                      <p className="text-xs text-muted-foreground mt-1 max-w-xs mx-auto">Your suggestion has been queued. The Student Council board will review it during the next weekly meeting.</p>
                    </div>

                    <div className="bg-muted/40 border border-muted/50 p-5 rounded-2xl text-left text-xs font-semibold space-y-3.5 text-muted-foreground">
                      <div className="space-y-2 border-t border-muted-border/60 pt-2 text-primary font-bold">
                        <div className="flex justify-between items-center border-b border-muted-border/40 pb-1.5">
                          <span>Reference Code</span>
                          <span className="text-accent font-extrabold">{submissionCode}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-muted-border/40 pb-1.5">
                          <span>Suggestion Category</span>
                          <span>{suggestionCategory}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleResetForm}
                      className="cursor-pointer w-full py-3 px-4 bg-primary hover:bg-accent text-white rounded-xl text-xs font-bold transition-all"
                    >
                      Submit Another Suggestion
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
