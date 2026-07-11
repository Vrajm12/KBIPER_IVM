import { AppLayout } from "@/components/layout/AppLayout";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { 
  Calendar as CalendarIcon, 
  FileDown, 
  BookOpen, 
  CheckCircle2, 
  Award,
  Sparkles,
  Trophy,
  Sun,
  Flame,
  FileCheck
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CalendarEvent {
  srNo: string;
  activity: string;
  schedule: string;
  category: "academic" | "exam" | "activity" | "holiday" | "review";
}

const ODD_SEM_EVENTS: CalendarEvent[] = [
  { srNo: "1", activity: "Commencement of Classes", schedule: "01 August 2026 (F.Y. as per CET Schedule)", category: "academic" },
  { srNo: "2", activity: "Orientation / Induction Programme (First Year)", schedule: "First Week of August 2026", category: "activity" },
  { srNo: "3", activity: "Course Allocation & Academic Planning", schedule: "01–03 August 2026", category: "academic" },
  { srNo: "4", activity: "Internal Assessment – I", schedule: "Second Week of September 2026", category: "exam" },
  { srNo: "5", activity: "Teacher-Guardian / Parent Interaction", schedule: "Third Week of September 2026", category: "academic" },
  { srNo: "6", activity: "Mid Semester Review", schedule: "Last Week of September 2026", category: "review" },
  { srNo: "7", activity: "Internal Assessment – II", schedule: "Third Week of October 2026", category: "exam" },
  { srNo: "8", activity: "Co-curricular & Extracurricular Activities", schedule: "Throughout Semester", category: "activity" },
  { srNo: "9", activity: "Industrial Visit / Field Visit", schedule: "September–November 2026", category: "activity" },
  { srNo: "10", activity: "Guest Lectures / Workshops / Seminars", schedule: "Throughout Semester", category: "activity" },
  { srNo: "11", activity: "Practical Submission", schedule: "Last Week of November 2026", category: "academic" },
  { srNo: "12", activity: "Internal Assessment – III (if applicable)", schedule: "Last Week of November 2026", category: "exam" },
  { srNo: "13", activity: "End Semester Practical Examination", schedule: "December 2026", category: "exam" },
  { srNo: "14", activity: "End Semester Theory Examination", schedule: "As per University / MSBTE Schedule", category: "exam" },
  { srNo: "15", activity: "Declaration of Semester Completion", schedule: "After University / MSBTE Examinations", category: "academic" }
];

const EVEN_SEM_EVENTS: CalendarEvent[] = [
  { srNo: "1", activity: "Commencement of Classes", schedule: "January 2027 (As per University Notification)", category: "academic" },
  { srNo: "2", activity: "Internal Assessment – I", schedule: "February 2027", category: "exam" },
  { srNo: "3", activity: "Teacher-Guardian / Parent Interaction", schedule: "February 2027", category: "academic" },
  { srNo: "4", activity: "Internal Assessment – II", schedule: "March 2027", category: "exam" },
  { srNo: "5", activity: "Industrial Visit / Training / Project Activities", schedule: "February–April 2027", category: "activity" },
  { srNo: "6", activity: "Guest Lectures / Workshops / Seminars", schedule: "Throughout Semester", category: "activity" },
  { srNo: "7", activity: "Annual Sports Meet", schedule: "3rd Week of January 2027", category: "activity" },
  { srNo: "8", activity: "Annual Cultural Event & Annual Day Celebration", schedule: "4th Week of January 2027", category: "activity" },
  { srNo: "9", activity: "Practical Submission", schedule: "April 2027", category: "academic" },
  { srNo: "10", activity: "Internal Assessment – III (if applicable)", schedule: "April 2027", category: "exam" },
  { srNo: "11", activity: "End Semester Practical Examination", schedule: "May 2027", category: "exam" },
  { srNo: "12", activity: "End Semester Theory Examination", schedule: "As per University Schedule", category: "exam" },
  { srNo: "13", activity: "Summer Vacation", schedule: "After Completion of University Examination", category: "holiday" }
];

export default function AcademicCalendar() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"odd" | "even">("odd");

  const handleDownload = () => {
    toast({
      title: "Downloading Calendar",
      description: "Downloading the official Academic Calendar for A.Y. 2026-27...",
    });
    const link = document.createElement("a");
    link.href = "/documents/Academic_Calendar_2026_27.docx";
    link.download = "Academic_Calendar_2026_27.docx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getCategoryStyles = (category: CalendarEvent["category"]) => {
    switch (category) {
      case "academic":
        return {
          bg: "bg-blue-50 border-blue-100 text-blue-800",
          badge: "bg-blue-100 text-blue-800",
          icon: <BookOpen className="w-4 h-4 text-blue-600" />
        };
      case "exam":
        return {
          bg: "bg-red-50 border-red-100 text-red-800",
          badge: "bg-red-100 text-red-800",
          icon: <FileCheck className="w-4 h-4 text-red-600" />
        };
      case "activity":
        return {
          bg: "bg-emerald-50 border-emerald-100 text-emerald-800",
          badge: "bg-emerald-100 text-emerald-800",
          icon: <Sparkles className="w-4 h-4 text-emerald-600" />
        };
      case "holiday":
        return {
          bg: "bg-amber-50 border-amber-100 text-amber-800",
          badge: "bg-amber-100 text-amber-800",
          icon: <Sun className="w-4 h-4 text-amber-600" />
        };
      case "review":
        return {
          bg: "bg-purple-50 border-purple-100 text-purple-800",
          badge: "bg-purple-100 text-purple-800",
          icon: <Award className="w-4 h-4 text-purple-600" />
        };
    }
  };

  const activeEvents = activeTab === "odd" ? ODD_SEM_EVENTS : EVEN_SEM_EVENTS;

  return (
    <AppLayout>
      {/* Hero Section */}
      <section className="bg-primary text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-700/15 via-primary to-[#011a2a]" />
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '30px 30px' }} />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-white/10 backdrop-blur-md">
              <CalendarIcon className="w-7 h-7 text-accent animate-pulse" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
              Academic <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#e6d080]">Calendar</span>
            </h1>
            <p className="text-base md:text-lg text-white/80 font-light max-w-2xl mx-auto">
              Stay aligned with academic milestones, sessional schedules, and co-curricular programs for the Academic Year 2026-27.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Section */}
      <section className="py-12 md:py-20 bg-background min-h-[60vh]">
        <div className="container mx-auto px-4 max-w-4xl">
          
          {/* Download Box */}
          <div className="mb-12 bg-white border border-muted p-6 md:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.01)] flex flex-col md:flex-row items-center justify-between gap-6 hover:border-accent/40 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center border border-primary/10 text-primary shrink-0">
                <FileDown className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-primary leading-tight">Official Academic Calendar 2026-27</h3>
                <p className="text-xs text-muted-foreground mt-1 font-medium">Download the official MS Word (Docx) copy of the approved schedule.</p>
              </div>
            </div>
            <button
              onClick={handleDownload}
              className="cursor-pointer w-full md:w-auto inline-flex items-center justify-center gap-2 px-5.5 py-3 bg-primary hover:bg-primary/95 text-white text-xs font-bold rounded-xl transition-all duration-300 shadow-md shadow-primary/10 hover:scale-[1.01] shrink-0"
            >
              <FileDown className="w-4 h-4 text-accent" /> Download Word Document (15 KB)
            </button>
          </div>

          {/* Odd/Even Tabs */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex p-1.5 bg-muted/80 backdrop-blur rounded-2xl border border-muted/50 shadow-sm gap-1.5">
              <button
                onClick={() => setActiveTab("odd")}
                className={`cursor-pointer px-6 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 ${
                  activeTab === "odd" 
                    ? "bg-primary text-white shadow-md" 
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                Odd Semester (Aug–Dec 2026)
              </button>
              <button
                onClick={() => setActiveTab("even")}
                className={`cursor-pointer px-6 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 ${
                  activeTab === "even" 
                    ? "bg-primary text-white shadow-md" 
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                Even Semester (Jan–May 2027)
              </button>
            </div>
          </div>

          {/* Timeline View */}
          <div className="relative border-l border-muted pl-6 md:pl-10 ml-4 md:ml-6 space-y-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {activeEvents.map((event, idx) => {
                  const style = getCategoryStyles(event.category);
                  return (
                    <motion.div
                      key={event.srNo}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.03 }}
                      className="relative group"
                    >
                      {/* Left Dot */}
                      <span className="absolute -left-[35px] md:-left-[51px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-accent flex items-center justify-center z-10 group-hover:scale-125 transition-transform duration-300 shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      </span>

                      {/* Card block */}
                      <div className="bg-white border border-muted p-5 md:p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.01)] hover:border-accent/30 hover:shadow-[0_12px_45px_rgb(0,0,0,0.04)] transition-all duration-500 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center shrink-0">
                            <span className="text-xs font-black text-primary">{event.srNo}</span>
                          </div>
                          <div>
                            <h4 className="text-sm font-extrabold text-primary leading-snug group-hover:text-accent transition-colors">
                              {event.activity}
                            </h4>
                            <div className="flex flex-wrap items-center gap-2 mt-1.5">
                              <span className={`px-2.5 py-0.5 rounded-full text-[9px] uppercase tracking-wider font-extrabold ${style.badge}`}>
                                {event.category}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Date schedule badge */}
                        <div className="flex items-center gap-2 px-4.5 py-2.5 rounded-xl border border-muted bg-muted/30 text-xs font-bold text-primary self-start md:self-auto max-w-full">
                          {style.icon}
                          <span className="truncate">{event.schedule}</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </section>
    </AppLayout>
  );
}
