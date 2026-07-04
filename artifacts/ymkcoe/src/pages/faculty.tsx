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
  certificateUrl?: string;
  resumeUrl?: string;
}

const FACULTY_MEMBERS: FacultyMember[] = [
  {
    "id": "1",
    "name": "Dr. Sanjay R. Arote",
    "designation": "Principal & Professor",
    "department": "Administration",
    "qualification": "M. Pharm, Ph.D.",
    "specialization": "Novel Drug Delivery Systems (NDDS), Controlled Release Formulations, Biopharmaceutics",
    "experience": "22+ Years",
    "email": "principal.iiper@gmail.com",
    "linkedin": "https://linkedin.com",
    "bio": "Dr. Sanjay R. Arote is a visionary academician and researcher with over two decades of contribution to pharmaceutical sciences. He is committed to fostering academic excellence, high-impact research, and industry collaborations at KBIPER.",
    "publications": "35+ Research Publications in National & International peer-reviewed journals",
    "patents": "02 Patents filed on controlled release formulations",
    "projects": "Guided 15+ Post-graduate (M.Pharm) projects and currently supervising 3 Ph.D. candidates",
    "isPrincipal": true
},
  {
    "id": "2",
    "name": "Dr. Gulab S. Shinde",
    "designation": "HOD & Associate Professor (D.Pharm)",
    "department": "D. Pharmacy",
    "qualification": "M. Pharm, Ph.D.",
    "specialization": "Industrial Pharmaceutics, Quality-by-Design (QbD), Regulatory Affairs",
    "experience": "15+ Years",
    "email": "gulab.shinde@kbiper.edu.in",
    "linkedin": "https://linkedin.com",
    "bio": "Dr. Gulab Shinde leads the Diploma in Pharmacy division at KBIPER, focusing on industrial pharmaceutics foundations. He ensures the diploma curriculum is highly practical and aligned with retail and community healthcare requirements.",
    "publications": "18+ Research papers, regular speaker at pharmacy research conventions",
    "projects": "Successfully conducted 4 industry-sponsored quality validation audits",
    "isHOD": true
},
  {
    "id": "3",
    "name": "Dr. Ganesh R. Phadtare",
    "designation": "Professor",
    "department": "Pharmaceutical Chemistry",
    "qualification": "M. Pharm, Ph.D.",
    "specialization": "Synthetic Organic Chemistry, Computer-Aided Drug Design (CADD), Spectroscopy",
    "experience": "18+ Years",
    "email": "ganesh.phadtare@kbiper.edu.in",
    "bio": "Dr. Phadtare specializes in the design and synthesis of bioactive molecules targeting metabolic disorders. His expertise lies in molecular docking, spectroscopic analysis, and chemical process optimization.",
    "publications": "25+ Publications in high-impact international journals",
    "projects": "Investigating lead molecules with potential anti-diabetic activities",
    "isHOD": true
},
  {
    "id": "5",
    "name": "Dr. Yogesh B. Zambare",
    "designation": "Associate Professor",
    "department": "Pharmacology",
    "qualification": "M. Pharm, Ph.D.",
    "specialization": "Neuropharmacology, Behavioral Toxicology, Cardiovascular Screening",
    "experience": "13+ Years",
    "email": "yogesh.zambare@kbiper.edu.in",
    "bio": "Dr. Yogesh Zambare leads the pharmacology department and oversees the institutional CPCSEA animal house facility. His research explores target receptors in neurodegenerative diseases like Alzheimer's and Parkinson's.",
    "publications": "20+ Research and review articles in indexed journals",
    "projects": "Collaborating with local hospitals for clinical research safety evaluations",
    "isHOD": true
},
  {
    "id": "6",
    "name": "Ms. Mugdha Arvind Joshi",
    "designation": "Associate Professor",
    "department": "Pharmaceutical Chemistry",
    "qualification": "M. Pharmacy, Phd pursuing",
    "specialization": "Pharmaceutical Sciences",
    "experience": "0-2 Years (Industry), 10+ Years (Teaching)",
    "email": "majoshi.iiper@gmail.com",
    "bio": "Ms. Mugdha Arvind Joshi is an esteemed Associate Professor in the Department of Pharmaceutical Chemistry at KBIPER. She holds a highest qualification of M. Pharmacy, Phd pursuing. With 0-2 Years (Industry), 10+ Years (Teaching) of experience, she is committed to academic excellence. She is focused on guiding students and fostering research. Additionally, she serves as ERP Coordinator, Admission Coordinator.",
    "certificateUrl": "https://drive.google.com/open?id=1i2CwSJg7gybcwBv2-e9ZG6YElfxRkhG3",
    "resumeUrl": "https://drive.google.com/open?id=1P9oxeSXgO_BQVtibx0FuDoMRoQjx1HcN",
    "publications": "Indexed in: UGC Care",
    "projects": "UG Projects (20+ Scholars)"
},
  {
    "id": "7",
    "name": "Mr. Mayur Kishor Lohkare",
    "designation": "Assistant Professor",
    "department": "D. Pharmacy",
    "qualification": "M.Pharmacy, PhD. (Pursuing)",
    "specialization": "Computer Knowledge, handling of instruments",
    "experience": "10+ Years (Teaching)",
    "email": "mayurlohkare@gmail.com",
    "bio": "Mr. Mayur Kishor Lohkare is an esteemed Assistant Professor in the Department of D. Pharmacy at KBIPER. He holds a highest qualification of M.Pharmacy, PhD. (Pursuing). With 10+ Years (Teaching) of experience, he is committed to academic excellence. His core expertise includes computer knowledge, handling of instruments. Additionally, he serves as Admission Coordinator, Examination Coordinator, Other.",
    "certificateUrl": "https://drive.google.com/open?id=1xUZ8wKe-2I7qgVJZQL3d_TvIceqIfGPM",
    "resumeUrl": "https://drive.google.com/open?id=1G_7cpQgmOtg-Hw3C5PcsBrjRtm2n62TF",
    "publications": "Indexed in: UGC Care, Other"
},
  {
    "id": "8",
    "name": "Ms. Ashvini Vilas Joshi",
    "designation": "Assistant Professor",
    "department": "Pharmaceutics",
    "qualification": "Ph.D",
    "specialization": "Teaching, Adaptibility,Monitoring,Team Work",
    "experience": "0-2 Years (Industry), 6-10 Years (Teaching)",
    "email": "ashvinijoshi94@gmail.com",
    "bio": "Ms. Ashvini Vilas Joshi is an esteemed Assistant Professor in the Department of Pharmaceutics at KBIPER. She holds a highest qualification of Ph.D. With 0-2 Years (Industry), 6-10 Years (Teaching) of experience, she is committed to academic excellence. Her core expertise includes teaching, adaptibility,monitoring,team work. Additionally, she serves as NSS/Cultural Committee.",
    "certificateUrl": "https://drive.google.com/open?id=108VWk9MU7alITJZExX32Co2exlRaylL3",
    "resumeUrl": "https://drive.google.com/open?id=1zcGpVYiouk6C6O63f5kEcI1GWKnNk9OP",
    "publications": "Indexed in: Scopus, SCI, UGC Care, Web of Science",
    "projects": "UG Projects (0-5 Scholars), UG Projects (6-10 Scholars)"
},
  {
    "id": "9",
    "name": "Ms. SHWETA MORAJI MANTRI",
    "designation": "Lecturer",
    "department": "D. Pharmacy",
    "qualification": "M.Pharmacy",
    "specialization": "Teaching and Learning Skills, Communication Skills, Research Skills, Student Development Skills",
    "experience": "6-10 Years (Teaching)",
    "email": "mantrishweta7@gmail.com",
    "bio": "Ms. SHWETA MORAJI MANTRI is an esteemed Lecturer in the Department of D. Pharmacy at KBIPER. She holds a highest qualification of M.Pharmacy. With 6-10 Years (Teaching) of experience, she is committed to academic excellence. Her core expertise includes teaching and learning skills, communication skills, research skills, student development skills. Additionally, she serves as NSS/Cultural Committee, Other.",
    "certificateUrl": "https://drive.google.com/open?id=1j-22bCwTINy5tjdsXEn6QjW0NGMQkL6r",
    "resumeUrl": "https://drive.google.com/open?id=1MbVCjofAf2DFPKcalg6EuJVEssQRRBhZ",
    "publications": "Indexed in: Scopus, Other",
    "projects": "Ph.D. Scholars, PG Projects, UG Projects"
},
  {
    "id": "10",
    "name": "Ms. Pooja Nana Sawant",
    "designation": "Assistant Professor",
    "department": "Pharmaceutics",
    "qualification": "M.pharm",
    "specialization": "Adaptability, Team work, communication",
    "experience": "0-2 Years (Teaching)",
    "email": "pooja.sawant0302@gmail.com",
    "bio": "Ms. Pooja Nana Sawant is an esteemed Assistant Professor in the Department of Pharmaceutics at KBIPER. She holds a highest qualification of M.pharm. With 0-2 Years (Teaching) of experience, she is committed to academic excellence. Her core expertise includes adaptability, team work, communication.",
    "certificateUrl": "https://drive.google.com/open?id=1NTO_P4q50UIksJu5AS1E6FASzG5GtcHu",
    "resumeUrl": "https://drive.google.com/open?id=1Q4T-YYuSkNkGvFcYcbyq7pYHvVmhOGSe",
    "publications": "Indexed in: Scopus",
    "projects": "Ph.D. Scholars, PG Projects, UG Projects"
},
  {
    "id": "11",
    "name": "Mrs. Reshma Pankaj Dhakate",
    "designation": "Assistant Professor",
    "department": "Pharmaceutical Chemistry",
    "qualification": "M. PHARM IN PHARMACEUTICAL CHEMISTRY",
    "specialization": "Analytical Instrument Handling like UV, HPLC etc",
    "experience": "0-2 Years (Research), 3-5 Years (Teaching)",
    "email": "gonnader@gmail.com",
    "bio": "Mrs. Reshma Pankaj Dhakate is an esteemed Assistant Professor in the Department of Pharmaceutical Chemistry at KBIPER. She holds a highest qualification of M. PHARM IN PHARMACEUTICAL CHEMISTRY. With 0-2 Years (Research), 3-5 Years (Teaching) of experience, she is committed to academic excellence. Her core expertise includes analytical instrument handling like uv, hplc etc. Additionally, she serves as NAAC Coordinator, Other.",
    "certificateUrl": "https://drive.google.com/open?id=1sKEdpvciL8aJ5HiH33CIrGGwX1p9Ky_O",
    "resumeUrl": "https://drive.google.com/open?id=1Vt0K0n7rsJJAmbOLGrH4IgKm80S71UMX",
    "publications": "Indexed in: UGC Care, Other",
    "projects": "UG Projects (20+ Scholars)"
},
  {
    "id": "12",
    "name": "Ms. Ankita Vilas Berde",
    "designation": "Assistant Professor",
    "department": "D. Pharmacy",
    "qualification": "Master in Pharmacy (Pharmaceutics)",
    "specialization": "Research, Teaching, Pharmaceutical Formulation, Scientific Writing.",
    "experience": "3-5 Years (Teaching)",
    "email": "ankita.berde2011@gmail.com",
    "bio": "Ms. Ankita Vilas Berde is an esteemed Assistant Professor in the Department of D. Pharmacy at KBIPER. She holds a highest qualification of Master in Pharmacy (Pharmaceutics). With 3-5 Years (Teaching) of experience, she is committed to academic excellence. Her core expertise includes research, teaching, pharmaceutical formulation, scientific writing. Additionally, she serves as Examination Coordinator.",
    "certificateUrl": "https://drive.google.com/open?id=1FyQFjo_00qRu80AiAzy5XkxcbScd5zmD",
    "resumeUrl": "https://drive.google.com/open?id=1ay6LOwWFr9IeiJf7pTInnJW8EGChgB7A",
    "publications": "Indexed in: Scopus, UGC Care"
},
  {
    "id": "13",
    "name": "Ms. Sohini Amalkrishna Ganguly",
    "designation": "Assistant Professor",
    "department": "D. Pharmacy",
    "qualification": "M. Pharm.",
    "specialization": "Management skills, Leadership, Creativity, etc.",
    "experience": "3-5 Years (Teaching)",
    "email": "iipsohini@gmail.com",
    "bio": "Ms. Sohini Amalkrishna Ganguly is an esteemed Assistant Professor in the Department of D. Pharmacy at KBIPER. She holds a highest qualification of M. Pharm.. With 3-5 Years (Teaching) of experience, she is committed to academic excellence. Her core expertise includes management skills, leadership, creativity, etc. Additionally, she serves as Examination Coordinator, NSS/Cultural Committee, Other.",
    "certificateUrl": "https://drive.google.com/open?id=1MBUE6l2H9sgRTLuSASIk8Xb6Gx8H2qm2",
    "resumeUrl": "https://drive.google.com/open?id=1Wyj6TxGp_lzWPBfYb5wQiHzd6qlbLRfY",
    "publications": "Indexed in: UGC Care, Other",
    "projects": "Ph.D. Scholars, PG Projects, UG Projects"
},
  {
    "id": "14",
    "name": "Mrs. Sharda Sarang Kulkarni",
    "designation": "Assistant Professor",
    "department": "Pharmaceutics",
    "qualification": "M. Pharm. (Pharmaceutics)",
    "specialization": "Research , Teaching.",
    "experience": "6-10 Years (Teaching)",
    "email": "kulkarnisharda97@gmail.com",
    "bio": "Mrs. Sharda Sarang Kulkarni is an esteemed Assistant Professor in the Department of Pharmaceutics at KBIPER. She holds a highest qualification of M. Pharm. (Pharmaceutics). With 6-10 Years (Teaching) of experience, she is committed to academic excellence. Her core expertise includes research , teaching.",
    "certificateUrl": "https://drive.google.com/open?id=1-q0WBLYHojVMsqMR6p7MknM95I1kP602",
    "resumeUrl": "https://drive.google.com/open?id=1mu-VB30QTVZsLcppZgIRuyRrj_Mn-aQi",
    "publications": "Indexed in: Scopus, SCI, UGC Care, Other",
    "projects": "UG Projects (20+ Scholars)"
},
  {
    "id": "15",
    "name": "Ms. Vikranti Walmik Koli",
    "designation": "Assistant Professor",
    "department": "Pharmaceutics",
    "qualification": "M Pharmacy",
    "specialization": "Pharmaceutical Formulation Development\nResearch & Development (R&D)\nNanoemulsion Formulation and Characterization",
    "experience": "3-5 Years (Teaching)",
    "email": "vwk.iiper96@gmail.com",
    "bio": "Ms. Vikranti Walmik Koli is an esteemed Assistant Professor in the Department of Pharmaceutics at KBIPER. She holds a highest qualification of M Pharmacy. With 3-5 Years (Teaching) of experience, she is committed to academic excellence. Her core expertise includes pharmaceutical formulation development\nresearch & development (r&d)\nnanoemulsion formulation and characterization.",
    "certificateUrl": "https://drive.google.com/open?id=1umGZDYp056rDqMrAVJWuZINGhqe3nYxO",
    "resumeUrl": "https://drive.google.com/open?id=1FMc1T--PyCQ_oEdnk-v4QbHJ6FfjXvh9",
    "publications": "Indexed in: UGC Care",
    "projects": "UG Projects (20+ Scholars)"
},
  {
    "id": "16",
    "name": "Ms. Shraddha Subhash Satkar",
    "designation": "Assistant Professor",
    "department": "Quality Assurance",
    "qualification": "M.Pharm (Pharmaceutical Quality Assurance)",
    "specialization": "Good communication, Student mentoring, Research Publications,",
    "experience": "6-10 Years (Teaching)",
    "email": "sssatkar. iiper@gmail.com",
    "bio": "Ms. Shraddha Subhash Satkar is an esteemed Assistant Professor in the Department of Quality Assurance at KBIPER. She holds a highest qualification of M.Pharm (Pharmaceutical Quality Assurance). With 6-10 Years (Teaching) of experience, she is committed to academic excellence. Her core expertise includes good communication, student mentoring, research publications,.",
    "certificateUrl": "https://drive.google.com/open?id=1CTFYie1cE1nHpZnLSlBQYOfujdEAGPIZ",
    "resumeUrl": "https://drive.google.com/open?id=1n-ZMuXlF_uHfzqmOzx98TxJ3LrRFlUTi",
    "publications": "Indexed in: Scopus, UGC Care, Web of Science",
    "projects": "UG Projects (20+ Scholars), Ph.D. Scholars, PG Projects"
},
  {
    "id": "17",
    "name": "Ms. Kadambari Shripad Ghatpande",
    "designation": "Assistant Professor",
    "department": "Quality Assurance",
    "qualification": "M. Pharm(Quality assurance Techniques?",
    "specialization": "Teaching, Administrative, Extra curricular",
    "experience": "3-5 Years (Industry), 6-10 Years (Teaching)",
    "email": "ghatpandekadambari4@gmail.com",
    "bio": "Ms. Kadambari Shripad Ghatpande is an esteemed Assistant Professor in the Department of Quality Assurance at KBIPER. She holds a highest qualification of M. Pharm(Quality assurance Techniques?. With 3-5 Years (Industry), 6-10 Years (Teaching) of experience, she is committed to academic excellence. Her core expertise includes teaching, administrative, extra curricular. Additionally, she serves as Examination Coordinator.",
    "publications": "Indexed in: UGC Care, Web of Science"
},
  {
    "id": "18",
    "name": "Mr. Mahesh Balkrishna Gawade",
    "designation": "Assistant Professor",
    "department": "Pharmaceutics",
    "qualification": "M.pharm ( Pursuing PH D )",
    "specialization": "Teaching and learning",
    "experience": "3-5 Years (Teaching)",
    "email": "maheshgawade829@gmail.com",
    "bio": "Mr. Mahesh Balkrishna Gawade is an esteemed Assistant Professor in the Department of Pharmaceutics at KBIPER. He holds a highest qualification of M.pharm ( Pursuing PH D ). With 3-5 Years (Teaching) of experience, he is committed to academic excellence. His core expertise includes teaching and learning. Additionally, he serves as NSS/Cultural Committee.",
    "certificateUrl": "https://drive.google.com/open?id=1TfaTcGWwdbwk26w2amPsKCDdSICRT6p_",
    "resumeUrl": "https://drive.google.com/open?id=1d2AHfHLVpEbQJaNuhQKh23YU2VAIRh0u",
    "publications": "Indexed in: Other",
    "projects": "UG Projects (11-20 Scholars)"
},
  {
    "id": "19",
    "name": "Mr. Awate Shyam Suryakant",
    "designation": "Assistant Professor",
    "department": "Pharmaceutics",
    "qualification": "M. Pharm in Pharmaceutical Biotechnology",
    "specialization": "Soft Skills: Excellent communication, Leadership, Good Presentation Skills, M.S.Office.\nMachine Handling: Tablet Compression machine, Dissolution,  Disintegration,  Friability tester, UV Visible Spectrophotometer, HPLC, Laminar Air Flow, PCR, Gel Electrophoresis, Ultracentrifuge, Lyophilizer.",
    "experience": "10+ Years (Teaching)",
    "email": "shyamsawate.iiper@gmail.com",
    "bio": "Mr. Awate Shyam Suryakant is an esteemed Assistant Professor in the Department of Pharmaceutics at KBIPER. He holds a highest qualification of M. Pharm in Pharmaceutical Biotechnology. With 10+ Years (Teaching) of experience, he is committed to academic excellence. His core expertise includes soft skills: excellent communication, leadership, good presentation skills, m.s.office.\nmachine handling: tablet compression machine, dissolution,  disintegration,  friability tester, uv visible spectrophotometer, hplc, laminar air flow, pcr, gel electrophoresis, ultracentrifuge, lyophilizer. Additionally, he serves as Training & Placement.",
    "certificateUrl": "https://drive.google.com/open?id=1JZK7DLrKkEf2djQfw5X3NmioNTyT91--",
    "resumeUrl": "https://drive.google.com/open?id=19bmvSoHMstNEh6-9WtfO0CCdywUL9trj",
    "publications": "Indexed in: Scopus, UGC Care",
    "projects": "PG Projects (11-20 Scholars), UG Projects (20+ Scholars)"
},
  {
    "id": "20",
    "name": "Dr. Mayuri Vighnahar Gurav",
    "designation": "Assistant Professor",
    "department": "Pharmacognosy",
    "qualification": "PhD, Pharmacology",
    "specialization": "Academics, Research, Administrative work",
    "experience": "0-2 Years (Research), 6-10 Years (Teaching)",
    "email": "mvg.iiper@gmail.com",
    "bio": "Dr. Mayuri Vighnahar Gurav is an esteemed Assistant Professor in the Department of Pharmacognosy at KBIPER. She holds a highest qualification of PhD, Pharmacology. With 0-2 Years (Research), 6-10 Years (Teaching) of experience, she is committed to academic excellence. Her core expertise includes academics, research, administrative work. Additionally, she serves as Examination Coordinator, Other.",
    "certificateUrl": "https://drive.google.com/open?id=183kkZ0Ht-zvnU6sE1uP1BNsKRGoEEf2i",
    "resumeUrl": "https://drive.google.com/open?id=1qnLEmJACR610HA2BjHEUeKv0BT0Hp36y",
    "publications": "Indexed in: Scopus, UGC Care, Web of Science",
    "projects": "PG Projects (6-10 Scholars), UG Projects (20+ Scholars)"
},
  {
    "id": "21",
    "name": "Ms. Nilam Subhash Patangare",
    "designation": "Assistant Professor",
    "department": "Pharmaceutics",
    "qualification": "M.pharm",
    "specialization": "Teaching, learning, Reading, Research and development activities etc",
    "experience": "3-5 Years (Teaching)",
    "email": "patangarenilam99@gmail.com",
    "bio": "Ms. Nilam Subhash Patangare is an esteemed Assistant Professor in the Department of Pharmaceutics at KBIPER. She holds a highest qualification of M.pharm. With 3-5 Years (Teaching) of experience, she is committed to academic excellence. Her core expertise includes teaching, learning, reading, research and development activities etc. Additionally, she serves as NSS/Cultural Committee.",
    "certificateUrl": "https://drive.google.com/open?id=1aqXGOW3dSN62mwfJYu3E-IHIJCA_FW12",
    "resumeUrl": "https://drive.google.com/open?id=1IOI8bg5BhigIsEIjORRgaZpY4IugVHIR",
    "publications": "Indexed in: Scopus",
    "projects": "UG Projects (0-5 Scholars)"
},
  {
    "id": "22",
    "name": "Ms. Priyanka Arun Panmand",
    "designation": "Assistant Professor",
    "department": "Pharmaceutics",
    "qualification": "M. Pharmacy",
    "specialization": "Learning new things",
    "experience": "6-10 Years (Teaching)",
    "email": "priyankapanmand92@gmail.com",
    "bio": "Ms. Priyanka Arun Panmand is an esteemed Assistant Professor in the Department of Pharmaceutics at KBIPER. She holds a highest qualification of M. Pharmacy. With 6-10 Years (Teaching) of experience, she is committed to academic excellence. Her core expertise includes learning new things.",
    "certificateUrl": "https://drive.google.com/open?id=1xDr7OADG3nkfLvt5WehRyiFtmwGf7E-d",
    "resumeUrl": "https://drive.google.com/open?id=1m_4hgS0z0j9FiSTgvm2dKIBEzLqdASkM",
    "publications": "Indexed in: Scopus, UGC Care, Web of Science",
    "projects": "UG Projects (20+ Scholars)"
},
  {
    "id": "23",
    "name": "Ms. VILASINI RAMESHRAO PANDAV",
    "designation": "Assistant Professor",
    "department": "Pharmacognosy",
    "qualification": "M.Pharmacy (Pharmacognosy)",
    "specialization": "Communication skill,Leadership,Clligraphy writings,Sharp Learner,Singing etc.",
    "experience": "0-2 Years (Teaching)",
    "email": "vilasinipandav773@gmail.com",
    "bio": "Ms. VILASINI RAMESHRAO PANDAV is an esteemed Assistant Professor in the Department of Pharmacognosy at KBIPER. She holds a highest qualification of M.Pharmacy (Pharmacognosy). With 0-2 Years (Teaching) of experience, she is committed to academic excellence. Her core expertise includes communication skill,leadership,clligraphy writings,sharp learner,singing etc. Additionally, she serves as Admission Coordinator, Examination Coordinator, Training & Placement.",
    "certificateUrl": "https://drive.google.com/open?id=1Gl8xrIWJzHQv0EcdLxasMAhoJCRjR6F3",
    "resumeUrl": "https://drive.google.com/open?id=1s54zSSpooxLNo3KPf_O3w_TRFxInWpRN",
    "publications": "Indexed in: Other"
},
  {
    "id": "24",
    "name": "Ms. Yogita Chittaranjan Saraf",
    "designation": "Assistant Professor",
    "department": "Pharmaceutics",
    "qualification": "M. Pharmacy (Pharmaceutics)",
    "specialization": "Communication skill",
    "experience": "0-2 Years (Teaching)",
    "email": "ycs.kbiper@gmail.com",
    "bio": "Ms. Yogita Chittaranjan Saraf is an esteemed Assistant Professor in the Department of Pharmaceutics at KBIPER. She holds a highest qualification of M. Pharmacy (Pharmaceutics). With 0-2 Years (Teaching) of experience, she is committed to academic excellence. Her core expertise includes communication skill. Additionally, she serves as Admission Coordinator, Examination Coordinator.",
    "certificateUrl": "https://drive.google.com/open?id=1KgQwHZsMZZOs6SHxyGuRFCeh2bGiMZkl",
    "resumeUrl": "https://drive.google.com/open?id=1Icnko1G4-qWkUGzPI8WfJhYAvg9C9Fke"
},
];





const getGradientForInitials = (name: string) => {
  const gradients = [
    "from-blue-50 to-sky-100 border-blue-200/60 text-blue-700",
    "from-emerald-50 to-teal-100 border-emerald-200/60 text-emerald-700",
    "from-indigo-50 to-violet-100 border-indigo-200/60 text-indigo-700",
    "from-amber-50 to-yellow-100 border-amber-200/60 text-amber-700",
    "from-rose-50 to-pink-100 border-rose-200/60 text-rose-700",
    "from-fuchsia-50 to-purple-100 border-fuchsia-200/60 text-fuchsia-700",
    "from-cyan-50 to-sky-100 border-cyan-200/60 text-cyan-700",
    "from-orange-50 to-amber-100 border-orange-200/60 text-orange-700",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % gradients.length;
  return gradients[index];
};

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
