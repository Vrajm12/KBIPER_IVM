import { AppLayout } from "@/components/layout/AppLayout";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Award, 
  Mail, 
  Calendar,
  Clock,
  Send,
  Sparkles,
  Users,
  FileText,
  DownloadCloud,
  CheckCircle,
  TrendingUp,
  FileCheck
} from "lucide-react";
import { useState, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";

interface IQACMember {
  name: string;
  role: string;
  designation: string;
}

const IQAC_MEMBERS: IQACMember[] = [
  { name: "Dr. Rekha Patil", role: "Chairperson", designation: "Principal, KBIPER" },
  { name: "Prof. Sandeep R. Bhegade", role: "IQAC Coordinator", designation: "Assistant Professor, Pharmaceutics" },
  { name: "Shri. Ramdas Bhegade", role: "Management Representative", designation: "Secretary, Indrayani Vidya Mandir" },
  { name: "Dr. Nilesh Patil", role: "Faculty Member", designation: "Associate Professor, Quality Assurance" },
  { name: "Mrs. Priya Deshpande", role: "Faculty Member", designation: "Assistant Professor, Pharmaceutics" },
  { name: "Dr. Sunil Patil", role: "External Expert (Industry)", designation: "Principal Scientist, Lupin Research Park" },
  { name: "Mr. Rohit Jagtap", role: "Student Representative", designation: "Final Year B.Pharm" }
];

const MEETING_MINUTES = [
  { title: "IQAC First Quarter Review Meeting", date: "April 10, 2026", size: "1.1 MB", year: "2025-26" },
  { title: "Academic Audit & Infrastructure Review Minutes", date: "January 14, 2026", size: "1.5 MB", year: "2025-26" },
  { title: "Research & Development Quality Benchmark Meeting", date: "October 08, 2025", size: "1.2 MB", year: "2025-26" },
  { title: "Annual Curriculum Feedback Planning Session", date: "June 20, 2025", size: "1.4 MB", year: "2024-25" },
  { title: "Institutional Best Practices Verification Minutes", date: "March 15, 2025", size: "950 KB", year: "2024-25" }
];

const AQAR_REPORTS = [
  { title: "Annual Quality Assurance Report (AQAR) 2024-25", status: "Submitted & Approved", date: "December 15, 2025", file: "AQAR_2024_25.pdf" },
  { title: "Annual Quality Assurance Report (AQAR) 2023-24", status: "Submitted & Approved", date: "December 10, 2024", file: "AQAR_2023_24.pdf" },
  { title: "Annual Quality Assurance Report (AQAR) 2022-23", status: "Submitted & Approved", date: "November 28, 2023", file: "AQAR_2022_23.pdf" }
];

export default function IQACCell() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"composition" | "minutes" | "aqar">("composition");
  
  // Suggestion box state
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [senderRole, setSenderRole] = useState("Student");
  const [suggestion, setSuggestion] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isFormValid = useMemo(() => {
    return senderName.trim().length > 2 && senderEmail.trim().includes("@") && suggestion.trim().length > 9;
  }, [senderName, senderEmail, suggestion]);

  const handleDownload = (docName: string) => {
    toast({
      title: "Download Triggered",
      description: `Downloading "${docName}" compliance document.`,
    });
  };

  const handleSuggestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    setIsSubmitted(true);
    toast({
      title: "Quality Suggestion Logged",
      description: "Thank you for your valuable feedback. It has been securely routed to the IQAC Cell.",
    });
  };

  const handleResetForm = () => {
    setSenderName("");
    setSenderEmail("");
    setSenderRole("Student");
    setSuggestion("");
    setIsSubmitted(false);
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
              Internal Quality <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#e6d080]">Assurance</span> Cell
            </h1>
            <p className="text-base md:text-lg text-white/80 font-light max-w-2xl mx-auto">
              IQAC (Internal Quality Assurance Cell) plans, guides, and monitors quality enhancement and sustenance initiatives at KBIPER.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Tab Switcher & Content */}
      <section className="py-16 bg-background min-h-[60vh]">
        <div className="container mx-auto px-4 max-w-6xl">
          
          {/* Central Tabs navigation */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex p-1.5 bg-muted/80 backdrop-blur rounded-2xl border border-muted/50 shadow-sm gap-1 overflow-x-auto no-scrollbar max-w-full">
              <button
                onClick={() => setActiveTab("composition")}
                className={`cursor-pointer px-5.5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 whitespace-nowrap inline-flex items-center gap-1.5 ${
                  activeTab === "composition" ? "bg-primary text-white shadow-md" : "text-muted-foreground hover:text-primary"
                }`}
              >
                <Users className="w-4 h-4" /> IQAC Composition
              </button>
              <button
                onClick={() => setActiveTab("minutes")}
                className={`cursor-pointer px-5.5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 whitespace-nowrap inline-flex items-center gap-1.5 ${
                  activeTab === "minutes" ? "bg-primary text-white shadow-md" : "text-muted-foreground hover:text-primary"
                }`}
              >
                <FileText className="w-4 h-4" /> Meeting Minutes
              </button>
              <button
                onClick={() => setActiveTab("aqar")}
                className={`cursor-pointer px-5.5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 whitespace-nowrap inline-flex items-center gap-1.5 ${
                  activeTab === "aqar" ? "bg-primary text-white shadow-md" : "text-muted-foreground hover:text-primary"
                }`}
              >
                <FileCheck className="w-4 h-4" /> AQAR Reports
              </button>
            </div>
          </div>

          {/* Tab content area */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Main Content Pane */}
            <div className="lg:col-span-8 space-y-6">
              <AnimatePresence mode="wait">
                {activeTab === "composition" && (
                  <motion.div
                    key="composition"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-6"
                  >
                    <div>
                      <h2 className="text-xl font-extrabold text-primary flex items-center gap-2">
                        <Users className="w-5.5 h-5.5 text-accent" /> Committee Composition
                      </h2>
                      <p className="text-xs text-muted-foreground mt-0.5">Faculty, administrators, and student representatives driving quality benchmarks.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {IQAC_MEMBERS.map((member, idx) => (
                        <div 
                          key={idx} 
                          className="bg-white border border-muted p-5 rounded-2xl shadow-sm hover:border-accent/40 transition-colors duration-300"
                        >
                          <span className="text-[9px] uppercase font-bold text-accent tracking-wider block">{member.role}</span>
                          <h3 className="text-sm font-extrabold text-primary leading-tight mt-1">{member.name}</h3>
                          <p className="text-xs text-muted-foreground mt-0.5">{member.designation}</p>
                        </div>
                      ))}
                    </div>

                    {/* Objectives Section */}
                    <div className="bg-primary text-white rounded-3xl p-6.5 shadow-md relative overflow-hidden mt-6">
                      <div className="absolute -bottom-8 -right-8 opacity-10 pointer-events-none">
                        <Sparkles className="w-48 h-48" strokeWidth={0.5} />
                      </div>
                      <h3 className="text-xs font-extrabold uppercase tracking-widest text-accent mb-4">Core Objectives of IQAC</h3>
                      <ul className="space-y-3.5 list-none pl-0 text-xs text-white/80 leading-relaxed">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                          <span>To establish an evaluation system for conscious, consistent, and catalytic improvements in academic performance.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                          <span>To promote measures for institutional functioning towards quality enhancement through internalization of quality culture.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                          <span>To optimize and integrate modern methods of teaching, learning, and research evaluation.</span>
                        </li>
                      </ul>
                    </div>
                  </motion.div>
                )}

                {activeTab === "minutes" && (
                  <motion.div
                    key="minutes"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-6"
                  >
                    <div>
                      <h2 className="text-xl font-extrabold text-primary flex items-center gap-2">
                        <FileText className="w-5.5 h-5.5 text-accent" /> IQAC Meeting Minutes
                      </h2>
                      <p className="text-xs text-muted-foreground mt-0.5">Official summaries, resolutions, and action reports logged by the cell.</p>
                    </div>

                    <div className="space-y-4">
                      {MEETING_MINUTES.map((doc, idx) => (
                        <div 
                          key={idx}
                          className="bg-white border border-muted p-5 rounded-2xl shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:border-accent/40 transition-colors duration-300"
                        >
                          <div>
                            <span className="inline-flex px-1.5 py-0.5 bg-muted text-[9px] text-primary font-bold rounded border border-muted-border mb-1.5 uppercase">
                              AY {doc.year}
                            </span>
                            <h3 className="text-sm font-extrabold text-primary leading-tight">{doc.title}</h3>
                            <div className="flex gap-4 text-[10px] text-muted-foreground mt-1">
                              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {doc.date}</span>
                              <span>Size: {doc.size}</span>
                            </div>
                          </div>
                          
                          <button
                            onClick={() => handleDownload(doc.title)}
                            className="cursor-pointer bg-primary hover:bg-primary/95 text-white p-2.5 rounded-xl border border-transparent shadow hover:scale-102 transition-all self-start sm:self-auto shrink-0 flex items-center gap-1.5 text-xs font-bold"
                          >
                            <DownloadCloud className="w-4 h-4 text-accent" /> Download PDF
                          </button>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === "aqar" && (
                  <motion.div
                    key="aqar"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-6"
                  >
                    <div>
                      <h2 className="text-xl font-extrabold text-primary flex items-center gap-2">
                        <FileCheck className="w-5.5 h-5.5 text-accent" /> AQAR Submissions
                      </h2>
                      <p className="text-xs text-muted-foreground mt-0.5">Annual Quality Assurance Reports submitted to NAAC database.</p>
                    </div>

                    <div className="space-y-4">
                      {AQAR_REPORTS.map((report, idx) => (
                        <div 
                          key={idx}
                          className="bg-white border border-muted p-5 rounded-2xl shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:border-accent/40 transition-colors duration-300"
                        >
                          <div>
                            <span className="inline-flex px-2 py-0.5 bg-emerald-50 text-[9px] text-emerald-700 font-bold rounded-full border border-emerald-100 mb-1.5">
                              {report.status}
                            </span>
                            <h3 className="text-sm font-extrabold text-primary leading-tight">{report.title}</h3>
                            <div className="flex gap-4 text-[10px] text-muted-foreground mt-1">
                              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Filed: {report.date}</span>
                            </div>
                          </div>
                          
                          <button
                            onClick={() => handleDownload(report.title)}
                            className="cursor-pointer bg-primary hover:bg-primary/95 text-white p-2.5 rounded-xl border border-transparent shadow hover:scale-102 transition-all self-start sm:self-auto shrink-0 flex items-center gap-1.5 text-xs font-bold"
                          >
                            <DownloadCloud className="w-4 h-4 text-accent" /> View Report
                          </button>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right Column Suggestion Form */}
            <div className="lg:col-span-4">
              <div className="bg-white border border-muted p-6.5 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-6 sticky top-28">
                <div>
                  <h3 className="text-base font-extrabold text-primary flex items-center gap-1.5">
                    <Send className="w-5 h-5 text-accent" /> Quality Feedback Desk
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">Submit academic or infrastructure recommendations to the IQAC coordinator.</p>
                </div>

                {!isSubmitted ? (
                  <form onSubmit={handleSuggestionSubmit} className="space-y-4 text-xs">
                    <div>
                      <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wide">Your Full Name</label>
                      <input
                        type="text"
                        required
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        placeholder="e.g. Snehal Shinde"
                        className="w-full px-4 py-3 rounded-xl border border-muted bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent placeholder:text-muted-foreground/35"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wide">Email Address</label>
                      <input
                        type="email"
                        required
                        value={senderEmail}
                        onChange={(e) => setSenderEmail(e.target.value)}
                        placeholder="e.g. snehal@gmail.com"
                        className="w-full px-4 py-3 rounded-xl border border-muted bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent placeholder:text-muted-foreground/35"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wide">Your Role</label>
                      <select
                        value={senderRole}
                        onChange={(e) => setSenderRole(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-muted bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent text-foreground animate-in"
                      >
                        <option value="Student">Student (B.Pharm / D.Pharm)</option>
                        <option value="Faculty">Teaching Staff</option>
                        <option value="Alumni">KBIPER Alumni</option>
                        <option value="Parent">Parent / Guardian</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wide">Your Quality Suggestion (Min 10 chars)</label>
                      <textarea
                        required
                        rows={4}
                        value={suggestion}
                        onChange={(e) => setSuggestion(e.target.value)}
                        placeholder="State your suggestions regarding curriculum audits, lab calibration, research infrastructure, etc..."
                        className="w-full px-4 py-3 rounded-xl border border-muted bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent placeholder:text-muted-foreground/35"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={!isFormValid}
                      className="cursor-pointer w-full py-3 bg-primary hover:bg-primary/95 text-white font-bold rounded-xl shadow-md transition-all duration-300 inline-flex items-center justify-center gap-2 hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4" /> Send Recommendation
                    </button>
                  </form>
                ) : (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-5 text-center space-y-4">
                    <div className="w-12 h-12 bg-emerald-500/10 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto border border-emerald-500/20">
                      <CheckCircle className="w-6 h-6 animate-bounce" />
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-primary">Suggestion Logged</h4>
                      <p className="text-[11px] text-muted-foreground mt-1 leading-normal">
                        Your recommendation has been sent to IQAC Coordinator Prof. Sandeep R. Bhegade. Thank you for driving excellence.
                      </p>
                    </div>
                    <button
                      onClick={handleResetForm}
                      className="cursor-pointer px-4 py-2 bg-primary text-white font-bold rounded-xl text-xs hover:bg-primary/95 transition-colors"
                    >
                      New Suggestion
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
