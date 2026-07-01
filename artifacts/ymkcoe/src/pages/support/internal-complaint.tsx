import { AppLayout } from "@/components/layout/AppLayout";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, 
  Phone, 
  Mail, 
  Send, 
  FileText, 
  Download, 
  Users, 
  CheckCircle, 
  AlertCircle,
  Scale, 
  HelpCircle,
  Building,
  UserCheck,
  ChevronRight,
  Printer,
  ExternalLink,
  ShieldAlert
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

const ICC_MEMBERS: CommitteeMember[] = [
  { 
    id: "1", 
    name: "Dr. Rekha Patil", 
    role: "Presiding Officer", 
    designation: "Professor", 
    department: "Pharmacology Department", 
    phone: "+91 9876543241", 
    email: "rekha.patil@kbiper.edu.in",
    isHead: true 
  },
  { 
    id: "2", 
    name: "Dr. Sanjay R. Bhegade", 
    role: "Ex-Officio Chairman", 
    designation: "Principal", 
    department: "College Administration", 
    phone: "+91 9876543210", 
    email: "principal.kbiper@gmail.com"
  },
  { 
    id: "3", 
    name: "Prof. Anjali Jadhav", 
    role: "Coordinator & Member", 
    designation: "Assistant Professor", 
    department: "Pharmacology Department", 
    phone: "+91 9876543243", 
    email: "anjali.jadhav@kbiper.edu.in" 
  },
  { 
    id: "4", 
    name: "Mrs. Sunita Deshmukh", 
    role: "NGO Representative Member", 
    designation: "Chief Social Worker", 
    department: "Sankalp NGO & Rehabilitation", 
    phone: "+91 9876543201", 
    email: "sankalp.ngo@gmail.com" 
  },
  { 
    id: "5", 
    name: "Ms. Priyanka Kulkarni", 
    role: "Student Representative", 
    designation: "Student (Second Year M.Pharm)", 
    department: "M. Pharmacy Student Council", 
    email: "priyanka.k@student.kbiper.edu.in" 
  }
];

