import { AppLayout } from "@/components/layout/AppLayout";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useLocation, Link } from "wouter";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Download, 
  BookOpen, 
  FileText, 
  Award, 
  Sun,
  History, 
  Sparkles, 
  CheckCircle2, 
  ChevronLeft,
  ChevronRight,
  Info,
  Timer,
  ExternalLink
} from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface AcademicEvent {
  id: string;
  title: string;
  desc: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  dateDisplay: string;
  time: string;
  location: string;
  category: "academic" | "exam" | "activity" | "holiday";
}

interface ArchiveDoc {
  year: string;
  title: string;
  releaseDate: string;
  fileSize: string;
}

const EVENTS_DATABASE: AcademicEvent[] = [
  {
    id: "1",
    title: "Commencement of Classes (Odd Semesters)",
    desc: "Start of classroom lectures and laboratory practicals for B.Pharm Sem III, V, VII and M.Pharm Sem III.",
    startDate: "2025-08-04",
    endDate: "2025-08-04",
    dateDisplay: "Aug 04, 2025",
    time: "09:30 AM",
    location: "Main Campus Lectures Halls",
    category: "academic"
  },
  {
    id: "2",
    title: "Commencement of Classes (B.Pharm Sem I & D.Pharm)",
    desc: "Welcome orientation program, student registrations, and commencement of introductory classes for first-year courses.",
    startDate: "2025-08-18",
    endDate: "2025-08-18",
    dateDisplay: "Aug 18, 2025",
    time: "10:00 AM",
    location: "Auditorium / Seminar Hall",
    category: "academic"
  },
  {
    id: "3",
    title: "World Pharmacist Day Celebrations",
    desc: "National health awareness campaigns, blood donation camp, and clinical counseling stalls managed by student council.",
    startDate: "2025-09-25",
    endDate: "2025-09-25",
    dateDisplay: "Sep 25, 2025",
    time: "09:00 AM onwards",
    location: "Campus Ground & Local Town",
    category: "activity"
  },
  {
    id: "4",
    title: "First Sessional Examinations (Odd Semesters)",
    desc: "First continuous sessional internal assessments including theory tests and practical evaluations for all years.",
    startDate: "2025-10-06",
    endDate: "2025-10-11",
    dateDisplay: "Oct 06 - Oct 11, 2025",
    time: "As per exam timetable",
    location: "Exam Halls & Laboratories",
    category: "exam"
  },
  {
    id: "5",
    title: "National Pharmacy Week (NPW) Celebrations",
    desc: "Academic workshops, research poster presentations, pharmaceutical quiz championships, and sports tournaments.",
    startDate: "2025-11-03",
    endDate: "2025-11-08",
    dateDisplay: "Nov 03 - Nov 08, 2025",
    time: "Full Day Schedule",
    location: "College Campus",
    category: "activity"
  },
  {
    id: "6",
    title: "Diwali Vacation Break",
    desc: "College closed for mid-term festive break for students and academic faculty.",
    startDate: "2025-11-10",
    endDate: "2025-11-15",
    dateDisplay: "Nov 10 - Nov 15, 2025",
    time: "Vacation",
    location: "Off-Campus",
    category: "holiday"
  },
  {
    id: "7",
    title: "Second Sessional Examinations (Odd Semesters)",
    desc: "Final continuous sessional internal assessments before the university semester examinations.",
    startDate: "2025-12-08",
    endDate: "2025-12-13",
    dateDisplay: "Dec 08 - Dec 13, 2025",
    time: "As per exam timetable",
    location: "Exam Halls & Laboratories",
    category: "exam"
  },
  {
    id: "8",
    title: "University End-Semester Examinations (Odd Semesters)",
    desc: "DBATU university end-semester theoretical and practical examinations for B.Pharm and M.Pharm.",
    startDate: "2025-12-22",
    endDate: "2026-01-03",
    dateDisplay: "Dec 22, 2025 - Jan 03, 2026",
    time: "09:30 AM / 02:00 PM Slots",
    location: "Exam Center (Main Block)",
    category: "exam"
  },
  {
    id: "9",
    title: "Commencement of Classes (Even Semesters)",
    desc: "Classes commence for B.Pharm Sem II, IV, VI, VIII and M.Pharm Sem II.",
    startDate: "2026-01-12",
    endDate: "2026-01-12",
    dateDisplay: "Jan 12, 2026",
    time: "09:30 AM",
    location: "Main Campus Lecture Halls",
    category: "academic"
  },
  {
    id: "10",
    title: "Annual Sports & Cultural Festival 'Spandan 2026'",
    desc: "Inter-collegiate sports meet, stage performances, street plays, and cultural competitions.",
    startDate: "2026-02-16",
    endDate: "2026-02-21",
    dateDisplay: "Feb 16 - Feb 21, 2026",
    time: "08:30 AM to 06:00 PM",
    location: "College Stadium & Auditorium",
    category: "activity"
  },
  {
    id: "11",
    title: "First Sessional Examinations (Even Semesters)",
    desc: "First continuous sessional internal evaluation for B.Pharm and M.Pharm even semester courses.",
    startDate: "2026-03-09",
    endDate: "2026-03-14",
    dateDisplay: "Mar 09 - Mar 14, 2026",
    time: "As per exam timetable",
    location: "Exam Halls & Laboratories",
    category: "exam"
  },
  {
    id: "12",
    title: "Educational Industrial Visit",
    desc: "One-day practical industrial plant visit for B.Pharm Third Year students to understand GMP pharmaceutical manufacturing.",
    startDate: "2026-04-07",
    endDate: "2026-04-07",
    dateDisplay: "Apr 07, 2026",
    time: "07:00 AM to 05:00 PM",
    location: "Pharma Manufacturing Facility, Pune",
    category: "academic"
  },
  {
    id: "13",
    title: "Second Sessional Examinations (Even Semesters)",
    desc: "Final internal sessional evaluation and submission of journals and laboratory project work.",
    startDate: "2026-05-11",
    endDate: "2026-05-16",
    dateDisplay: "May 11 - May 16, 2026",
    time: "As per exam timetable",
    location: "Exam Halls & Laboratories",
    category: "exam"
  },
  {
    id: "14",
    title: "University End-Semester Examinations (Even Semesters)",
    desc: "DBATU university end-semester theoretical papers and clinical laboratory examinations.",
    startDate: "2026-06-08",
    endDate: "2026-06-20",
    dateDisplay: "Jun 08 - Jun 20, 2026",
    time: "09:30 AM / 02:00 PM Slots",
    location: "Exam Center (Main Block)",
    category: "exam"
  },
  {
    id: "15",
    title: "Semester End Break & Summer Internships",
    desc: "Summer vacation period and mandatory hospital/industrial pharmacy internship training (150 Hours) for third-year students.",
    startDate: "2026-06-22",
    endDate: "2026-07-18",
    dateDisplay: "Jun 22 - Jul 18, 2026",
    time: "Internship Hours",
    location: "Approved Hospitals & Factories",
    category: "holiday"
  },
  // ==================== ACADEMIC YEAR 2026-27 ====================
  {
    id: "16",
    title: "Commencement of Classes (Odd Semesters)",
    desc: "Start of classroom lectures and laboratory practicals for B.Pharm Sem III, V, VII and M.Pharm Sem III.",
    startDate: "2026-08-03",
    endDate: "2026-08-03",
    dateDisplay: "Aug 03, 2026",
    time: "09:30 AM",
    location: "Main Campus Lectures Halls",
    category: "academic"
  },
  {
    id: "17",
    title: "Commencement of Classes (B.Pharm Sem I & D.Pharm)",
    desc: "Welcome orientation program, student registrations, and commencement of introductory classes for first-year courses.",
    startDate: "2026-08-17",
    endDate: "2026-08-17",
    dateDisplay: "Aug 17, 2026",
    time: "10:00 AM",
    location: "Auditorium / Seminar Hall",
    category: "academic"
  },
  {
    id: "18",
    title: "World Pharmacist Day Celebrations",
    desc: "National health awareness campaigns, blood donation camp, and clinical counseling stalls managed by student council.",
    startDate: "2026-09-25",
    endDate: "2026-09-25",
    dateDisplay: "Sep 25, 2026",
    time: "09:00 AM onwards",
    location: "Campus Ground & Local Town",
    category: "activity"
  },
  {
    id: "19",
    title: "First Sessional Examinations (Odd Semesters)",
    desc: "First continuous sessional internal assessments including theory tests and practical evaluations for all years.",
    startDate: "2026-10-05",
    endDate: "2026-10-10",
    dateDisplay: "Oct 05 - Oct 10, 2026",
    time: "As per exam timetable",
    location: "Exam Halls & Laboratories",
    category: "exam"
  },
  {
    id: "20",
    title: "National Pharmacy Week (NPW) Celebrations",
    desc: "Academic workshops, research poster presentations, pharmaceutical quiz championships, and sports tournaments.",
    startDate: "2026-11-02",
    endDate: "2026-11-07",
    dateDisplay: "Nov 02 - Nov 07, 2026",
    time: "Full Day Schedule",
    location: "College Campus",
    category: "activity"
  },
  {
    id: "21",
    title: "Diwali Vacation Break",
    desc: "College closed for mid-term festive break for students and academic faculty.",
    startDate: "2026-11-09",
    endDate: "2026-11-14",
    dateDisplay: "Nov 09 - Nov 14, 2026",
    time: "Vacation",
    location: "Off-Campus",
    category: "holiday"
  },
  {
    id: "22",
    title: "Second Sessional Examinations (Odd Semesters)",
    desc: "Final continuous sessional internal assessments before the university semester examinations.",
    startDate: "2026-12-07",
    endDate: "2026-12-12",
    dateDisplay: "Dec 07 - Dec 12, 2026",
    time: "As per exam timetable",
    location: "Exam Halls & Laboratories",
    category: "exam"
  },
  {
    id: "23",
    title: "University End-Semester Examinations (Odd Semesters)",
    desc: "DBATU university end-semester theoretical and practical examinations for B.Pharm and M.Pharm.",
    startDate: "2026-12-21",
    endDate: "2027-01-02",
    dateDisplay: "Dec 21, 2026 - Jan 02, 2027",
    time: "09:30 AM / 02:00 PM Slots",
    location: "Exam Center (Main Block)",
    category: "exam"
  },
  {
    id: "24",
    title: "Commencement of Classes (Even Semesters)",
    desc: "Classes commence for B.Pharm Sem II, IV, VI, VIII and M.Pharm Sem II.",
    startDate: "2027-01-11",
    endDate: "2027-01-11",
    dateDisplay: "Jan 11, 2027",
    time: "09:30 AM",
    location: "Main Campus Lecture Halls",
    category: "academic"
  },
  {
    id: "25",
    title: "Annual Sports & Cultural Festival 'Spandan 2027'",
    desc: "Inter-collegiate sports meet, stage performances, street plays, and cultural competitions.",
    startDate: "2027-02-15",
    endDate: "2027-02-20",
    dateDisplay: "Feb 15 - Feb 20, 2027",
    time: "08:30 AM to 06:00 PM",
    location: "College Stadium & Auditorium",
    category: "activity"
  },
  {
    id: "26",
    title: "First Sessional Examinations (Even Semesters)",
    desc: "First continuous sessional internal evaluation for B.Pharm and M.Pharm even semester courses.",
    startDate: "2027-03-08",
    endDate: "2027-03-13",
    dateDisplay: "Mar 08 - Mar 13, 2027",
    time: "As per exam timetable",
    location: "Exam Halls & Laboratories",
    category: "exam"
  },
  {
    id: "27",
    title: "Educational Industrial Visit",
    desc: "One-day practical industrial plant visit for B.Pharm Third Year students to understand GMP pharmaceutical manufacturing.",
    startDate: "2027-04-06",
    endDate: "2027-04-06",
    dateDisplay: "Apr 06, 2027",
    time: "07:00 AM to 05:00 PM",
    location: "Pharma Manufacturing Facility, Pune",
    category: "academic"
  },
  {
    id: "28",
    title: "Second Sessional Examinations (Even Semesters)",
    desc: "Final internal sessional evaluation and submission of journals and laboratory project work.",
    startDate: "2027-05-10",
    endDate: "2027-05-15",
    dateDisplay: "May 10 - May 15, 2027",
    time: "As per exam timetable",
    location: "Exam Halls & Laboratories",
    category: "exam"
  },
  {
    id: "29",
    title: "University End-Semester Examinations (Even Semesters)",
    desc: "DBATU university end-semester theoretical papers and clinical laboratory examinations.",
    startDate: "2027-06-07",
    endDate: "2027-06-19",
    dateDisplay: "Jun 07 - Jun 19, 2027",
    time: "09:30 AM / 02:00 PM Slots",
    location: "Exam Center (Main Block)",
    category: "exam"
  },
  {
    id: "30",
    title: "Semester End Break & Summer Internships",
    desc: "Summer vacation period and mandatory hospital/industrial pharmacy internship training (150 Hours) for third-year students.",
    startDate: "2027-06-21",
    endDate: "2027-07-17",
    dateDisplay: "Jun 21 - Jul 17, 2027",
    time: "Internship Hours",
    location: "Approved Hospitals & Factories",
    category: "holiday"
  },
  // ==================== ACADEMIC YEAR 2027-28 ====================
  {
    id: "31",
    title: "Commencement of Classes (Odd Semesters)",
    desc: "Start of classroom lectures and laboratory practicals for B.Pharm Sem III, V, VII and M.Pharm Sem III.",
    startDate: "2027-08-02",
    endDate: "2027-08-02",
    dateDisplay: "Aug 02, 2027",
    time: "09:30 AM",
    location: "Main Campus Lectures Halls",
    category: "academic"
  },
  {
    id: "32",
    title: "Commencement of Classes (B.Pharm Sem I & D.Pharm)",
    desc: "Welcome orientation program, student registrations, and commencement of introductory classes for first-year courses.",
    startDate: "2027-08-16",
    endDate: "2027-08-16",
    dateDisplay: "Aug 16, 2027",
    time: "10:00 AM",
    location: "Auditorium / Seminar Hall",
    category: "academic"
  },
  {
    id: "33",
    title: "World Pharmacist Day Celebrations",
    desc: "National health awareness campaigns, blood donation camp, and clinical counseling stalls managed by student council.",
    startDate: "2027-09-25",
    endDate: "2027-09-25",
    dateDisplay: "Sep 25, 2027",
    time: "09:00 AM onwards",
    location: "Campus Ground & Local Town",
    category: "activity"
  },
  {
    id: "34",
    title: "First Sessional Examinations (Odd Semesters)",
    desc: "First continuous sessional internal assessments including theory tests and practical evaluations for all years.",
    startDate: "2027-10-04",
    endDate: "2027-10-09",
    dateDisplay: "Oct 04 - Oct 09, 2027",
    time: "As per exam timetable",
    location: "Exam Halls & Laboratories",
    category: "exam"
  },
  {
    id: "35",
    title: "National Pharmacy Week (NPW) Celebrations",
    desc: "Academic workshops, research poster presentations, pharmaceutical quiz championships, and sports tournaments.",
    startDate: "2027-11-01",
    endDate: "2027-11-06",
    dateDisplay: "Nov 01 - Nov 06, 2027",
    time: "Full Day Schedule",
    location: "College Campus",
    category: "activity"
  },
  {
    id: "36",
    title: "Diwali Vacation Break",
    desc: "College closed for mid-term festive break for students and academic faculty.",
    startDate: "2027-11-08",
    endDate: "2027-11-13",
    dateDisplay: "Nov 08 - Nov 13, 2027",
    time: "Vacation",
    location: "Off-Campus",
    category: "holiday"
  },
  {
    id: "37",
    title: "Second Sessional Examinations (Odd Semesters)",
    desc: "Final continuous sessional internal assessments before the university semester examinations.",
    startDate: "2027-12-06",
    endDate: "2027-12-11",
    dateDisplay: "Dec 06 - Dec 11, 2027",
    time: "As per exam timetable",
    location: "Exam Halls & Laboratories",
    category: "exam"
  },
  {
    id: "38",
    title: "University End-Semester Examinations (Odd Semesters)",
    desc: "DBATU university end-semester theoretical and practical examinations for B.Pharm and M.Pharm.",
    startDate: "2027-12-20",
    endDate: "2028-01-01",
    dateDisplay: "Dec 20, 2027 - Jan 01, 2028",
    time: "09:30 AM / 02:00 PM Slots",
    location: "Exam Center (Main Block)",
    category: "exam"
  },
  {
    id: "39",
    title: "Commencement of Classes (Even Semesters)",
    desc: "Classes commence for B.Pharm Sem II, IV, VI, VIII and M.Pharm Sem II.",
    startDate: "2028-01-10",
    endDate: "2028-01-10",
    dateDisplay: "Jan 10, 2028",
    time: "09:30 AM",
    location: "Main Campus Lecture Halls",
    category: "academic"
  },
  {
    id: "40",
    title: "Annual Sports & Cultural Festival 'Spandan 2028'",
    desc: "Inter-collegiate sports meet, stage performances, street plays, and cultural competitions.",
    startDate: "2028-02-14",
    endDate: "2028-02-19",
    dateDisplay: "Feb 14 - Feb 19, 2028",
    time: "08:30 AM to 06:00 PM",
    location: "College Stadium & Auditorium",
    category: "activity"
  },
  {
    id: "41",
    title: "First Sessional Examinations (Even Semesters)",
    desc: "First continuous sessional internal evaluation for B.Pharm and M.Pharm even semester courses.",
    startDate: "2028-03-06",
    endDate: "2028-03-11",
    dateDisplay: "Mar 06 - Mar 11, 2028",
    time: "As per exam timetable",
    location: "Exam Halls & Laboratories",
    category: "exam"
  },
  {
    id: "42",
    title: "Educational Industrial Visit",
    desc: "One-day practical industrial plant visit for B.Pharm Third Year students to understand GMP pharmaceutical manufacturing.",
    startDate: "2028-04-04",
    endDate: "2028-04-04",
    dateDisplay: "Apr 04, 2028",
    time: "07:00 AM to 05:00 PM",
    location: "Pharma Manufacturing Facility, Pune",
    category: "academic"
  },
  {
    id: "43",
    title: "Second Sessional Examinations (Even Semesters)",
    desc: "Final internal sessional evaluation and submission of journals and laboratory project work.",
    startDate: "2028-05-08",
    endDate: "2028-05-13",
    dateDisplay: "May 08 - May 13, 2028",
    time: "As per exam timetable",
    location: "Exam Halls & Laboratories",
    category: "exam"
  },
  {
    id: "44",
    title: "University End-Semester Examinations (Even Semesters)",
    desc: "DBATU university end-semester theoretical papers and clinical laboratory examinations.",
    startDate: "2028-06-05",
    endDate: "2028-06-17",
    dateDisplay: "Jun 05 - Jun 17, 2028",
    time: "09:30 AM / 02:00 PM Slots",
    location: "Exam Center (Main Block)",
    category: "exam"
  },
  {
    id: "45",
    title: "Semester End Break & Summer Internships",
    desc: "Summer vacation period and mandatory hospital/industrial pharmacy internship training (150 Hours) for third-year students.",
    startDate: "2028-06-19",
    endDate: "2028-07-15",
    dateDisplay: "Jun 19 - Jul 15, 2028",
    time: "Internship Hours",
    location: "Approved Hospitals & Factories",
    category: "holiday"
  }
];

