import { AppLayout } from "@/components/layout/AppLayout";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Award, 
  Building, 
  Mail, 
  Phone, 
  Send, 
  CheckCircle,
  FileText,
  Briefcase,
  MapPin,
  Calendar,
  Globe,
  GraduationCap,
  Users
} from "lucide-react";
import { useState, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";

interface DistinguishedAlum {
  id: string;
  name: string;
  batch: string;
  degree: string;
  company: string;
  designation: string;
  location: string;
  achievement: string;
  initials: string;
}

const DISTINGUISHED_ALUMNI: DistinguishedAlum[] = [
  {
    id: "1",
    name: "Dr. Nilesh Mahajan",
    batch: "Class of 2008",
    degree: "B.Pharm",
    company: "Serum Institute of India",
    designation: "Associate Director (R&D)",
    location: "Pune, India",
    achievement: "Led research teams in novel vaccine formulations during national immunization drives.",
    initials: "NM"
  },
  {
    id: "2",
    name: "Ms. Shraddha More",
    batch: "Class of 2012",
    degree: "M.Pharm (Pharmaceutics)",
    company: "Pfizer Global Supply",
    designation: "Principal Formulation Scientist",
    location: "Mumbai, India",
    achievement: "Co-authored patents in advanced liposomal drug delivery systems.",
    initials: "SM"
  },
  {
    id: "3",
    name: "Mr. Amol Gite",
    batch: "Class of 2010",
    degree: "B.Pharm",
    company: "MediLife Care Pharmacy Chain",
    designation: "Founder & CEO",
    location: "Maharashtra, India",
    achievement: "Successfully launched and scaled a retail pharmacy network of 50+ stores across Western India.",
    initials: "AG"
  }
];

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

const ALUMNI_COMMITTEE: CommitteeMember[] = [
  { 
    id: "1", 
    name: "Dr. Sanjay R. Bhegade", 
    role: "Patron / Chairman", 
    designation: "Principal", 
    department: "College Administration", 
    phone: "+91 9876543210", 
    email: "principal.kbiper@gmail.com",
    isHead: true 
  },
  { 
    id: "2", 
    name: "Prof. Milind Gaikwad", 
    role: "Alumni Coordinator", 
    designation: "Assistant Professor", 
    department: "Pharmaceutical Chemistry", 
    phone: "+91 9876543231", 
    email: "milind.gaikwad@kbiper.edu.in" 
  },
  { 
    id: "3", 
    name: "Dr. Rekha Patil", 
    role: "Treasurer Member", 
    designation: "Professor", 
    department: "Pharmacology Department", 
    phone: "+91 9876543241", 
    email: "rekha.patil@kbiper.edu.in" 
  },
  { 
    id: "4", 
    name: "Mr. Mayur Lohkare", 
    role: "Alumni Representative President", 
    designation: "Lecturer (Alumnus)", 
    department: "Pharmacognosy", 
    phone: "+91 9876543265", 
    email: "mayur.lohkare@kbiper.edu.in" 
  }
];

export default function AlumniCommittee() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"directory" | "board" | "register">("directory");

  // Registration Form State
  const [name, setName] = useState("");
  const [batchYear, setBatchYear] = useState("");
  const [course, setCourse] = useState("B.Pharm");
  const [company, setCompany] = useState("");
  const [designation, setDesignation] = useState("");
  const [email, setEmail] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  const isFormValid = useMemo(() => {
    return name.trim().length > 2 && batchYear.trim().length > 3 && email.trim().includes("@");
  }, [name, batchYear, email]);

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      toast({
        title: "Registration Incomplete",
        description: "Please fill out required fields (Name, Batch, Email).",
      });
      return;
    }

    setIsRegistered(true);
    toast({
      title: "Alumni Registration Complete",
      description: "Welcome to the official KBIPER Alumni network!",
    });
  };

  const handleResetForm = () => {
    setName("");
    setBatchYear("");
    setCompany("");
    setDesignation("");
    setEmail("");
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
              <GraduationCap className="w-7 h-7" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
              Alumni <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#e6d080]">Committee</span>
            </h1>
            <p className="text-base md:text-lg text-white/80 font-light max-w-2xl mx-auto">
              Connecting our graduates across the globe, promoting professional networking, and assisting current students through mentors.
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
                onClick={() => setActiveTab("directory")}
                className={`cursor-pointer px-5.5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 whitespace-nowrap inline-flex items-center gap-1.5 ${
                  activeTab === "directory" ? "bg-primary text-white shadow-md" : "text-muted-foreground hover:text-primary"
                }`}
              >
                <GraduationCap className="w-4 h-4" /> Distinguished Alumni
              </button>
              <button
                onClick={() => setActiveTab("board")}
                className={`cursor-pointer px-5.5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 whitespace-nowrap inline-flex items-center gap-1.5 ${
                  activeTab === "board" ? "bg-primary text-white shadow-md" : "text-muted-foreground hover:text-primary"
                }`}
              >
                <Users className="w-4 h-4" /> Association Committee
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
                <Send className="w-4 h-4" /> Alumni Sign-Up
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "directory" && (
              /* =========================================================================
                 🎓 DISTINGUISHED ALUMNI TAB
                 ========================================================================= */
              <motion.div
                key="directory-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6"
              >
                <div className="text-left mb-6">
                  <h3 className="text-xl font-extrabold text-primary">Distinguished Alumni Registry</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">KBIPER graduates holding leadership, research, and entrepreneurial positions in global healthcare sectors.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6.5">
                  {DISTINGUISHED_ALUMNI.map((alum) => (
                    <div key={alum.id} className="group relative flex flex-col h-full">
                      <div className="absolute inset-0 bg-primary/5 rounded-3xl transform group-hover:translate-x-1.5 group-hover:translate-y-1.5 transition-transform duration-500 ease-out" />
                      
                      <div className="relative bg-white border border-muted p-6.5 rounded-3xl shadow-[0_6px_25px_rgb(0,0,0,0.01)] group-hover:border-accent/40 transition-all duration-300 flex flex-col h-full overflow-hidden z-10">
                        <div className="flex justify-between items-start mb-4">
                          <span className="inline-flex items-center px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wide rounded bg-accent/10 text-accent border border-accent/20">
                            {alum.batch}
                          </span>
                          <span className="text-[9px] text-muted-foreground font-bold flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-accent" /> {alum.location}
                          </span>
                        </div>

                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/5 to-accent/5 border border-muted flex items-center justify-center mb-4 shrink-0 group-hover:scale-105 transition-transform duration-300">
                          <span className="text-base font-black text-primary/80">{alum.initials}</span>
                        </div>

                        <h4 className="text-base font-extrabold text-primary group-hover:text-accent transition-colors leading-tight mb-1">{alum.name}</h4>
                        <p className="text-xs text-muted-foreground font-bold flex items-center gap-1 mb-1">
                          <Briefcase className="w-3.5 h-3.5 text-accent" /> {alum.designation}
                        </p>
                        <p className="text-[10px] text-muted-foreground/80 flex items-center gap-1 mb-4">
                          <Building className="w-3.5 h-3.5 text-accent" /> {alum.company} • {alum.degree}
                        </p>

                        <div className="p-3 bg-muted/40 border border-muted rounded-xl text-xs mt-auto">
                          <strong className="text-primary block mb-0.5">Key Contribution:</strong>
                          <p className="text-muted-foreground font-medium">{alum.achievement}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "board" && (
              /* =========================================================================
                 👥 ASSOCIATION COMMITTEE TAB
                 ========================================================================= */
              <motion.div
                key="board-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6.5"
              >
                {ALUMNI_COMMITTEE.map((member) => {
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
                        <div className="flex justify-between items-start mb-4">
                          <span className={`inline-flex items-center px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-wider rounded-md border ${
                            member.isHead 
                              ? "bg-accent/10 border-accent/25 text-accent" 
                              : "bg-primary/5 border-primary/10 text-primary"
                          }`}>
                            {member.role}
                          </span>
                        </div>

                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/5 to-accent/5 border border-muted flex items-center justify-center mb-4 shrink-0 group-hover:scale-105 transition-transform duration-300">
                          <span className="text-lg font-black text-primary/80">{initials}</span>
                        </div>

                        <h4 className="text-base font-bold text-primary group-hover:text-accent transition-colors leading-tight mb-1">{member.name}</h4>
                        <p className="text-xs text-muted-foreground font-semibold mb-1">{member.designation}</p>
                        <p className="text-[10px] text-muted-foreground/80 flex items-center gap-1 mb-6">
                          <Building className="w-3.5 h-3.5 text-accent" /> {member.department}
                        </p>

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
              </motion.div>
            )}

            {activeTab === "register" && (
              /* =========================================================================
                 📝 ALUMNI SIGN-UP TAB
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
                      <h3 className="text-lg font-extrabold text-primary">Join the KBIPER Alumni Network</h3>
                      <p className="text-xs text-muted-foreground mt-1">Register to keep in touch with campus updates, coordinate reunions, and mentor current pharmacy students.</p>
                    </div>

                    <div className="space-y-4 text-xs">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wide">Full Name</label>
                          <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Nilesh Mahajan"
                            className="w-full px-4 py-3 rounded-xl border border-muted bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent placeholder:text-muted-foreground/35"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wide">Graduation Year (Batch)</label>
                          <input
                            type="text"
                            required
                            value={batchYear}
                            onChange={(e) => setBatchYear(e.target.value)}
                            placeholder="e.g. 2008"
                            className="w-full px-4 py-3 rounded-xl border border-muted bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent placeholder:text-muted-foreground/35"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wide">Degree Completed</label>
                          <select 
                            value={course}
                            onChange={(e) => setCourse(e.target.value)}
                            className="flex h-12 w-full rounded-xl bg-white border border-muted px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                          >
                            <option>D.Pharm</option>
                            <option>B.Pharm</option>
                            <option>M.Pharm</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wide">Current Company / Institution</label>
                          <input
                            type="text"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            placeholder="e.g. Serum Institute"
                            className="w-full px-4 py-3 rounded-xl border border-muted bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent placeholder:text-muted-foreground/35"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wide">Current Designation</label>
                          <input
                            type="text"
                            value={designation}
                            onChange={(e) => setDesignation(e.target.value)}
                            placeholder="e.g. Associate Director"
                            className="w-full px-4 py-3 rounded-xl border border-muted bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent placeholder:text-muted-foreground/35"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wide">Email Address</label>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="e.g. nilesh.m@gmail.com"
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
                      <Send className="w-4.5 h-4.5" /> Submit Registration
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
                      <p className="text-xs text-muted-foreground mt-1 max-w-xs mx-auto">Your details have been recorded in the KBIPER Alumni registry ledger. Thank you for connecting!</p>
                    </div>

                    <button
                      onClick={handleResetForm}
                      className="cursor-pointer w-full py-3 px-4 bg-primary hover:bg-accent text-white rounded-xl text-xs font-bold transition-all"
                    >
                      New Sign-Up
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