export default function InternalComplaint() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"lodge" | "members" | "rules">("lodge");

  // Complaint form states
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [complainantName, setComplainantName] = useState("");
  const [complainantId, setComplainantId] = useState("");
  const [contactDetail, setContactDetail] = useState("");
  const [complaintCategory, setComplaintCategory] = useState("Gender Harassment");
  const [incidentDate, setIncidentDate] = useState("");
  const [description, setDescription] = useState("");
  const [ticketId, setTicketId] = useState<string | null>(null);

  const isFormValid = useMemo(() => {
    if (!isAnonymous && (!complainantName.trim() || !contactDetail.trim())) return false;
    return description.trim().length > 10;
  }, [isAnonymous, complainantName, contactDetail, description]);

  const handleComplaintSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      toast({
        title: "Incomplete Safety Report",
        description: "Please fill out the incident details before submitting.",
      });
      return;
    }

    const ticket = `ICC-${new Date().getFullYear()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    setTicketId(ticket);

    toast({
      title: "Complaint Lodged Confidentially",
      description: `Grievance reference code ${ticket} sent directly to the Presiding Officer.`,
    });
  };

  const handleResetForm = () => {
    setComplainantName("");
    setComplainantId("");
    setContactDetail("");
    setIncidentDate("");
    setDescription("");
    setIsAnonymous(false);
    setTicketId(null);
  };

  const handlePrintComplaint = () => {
    toast({
      title: "Generating Document",
      description: "Preparing your submitted complaint receipt copy as PDF...",
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
              <ShieldAlert className="w-7 h-7" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
              Internal Complaint <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#e6d080]">Committee</span>
            </h1>
            <p className="text-base md:text-lg text-white/80 font-light max-w-2xl mx-auto">
              Constituted under the Sexual Harassment of Women at Workplace Act 2013. We guarantee a secure, equal, and harassment-free campus for female students and staff.
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
                  setActiveTab("lodge");
                  setTicketId(null);
                }}
                className={`cursor-pointer px-5.5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 whitespace-nowrap inline-flex items-center gap-1.5 ${
                  activeTab === "lodge" ? "bg-primary text-white shadow-md" : "text-muted-foreground hover:text-primary"
                }`}
              >
                <ShieldAlert className="w-4 h-4" /> Lodge a Complaint
              </button>
              <button
                onClick={() => setActiveTab("members")}
                className={`cursor-pointer px-5.5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 whitespace-nowrap inline-flex items-center gap-1.5 ${
                  activeTab === "members" ? "bg-primary text-white shadow-md" : "text-muted-foreground hover:text-primary"
                }`}
              >
                <Users className="w-4 h-4" /> ICC Committee
              </button>
              <button
                onClick={() => setActiveTab("rules")}
                className={`cursor-pointer px-5.5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 whitespace-nowrap inline-flex items-center gap-1.5 ${
                  activeTab === "rules" ? "bg-primary text-white shadow-md" : "text-muted-foreground hover:text-primary"
                }`}
              >
                <Scale className="w-4 h-4" /> Rules & Regulations
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "lodge" && (
              /* =========================================================================
                 🚨 LODGE COMPLAINT TAB
                 ========================================================================= */
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Help Desk */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="bg-gradient-to-br from-blue-900 to-[#022c45] text-white rounded-3xl p-6.5 shadow-xl relative overflow-hidden group">
                    <h3 className="text-sm font-extrabold uppercase tracking-widest text-accent mb-6 flex items-center gap-2">
                      <ShieldCheck className="w-4.5 h-4.5 text-accent animate-pulse" /> Immediate Assistance
                    </h3>

                    <div className="space-y-4">
                      {/* Presiding Officer */}
                      <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                        <span className="text-[9px] uppercase font-bold text-white/60 tracking-wider block">Presiding Officer (Dr. Rekha Patil)</span>
                        <div className="flex items-center gap-2.5 mt-1.5">
                          <Phone className="w-5 h-5 text-accent shrink-0" />
                          <a href="tel:+919876543241" className="text-lg font-black hover:underline tracking-tight">+91 9876543241</a>
                        </div>
                      </div>

                      {/* Women Helpline */}
                      <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                        <span className="text-[9px] uppercase font-bold text-white/60 tracking-wider block">National Women Helpline (24x7)</span>
                        <div className="flex items-center gap-2.5 mt-1.5">
                          <Phone className="w-5 h-5 text-accent shrink-0" />
                          <a href="tel:1091" className="text-lg font-black hover:underline tracking-tight">1091</a>
                        </div>
                      </div>
                    </div>

                    <hr className="border-white/10 my-5" />

                    <div className="text-xs text-white/70 leading-relaxed flex gap-2">
                      <Mail className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <div>
                        <span>Alternatively, email directly to the ICC monitoring desk:</span>
                        <a href="mailto:rekha.patil@kbiper.edu.in" className="block text-accent font-bold hover:underline mt-1 break-all">rekha.patil@kbiper.edu.in</a>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted/30 border border-muted/50 p-6 rounded-3xl space-y-4">
                    <h4 className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
                      <UserCheck className="w-4 h-4 text-accent" /> Absolute Confidentiality
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      All communications are handled with maximum security and care under the guidelines of POSH Act 2013 and UGC Rules. Complainants are fully protected from intimidation or bias.
                    </p>
                  </div>
                </div>

                {/* Right Form */}
                <div className="lg:col-span-7">
                  {!ticketId ? (
                    <form onSubmit={handleComplaintSubmit} className="bg-white border border-muted p-6 md:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-6">
                      <div>
                        <h3 className="text-lg font-extrabold text-primary">File a Confidential Complaint</h3>
                        <p className="text-xs text-muted-foreground mt-1">This report is forwarded to the Presiding Officer. Toggling anonymity hides identifiers from database grids.</p>
                      </div>

                      {/* Anonymity Toggle */}
                      <div className="flex items-center justify-between p-4.5 bg-muted/40 border border-muted rounded-2xl select-none">
                        <div>
                          <label className="text-xs font-bold text-primary block">Submit Report Anonymously</label>
                          <span className="text-[10px] text-muted-foreground block mt-0.5">Your name, ID, and email details will NOT be recorded.</span>
                        </div>
                        <input
                          type="checkbox"
                          checked={isAnonymous}
                          onChange={(e) => setIsAnonymous(e.target.checked)}
                          className="cursor-pointer w-5 h-5 accent-primary rounded-md"
                        />
                      </div>

                      {/* Contact fields */}
                      <AnimatePresence mode="wait">
                        {!isAnonymous && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-4 overflow-hidden"
                          >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wide">Your Name</label>
                                <input
                                  type="text"
                                  required
                                  value={complainantName}
                                  onChange={(e) => setComplainantName(e.target.value)}
                                  placeholder="e.g. Priyadarshini Joshi"
                                  className="w-full px-4 py-3 rounded-xl border border-muted bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent placeholder:text-muted-foreground/35"
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wide">Student ID / Roll No</label>
                                <input
                                  type="text"
                                  value={complainantId}
                                  onChange={(e) => setComplainantId(e.target.value)}
                                  placeholder="e.g. KB-2025-087"
                                  className="w-full px-4 py-3 rounded-xl border border-muted bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent placeholder:text-muted-foreground/35"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wide">Email or Mobile Number</label>
                              <input
                                type="text"
                                required
                                value={contactDetail}
                                onChange={(e) => setContactDetail(e.target.value)}
                                placeholder="e.g. priya.j@student.kbiper.edu.in"
                                className="w-full px-4 py-3 rounded-xl border border-muted bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent placeholder:text-muted-foreground/35"
                              />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wide">Incident Category</label>
                          <select 
                            value={complaintCategory}
                            onChange={(e) => setComplaintCategory(e.target.value)}
                            className="flex h-12 w-full rounded-xl bg-white border border-muted px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                          >
                            <option>Gender Harassment</option>
                            <option>Workplace Discrimination</option>
                            <option>Hostel Safety Issue</option>
                            <option>Stalking / Cyber-Harassment</option>
                            <option>Others</option>
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
                        <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wide">Complaint Description (At least 10 characters)</label>
                        <textarea
                          required
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder="Provide details: individuals involved, date/time, locations (laboratory, library, hostel), and description of what transpired..."
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
                        <Send className="w-4.5 h-4.5" /> Submit Complaint
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
                        <h3 className="text-2xl font-bold text-primary">Complaint Successfully Logged</h3>
                        <p className="text-xs text-muted-foreground mt-1 max-w-xs mx-auto">Your complaint is registered under statutory seals. Investigation will be initiated by the Presiding Officer.</p>
                      </div>

                      <div className="bg-muted/40 border border-muted/50 p-5 rounded-2xl text-left text-xs font-semibold space-y-3.5 text-muted-foreground">
                        <h4 className="text-[10px] font-extrabold uppercase text-red-600 tracking-widest flex items-center gap-1.5">
                          <FileText className="w-4 h-4 text-red-600" /> Complaint Log Ticket
                        </h4>

                        <div className="space-y-2 border-t border-muted-border/60 pt-2 text-primary font-bold">
                          <div className="flex justify-between items-center border-b border-muted-border/40 pb-1.5">
                            <span>Reference Code</span>
                            <span className="text-red-600 font-extrabold">{ticketId}</span>
                          </div>
                          <div className="flex justify-between items-center border-b border-muted-border/40 pb-1.5">
                            <span>Anonymity Status</span>
                            <span>{isAnonymous ? "YES (Anonymous)" : "NO (Details logged)"}</span>
                          </div>
                          <div className="flex justify-between items-center border-b border-muted-border/40 pb-1.5">
                            <span>Complaint Category</span>
                            <span>{complaintCategory}</span>
                          </div>
                          <div className="flex justify-between items-center pt-0.5">
                            <span>Logged Date</span>
                            <span>2026-06-26 21:42:30</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <button
                          onClick={handlePrintComplaint}
                          className="cursor-pointer flex-1 py-3 px-4 bg-muted hover:bg-muted/80 border border-muted-border text-primary rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                        >
                          <Printer className="w-4 h-4 text-primary" /> Print Copy
                        </button>
                        <button
                          onClick={handleResetForm}
                          className="cursor-pointer flex-1 py-3 px-4 bg-primary hover:bg-accent text-white rounded-xl text-xs font-bold transition-all"
                        >
                          Lodge New Complaint
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "members" && (
              /* =========================================================================
                 👥 COMMITTEE MEMBERS DIRECTORY TAB
                 ========================================================================= */
              <div className="space-y-6">
                <div className="text-left mb-6">
                  <h3 className="text-xl font-extrabold text-primary">ICC Committee Members</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">Contact members of the ICC for guidance, emergency complaints filing, or safety support audits.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6.5">
                  {ICC_MEMBERS.map((member) => {
                    const initials = member.name.split(" ").slice(-2).map(n => n.charAt(0)).join("");
                    return (
                      <div
                        key={member.id}
                        className={`group relative flex flex-col h-full ${
                          member.isHead ? "md:col-span-2 lg:col-span-3 lg:w-2/3 mx-auto" : ""
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
                            <div className="text-[10px] text-muted-foreground mt-auto pt-4 border-t border-muted/50 italic font-medium">Contact via Presiding Officer.</div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === "rules" && (
              /* =========================================================================
                 ⚖️ RULES & REGULATIONS TAB
                 ========================================================================= */
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* UGC Definitions list */}
                <div className="lg:col-span-8 space-y-6">
                  <div className="bg-white border border-muted p-6 md:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                        <Scale className="w-5.5 h-5.5 text-accent" /> POSH Act & UGC Safeguards
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">Constituted under the Sexual Harassment of Women at Workplace (Prevention, Prohibition, and Redressal) Act, 2013. The committee handles complaints related to:</p>
                    </div>

                    <div className="space-y-4 text-xs leading-relaxed text-muted-foreground font-medium">
                      <div className="flex gap-4 items-start border-b border-muted/50 pb-4 last:border-b-0 last:pb-0">
                        <div className="w-7 h-7 bg-primary/5 text-primary text-[10px] font-bold rounded-lg flex items-center justify-center shrink-0 mt-0.5">01</div>
                        <div>
                          <h4 className="font-extrabold text-primary text-sm mb-0.5">Physical Contact & Advances</h4>
                          <p>Any unwelcome physical contact, advances, or showing pornography/sexually explicit material without consent.</p>
                        </div>
                      </div>
                      <div className="flex gap-4 items-start border-b border-muted/50 pb-4 last:border-b-0 last:pb-0">
                        <div className="w-7 h-7 bg-primary/5 text-primary text-[10px] font-bold rounded-lg flex items-center justify-center shrink-0 mt-0.5">02</div>
                        <div>
                          <h4 className="font-extrabold text-primary text-sm mb-0.5">Demand or Request for Sexual Favors</h4>
                          <p>Any verbal or non-verbal demand for sexual favors in return for academic benefits, marks, or recommendations.</p>
                        </div>
                      </div>
                      <div className="flex gap-4 items-start border-b border-muted/50 pb-4 last:border-b-0 last:pb-0">
                        <div className="w-7 h-7 bg-primary/5 text-primary text-[10px] font-bold rounded-lg flex items-center justify-center shrink-0 mt-0.5">03</div>
                        <div>
                          <h4 className="font-extrabold text-primary text-sm mb-0.5">Sexually Colored Remarks</h4>
                          <p>Making inappropriate jokes, remarks about looks, clothing, or personal lives that cause mental harassment.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right side download */}
                <div className="lg:col-span-4 space-y-6">
                  <div className="bg-primary text-white p-7 md:p-8 rounded-3xl relative overflow-hidden shadow-xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-[80px]" />
                    <h3 className="text-sm font-extrabold uppercase tracking-widest text-accent mb-5 flex items-center gap-1.5">
                      <UserCheck className="w-4 h-4 text-accent" /> Institutional Action
                    </h3>
                    <ul className="space-y-4 text-xs text-white/80 font-light leading-relaxed">
                      <li>• <strong>Fair Hearing</strong>: Both the complainant and the respondent are given equal opportunities to present their cases.</li>
                      <li>• <strong>Filing FIR</strong>: If the act constitutes a criminal offence under IPC, the ICC assists in filing an FIR with local police.</li>
                      <li>• <strong>Disciplinary Action</strong>: Suspensions, cancellation of admissions, or termination of employment based on committee findings.</li>
                    </ul>
                  </div>

                  <div className="bg-muted/30 border border-muted/50 p-6 rounded-3xl space-y-3.5">
                    <h4 className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
                      <HelpCircle className="w-4 h-4 text-accent" /> POSH Act Guidebook
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">Download official POSH guidelines and UGC regulations handbook.</p>
                    <a 
                      href="https://www.ugc.gov.in/pdfnews/7203621_UGC_regulations-harassment.pdf" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="cursor-pointer flex items-center justify-center gap-1.5 text-xs font-bold text-accent hover:underline"
                    >
                      UGC POSH Regulations PDF <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            )}
          </AnimatePresence>

        </div>
      </section>
    </AppLayout>
  );
}