const ARCHIVE_DOCUMENTS: ArchiveDoc[] = [
  {
    year: "2024-25",
    title: "Academic Calendar & Sessional Schedule (B.Pharm/M.Pharm/D.Pharm)",
    releaseDate: "June 15, 2024",
    fileSize: "1.4 MB"
  },
  {
    year: "2023-24",
    title: "Academic Calendar & Sessional Schedule (B.Pharm/M.Pharm/D.Pharm)",
    releaseDate: "June 20, 2023",
    fileSize: "1.2 MB"
  },
  {
    year: "2022-23",
    title: "Official Academic Schedule, Examinations & Co-Curricular Calendar",
    releaseDate: "June 05, 2022",
    fileSize: "1.5 MB"
  },
  {
    year: "2021-22",
    title: "Academic Calendar (DBATU Affiliated Schedule - COVID Revision)",
    releaseDate: "August 12, 2021",
    fileSize: "1.8 MB"
  },
  {
    year: "2020-21",
    title: "Academic Calendar & Online Learning Schedule Repository",
    releaseDate: "September 02, 2020",
    fileSize: "1.1 MB"
  },
  {
    year: "2019-20",
    title: "Official Academic Schedule, Holidays & Sessional Examinations",
    releaseDate: "June 10, 2019",
    fileSize: "1.3 MB"
  },
  {
    year: "2018-19",
    title: "Annual Syllabus Execution Calendar & Cultural Schedule",
    releaseDate: "June 15, 2018",
    fileSize: "980 KB"
  }
];

