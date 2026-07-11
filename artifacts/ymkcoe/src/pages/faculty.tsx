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
import { useLocation } from "wouter";

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

const FACULTY_MEMBERS: FacultyMember[] = [
  {
    "id": "1",
    "name": "Dr. Sanjay R. Arote",
    "designation": "Principal",
    "department": "Pharmacology",
    "qualification": "M. Pharm",
    "specialization": "Advanced Pharmaceutical Research, Pharmacology validation",
    "experience": "8+ Years (Teaching)",
    "email": "sanjayr.arote@kbiper.edu.in",
    "bio": "Dr. Sanjay R. Arote is a dedicated Principal in the Department of Pharmacology at KBIPER, committed to academic mentoring and practical laboratory guidance.",
    "photoUrl": `${import.meta.env.BASE_URL}principal_sanjay_arote.jpg`,
    "programs": [
      "bpharm",
      "mpharm"
    ]
  },
  {
    "id": "2",
    "name": "Dr. Yogesh B. Zambare",
    "designation": "Professor",
    "department": "Pharmaceutical Chemistry, HOD",
    "qualification": "M. Pharm, Ph.D.",
    "specialization": "Neuropharmacology, Behavioral Toxicology, Cardiovascular Screening",
    "experience": "13+ Years",
    "email": "yogesh.zambare@kbiper.edu.in",
    "bio": "Dr. Yogesh Zambare leads the pharmacology department and oversees the institutional CPCSEA animal house facility. His research explores target receptors in neurodegenerative diseases like Alzheimer's and Parkinson's.",
    "publications": "20+ Research and review articles in indexed journals",
    "projects": "Collaborating with local hospitals for clinical research safety evaluations",
    "isHOD": true,
    "programs": [
      "bpharm",
      "mpharm"
    ]
  },
  {
    "id": "3",
    "name": "Dr. Amol S. Rakte",
    "designation": "Professor",
    "department": "Pharmaceutics, HOD",
    "qualification": "M. Pharm, Ph.D.",
    "specialization": "Advanced Pharmaceutical Research, Pharmaceutics validation",
    "experience": "8+ Years (Teaching)",
    "email": "amols.rakte@kbiper.edu.in",
    "bio": "Dr. Amol S. Rakte is a dedicated Professor in the Department of Pharmaceutics at KBIPER, committed to academic mentoring and practical laboratory guidance.",
    "programs": [
      "bpharm",
      "mpharm"
    ]
  },
  {
    "id": "4",
    "name": "Dr. Ganesh R. Phadtare",
    "designation": "Assoc. Professor",
    "department": "Pharmacolog , HOD",
    "qualification": "M. Pharm, Ph.D.",
    "specialization": "Synthetic Organic Chemistry, Computer-Aided Drug Design (CADD), Spectroscopy",
    "experience": "18+ Years",
    "email": "ganesh.phadtare@kbiper.edu.in",
    "bio": "Dr. Phadtare specializes in the design and synthesis of bioactive molecules targeting metabolic disorders. His expertise lies in molecular docking, spectroscopic analysis, and chemical process optimization.",
    "publications": "25+ Publications in high-impact international journals",
    "projects": "Investigating lead molecules with potential anti-diabetic activities",
    "isHOD": true,
    "programs": [
      "bpharm",
      "mpharm"
    ]
  },
  {
    "id": "5",
    "name": "Dr. Mayuri V. Gurav",
    "designation": "Assistant Professor",
    "department": "Pharmacology",
    "qualification": "M. Pharm, Ph.D.",
    "specialization": "Advanced Pharmaceutical Research, Pharmacology validation",
    "experience": "8+ Years (Teaching)",
    "email": "mayuriv.gurav@kbiper.edu.in",
    "bio": "Dr. Mayuri V. Gurav is a dedicated Assistant Professor in the Department of Pharmacology at KBIPER, committed to academic mentoring and practical laboratory guidance.",
    "programs": [
      "bpharm",
      "mpharm"
    ]
  },
  {
    "id": "6",
    "name": "Dr. Payal K. Thorat",
    "designation": "Assoc. Professor",
    "department": "Pharmaceutics",
    "qualification": "M. Pharm, Ph.D.",
    "specialization": "Advanced Pharmaceutical Research, Pharmaceutics validation",
    "experience": "8+ Years (Teaching)",
    "email": "payalk.thorat@kbiper.edu.in",
    "bio": "Dr. Payal K. Thorat is a dedicated Assoc. Professor in the Department of Pharmaceutics at KBIPER, committed to academic mentoring and practical laboratory guidance.",
    "programs": [
      "bpharm",
      "mpharm"
    ]
  },
  {
    "id": "7",
    "name": "Mr. Shyam S. Awate",
    "designation": "Assoc. Professor",
    "department": "Pharmaceutics",
    "qualification": "M. Pharm, Ph.D.",
    "specialization": "Advanced Pharmaceutical Research, Pharmaceutics validation",
    "experience": "8+ Years (Teaching)",
    "email": "shyams.awate@kbiper.edu.in",
    "bio": "Mr. Shyam S. Awate is a dedicated Assoc. Professor in the Department of Pharmaceutics at KBIPER, committed to academic mentoring and practical laboratory guidance.",
    "programs": [
      "bpharm",
      "mpharm"
    ]
  },
  {
    "id": "8",
    "name": "Ms. Mugdha A. Joshi",
    "designation": "Assoc. Professor",
    "department": "Pharmacognosy, HOD",
    "qualification": "M. Pharm, Ph.D.",
    "specialization": "Advanced Pharmaceutical Research, Pharmacognosy validation",
    "experience": "8+ Years (Teaching)",
    "email": "mugdhaa.joshi@kbiper.edu.in",
    "bio": "Ms. Mugdha A. Joshi is a dedicated Assoc. Professor in the Department of Pharmacognosy at KBIPER, committed to academic mentoring and practical laboratory guidance.",
    "programs": [
      "bpharm",
      "mpharm"
    ]
  },
  {
    "id": "9",
    "name": "Ms. Kadambari S. Ghatpande",
    "designation": "Assistant Professor",
    "department": "Pharmaceutical Chemistry",
    "qualification": "M. Pharm, Ph.D.",
    "specialization": "Advanced Pharmaceutical Research, Pharmaceutical Chemistry validation",
    "experience": "8+ Years (Teaching)",
    "email": "kadambaris.ghatpande@kbiper.edu.in",
    "bio": "Ms. Kadambari S. Ghatpande is a dedicated Assistant Professor in the Department of Pharmaceutical Chemistry at KBIPER, committed to academic mentoring and practical laboratory guidance.",
    "programs": [
      "bpharm",
      "mpharm"
    ]
  },
  {
    "id": "10",
    "name": "Ms. Priyanka A. Panmand",
    "designation": "Assistant Professor",
    "department": "Pharmaceutics",
    "qualification": "M. Pharm, Ph.D.",
    "specialization": "Advanced Pharmaceutical Research, Pharmaceutics validation",
    "experience": "8+ Years (Teaching)",
    "email": "priyankaa.panmand@kbiper.edu.in",
    "bio": "Ms. Priyanka A. Panmand is a dedicated Assistant Professor in the Department of Pharmaceutics at KBIPER, committed to academic mentoring and practical laboratory guidance.",
    "programs": [
      "bpharm",
      "mpharm"
    ]
  },
  {
    "id": "11",
    "name": "Ms. Mrinali A. Kale",
    "designation": "Assistant Professor",
    "department": "Pharmacognosy",
    "qualification": "M. Pharm, Ph.D.",
    "specialization": "Advanced Pharmaceutical Research, Pharmacognosy validation",
    "experience": "8+ Years (Teaching)",
    "email": "mrinalia.kale@kbiper.edu.in",
    "bio": "Ms. Mrinali A. Kale is a dedicated Assistant Professor in the Department of Pharmacognosy at KBIPER, committed to academic mentoring and practical laboratory guidance.",
    "programs": [
      "bpharm",
      "mpharm"
    ]
  },
  {
    "id": "12",
    "name": "Ms. Shraddha S. Satkar",
    "designation": "Assistant Professor",
    "department": "Pharmaceutical Chemistry",
    "qualification": "M. Pharm, Ph.D.",
    "specialization": "Advanced Pharmaceutical Research, Pharmaceutical Chemistry validation",
    "experience": "8+ Years (Teaching)",
    "email": "shraddhas.satkar@kbiper.edu.in",
    "bio": "Ms. Shraddha S. Satkar is a dedicated Assistant Professor in the Department of Pharmaceutical Chemistry at KBIPER, committed to academic mentoring and practical laboratory guidance.",
    "programs": [
      "bpharm",
      "mpharm"
    ]
  },
  {
    "id": "13",
    "name": "Ms. Vikranti W. Koli",
    "designation": "Assistant Professor",
    "department": "Pharmaceutics",
    "qualification": "M. Pharm, Ph.D.",
    "specialization": "Advanced Pharmaceutical Research, Pharmaceutics validation",
    "experience": "8+ Years (Teaching)",
    "email": "vikrantiw.koli@kbiper.edu.in",
    "bio": "Ms. Vikranti W. Koli is a dedicated Assistant Professor in the Department of Pharmaceutics at KBIPER, committed to academic mentoring and practical laboratory guidance.",
    "programs": [
      "bpharm",
      "mpharm"
    ]
  },
  {
    "id": "14",
    "name": "Ms. Sharda S. Kulkarni",
    "designation": "Assistant Professor",
    "department": "Pharmaceutics",
    "qualification": "M. Pharm, Ph.D.",
    "specialization": "Advanced Pharmaceutical Research, Pharmaceutics validation",
    "experience": "8+ Years (Teaching)",
    "email": "shardas.kulkarni@kbiper.edu.in",
    "bio": "Ms. Sharda S. Kulkarni is a dedicated Assistant Professor in the Department of Pharmaceutics at KBIPER, committed to academic mentoring and practical laboratory guidance.",
    "programs": [
      "bpharm",
      "mpharm"
    ]
  },
  {
    "id": "15",
    "name": "Ms. Godavari K. Brahma",
    "designation": "Assistant Professor",
    "department": "Pharmaceutics",
    "qualification": "M. Pharm, Ph.D.",
    "specialization": "Advanced Pharmaceutical Research, Pharmaceutics validation",
    "experience": "8+ Years (Teaching)",
    "email": "godavarik.brahma@kbiper.edu.in",
    "bio": "Ms. Godavari K. Brahma is a dedicated Assistant Professor in the Department of Pharmaceutics at KBIPER, committed to academic mentoring and practical laboratory guidance.",
    "programs": [
      "bpharm",
      "mpharm"
    ]
  },
  {
    "id": "16",
    "name": "Ms. Ashwini Joshi",
    "designation": "Assistant Professor",
    "department": "Pharmaceutical Chemistry",
    "qualification": "M. Pharm, Ph.D.",
    "specialization": "Advanced Pharmaceutical Research, Pharmaceutical Chemistry validation",
    "experience": "8+ Years (Teaching)",
    "email": "ashwinijoshi@kbiper.edu.in",
    "bio": "Ms. Ashwini Joshi is a dedicated Assistant Professor in the Department of Pharmaceutical Chemistry at KBIPER, committed to academic mentoring and practical laboratory guidance.",
    "programs": [
      "bpharm",
      "mpharm"
    ]
  },
  {
    "id": "17",
    "name": "Mr. Mahesh B. Gawade",
    "designation": "Assistant Professor",
    "department": "Pharmaceutical Chemistry",
    "qualification": "M. Pharm, Ph.D.",
    "specialization": "Advanced Pharmaceutical Research, Pharmaceutical Chemistry validation",
    "experience": "8+ Years (Teaching)",
    "email": "maheshb.gawade@kbiper.edu.in",
    "bio": "Mr. Mahesh B. Gawade is a dedicated Assistant Professor in the Department of Pharmaceutical Chemistry at KBIPER, committed to academic mentoring and practical laboratory guidance.",
    "programs": [
      "bpharm",
      "mpharm"
    ]
  },
  {
    "id": "18",
    "name": "Ms. Reshma B. Nehere",
    "designation": "Assistant Professor",
    "department": "Pharmacology",
    "qualification": "M. Pharm, Ph.D.",
    "specialization": "Advanced Pharmaceutical Research, Pharmacology validation",
    "experience": "8+ Years (Teaching)",
    "email": "reshmab.nehere@kbiper.edu.in",
    "bio": "Ms. Reshma B. Nehere is a dedicated Assistant Professor in the Department of Pharmacology at KBIPER, committed to academic mentoring and practical laboratory guidance.",
    "programs": [
      "bpharm",
      "mpharm"
    ]
  },
  {
    "id": "19",
    "name": "Ms. Pooja N. Sawant",
    "designation": "Assistant Professor",
    "department": "Pharmacology",
    "qualification": "M. Pharm, Ph.D.",
    "specialization": "Advanced Pharmaceutical Research, Pharmacology validation",
    "experience": "8+ Years (Teaching)",
    "email": "poojan.sawant@kbiper.edu.in",
    "bio": "Ms. Pooja N. Sawant is a dedicated Assistant Professor in the Department of Pharmacology at KBIPER, committed to academic mentoring and practical laboratory guidance.",
    "programs": [
      "bpharm",
      "mpharm"
    ]
  },
  {
    "id": "20",
    "name": "Ms. Nilam S. Patangare",
    "designation": "Assistant Professor",
    "department": "Pharmaceutics",
    "qualification": "M. Pharm, Ph.D.",
    "specialization": "Advanced Pharmaceutical Research, Pharmaceutics validation",
    "experience": "8+ Years (Teaching)",
    "email": "nilams.patangare@kbiper.edu.in",
    "bio": "Ms. Nilam S. Patangare is a dedicated Assistant Professor in the Department of Pharmaceutics at KBIPER, committed to academic mentoring and practical laboratory guidance.",
    "programs": [
      "bpharm",
      "mpharm"
    ]
  },
  {
    "id": "21",
    "name": "Ms. Rasika R. Giri",
    "designation": "Assistant Professor",
    "department": "Pharmaceutics",
    "qualification": "M. Pharm, Ph.D.",
    "specialization": "Advanced Pharmaceutical Research, Pharmaceutics validation",
    "experience": "8+ Years (Teaching)",
    "email": "rasikar.giri@kbiper.edu.in",
    "bio": "Ms. Rasika R. Giri is a dedicated Assistant Professor in the Department of Pharmaceutics at KBIPER, committed to academic mentoring and practical laboratory guidance.",
    "programs": [
      "bpharm",
      "mpharm"
    ]
  },
  {
    "id": "22",
    "name": "Ms. Vilasini R. Pandav",
    "designation": "Assistant Professor",
    "department": "Pharmacognosy",
    "qualification": "M. Pharm, Ph.D.",
    "specialization": "Advanced Pharmaceutical Research, Pharmacognosy validation",
    "experience": "8+ Years (Teaching)",
    "email": "vilasinir.pandav@kbiper.edu.in",
    "bio": "Ms. Vilasini R. Pandav is a dedicated Assistant Professor in the Department of Pharmacognosy at KBIPER, committed to academic mentoring and practical laboratory guidance.",
    "programs": [
      "bpharm",
      "mpharm"
    ]
  },
  {
    "id": "23",
    "name": "Ms. Reshma P. Dhakate",
    "designation": "Assistant Professor",
    "department": "Pharmaceutical Chemistry",
    "qualification": "M. Pharm, Ph.D.",
    "specialization": "Advanced Pharmaceutical Research, Pharmaceutical Chemistry validation",
    "experience": "8+ Years (Teaching)",
    "email": "reshmap.dhakate@kbiper.edu.in",
    "bio": "Ms. Reshma P. Dhakate is a dedicated Assistant Professor in the Department of Pharmaceutical Chemistry at KBIPER, committed to academic mentoring and practical laboratory guidance.",
    "programs": [
      "bpharm",
      "mpharm"
    ]
  },
  {
    "id": "24",
    "name": "Ms. Yogita C. Saraf",
    "designation": "Assistant Professor",
    "department": "Pharmaceutics",
    "qualification": "M. Pharm, Ph.D.",
    "specialization": "Advanced Pharmaceutical Research, Pharmaceutics validation",
    "experience": "8+ Years (Teaching)",
    "email": "yogitac.saraf@kbiper.edu.in",
    "bio": "Ms. Yogita C. Saraf is a dedicated Assistant Professor in the Department of Pharmaceutics at KBIPER, committed to academic mentoring and practical laboratory guidance.",
    "programs": [
      "bpharm",
      "mpharm"
    ]
  },
  {
    "id": "25",
    "name": "Mr. Dadagouda M. Birajdar",
    "designation": "Assistant Professor",
    "department": "Pharmaceutical Chemistry",
    "qualification": "M. Pharm, Ph.D.",
    "specialization": "Advanced Pharmaceutical Research, Pharmaceutical Chemistry validation",
    "experience": "8+ Years (Teaching)",
    "email": "dadagoudam.birajdar@kbiper.edu.in",
    "bio": "Mr. Dadagouda M. Birajdar is a dedicated Assistant Professor in the Department of Pharmaceutical Chemistry at KBIPER, committed to academic mentoring and practical laboratory guidance.",
    "programs": [
      "bpharm",
      "mpharm"
    ]
  },
  {
    "id": "26",
    "name": "Ms. Sandhya V. Patil",
    "designation": "Assistant Professor",
    "department": "Pharmacology",
    "qualification": "M. Pharm, Ph.D.",
    "specialization": "Advanced Pharmaceutical Research, Pharmacology validation",
    "experience": "8+ Years (Teaching)",
    "email": "sandhyav.patil@kbiper.edu.in",
    "bio": "Ms. Sandhya V. Patil is a dedicated Assistant Professor in the Department of Pharmacology at KBIPER, committed to academic mentoring and practical laboratory guidance.",
    "programs": [
      "bpharm",
      "mpharm"
    ]
  },
  {
    "id": "27",
    "name": "Dr. Gulab S. Shinde",
    "designation": "HOD",
    "department": "D. Pharmacy",
    "qualification": "M. Pharm",
    "specialization": "Dispensing, Drug Store & Business Management",
    "experience": "5+ Years (Teaching)",
    "email": "gulabs.shinde@kbiper.edu.in",
    "bio": "Dr. Gulab S. Shinde is a Lecturer in the D. Pharmacy division at KBIPER, focusing on retail and hospital pharmacy training.",
    "programs": [
      "dpharm"
    ]
  },
  {
    "id": "28",
    "name": "Mr. Mayur K. Lohkare",
    "designation": "Lecturer",
    "department": "D. Pharmacy",
    "qualification": "M. Pharm",
    "specialization": "Dispensing, Drug Store & Business Management",
    "experience": "5+ Years (Teaching)",
    "email": "mayurk.lohkare@kbiper.edu.in",
    "bio": "Mr. Mayur K. Lohkare is a Lecturer in the D. Pharmacy division at KBIPER, focusing on retail and hospital pharmacy training.",
    "programs": [
      "dpharm"
    ]
  },
  {
    "id": "29",
    "name": "Ms. Sohini A. Ganguly",
    "designation": "Lecturer",
    "department": "D. Pharmacy",
    "qualification": "M. Pharm",
    "specialization": "Dispensing, Drug Store & Business Management",
    "experience": "5+ Years (Teaching)",
    "email": "sohinia.ganguly@kbiper.edu.in",
    "bio": "Ms. Sohini A. Ganguly is a Lecturer in the D. Pharmacy division at KBIPER, focusing on retail and hospital pharmacy training.",
    "programs": [
      "dpharm"
    ]
  },
  {
    "id": "30",
    "name": "Ms. Ankita Vilas Berde",
    "designation": "Lecturer",
    "department": "D. Pharmacy",
    "qualification": "M. Pharm",
    "specialization": "Dispensing, Drug Store & Business Management",
    "experience": "5+ Years (Teaching)",
    "email": "ankitavilasberde@kbiper.edu.in",
    "bio": "Ms. Ankita Vilas Berde is a Lecturer in the D. Pharmacy division at KBIPER, focusing on retail and hospital pharmacy training.",
    "programs": [
      "dpharm"
    ]
  },
  {
    "id": "31",
    "name": "Ms. Komal A. Thakar",
    "designation": "Lecturer",
    "department": "D. Pharmacy",
    "qualification": "M. Pharm",
    "specialization": "Dispensing, Drug Store & Business Management",
    "experience": "5+ Years (Teaching)",
    "email": "komala.thakar@kbiper.edu.in",
    "bio": "Ms. Komal A. Thakar is a Lecturer in the D. Pharmacy division at KBIPER, focusing on retail and hospital pharmacy training.",
    "programs": [
      "dpharm"
    ]
  },
  {
    "id": "32",
    "name": "Ms. Shweta M. Mantri",
    "designation": "Lecturer",
    "department": "D. Pharmacy",
    "qualification": "M. Pharm",
    "specialization": "Dispensing, Drug Store & Business Management",
    "experience": "5+ Years (Teaching)",
    "email": "shwetam.mantri@kbiper.edu.in",
    "bio": "Ms. Shweta M. Mantri is a Lecturer in the D. Pharmacy division at KBIPER, focusing on retail and hospital pharmacy training.",
    "programs": [
      "dpharm"
    ]
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
  const [selectedDept, setSelectedDept] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeFaculty, setActiveFaculty] = useState<FacultyMember | null>(null);
  const [activeProgram, setActiveProgram] = useState<"bpharm" | "mpharm" | "dpharm">("bpharm");

  const filteredFaculty = useMemo(() => {
    return FACULTY_MEMBERS.filter((member) => {
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
  }, [activeProgram, selectedDept, searchQuery]);

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
