import { AppLayout } from "@/components/layout/AppLayout";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Music, 
  Send, 
  CheckCircle,
  FileText,
  Calendar,
  Clock,
  Sparkles,
  Users,
  Award,
  ChevronLeft,
  ChevronRight,
  X
} from "lucide-react";
import { useState, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";

export interface ExtracurricularEvent {
  id: string;
  title: string;
  date: string;
  venue?: string;
  guest?: string;
  participantsCount?: string;
  staffCount?: string;
  objective: string;
  summary: string;
  coordinators: string[];
  images: string[];
}

export const PAST_EVENTS_REPORTS: ExtracurricularEvent[] = [
  {
    "id": "ashwamedh_2026",
    "title": "ASHWAMEDH Cultural Festival 2026",
    "date": "April 17, 2026",
    "venue": "IVM Campus / KBIPER College Ground",
    "guest": "Dr. Harshadeep Joshi (Registrar, DBATU University) & Shri Chandrakant Shete Sir (Secretary, IVM)",
    "participantsCount": "450+ Students",
    "staffCount": "40+ Staff",
    "objective": "Provide a platform for students to showcase cultural talents (dance, music, performing arts), promote teamwork and leadership, and strengthen institutional bonding.",
    "summary": "The Annual Cultural Festival ASHWAMEDH 2026 was celebrated with great enthusiasm. The program began with a welcome address and annual report by Principal Dr. S. R. Arote, followed by a student address from General Secretary Pratik Bhaik. The Chief Guest Dr. Harshadeep Joshi delivered an inspiring speech on career opportunities and social responsibilities in the pharmaceutical field. Outstanding cultural performances including traditional dance and music showcases were presented. The event concluded with a vote of thanks by HOD Dr. G. S. Shinde.",
    "coordinators": [
      "Ms. Ashvini V. Joshi",
      "Ms. Shweta Mantri"
    ],
    "images": [
      "/images/extracurricular/ashwamedh_2026/image_1.jpeg",
      "/images/extracurricular/ashwamedh_2026/image_3.jpeg",
      "/images/extracurricular/ashwamedh_2026/image_4.jpeg",
      "/images/extracurricular/ashwamedh_2026/image_5.jpeg",
      "/images/extracurricular/ashwamedh_2026/image_6.jpeg"
    ]
  },
  {
    "id": "dandiya_day_2025",
    "title": "Dandiya Day Celebration 2025",
    "date": "October 1, 2025",
    "venue": "IVM's Sports Ground",
    "guest": "Shri Ramdas Appa Kakade (President, Indrayani Vidya Mandir), Shri Chandrakant Shete (Secretary, IVM) & Hon'ble Smt. Nirupa Kanitkar Madam",
    "participantsCount": "450+ Students",
    "staffCount": "40+ Staff",
    "objective": "Celebrate the festive spirit of Navratri, promote togetherness, cultural harmony, team spirit, and joy among students of D. Pharm, B. Pharm, and M. Pharm programs.",
    "summary": "The celebration began with the traditional Bhondla Pooja, symbolizing devotion and Navratri heritage. Following the pooja, students enthusiastically participated in Garba and Dandiya Raas, dressed in vibrant traditional attire. Smt. Nirupa Kanitkar Madam joined the dance, adding charm and encouragement. The program was graced by IVM's leadership, who inspired the students with motivational words. The event concluded with a vote of thanks from the organizing committee.",
    "coordinators": [
      "Ms. Ashvini V. Joshi",
      "Mr. Shubham Waghmare"
    ],
    "images": [
      "/images/extracurricular/dandiya_day_celebration_report/image_1.jpeg",
      "/images/extracurricular/dandiya_day_celebration_report/image_2.jpeg",
      "/images/extracurricular/dandiya_day_celebration_report/image_3.jpeg",
      "/images/extracurricular/dandiya_day_celebration_report/image_4.jpeg",
      "/images/extracurricular/dandiya_day_celebration_report/image_5.jpeg",
      "/images/extracurricular/dandiya_day_celebration_report/image_6.jpeg"
    ]
  },
  {
    "id": "euphoria_zest_2026",
    "title": "EUPHORIA ZEST 2026 (Days Celebration)",
    "date": "April 15 - 16, 2026",
    "venue": "KBIPER Campus",
    "guest": "Hon'ble Mrs. Nirupa Kanitkar Madam & KBIPER Faculty Members",
    "participantsCount": "450+ Students",
    "staffCount": "40+ Staff",
    "objective": "Provide a creative space for students to showcase confidence and individuality through themed activities, promoting active collaboration and institutional camaraderie.",
    "summary": "Euphoria Zest 2026 brought together students from all academic years for multiple themed days: Style Scramble Day, Halloween Day, Bollywood Day, and Group Day. Style Scramble Day showcased innovative fashion and confidence through ramp walks, while Halloween Day featured highly creative and imaginative costumes. Bollywood Day highlighted cultural expression with iconic character representations, and Group Day reflected unity through synchronized group performances. The performances were coordinated by Ms. Ashvini Joshi and Ms. Shweta Mantri.",
    "coordinators": [
      "Ms. Ashvini V. Joshi",
      "Ms. Shweta Mantri"
    ],
    "images": [
      "/images/extracurricular/euphoria_zest_2026/image_1.jpeg",
      "/images/extracurricular/euphoria_zest_2026/image_2.jpeg",
      "/images/extracurricular/euphoria_zest_2026/image_4.jpeg",
      "/images/extracurricular/euphoria_zest_2026/image_5.jpeg",
      "/images/extracurricular/euphoria_zest_2026/image_6.jpeg",
      "/images/extracurricular/euphoria_zest_2026/image_7.jpeg",
      "/images/extracurricular/euphoria_zest_2026/image_8.jpeg"
    ]
  },
  {
    "id": "freshers_party_2025",
    "title": "Fresher's Party 2025",
    "date": "December 6, 2025",
    "venue": "KBIPER College Lawn",
    "guest": "Dr. Lalit Gore (Chief Guest) & Hon'ble Mrs. Nirupa Kanitkar Madam",
    "participantsCount": "300+ Students",
    "staffCount": "40+ Staff",
    "objective": "Welcome newly admitted students to D.Pharm, B.Pharm, and M.Pharm programs, help them interact with seniors and faculty, and introduce them to the institutional culture.",
    "summary": "The party opened with a welcome address by seniors and traditional pooja by Mrs. Nirupa Kanitkar and Principal Dr. S. R. Arote. Cultural performances of dance and singing followed. A major highlight was the Mr. & Ms. Fresher Contest, showcasing juniors' talent, confidence, and communication skills. The evening concluded with an energetic DJ session, fostering a warm, friendly and inclusive environment.",
    "coordinators": [
      "Ms. Ashvini V. Joshi",
      "Ms. Mugdha A. Joshi",
      "Ms. Shweta Mantri"
    ],
    "images": [
      "/images/extracurricular/freshers_party_2025/image_1.png",
      "/images/extracurricular/freshers_party_2025/image_2.jpeg",
      "/images/extracurricular/freshers_party_2025/image_3.jpeg",
      "/images/extracurricular/freshers_party_2025/image_4.jpeg",
      "/images/extracurricular/freshers_party_2025/image_6.jpeg",
      "/images/extracurricular/freshers_party_2025/image_7.jpeg",
      "/images/extracurricular/freshers_party_2025/image_8.png",
      "/images/extracurricular/freshers_party_2025/image_9.jpeg",
      "/images/extracurricular/freshers_party_2025/image_10.jpeg",
      "/images/extracurricular/freshers_party_2025/image_11.jpeg",
      "/images/extracurricular/freshers_party_2025/image_12.png"
    ]
  },
  {
    "id": "teachers_day_2025",
    "title": "Teachers' Day Celebration 2025",
    "date": "September 4, 2025",
    "venue": "KBIPER Seminar Hall",
    "guest": "Hon'ble Mrs. Nirupa Kanitkar Madam & IVM Sanstha Dignitaries",
    "participantsCount": "200+ Students",
    "staffCount": "40+ Staff",
    "objective": "Acknowledge and appreciate the dedication of teaching and support staff, honoring their contributions in shaping students' lives and academic paths.",
    "summary": "Celebrating the legacy of Dr. Sarvepalli Radhakrishnan, the event commenced with a traditional pooja by Smt. Nirupa Kanitkar. Teachers and support staff were felicitated for their tireless services. Students actively organized games, fun activities, and musical performances dedicated to their mentors, fostering gratitude and strengthening student-teacher bonding. Principal Arote Sir delivered a heartfelt vote of thanks.",
    "coordinators": [
      "Mr. Shubham Waghmare",
      "Ms. Ashvini V. Joshi",
      "Ms. Shweta Mantri"
    ],
    "images": [
      "/images/extracurricular/teachers_day_report/image_1.jpeg",
      "/images/extracurricular/teachers_day_report/image_3.jpeg",
      "/images/extracurricular/teachers_day_report/image_4.jpeg",
      "/images/extracurricular/teachers_day_report/image_5.jpeg",
      "/images/extracurricular/teachers_day_report/image_6.jpeg",
      "/images/extracurricular/teachers_day_report/image_7.jpeg",
      "/images/extracurricular/teachers_day_report/image_8.jpeg",
      "/images/extracurricular/teachers_day_report/image_9.jpeg",
      "/images/extracurricular/teachers_day_report/image_10.jpeg"
    ]
  },
  {
    "id": "farewell_chemonara_2026",
    "title": "Chemonara 2026 (Farewell & Prize Distribution)",
    "date": "June 5, 2026",
    "venue": "KBIPER Seminar Hall",
    "guest": "Prof. (Dr.) Narendra Narve (Campus Director, IVM) & Mrs. Nirupa Kanitkar (Treasurer, IVM)",
    "participantsCount": "350+ Students",
    "staffCount": "40+ Staff",
    "objective": "Bid a warm farewell to outgoing D. Pharmacy, B. Pharmacy, and M. Pharmacy students, celebrate their journeys, and recognize outstanding contributions in academics, research, sports, and cultural events.",
    "summary": "The ceremony commenced with a Lakshmi Pujan and a welcome address by Principal Dr. Sanjay Arote. Outgoing students shared memories and gratitude. During the prize distribution, meritorious students were honored for academic, sports, and research excellence. Prof. Narendra Narve emphasized discipline, while Mrs. Nirupa Kanitkar advised resilience. The ceremony concluded with student-led cultural dances and a vote of thanks by HOD Dr. Gulab Shinde.",
    "coordinators": [
      "Ms. Ashvini V. Joshi",
      "Ms. Shweta Mantri"
    ],
    "images": [
      "/images/extracurricular/farewell_prize_distribution_2026/image_1.jpeg",
      "/images/extracurricular/farewell_prize_distribution_2026/image_2.jpeg",
      "/images/extracurricular/farewell_prize_distribution_2026/image_4.jpeg",
      "/images/extracurricular/farewell_prize_distribution_2026/image_5.jpeg",
      "/images/extracurricular/farewell_prize_distribution_2026/image_6.jpeg",
      "/images/extracurricular/farewell_prize_distribution_2026/image_7.jpeg",
      "/images/extracurricular/farewell_prize_distribution_2026/image_8.jpeg",
      "/images/extracurricular/farewell_prize_distribution_2026/image_9.jpeg",
      "/images/extracurricular/farewell_prize_distribution_2026/image_10.jpeg"
    ]
  }
];

const CULTURAL_EVENTS = [
  {
    day: "Day 1: Fine Arts & Scientific Poster",
    date: "February 10, 2026",
    events: ["Rangoli & Face Painting", "Scientific Poster Presentation", "Group Debate on Pharmacy Ethics"],
    coordinator: "Prof. Anjali Jadhav"
  },
  {
    day: "Day 2: Music & Literary fests",
    date: "February 11, 2026",
    events: ["Solo & Duet Singing", "Elocution Competition", "Stand-up Comedy & Mimicry"],
    coordinator: "Ms. Ananya Deshpande"
  },
  {
    day: "Day 3: Performing Arts & Fashion Show",
    date: "February 12, 2026",
    events: ["Solo / Group Dance Showcase", "Traditional Wear Ramp Walk", "Pharma-Fiesta Drama Night"],
    coordinator: "Mr. Rohit Jagtap"
  }
];

export default function Cultural() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"fiesta" | "register" | "reports">("reports");
  const [selectedReportId, setSelectedReportId] = useState<string>("ashwamedh_2026");
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const handleSelectReport = (id: string) => {
    setSelectedReportId(id);
    setActiveImgIndex(0);
    setIsDetailOpen(true);
  };

  // Registration Form State
  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [selectedEvent, setSelectedEvent] = useState("Solo / Group Dance");
  const [category, setCategory] = useState("Solo");
  const [isRegistered, setIsRegistered] = useState(false);

  const isFormValid = useMemo(() => {
    return name.trim().length > 2 && rollNo.trim().length > 3;
  }, [name, rollNo]);

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      toast({
        title: "Registration Incomplete",
        description: "Please fill out required fields (Name, Roll No).",
      });
      return;
    }

    setIsRegistered(true);
    toast({
      title: "Cultural Registration Recorded",
      description: `Your application to participate in ${selectedEvent} has been registered!`,
    });
  };

  const handleResetForm = () => {
    setName("");
    setRollNo("");
    setSelectedEvent("Solo / Group Dance");
    setCategory("Solo");
    setIsRegistered(false);
  };

  return (
    <AppLayout>
      {/* Immersive Hero Header */}
      <section className="bg-slate-950 text-white py-28 relative overflow-hidden border-b border-slate-900">
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-indigo-500/10 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-[350px] h-[350px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '30px 30px' }} />
        
        <div className="container mx-auto px-4 text-center relative z-10 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="w-16 h-16 bg-white/5 border border-white/10 text-accent rounded-3xl flex items-center justify-center mx-auto shadow-2xl backdrop-blur-md">
              <Music className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight leading-none">
              Pharma <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-amber-200 to-indigo-300">Fiesta</span>
            </h1>
            <p className="text-sm md:text-base text-white/60 font-light max-w-xl mx-auto leading-relaxed">
              Celebrating creativity and cultural diversity. KBIPER's annual cultural week showcases student talent in performing arts, literature, and design.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Dashboard */}
      <section className="py-20 bg-slate-950 relative min-h-[60vh] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-indigo-950/20 via-transparent to-transparent pointer-events-none" />
        
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          
          {/* Glassmorphic Segmented Switcher */}
          <div className="flex justify-center mb-16">
            <div className="inline-flex p-1.5 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl gap-1.5 overflow-x-auto no-scrollbar max-w-full">
              <button
                onClick={() => setActiveTab("reports")}
                className={`cursor-pointer px-6 py-3 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 whitespace-nowrap inline-flex items-center gap-2 ${
                  activeTab === "reports"
                    ? "bg-gradient-to-r from-accent to-[#d9c572] text-slate-900 shadow-lg shadow-accent/25"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                <Sparkles className="w-4 h-4" /> Celebration Reports & Gallery
              </button>
              <button
                onClick={() => setActiveTab("fiesta")}
                className={`cursor-pointer px-6 py-3 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 whitespace-nowrap inline-flex items-center gap-2 ${
                  activeTab === "fiesta"
                    ? "bg-gradient-to-r from-accent to-[#d9c572] text-slate-900 shadow-lg shadow-accent/25"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                <Music className="w-4 h-4" /> Event Schedule
              </button>
              <button
                onClick={() => {
                  setActiveTab("register");
                  setIsRegistered(false);
                }}
                className={`cursor-pointer px-6 py-3 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 whitespace-nowrap inline-flex items-center gap-2 ${
                  activeTab === "register"
                    ? "bg-gradient-to-r from-accent to-[#d9c572] text-slate-900 shadow-lg shadow-accent/25"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                <Send className="w-4 h-4" /> Register for Events
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "reports" && (
              /* =========================================================================
                 🎭 CELEBRATION REPORTS & GALLERY TAB (CARDS GRID)
                 ========================================================================= */
              <motion.div
                key="reports-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {PAST_EVENTS_REPORTS.map((event, idx) => {
                  const firstImage = event.images[0] || "/images/placeholder.jpg";
                  return (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: idx * 0.05 }}
                      whileHover={{ y: -6 }}
                      onClick={() => handleSelectReport(event.id)}
                      className="cursor-pointer group flex flex-col h-full bg-slate-900/30 border border-slate-900 rounded-3xl overflow-hidden shadow-lg hover:border-accent/40 transition-all duration-300 relative"
                    >
                      {/* Card Image Header */}
                      <div className="h-56 w-full overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent z-10" />
                        <img
                          src={firstImage}
                          alt={event.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {/* Date Tag */}
                        <span className="absolute top-4 left-4 z-20 px-3 py-1 bg-black/60 text-[9px] font-bold text-accent rounded-lg border border-white/10 backdrop-blur-md uppercase tracking-wider">
                          {event.date}
                        </span>
                      </div>

                      {/* Card Content */}
                      <div className="p-6.5 flex flex-col flex-1 space-y-4 text-left">
                        <div className="space-y-1">
                          <h3 className="text-lg font-bold text-white leading-snug group-hover:text-accent transition-colors">
                            {event.title}
                          </h3>
                          {event.venue && (
                            <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider block">
                              📍 {event.venue.split(" / ")[0]}
                            </span>
                          )}
                        </div>

                        <p className="text-white/60 text-xs line-clamp-3 leading-relaxed flex-1 font-light">
                          {event.objective}
                        </p>

                        <hr className="border-slate-900/60" />

                        {/* Attendance & Coordinator summary */}
                        <div className="flex justify-between items-center text-[10px] font-bold text-accent uppercase tracking-wider">
                          <span>👥 {event.participantsCount}</span>
                          <span>🎓 {event.coordinators.length} Coordinators</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}

            {activeTab === "fiesta" && (
              /* =========================================================================
                 🎭 EVENT SCHEDULE TAB
                 ========================================================================= */
              <motion.div
                key="fiesta-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="max-w-4xl mx-auto space-y-12 text-left"
              >
                <div className="bg-slate-900/20 border border-slate-900 p-8 rounded-3xl shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
                  <h3 className="text-xl font-extrabold text-white mb-2 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-accent" /> Upcoming Pharma Fiesta 2026
                  </h3>
                  <p className="text-white/60 text-xs max-w-xl font-light leading-relaxed">
                    Below is the schedule of our upcoming cultural week. Students from D. Pharmacy, B. Pharmacy, and M. Pharmacy are invited to attend and register for the competitions.
                  </p>
                </div>

                {/* Vertical Timeline Track */}
                <div className="relative border-l border-slate-900 ml-4 md:ml-32 space-y-10 py-4">
                  {CULTURAL_EVENTS.map((event, idx) => (
                    <div key={idx} className="relative group pl-8 md:pl-12">
                      {/* Pulsing Timeline Node */}
                      <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-accent border-4 border-slate-950 shadow-md group-hover:scale-125 transition-transform duration-300" />
                      
                      {/* Time Marker Column for larger screens */}
                      <div className="hidden md:block absolute -left-32 top-1 w-24 text-right">
                        <span className="text-xs font-bold text-accent">{event.date.split(",")[0]}</span>
                        <span className="text-[9px] font-bold text-white/40 block uppercase tracking-wider mt-0.5">{event.date.split(",")[1]}</span>
                      </div>

                      {/* Event Content Box */}
                      <div className="bg-slate-900/10 border border-slate-900 hover:border-slate-800 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 space-y-4">
                        <div>
                          <span className="text-[10px] font-bold text-accent uppercase tracking-wider md:hidden block mb-1">{event.date}</span>
                          <h4 className="text-lg font-bold text-white leading-tight">{event.day}</h4>
                          <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider block mt-1">Coordinator: {event.coordinator}</span>
                        </div>
                        
                        <div className="pt-3 border-t border-slate-900">
                          <span className="text-[9px] uppercase font-bold text-accent tracking-wider block mb-2">Competitions & Highlights:</span>
                          <div className="flex flex-wrap gap-2">
                            {event.events.map((evt, index) => (
                              <span key={index} className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-950 text-[10px] font-semibold text-white/70 rounded-lg border border-slate-900">
                                ★ {evt}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "register" && (
              /* =========================================================================
                 📝 REGISTER FOR EVENTS TAB
                 ========================================================================= */
              <motion.div
                key="register-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="max-w-xl mx-auto"
              >
                {!isRegistered ? (
                  <form onSubmit={handleRegisterSubmit} className="bg-slate-900/20 border border-slate-900 p-8 md:p-10 rounded-3xl shadow-xl space-y-6 text-left relative overflow-hidden backdrop-blur-md">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
                    
                    <div>
                      <h3 className="text-xl font-extrabold text-white">Pharma-Fiesta Registration Form</h3>
                      <p className="text-xs text-white/50 mt-1 font-light">Register to participate in the upcoming cultural competitions. Limited slots per category.</p>
                    </div>

                    <div className="space-y-4 text-xs">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold text-accent mb-1.5 uppercase tracking-wide">Student Full Name</label>
                          <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Ananya Deshpande"
                            className="w-full px-4 py-3 rounded-xl border border-slate-900 bg-slate-950/40 text-white text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent placeholder:text-white/20 transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-accent mb-1.5 uppercase tracking-wide">Roll Number / ID</label>
                          <input
                            type="text"
                            required
                            value={rollNo}
                            onChange={(e) => setRollNo(e.target.value)}
                            placeholder="e.g. KB-2024-112"
                            className="w-full px-4 py-3 rounded-xl border border-slate-900 bg-slate-950/40 text-white text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent placeholder:text-white/20 transition-all"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold text-accent mb-1.5 uppercase tracking-wide">Choose Competition / Event</label>
                          <select 
                            value={selectedEvent}
                            onChange={(e) => setSelectedEvent(e.target.value)}
                            className="flex h-12 w-full rounded-xl bg-slate-950/60 text-white border border-slate-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                          >
                            <option className="bg-slate-950 text-white">Solo / Group Dance</option>
                            <option className="bg-slate-950 text-white">Solo / Duet Singing</option>
                            <option className="bg-slate-950 text-white">Traditional Ramp Walk</option>
                            <option className="bg-slate-950 text-white">Drama / Skit Night</option>
                            <option className="bg-slate-950 text-white">Scientific Poster Exhibition</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-accent mb-1.5 uppercase tracking-wide">Performance Type</label>
                          <select 
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="flex h-12 w-full rounded-xl bg-slate-950/60 text-white border border-slate-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                          >
                            <option className="bg-slate-950 text-white">Solo Performance</option>
                            <option className="bg-slate-950 text-white">Group / Duet Performance</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={!isFormValid}
                      className={`cursor-pointer w-full py-4 rounded-xl text-slate-900 text-sm font-bold flex items-center justify-center gap-2 transition-all duration-300 ${
                        isFormValid
                          ? "bg-gradient-to-r from-accent to-[#d9c572] hover:opacity-95 shadow-md shadow-accent/20"
                          : "bg-slate-900 text-slate-500 border border-slate-900 cursor-not-allowed"
                      }`}
                    >
                      <Send className="w-4.5 h-4.5" /> Submit Event RSVP
                    </button>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-slate-900/20 border border-slate-900 p-8 md:p-10 rounded-3xl shadow-xl relative text-center space-y-6 overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-44 h-44 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

                    <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto border border-accent/20 shadow-sm text-accent">
                      <CheckCircle className="w-9 h-9" />
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-white">Registration Completed</h3>
                      <p className="text-xs text-white/50 mt-1 max-w-xs mx-auto font-light">Your participation details are saved in the cultural ledger catalog. Prepare your props/presentation materials!</p>
                    </div>

                    <button
                      onClick={handleResetForm}
                      className="cursor-pointer w-full py-3 px-4 bg-gradient-to-r from-accent to-[#d9c572] text-slate-900 hover:opacity-95 rounded-xl text-xs font-bold transition-all"
                    >
                      New Registration
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Event Showcase Modal Overlay */}
          <AnimatePresence>
            {isDetailOpen && (() => {
              const event = PAST_EVENTS_REPORTS.find(e => e.id === selectedReportId);
              if (!event) return null;
              return (
                <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
                  {/* Backdrop */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsDetailOpen(false)}
                    className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
                  />

                  {/* Modal Content */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 30 }}
                    transition={{ type: "spring", damping: 25, stiffness: 350 }}
                    className="relative w-full max-w-5xl bg-slate-950 border border-slate-900 rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col text-left"
                  >
                    {/* Header block with close button */}
                    <div className="p-6 md:p-8 bg-gradient-to-r from-slate-900 to-slate-950 border-b border-slate-900/60 text-white flex justify-between items-center shrink-0">
                      <div>
                        <span className="inline-block px-3 py-1 bg-accent/10 text-accent font-bold text-[9px] uppercase tracking-wider rounded-full border border-accent/20 mb-2">
                          {event.date}
                        </span>
                        <h2 className="text-xl md:text-2xl lg:text-3xl font-extrabold tracking-tight leading-none text-white">{event.title}</h2>
                        {event.venue && <p className="text-xs text-white/50 font-medium mt-1.5">📍 {event.venue}</p>}
                      </div>
                      <button
                        onClick={() => setIsDetailOpen(false)}
                        className="cursor-pointer p-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors shrink-0"
                      >
                        <X className="h-6 w-6" />
                      </button>
                    </div>

                    {/* Scrollable Detail Body */}
                    <div className="p-6 md:p-8 overflow-y-auto space-y-8 flex-1 text-sm text-white/80">
                      
                      {/* KPI Badges Panel */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4.5 bg-slate-900/40 border border-slate-900/60 rounded-2xl">
                          <span className="text-[9px] uppercase font-bold text-accent tracking-wider block">Student Attendance</span>
                          <div className="text-lg md:text-xl lg:text-2xl font-black text-white mt-1 tracking-tight">{event.participantsCount}</div>
                        </div>
                        <div className="p-4.5 bg-slate-900/40 border border-slate-900/60 rounded-2xl">
                          <span className="text-[9px] uppercase font-bold text-accent tracking-wider block">Faculty Support</span>
                          <div className="text-lg md:text-xl lg:text-2xl font-black text-white mt-1 tracking-tight">{event.staffCount}</div>
                        </div>
                      </div>

                      {/* Core Objective Card */}
                      <div className="p-5.5 bg-accent/5 border-l-4 border-accent rounded-r-2xl space-y-1">
                        <span className="text-[10px] uppercase font-bold text-accent tracking-wider block">Activity Objective</span>
                        <p className="text-white text-sm font-medium leading-relaxed italic">{event.objective}</p>
                      </div>

                      {/* Report Summary Narrative */}
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider">Activity Summary Report</h4>
                        <p className="text-white/70 text-sm leading-relaxed whitespace-pre-line font-light">{event.summary}</p>
                      </div>

                      {/* Photo Gallery Grid */}
                      {event.images.length > 0 && (
                        <div className="space-y-3.5">
                          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Photo Gallery ({event.images.length} Photos)</h4>
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
                            {event.images.map((imgUrl, i) => (
                              <motion.div
                                key={i}
                                whileHover={{ scale: 1.04 }}
                                onClick={() => setLightboxImage(imgUrl)}
                                className="cursor-pointer aspect-square rounded-xl overflow-hidden bg-slate-900 border border-slate-900 relative group"
                              >
                                <img src={imgUrl} alt={`${event.title} Photo ${i+1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300">
                                  <span className="text-[10px] font-bold text-white bg-slate-950/80 px-2.5 py-1.5 rounded-lg border border-white/10 uppercase tracking-wider">Expand</span>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Dignitaries & Coordinators info */}
                      <div className="pt-6 border-t border-slate-900/80 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-white/50">
                        {event.guest && (
                          <div>
                            <span className="font-bold text-[10px] text-white uppercase tracking-wide block mb-1">Dignitaries Present</span>
                            <p className="leading-relaxed font-light">{event.guest}</p>
                          </div>
                        )}
                        <div>
                          <span className="font-bold text-[10px] text-white uppercase tracking-wide block mb-1">Activity Coordinators</span>
                          <div className="flex flex-wrap gap-1.5 mt-1.5">
                            {event.coordinators.map((coord, i) => (
                              <span key={i} className="inline-block px-2.5 py-1 bg-slate-900 rounded-md text-[10px] font-bold text-white border border-slate-800/80">
                                {coord}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                    </div>
                  </motion.div>
                </div>
              );
            })()}
          </AnimatePresence>

          {/* Fullscreen Lightbox Modal */}
          <AnimatePresence>
            {lightboxImage && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
                <button 
                  onClick={() => setLightboxImage(null)}
                  className="absolute top-4 right-4 text-white hover:text-accent p-2 rounded-full hover:bg-white/10 transition-all cursor-pointer"
                >
                  <X className="w-8 h-8" />
                </button>
                <motion.img 
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  src={lightboxImage} 
                  alt="Fullscreen Showcase View" 
                  className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl select-none" 
                />
              </div>
            )}
          </AnimatePresence>

        </div>
      </section>
    </AppLayout>
  );
}