const MONTHS_LIST = [
  "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"
];

export default function AcademicCalendar() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const type = params.type || "current";
  const isArchive = type === "archive";

  // System reference date context: 2026-06-26
  const systemDate = useMemo(() => new Date("2026-06-26"), []);
  
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(5); // June is index 5
  const [selectedDate, setSelectedDate] = useState<Date | null>(systemDate);

  // Sync year/month selections with selectedDate or default when routing
  useEffect(() => {
    if (!isArchive) {
      setCurrentYear(systemDate.getFullYear());
      setCurrentMonth(systemDate.getMonth());
      setSelectedDate(systemDate);
    }
  }, [isArchive, systemDate]);

  const monthName = MONTHS_LIST[currentMonth];

  // Restrict navigation bounds: August 2025 to July 2028 (at least next 2 years!)
  const isPrevDisabled = currentYear === 2025 && currentMonth === 7;
  const isNextDisabled = currentYear === 2028 && currentMonth === 6;

  const handlePrevMonth = () => {
    if (isPrevDisabled) return;
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    setSelectedDate(null);
  };

  const handleNextMonth = () => {
    if (isNextDisabled) return;
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    setSelectedDate(null);
  };

  // Generate calendar days for the selected month/year grid
  const calendarDays = useMemo(() => {
    const date = new Date(currentYear, currentMonth, 1);
    const days: (Date | null)[] = [];
    
    // Day of the week for the 1st of the month (0 = Sunday, 6 = Saturday)
    const startOffset = date.getDay();
    for (let i = 0; i < startOffset; i++) {
      days.push(null);
    }
    
    // Total days in the month
    const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();
    for (let d = 1; d <= totalDays; d++) {
      days.push(new Date(currentYear, currentMonth, d));
    }
    
    return days;
  }, [currentYear, currentMonth]);

  // Safe local date parsing to avoid time zone shifts
  const getLocalDateString = (d: Date) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Check if a date has events
  const getEventsForDate = (date: Date) => {
    const dateStr = getLocalDateString(date);
    return EVENTS_DATABASE.filter(event => dateStr >= event.startDate && dateStr <= event.endDate);
  };

  // Get all events for the current active month
  const activeMonthEvents = useMemo(() => {
    return EVENTS_DATABASE.filter(event => {
      const start = new Date(event.startDate);
      const end = new Date(event.endDate);
      
      const startYear = start.getFullYear();
      const startMonth = start.getMonth();
      const endYear = end.getFullYear();
      const endMonth = end.getMonth();

      // Check if the event overlaps with the current year/month
      const monthStart = new Date(currentYear, currentMonth, 1);
      const monthEnd = new Date(currentYear, currentMonth + 1, 0);

      const eventStart = new Date(event.startDate);
      const eventEnd = new Date(event.endDate);

      return eventStart <= monthEnd && eventEnd >= monthStart;
    });
  }, [currentYear, currentMonth]);

  // Selected date events
  const selectedDateEvents = useMemo(() => {
    if (!selectedDate) return [];
    return getEventsForDate(selectedDate);
  }, [selectedDate]);

  const getEventIcon = (category: AcademicEvent["category"]) => {
    switch (category) {
      case "academic":
        return <BookOpen className="w-4 h-4" />;
      case "exam":
        return <FileText className="w-4 h-4" />;
      case "activity":
        return <Award className="w-4 h-4" />;
      case "holiday":
        return <Sun className="w-4 h-4" />;
    }
  };

  const getCategoryDotStyle = (category: AcademicEvent["category"]) => {
    switch (category) {
      case "academic":
        return "bg-blue-500 shadow-blue-500/20";
      case "exam":
        return "bg-purple-500 shadow-purple-500/20";
      case "activity":
        return "bg-amber-500 shadow-amber-500/20";
      case "holiday":
        return "bg-emerald-500 shadow-emerald-500/20";
    }
  };

  const getCategoryStyles = (category: AcademicEvent["category"]) => {
    switch (category) {
      case "academic":
        return "bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-900/10 dark:text-blue-400 dark:border-blue-800/30";
      case "exam":
        return "bg-purple-50 text-purple-700 border-purple-100 dark:bg-purple-900/10 dark:text-purple-400 dark:border-purple-800/30";
      case "activity":
        return "bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-900/10 dark:text-amber-400 dark:border-amber-800/30";
      case "holiday":
        return "bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-900/10 dark:text-emerald-400 dark:border-emerald-800/30";
    }
  };

  // Determine event status relative to June 26, 2026 context
  const getEventStatus = (event: AcademicEvent) => {
    const todayStr = "2026-06-26";
    if (todayStr > event.endDate) {
      return "Completed";
    } else if (todayStr >= event.startDate && todayStr <= event.endDate) {
      return "Active Now";
    } else {
      return "Upcoming";
    }
  };

  const handleDownload = (filename: string) => {
    toast({
      title: "Downloading Document",
      description: `Downloading ${filename}...`,
    });

    setTimeout(() => {
      toast({
        title: "Download Complete",
        description: `${filename} has been saved successfully.`,
      });
    }, 1500);
  };

  // Dynamically calculate academic year based on current selected month & year
  const dynamicAcademicYear = useMemo(() => {
    if (currentMonth >= 7) {
      return `Academic Year ${currentYear}-${String(currentYear + 1).slice(-2)}`;
    } else {
      return `Academic Year ${currentYear - 1}-${String(currentYear).slice(-2)}`;
    }
  }, [currentMonth, currentYear]);

  return (
    <AppLayout>
      {/* Hero Section */}
      <section className="bg-primary text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/15 via-primary to-[#011a2a]" />
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '30px 30px' }} />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-white/10 backdrop-blur-md">
              <CalendarIcon className="w-7 h-7 text-accent" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
              Academic <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#e6d080]">Calendar</span>
            </h1>
            <p className="text-base md:text-lg text-white/80 font-light max-w-2xl mx-auto">
              {isArchive 
                ? "Browse and download official academic calendars and sessionals schedules from previous years." 
                : "Interact with our active month planning calendar to stay updated with sessional exams, activities, and holidays."
              }
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Section */}
      <section className="py-12 bg-background min-h-[60vh] relative">
        <div className="container mx-auto px-4 max-w-6xl">
          
          {/* Calendar Toggle Controller (Current vs Archive) */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex p-1.5 bg-muted/80 backdrop-blur rounded-2xl border border-muted/50 shadow-sm gap-1">
              <button
                onClick={() => setLocation("/calendar/current")}
                className={`cursor-pointer px-5.5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 ${!isArchive ? "bg-primary text-white shadow-md" : "text-muted-foreground hover:text-primary"}`}
              >
                Academic Planner
              </button>
              <button
                onClick={() => setLocation("/calendar/archive")}
                className={`cursor-pointer px-5.5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 ${isArchive ? "bg-primary text-white shadow-md" : "text-muted-foreground hover:text-primary"}`}
              >
                Archive Repository
              </button>
            </div>
          </div>

          {!isArchive ? (
            /* =========================================================================
               CURRENT MONTH GRID CALENDAR
               ========================================================================= */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Month Calendar Grid */}
              <div className="lg:col-span-7 space-y-6">
                <div className="bg-white border border-muted rounded-3xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
                  
                  {/* Calendar Month Header Controls */}
                  <div className="flex justify-between items-center mb-6">
                    <button
                      onClick={handlePrevMonth}
                      disabled={isPrevDisabled}
                      className={`cursor-pointer p-2 rounded-xl border border-muted hover:bg-muted text-primary transition-all ${
                        isPrevDisabled ? "opacity-30 cursor-not-allowed" : ""
                      }`}
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <div className="text-center">
                      <h2 className="text-lg md:text-xl font-bold text-primary">
                        {monthName} {currentYear}
                      </h2>
                      <span className="text-[10px] uppercase font-bold text-accent tracking-widest">{dynamicAcademicYear}</span>
                    </div>
                    <button
                      onClick={handleNextMonth}
                      disabled={isNextDisabled}
                      className={`cursor-pointer p-2 rounded-xl border border-muted hover:bg-muted text-primary transition-all ${
                        isNextDisabled ? "opacity-30 cursor-not-allowed" : ""
                      }`}
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Grid of Days (headings) */}
                  <div className="grid grid-cols-7 gap-1 text-center font-bold text-muted-foreground text-xs uppercase tracking-wider mb-3 pb-2 border-b border-muted">
                    <div>Su</div>
                    <div>Mo</div>
                    <div>Tu</div>
                    <div>We</div>
                    <div>Th</div>
                    <div>Fr</div>
                    <div>Sa</div>
                  </div>

                  {/* Monthly Days Cells */}
                  <div className="grid grid-cols-7 gap-y-3.5 gap-x-1.5 text-center">
                    {calendarDays.map((day, idx) => {
                      if (!day) return <div key={`empty-${idx}`} />;
                      
                      const dayEvents = getEventsForDate(day);
                      const isToday = getLocalDateString(day) === "2026-06-26";
                      const isSelected = selectedDate && getLocalDateString(day) === getLocalDateString(selectedDate);
                      const hasEvents = dayEvents.length > 0;

                      return (
                        <div 
                          key={day.getTime()} 
                          className="flex flex-col items-center justify-center relative py-1"
                        >
                          <button
                            onClick={() => setSelectedDate(day)}
                            className={`cursor-pointer w-10 h-10 md:w-11 md:h-11 rounded-full flex flex-col items-center justify-center text-sm font-bold relative transition-all duration-200 ${
                              isSelected 
                                ? "bg-primary text-white shadow-md scale-105" 
                                : isToday
                                ? "bg-accent/15 text-accent border-2 border-accent"
                                : hasEvents
                                ? "bg-muted/60 text-primary hover:bg-muted border border-muted-border font-extrabold"
                                : "text-foreground hover:bg-muted/40 font-medium"
                            }`}
                          >
                            <span>{day.getDate()}</span>

                            {/* Today glow indicator */}
                            {isToday && !isSelected && (
                              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-accent rounded-full border border-white" />
                            )}
                          </button>

                          {/* Dots matching the event categories */}
                          {hasEvents && (
                            <div className="flex gap-1.5 mt-1.5 justify-center flex-wrap max-w-[40px]">
                              {Array.from(new Set(dayEvents.map(e => e.category))).slice(0, 3).map((cat) => (
                                <span 
                                  key={cat} 
                                  className={`w-1.5 h-1.5 rounded-full shadow-sm ${getCategoryDotStyle(cat)}`} 
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Calendar Categories Legend */}
                  <div className="mt-8 pt-6 border-t border-muted grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-semibold text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Academics
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-purple-500" /> Exams / sessionals
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Activities
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Holidays
                    </div>
                  </div>

                </div>
              </div>

              {/* Right Column: Selected Day Events + Monthly Events List */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* 1. Selected Day details */}
                <div className="bg-white border border-muted rounded-3xl p-6 md:p-7 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
                  <h3 className="text-xs font-extrabold uppercase tracking-widest text-accent mb-4">
                    Day Details: {selectedDate ? selectedDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "None Selected"}
                  </h3>

                  <AnimatePresence mode="wait">
                    {selectedDateEvents.length > 0 ? (
                      <motion.div
                        key={selectedDate?.getTime()}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-4"
                      >
                        {selectedDateEvents.map((event) => (
                          <div key={event.id} className="p-4 rounded-2xl border border-muted bg-muted/20 space-y-3.5">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getCategoryStyles(event.category)}`}>
                              {getEventIcon(event.category)} {event.category === "academic" ? "Academic Term" : event.category}
                            </span>
                            <h4 className="font-extrabold text-primary text-base leading-snug">
                              {event.title}
                            </h4>
                            <p className="text-muted-foreground text-xs leading-relaxed">
                              {event.desc}
                            </p>
                            
                            <div className="space-y-2 pt-2 border-t border-muted/50 text-xs text-muted-foreground font-semibold">
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-primary" /> {event.time}
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-primary" /> {event.location}
                              </div>
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    ) : (
                      <motion.div
                        key="no-event"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="py-10 text-center bg-muted/15 rounded-2xl border border-dashed border-muted"
                      >
                        <Info className="w-8 h-8 text-muted-foreground/50 mx-auto mb-2" />
                        <p className="text-sm font-semibold text-primary">No events scheduled</p>
                        <p className="text-xs text-muted-foreground max-w-[200px] mx-auto mt-0.5">Select a highlighted day in the grid to view detailed events.</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 2. Monthly Summary List */}
                <div className="bg-white border border-muted rounded-3xl p-6 md:p-7 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
                  <h3 className="text-xs font-extrabold uppercase tracking-widest text-primary mb-4 flex items-center justify-between">
                    <span>Events in {monthName}</span>
                    <span className="text-[10px] text-muted-foreground font-medium">{activeMonthEvents.length} Scheduled</span>
                  </h3>

                  <div className="space-y-3.5 max-h-[300px] overflow-y-auto pr-1">
                    {activeMonthEvents.length > 0 ? (
                      activeMonthEvents.map((event) => {
                        const status = getEventStatus(event);
                        return (
                          <div 
                            key={event.id}
                            onClick={() => setSelectedDate(new Date(event.startDate))}
                            className="cursor-pointer p-3.5 rounded-xl border border-muted hover:border-accent/40 bg-white hover:bg-muted/10 transition-all flex items-start justify-between gap-3 group"
                          >
                            <div>
                              <h4 className="text-xs font-extrabold text-primary group-hover:text-accent transition-colors leading-tight line-clamp-1">
                                {event.title}
                              </h4>
                              <span className="text-[10px] text-muted-foreground font-semibold block mt-1">{event.dateDisplay}</span>
                            </div>
                            <span className={`px-2 py-1 rounded-md text-[8px] font-black uppercase tracking-wider ${
                              status === "Active Now"
                                ? "bg-accent text-white"
                                : status === "Completed"
                                ? "bg-muted text-muted-foreground/60"
                                : "bg-primary/5 text-primary"
                            }`}>
                              {status}
                            </span>
                          </div>
                        );
                      })
                    ) : (
                      <div className="py-6 text-center text-muted-foreground text-xs font-medium">
                        No events scheduled for {monthName}.
                      </div>
                    )}
                  </div>
                </div>

              </div>

            </div>
          ) : (
            /* =========================================================================
               ARCHIVE TABULAR DOCUMENTS VIEW
               ========================================================================= */
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div className="bg-white border border-muted rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] overflow-hidden">
                <div className="p-6 md:p-8 border-b border-muted">
                  <h3 className="text-lg md:text-xl font-bold text-primary flex items-center gap-2">
                    <History className="w-5.5 h-5.5 text-accent" /> Historical Calendars Download Center
                  </h3>
                  <p className="text-muted-foreground text-xs md:text-sm mt-1">Download official PDF calendars and continuous evaluation schedules from past academic sessions.</p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="bg-muted/40 text-muted-foreground font-bold border-b border-muted text-xs uppercase tracking-wider">
                        <th className="py-4 px-6">Academic Year</th>
                        <th className="py-4 px-6">Document Title</th>
                        <th className="py-4 px-6">Release Date</th>
                        <th className="py-4 px-6">File Size</th>
                        <th className="py-4 px-6 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-muted text-primary font-medium">
                      {ARCHIVE_DOCUMENTS.map((doc) => (
                        <tr key={doc.year} className="hover:bg-muted/20 transition-colors group">
                          <td className="py-4 px-6 whitespace-nowrap">
                            <span className="inline-block px-3 py-1 bg-primary/5 text-primary text-xs font-extrabold rounded-md border border-primary/10">
                              {doc.year}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-sm text-primary font-bold group-hover:text-accent transition-colors">
                            {doc.title}
                          </td>
                          <td className="py-4 px-6 text-muted-foreground text-xs whitespace-nowrap">
                            {doc.releaseDate}
                          </td>
                          <td className="py-4 px-6 text-muted-foreground text-xs whitespace-nowrap">
                            {doc.fileSize}
                          </td>
                          <td className="py-4 px-6 text-right whitespace-nowrap">
                            <button
                              onClick={() => handleDownload(`${doc.year}-Academic-Calendar.pdf`)}
                              className="cursor-pointer inline-flex items-center gap-1.5 px-3.5 py-2 bg-muted hover:bg-accent hover:text-white rounded-xl text-xs font-bold text-primary transition-all duration-300"
                            >
                              <Download className="w-3.5 h-3.5" /> Download
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* NAAC details */}
              <div className="bg-muted/20 border border-muted/50 p-6 rounded-3xl flex flex-col md:flex-row gap-5 items-start md:items-center justify-between mt-8">
                <div className="space-y-1">
                  <h4 className="text-sm font-extrabold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-accent" /> NAAC / IQAC Accreditation Support
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">Archived documentation is hosted in digital table formats to meet the institutional evaluation standards of IQAC. For queries, contact administrative block.</p>
                </div>
                <Link href="/naac/iqac">
                  <span className="cursor-pointer inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:underline">
                    Visit IQAC Center <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </div>
            </motion.div>
          )}

        </div>
      </section>
    </AppLayout>
  );
}
