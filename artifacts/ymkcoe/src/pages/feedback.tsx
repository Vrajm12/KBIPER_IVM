import { AppLayout } from "@/components/layout/AppLayout";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, 
  MessageSquare, 
  CheckCircle2, 
  Users, 
  TrendingUp, 
  Clock, 
  ShieldCheck, 
  ClipboardCheck, 
  Printer, 
  ChevronRight,
  HelpCircle,
  FileText
} from "lucide-react";
import { useState, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

type StakeholderRole = "student" | "alumni" | "faculty";

interface SurveyQuestion {
  id: string;
  text: string;
}

interface StakeholderConfig {
  label: string;
  icon: React.ReactNode;
  subtitle: string;
  questions: SurveyQuestion[];
}

const SURVEY_CONFIGS: Record<StakeholderRole, StakeholderConfig> = {
  student: {
    label: "Student Feedback",
    icon: <Users className="w-4 h-4" />,
    subtitle: "Evaluation of active courses, syllabus coverage, and laboratory setups.",
    questions: [
      { id: "S1", text: "Depth and relevance of the pharmacy curriculum to industry needs" },
      { id: "S2", text: "Quality of laboratory guidance, chemicals, and equipment availability" },
      { id: "S3", text: "Library resource collection (physical textbooks, e-journals & DELNET)" },
      { id: "S4", text: "Effectiveness of student mentoring, counseling, and academic feedback" }
    ]
  },
  alumni: {
    label: "Alumni Feedback",
    icon: <ClipboardCheck className="w-4 h-4" />,
    subtitle: "Evaluating how the curriculum supported your career or post-graduate path.",
    questions: [
      { id: "A1", text: "Relevance of the syllabus to your active industrial job or higher studies" },
      { id: "A2", text: "Adequacy of training & placement cell support during your graduation" },
      { id: "A3", text: "Quality of infrastructure and learning resources during your college tenure" },
      { id: "A4", text: "Willingness to support juniors through expert guest lectures and networking" }
    ]
  },
  faculty: {
    label: "Faculty Feedback",
    icon: <ShieldCheck className="w-4 h-4" />,
    subtitle: "Evaluating the curriculum design, institutional support, research opportunities, and environment.",
    questions: [
      { id: "F1", text: "Relevance and structure of the syllabus under Dr. Babasaheb Ambedkar Technological University (DBATU)" },
      { id: "F2", text: "Availability and adequacy of resources (reference books, digital libraries, and lab infrastructure)" },
      { id: "F3", text: "Support for research, paper publications, and professional faculty development (FDP)" },
      { id: "F4", text: "Overall academic environment, institutional administration, and student discipline" }
    ]
  }
};

const RATING_VALUES = [
  { value: 5, label: "Excellent" },
  { value: 4, label: "Very Good" },
  { value: 3, label: "Good" },
  { value: 2, label: "Satisfactory" },
  { value: 1, label: "Poor" }
];

export default function Feedback() {
  const { toast } = useToast();
  
  const [activeRole, setActiveRole] = useState<StakeholderRole>("student");
  
  // User Form fields
  const [fullName, setFullName] = useState("");
  const [contactInfo, setContactInfo] = useState(""); // Email or Phone
  const [affiliation, setAffiliation] = useState(""); // Batch, Company, or Ward Name
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [customComments, setCustomComments] = useState("");
  
  // Submit success screen trigger
  const [ticketId, setTicketId] = useState<string | null>(null);

  const activeConfig = SURVEY_CONFIGS[activeRole];

  // Validate sessional matrix completions
  const isFormValid = useMemo(() => {
    if (!fullName.trim() || !contactInfo.trim()) return false;
    // Verify that every question has a rating
    return activeConfig.questions.every(q => ratings[q.id] !== undefined);
  }, [fullName, contactInfo, activeConfig, ratings]);

  const handleRatingSelect = (questionId: string, value: number) => {
    setRatings(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleRoleChange = (role: StakeholderRole) => {
    setActiveRole(role);
    setRatings({}); // Reset questionnaire ratings
    setAffiliation("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      toast({
        title: "Incomplete Form",
        description: "Please fill in all contact fields and rate all survey parameters.",
      });
      return;
    }

    // Generate simulated reference ID
    const randomTicket = `FB-${new Date().getFullYear()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    setTicketId(randomTicket);

    toast({
      title: "Feedback Submitted Successfully",
      description: `Your feedback has been logged under reference number ${randomTicket}.`,
    });
  };

  const handlePrintReceipt = () => {
    toast({
      title: "Printing Receipt",
      description: "Generating a PDF summary of your feedback submission for your files...",
    });
  };

  const handleResetForm = () => {
    setFullName("");
    setContactInfo("");
    setAffiliation("");
    setRatings({});
    setCustomComments("");
    setTicketId(null);
  };

  return (
    <AppLayout>
      {/* Hero Header */}
      <section className="bg-primary text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/15 via-primary to-[#011a2a]" />
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '30px 30px' }} />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-white/10 backdrop-blur-md">
              <MessageSquare className="w-7 h-7 text-accent" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
              Stakeholder <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#e6d080]">Feedback</span>
            </h1>
            <p className="text-base md:text-lg text-white/80 font-light max-w-2xl mx-auto">
              Our continuous digital improvement system. Feedbacks are directly compiled by IQAC for curriculum designs and NAAC reports.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Form & Dashboard Section */}
      <section className="py-12 bg-background relative min-h-[60vh]">
        <div className="container mx-auto px-4 max-w-6xl">
          
          <AnimatePresence mode="wait">
            {!ticketId ? (
              /* =========================================================================
                 FEEDBACK FILLING FORM LAYOUT
                 ========================================================================= */
              <motion.div 
                key="form-entry"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              >
                {/* Left side: IQAC Transparency Panel */}
                <div className="lg:col-span-4 space-y-6">
                  <div className="bg-gradient-to-br from-primary to-[#0c3149] text-white rounded-3xl p-6.5 shadow-xl relative overflow-hidden group">
                    {/* Glow backdrop icon */}
                    <div className="absolute -bottom-8 -right-8 opacity-10 pointer-events-none group-hover:scale-105 transition-transform duration-500">
                      <MessageSquare className="w-44 h-44 text-white" strokeWidth={0.5} />
                    </div>

                    <h3 className="text-xs font-extrabold uppercase tracking-widest text-accent mb-6 flex items-center gap-2">
                      <TrendingUp className="w-4.5 h-4.5 text-accent" /> IQAC Quality Metrics
                    </h3>

                    {/* Stats details */}
                    <div className="grid grid-cols-2 gap-4 text-center mb-6">
                      <div className="bg-white/5 border border-white/10 p-3.5 rounded-2xl">
                        <span className="text-[9px] uppercase font-bold text-white/60 tracking-wider block mb-1">Index Score</span>
                        <span className="text-xl font-black text-accent">4.64 / 5</span>
                      </div>
                      <div className="bg-white/5 border border-white/10 p-3.5 rounded-2xl">
                        <span className="text-[9px] uppercase font-bold text-white/60 tracking-wider block mb-1">Response Rate</span>
                        <span className="text-xl font-black text-white">98.2%</span>
                      </div>
                      <div className="bg-white/5 border border-white/10 p-3.5 rounded-2xl">
                        <span className="text-[9px] uppercase font-bold text-white/60 tracking-wider block mb-1">Responses</span>
                        <span className="text-xl font-black text-white">412 +</span>
                      </div>
                      <div className="bg-white/5 border border-white/10 p-3.5 rounded-2xl">
                        <span className="text-[9px] uppercase font-bold text-white/60 tracking-wider block mb-1">Avg Resolution</span>
                        <span className="text-xl font-black text-white">48 Hrs</span>
                      </div>
                    </div>

                    <hr className="border-white/10 my-5" />

                    <div className="space-y-4 text-xs text-white/70 leading-relaxed">
                      <p>
                        Feedback forms an integral loop of the **Internal Quality Assurance Cell (IQAC)**. Results are analyzed annually to improve syllabus structures and college infrastructures.
                      </p>
                      <div className="flex gap-2 items-start">
                        <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                        <span>All submissions are secure, authenticated, and directly forwarded to the principal's cell.</span>
                      </div>
                    </div>
                  </div>

                  {/* Frequently Asked Help box */}
                  <div className="bg-muted/30 border border-muted/50 p-6 rounded-3xl space-y-3">
                    <h4 className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
                      <HelpCircle className="w-4 h-4 text-accent" /> Need Assistance?
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      For grievance queries, please route directly to the **Grievance Redressal Cell** page. This form is strictly for academic feedback reviews.
                    </p>
                    <Link href="/support/grievance">
                      <span className="cursor-pointer inline-flex items-center gap-1 text-xs font-bold text-accent hover:underline mt-2">
                        Go to Grievance portal <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </Link>
                  </div>
                </div>

                {/* Right side: Dynamic survey form */}
                <form onSubmit={handleSubmit} className="lg:col-span-8 bg-white border border-muted p-6 md:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-8">
                  
                  {/* Stakeholder Role selection Tab */}
                  <div>
                    <span className="text-xs font-extrabold uppercase tracking-widest text-accent block mb-3">Select Stakeholder Role</span>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 bg-muted/35 p-1 rounded-2xl border border-muted">
                      {(Object.keys(SURVEY_CONFIGS) as StakeholderRole[]).map((role) => {
                        const config = SURVEY_CONFIGS[role];
                        const isActive = activeRole === role;
                        return (
                          <button
                            type="button"
                            key={role}
                            onClick={() => handleRoleChange(role)}
                            className={`cursor-pointer flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold transition-all duration-200 ${
                              isActive 
                                ? "bg-primary text-white shadow-sm" 
                                : "text-muted-foreground hover:text-primary"
                            }`}
                          >
                            {config.icon} {config.label.split(" ")[0]}
                          </button>
                        );
                      })}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2.5 italic">{activeConfig.subtitle}</p>
                  </div>

                  <hr className="border-muted" />

                  {/* Personal Contact Details Fields */}
                  <div className="space-y-4">
                    <span className="text-xs font-extrabold uppercase tracking-widest text-accent block">Personal Information</span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wide">Full Name</label>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. John Doe"
                          className="w-full px-4 py-3 rounded-xl border border-muted bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent transition-all placeholder:text-muted-foreground/40"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wide">Email or Phone Number</label>
                        <input
                          type="text"
                          required
                          value={contactInfo}
                          onChange={(e) => setContactInfo(e.target.value)}
                          placeholder="e.g. john@kbiper.edu.in"
                          className="w-full px-4 py-3 rounded-xl border border-muted bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent transition-all placeholder:text-muted-foreground/40"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wide">
                          {activeRole === "student" && "Current Year & Batch (e.g. Third Year B.Pharm 2023-27)"}
                          {activeRole === "alumni" && "Graduating Year & Batch (e.g. Graduated 2021-22)"}
                          {activeRole === "faculty" && "Designation & Department (e.g. Associate Professor - Pharmaceutics)"}
                        </label>
                        <input
                          type="text"
                          value={affiliation}
                          onChange={(e) => setAffiliation(e.target.value)}
                          placeholder={
                            activeRole === "student" ? "e.g. Third Year B.Pharm" :
                            activeRole === "alumni" ? "e.g. B.Pharm Batch 2022" :
                            "e.g. Associate Professor - Pharmaceutics"
                          }
                          className="w-full px-4 py-3 rounded-xl border border-muted bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent transition-all placeholder:text-muted-foreground/40"
                        />
                      </div>
                    </div>
                  </div>

                  <hr className="border-muted" />

                  {/* 5-point Likert Scale Questionnaire Matrix */}
                  <div className="space-y-4">
                    <span className="text-xs font-extrabold uppercase tracking-widest text-accent block">Sessional Performance Evaluation Matrix</span>
                    
                    <div className="overflow-x-auto border border-muted rounded-2xl">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="bg-muted/40 text-muted-foreground font-bold border-b border-muted">
                            <th className="py-3 px-4.5 w-1/2">Evaluation Parameters</th>
                            {RATING_VALUES.map(val => (
                              <th key={val.value} className="py-3 px-1 text-center whitespace-nowrap">{val.value} ({val.label.charAt(0)})</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-muted text-primary font-medium">
                          {activeConfig.questions.map((question) => (
                            <tr key={question.id} className="hover:bg-muted/20 transition-colors">
                              <td className="py-3 px-4.5 text-xs text-primary leading-relaxed font-bold">
                                {question.text}
                              </td>
                              {RATING_VALUES.map(val => {
                                const isSelected = ratings[question.id] === val.value;
                                return (
                                  <td key={val.value} className="py-3 px-1 text-center">
                                    <button
                                      type="button"
                                      onClick={() => handleRatingSelect(question.id, val.value)}
                                      className={`cursor-pointer w-6 h-6 rounded-full inline-flex items-center justify-center font-bold text-[10px] transition-all border ${
                                        isSelected 
                                          ? "bg-accent border-accent text-white shadow-sm shadow-accent/20 scale-110" 
                                          : "bg-white border-muted text-muted-foreground/70 hover:border-accent"
                                      }`}
                                    >
                                      {val.value}
                                    </button>
                                  </td>
                                );
                              })}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    
                    {/* Index legend helper */}
                    <div className="text-[10px] text-muted-foreground font-semibold flex flex-wrap gap-x-4 gap-y-1 bg-muted/25 px-4 py-2.5 rounded-xl border border-muted/50 mt-1">
                      <span>Index Value:</span>
                      {RATING_VALUES.map(val => (
                        <span key={val.value}>**{val.value}**: {val.label}</span>
                      ))}
                    </div>
                  </div>

                  <hr className="border-muted" />

                  {/* Optional Custom Comments Textarea */}
                  <div>
                    <label className="block text-[10px] font-bold text-primary mb-2 uppercase tracking-wide">Suggestions / General Comments (Optional)</label>
                    <textarea
                      value={customComments}
                      onChange={(e) => setCustomComments(e.target.value)}
                      placeholder="Share any additional comments or specific improvement suggestions with the IQAC board..."
                      className="w-full min-h-[100px] px-4 py-3.5 rounded-xl border border-muted bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent transition-all placeholder:text-muted-foreground/40 resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={!isFormValid}
                    className={`cursor-pointer w-full py-4 rounded-xl text-white text-sm font-bold flex items-center justify-center gap-2 transition-all duration-300 ${
                      isFormValid 
                        ? "bg-accent hover:bg-accent/90 shadow-md shadow-accent/20" 
                        : "bg-muted text-muted-foreground/50 border border-muted-border cursor-not-allowed"
                    }`}
                  >
                    <Send className="w-4.5 h-4.5" /> Submit Survey Responses
                  </button>
                </form>

              </motion.div>
            ) : (
              /* =========================================================================
                 SUBMISSION SUCCESS RECEIPT CARD
                 ========================================================================= */
              <motion.div 
                key="success-receipt"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="max-w-xl mx-auto bg-white border border-muted p-8 md:p-10 rounded-3xl shadow-2xl relative"
              >
                {/* Background icon blur */}
                <div className="absolute top-0 right-0 w-44 h-44 bg-accent/15 rounded-full blur-[60px] pointer-events-none" />

                <div className="text-center space-y-6">
                  {/* Big Check circle */}
                  <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto border border-emerald-100 shadow-sm text-emerald-600">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold text-primary">Receipt Logged Successfully</h3>
                    <p className="text-xs text-muted-foreground mt-1 max-w-xs mx-auto">Your responses have been processed and filed into the IQAC accreditation database.</p>
                  </div>

                  {/* Receipt Box */}
                  <div className="bg-muted/30 border border-muted/50 p-5 rounded-2xl space-y-3.5 text-left text-xs font-semibold">
                    <h4 className="text-[10px] font-extrabold uppercase text-accent tracking-widest flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-accent" /> Submission Receipt details
                    </h4>
                    
                    <div className="space-y-2.5 pl-1.5 text-muted-foreground">
                      <div className="flex justify-between items-center border-b border-muted/60 pb-1.5">
                        <span>Reference Ticket</span>
                        <span className="font-bold text-primary">{ticketId}</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-muted/60 pb-1.5">
                        <span>Submitted By</span>
                        <span className="text-primary font-bold">{fullName}</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-muted/60 pb-1.5">
                        <span>Contact Info</span>
                        <span className="text-primary font-bold">{contactInfo}</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-muted/60 pb-1.5">
                        <span>Survey Category</span>
                        <span className="text-primary font-bold uppercase">{activeConfig.label}</span>
                      </div>
                      <div className="flex justify-between items-center pt-0.5">
                        <span>System Date Timestamp</span>
                        <span className="text-primary font-bold">2026-06-26 21:01:58</span>
                      </div>
                    </div>
                  </div>

                  {/* Print and Fill again actions */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-3">
                    <button
                      onClick={handlePrintReceipt}
                      className="cursor-pointer flex-1 py-3 px-4 bg-muted hover:bg-muted/80 border border-muted-border text-primary rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all"
                    >
                      <Printer className="w-4 h-4 text-primary" /> Print Submission Receipt
                    </button>
                    <button
                      onClick={handleResetForm}
                      className="cursor-pointer flex-1 py-3 px-4 bg-primary hover:bg-accent text-white rounded-xl text-xs font-bold transition-all"
                    >
                      Submit Another Survey
                    </button>
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
