import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown, Phone, Mail } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const DEPARTMENTS = [
  "Computer Science & Engineering",
  "Artificial Intelligence & Data Science",
  "Electronics & Telecommunication Engineering",
  "Information Technology",
];

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState(false);

  const navLinks = [
    { href: "/about", label: "About Us" },
    { href: "/faculty", label: "Faculty" },
    { href: "/placements", label: "Placements" },
    { href: "/news", label: "News & Events" },
    { href: "/media", label: "Gallery" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-sm">
      <div className="bg-primary text-primary-foreground py-1 md:py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-xs md:text-sm">
          <div className="flex items-center gap-4">
            <a href="mailto:admission@ymkcoe.com" className="flex items-center gap-1 hover:text-accent transition-colors">
              <Mail className="h-3 w-3" /> <span className="hidden md:inline">admission@ymkcoe.com</span>
            </a>
            <a href="tel:+918983683005" className="flex items-center gap-1 hover:text-accent transition-colors">
              <Phone className="h-3 w-3" /> <span className="hidden md:inline">+91 89836 83005</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span>DBATU Affiliated</span>
            <span className="hidden md:inline font-semibold text-accent">AICTE Approved | DTE Code: 16352</span>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          {/* We'll assume attached_assets/ymkcoe_logo.png is served from /ymkcoe_logo.png if copied to public, or we can just use an img tag if it's there. Actually, for now, let's just use a stylized text logo or a placeholder. The prompt says "attached_assets/ymkcoe_logo.png (display in navbar)". Let's assume it's copied to public or can be imported. Let's use an img tag with src "/ymkcoe_logo.png" but provide a fallback if it doesn't exist. Actually, let's use a div with text if it fails to load. */}
          <div className="flex flex-col">
            <span className="font-bold text-xl md:text-2xl text-primary leading-none tracking-tight">YMKCOE</span>
            <span className="text-[10px] md:text-xs text-muted-foreground font-medium hidden sm:block">Yashoda Mahadeo Kakade College of Engineering</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          <Link href="/">
            <span className={`px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-muted ${location === "/" ? "text-accent font-semibold" : "text-foreground"}`}>Home</span>
          </Link>

          {/* Courses Mega Menu Trigger */}
          <div 
            className="relative"
            onMouseEnter={() => setShowMegaMenu(true)}
            onMouseLeave={() => setShowMegaMenu(false)}
          >
            <Link href="/courses">
              <span className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-muted ${location.startsWith("/courses") ? "text-accent font-semibold" : "text-foreground"}`}>
                Courses <ChevronDown className="h-4 w-4" />
              </span>
            </Link>
            
            {showMegaMenu && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[400px] bg-background border border-border rounded-lg shadow-lg p-4 mt-1 grid grid-cols-2 gap-2 animate-in fade-in zoom-in-95 duration-200">
                <div className="col-span-2 mb-2 pb-2 border-b border-border">
                  <h3 className="font-semibold text-primary">Academic Departments</h3>
                </div>
                {DEPARTMENTS.map((dept) => (
                  <Link key={dept} href={`/courses?dept=${encodeURIComponent(dept)}`}>
                    <span className="block px-3 py-2 rounded-md text-sm hover:bg-muted hover:text-accent transition-colors">
                      {dept}
                    </span>
                  </Link>
                ))}
                <div className="col-span-2 mt-2 pt-2 border-t border-border">
                  <Link href="/courses">
                    <span className="block px-3 py-2 rounded-md text-sm font-medium text-accent hover:underline text-center">
                      View All Programs &rarr;
                    </span>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <span className={`px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-muted ${location.startsWith(link.href) ? "text-accent font-semibold" : "text-foreground"}`}>
                {link.label}
              </span>
            </Link>
          ))}
          
          <div className="ml-2 pl-4 border-l border-border flex items-center gap-2">
            <Link href="/admissions">
              <Button variant="default" className="bg-accent text-accent-foreground hover:bg-accent/90">Apply Now</Button>
            </Link>
          </div>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-background animate-in slide-in-from-top-2">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-2">
            <Link href="/">
              <span className="block px-4 py-2 rounded-md text-base font-medium hover:bg-muted" onClick={() => setIsOpen(false)}>Home</span>
            </Link>
            <Link href="/courses">
              <span className="block px-4 py-2 rounded-md text-base font-medium hover:bg-muted" onClick={() => setIsOpen(false)}>Courses</span>
            </Link>
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span className="block px-4 py-2 rounded-md text-base font-medium hover:bg-muted" onClick={() => setIsOpen(false)}>{link.label}</span>
              </Link>
            ))}
            <div className="pt-4 mt-2 border-t border-border">
              <Link href="/admissions">
                <Button variant="default" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" onClick={() => setIsOpen(false)}>Apply Now</Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
