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
  AlertCircle,
  Scale, 
  HelpCircle,
  Building,
  UserCheck,
  ChevronRight,
  Printer,
  ExternalLink,
  Search,
  Clock,
  ArrowRight,
  ShieldCheck
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

const GRIEVANCE_MEMBERS: CommitteeMember[] = [
  { 
    id: "1", 
    name: "Dr. Sanjay R. Bhegade", 
    role: "Chairman", 
    designation: "Principal & Professor", 
    department: "College Administration", 
    phone: "+91 9876543210", 
    email: "principal.kbiper@gmail.com",
    isHead: true 
  },
  { 
    id: "2", 
    name: "Dr. Rekha Patil", 
    role: "Coordinator", 
    designation: "Professor", 
    department: "Pharmacology Department", 
    phone: "+91 9876543241", 
    email: "rekha.patil@kbiper.edu.in" 
  },
  { 
    id: "3", 
    name: "Dr. Vivek Sharma", 
    role: "Member", 
    designation: "HOD & Professor", 
    department: "Pharmaceutics Department", 
    phone: "+91 9876543242", 
    email: "vivek.sharma@kbiper.edu.in" 
  },
  { 
    id: "4", 
    name: "Prof. Anjali Jadhav", 
    role: "Member", 
    designation: "Assistant Professor", 
    department: "Pharmacology Department", 
    phone: "+91 9876543243", 
    email: "anjali.jadhav@kbiper.edu.in" 
  },
  { 
    id: "5", 
    name: "Mr. Vijay Pawar", 
    role: "Member (Office Representative)", 
    designation: "Office Superintendent", 
    department: "Administrative Office", 
    phone: "+91 9876543204", 
    email: "vijay.pawar@kbiper.edu.in" 
  }
];

interface GrievanceStatus {
  ticketId: string;
  category: string;
  loggedDate: string;
  description: string;
  status: "Submitted" | "Under Review" | "Action Taken" | "Resolved";
  statusText: string;
  actionResolution?: string;
  isAnonymous: boolean;
}

// Initial mock grievances for lookup tracking
const INITIAL_GRIEVANCES: GrievanceStatus[] = [
  {
    ticketId: "GRV-2026-A1B2",
    category: "Academic",
    loggedDate: "2026-06-10",
    description: "Syllabus delay in Pharmacognosy theory lectures.",
    status: "Resolved",
    statusText: "All components resolved and verified.",
    actionResolution: "Special remedial classes scheduled. Syllabus coverage completed.",
    isAnonymous: false
  },
  {
    ticketId: "GRV-2026-X8Y9",
    category: "Amenities & Facilities",
    loggedDate: "2026-06-22",
    description: "Water cooler filter repair on the second floor.",
    status: "Under Review",
    statusText: "Currently assigned to the maintenance department.",
    actionResolution: "Work order sent to technical desk. Repair scheduled within 48 hours.",
    isAnonymous: true
  },
  {
    ticketId: "GRV-2026-Z4W5",
    category: "Administrative Services",
    loggedDate: "2026-06-25",
    description: "Library deposit refund delay.",
    status: "Submitted",
    statusText: "Acknowledged. Sent to Office Superintendent for review.",
    actionResolution: "Refund files are queued for bank clearance.",
    isAnonymous: false
  }
];

const PROCESS_STEPS = [
  {
    title: "Step 1: Receipt & Acknowledgment",
    timeframe: "Within 48 Hours",
    desc: "Grievance is securely recorded, reference ticket generated, and sent to Cell Coordinator."
  },
  {
    title: "Step 2: Scrutiny & Committee Review",
    timeframe: "Within 7 Days",
    desc: "Committee reviews case details, checks records, and calls for statements from departments."
  },
  {
    title: "Step 3: Consultation & Action Plan",
    timeframe: "Within 10 Days",
    desc: "Hearing is held with stakeholders to review solutions and structure action plans."
  },
  {
    title: "Step 4: Resolution & Closure",
    timeframe: "Within 15 Days",
    desc: "Remedial measures implemented, complainant notified, and status marked resolved."
  }
];

