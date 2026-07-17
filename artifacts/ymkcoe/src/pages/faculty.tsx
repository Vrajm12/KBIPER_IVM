import { AppLayout } from "@/components/layout/AppLayout";
import { useState, useMemo, useEffect } from "react";
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
import { useLocation } from "wouter";
import { useGetFaculty } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";

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
  certificateUrl?: string;
  resumeUrl?: string;
  programs: ("bpharm" | "mpharm" | "dpharm")[];
}

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

function getGradientForInitials(name: string): string {
  const hash = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const gradients = [
    "from-blue-500/20 to-cyan-500/20 border-blue-200 text-blue-700",
    "from-emerald-500/20 to-teal-500/20 border-emerald-200 text-emerald-700",
    "from-purple-500/20 to-indigo-500/20 border-purple-200 text-purple-700",
    "from-amber-500/20 to-orange-500/20 border-amber-200 text-amber-700",
    "from-rose-500/20 to-pink-500/20 border-rose-200 text-rose-700"
  ];
  return gradients[hash % gradients.length];
}

export default function Faculty() {
  const [location] = useLocation();
  const [selectedDept, setSelectedDept] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeFaculty, setActiveFaculty] = useState<FacultyMember | null>(null);
  const [activeProgram, setActiveProgram] = useState<"bpharm" | "mpharm" | "dpharm">("bpharm");

  const { data: facultyData, isLoading } = useGetFaculty();
  const dbFaculty = Array.isArray(facultyData) ? facultyData : [];

  const facultyMembers = useMemo(() => {
    return dbFaculty.map((member) => {
      const programs: ("bpharm" | "mpharm" | "dpharm")[] = 
        member.department === "D. Pharmacy" 
          ? ["dpharm"] 
          : ["bpharm", "mpharm"];
          
      let parsedBio = member.bio || "";
      let publications = undefined;
      let projects = undefined;
      
      try {
        if (member.bio?.startsWith("{")) {
          const parsed = JSON.parse(member.bio);
          parsedBio = parsed.bio || "";
          publications = parsed.publications;
          projects = parsed.projects;
        }
      } catch (e) {
        // ignore
      }

      return {
        id: member.id.toString(),
        name: member.name,
        designation: member.designation,
        department: member.department,
        qualification: member.qualification || "",
        specialization: member.specialization || "",
        experience: member.experience ? `${member.experience}+ Years` : "N/A",
        email: member.email || "",
        bio: parsedBio,
        isHOD: member.isHOD,
        isPrincipal: member.designation.toLowerCase() === "principal",
        photoUrl: member.photoUrl || undefined,
        programs,
        publications,
        projects,
      };
    });
  }, [dbFaculty]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const deptParam = params.get("dept");
      if (deptParam && DEPARTMENTS.includes(deptParam)) {
        setSelectedDept(deptParam);
        
        // Find which program has this department, and switch to it if needed
        const possiblePrograms = facultyMembers.filter(
          member => member.department.includes(deptParam)
        ).flatMap(member => member.programs);
        
        if (possiblePrograms.length > 0) {
          if (!possiblePrograms.includes(activeProgram)) {
            setActiveProgram(possiblePrograms[0]);
          }
        }
      } else {
        setSelectedDept("All");
      }
    }
  }, [location, activeProgram, facultyMembers]);

  const filteredFaculty = useMemo(() => {
    return facultyMembers.filter((member) => {
      const matchesProgram = member.programs.includes(activeProgram);
      const matchesDept = selectedDept === "All" || member.department.includes(selectedDept);
      
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !query ||
        member.name.toLowerCase().includes(query) ||
        member.designation.toLowerCase().includes(query) ||
        member.specialization.toLowerCase().includes(query) ||
        member.qualification.toLowerCase().includes(query);

      return matchesProgram && matchesDept && matchesSearch;
    });
  }, [facultyMembers, activeProgram, selectedDept, searchQuery]);

  return (
    <AppLayout>
      {/* Hero Section */}
      <section className="bg-primary text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-700/15 via-primary to-[#011a2a]" />
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
          
          {/* Program Switcher (B.Pharm vs M.Pharm vs D.Pharm) */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex p-1.5 bg-muted/80 backdrop-blur rounded-2xl border border-muted/50 shadow-[0_4px_20px_rgb(0,0,0,0.02)] gap-1.5">
              {([
                { id: "bpharm", label: "B. Pharmacy Faculty" },
                { id: "mpharm", label: "M. Pharmacy Faculty" },
                { id: "dpharm", label: "D. Pharmacy Faculty" }
              ] as const).map(p => (
                <button
                  key={p.id}
                  onClick={() => {
                    setActiveProgram(p.id);
                    setSelectedDept("All");
                  }}
                  className={`cursor-pointer px-5.5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 ${
                    activeProgram === p.id 
                      ? "bg-primary text-white shadow-md" 
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Search and Filters Block */}
          <div className="flex flex-col gap-6 mb-12">
            
            {/* Search Input */}
            <div className="relative max-w-md mx-auto w-full group">
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground/45 group-focus-within:text-accent transition-colors" />
              <input
                type="text"
                placeholder="Search by name, specialization, qualification..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-10 py-3.5 rounded-2xl border border-muted bg-white text-xs font-semibold shadow-sm placeholder:text-muted-foreground/45 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300 text-primary"
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
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div key={i} className="flex flex-col bg-white border border-muted p-6 md:p-7 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.03)] h-[280px] space-y-4">
                    <Skeleton className="w-20 h-20 rounded-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                    <Skeleton className="h-3 w-1/3" />
                    <div className="border-t border-muted/50 pt-4 space-y-2 mt-auto">
                      <Skeleton className="h-3 w-full" />
                      <Skeleton className="h-3 w-2/3" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredFaculty.length > 0 ? (
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
                        {(faculty.isPrincipal || faculty.isHOD || faculty.designation.includes("HOD")) && (
                          <div className="absolute top-4 right-4 z-20">
                            <span className="inline-flex items-center px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-accent/10 text-accent rounded-full border border-accent/20">
                              {faculty.isPrincipal ? "Principal" : "HOD"}
                            </span>
                          </div>
                        )}

                        {/* Profile Image / Initials Placeholder */}
                        <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${getGradientForInitials(faculty.name)} border flex items-center justify-center mb-5 shrink-0 group-hover:scale-105 transition-transform duration-300 overflow-hidden relative shadow-sm`}>
                          <span className="text-2xl font-black tracking-wide z-0">{initials}</span>
                          {faculty.photoUrl && (
                            <img
                              src={faculty.photoUrl}
                              alt={faculty.name}
                              className="absolute inset-0 w-full h-full object-cover z-10"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                          )}
                        </div>

                        {/* Name and Designation */}
                        <h3 className="text-sm font-extrabold text-primary mb-1 leading-tight group-hover:text-accent transition-colors">
                          {faculty.name}
                        </h3>
                        <p className="text-[10px] font-bold text-accent/90 uppercase tracking-wider mb-2">
                          {faculty.designation}
                        </p>
                        <p className="text-[10px] text-muted-foreground font-medium mb-5 bg-muted/60 px-3 py-1 rounded-md inline-block w-fit">
                          {faculty.department}
                        </p>

                        <div className="space-y-3 mt-auto pt-4 border-t border-muted/50">
                          <div className="flex items-center gap-3 text-muted-foreground text-xs">
                            <GraduationCap className="w-4 h-4 text-primary shrink-0" />
                            <span className="font-medium truncate">{faculty.qualification}</span>
                          </div>

                          <div className="flex items-center gap-3 text-muted-foreground text-xs">
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
              <div className="p-6 md:p-8 bg-gradient-to-r from-primary to-[#0e354e] text-white flex justify-between items-center shrink-0">
                <div className="flex items-center gap-4">
                  {/* Circle Placeholder / Image in Modal */}
                  <div className={`w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br ${getGradientForInitials(activeFaculty.name)} border-2 border-white/10 flex items-center justify-center shrink-0 overflow-hidden relative shadow-md`}>
                    <span className="text-xl md:text-2xl font-black tracking-wide z-0">{activeFaculty.name.split(" ").slice(-2).map(n => n.charAt(0)).join("")}</span>
                    {activeFaculty.photoUrl && (
                      <img
                        src={activeFaculty.photoUrl}
                        alt={activeFaculty.name}
                        className="absolute inset-0 w-full h-full object-cover z-10"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    )}
                  </div>
                  <div>
                    <span className="inline-block px-3 py-1 bg-white/10 text-accent font-bold text-[10px] uppercase tracking-wider rounded-full mb-1.5 border border-white/10">
                      {activeFaculty.department}
                    </span>
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight leading-tight">{activeFaculty.name}</h2>
                    <p className="text-xs md:text-sm font-semibold text-white/80 mt-0.5">{activeFaculty.designation}</p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveFaculty(null)}
                  className="cursor-pointer p-2 rounded-full hover:bg-white/15 text-white/80 hover:text-white transition-colors shrink-0"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Scrollable details */}
              <div className="p-6 md:p-8 overflow-y-auto space-y-6 flex-1 text-sm">
                
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
                      <GraduationCap className="w-4.5 h-4.5 text-primary" />
                    </div>
                    <div>
                      <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Qualification</p>
                      <p className="font-semibold text-primary">{activeFaculty.qualification}</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-9 h-9 rounded-xl bg-primary/5 flex items-center justify-center shrink-0">
                      <Calendar className="w-4.5 h-4.5 text-primary" />
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

                {/* Optional contribution items (Publications, Patents, Projects) */}
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

                {/* Credentials & Documents */}
                {(activeFaculty.resumeUrl || activeFaculty.certificateUrl) && (
                  <>
                    <hr className="border-muted" />
                    <div className="space-y-3.5">
                      <div className="flex items-center gap-2 text-accent">
                        <FileText className="w-4.5 h-4.5 shrink-0" />
                        <h4 className="text-xs font-bold uppercase tracking-wider">Credentials & Documents</h4>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3 pl-0 sm:pl-6.5">
                        {activeFaculty.resumeUrl && (
                          <a
                            href={activeFaculty.resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 text-xs font-bold text-primary bg-primary/5 hover:bg-primary/10 border border-primary/20 px-4.5 py-2.5 rounded-xl transition-all duration-300"
                          >
                            <FileText className="w-4 h-4 text-primary" /> View Latest Resume (PDF)
                          </a>
                        )}
                        {activeFaculty.certificateUrl && (
                          <a
                            href={activeFaculty.certificateUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 text-xs font-bold text-primary bg-primary/5 hover:bg-primary/10 border border-primary/20 px-4.5 py-2.5 rounded-xl transition-all duration-300"
                          >
                            <Award className="w-4 h-4 text-primary" /> View Highest Qualification Certificate
                          </a>
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
