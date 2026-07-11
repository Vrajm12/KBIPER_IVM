import { AppLayout } from "@/components/layout/AppLayout";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldAlert, 
  Phone, 
  Mail, 
  Send, 
  FileText, 
  Users, 
  CheckCircle, 
  Scale, 
  HelpCircle,
  Building,
  UserCheck,
  Printer,
  ExternalLink,
  Search,
  Clock,
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

const STAFF_GRIEVANCE_MEMBERS: CommitteeMember[] = [
  { 
    id: "1", 
    name: "Dr. Sanjay R. Arote", 
    role: "Chairman", 
    designation: "Principal & Professor", 
    department: "College Administration", 
    phone: "9960365969", 
    email: "principal.iiper@gmail.com",
    isHead: true 
  },
  { 
    id: "2", 
    name: "Dr. Gulab S. Shinde", 
    role: "Teaching Representative", 
    designation: "HOD D. Pharmacy", 
    department: "Diploma in Pharmacy", 
    phone: "8975251496", 
    email: "shindegss@gmail.com" 
  },
  { 
    id: "3", 
    name: "Dr. Amol S. Rakte", 
    role: "Teaching Representative", 
    designation: "Professor", 
    department: "M. Pharmacy", 
    phone: "9867395656", 
    email: "amolsrakte@gmail.com" 
  },
  { 
    id: "4", 
    name: "Name Awaited", 
    role: "Member, RODTE Officer", 
    designation: "Assistant Director, RODTE Pune", 
    department: "RODTE Pune", 
    email: "ropune.org.in" 
  },
  { 
    id: "5", 
    name: "Name Awaited", 
    role: "Member, Assistant Secretary", 
    designation: "Assistant Secretary, RBTE Pune", 
    department: "RBTE Pune", 
    email: "msbt.co.in" 
  },
  { 
    id: "6", 
    name: "Name Awaited", 
    role: "Member, DBATU Officer", 
    designation: "DBATU Officer, Lonere", 
    department: "DBATU Lonere", 
    email: "dbatu.ac.in" 
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

const INITIAL_GRIEVANCES: GrievanceStatus[] = [
  {
    ticketId: "SGR-2026-T9K2",
    category: "Administrative Support",
    loggedDate: "2026-06-15",
    description: "Request for classroom audio system maintenance support.",
    status: "Resolved",
    statusText: "Maintenance complete and verified.",
    actionResolution: "Audio systems recalibrated. Back up equipment provided.",
    isAnonymous: false
  }
];

const PROCESS_STEPS = [
  {
    title: "Step 1: Receipt & Acknowledgment",
    timeframe: "Within 48 Hours",
    desc: "Grievance is securely recorded, reference ticket generated, and sent to Cell Chairman."
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

export default function StaffGrievance() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"lodge" | "track" | "members" | "process">("lodge");

  // Local storage lists for dynamic ticket checks
  const [grievanceLogs, setGrievanceLogs] = useState<GrievanceStatus[]>(INITIAL_GRIEVANCES);

  // Form states
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [staffRole, setStaffRole] = useState("Teaching");
  const [grievanceCategory, setGrievanceCategory] = useState("Academic & Infrastructure");
  const [staffName, setStaffName] = useState("");
  const [staffId, setStaffId] = useState("");
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
    if (!isAnonymous && (!staffName.trim() || !contactDetail.trim())) return false;
    return description.trim().length > 10;
  }, [isAnonymous, staffName, contactDetail, description]);

  const handleGrievanceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      toast({
        title: "Incomplete Grievance Report",
        description: "Please write a detailed description before submitting.",
      });
      return;
    }

    const ticketCode = `SGR-2026-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    const loggedDate = new Date().toISOString().split("T")[0];

    const grievanceItem: GrievanceStatus = {
      ticketId: ticketCode,
      category: grievanceCategory,
      loggedDate,
      description,
      status: "Submitted",
      statusText: "Staff grievance successfully recorded and queued for review.",
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
    setStaffName("");
    setStaffId("");
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
              Staff Grievance <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#e6d080]">Redressal Cell</span>
            </h1>
            <p className="text-base md:text-lg text-white/80 font-light max-w-2xl mx-auto">
              A transparent digital channel for teaching and non-teaching staff to voice concerns. We resolve complaints promptly in a strict, confidential, and supportive manner.
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
                        <div className="text-3xl font-black text-accent mt-1 tracking-tight">100% Addressed</div>
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
                        <span>For urgent concerns, contact the Cell Chairman Dr. Sanjay R. Arote at:</span>
                        <a href="tel:+919960365969" className="block text-accent font-bold hover:underline mt-1">+91 9960365969</a>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted/30 border border-muted/50 p-6 rounded-3xl space-y-4">
                    <h4 className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-accent" /> UGC Statutory Safe Space
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Constitution of Staff Grievance Redressal Cell is mandated by AICTE / UGC rules. Staff can submit reports with full professional protection.
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
                            value={staffRole}
                            onChange={(e) => setStaffRole(e.target.value)}
                            className="w-full px-4 py-3 h-12 rounded-xl border border-muted bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                          >
                            <option value="Teaching">Teaching Faculty</option>
                            <option value="Non-Teaching">Non-Teaching Staff</option>
                            <option value="Administrative">Administrative Officer</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wide">Grievance Category</label>
                          <select 
                            value={grievanceCategory}
                            onChange={(e) => setGrievanceCategory(e.target.value)}
                            className="w-full px-4 py-3 h-12 rounded-xl border border-muted bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                          >
                            <option value="Academic & Infrastructure">Academic & Infrastructure</option>
                            <option value="Administrative Services">Administrative Services</option>
                            <option value="Service Book & Promotion">Service Book & Promotion</option>
                            <option value="Harassment or Discrimination">Harassment or Discrimination</option>
                            <option value="Amenities & Facilities">Amenities & Facilities</option>
                            <option value="Others">Others</option>
                          </select>
                        </div>
                      </div>

                      {/* Stateful details toggles on Anonymity check */}
                      {!isAnonymous && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="grid grid-cols-1 md:grid-cols-2 gap-4"
                        >
                          <div>
                            <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wide">Full Name</label>
                            <input
                              required={!isAnonymous}
                              type="text"
                              placeholder="e.g. Dr. Ramesh Sharma"
                              value={staffName}
                              onChange={(e) => setStaffName(e.target.value)}
                              className="w-full px-4 py-3 h-12 rounded-xl border border-muted bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wide">Employee ID (Optional)</label>
                            <input
                              type="text"
                              placeholder="e.g. EMP-2026-90"
                              value={staffId}
                              onChange={(e) => setStaffId(e.target.value)}
                              className="w-full px-4 py-3 h-12 rounded-xl border border-muted bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                            />
                          </div>

                          <div className="md:col-span-2">
                            <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wide">Email or Mobile Number</label>
                            <input
                              required={!isAnonymous}
                              type="text"
                              placeholder="e.g. ramesh.sharma@gmail.com or 9876543210"
                              value={contactDetail}
                              onChange={(e) => setContactDetail(e.target.value)}
                              className="w-full px-4 py-3 h-12 rounded-xl border border-muted bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                            />
                          </div>
                        </motion.div>
                      )}

                      {/* Incident Date */}
                      <div>
                        <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wide">Incident Date (Approximate)</label>
                        <input
                          required
                          type="date"
                          value={incidentDate}
                          onChange={(e) => setIncidentDate(e.target.value)}
                          className="w-full px-4 py-3 h-12 rounded-xl border border-muted bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                      </div>

                      {/* Description */}
                      <div>
                        <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wide">Detailed Description (At least 10 characters)</label>
                        <textarea
                          required
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder="Provide details: names of individuals involved (if known), dates, locations, and descriptions of what transpired..."
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
                      <div className="absolute top-0 right-0 w-44 h-44 bg-accent/15 rounded-full blur-[60px] pointer-events-none" />

                      <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto border border-green-100 shadow-sm text-green-600">
                        <CheckCircle className="w-9 h-9" />
                      </div>

                      <div>
                        <h3 className="text-2xl font-bold text-primary">Grievance Registered Successfully</h3>
                        <p className="text-xs text-muted-foreground mt-1 max-w-xs mx-auto">Your grievance has been logged. The committee is notified and will review your file according to timelines.</p>
                      </div>

                      {/* Receipt table */}
                      <div className="bg-muted/40 border border-muted/50 p-5 rounded-2xl text-left text-xs font-semibold space-y-3.5 text-muted-foreground">
                        <h4 className="text-[10px] font-extrabold uppercase text-accent tracking-widest flex items-center gap-1.5">
                          <FileText className="w-4 h-4 text-accent" /> Grievance Receipt Info
                        </h4>

                        <div className="space-y-2 border-t border-muted-border/60 pt-2 text-primary font-bold">
                          <div className="flex justify-between items-center border-b border-muted-border/40 pb-1.5">
                            <span>Ticket ID</span>
                            <span className="text-accent font-extrabold">{newTicket.ticketId}</span>
                          </div>
                          <div className="flex justify-between items-center border-b border-muted-border/40 pb-1.5">
                            <span>Anonymity Status</span>
                            <span>{newTicket.isAnonymous ? "YES (Anonymous)" : "NO (Details logged)"}</span>
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
                          <Printer className="w-4 h-4 text-primary" /> Print Copy
                        </button>
                        <button
                          onClick={handleResetForm}
                          className="cursor-pointer flex-1 py-3 px-4 bg-primary hover:bg-accent text-white rounded-xl text-xs font-bold transition-all"
                        >
                          Lodge New Grievance
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === "track" && (
              /* =========================================================================
                 🔍 TRACK STATUS TAB
                 ========================================================================= */
              <motion.div
                key="track-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="max-w-2xl mx-auto"
              >
                <div className="bg-white border border-muted p-6 md:p-9 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] text-center space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-primary">Track Grievance Resolution</h3>
                    <p className="text-xs text-muted-foreground max-w-sm mx-auto">Enter your unique ticket ID code below to check the real-time review status of your case.</p>
                  </div>

                  <form onSubmit={handleTrackSearch} className="flex flex-col sm:flex-row gap-3">
                    <input
                      required
                      type="text"
                      placeholder="e.g. SGR-2026-T9K2"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1 px-5 h-13 rounded-2xl border border-muted bg-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-accent text-primary uppercase placeholder:text-muted-foreground/35"
                    />
                    <button
                      type="submit"
                      className="cursor-pointer h-13 px-7 bg-primary hover:bg-accent text-white rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                    >
                      <Search className="w-4 h-4" /> Search Ticket
                    </button>
                  </form>

                  {/* Search Result details */}
                  {hasSearched && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="pt-6 border-t border-muted/70 text-left"
                    >
                      {searchedTicket ? (
                        <div className="space-y-5">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-muted/30 p-4.5 rounded-2xl border border-muted/50">
                            <div>
                              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Ticket Reference</span>
                              <span className="text-sm font-extrabold text-primary">{searchedTicket.ticketId}</span>
                            </div>
                            <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide border ${
                              searchedTicket.status === "Resolved"
                                ? "bg-green-50 border-green-200/60 text-green-600"
                                : searchedTicket.status === "Action Taken"
                                ? "bg-blue-50 border-blue-200/60 text-blue-600"
                                : searchedTicket.status === "Under Review"
                                ? "bg-amber-50 border-amber-200/60 text-amber-600"
                                : "bg-muted border-muted-border/60 text-muted-foreground"
                            }`}>
                              {searchedTicket.status}
                            </span>
                          </div>

                          <div className="space-y-4 text-xs font-semibold text-muted-foreground p-1">
                            <div className="flex justify-between items-center border-b border-muted/40 pb-2">
                              <span>Log Date</span>
                              <span className="text-primary font-bold">{searchedTicket.loggedDate}</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-muted/40 pb-2">
                              <span>Incident Category</span>
                              <span className="text-primary font-bold">{searchedTicket.category}</span>
                            </div>
                            <div className="border-b border-muted/40 pb-3">
                              <span className="block text-[10px] text-muted-foreground font-bold uppercase tracking-wide mb-1">Grievance Description</span>
                              <p className="text-primary font-bold leading-relaxed">{searchedTicket.description}</p>
                            </div>
                            <div className="border-b border-muted/40 pb-3">
                              <span className="block text-[10px] text-muted-foreground font-bold uppercase tracking-wide mb-1">Current Review Status</span>
                              <p className="text-primary font-bold leading-relaxed">{searchedTicket.statusText}</p>
                            </div>
                            {searchedTicket.actionResolution && (
                              <div className="p-4 bg-green-50/50 border border-green-100 rounded-2xl text-green-700">
                                <span className="block text-[10px] font-bold uppercase tracking-wider mb-1">Action & Resolutions Taken</span>
                                <p className="font-bold leading-relaxed text-green-800">{searchedTicket.actionResolution}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-6 space-y-2">
                          <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto border border-red-100 shadow-sm">
                            <HelpCircle className="w-6 h-6" />
                          </div>
                          <h4 className="text-sm font-bold text-primary">Ticket Code Not Found</h4>
                          <p className="text-xs text-muted-foreground max-w-xs mx-auto">No ticket matches code "{searchQuery}". Please check the characters, capitalization, or verify if the complaint was successfully logged.</p>
                        </div>
                      )}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === "members" && (
              /* =========================================================================
                 👥 COMMITTEE MEMBERS DIRECTORY TAB
                 ========================================================================= */
              <div className="space-y-6">
                <div className="text-left mb-6">
                  <h3 className="text-xl font-extrabold text-primary">Staff Grievance Cell Committee Members</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">Contact members of the Staff Grievance Redressal Cell for guidance, emergency complaints filing, or support.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6.5">
                  {STAFF_GRIEVANCE_MEMBERS.map((member) => {
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
                            <div className="text-[10px] text-muted-foreground mt-auto pt-4 border-t border-muted/50 italic font-medium">Contact via Cell Chairman.</div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === "process" && (
              /* =========================================================================
                 ⚖️ PROCESS & FAQS TAB
                 ========================================================================= */
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-8 space-y-6">
                  {/* Timeline steps */}
                  <div className="bg-white border border-muted p-6 md:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-6">
                    <div>
                      <h3 className="text-lg font-bold text-primary flex items-center gap-2">
                        <Scale className="w-5.5 h-5.5 text-accent" /> Resolution Timeline Benchmark
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">Under UGC Statutory Rules, the Staff Grievance Cell reviews and addresses submissions strictly according to standard phases:</p>
                    </div>

                    <div className="space-y-6 pt-2">
                      {PROCESS_STEPS.map((step, i) => (
                        <div key={i} className="flex gap-4.5 items-start group">
                          <div className="flex flex-col items-center shrink-0">
                            <span className="w-8 h-8 rounded-xl bg-primary text-white text-xs font-black flex items-center justify-center border-2 border-primary shadow-sm">{i+1}</span>
                            {i < PROCESS_STEPS.length - 1 && <div className="w-0.5 h-12.5 bg-muted my-1" />}
                          </div>

                          <div className="space-y-1">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2">
                              <h4 className="font-extrabold text-primary text-sm leading-none">{step.title}</h4>
                              <span className="inline-flex px-2 py-0.5 bg-accent/10 border border-accent/20 rounded-md text-[9px] font-extrabold text-accent uppercase tracking-wider">{step.timeframe}</span>
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed max-w-lg font-medium">{step.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right side help panels */}
                <div className="lg:col-span-4 space-y-6">
                  <div className="bg-primary text-white p-7 md:p-8 rounded-3xl relative overflow-hidden shadow-xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-[80px]" />
                    <h3 className="text-sm font-extrabold uppercase tracking-widest text-accent mb-5 flex items-center gap-1.5">
                      <UserCheck className="w-4 h-4 text-accent" /> Fair Hearing Guarantee
                    </h3>
                    <ul className="space-y-4 text-xs text-white/80 font-light leading-relaxed">
                      <li>• <strong>Equity of Treatment</strong>: Every faculty member receives equal representation during committee evaluations.</li>
                      <li>• <strong>Appeal System</strong>: If you disagree with resolutions, appeals can be directly forwarded to the Governing Body.</li>
                    </ul>
                  </div>

                  <div className="bg-muted/30 border border-muted/50 p-6 rounded-3xl space-y-3.5">
                    <h4 className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
                      <HelpCircle className="w-4 h-4 text-accent" /> AICTE & UGC regulations
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">Download official AICTE handbook rules on staff welfare and workplace grievance definitions.</p>
                    <a 
                      href="https://www.aicte-india.org/ap/grievance.php" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="cursor-pointer flex items-center justify-center gap-1.5 text-xs font-bold text-accent hover:underline"
                    >
                      Visit AICTE Grievance Portal <ExternalLink className="w-3.5 h-3.5" />
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
