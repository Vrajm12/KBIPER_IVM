import { AppLayout } from "@/components/layout/AppLayout";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail, 
  Award, 
  BookOpen, 
  GraduationCap, 
  Search, 
  X, 
  Briefcase, 
  FileText, 
  Calendar,
  Linkedin,
  ArrowRight
} from "lucide-react";
import { Link, useLocation } from "wouter";

interface FacultyMember {
  id: string;
  name: string;
  designation: string;
  department: string;
  qualification: string;
  specialization: string;
  experience: string;
  email: string;
  linkedin?: string;
  bio: string;
  publications?: string;
  patents?: string;
  projects?: string;
  isHOD?: boolean;
  isPrincipal?: boolean;
  photoUrl?: string;
}

const FACULTY_MEMBERS: FacultyMember[] = [
  {
    id: "1",
    name: "Dr. Sanjay R. Arote",
    designation: "Principal & Professor",
    department: "Administration",
    qualification: "M. Pharm, Ph.D.",
    specialization: "Novel Drug Delivery Systems (NDDS), Controlled Release Formulations, Biopharmaceutics",
    experience: "22+ Years",
    email: "principal.iiper@gmail.com",
    linkedin: "https://linkedin.com",
    bio: "Dr. Sanjay R. Arote is a visionary academician and researcher with over two decades of contribution to pharmaceutical sciences. He is committed to fostering academic excellence, high-impact research, and industry collaborations at KBIPER.",
    publications: "35+ Research Publications in National & International peer-reviewed journals",
    patents: "02 Patents filed on controlled release formulations",
    projects: "Guided 15+ Post-graduate (M.Pharm) projects and currently supervising 3 Ph.D. candidates",
    isPrincipal: true,
  },
  {
    id: "2",
    name: "Dr. Gulab S. Shinde",
    designation: "HOD & Associate Professor (D.Pharm)",
    department: "D. Pharmacy",
    qualification: "M. Pharm, Ph.D.",
    specialization: "Industrial Pharmaceutics, Quality-by-Design (QbD), Regulatory Affairs",
    experience: "15+ Years",
    email: "gulab.shinde@kbiper.edu.in",
    linkedin: "https://linkedin.com",
    bio: "Dr. Gulab Shinde leads the Diploma in Pharmacy division at KBIPER, focusing on industrial pharmaceutics foundations. He ensures the diploma curriculum is highly practical and aligned with retail and community healthcare requirements.",
    publications: "18+ Research papers, regular speaker at pharmacy research conventions",
    projects: "Successfully conducted 4 industry-sponsored quality validation audits",
    isHOD: true,
  },
  {
    id: "3",
    name: "Dr. Ganesh R. Phadtare",
    designation: "Professor",
    department: "Pharmaceutical Chemistry",
    qualification: "M. Pharm, Ph.D.",
    specialization: "Synthetic Organic Chemistry, Computer-Aided Drug Design (CADD), Spectroscopy",
    experience: "18+ Years",
    email: "ganesh.phadtare@kbiper.edu.in",
    bio: "Dr. Phadtare specializes in the design and synthesis of bioactive molecules targeting metabolic disorders. His expertise lies in molecular docking, spectroscopic analysis, and chemical process optimization.",
    publications: "25+ Publications in high-impact international journals",
    projects: "Investigating lead molecules with potential anti-diabetic activities",
    isHOD: true,
  },
  {
    id: "4",
    name: "Dr. Mayuri V. Gurav",
    designation: "Associate Professor",
    department: "Pharmacognosy",
    qualification: "M. Pharm, Ph.D.",
    specialization: "Phytochemistry, Herbal Drug Formulations, Plant Tissue Culture",
    experience: "12+ Years",
    email: "mayuri.gurav@kbiper.edu.in",
    bio: "Dr. Mayuri Gurav is dedicated to exploring traditional Indian medicine systems. Her research centers on extracting, isolating, and standardizing bioactive phytoconstituents for modern therapeutic applications.",
    publications: "15+ Publications, co-author of a textbook on Pharmacognosy",
    projects: "Received research grant for extraction of local medicinal flora of Maval region",
    isHOD: false,
  },
  {
    id: "5",
    name: "Dr. Yogesh B. Zambare",
    designation: "Associate Professor",
    department: "Pharmacology",
    qualification: "M. Pharm, Ph.D.",
    specialization: "Neuropharmacology, Behavioral Toxicology, Cardiovascular Screening",
    experience: "13+ Years",
    email: "yogesh.zambare@kbiper.edu.in",
    bio: "Dr. Yogesh Zambare leads the pharmacology department and oversees the institutional CPCSEA animal house facility. His research explores target receptors in neurodegenerative diseases like Alzheimer's and Parkinson's.",
    publications: "20+ Research and review articles in indexed journals",
    projects: "Collaborating with local hospitals for clinical research safety evaluations",
    isHOD: true,
  },
  {
    id: "6",
    name: "Prof. Kadambari S. Ghatpande",
    designation: "Assistant Professor",
    department: "Quality Assurance",
    qualification: "M. Pharm",
    specialization: "Analytical Method Validation, HPLC Method Development, cGMP Compliance",
    experience: "8+ Years",
    email: "kadambari.ghatpande@kbiper.edu.in",
    bio: "Ms. Kadambari Ghatpande has extensive experience training students on advanced analytical instruments, including HPLC and UV-Vis spectrophotometers. She conducts regular workshops on laboratory safety and compliance.",
    publications: "10+ Research papers in national pharmaceutical journals",
    isHOD: false,
  },
  {
    id: "7",
    name: "Prof. Mugdha A. Joshi",
    designation: "Assistant Professor",
    department: "Pharmaceutical Chemistry",
    qualification: "M. Pharm",
    specialization: "Medicinal Chemistry, Quantitative Structure-Activity Relationship (QSAR)",
    experience: "7+ Years",
    email: "mugdha.joshi@kbiper.edu.in",
    bio: "Prof. Mugdha Joshi teaches organic chemistry and biochemistry. She is actively involved in guiding undergraduate students in chemistry laboratory practices and synthetic pathways.",
    publications: "06 Publications, regular participant in national seminars",
    isHOD: false,
  },
  {
    id: "8",
    name: "Prof. Shyam S. Awate",
    designation: "Assistant Professor",
    department: "Pharmaceutics",
    qualification: "M. Pharm",
    specialization: "Physical Pharmaceutics, Microencapsulation, Solubility Enhancement",
    experience: "8+ Years",
    email: "shyam.awate@kbiper.edu.in",
    bio: "Prof. Shyam Awate specializes in physical pharmaceutics and tablet manufacturing technologies. He is the academic co-ordinator for B.Pharm students, organizing seminars and guest lectures.",
    publications: "08 Research articles in peer-reviewed journals",
    isHOD: false,
  },
  {
    id: "9",
    name: "Prof. Shraddha S. Satkar",
    designation: "Assistant Professor",
    department: "Pharmacology",
    qualification: "M. Pharm",
    specialization: "Clinical Pharmacy, Pharmacovigilance, Hospital Pharmacy Training",
    experience: "6+ Years",
    email: "shraddha.satkar@kbiper.edu.in",
    bio: "Prof. Shraddha Satkar coordinates the hospital training programs for pharmacy students. She also runs the student-led Pharmacovigilance and drug safety reporting cell.",
    publications: "05 Articles in indexed pharmacy journals",
    isHOD: false,
  },
  {
    id: "10",
    name: "Mr. Mayur Kishor Lohkare",
    designation: "Lecturer (D.Pharm)",
    department: "D. Pharmacy",
    qualification: "M. Pharm",
    specialization: "Community Pharmacy, Pharmacy Practice & Laws",
    experience: "5+ Years",
    email: "mayur.lohkare@kbiper.edu.in",
    bio: "Mr. Mayur Lohkare focuses on prescription dispensing practices and drugstore management. He is highly passionate about community health education and clinical training.",
    isHOD: false,
  },
  {
    id: "11",
    name: "Ms. Ankita Vilas Berde",
    designation: "Lecturer (D.Pharm)",
    department: "D. Pharmacy",
    qualification: "M. Pharm",
    specialization: "Pharmacognosy, Natural remedies and Herbals",
    experience: "4+ Years",
    email: "ankita.berde@kbiper.edu.in",
    bio: "Ms. Ankita Berde handles natural drug study laboratories, helping diploma students understand pharmaceutical raw materials of natural origin.",
    isHOD: false,
  },
  {
    id: "12",
    name: "Ms. Sohini A. Ganguly",
    designation: "Lecturer (D.Pharm)",
    department: "D. Pharmacy",
    qualification: "M. Pharm",
    specialization: "Human Anatomy & Physiology, Biochemistry",
    experience: "3+ Years",
    email: "sohini.ganguly@kbiper.edu.in",
    bio: "Ms. Sohini Ganguly conducts fundamental biochemistry and human physiology classes, ensuring students grasp basic clinical biological sciences thoroughly.",
    isHOD: false,
  }
];

