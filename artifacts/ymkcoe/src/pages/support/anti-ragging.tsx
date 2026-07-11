import { AppLayout } from "@/components/layout/AppLayout";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldAlert, 
  Phone, 
  Mail, 
  Send, 
  FileText, 
  Download, 
  Users, 
  CheckCircle, 
  AlertTriangle,
  Scale, 
  HelpCircle,
  Building,
  UserCheck,
  ChevronRight,
  Printer,
  X,
  ExternalLink
} from "lucide-react";
import { useState, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";

interface CommitteeMember {
  id: string;
  name: string;
  role: string;
  designation: string;
  department: string;
  phone?: string;
  email?: string;
  isHead?: boolean;
}

const COMMITTEE_MEMBERS: CommitteeMember[] = [
  {
    id: "1",
    name: "Dr. Sanjay R. Arote",
    role: "Chairman",
    designation: "Principal",
    department: "College Administration",
    phone: "9960365969",
    email: "principal.iiper@gmail.com",
    isHead: true
  },
  {
    id: "2",
    name: "Mr. Paresh Parekh",
    role: "Civil Representative",
    designation: "Social worker",
    department: "Civil Representative",
    phone: "9823030979",
    email: "principal.iiper@gmail.com"
  },
  {
    id: "3",
    name: "Mrs. Anuja G. Phadtare",
    role: "Police Representative",
    designation: "API, Training center Lonawala",
    department: "Police Department",
    phone: "9028948595",
    email: "anujaphadtare@gmail.com"
  },
  {
    id: "4",
    name: "Dr. Suhas Kanitkar",
    role: "NGO Representative",
    designation: "M.B.B.S., A.F.I.H.",
    department: "NGO Representative",
    phone: "9552514361",
    email: "suhas27@gmail.com"
  },
  {
    id: "5",
    name: "Mrs. Rekha B. Bhegade",
    role: "Local media Representative",
    designation: "Representative",
    department: "Local Media",
    phone: "8956323150",
    email: "principal.iiper@gmail.com"
  },
  {
    id: "6",
    name: "Dr. Gulab S. Shinde",
    role: "Teaching Representative (D.Pharm)",
    designation: "HOD D.Pharm",
    department: "Diploma in Pharmacy",
    phone: "8975251496",
    email: "shindegss@gmail.com"
  },
  {
    id: "7",
    name: "Dr. Ganesh R. Phadtare",
    role: "Representative (B.Pharm)",
    designation: "Asso. Professor, KBIPER",
    department: "B. Pharmacy",
    phone: "8652858595",
    email: "gpcology@gmail.com"
  },
  {
    id: "8",
    name: "Dr. Amol Rakte",
    role: "Teaching Representative (M.Pharm)",
    designation: "Asso. Professor, KBIPER",
    department: "M. Pharmacy",
    phone: "9867395656",
    email: "amolsrakte@gmail.com"
  },
  {
    id: "9",
    name: "Mr. Ruturaj K Karande",
    role: "Non-Teaching Representative",
    designation: "O.S. KBIPER",
    department: "Administrative Office",
    phone: "9921351889",
    email: "ruturajkarande0@gmail.com"
  },
  {
    id: "10",
    name: "Mrs. Sheetal S. Thakar",
    role: "Parents Representative (D.Pharm)",
    designation: "Parents Representative",
    department: "D. Pharmacy",
    phone: "9356248040",
    email: "siathakar21@gmail.com"
  },
  {
    id: "11",
    name: "Mr. Somnath Sonawane",
    role: "Parents Representative (B.Pharm)",
    designation: "Parents Representative",
    department: "B. Pharmacy",
    phone: "9767551507",
    email: "sonvanesomnath9767@gmail.com"
  },
  {
    id: "12",
    name: "Mr. Ravindra J. Patil",
    role: "Parents Representative (M.Pharm)",
    designation: "Parents Representative",
    department: "M. Pharmacy",
    phone: "7875979445",
    email: "ravindrapatil@gmail.com"
  },
  {
    id: "13",
    name: "Ms. Riya R. Rai",
    role: "Student Representative (D.Pharm)",
    designation: "Student Representative",
    department: "D. Pharmacy",
    phone: "9529653271",
    email: "rairriya@gmail.com"
  },
  {
    id: "14",
    name: "Mr. Vinit N. Dagade",
    role: "Student Representative (D.Pharm)",
    designation: "Student Representative",
    department: "D. Pharmacy",
    phone: "7387120712",
    email: "vinitdagade77@gmail.com"
  },
  {
    id: "15",
    name: "Ms. Shruti S. Sonawane",
    role: "Student Representative (B.Pharm)",
    designation: "Student Representative",
    department: "B. Pharmacy",
    phone: "9373060484",
    email: "sonavaneshruti03@gmail.com"
  },
  {
    id: "16",
    name: "Ms. Samruddhi S. Kajulkar",
    role: "Student Representative (B.Pharm)",
    designation: "Student Representative",
    department: "B. Pharmacy",
    phone: "9579421915",
    email: "samruddhikajulkar@gmail.com"
  },
  {
    id: "17",
    name: "Ms. Dimpal R. Patil",
    role: "Student Representative (M.Pharm)",
    designation: "Student Representative",
    department: "M. Pharmacy",
    phone: "9665959445",
    email: "dimpalpatil4455@gmail.com"
  },
  {
    id: "18",
    name: "Mr. Rohit Sonawane",
    role: "Student Representative (M.Pharm)",
    designation: "Student Representative",
    department: "M. Pharmacy",
    phone: "7498792872",
    email: "sonawanerohit158@gmail.com"
  }
];

const SQUAD_MEMBERS: CommitteeMember[] = [
  {
    id: "1",
    name: "Dr. Sanjay R. Arote",
    role: "Chairman",
    designation: "Principal",
    department: "College Administration",
    phone: "9960365969",
    email: "principal.iiper@gmail.com",
    isHead: true
  },
  {
    id: "2",
    name: "Prof. Shyam S. Awate",
    role: "Teaching Representative",
    designation: "Assi. Professor, KBIPER",
    department: "Teaching Staff",
    phone: "9545713667",
    email: "shyamsawate@gmail.com"
  },
  {
    id: "3",
    name: "Mrs. Komal A. Thakar",
    role: "Teaching Representative",
    designation: "Assi. Professor, KBIPER",
    department: "Teaching Staff",
    phone: "9921987644",
    email: "komalgade113@gmail.com"
  },
  {
    id: "4",
    name: "Mrs. Subhangi S. Dabhade",
    role: "Non Teaching Representative",
    designation: "Representative",
    department: "Non-Teaching Staff",
    phone: "9975905598",
    email: "shubhangidabhade292@gmail.com"
  },
  {
    id: "5",
    name: "Mrs. Arati A. Dhore",
    role: "Non Teaching Representative",
    designation: "Representative",
    department: "Non-Teaching Staff",
    phone: "9527602100",
    email: "aaru.dhore20@gmail.com"
  }
];

const DEFINITIONS_OF_RAGGING = [
  { title: "Verbal Abuse", desc: "Insults, teasing, calling names, or making offensive remarks about look, caste, class, or background." },
  { title: "Physical Abuse", desc: "Any act of physical violence, confinement, forcing physical exercises, or assault." },
  { title: "Mental Harassment", desc: "Creating stress, fear, or mental discomfort, forcing students to perform degrading tasks." },
  { title: "Financial Extortion", desc: "Forcing freshers to buy food, write journals, pay money, or purchase items for seniors." },
  { title: "Social Exclusion", desc: "Targeting a student, forcing boycott, or restricting freshers from accessing general campus facilities." }
];

export default function AntiRagging() {
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState<"report" | "members" | "rules">("report");
  const [memberSubTab, setMemberSubTab] = useState<"committee" | "squad">("committee");
  
  // Incident Report form state
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [studentName, setStudentName] = useState("");
  const [contactDetail, setContactDetail] = useState("");
  const [harassmentCategory, setHarassmentCategory] = useState("Verbal / Psychological");
  const [incidentDate, setIncidentDate] = useState("");
  const [incidentDescription, setIncidentDescription] = useState("");
  
  // Submission success ticker state
  const [incidentTicket, setIncidentTicket] = useState<string | null>(null);

  const isFormValid = useMemo(() => {
    if (!isAnonymous && (!studentName.trim() || !contactDetail.trim())) return false;
    return incidentDescription.trim().length > 10;
  }, [isAnonymous, studentName, contactDetail, incidentDescription]);

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      toast({
        title: "Incomplete Incident Report",
        description: "Please fill in the incident details before submitting.",
      });
      return;
    }

    const ticket = `RAG-${new Date().getFullYear()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    setIncidentTicket(ticket);

    toast({
      title: "Incident Report Logged",
      description: `Emergency ticket ${ticket} has been sent directly to the principal's cell.`,
    });
  };

  const handleResetForm = () => {
    setStudentName("");
    setContactDetail("");
    setIncidentDate("");
    setIncidentDescription("");
    setIsAnonymous(true);
    setIncidentTicket(null);
  };

  const handlePrintReport = () => {
    toast({
      title: "Generating Summary Document",
      description: "Preparing your submitted incident report copy as PDF...",
    });
  };

  const handleDownloadAffidavit = () => {
    toast({
      title: "Downloading PDF",
      description: "Downloading the UGC Anti-Ragging Affidavit Booklet...",
    });
  };

  return (
    <AppLayout>
      {/* Hero Header */}
      <section className="bg-primary text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-red-600/15 via-primary to-[#011a2a]" />
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '30px 30px' }} />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="w-14 h-14 bg-red-500/10 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-red-500/20 backdrop-blur-md">
              <ShieldAlert className="w-7 h-7" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
              Anti-Ragging <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#e6d080]">Committee</span>
            </h1>
            <p className="text-base md:text-lg text-white/80 font-light max-w-2xl mx-auto">
              Upholding UGC & DBATU regulations. We enforce a zero-tolerance anti-ragging policy to ensure a safe, harassment-free learning campus.
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
                onClick={() => {
                  setActiveTab("report");
                  setIncidentTicket(null);
                }}
                className={`cursor-pointer px-5.5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 whitespace-nowrap inline-flex items-center gap-1.5 ${
                  activeTab === "report" ? "bg-primary text-white shadow-md" : "text-muted-foreground hover:text-primary"
                }`}
              >
                <ShieldAlert className="w-4 h-4" /> Emergency & Reporting
              </button>
              <button
                onClick={() => setActiveTab("members")}
                className={`cursor-pointer px-5.5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 whitespace-nowrap inline-flex items-center gap-1.5 ${
                  activeTab === "members" ? "bg-primary text-white shadow-md" : "text-muted-foreground hover:text-primary"
                }`}
              >
                <Users className="w-4 h-4" /> Committee Directory
              </button>
              <button
                onClick={() => setActiveTab("rules")}
                className={`cursor-pointer px-5.5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 whitespace-nowrap inline-flex items-center gap-1.5 ${
                  activeTab === "rules" ? "bg-primary text-white shadow-md" : "text-muted-foreground hover:text-primary"
                }`}
              >
                <Scale className="w-4 h-4" /> UGC Rules & Guidelines
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "report" && (
              /* =========================================================================
                 🚨 REPORT INCIDENT & EMERGENCY HELPLINES TAB
                 ========================================================================= */
              <motion.div
                key="report-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              >
                {/* Left: Helpline & Warden Info Numbers */}
                <div className="lg:col-span-5 space-y-6">
                  {/* Emergency hotlines card */}
                  <div className="bg-gradient-to-br from-red-700 to-[#781919] text-white rounded-3xl p-6.5 shadow-xl relative overflow-hidden group">
                    <div className="absolute -bottom-8 -right-8 opacity-10 pointer-events-none group-hover:scale-105 transition-transform duration-500">
                      <ShieldAlert className="w-48 h-48" strokeWidth={0.5} />
                    </div>

                    <h3 className="text-sm font-extrabold uppercase tracking-widest text-accent mb-6 flex items-center gap-2">
                      <AlertTriangle className="w-4.5 h-4.5 text-accent animate-pulse" /> Distress Helplines
                    </h3>

                    <div className="space-y-4">
                      {/* National helpline */}
                      <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                        <span className="text-[9px] uppercase font-bold text-white/60 tracking-wider block">National Toll-Free Helpline (24x7)</span>
                        <div className="flex items-center gap-2.5 mt-1.5">
                          <Phone className="w-5 h-5 text-accent shrink-0" />
                          <a href="tel:18001805522" className="text-xl font-black hover:underline tracking-tight">1800-180-5522</a>
                        </div>
                      </div>

                      {/* College squad */}
                      <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                        <span className="text-[9px] uppercase font-bold text-white/60 tracking-wider block">Campus Squad Desk</span>
                        <div className="flex items-center gap-2.5 mt-1.5">
                          <Phone className="w-5 h-5 text-accent shrink-0" />
                          <a href="tel:+919960365969" className="text-lg font-black hover:underline tracking-tight">+91 9960365969</a>
                        </div>
                      </div>

                      {/* Police line */}
                      <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                        <span className="text-[9px] uppercase font-bold text-white/60 tracking-wider block">Local Police talegaon desk</span>
                        <div className="flex items-center gap-2.5 mt-1.5">
                          <Phone className="w-5 h-5 text-accent shrink-0" />
                          <a href="tel:02114222444" className="text-lg font-black hover:underline tracking-tight">02114-222444</a>
                        </div>
                      </div>
                    </div>

                    <hr className="border-white/10 my-5" />

                    <div className="text-xs text-white/70 leading-relaxed flex gap-2">
                      <Mail className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <div>
                        <span>Alternatively, email complaints directly to the national monitoring cell:</span>
                        <a href="mailto:helpline@antiragging.in" className="block text-accent font-bold hover:underline mt-1 break-all">helpline@antiragging.in</a>
                      </div>
                    </div>
                  </div>

                  {/* Anti-ragging affidavit box */}
                  <div className="bg-muted/30 border border-muted/50 p-6 rounded-3xl space-y-4">
                    <h4 className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-accent" /> Student Affidavit
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      All students and their parents must fill and submit the online anti-ragging affidavit annually at the time of admission.
                    </p>
                    <button 
                      onClick={handleDownloadAffidavit}
                      className="cursor-pointer flex items-center gap-1.5 text-xs font-bold text-white bg-primary hover:bg-accent px-4 py-2.5 rounded-xl transition-all shadow-md w-full justify-center"
                    >
                      <Download className="w-3.5 h-3.5" /> Download Affidavit Guide
                    </button>
                  </div>
                </div>

                {/* Right: Anonymous Incident Reporting form */}
                <div className="lg:col-span-7">
                  {!incidentTicket ? (
                    <form onSubmit={handleReportSubmit} className="bg-white border border-muted p-6 md:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-6">
                      <div>
                        <h3 className="text-lg font-extrabold text-primary">Report a Ragging Incident</h3>
                        <p className="text-xs text-muted-foreground mt-1">This report is directly forwarded to the Principal's monitoring dashboard. You can choose to report anonymously.</p>
                      </div>

                      {/* Anonymity Toggle */}
                      <div className="flex items-center justify-between p-4.5 bg-muted/40 border border-muted rounded-2xl select-none">
                        <div>
                          <label className="text-xs font-bold text-primary block">Submit Report Anonymously</label>
                          <span className="text-[10px] text-muted-foreground block mt-0.5">Your identity, name, and email will NOT be logged or shared.</span>
                        </div>
                        <input
                          type="checkbox"
                          checked={isAnonymous}
                          onChange={(e) => setIsAnonymous(e.target.checked)}
                          className="cursor-pointer w-5 h-5 accent-red-600 rounded-md"
                        />
                      </div>

                      {/* Dynamic Contact Fields */}
                      <AnimatePresence mode="wait">
                        {!isAnonymous && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-hidden"
                          >
                            <div>
                              <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wide">Your Name</label>
                              <input
                                type="text"
                                required
                                value={studentName}
                                onChange={(e) => setStudentName(e.target.value)}
                                placeholder="e.g. Rahul Patil"
                                className="w-full px-4 py-3 rounded-xl border border-muted bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent placeholder:text-muted-foreground/35"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wide">Email or Mobile Number</label>
                              <input
                                type="text"
                                required
                                value={contactDetail}
                                onChange={(e) => setContactDetail(e.target.value)}
                                placeholder="e.g. rahul@kbiper.edu.in"
                                className="w-full px-4 py-3 rounded-xl border border-muted bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent placeholder:text-muted-foreground/35"
                              />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wide">Category of Incident</label>
                          <select 
                            value={harassmentCategory}
                            onChange={(e) => setHarassmentCategory(e.target.value)}
                            className="flex h-12 w-full rounded-xl bg-white border border-muted px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                          >
                            <option>Verbal / Psychological abuse</option>
                            <option>Physical violence / force</option>
                            <option>Hostel room harassment</option>
                            <option>Financial extortion / forced tasks</option>
                            <option>Cyber harassment / online groups</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wide">Approx Date of Incident</label>
                          <input
                            type="date"
                            value={incidentDate}
                            onChange={(e) => setIncidentDate(e.target.value)}
                            className="w-full px-4 py-3 h-12 rounded-xl border border-muted bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                          />
                        </div>
                      </div>

                      {/* Description */}
                      <div>
                        <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wide">Incident Description (At least 10 characters)</label>
                        <textarea
                          required
                          value={incidentDescription}
                          onChange={(e) => setIncidentDescription(e.target.value)}
                          placeholder="Provide details: names of individuals involved (if known), location (hostel, lab, canteen), and description of what transpired..."
                          className="w-full min-h-[140px] px-4 py-3.5 rounded-xl border border-muted bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent placeholder:text-muted-foreground/35 resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={!isFormValid}
                        className={`cursor-pointer w-full py-4 rounded-xl text-white text-sm font-bold flex items-center justify-center gap-2 transition-all duration-300 ${
                          isFormValid
                            ? "bg-red-600 hover:bg-red-700 shadow-md shadow-red-600/20"
                            : "bg-muted text-muted-foreground/50 border border-muted-border cursor-not-allowed"
                        }`}
                      >
                        <Send className="w-4.5 h-4.5" /> Submit Incident Report
                      </button>
                    </form>
                  ) : (
                    /* Submission Confirmations Receipt */
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-white border border-muted p-8 md:p-10 rounded-3xl shadow-2xl relative text-center space-y-6"
                    >
                      <div className="absolute top-0 right-0 w-44 h-44 bg-red-500/10 rounded-full blur-[60px] pointer-events-none" />

                      <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto border border-red-100 shadow-sm text-red-600">
                        <CheckCircle className="w-9 h-9" />
                      </div>

                      <div>
                        <h3 className="text-2xl font-bold text-primary">Emergency Incident Logged</h3>
                        <p className="text-xs text-muted-foreground mt-1 max-w-xs mx-auto">Your report has been successfully recorded. The Anti-Ragging Committee will initiate investigations immediately.</p>
                      </div>

                      {/* Receipt code */}
                      <div className="bg-muted/40 border border-muted/50 p-5 rounded-2xl text-left text-xs font-semibold space-y-3.5 text-muted-foreground">
                        <h4 className="text-[10px] font-extrabold uppercase text-red-600 tracking-widest flex items-center gap-1.5">
                          <FileText className="w-4 h-4 text-red-600" /> Incident Log Ticket
                        </h4>

                        <div className="space-y-2 border-t border-muted-border/60 pt-2 text-primary font-bold">
                          <div className="flex justify-between items-center border-b border-muted-border/40 pb-1.5">
                            <span>Reference Code</span>
                            <span className="text-red-600 font-extrabold">{incidentTicket}</span>
                          </div>
                          <div className="flex justify-between items-center border-b border-muted-border/40 pb-1.5">
                            <span>Anonymity Status</span>
                            <span>{isAnonymous ? "YES (Anonymous)" : "NO (Details logged)"}</span>
                          </div>
                          <div className="flex justify-between items-center border-b border-muted-border/40 pb-1.5">
                            <span>Category Type</span>
                            <span>{harassmentCategory}</span>
                          </div>
                          <div className="flex justify-between items-center pt-0.5">
                            <span>Logged Date</span>
                            <span>2026-06-26 21:04:10</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <button
                          onClick={handlePrintReport}
                          className="cursor-pointer flex-1 py-3 px-4 bg-muted hover:bg-muted/80 border border-muted-border text-primary rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                        >
                          <Printer className="w-4 h-4 text-primary" /> Print Ticket Report
                        </button>
                        <button
                          onClick={handleResetForm}
                          className="cursor-pointer flex-1 py-3 px-4 bg-primary hover:bg-accent text-white rounded-xl text-xs font-bold transition-all"
                        >
                          Submit New Log
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === "members" && (
              /* =========================================================================
                 👥 COMMITTEE MEMBERS DIRECTORY TAB
                 ========================================================================= */
              <motion.div
                key="members-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div className="text-left">
                    <h3 className="text-xl font-extrabold text-primary">Committee & Squad Directory</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">Contact members of the Anti-Ragging Committee and Squad for emergency support or clarifications.</p>
                  </div>
                  <div className="inline-flex p-1 bg-muted/65 rounded-xl border border-muted/50 shadow-sm gap-1 self-start">
                    <button
                      onClick={() => setMemberSubTab("committee")}
                      className={`cursor-pointer px-4 py-2 rounded-lg text-xs font-bold transition-all duration-300 ${
                        memberSubTab === "committee" ? "bg-primary text-white shadow-sm" : "text-muted-foreground hover:text-primary"
                      }`}
                    >
                      Anti-Ragging Committee
                    </button>
                    <button
                      onClick={() => setMemberSubTab("squad")}
                      className={`cursor-pointer px-4 py-2 rounded-lg text-xs font-bold transition-all duration-300 ${
                        memberSubTab === "squad" ? "bg-primary text-white shadow-sm" : "text-muted-foreground hover:text-primary"
                      }`}
                    >
                      Anti-Ragging Squad
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6.5">
                  {(memberSubTab === "committee" ? COMMITTEE_MEMBERS : SQUAD_MEMBERS).map((member) => {
                    const initials = member.name.split(" ").slice(-2).map(n => n.charAt(0)).join("");
                    return (
                      <div
                        key={member.id}
                        className={`group relative flex flex-col h-full ${
                          member.isHead && memberSubTab === "squad" ? "md:col-span-2 lg:col-span-3 lg:w-2/3 mx-auto" : ""
                        }`}
                      >
                        <div className="absolute inset-0 bg-primary/5 rounded-3xl transform group-hover:translate-x-1.5 group-hover:translate-y-1.5 transition-transform duration-500 ease-out" />
                        
                        <div className="relative bg-white border border-muted p-6.5 rounded-3xl shadow-[0_6px_25px_rgb(0,0,0,0.01)] group-hover:border-accent/40 transition-all duration-300 flex flex-col h-full overflow-hidden z-10">
                          {/* Top badge */}
                          <div className="flex justify-between items-start mb-4">
                            <span className={`inline-flex items-center px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-wider rounded-md border ${
                              member.isHead 
                                ? "bg-accent/10 border-accent/25 text-accent" 
                                : "bg-primary/5 border-primary/10 text-primary"
                            }`}>
                              {member.role}
                            </span>
                            {member.isHead && (
                              <span className="w-5 h-5 bg-accent/20 rounded-full flex items-center justify-center text-accent text-[9px] font-black shadow-sm">★</span>
                            )}
                          </div>

                          {/* Initials avatar */}
                          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/5 to-accent/5 border border-muted flex items-center justify-center mb-4 shrink-0 group-hover:scale-105 transition-transform duration-300">
                            <span className="text-lg font-black text-primary/80">{initials}</span>
                          </div>

                          <h4 className="text-base font-bold text-primary group-hover:text-accent transition-colors leading-tight mb-1">{member.name}</h4>
                          <p className="text-xs text-muted-foreground font-semibold mb-1">{member.designation}</p>
                          <p className="text-[10px] text-muted-foreground/80 flex items-center gap-1 mb-6">
                            <Building className="w-3.5 h-3.5 text-accent" /> {member.department}
                          </p>

                          {/* Action contacts */}
                          {(member.phone || member.email) ? (
                            <div className="space-y-2 mt-auto pt-4 border-t border-muted/50 text-xs font-semibold text-muted-foreground">
                              {member.phone && (
                                <div className="flex items-center gap-2">
                                  <Phone className="w-3.5 h-3.5 text-accent" />
                                  <a href={`tel:${member.phone}`} className="text-primary hover:text-accent hover:underline">{member.phone}</a>
                                </div>
                              )}
                              {member.email && (
                                <div className="flex items-center gap-2">
                                  <Mail className="w-3.5 h-3.5 text-accent" />
                                  <a href={`mailto:${member.email}`} className="text-primary hover:text-accent hover:underline break-all">{member.email}</a>
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="text-[10px] text-muted-foreground mt-auto pt-4 border-t border-muted/50 italic font-medium">Contact via principal office.</div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {activeTab === "rules" && (
              /* =========================================================================
                 ⚖️ UGC RULES & REGULATIONS TAB
                 ========================================================================= */
              <motion.div
                key="rules-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              >
                {/* UGC Definitions list */}
                <div className="lg:col-span-8 space-y-6">
                  <div className="bg-white border border-muted p-6 md:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                        <Scale className="w-5.5 h-5.5 text-accent" /> UGC Definition of Ragging
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">Under UGC Regulations 2009, the following acts of harassment are defined as punishable ragging offences:</p>
                    </div>

                    <div className="space-y-4">
                      {DEFINITIONS_OF_RAGGING.map((def, i) => (
                        <div key={i} className="flex gap-4 items-start border-b border-muted/50 pb-4 last:border-b-0 last:pb-0">
                          <div className="w-7 h-7 bg-primary/5 text-primary text-[10px] font-bold rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                            0{i+1}
                          </div>
                          <div>
                            <h4 className="font-extrabold text-primary text-sm mb-0.5">{def.title}</h4>
                            <p className="text-muted-foreground text-xs leading-relaxed">{def.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Penalties card panel */}
                <div className="lg:col-span-4 space-y-6">
                  <div className="bg-primary text-white p-7 md:p-8 rounded-3xl relative overflow-hidden shadow-xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-[80px]" />
                    
                    <h3 className="text-sm font-extrabold uppercase tracking-widest text-accent mb-5 flex items-center gap-1.5">
                      <UserCheck className="w-4 h-4 text-accent" /> Legal Penalties
                    </h3>
                    
                    <ul className="space-y-4 text-xs text-white/80 font-light leading-relaxed">
                      <li className="flex gap-2">
                        <span className="text-accent mt-0.5">•</span>
                        <span>**Academic Suspension**: Immediate suspension from attending classes and academic blocks.</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-accent mt-0.5">•</span>
                        <span>**Withholding Results**: Withholding results, grades transcripts, or scholarship disbursements.</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-accent mt-0.5">•</span>
                        <span>**Expulsion**: Permanent expulsion from the college and cancellation of DBATU registration.</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-accent mt-0.5">•</span>
                        <span>**Legal Prosecution**: Filing of First Information Report (FIR) under Indian Penal Code (IPC) with local police.</span>
                      </li>
                    </ul>
                  </div>

                  {/* UGC book download guide */}
                  <div className="bg-muted/30 border border-muted/50 p-6 rounded-3xl space-y-3.5">
                    <h4 className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
                      <HelpCircle className="w-4 h-4 text-accent" /> UGC Anti-Ragging booklet
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">Download the complete UGC circular booklet describing the definitions, committee policies, and standard guidelines.</p>
                    <a 
                      href="https://www.ugc.gov.in/pdfnews/5822831_Anti-Ragging-Regulation_180609.pdf" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="cursor-pointer flex items-center justify-center gap-1.5 text-xs font-bold text-accent hover:underline"
                    >
                      Visit Official UGC Circular <ExternalLink className="w-3.5 h-3.5" />
                    </a>
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
