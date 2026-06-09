import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Target, Eye, Award } from "lucide-react";

export default function About() {
  return (
    <AppLayout>
      {/* Header */}
      <section className="bg-primary text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About YMKCOE</h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Nurturing engineering excellence, fostering innovation, and building the leaders of tomorrow since 2005.
          </p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12">
          <Card className="border-border shadow-md">
            <CardContent className="p-8">
              <div className="h-14 w-14 bg-accent/10 rounded-xl flex items-center justify-center text-accent mb-6">
                <Eye className="h-7 w-7" />
              </div>
              <h2 className="text-2xl font-bold text-primary mb-4">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed">
                To be a premier institute of academic excellence, recognized globally for imparting quality engineering education, driving innovation, and producing ethically strong professionals who contribute to the betterment of society.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border shadow-md">
            <CardContent className="p-8">
              <div className="h-14 w-14 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary mb-6">
                <Target className="h-7 w-7" />
              </div>
              <h2 className="text-2xl font-bold text-primary mb-4">Our Mission</h2>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-accent font-bold">&bull;</span>
                  To provide state-of-the-art infrastructure and a conducive learning environment.
                </li>
                <li className="flex gap-2">
                  <span className="text-accent font-bold">&bull;</span>
                  To foster research, critical thinking, and a spirit of entrepreneurship among students.
                </li>
                <li className="flex gap-2">
                  <span className="text-accent font-bold">&bull;</span>
                  To bridge the gap between academia and industry through strong collaborations.
                </li>
                <li className="flex gap-2">
                  <span className="text-accent font-bold">&bull;</span>
                  To instill moral values, professional ethics, and social responsibility.
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Accreditations & Achievements */}
      <section className="py-20 bg-muted/30 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Accreditations & Recognition</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">We hold ourselves to the highest standards of educational quality.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl border border-border text-center shadow-sm">
              <Award className="h-10 w-10 text-accent mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">NAAC A+ Grade</h3>
              <p className="text-sm text-muted-foreground">Accredited by National Assessment and Accreditation Council.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-border text-center shadow-sm">
              <Award className="h-10 w-10 text-accent mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">NBA Accredited</h3>
              <p className="text-sm text-muted-foreground">All major undergraduate programs are NBA accredited.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-border text-center shadow-sm">
              <Building2 className="h-10 w-10 text-accent mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">SPPU Affiliated</h3>
              <p className="text-sm text-muted-foreground">Permanently affiliated to Savitribai Phule Pune University.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-border text-center shadow-sm">
              <Award className="h-10 w-10 text-accent mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">AICTE Approved</h3>
              <p className="text-sm text-muted-foreground">Approved by the All India Council for Technical Education.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl overflow-hidden shadow-lg border border-border flex flex-col md:flex-row">
            <div className="md:w-1/3 bg-muted h-64 md:h-auto relative">
              {/* Image placeholder */}
              <div className="absolute inset-0 bg-secondary/10 flex items-center justify-center text-primary">
                Principal Photo
              </div>
            </div>
            <div className="md:w-2/3 p-8 md:p-10">
              <h2 className="text-2xl font-bold text-primary mb-2">Message from the Principal</h2>
              <h3 className="text-accent font-semibold mb-6">Dr. A. N. Sharma</h3>
              <p className="text-muted-foreground leading-relaxed mb-6 italic">
                "Welcome to YMKCOE. Our institution is built on the foundation of rigorous academics and a commitment to innovation. We believe in providing our students with not just an education, but an environment where they can discover their potential, build character, and develop the technical prowess needed to solve global challenges. We look forward to being part of your educational journey."
              </p>
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  );
}