const DEPARTMENTS = [
  "All",
  "Administration",
  "Pharmaceutics",
  "Pharmaceutical Chemistry",
  "Pharmacology",
  "Pharmacognosy",
  "Quality Assurance",
  "D. Pharmacy"
];

export default function Faculty() {
  const [location] = useLocation();
  const [selectedDept, setSelectedDept] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeFaculty, setActiveFaculty] = useState<FacultyMember | null>(null);

  const filteredFaculty = useMemo(() => {
    return FACULTY_MEMBERS.filter((member) => {
      const matchesDept = selectedDept === "All" || member.department === selectedDept;
      
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !query ||
        member.name.toLowerCase().includes(query) ||
        member.designation.toLowerCase().includes(query) ||
        member.specialization.toLowerCase().includes(query) ||
        member.qualification.toLowerCase().includes(query);

      return matchesDept && matchesSearch;
    });
  }, [selectedDept, searchQuery]);

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
            Academic <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#e6d080]">Faculty</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-lg text-primary-foreground/80 max-w-2xl mx-auto font-light"
          >
            Learn from distinguished researchers, pharmaceutical scientists, and dedicated mentors guiding the next generation.
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
                placeholder="Search by name, specialization, qualification..."
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

            {/* Department Filter Pills */}
            <div className="overflow-x-auto no-scrollbar py-2">
              <div className="flex justify-start md:justify-center gap-2.5 min-w-max px-1">
                {DEPARTMENTS.map((dept) => (
                  <button
                    key={dept}
                    onClick={() => setSelectedDept(dept)}
                    className={`cursor-pointer px-5 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all duration-300 ${
                      selectedDept === dept 
                        ? "bg-accent text-white shadow-lg shadow-accent/20 scale-[1.03]" 
                        : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-primary border border-muted"
                    }`}
                  >
                    {dept}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Faculty Cards Grid */}
          <AnimatePresence mode="popLayout">
            {filteredFaculty.length > 0 ? (
              <motion.div 
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              >
                {filteredFaculty.map((faculty, idx) => {
                  const initials = faculty.name.split(" ").slice(-2).map(n => n.charAt(0)).join("");
                  return (
                    <motion.div
                      layout
                      key={faculty.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4, delay: Math.min(idx * 0.05, 0.4) }}
                      className="group relative flex flex-col h-full cursor-pointer"
                      onClick={() => setActiveFaculty(faculty)}
                    >
                      {/* Decorative Background */}
                      <div className="absolute inset-0 bg-primary/5 rounded-3xl transform group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500 ease-out" />
                      
                      {/* Main Card Content */}
                      <div className="relative flex flex-col h-full bg-white border border-muted p-6 md:p-7 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.03)] group-hover:border-accent/40 group-hover:shadow-[0_12px_40px_rgb(0,0,0,0.06)] transition-all duration-500 overflow-hidden z-10">
                        
                        {/* HOD/Principal badge */}
                        {(faculty.isPrincipal || faculty.isHOD) && (
                          <div className="absolute top-4 right-4 z-20">
                            <span className="inline-flex items-center px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-accent/10 text-accent rounded-full border border-accent/20">
                              {faculty.isPrincipal ? "Principal" : "HOD"}
                            </span>
                          </div>
                        )}

                        {/* Profile Image Initials Placeholder */}
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/5 to-accent/5 border border-muted flex items-center justify-center mb-5 shrink-0 group-hover:scale-105 transition-transform duration-300">
                          <span className="text-2xl font-black text-primary/80 tracking-wide">{initials}</span>
                        </div>

                        {/* Name and Designation */}
                        <h3 className="text-lg md:text-xl font-bold text-primary mb-1 leading-tight group-hover:text-accent transition-colors">
                          {faculty.name}
                        </h3>
                        <p className="text-xs font-semibold text-accent/90 uppercase tracking-wider mb-2">
                          {faculty.designation}
                        </p>
                        <p className="text-xs text-muted-foreground font-medium mb-5 bg-muted/60 px-3 py-1 rounded-md inline-block w-fit">
                          {faculty.department}
                        </p>

                        <div className="space-y-3.5 mt-auto pt-5 border-t border-muted/50">
                          <div className="flex items-center gap-3 text-muted-foreground text-xs md:text-sm">
                            <GraduationCap className="w-4 h-4 text-primary shrink-0" />
                            <span className="font-medium truncate">{faculty.qualification}</span>
                          </div>

                          <div className="flex items-center gap-3 text-muted-foreground text-xs md:text-sm">
                            <Briefcase className="w-4 h-4 text-primary shrink-0" />
                            <span className="font-medium">{faculty.experience} Experience</span>
                          </div>
                        </div>

                        <div className="mt-5 flex items-center gap-1.5 text-accent text-xs font-bold group-hover:translate-x-1.5 transition-transform duration-300">
                          View details <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            ) : (
              <div className="text-center py-20 bg-muted/10 rounded-3xl border border-dashed border-muted max-w-xl mx-auto">
                <div className="w-16 h-16 bg-muted/60 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="w-8 h-8 text-muted-foreground/60" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-1">No faculty found</h3>
                <p className="text-muted-foreground text-sm">We couldn't find any matches. Try refiltering or searching for something else.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Profile Details Modal */}
      <AnimatePresence>
        {activeFaculty && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveFaculty(null)}
              className="absolute inset-0 bg-primary/40 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-muted overflow-hidden z-10 max-h-[85vh] flex flex-col"
            >
              {/* Header block with close button */}
              <div className="p-6 md:p-8 bg-gradient-to-r from-primary to-[#0e354e] text-white flex justify-between items-start shrink-0">
                <div>
                  <span className="inline-block px-3 py-1 bg-white/10 text-accent font-bold text-[10px] uppercase tracking-wider rounded-full mb-3 border border-white/10">
                    {activeFaculty.department}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{activeFaculty.name}</h2>
                  <p className="text-sm font-semibold text-white/80 mt-1">{activeFaculty.designation}</p>
                </div>
                <button
                  onClick={() => setActiveFaculty(null)}
                  className="cursor-pointer p-2 rounded-full hover:bg-white/15 text-white/80 hover:text-white transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Scrollable details */}
              <div className="p-6 md:p-8 overflow-y-auto space-y-6 flex-1 text-sm md:text-base">
                
                {/* Brief bio / intro */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-accent uppercase tracking-wider">Biography</h4>
                  <p className="text-muted-foreground leading-relaxed italic">{activeFaculty.bio}</p>
                </div>

                <hr className="border-muted" />

                {/* Grid stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex gap-3">
                    <div className="w-9 h-9 rounded-xl bg-primary/5 flex items-center justify-center shrink-0">
                      <GraduationCap className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Qualification</p>
                      <p className="font-semibold text-primary">{activeFaculty.qualification}</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-9 h-9 rounded-xl bg-primary/5 flex items-center justify-center shrink-0">
                      <Calendar className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Total Experience</p>
                      <p className="font-semibold text-primary">{activeFaculty.experience}</p>
                    </div>
                  </div>
                </div>

                <hr className="border-muted" />

                {/* Specialization */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-accent">
                    <Award className="w-4.5 h-4.5 shrink-0" />
                    <h4 className="text-xs font-bold uppercase tracking-wider">Key Specializations</h4>
                  </div>
                  <p className="text-primary font-medium pl-6.5">{activeFaculty.specialization}</p>
                </div>

                {/* Optional items (Publications, Patents, Projects) */}
                {(activeFaculty.publications || activeFaculty.patents || activeFaculty.projects) && (
                  <>
                    <hr className="border-muted" />
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-accent">
                        <BookOpen className="w-4.5 h-4.5 shrink-0" />
                        <h4 className="text-xs font-bold uppercase tracking-wider">Academic & Research Contributions</h4>
                      </div>
                      
                      <div className="pl-6.5 space-y-3">
                        {activeFaculty.publications && (
                          <div>
                            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-0.5">Publications</span>
                            <p className="text-primary text-sm font-medium">{activeFaculty.publications}</p>
                          </div>
                        )}
                        {activeFaculty.patents && (
                          <div>
                            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-0.5">Patents</span>
                            <p className="text-primary text-sm font-medium">{activeFaculty.patents}</p>
                          </div>
                        )}
                        {activeFaculty.projects && (
                          <div>
                            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-0.5">Projects Guided</span>
                            <p className="text-primary text-sm font-medium">{activeFaculty.projects}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}

                <hr className="border-muted" />

                {/* Contact and Links */}
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center pt-2">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Mail className="w-5 h-5 text-accent" />
                    <a href={`mailto:${activeFaculty.email}`} className="text-sm font-medium text-primary hover:text-accent hover:underline">
                      {activeFaculty.email}
                    </a>
                  </div>
                  
                  {activeFaculty.linkedin && (
                    <a
                      href={activeFaculty.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer inline-flex items-center gap-2 text-xs font-bold text-white bg-primary hover:bg-accent px-4 py-2 rounded-xl transition-all duration-300"
                    >
                      <Linkedin className="w-3.5 h-3.5" /> Professional Profile
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </AppLayout>
  );
}
