import { AppLayout } from "@/components/layout/AppLayout";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Phone, 
  Mail, 
  Search, 
  X, 
  Briefcase, 
  Calendar, 
  GraduationCap, 
  User, 
  ArrowRight,
  ShieldCheck,
  FolderOpen
} from "lucide-react";
import { Link, useLocation } from "wouter";

interface StaffMember {
  id: string;
  name: string;
  role: string;
  category: "Administration" | "Laboratory Support" | "Library Services" | "Support Services";
  qualification: string;
  exp: string;
  phone: string;
  email: string;
  bio: string;
}

const staffList: StaffMember[] = [
  { 
    id: "1",
    name: "Mr. Ganesh A. Waghmode", 
    role: "Office Superintendent", 
    category: "Administration",
    qualification: "M.Com, GDC&A",
    exp: "12+ Years", 
    phone: "+91 9876543220",
    email: "ganesh.waghmode@kbiper.edu.in",
    bio: "Supervises all administrative staff, manages university affiliations, admission documentation processing, and regulatory correspondence with DTE, MSBTE, and PCI."
  },
  { 
    id: "2",
    name: "Mr. R. P. Bhegade", 
    role: "Registrar", 
    category: "Administration",
    qualification: "MBA, B.Sc.",
    exp: "15+ Years", 
    phone: "+91 9876543210",
    email: "registrar@kbiper.edu.in",
    bio: "Oversees official documentation, student transcripts, AICTE & DBATU approvals, academic records, and coordinates overall college administration."
  },
  { 
    id: "3",
    name: "Mrs. S. K. Patil", 
    role: "Chief Accountant", 
    category: "Administration",
    qualification: "M.Com, Tally Professional",
    exp: "12+ Years", 
    phone: "+91 9876543211",
    email: "accounts@kbiper.edu.in",
    bio: "Handles financial accounting, budgeting, fee collections, scholarship distributions, audits, and payroll operations."
  },
  { 
    id: "4",
    name: "Mr. A. T. Deshmukh", 
    role: "Librarian", 
    category: "Library Services",
    qualification: "M.Lib, B.Sc.",
    exp: "10+ Years", 
    phone: "+91 9876543212",
    email: "library@kbiper.edu.in",
    bio: "Manages the institutional library collection, coordinates digital cataloging (Koha/OPAC), oversees e-journals subscriptions, and manages reading room operations."
  },
  { 
    id: "5",
    name: "Mr. P. N. Kadam", 
    role: "Senior Lab Assistant", 
    category: "Laboratory Support",
    qualification: "B.Sc. (Chemistry)",
    exp: "8+ Years", 
    phone: "+91 9876543213",
    email: "prasad.kadam@kbiper.edu.in",
    bio: "Responsible for chemical stocking, preparing analytical reagents, maintenance of standard glassware, and monitoring lab safety protocols."
  },
  { 
    id: "6",
    name: "Ms. V. R. More", 
    role: "Senior Clerk", 
    category: "Administration",
    qualification: "B.A., English/Marathi Typing",
    exp: "5+ Years", 
    phone: "+91 9876543214",
    email: "admin.clerk@kbiper.edu.in",
    bio: "Manages student counter support, processing leaving certificates, bonafide certificates, and drafting daily administrative correspondence."
  },
  { 
    id: "7",
    name: "Mr. Santosh J. Kadam", 
    role: "Lab Technician", 
    category: "Laboratory Support",
    qualification: "D.Pharm",
    exp: "6+ Years", 
    phone: "+91 9876543215",
    email: "santosh.kadam@kbiper.edu.in",
    bio: "Prepares experimental setups for Pharmacology and Pharmacognosy laboratory courses. Helps in maintenance of animal models and botanical herbariums."
  },
  { 
    id: "8",
    name: "Dr. Suhas V. Kanitkar", 
    role: "Student Counsellor", 
    category: "Support Services",
    qualification: "M.A. (Psychology), Ph.D.",
    exp: "14+ Years", 
    phone: "+91 9876543216",
    email: "counsellor@kbiper.edu.in",
    bio: "Provides psychological counseling, mental wellness workshops, career path guidance, and stress relief counseling sessions for all students."
  },
  { 
    id: "9",
    name: "Mrs. Nirupa S. Kanitkar", 
    role: "Committee Co-ordinator (ICC)", 
    category: "Support Services",
    qualification: "MSW (Master of Social Work)",
    exp: "11+ Years", 
    phone: "+91 9876543217",
    email: "icc@kbiper.edu.in",
    bio: "Coordinates the Internal Complaints Committee (ICC), anti-discrimination campaigns, and drives community awareness initiatives."
  },
  { 
    id: "10",
    name: "Mr. Rahul D. Gade", 
    role: "Library Assistant", 
    category: "Library Services",
    qualification: "B.Lib",
    exp: "4+ Years", 
    phone: "+91 9876543218",
    email: "library.assistant@kbiper.edu.in",
    bio: "Handles daily book checkouts, book bank documentation, cataloging collections, and providing support at the e-library computer terminal."
  }
];

