import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowRight, GraduationCap, Users, Building, Trophy, Calendar, CheckCircle2, MessageSquare, Quote, Landmark, History } from "lucide-react";
import { useGetNews, useGetDashboardStats } from "@workspace/api-client-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { CampusShowcase } from "@/components/layout/CampusShowcase";

export default function Home() {
  // Bypass API for courses and use hardcoded pharmacy courses
  const courses = [
    { id: '1', name: 'D. Pharmacy', department: 'Diploma', duration: '2 Years', seats: 60, established: '2017-18' },
    { id: '2', name: 'B. Pharmacy', department: 'Undergraduate', duration: '4 Years', seats: 100, established: '2017-18' },
    { id: '3', name: 'M. Pharmacy (Pharmaceutics)', department: 'Postgraduate', duration: '2 Years', seats: 15, established: '2023-24' },
    { id: '4', name: 'M. Pharmacy (Pharmacology)', department: 'Postgraduate', duration: '2 Years', seats: 15, established: '2023-24' },
  ];
  const { data: news = [] } = useGetNews({ category: "announcement" });
  const { data: stats } = useGetDashboardStats();

  const [activeLeader, setActiveLeader] = useState<{
    name: string;
    role: string;
    organization: string;
    image?: string;
    initials?: string;
    message: string;
  } | null>(null);

  const featuredCourses = courses.slice(0, 4);
  const recentNews = Array.isArray(news) ? news.slice(0, 3) : [];

  return (
    <AppLayout>
      {/* Hero Section */}
      <section className="relative w-full h-[600px] md:h-[700px] flex items-center bg-primary overflow-hidden">
        
        {/* Right Side Building Image with Responsive Fade Gradients */}
        <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[55%] h-full z-0 select-none">
          <img
            src={`${import.meta.env.BASE_URL}hero-building.png`}
            alt="KBIPER Campus"
            className="w-full h-full object-cover object-bottom"
          />
          {/* Gradients to fade building into background: vertical fade for mobile, horizontal fade for desktop */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-primary/80 to-primary lg:hidden"></div>
          <div className="absolute inset-0 hidden lg:block bg-gradient-to-r from-primary via-primary/50 to-transparent"></div>
        </div>



        <div className="container mx-auto px-4 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text and CTA block on the left */}
          <div className="lg:col-span-6 text-white space-y-6 lg:pr-8 flex flex-col items-start text-left">
            <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-accent mr-2"></span>
              Admissions Open for 2026-27
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
              Empowering <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-yellow-300">Healthcare</span> With Excellence
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 max-w-lg leading-relaxed">
              Indrayani Vidya Mandir's Krishnarao Bhegade Institute of Pharmaceutical Education & Research prepares the next generation of pharmacists and healthcare innovators.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-start w-full sm:w-auto">
              <Link href="/admissions">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-white font-semibold px-8 h-14 text-base w-full sm:w-auto shadow-lg shadow-accent/20">
                  Apply Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/courses">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 h-14 px-8 text-base w-full sm:w-auto backdrop-blur-sm">
                  Explore Programs
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Empty spacer for the right side image on desktop */}
          <div className="hidden lg:block lg:col-span-6"></div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="bg-white border-b border-border relative z-20 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
            <div className="py-8 px-4 text-center">
              <div className="flex justify-center mb-3 text-accent"><GraduationCap className="h-8 w-8" /></div>
              <div className="text-3xl font-bold text-primary mb-1">2017</div>
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Established</div>
            </div>
            <div className="py-8 px-4 text-center">
              <div className="flex justify-center mb-3 text-accent"><Users className="h-8 w-8" /></div>
              <div className="text-3xl font-bold text-primary mb-1">15 Acres</div>
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Campus Area</div>
            </div>
            <div className="py-8 px-4 text-center">
              <div className="flex justify-center mb-3 text-accent"><Building className="h-8 w-8" /></div>
              <div className="text-3xl font-bold text-primary mb-1">190</div>
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Total Seats</div>
            </div>
            <div className="py-8 px-4 text-center">
              <div className="flex justify-center mb-3 text-accent"><Trophy className="h-8 w-8" /></div>
              <div className="text-3xl font-bold text-primary mb-1">PCI</div>
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Approved</div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Society Section */}
      <section className="py-20 bg-muted/20 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/5 px-3 py-1 text-xs font-semibold text-primary uppercase tracking-wider mb-3">
              <Landmark className="h-3.5 w-3.5" />
              Founding Legacy
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Indrayani Vidya Mandir (IVM)</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Serving the Maval region since 1965, Indrayani Vidya Mandir is a premier educational society built on values of social reform and academic empowerment.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* The Society legacy */}
            <Card className="border border-border shadow-sm hover:shadow-md transition-all duration-300">
              <CardContent className="p-8 md:p-10 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                    <History className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary">About the Society &amp; Trust</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Established in 1965, Indrayani Vidya Mandir stands as a pioneer institute of educational excellence in the region. The society was founded through the guidance of eminent personalities, including the celebrated writer and social leader <strong>Acharya P. K. Atre</strong>, Dr. M. M. Altekar, and other visionaries who aimed to bring affordable, high-quality instruction to the local community.
                </p>
                <div className="border-t border-border/60 pt-6">
                  <h4 className="font-semibold text-primary mb-3">Blessed by Towering Leaders</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    IVM's journey has been nurtured by prominent figures such as Prof. Ramkrishna More, Balasaheb Kibe, Dadasaheb Dhore, Balasaheb Barmukh, and former VC Dr. G. S. Mahajani, along with Balasaheb Desai (former Finance Minister of Maharashtra).
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Campus & Institutions */}
            <Card className="border border-border shadow-sm hover:shadow-md transition-all duration-300">
              <CardContent className="p-8 md:p-10 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Building className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary">Campus &amp; Institutions</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Set on a sprawling <strong>15-acre green campus</strong> with top-tier infrastructure, IVM has continuously expanded its offerings. In addition to Krishnarao Bhegade Institute of Pharmaceutical Education and Research (KBIPER), the trust established the Indrayani Institute of Pharmaceutical Education and Research in 2017, offering advanced UG programs in Medicine and Health Sciences (B. Pharmacy) to meet modern healthcare demands.
                </p>
                <div className="border-t border-border/60 pt-6">
                  <h4 className="font-semibold text-primary mb-3">Modern Infrastructure &amp; Amenities</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    The campus features outstanding resources, including a modern auditorium, cafeteria, gymnasium, healthcare assistance, comfortable girls' and boys' hostels, advanced labs, a digital library, and full Wi-Fi connectivity.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Leadership Messages Section */}
      <section className="py-20 bg-background border-b border-border">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/5 px-3 py-1 text-xs font-semibold text-primary uppercase tracking-wider mb-3">
              <MessageSquare className="h-3.5 w-3.5" />
              Leadership Desk
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Messages from our Leadership</h2>
            <p className="text-lg text-muted-foreground">
              Hear from the leaders guiding our vision and commitment to engineering innovation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* President Card */}
            <Card className="border border-border shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-full">
              <CardContent className="p-8 flex flex-col justify-between h-full space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 border-b border-border pb-4">
                    <img 
                      src={`${import.meta.env.BASE_URL}president.jpg`} 
                      alt="Hon. Shri Ramdas Kakade" 
                      className="h-14 w-14 rounded-full object-cover shrink-0 shadow-sm border border-border bg-muted"
                    />
                    <div>
                      <h3 className="font-bold text-base text-primary leading-tight">Hon. Shri Ramdas Kakade</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">President</p>
                      <p className="text-[10px] text-accent font-semibold uppercase tracking-wider">Indrayani Vidya Mandir</p>
                    </div>
                  </div>
                  <div className="text-muted-foreground text-sm leading-relaxed relative italic">
                    <Quote className="absolute -top-3 -left-2 h-8 w-8 text-primary/5 -z-10" />
                    "Indrayani Vidya Mandir has a distinctive mission and history that has made it the leader in the field of education in Maval area. Today’s Education not only focuses on imparting knowledge and skills but also on the overall development of the students. The Indrayani Institute of Yashoda Mahadeo Kakade College..."
                  </div>
                </div>
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => setActiveLeader({
                    name: "Hon. Shri Ramdas Kakade",
                    role: "President",
                    organization: "Indrayani Vidya Mandir",
                    image: `${import.meta.env.BASE_URL}president.jpg`,
                    message: `"Indrayani Vidya Mandir has a distinctive mission and history that has made it the leader in the field of education in Maval area. Today’s Education not only focuses on imparting knowledge and skills but also on the overall development of the students. The Indrayani Institute of Krishnarao Bhegade Institute of Pharmaceutical Education and Research (KBIPER) is geared up to provide you with the experienced faculty, facilities and infrastructure to prepare you for the tough challenges ahead. We are providing our students an opportunity for personal development and bringing about social reforms in this very vital sector. We believe that the students leaving this campus should leave with confidence in their abilities, a sense of responsibility towards society and be fully equipped to face the challenges of life with dignity."`
                  })}
                  className="text-accent hover:text-accent/80 font-bold p-0 self-start mt-2 h-auto"
                >
                  Read Full Message →
                </Button>
              </CardContent>
            </Card>

            {/* Secretary Card */}
            <Card className="border border-border shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-full">
              <CardContent className="p-8 flex flex-col justify-between h-full space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 border-b border-border pb-4">
                    <img 
                      src={`${import.meta.env.BASE_URL}secretary.jpg`} 
                      alt="Hon. Shri Chandrakant Shete" 
                      className="h-14 w-14 rounded-full object-cover shrink-0 shadow-sm border border-border bg-muted"
                    />
                    <div>
                      <h3 className="font-bold text-base text-primary leading-tight">Hon. Shri Chandrakant Shete</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">Secretary</p>
                      <p className="text-[10px] text-accent font-semibold uppercase tracking-wider">Indrayani Vidya Mandir</p>
                    </div>
                  </div>
                  <div className="text-muted-foreground text-sm leading-relaxed relative italic">
                    <Quote className="absolute -top-3 -left-2 h-8 w-8 text-primary/5 -z-10" />
                    "Learning is not a process that ends with the conclusion of one's college career. It is indeed a lifelong process. This college is oriented to the total formation of a ward and to adaptations of various methods suiting the dynamics of a changing world in order to achieve common goals and..."
                  </div>
                </div>
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => setActiveLeader({
                    name: "Hon. Shri Chandrakant Shete",
                    role: "Secretary",
                    organization: "Indrayani Vidya Mandir",
                    image: `${import.meta.env.BASE_URL}secretary.jpg`,
                    message: `"Learning is not a process that ends with the conclusion of one's college career. It is indeed a lifelong process. This college is oriented to the total formation of a ward and to adaptations of various methods suiting the dynamics of a changing world in order to achieve common goals and objectives. Our commitment to such learning will always persist in all our endeavors. Our faculty continues to provide their expertise through the continuing education programmes. The departments have also established rich and formal relationships with the industry through courses and regular classroom interactions, inviting industry professionals, and conducting seminars and other soft skill programmes. I sincerely hope that our students will use the facilities provided to them on our campus, find their profession, and justify the trust placed in them by their family, Society, and Nation."`
                  })}
                  className="text-accent hover:text-accent/80 font-bold p-0 self-start mt-2 h-auto"
                >
                  Read Full Message →
                </Button>
              </CardContent>
            </Card>

            {/* Principal Card */}
            <Card className="border border-border shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-full">
              <CardContent className="p-8 flex flex-col justify-between h-full space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 border-b border-border pb-4">
                    <div className="h-14 w-14 rounded-full bg-gradient-to-tr from-primary to-primary-light flex items-center justify-center font-bold text-white text-lg shrink-0 shadow-sm overflow-hidden relative">
                      <img src={`${import.meta.env.BASE_URL}principal_sanjay_arote.jpg`} alt="Dr. Sanjay R. Arote" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-primary leading-tight">Dr. Sanjay R. Arote</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">Principal (M. Pharm., Ph.D.)</p>
                      <p className="text-[10px] text-accent font-semibold uppercase tracking-wider">KBIPER</p>
                    </div>
                  </div>
                  <div className="text-muted-foreground text-sm leading-relaxed relative italic">
                    <Quote className="absolute -top-3 -left-2 h-8 w-8 text-primary/5 -z-10" />
                    "Welcome to Krishnarao Bhegade Institute of Pharmaceutical Education and Research. Our institution is dedicated to nurturing the next generation of pharmacy professionals. Through cutting edge research, practical learning and holistic development..."
                  </div>
                </div>
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => setActiveLeader({
                    name: "Dr. Sanjay R. Arote",
                    role: "Principal (M. Pharm., Ph.D.)",
                    organization: "KBIPER",
                    initials: "SA",
                    message: `Message from the Principal's Desk

It gives me immense pleasure to welcome you to Krishnarao Bhegade Institute of Pharmaceutical Education and Research (KBIPER).

Pharmacy is a noble profession that serves the healthcare system of the nation. At KBIPER, we strive to build a strong foundation for our students by providing them with an ideal environment for learning and growth. Our state-of-the-art laboratories, experienced faculty, and industry-oriented curriculum ensure that our students are equipped to face the challenges of the rapidly evolving pharmaceutical landscape.

We believe in fostering not just academic excellence but also the holistic development of our students, empowering them with the knowledge and values necessary to become successful professionals and responsible citizens.

I look forward to welcoming you to our campus and witnessing your journey toward a bright and successful future.

Dr. Sanjay R. Arote
Principal, KBIPER`
                  })}
                  className="text-accent hover:text-accent/80 font-bold p-0 self-start mt-2 h-auto"
                >
                  Read Full Message →
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Why Choose Us?</h2>
            <p className="text-lg text-muted-foreground">
              We cultivate a mindset of innovation, critical thinking, and practical problem-solving in the field of pharmacy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-md hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <div className="h-12 w-12 rounded-lg bg-primary/5 flex items-center justify-center text-primary mb-6">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Industry-Aligned Curriculum</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our syllabus is regularly updated in consultation with industry experts to ensure our graduates are job-ready from day one.
                </p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center text-accent mb-6">
                  <Building className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">State-of-the-Art Labs</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Experience hands-on learning in our modern laboratories equipped with the latest technology and industrial-grade equipment.
                </p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary mb-6">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Excellent Placement Record</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our dedicated placement cell works tirelessly to bring top-tier healthcare and pharmaceutical companies to campus. We have extensive earlier placements data proving our successful track record.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Campus Gallery */}
      <CampusShowcase />

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-30"></div>
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <h2 className="text-2xl md:text-4xl font-bold mb-6">Turn Inspirations into Achievements</h2>
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-10">
            Join thousands of successful alumni who started their careers at Indrayani Vidya Mandir's Pharmacy Institute. Admissions for the upcoming academic year are now open.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/admissions">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-white font-semibold px-8 h-14 text-base shadow-lg w-full sm:w-auto">
                Apply for Admission
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 h-14 px-8 text-base backdrop-blur-sm w-full sm:w-auto">
                Contact Admissions Office
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Leadership Full Message Modal */}
      <Dialog open={!!activeLeader} onOpenChange={(open) => !open && setActiveLeader(null)}>
        <DialogContent className="max-w-4xl w-[90vw] p-0 overflow-hidden bg-background border border-border rounded-lg shadow-2xl">
          <div className="flex flex-col md:flex-row h-full max-h-[85vh]">
            {/* Left side: Content / Text */}
            <div className="flex-1 p-6 md:p-8 overflow-y-auto space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-4 border-b border-border pb-4">
                  {activeLeader?.image ? (
                    <img 
                      src={activeLeader.image} 
                      alt={activeLeader.name} 
                      className="h-16 w-16 rounded-full object-cover shrink-0 shadow-sm border border-border"
                    />
                  ) : (
                    <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-primary to-primary-light flex items-center justify-center font-bold text-white text-xl shrink-0 shadow-sm">
                      {activeLeader?.initials}
                    </div>
                  )}
                  <div>
                    <DialogTitle className="font-bold text-xl text-primary leading-tight">
                      {activeLeader?.name}
                    </DialogTitle>
                    <p className="text-sm text-muted-foreground mt-0.5">{activeLeader?.role}</p>
                    <p className="text-xs text-accent font-semibold uppercase tracking-wider">{activeLeader?.organization}</p>
                  </div>
                </div>
                
                {/* Full Message on the Left */}
                <div className="text-muted-foreground text-sm md:text-base leading-relaxed whitespace-pre-line italic relative pl-6 pr-2">
                  <Quote className="absolute top-0 left-0 h-6 w-6 text-primary/10" />
                  {activeLeader?.message}
                </div>
              </div>
              
              <div className="pt-4 border-t border-border flex justify-end">
                <Button 
                  onClick={() => setActiveLeader(null)} 
                  variant="outline"
                  className="font-semibold"
                >
                  Close Message
                </Button>
              </div>
            </div>
            
            {/* Right side: Large Image */}
            <div className="hidden md:block w-[35%] bg-muted relative shrink-0 border-l border-border select-none">
              {activeLeader?.image ? (
                <img 
                  src={activeLeader.image} 
                  alt={activeLeader.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-tr from-primary to-primary-light flex flex-col items-center justify-center font-bold text-white text-6xl shadow-sm">
                  {activeLeader?.initials}
                  <span className="text-sm font-medium mt-4 tracking-wide uppercase opacity-75">{activeLeader?.role}</span>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}
