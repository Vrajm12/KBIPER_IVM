import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [showAdmissionDropdown, setShowAdmissionDropdown] = useState(false);
  const [showAcademicsDropdown, setShowAcademicsDropdown] = useState(false);
  const [showStudentsSupportDropdown, setShowStudentsSupportDropdown] = useState(false);
  const [showTAndPDropdown, setShowTAndPDropdown] = useState(false);
  const [showNAACDropdown, setShowNAACDropdown] = useState(false);
  
  const [lockedDropdown, setLockedDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setLockedDropdown(null);
        setShowAdmissionDropdown(false);
        setShowAcademicsDropdown(false);
        setShowStudentsSupportDropdown(false);
        setShowTAndPDropdown(false);
        setShowNAACDropdown(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);


  // Mobile state
  const [showMobileAdmission, setShowMobileAdmission] = useState(false);
  const [showMobileAcademics, setShowMobileAcademics] = useState(false);
  const [showMobileStudentsSupport, setShowMobileStudentsSupport] = useState(false);
  const [showMobileTAndP, setShowMobileTAndP] = useState(false);
  const [showMobileNAAC, setShowMobileNAAC] = useState(false);

  return (
    <header className="w-full border-b border-border bg-background shadow-sm" ref={navRef}>
      <div className="container mx-auto px-4 h-16 md:h-24 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 md:gap-4 hover:opacity-90 transition-opacity">
          <img 
            src={`${import.meta.env.BASE_URL}ymkcoe_logo.png`} 
            alt="KBIPER Logo" 
            className="h-10 md:h-12 lg:h-16 w-auto object-contain"
          />
          <div className="flex flex-col justify-center items-start text-left select-none whitespace-nowrap">
            <span className="text-[9px] md:text-[10px] lg:text-[11px] xl:text-[12px] text-muted-foreground font-medium leading-none whitespace-nowrap">
              Indrayani Vidya Mandir's
            </span>
            <span className="font-bold text-[10px] md:text-[12px] lg:text-[14px] xl:text-[16px] 2xl:text-lg text-primary uppercase tracking-wide leading-tight mt-0.5 md:mt-1 whitespace-nowrap">
              Krishnarao Bhegade Institute of
            </span>
            <span className="font-bold text-[10px] md:text-[12px] lg:text-[14px] xl:text-[16px] 2xl:text-lg text-primary uppercase tracking-wide leading-tight whitespace-nowrap">
              Pharmaceutical Education & Research
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 select-none flex-wrap justify-end">
          <Link href="/">
            <span className={`flex items-center justify-center px-1 lg:px-1.5 xl:px-2 py-2 rounded-md text-[10px] lg:text-[11px] xl:text-xs font-medium transition-colors hover:bg-muted whitespace-nowrap ${location === "/" ? "text-accent font-semibold" : "text-foreground"}`}>Home</span>
          </Link>
          <Link href="/about">
            <span className={`flex items-center justify-center px-1 lg:px-1.5 xl:px-2 py-2 rounded-md text-[10px] lg:text-[11px] xl:text-xs font-medium transition-colors hover:bg-muted whitespace-nowrap ${location.startsWith("/about") ? "text-accent font-semibold" : "text-foreground"}`}>About us</span>
          </Link>

          {/* Admission Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setShowAdmissionDropdown(true)}
            onMouseLeave={() => { if (lockedDropdown !== "admission") setShowAdmissionDropdown(false) }}
          >
            <Link href="/admissions">
              <span 
                onClick={(e) => {
                  e.preventDefault(); // allow click to toggle without navigating instantly if they want, but actually Link will navigate. Let's not prevent default to keep navigation. 
                  setLockedDropdown(lockedDropdown === "admission" ? null : "admission");
                }}
                className={`flex items-center justify-center gap-0.5 lg:gap-1 px-1 lg:px-1.5 xl:px-2 py-2 rounded-md text-[10px] lg:text-[11px] xl:text-xs font-medium transition-colors hover:bg-muted whitespace-nowrap ${location.startsWith("/admissions") ? "text-accent font-semibold" : "text-foreground"}`}>
                Admission <ChevronDown className="h-3 w-3" />
              </span>
            </Link>
            
            {showAdmissionDropdown && (
              <div className="absolute top-full left-0 w-[240px] bg-background border border-border rounded-lg shadow-lg p-2 mt-1 flex flex-col gap-1 z-50 animate-in fade-in duration-200">
                <Link href="/admissions?tab=eligibility"><span className="block px-3 py-2 rounded-md text-sm hover:bg-muted hover:text-accent cursor-pointer text-foreground" >Eligibility Criteria</span></Link>
                <Link href="/admissions?tab=documents"><span className="block px-3 py-2 rounded-md text-sm hover:bg-muted hover:text-accent cursor-pointer text-foreground" >Documents Required</span></Link>
                <Link href="/admissions?tab=process"><span className="block px-3 py-2 rounded-md text-sm hover:bg-muted hover:text-accent cursor-pointer text-foreground" >Admission Process</span></Link>
                <Link href="/admissions?tab=institute-level"><span className="block px-3 py-2 rounded-md text-sm hover:bg-muted hover:text-accent cursor-pointer text-foreground" >Admission at Institute Level</span></Link>
                <Link href="/admissions?tab=tfw-code"><span className="block px-3 py-2 rounded-md text-sm hover:bg-muted hover:text-accent cursor-pointer text-foreground" >TFWS Code</span></Link>
                <Link href="/admissions?tab=fee-structure"><span className="block px-3 py-2 rounded-md text-sm hover:bg-muted hover:text-accent cursor-pointer text-foreground" >Fee Structure</span></Link>
                <Link href="/admissions?tab=fra"><span className="block px-3 py-2 rounded-md text-sm hover:bg-muted hover:text-accent cursor-pointer text-foreground" >FRA</span></Link>
                <Link href="/admissions/check-eligibility"><span className="block px-3 py-2 rounded-md text-sm hover:bg-muted hover:text-accent cursor-pointer text-foreground" >Check Your Eligibility</span></Link>
              </div>
            )}
          </div>

          {/* Academics Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setShowAcademicsDropdown(true)}
            onMouseLeave={() => { if (lockedDropdown !== "academics") setShowAcademicsDropdown(false) }}
          >
            <span 
              onClick={() => setLockedDropdown(lockedDropdown === "academics" ? null : "academics")}
              className={`cursor-pointer flex items-center justify-center gap-0.5 lg:gap-1 px-1 lg:px-1.5 xl:px-2 py-2 rounded-md text-[10px] lg:text-[11px] xl:text-xs font-medium transition-colors hover:bg-muted whitespace-nowrap ${location.startsWith("/academics") ? "text-accent font-semibold" : "text-foreground"}`}>
              Academics <ChevronDown className="h-3 w-3" />
            </span>
            
            {showAcademicsDropdown && (
              <div className="absolute top-full left-0 w-[240px] bg-background border border-border rounded-lg shadow-lg p-2 mt-1 flex flex-col gap-1 z-50 animate-in fade-in duration-200">
                <Link href="/academics/departmental-info"><span className="block px-3 py-2 rounded-md text-sm hover:bg-muted hover:text-accent cursor-pointer text-foreground" >Departmental information</span></Link>
                <Link href="/faculty"><span className="block px-3 py-2 rounded-md text-sm hover:bg-muted hover:text-accent cursor-pointer text-foreground" >Faculty Directory</span></Link>
                <Link href="/syllabus"><span className="block px-3 py-2 rounded-md text-sm hover:bg-muted hover:text-accent cursor-pointer text-foreground" >Syllabus Portal</span></Link>
                <Link href="/calendar/current"><span className="block px-3 py-2 rounded-md text-sm hover:bg-muted hover:text-accent cursor-pointer text-foreground" >Academic Calendar</span></Link>
                <Link href="/results"><span className="block px-3 py-2 rounded-md text-sm hover:bg-muted hover:text-accent cursor-pointer text-foreground" >Results & Toppers</span></Link>
                <Link href="/library"><span className="block px-3 py-2 rounded-md text-sm hover:bg-muted hover:text-accent cursor-pointer text-foreground" >Library</span></Link>
                <Link href="/feedback"><span className="block px-3 py-2 rounded-md text-sm hover:bg-muted hover:text-accent cursor-pointer text-foreground" >Feedback Hub</span></Link>
              </div>
            )}
          </div>

          {/* Students Support Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setShowStudentsSupportDropdown(true)}
            onMouseLeave={() => { if (lockedDropdown !== "support") setShowStudentsSupportDropdown(false) }}
          >
            <span 
              onClick={() => setLockedDropdown(lockedDropdown === "support" ? null : "support")}
              className={`cursor-pointer flex items-center justify-center gap-0.5 lg:gap-1 px-1 lg:px-1.5 xl:px-2 py-2 rounded-md text-[10px] lg:text-[11px] xl:text-xs font-medium transition-colors hover:bg-muted whitespace-nowrap ${location.startsWith("/support") ? "text-accent font-semibold" : "text-foreground"}`}>
              Students Support <ChevronDown className="h-3 w-3" />
            </span>
            
            {showStudentsSupportDropdown && (
              <div className="absolute top-full left-0 w-[260px] bg-background border border-border rounded-lg shadow-lg p-2 mt-1 flex flex-col gap-1 z-50 animate-in fade-in duration-200">
                <Link href="/support/anti-ragging"><span className="block px-3 py-2 rounded-md text-sm hover:bg-muted hover:text-accent cursor-pointer text-foreground" >Anti-ragging committee</span></Link>
                <Link href="/support/sc-st"><span className="block px-3 py-2 rounded-md text-sm hover:bg-muted hover:text-accent cursor-pointer text-foreground" >SC/ST Cell</span></Link>
                <Link href="/support/grievance"><span className="block px-3 py-2 rounded-md text-sm hover:bg-muted hover:text-accent cursor-pointer text-foreground" >Grievance redressel cell</span></Link>
                <Link href="/support/staff-grievance"><span className="block px-3 py-2 rounded-md text-sm hover:bg-muted hover:text-accent cursor-pointer text-foreground" >Staff grievance redressal cell</span></Link>
                <Link href="/support/internal-complaint"><span className="block px-3 py-2 rounded-md text-sm hover:bg-muted hover:text-accent cursor-pointer text-foreground" >Internal complaint committee</span></Link>
                <Link href="/support/student-council"><span className="block px-3 py-2 rounded-md text-sm hover:bg-muted hover:text-accent cursor-pointer text-foreground" >Student council</span></Link>
                
                {/* Nested Alumni */}
                <div className="group/alumni relative">
                  <span className="flex justify-between items-center px-3 py-2 rounded-md text-sm hover:bg-muted hover:text-accent cursor-pointer text-foreground">
                    Details of Alumni <ChevronRight className="h-4 w-4" />
                  </span>
                  <div className="absolute top-0 left-full w-[200px] hidden group-hover/alumni:flex flex-col bg-background border border-border rounded-lg shadow-lg p-2 -ml-1">
                    <Link href="/support/alumni-committee"><span className="block px-3 py-2 rounded-md text-sm hover:bg-muted hover:text-accent cursor-pointer" >Alumni Committee</span></Link>
                    <Link href="/support/alumni-meet"><span className="block px-3 py-2 rounded-md text-sm hover:bg-muted hover:text-accent cursor-pointer" >Alumni Meet</span></Link>
                  </div>
                </div>

                <Link href="/support/mahadbt"><span className="block px-3 py-2 rounded-md text-sm hover:bg-muted hover:text-accent cursor-pointer text-foreground" >Link of MAHADBT</span></Link>
                <Link href="/support/co-curricular"><span className="block px-3 py-2 rounded-md text-sm hover:bg-muted hover:text-accent cursor-pointer text-foreground" >Co-curricular activities</span></Link>
                
                {/* Nested Extra-curricular */}
                <div className="group/extra relative">
                  <span className="flex justify-between items-center px-3 py-2 rounded-md text-sm hover:bg-muted hover:text-accent cursor-pointer text-foreground">
                    Extra-curricular activities <ChevronRight className="h-4 w-4" />
                  </span>
                  <div className="absolute top-0 left-full w-[200px] hidden group-hover/extra:flex flex-col bg-background border border-border rounded-lg shadow-lg p-2 -ml-1">
                    <Link href="/support/cultural"><span className="block px-3 py-2 rounded-md text-sm hover:bg-muted hover:text-accent cursor-pointer" >Cultural Events</span></Link>
                  </div>
                </div>

                {/* Nested NSS */}
                <div className="group/nss relative">
                  <span className="flex justify-between items-center px-3 py-2 rounded-md text-sm hover:bg-muted hover:text-accent cursor-pointer text-foreground">
                    NSS activities/Social activities <ChevronRight className="h-4 w-4" />
                  </span>
                  <div className="absolute top-0 left-full w-[200px] hidden group-hover/nss:flex flex-col bg-background border border-border rounded-lg shadow-lg p-2 -ml-1">
                    <Link href="/support/nss-events"><span className="block px-3 py-2 rounded-md text-sm hover:bg-muted hover:text-accent cursor-pointer" >Recent Events</span></Link>
                  </div>
                </div>

                {/* Nested Sports */}
                <div className="group/sports relative">
                  <span className="flex justify-between items-center px-3 py-2 rounded-md text-sm hover:bg-muted hover:text-accent cursor-pointer text-foreground">
                    Sport Activities <ChevronRight className="h-4 w-4" />
                  </span>
                  <div className="absolute top-0 left-full w-[200px] hidden group-hover/sports:flex flex-col bg-background border border-border rounded-lg shadow-lg p-2 -ml-1">
                    <Link href="/support/sports-events"><span className="block px-3 py-2 rounded-md text-sm hover:bg-muted hover:text-accent cursor-pointer" >Events & Tournaments</span></Link>
                  </div>
                </div>

                <Link href="/support/conferences"><span className="block px-3 py-2 rounded-md text-sm hover:bg-muted hover:text-accent cursor-pointer text-foreground" >Conference/workshop/seminar/Guest lecture</span></Link>
                <Link href="/support/achievements"><span className="block px-3 py-2 rounded-md text-sm hover:bg-muted hover:text-accent cursor-pointer text-foreground" >Achievement</span></Link>
                <Link href="/support/newsletter"><span className="block px-3 py-2 rounded-md text-sm hover:bg-muted hover:text-accent cursor-pointer text-foreground" >Newsletter</span></Link>
              </div>
            )}
          </div>

          {/* T & P Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setShowTAndPDropdown(true)}
            onMouseLeave={() => { if (lockedDropdown !== "tandp") setShowTAndPDropdown(false) }}
          >
            <Link href="/placements">
              <span 
                onClick={(e) => setLockedDropdown(lockedDropdown === "tandp" ? null : "tandp")}
                className={`flex items-center justify-center gap-0.5 lg:gap-1 px-1 lg:px-1.5 xl:px-2 py-2 rounded-md text-[10px] lg:text-[11px] xl:text-xs font-medium transition-colors hover:bg-muted whitespace-nowrap ${location.startsWith("/placements") ? "text-accent font-semibold" : "text-foreground"}`}>
                T & P <ChevronDown className="h-3 w-3" />
              </span>
            </Link>
            
            {showTAndPDropdown && (
              <div className="absolute top-full left-0 w-[240px] bg-background border border-border rounded-lg shadow-lg p-2 mt-1 flex flex-col gap-1 z-50 animate-in fade-in duration-200">
                <Link href="/placements/message"><span className="block px-3 py-2 rounded-md text-sm hover:bg-muted hover:text-accent cursor-pointer text-foreground" >TPO message</span></Link>
                
                {/* Nested Training */}
                <div className="group/training relative">
                  <span className="flex justify-between items-center px-3 py-2 rounded-md text-sm hover:bg-muted hover:text-accent cursor-pointer text-foreground">
                    Details of Training <ChevronRight className="h-4 w-4" />
                  </span>
                  <div className="absolute top-0 left-full w-[160px] hidden group-hover/training:flex flex-col bg-background border border-border rounded-lg shadow-lg p-2 -ml-1">
                    <Link href="/placements/training/2022-23"><span className="block px-3 py-2 rounded-md text-sm hover:bg-muted hover:text-accent cursor-pointer" >2022-23</span></Link>
                    <Link href="/placements/training/2023-24"><span className="block px-3 py-2 rounded-md text-sm hover:bg-muted hover:text-accent cursor-pointer" >2023-24</span></Link>
                    <Link href="/placements/training/2025-26"><span className="block px-3 py-2 rounded-md text-sm hover:bg-muted hover:text-accent cursor-pointer" >2025-26</span></Link>
                  </div>
                </div>

                <Link href="/placements/cell"><span className="block px-3 py-2 rounded-md text-sm hover:bg-muted hover:text-accent cursor-pointer text-foreground" >T & P cell</span></Link>
                <Link href="/placements/industrial-visit"><span className="block px-3 py-2 rounded-md text-sm hover:bg-muted hover:text-accent cursor-pointer text-foreground" >Industrial visit</span></Link>
                <Link href="/placements/mous"><span className="block px-3 py-2 rounded-md text-sm hover:bg-muted hover:text-accent cursor-pointer text-foreground" >MOUs</span></Link>
                <Link href="/placements/recruiters"><span className="block px-3 py-2 rounded-md text-sm hover:bg-muted hover:text-accent cursor-pointer text-foreground" >Our recruiters</span></Link>
              </div>
            )}
          </div>

          {/* NAAC Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setShowNAACDropdown(true)}
            onMouseLeave={() => { if (lockedDropdown !== "naac") setShowNAACDropdown(false) }}
          >
            <span 
              onClick={() => setLockedDropdown(lockedDropdown === "naac" ? null : "naac")}
              className={`cursor-pointer flex items-center justify-center gap-0.5 lg:gap-1 px-1 lg:px-1.5 xl:px-2 py-2 rounded-md text-[10px] lg:text-[11px] xl:text-xs font-medium transition-colors hover:bg-muted whitespace-nowrap ${location.startsWith("/naac") ? "text-accent font-semibold" : "text-foreground"}`}>
              NAAC <ChevronDown className="h-3 w-3" />
            </span>
            
            {showNAACDropdown && (
              <div className="absolute top-full left-0 w-[200px] bg-background border border-border rounded-lg shadow-lg p-2 mt-1 flex flex-col gap-1 z-50 animate-in fade-in duration-200">
                <Link href="/naac/iqac"><span className="block px-3 py-2 rounded-md text-sm hover:bg-muted hover:text-accent cursor-pointer text-foreground" >IQAC cell</span></Link>
                <Link href="/naac/ssr"><span className="block px-3 py-2 rounded-md text-sm hover:bg-muted hover:text-accent cursor-pointer text-foreground" >SSR</span></Link>
                <Link href="/naac/links"><span className="block px-3 py-2 rounded-md text-sm hover:bg-muted hover:text-accent cursor-pointer text-foreground" >Links</span></Link>
              </div>
            )}
          </div>

          <Link href="/rnd">
            <span className={`flex items-center justify-center px-1 lg:px-1.5 xl:px-2 py-2 rounded-md text-[10px] lg:text-[11px] xl:text-xs font-medium transition-colors hover:bg-muted whitespace-nowrap ${location === "/rnd" ? "text-accent font-semibold" : "text-foreground"}`}>R & D</span>
          </Link>
          <Link href="/media">
            <span className={`flex items-center justify-center px-1 lg:px-1.5 xl:px-2 py-2 rounded-md text-[10px] lg:text-[11px] xl:text-xs font-medium transition-colors hover:bg-muted whitespace-nowrap ${location.startsWith("/media") ? "text-accent font-semibold" : "text-foreground"}`}>Gallery</span>
          </Link>
          <Link href="/contact">
            <span className={`flex items-center justify-center px-1 lg:px-1.5 xl:px-2 py-2 rounded-md text-[10px] lg:text-[11px] xl:text-xs font-medium transition-colors hover:bg-muted whitespace-nowrap ${location.startsWith("/contact") ? "text-accent font-semibold" : "text-foreground"}`}>Contact us</span>
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden p-2 text-foreground ml-auto"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="lg:hidden border-t border-border bg-background animate-in slide-in-from-top-2 max-h-[70vh] overflow-y-auto">
          <nav className="w-full px-4 py-4 flex flex-col space-y-2">
            <Link href="/"><span className="block px-4 py-2 rounded-md text-base font-medium hover:bg-muted" onClick={() => setIsOpen(false)}>Home</span></Link>
            <Link href="/about"><span className="block px-4 py-2 rounded-md text-base font-medium hover:bg-muted" onClick={() => setIsOpen(false)}>About us</span></Link>
            
            {/* Admissions */}
            <div>
              <button onClick={() => setShowMobileAdmission(!showMobileAdmission)} className="w-full flex items-center justify-between px-4 py-2 rounded-md text-base font-medium hover:bg-muted text-left">
                Admission <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${showMobileAdmission ? 'rotate-180' : ''}`} />
              </button>
              {showMobileAdmission && (
                <div className="pl-6 flex flex-col gap-1 mt-1 border-l border-border ml-4">
                  <Link href="/admissions?tab=eligibility"><span className="block px-4 py-2 rounded-md text-sm hover:bg-muted" onClick={() => setIsOpen(false)}>Eligibility Criteria</span></Link>
                  <Link href="/admissions?tab=documents"><span className="block px-4 py-2 rounded-md text-sm hover:bg-muted" onClick={() => setIsOpen(false)}>Documents Required</span></Link>
                  <Link href="/admissions?tab=process"><span className="block px-4 py-2 rounded-md text-sm hover:bg-muted" onClick={() => setIsOpen(false)}>Admission Process</span></Link>
                  <Link href="/admissions?tab=institute-level"><span className="block px-4 py-2 rounded-md text-sm hover:bg-muted" onClick={() => setIsOpen(false)}>Admission at Institute Level</span></Link>
                  <Link href="/admissions?tab=tfw-code"><span className="block px-4 py-2 rounded-md text-sm hover:bg-muted" onClick={() => setIsOpen(false)}>TFWS Code</span></Link>
                  <Link href="/admissions?tab=fee-structure"><span className="block px-4 py-2 rounded-md text-sm hover:bg-muted" onClick={() => setIsOpen(false)}>Fee Structure</span></Link>
                  <Link href="/admissions?tab=fra"><span className="block px-4 py-2 rounded-md text-sm hover:bg-muted" onClick={() => setIsOpen(false)}>FRA</span></Link>
                  <Link href="/admissions/check-eligibility"><span className="block px-4 py-2 rounded-md text-sm hover:bg-muted" onClick={() => setIsOpen(false)}>Check Your Eligibility</span></Link>
                </div>
              )}
            </div>

            {/* Academics */}
            <div>
              <button onClick={() => setShowMobileAcademics(!showMobileAcademics)} className="w-full flex items-center justify-between px-4 py-2 rounded-md text-base font-medium hover:bg-muted text-left">
                Academics <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${showMobileAcademics ? 'rotate-180' : ''}`} />
              </button>
              {showMobileAcademics && (
                <div className="pl-6 flex flex-col gap-1 mt-1 border-l border-border ml-4">
                  <Link href="/academics/departmental-info"><span className="block px-4 py-2 rounded-md text-sm hover:bg-muted" onClick={() => setIsOpen(false)}>Departmental information</span></Link>
                  <Link href="/faculty"><span className="block px-4 py-2 rounded-md text-sm hover:bg-muted" onClick={() => setIsOpen(false)}>Faculty Directory</span></Link>
                  <Link href="/syllabus"><span className="block px-4 py-2 rounded-md text-sm hover:bg-muted" onClick={() => setIsOpen(false)}>Syllabus Portal</span></Link>
                  <Link href="/calendar/current"><span className="block px-4 py-2 rounded-md text-sm hover:bg-muted" onClick={() => setIsOpen(false)}>Academic Calendar</span></Link>
                  <Link href="/results"><span className="block px-4 py-2 rounded-md text-sm hover:bg-muted" onClick={() => setIsOpen(false)}>Results & Toppers</span></Link>
                  <Link href="/library"><span className="block px-4 py-2 rounded-md text-sm hover:bg-muted" onClick={() => setIsOpen(false)}>Library</span></Link>
                  <Link href="/feedback"><span className="block px-4 py-2 rounded-md text-sm hover:bg-muted" onClick={() => setIsOpen(false)}>Feedback Hub</span></Link>
                </div>
              )}
            </div>

            {/* Students Support */}
            <div>
              <button onClick={() => setShowMobileStudentsSupport(!showMobileStudentsSupport)} className="w-full flex items-center justify-between px-4 py-2 rounded-md text-base font-medium hover:bg-muted text-left">
                Students Support <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${showMobileStudentsSupport ? 'rotate-180' : ''}`} />
              </button>
              {showMobileStudentsSupport && (
                <div className="pl-6 flex flex-col gap-1 mt-1 border-l border-border ml-4">
                  <Link href="/support/anti-ragging"><span className="block px-4 py-2 rounded-md text-sm hover:bg-muted" onClick={() => setIsOpen(false)}>Anti-ragging committee</span></Link>
                  <Link href="/support/sc-st"><span className="block px-4 py-2 rounded-md text-sm hover:bg-muted" onClick={() => setIsOpen(false)}>SC/ST Cell</span></Link>
                  <Link href="/support/grievance"><span className="block px-4 py-2 rounded-md text-sm hover:bg-muted" onClick={() => setIsOpen(false)}>Grievance redressel cell</span></Link>
                  <Link href="/support/staff-grievance"><span className="block px-4 py-2 rounded-md text-sm hover:bg-muted" onClick={() => setIsOpen(false)}>Staff grievance redressal cell</span></Link>
                  <Link href="/support/internal-complaint"><span className="block px-4 py-2 rounded-md text-sm hover:bg-muted" onClick={() => setIsOpen(false)}>Internal complaint committee</span></Link>
                  <Link href="/support/student-council"><span className="block px-4 py-2 rounded-md text-sm hover:bg-muted" onClick={() => setIsOpen(false)}>Student council</span></Link>
                  <Link href="/support/mahadbt"><span className="block px-4 py-2 rounded-md text-sm hover:bg-muted" onClick={() => setIsOpen(false)}>Link of MAHADBT</span></Link>
                  <Link href="/support/achievements"><span className="block px-4 py-2 rounded-md text-sm hover:bg-muted" onClick={() => setIsOpen(false)}>Achievement</span></Link>
                </div>
              )}
            </div>

            {/* T & P */}
            <div>
              <button onClick={() => setShowMobileTAndP(!showMobileTAndP)} className="w-full flex items-center justify-between px-4 py-2 rounded-md text-base font-medium hover:bg-muted text-left">
                T & P <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${showMobileTAndP ? 'rotate-180' : ''}`} />
              </button>
              {showMobileTAndP && (
                <div className="pl-6 flex flex-col gap-1 mt-1 border-l border-border ml-4">
                  <Link href="/placements/message"><span className="block px-4 py-2 rounded-md text-sm hover:bg-muted" onClick={() => setIsOpen(false)}>TPO message</span></Link>
                  <span className="block px-4 py-1 text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1 mt-1">Details of Training</span>
                  <div className="pl-4 flex flex-col gap-1 border-l border-border/55 ml-2 mb-2">
                    <Link href="/placements/training/2022-23"><span className="block px-4 py-1.5 rounded-md text-xs hover:bg-muted text-foreground/80" onClick={() => setIsOpen(false)}>Academic Year 2022-23</span></Link>
                    <Link href="/placements/training/2023-24"><span className="block px-4 py-1.5 rounded-md text-xs hover:bg-muted text-foreground/80" onClick={() => setIsOpen(false)}>Academic Year 2023-24</span></Link>
                    <Link href="/placements/training/2025-26"><span className="block px-4 py-1.5 rounded-md text-xs hover:bg-muted text-foreground/80" onClick={() => setIsOpen(false)}>Academic Year 2025-26</span></Link>
                  </div>
                  <Link href="/placements/cell"><span className="block px-4 py-2 rounded-md text-sm hover:bg-muted" onClick={() => setIsOpen(false)}>T & P cell</span></Link>
                  <Link href="/placements/industrial-visit"><span className="block px-4 py-2 rounded-md text-sm hover:bg-muted" onClick={() => setIsOpen(false)}>Industrial visit</span></Link>
                  <Link href="/placements/mous"><span className="block px-4 py-2 rounded-md text-sm hover:bg-muted" onClick={() => setIsOpen(false)}>MOUs</span></Link>
                  <Link href="/placements/recruiters"><span className="block px-4 py-2 rounded-md text-sm hover:bg-muted" onClick={() => setIsOpen(false)}>Our recruiters</span></Link>
                </div>
              )}
            </div>

            {/* NAAC */}
            <div>
              <button onClick={() => setShowMobileNAAC(!showMobileNAAC)} className="w-full flex items-center justify-between px-4 py-2 rounded-md text-base font-medium hover:bg-muted text-left">
                NAAC <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${showMobileNAAC ? 'rotate-180' : ''}`} />
              </button>
              {showMobileNAAC && (
                <div className="pl-6 flex flex-col gap-1 mt-1 border-l border-border ml-4">
                  <Link href="/naac/iqac"><span className="block px-4 py-2 rounded-md text-sm hover:bg-muted" onClick={() => setIsOpen(false)}>IQAC cell</span></Link>
                  <Link href="/naac/ssr"><span className="block px-4 py-2 rounded-md text-sm hover:bg-muted" onClick={() => setIsOpen(false)}>SSR</span></Link>
                  <Link href="/naac/links"><span className="block px-4 py-2 rounded-md text-sm hover:bg-muted" onClick={() => setIsOpen(false)}>Links</span></Link>
                </div>
              )}
            </div>

            <Link href="/rnd"><span className="block px-4 py-2 rounded-md text-base font-medium hover:bg-muted" onClick={() => setIsOpen(false)}>R & D</span></Link>
            <Link href="/media"><span className="block px-4 py-2 rounded-md text-base font-medium hover:bg-muted" onClick={() => setIsOpen(false)}>Gallery</span></Link>
            <Link href="/contact"><span className="block px-4 py-2 rounded-md text-base font-medium hover:bg-muted" onClick={() => setIsOpen(false)}>Contact us</span></Link>
          </nav>
        </div>
      )}
    </header>
  );
}