const CATEGORIES = [
  "All",
  "Administration",
  "Laboratory Support",
  "Library Services",
  "Support Services"
];

export default function FacultyNonTeaching() {
  const [location] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeStaff, setActiveStaff] = useState<StaffMember | null>(null);

  const filteredStaff = useMemo(() => {
    return staffList.filter((staff) => {
      const matchesCategory = selectedCategory === "All" || staff.category === selectedCategory;
      
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !query ||
        staff.name.toLowerCase().includes(query) ||
        staff.role.toLowerCase().includes(query) ||
        staff.qualification.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <AppLayout>
      {/* Hero Section */}
      <section className="bg-primary text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '30px 30px' }} />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight"
          >
            Non-Teaching <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#e6d080]">Staff</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-lg text-primary-foreground/80 max-w-2xl mx-auto font-light"
          >
            The administrative and technical backbone of our institute, ensuring smooth day-to-day operations and student services.
          </motion.p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-12 bg-background relative min-h-[60vh]">
        <div className="container mx-auto px-4 max-w-7xl">
          
          {/* Integrated Switcher (Teaching vs Non-Teaching) */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex p-1.5 bg-muted/80 backdrop-blur rounded-2xl border border-muted/50 shadow-[0_4px_20px_rgb(0,0,0,0.02)]">
              <Link href="/faculty">
                <button className={`cursor-pointer px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${location.startsWith('/faculty') && !location.includes('non-teaching') ? 'bg-primary text-white shadow-md' : 'text-muted-foreground hover:text-primary'}`}>
                  Teaching Staff
                </button>
              </Link>
              <Link href="/faculty-non-teaching">
                <button className={`cursor-pointer px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${location.includes('non-teaching') ? 'bg-primary text-white shadow-md' : 'text-muted-foreground hover:text-primary'}`}>
                  Non-Teaching Staff
                </button>
              </Link>
            </div>
          </div>

          {/* Search and Filters Block */}
          <div className="flex flex-col gap-6 mb-12">
            
            {/* Search Input */}
            <div className="relative max-w-md mx-auto w-full group">
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground group-focus-within:text-accent transition-colors" />
              <input
                type="text"
                placeholder="Search staff by name, role, qualification..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-10 py-3.5 rounded-2xl border border-muted bg-white text-sm shadow-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")} 
                  className="absolute right-3.5 top-3.5 p-0.5 rounded-full hover:bg-muted text-muted-foreground transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="overflow-x-auto no-scrollbar py-2">
              <div className="flex justify-start md:justify-center gap-2.5 min-w-max px-1">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`cursor-pointer px-5 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all duration-300 ${
                      selectedCategory === cat 
                        ? "bg-accent text-white shadow-lg shadow-accent/20 scale-[1.03]" 
                        : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-primary border border-muted"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Staff Cards Grid */}
          <AnimatePresence mode="popLayout">
            {filteredStaff.length > 0 ? (
              <motion.div 
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              >
                {filteredStaff.map((staff, idx) => {
                  const initials = staff.name.split(" ").slice(-2).map(n => n.charAt(0)).join("");
                  return (
                    <motion.div
                      layout
                      key={staff.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4, delay: Math.min(idx * 0.05, 0.4) }}
                      className="group relative flex flex-col h-full cursor-pointer"
                      onClick={() => setActiveStaff(staff)}
                    >
                      {/* Decorative Background Shift on Hover */}
                      <div className="absolute inset-0 bg-primary/5 rounded-3xl transform group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500 ease-out" />
                      
                      {/* Main Card Content */}
                      <div className="relative flex flex-col h-full bg-white border border-muted p-6 md:p-7 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.03)] group-hover:border-accent/40 group-hover:shadow-[0_12px_40px_rgb(0,0,0,0.06)] transition-all duration-500 overflow-hidden z-10">
                        
                        {/* Administration/Services icons */}
                        <div className="absolute top-5 right-5 text-muted-foreground/30 group-hover:text-accent/20 transition-colors pointer-events-none">
                          <User className="w-10 h-10" strokeWidth={1} />
                        </div>

                        {/* Initials Placeholder */}
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/5 to-accent/5 border border-muted flex items-center justify-center mb-5 shrink-0 group-hover:scale-105 transition-transform duration-300">
                          <span className="text-xl font-bold text-primary/80 tracking-wide">{initials}</span>
                        </div>

                        {/* Name and Designation */}
                        <h3 className="text-lg font-bold text-primary mb-1 leading-tight group-hover:text-accent transition-colors">
                          {staff.name}
                        </h3>
                        <p className="text-xs font-semibold text-accent/90 uppercase tracking-wider mb-2">
                          {staff.role}
                        </p>
                        <p className="text-[10px] text-muted-foreground font-bold mb-4 bg-muted/80 px-2.5 py-1 rounded-md inline-block w-fit">
                          {staff.category}
                        </p>

                        <div className="space-y-3 mt-auto pt-4 border-t border-muted/50">
                          <div className="flex items-center gap-2.5 text-muted-foreground text-xs md:text-sm">
                            <GraduationCap className="w-4 h-4 text-primary shrink-0" />
                            <span className="font-medium truncate">{staff.qualification}</span>
                          </div>

                          <div className="flex items-center gap-2.5 text-muted-foreground text-xs md:text-sm">
                            <Briefcase className="w-4 h-4 text-primary shrink-0" />
                            <span className="font-medium">{staff.exp} Experience</span>
                          </div>
                        </div>

                        <div className="mt-5 flex items-center gap-1.5 text-accent text-xs font-bold group-hover:translate-x-1.5 transition-transform duration-300">
                          View contact info <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            ) : (
              <div className="text-center py-20 bg-muted/10 rounded-3xl border border-dashed border-muted max-w-xl mx-auto">
                <div className="w-16 h-16 bg-muted/60 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-muted-foreground/60" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-1">No staff members found</h3>
                <p className="text-muted-foreground text-sm">No match for your search criteria. Try another keyword or filter.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Staff Contact / Bio Modal */}
      <AnimatePresence>
        {activeStaff && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveStaff(null)}
              className="absolute inset-0 bg-primary/40 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-muted overflow-hidden z-10 max-h-[80vh] flex flex-col"
            >
              {/* Header */}
              <div className="p-6 md:p-7 bg-gradient-to-r from-primary to-[#0e354e] text-white flex justify-between items-start shrink-0">
                <div>
                  <span className="inline-block px-3 py-1 bg-white/10 text-accent font-bold text-[10px] uppercase tracking-wider rounded-full mb-3 border border-white/10">
                    {activeStaff.category}
                  </span>
                  <h2 className="text-xl md:text-2xl font-bold tracking-tight">{activeStaff.name}</h2>
                  <p className="text-xs md:text-sm font-semibold text-white/80 mt-1">{activeStaff.role}</p>
                </div>
                <button
                  onClick={() => setActiveStaff(null)}
                  className="cursor-pointer p-2 rounded-full hover:bg-white/15 text-white/80 hover:text-white transition-colors"
                >
                  <X className="h-5.5 w-5.5" />
                </button>
              </div>

              {/* Body Content */}
              <div className="p-6 md:p-8 overflow-y-auto space-y-5 flex-1 text-sm">
                
                {/* Duties / Bio Description */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-accent">
                    <FolderOpen className="w-4 h-4 shrink-0" />
                    <h4 className="text-xs font-bold uppercase tracking-wider">Duties & Responsibilities</h4>
                  </div>
                  <p className="text-muted-foreground leading-relaxed pl-6">{activeStaff.bio}</p>
                </div>

                <hr className="border-muted" />

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center shrink-0">
                      <GraduationCap className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <div>
                      <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Qualification</p>
                      <p className="font-semibold text-primary text-xs md:text-sm">{activeStaff.qualification}</p>
                    </div>
                  </div>

                  <div className="flex gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center shrink-0">
                      <Calendar className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <div>
                      <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Experience</p>
                      <p className="font-semibold text-primary text-xs md:text-sm">{activeStaff.exp}</p>
                    </div>
                  </div>
                </div>

                <hr className="border-muted" />

                {/* Contact Card Details */}
                <div className="bg-muted/30 p-4.5 rounded-2xl space-y-3 border border-muted/50">
                  <h4 className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-accent" /> Institutional Contact Details
                  </h4>
                  
                  <div className="space-y-2.5 pl-5.5">
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Phone className="w-4 h-4 text-primary shrink-0" />
                      <a href={`tel:${activeStaff.phone}`} className="text-sm font-semibold text-primary hover:text-accent hover:underline">
                        {activeStaff.phone}
                      </a>
                    </div>
                    
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Mail className="w-4 h-4 text-primary shrink-0" />
                      <a href={`mailto:${activeStaff.email}`} className="text-sm font-semibold text-primary hover:text-accent hover:underline break-all">
                        {activeStaff.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </AppLayout>
  );
}