export default function Grievance() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"lodge" | "track" | "members" | "process">("lodge");

  // Local storage lists for dynamic ticket checks
  const [grievanceLogs, setGrievanceLogs] = useState<GrievanceStatus[]>(INITIAL_GRIEVANCES);

  // Form states
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [stakeholderRole, setStakeholderRole] = useState("Student");
  const [grievanceCategory, setGrievanceCategory] = useState("Academic");
  const [studentName, setStudentName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [contactDetail, setContactDetail] = useState("");
  const [incidentDate, setIncidentDate] = useState("");
  const [description, setDescription] = useState("");

  // Search tracker state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedTicket, setSearchedTicket] = useState<GrievanceStatus | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Form submission success receipt state
  const [newTicket, setNewTicket] = useState<GrievanceStatus | null>(null);

  const isFormValid = useMemo(() => {
    if (!isAnonymous && (!studentName.trim() || !contactDetail.trim())) return false;
    return description.trim().length > 10;
  }, [isAnonymous, studentName, contactDetail, description]);

  const handleGrievanceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      toast({
        title: "Incomplete Grievance Report",
        description: "Please write a detailed description before submitting.",
      });
      return;
    }

    const ticketCode = `GRV-2026-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    const loggedDate = new Date().toISOString().split("T")[0];

    const grievanceItem: GrievanceStatus = {
      ticketId: ticketCode,
      category: grievanceCategory,
      loggedDate,
      description,
      status: "Submitted",
      statusText: "Grievance successfully recorded and queued for review.",
      isAnonymous
    };

    // Save dynamically in local state list
    setGrievanceLogs(prev => [grievanceItem, ...prev]);
    setNewTicket(grievanceItem);

    toast({
      title: "Grievance Registered",
      description: `Grievance ticket ${ticketCode} generated successfully.`,
    });
  };

  const handleResetForm = () => {
    setStudentName("");
    setStudentId("");
    setContactDetail("");
    setIncidentDate("");
    setDescription("");
    setIsAnonymous(false);
    setNewTicket(null);
  };

  const handleTrackSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    const match = grievanceLogs.find(g => g.ticketId.trim().toUpperCase() === searchQuery.trim().toUpperCase());
    setSearchedTicket(match || null);
  };

  const handlePrintReceipt = () => {
    toast({
      title: "Generating Document",
      description: "Preparing your submitted grievance copy as PDF...",
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
              Grievance <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#e6d080]">Redressal Cell</span>
            </h1>
            <p className="text-base md:text-lg text-white/80 font-light max-w-2xl mx-auto">
              A transparent digital channel for students, parents, and staff to voice concerns. We resolve complaints promptly in a strict, confidential, and supportive manner.
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
                  setNewTicket(null);
                }}
                className={`cursor-pointer px-5.5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 whitespace-nowrap inline-flex items-center gap-1.5 ${
                  activeTab === "lodge" ? "bg-primary text-white shadow-md" : "text-muted-foreground hover:text-primary"
                }`}
              >
                <Send className="w-4 h-4" /> Lodge a Grievance
              </button>
              <button
                onClick={() => {
                  setActiveTab("track");
                  setHasSearched(false);
                  setSearchedTicket(null);
                  setSearchQuery("");
                }}
                className={`cursor-pointer px-5.5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 whitespace-nowrap inline-flex items-center gap-1.5 ${
                  activeTab === "track" ? "bg-primary text-white shadow-md" : "text-muted-foreground hover:text-primary"
                }`}
              >
                <Search className="w-4 h-4" /> Track Status
              </button>
              <button
                onClick={() => setActiveTab("members")}
                className={`cursor-pointer px-5.5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 whitespace-nowrap inline-flex items-center gap-1.5 ${
                  activeTab === "members" ? "bg-primary text-white shadow-md" : "text-muted-foreground hover:text-primary"
                }`}
              >
                <Users className="w-4 h-4" /> Cell Committee
              </button>
              <button
                onClick={() => setActiveTab("process")}
                className={`cursor-pointer px-5.5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 whitespace-nowrap inline-flex items-center gap-1.5 ${
                  activeTab === "process" ? "bg-primary text-white shadow-md" : "text-muted-foreground hover:text-primary"
                }`}
              >
                <Clock className="w-4 h-4" /> Process & FAQs
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "lodge" && (
              /* =========================================================================
                 📢 LODGE A GRIEVANCE TAB
                 ========================================================================= */
              <motion.div
                key="lodge-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              >
                {/* Left side: Stats */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="bg-gradient-to-br from-blue-900 to-[#022c45] text-white rounded-3xl p-6.5 shadow-xl relative overflow-hidden group">
                    <h3 className="text-sm font-extrabold uppercase tracking-widest text-accent mb-6 flex items-center gap-2">
                      <ShieldCheck className="w-4.5 h-4.5 text-accent" /> Resolution Benchmarks
                    </h3>

                    <div className="space-y-4">
                      <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                        <span className="text-[10px] uppercase font-bold text-white/60 tracking-wider block">Grievance Redressal Ratio</span>
                        <div className="text-3xl font-black text-accent mt-1 tracking-tight">98.6% Resolved</div>
                      </div>

                      <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                        <span className="text-[10px] uppercase font-bold text-white/60 tracking-wider block">Acknowledgment Time</span>
                        <div className="text-3xl font-black text-accent mt-1 tracking-tight">Within 48 Hours</div>
                      </div>

                      <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                        <span className="text-[10px] uppercase font-bold text-white/60 tracking-wider block">Average Resolution Window</span>
                        <div className="text-3xl font-black text-accent mt-1 tracking-tight">10-15 Days Max</div>
                      </div>
                    </div>

                    <hr className="border-white/10 my-5" />

                    <div className="text-xs text-white/70 leading-relaxed flex gap-2">
                      <Phone className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <div>
                        <span>For urgent concerns, contact the Cell Coordinator Dr. Rekha Patil at:</span>
                        <a href="tel:+919876543241" className="block text-accent font-bold hover:underline mt-1">+91 9876543241</a>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted/30 border border-muted/50 p-6 rounded-3xl space-y-4">
                    <h4 className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-accent" /> UGC Statutory Safe Space
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Constitution of Grievance Redressal Cell is mandated by AICTE / UGC rules. Students can submit reports with full legal protection.
                    </p>
                  </div>
                </div>

                {/* Right side: Stateful Form or Success Ticket Receipt */}
                <div className="lg:col-span-7">
                  {!newTicket ? (
                    <form onSubmit={handleGrievanceSubmit} className="bg-white border border-muted p-6 md:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-6">
                      <div>
                        <h3 className="text-lg font-extrabold text-primary">Lodge a New Grievance</h3>
                        <p className="text-xs text-muted-foreground mt-1">Fill out the incident detail fields below. Grievances are reviewed by the Cell committee.</p>
                      </div>

                      {/* Anonymity Checkbox */}
                      <div className="flex items-center justify-between p-4.5 bg-muted/40 border border-muted rounded-2xl select-none">
                        <div>
                          <label className="text-xs font-bold text-primary block">Submit Grievance Anonymously</label>
                          <span className="text-[10px] text-muted-foreground block mt-0.5">Your identity will not be logged. Retain your ticket code to track status.</span>
                        </div>
                        <input
                          type="checkbox"
                          checked={isAnonymous}
                          onChange={(e) => setIsAnonymous(e.target.checked)}
                          className="cursor-pointer w-5 h-5 accent-primary rounded-md"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wide">Your Role</label>
                          <select 
                            value={stakeholderRole}
                            onChange={(e) => setStakeholderRole(e.target.value)}
                            className="flex h-12 w-full rounded-xl bg-white border border-muted px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                          >
                            <option>Student</option>
                            <option>Parent</option>
                            <option>Faculty Member</option>
                            <option>Non-Teaching Staff</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wide">Grievance Category</label>
                          <select 
                            value={grievanceCategory}
                            onChange={(e) => setGrievanceCategory(e.target.value)}
                            className="flex h-12 w-full rounded-xl bg-white border border-muted px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                          >
                            <option>Academic (Lectures/Exams)</option>
                            <option>Administrative Services</option>
                            <option>Amenities & Facilities</option>
                            <option>Financial / Fee Issues</option>
                            <option>Other Concerns</option>
                          </select>
                        </div>
                      </div>

                      {/* Name / ID / Contact details */}
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
                                <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wide">Full Name</label>
                                <input
                                  type="text"
                                  required
                                  value={studentName}
                                  onChange={(e) => setStudentName(e.target.value)}
                                  placeholder="e.g. Amit Patil"
                                  className="w-full px-4 py-3 rounded-xl border border-muted bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent placeholder:text-muted-foreground/35"
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wide">Roll No / ID Card Number</label>
                                <input
                                  type="text"
                                  value={studentId}
                                  onChange={(e) => setStudentId(e.target.value)}
                                  placeholder="e.g. KB-2024-405"
                                  className="w-full px-4 py-3 rounded-xl border border-muted bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent placeholder:text-muted-foreground/35"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wide">Contact Email / Phone</label>
                              <input
                                type="text"
                                required
                                value={contactDetail}
                                onChange={(e) => setContactDetail(e.target.value)}
                                placeholder="e.g. amit.patil@student.kbiper.edu.in"
                                className="w-full px-4 py-3 rounded-xl border border-muted bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent placeholder:text-muted-foreground/35"
                              />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wide">Grievance Description (At least 10 characters)</label>
                        <textarea
                          required
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder="Provide details: dates, times, names of involved persons, department or hostel wing, and details of the complaint..."
                          className="w-full min-h-[140px] px-4 py-3.5 rounded-xl border border-muted bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent placeholder:text-muted-foreground/35 resize-none"
                        />
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
                        <Send className="w-4.5 h-4.5" /> Submit Grievance
                      </button>
                    </form>
                  ) : (
                    /* Submission Confirmations Receipt */
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
                        <h3 className="text-2xl font-bold text-primary">Grievance Logged</h3>
                        <p className="text-xs text-muted-foreground mt-1 max-w-xs mx-auto">Your grievance has been successfully submitted. Retain this code to track resolution progress.</p>
                      </div>

                      {/* Receipt Code layout */}
                      <div className="bg-muted/40 border border-muted/50 p-5 rounded-2xl text-left text-xs font-semibold space-y-3.5 text-muted-foreground">
                        <h4 className="text-[10px] font-extrabold uppercase text-primary tracking-widest flex items-center gap-1.5">
                          <FileText className="w-4 h-4 text-primary" /> Grievance Log Details
                        </h4>

                        <div className="space-y-2 border-t border-muted-border/60 pt-2 text-primary font-bold">
                          <div className="flex justify-between items-center border-b border-muted-border/40 pb-1.5">
                            <span>Reference Code</span>
                            <span className="text-accent font-extrabold">{newTicket.ticketId}</span>
                          </div>
                          <div className="flex justify-between items-center border-b border-muted-border/40 pb-1.5">
                            <span>Complainant Type</span>
                            <span>{isAnonymous ? "Anonymous Submission" : "Identity Logged"}</span>
                          </div>
                          <div className="flex justify-between items-center border-b border-muted-border/40 pb-1.5">
                            <span>Grievance Category</span>
                            <span>{newTicket.category}</span>
                          </div>
                          <div className="flex justify-between items-center pt-0.5">
                            <span>Logged Date</span>
                            <span>{newTicket.loggedDate}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <button
                          onClick={handlePrintReceipt}
                          className="cursor-pointer flex-1 py-3 px-4 bg-muted hover:bg-muted/80 border border-muted-border text-primary rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                        >
                          <Printer className="w-4 h-4 text-primary" /> Print Receipt Copy
                        </button>
                        <button
                          onClick={handleResetForm}
                          className="cursor-pointer flex-1 py-3 px-4 bg-primary hover:bg-accent text-white rounded-xl text-xs font-bold transition-all"
                        >
                          Lodge Another Grievance
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === "track" && (
              /* =========================================================================
                 🔍 INTERACTIVE TRACK STATUS TAB
                 ========================================================================= */
              <motion.div
                key="track-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="max-w-3xl mx-auto space-y-8"
              >
                <div className="text-center">
                  <h3 className="text-xl font-extrabold text-primary">Track Grievance Resolution</h3>
                  <p className="text-xs text-muted-foreground mt-1">Enter your unique reference ticket code (e.g., `GRV-2026-A1B2` or `GRV-2026-X8Y9`) to check timeline updates.</p>
                </div>

                <form onSubmit={handleTrackSearch} className="flex gap-3 bg-white border border-muted p-2 rounded-2xl shadow-sm">
                  <div className="relative flex-1 flex items-center pl-3">
                    <Search className="w-4.5 h-4.5 text-muted-foreground/60 absolute left-3 pointer-events-none" />
                    <input
                      type="text"
                      required
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Enter Reference Code (e.g. GRV-2026-A1B2)"
                      className="w-full pl-6.5 py-3.5 bg-transparent border-0 text-sm focus:outline-none placeholder:text-muted-foreground/35 uppercase font-bold"
                    />
                  </div>
                  <button
                    type="submit"
                    className="cursor-pointer bg-primary hover:bg-accent text-white font-bold text-xs px-6 py-3.5 rounded-xl transition-all whitespace-nowrap shadow-md"
                  >
                    Track Ticket
                  </button>
                </form>

                {/* Search result display */}
                {hasSearched && (
                  <AnimatePresence mode="wait">
                    {searchedTicket ? (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white border border-muted p-6.5 rounded-3xl shadow-sm space-y-6"
                      >
                        {/* Summary panel */}
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-4 border-b border-muted/50">
                          <div>
                            <span className="text-[10px] text-muted-foreground font-semibold block uppercase">Reference Ticket ID</span>
                            <span className="text-base font-extrabold text-primary">{searchedTicket.ticketId}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-muted-foreground font-semibold block uppercase sm:text-right">Category / Date Logged</span>
                            <span className="text-xs font-bold text-primary block sm:text-right">{searchedTicket.category} • {searchedTicket.loggedDate}</span>
                          </div>
                          <div>
                            <span className={`inline-flex px-3 py-1 text-[10px] font-black uppercase rounded-full border ${
                              searchedTicket.status === "Resolved" 
                                ? "bg-green-50 border-green-200 text-green-700" 
                                : searchedTicket.status === "Action Taken"
                                ? "bg-blue-50 border-blue-200 text-blue-700"
                                : searchedTicket.status === "Under Review"
                                ? "bg-amber-50 border-amber-200 text-amber-700"
                                : "bg-neutral-50 border-neutral-200 text-neutral-600"
                            }`}>
                              ● {searchedTicket.status}
                            </span>
                          </div>
                        </div>

                        {/* Interactive Timeline Layout */}
                        <div className="py-4">
                          <h4 className="text-[10px] font-extrabold text-primary uppercase tracking-wider mb-8">Resolution Timeline Progress</h4>
                          
                          <div className="relative flex flex-col md:flex-row md:justify-between items-start md:items-center gap-8 md:gap-4">
                            {/* Horizontal connector line */}
                            <div className="absolute top-3 left-3 md:left-0 right-0 h-full md:h-0.5 bg-muted-border/40 pointer-events-none md:block hidden" />

                            {[
                              { label: "Submitted", statusVal: "Submitted", desc: "Ticket issued & queued" },
                              { label: "Under Review", statusVal: "Under Review", desc: "Assigned to committee desk" },
                              { label: "Action Taken", statusVal: "Action Taken", desc: "Department notified" },
                              { label: "Resolved", statusVal: "Resolved", desc: "Grievance closed" }
                            ].map((step, idx) => {
                              const statuses = ["Submitted", "Under Review", "Action Taken", "Resolved"];
                              const currentIdx = statuses.indexOf(searchedTicket.status);
                              const stepIdx = statuses.indexOf(step.statusVal);

                              const isCompleted = stepIdx <= currentIdx;
                              const isActive = stepIdx === currentIdx;

                              return (
                                <div key={idx} className="relative z-10 flex md:flex-col items-center gap-4 md:gap-2.5 md:text-center md:flex-1">
                                  {/* Step Circle indicator */}
                                  <div className={`w-7 h-7 rounded-full flex items-center justify-center border font-bold text-xs transition-colors shrink-0 ${
                                    isCompleted 
                                      ? "bg-primary border-primary text-white" 
                                      : "bg-white border-muted-border text-muted-foreground"
                                  } ${isActive ? "ring-4 ring-accent/30 ring-offset-2" : ""}`}>
                                    {isCompleted ? "✓" : idx + 1}
                                  </div>
                                  <div>
                                    <h5 className={`text-xs font-bold leading-tight ${isCompleted ? "text-primary" : "text-muted-foreground"}`}>{step.label}</h5>
                                    <p className="text-[9px] text-muted-foreground mt-0.5 max-w-[130px] md:mx-auto leading-normal">{step.desc}</p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Description & Action remarks */}
                        <div className="bg-muted/40 border border-muted p-4.5 rounded-2xl space-y-3.5 text-xs">
                          <div>
                            <span className="text-[9px] uppercase font-bold text-muted-foreground tracking-wider block mb-0.5">Submitted Grievance Description:</span>
                            <p className="text-primary font-medium italic">"{searchedTicket.description}"</p>
                          </div>

                          {searchedTicket.actionResolution && (
                            <div className="pt-3 border-t border-muted-border/60">
                              <span className="text-[9px] uppercase font-bold text-accent tracking-wider block mb-0.5">Official Cell Action / Resolution Remarks:</span>
                              <p className="text-primary font-bold">{searchedTicket.actionResolution}</p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white border border-muted p-10 rounded-3xl text-center space-y-4"
                      >
                        <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto border border-red-100">
                          <AlertCircle className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="text-base font-bold text-primary">Ticket Not Found</h4>
                          <p className="text-xs text-muted-foreground mt-1 max-w-xs mx-auto">No logged grievance matching ticket code <strong>"{searchQuery}"</strong> was found. Double check character entries.</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </motion.div>
            )}

            {activeTab === "members" && (
              /* =========================================================================
                 👥 CELL COMMITTEE DIRECTORY TAB
                 ========================================================================= */
              <motion.div
                key="members-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6"
              >
                <div className="text-left mb-6">
                  <h3 className="text-xl font-extrabold text-primary">Grievance Committee</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">Reach out to these cell officials for dispute resolution, general consulting, or emergency complaints review.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6.5">
                  {GRIEVANCE_MEMBERS.map((member) => {
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
                            <div className="text-[10px] text-muted-foreground mt-auto pt-4 border-t border-muted/50 italic font-medium">Contact via principal desk.</div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {activeTab === "process" && (
              /* =========================================================================
                 ⚙️ PROCESS & FAQS TAB
                 ========================================================================= */
              <motion.div
                key="process-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              >
                {/* Process timeline layout */}
                <div className="lg:col-span-8 space-y-6">
                  <div className="bg-white border border-muted p-6 md:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                        <Clock className="w-5.5 h-5.5 text-accent" /> Cell Redressal Process
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">A transparent workflow ensures structured investigations and resolution schedules within 15 working days:</p>
                    </div>

                    <div className="space-y-4">
                      {PROCESS_STEPS.map((step, i) => (
                        <div key={i} className="flex gap-4 items-start border-b border-muted/50 pb-4 last:border-b-0 last:pb-0">
                          <div className="w-7 h-7 bg-primary/5 text-primary text-[10px] font-bold rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                            0{i+1}
                          </div>
                          <div>
                            <div className="flex flex-wrap items-center gap-2 mb-0.5">
                              <h4 className="font-extrabold text-primary text-sm">{step.title}</h4>
                              <span className="px-2 py-0.5 bg-accent/15 text-accent text-[9px] font-extrabold rounded border border-accent/25 uppercase">{step.timeframe}</span>
                            </div>
                            <p className="text-muted-foreground text-xs leading-relaxed">{step.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right sidebar: AICTE circular download */}
                <div className="lg:col-span-4 space-y-6">
                  <div className="bg-primary text-white p-7 md:p-8 rounded-3xl relative overflow-hidden shadow-xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-[80px]" />
                    
                    <h3 className="text-sm font-extrabold uppercase tracking-widest text-accent mb-5 flex items-center gap-1.5">
                      <UserCheck className="w-4 h-4 text-accent" /> Scope of Grievances
                    </h3>
                    
                    <ul className="space-y-4 text-xs text-white/80 font-light leading-relaxed">
                      <li className="flex gap-2">
                        <span className="text-accent mt-0.5">•</span>
                        <span>**Academic Issues**: Evaluation irregularities, syllabus delay, or books availability in the central library.</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-accent mt-0.5">•</span>
                        <span>**Amenities**: Clean drinking water, food hygiene in canteen, or hostel wing maintenance.</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-accent mt-0.5">•</span>
                        <span>**Administration**: Admission delays, scholarship documentation processing, or certificates issuance.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Circular downloads */}
                  <div className="bg-muted/30 border border-muted/50 p-6 rounded-3xl space-y-3.5">
                    <h4 className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
                      <HelpCircle className="w-4 h-4 text-accent" /> Official Regulations
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">Download official circulars issued by statutory authorities outlining institutional mandates.</p>
                    <a 
                      href="https://www.aicte-india.org/apb/grievance-redressal-regulations" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="cursor-pointer flex items-center justify-center gap-1.5 text-xs font-bold text-accent hover:underline"
                    >
                      AICTE Grievance Circular <ExternalLink className="w-3.5 h-3.5" />
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
