import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowRight, GraduationCap, Users, Building, Trophy, Calendar, CheckCircle2 } from "lucide-react";
import { useGetCourses, useGetNews, useGetDashboardStats } from "@workspace/api-client-react";

export default function Home() {
  const { data: courses = [] } = useGetCourses();
  const { data: news = [] } = useGetNews({ category: "announcement" });
  const { data: stats } = useGetDashboardStats();

  const featuredCourses = courses.slice(0, 3);
  const recentNews = news.slice(0, 3);

  return (
    <AppLayout>
      {/* Hero Section */}
      <section className="relative w-full h-[600px] md:h-[700px] flex items-center bg-primary overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[60%] rounded-full bg-accent blur-[120px]"></div>
          <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[70%] rounded-full bg-secondary blur-[100px]"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white space-y-6">
            <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-accent mr-2"></span>
              Admissions Open for 2024-25
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
              Engineer Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-emerald-300">Future</span> With Excellence
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 max-w-lg leading-relaxed">
              Yashoda Mahadeo Kore College of Engineering prepares the next generation of innovators, leaders, and problem solvers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
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
          <div className="hidden lg:block relative h-[500px] w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            {/* Placeholder for Hero Image - would normally use a generated image or stock photo */}
            <div className="absolute inset-0 bg-secondary flex items-center justify-center text-primary-foreground/50">
              <span className="text-sm tracking-widest uppercase">Campus Hero Image</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="bg-white border-b border-border relative z-20 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
            <div className="py-8 px-4 text-center">
              <div className="flex justify-center mb-3 text-accent"><GraduationCap className="h-8 w-8" /></div>
              <div className="text-3xl font-bold text-primary mb-1">{stats?.totalStudents || "2,500"}+</div>
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Students</div>
            </div>
            <div className="py-8 px-4 text-center">
              <div className="flex justify-center mb-3 text-accent"><Users className="h-8 w-8" /></div>
              <div className="text-3xl font-bold text-primary mb-1">{stats?.totalFaculty || "150"}+</div>
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Expert Faculty</div>
            </div>
            <div className="py-8 px-4 text-center">
              <div className="flex justify-center mb-3 text-accent"><Building className="h-8 w-8" /></div>
              <div className="text-3xl font-bold text-primary mb-1">{stats?.totalPlacements || "500"}+</div>
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Placements/Yr</div>
            </div>
            <div className="py-8 px-4 text-center">
              <div className="flex justify-center mb-3 text-accent"><Trophy className="h-8 w-8" /></div>
              <div className="text-3xl font-bold text-primary mb-1">A+</div>
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">NAAC Grade</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Why Choose YMKCOE?</h2>
            <p className="text-lg text-muted-foreground">
              We don't just teach engineering; we cultivate a mindset of innovation, critical thinking, and practical problem-solving.
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
                <h3 className="text-xl font-bold mb-3">Exceptional Placement Record</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our dedicated placement cell works tirelessly to bring top-tier companies to campus, resulting in consistently high placement rates.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Courses & News */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Courses */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-3xl font-bold text-primary mb-2">Featured Programs</h2>
                <p className="text-muted-foreground">Discover our most sought-after engineering degrees.</p>
              </div>
              <Link href="/courses">
                <Button variant="ghost" className="hidden sm:flex group">
                  View All <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredCourses.length > 0 ? featuredCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden group cursor-pointer border-border hover:border-primary/20 transition-all shadow-sm hover:shadow-md">
                  <div className="h-48 bg-muted relative overflow-hidden">
                    <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors z-10"></div>
                    {/* Placeholder image */}
                  </div>
                  <CardContent className="p-6">
                    <div className="text-xs font-semibold text-accent uppercase tracking-wider mb-2">{course.department}</div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{course.name}</h3>
                    <div className="flex items-center text-sm text-muted-foreground gap-4">
                      <span className="flex items-center"><Calendar className="h-4 w-4 mr-1"/> {course.duration}</span>
                      <span className="flex items-center"><Users className="h-4 w-4 mr-1"/> {course.seats} Seats</span>
                    </div>
                  </CardContent>
                </Card>
              )) : (
                <div className="col-span-2 text-center py-12 text-muted-foreground bg-muted/20 rounded-lg border border-dashed">
                  No courses available at the moment.
                </div>
              )}
            </div>
            
            <Link href="/courses" className="sm:hidden mt-6 block">
              <Button variant="outline" className="w-full">View All Programs</Button>
            </Link>
          </div>

          {/* News Sidebar */}
          <div>
            <div className="flex justify-between items-end mb-8">
              <h2 className="text-3xl font-bold text-primary mb-2">Announcements</h2>
            </div>
            
            <div className="space-y-4">
              {recentNews.length > 0 ? recentNews.map((item) => (
                <Card key={item.id} className="border-border shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-5 flex gap-4">
                    <div className="shrink-0 flex flex-col items-center justify-center w-16 h-16 bg-primary/5 rounded-lg border border-primary/10">
                      <span className="text-xl font-bold text-primary leading-none">
                        {new Date(item.publishedAt).getDate()}
                      </span>
                      <span className="text-xs font-medium text-muted-foreground uppercase">
                        {new Date(item.publishedAt).toLocaleString('default', { month: 'short' })}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground line-clamp-2 mb-1 group-hover:text-primary transition-colors">
                        <Link href={`/news`}>{item.title}</Link>
                      </h4>
                      <p className="text-sm text-muted-foreground line-clamp-2">{item.content}</p>
                    </div>
                  </CardContent>
                </Card>
              )) : (
                <div className="text-center py-8 text-muted-foreground bg-muted/20 rounded-lg border border-dashed">
                  No recent announcements.
                </div>
              )}
              
              <Link href="/news" className="block pt-2">
                <Button variant="ghost" className="w-full justify-between group">
                  All News & Events <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
          
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-30"></div>
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-10">
            Join thousands of successful alumni who started their careers at YMKCOE. Admissions for the upcoming academic year are now open.
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
    </AppLayout>
  );
}
