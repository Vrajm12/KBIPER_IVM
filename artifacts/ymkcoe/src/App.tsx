import { lazy, Suspense } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// Lazy load all pages
const NotFound = lazy(() => import("@/pages/not-found"));
const Home = lazy(() => import("@/pages/home"));
const About = lazy(() => import("@/pages/about"));
const Courses = lazy(() => import("@/pages/courses"));
const Faculty = lazy(() => import("@/pages/faculty"));
const Admissions = lazy(() => import("@/pages/admissions"));
const CheckEligibility = lazy(() => import("@/pages/check-eligibility"));
const Placements = lazy(() => import("@/pages/placements"));
const PlacementsMessage = lazy(() => import("@/pages/placements/message"));
const PlacementsTraining = lazy(() => import("@/pages/placements/training"));
const PlacementsCell = lazy(() => import("@/pages/placements/cell"));
const PlacementsIndustrialVisit = lazy(() => import("@/pages/placements/industrial-visit"));
const PlacementsMOUs = lazy(() => import("@/pages/placements/mous"));
const PlacementsRecruiters = lazy(() => import("@/pages/placements/recruiters"));
const Rnd = lazy(() => import("@/pages/rnd"));
const News = lazy(() => import("@/pages/news"));
const Media = lazy(() => import("@/pages/media"));
const Contact = lazy(() => import("@/pages/contact"));
const AdminLogin = lazy(() => import("@/pages/admin-login"));
const AdminDashboard = lazy(() => import("@/pages/admin-dashboard"));

const DepartmentalInfo = lazy(() => import("@/pages/academics/departmental-info"));
const Syllabus = lazy(() => import("@/pages/academics/syllabus"));
const AcademicCalendar = lazy(() => import("@/pages/academics/academic-calendar"));
const Results = lazy(() => import("@/pages/academics/results"));
const Library = lazy(() => import("@/pages/library"));
const Feedback = lazy(() => import("@/pages/feedback"));

// Student Support
const AntiRagging = lazy(() => import("@/pages/support/anti-ragging"));
const ScStCell = lazy(() => import("@/pages/support/sc-st"));
const Grievance = lazy(() => import("@/pages/support/grievance"));
const StaffGrievance = lazy(() => import("@/pages/support/staff-grievance"));
const InternalComplaint = lazy(() => import("@/pages/support/internal-complaint"));
const StudentCouncil = lazy(() => import("@/pages/support/student-council"));
const AlumniCommittee = lazy(() => import("@/pages/support/alumni-committee"));
const AlumniMeet = lazy(() => import("@/pages/support/alumni-meet"));
const Mahadbt = lazy(() => import("@/pages/support/mahadbt"));
const CoCurricular = lazy(() => import("@/pages/support/co-curricular"));
const Cultural = lazy(() => import("@/pages/support/cultural"));
const NssEvents = lazy(() => import("@/pages/support/nss-events"));
const SportsEvents = lazy(() => import("@/pages/support/sports-events"));
const Conferences = lazy(() => import("@/pages/support/conferences"));
const Achievements = lazy(() => import("@/pages/support/achievements"));
const Newsletter = lazy(() => import("@/pages/support/newsletter"));

const NAACIQAC = lazy(() => import("@/pages/naac/iqac"));
const NAACSSR = lazy(() => import("@/pages/naac/ssr"));
const NAACLinks = lazy(() => import("@/pages/naac/links"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// A simple loading spinner fallback
const PageLoader = () => (
  <div className="flex h-screen w-full items-center justify-center bg-background">
    <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent shadow-md"></div>
  </div>
);

function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/courses" component={Courses} />
        <Route path="/faculty" component={Faculty} />
        <Route path="/admissions/check-eligibility" component={CheckEligibility} />
        <Route path="/admissions" component={Admissions} />
        <Route path="/placements" component={Placements} />
        <Route path="/placements/message" component={PlacementsMessage} />
        <Route path="/placements/training/:year" component={PlacementsTraining} />
        <Route path="/placements/cell" component={PlacementsCell} />
        <Route path="/placements/industrial-visit" component={PlacementsIndustrialVisit} />
        <Route path="/placements/mous" component={PlacementsMOUs} />
        <Route path="/placements/recruiters" component={PlacementsRecruiters} />
        <Route path="/rnd" component={Rnd} />
        <Route path="/news" component={News} />
        <Route path="/media" component={Media} />
        <Route path="/contact" component={Contact} />
        <Route path="/admin" component={AdminLogin} />
        <Route path="/admin/dashboard" component={AdminDashboard} />
        
        {/* Academics & New Routes */}
        <Route path="/academics/departmental-info" component={DepartmentalInfo} />
        <Route path="/syllabus/:course?" component={Syllabus} />
        <Route path="/calendar/:type?" component={AcademicCalendar} />
        <Route path="/results/:year?" component={Results} />
        <Route path="/library" component={Library} />
        <Route path="/feedback" component={Feedback} />

        {/* Student Support Routes */}
        <Route path="/support/anti-ragging" component={AntiRagging} />
        <Route path="/support/sc-st" component={ScStCell} />
        <Route path="/support/grievance" component={Grievance} />
        <Route path="/support/staff-grievance" component={StaffGrievance} />
        <Route path="/support/internal-complaint" component={InternalComplaint} />
        <Route path="/support/student-council" component={StudentCouncil} />
        <Route path="/support/alumni-committee" component={AlumniCommittee} />
        <Route path="/support/alumni-meet" component={AlumniMeet} />
        <Route path="/support/mahadbt" component={Mahadbt} />
        <Route path="/support/co-curricular" component={CoCurricular} />
        <Route path="/support/cultural" component={Cultural} />
        <Route path="/support/nss-events" component={NssEvents} />
        <Route path="/support/sports-events" component={SportsEvents} />
        <Route path="/support/conferences" component={Conferences} />
        <Route path="/support/achievements" component={Achievements} />
        <Route path="/support/newsletter" component={Newsletter} />
        
        <Route path="/naac/iqac" component={NAACIQAC} />
        <Route path="/naac/ssr" component={NAACSSR} />
        <Route path="/naac/links" component={NAACLinks} />

        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
