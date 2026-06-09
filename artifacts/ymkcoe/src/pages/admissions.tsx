import { AppLayout } from "@/components/layout/AppLayout";
import { useCreateAdmissionLead } from "@workspace/api-client-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { GraduationCap, BookOpen, CheckCircle, HelpCircle } from "lucide-react";

const DEPARTMENTS = [
  "Computer Engg",
  "Mechanical Engg",
  "Civil Engg",
  "Electronics & Telecom",
  "Electrical Engg",
];

const admissionSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number is required"),
  courseInterest: z.string().min(1, "Please select a course"),
  qualification: z.string().optional(),
  message: z.string().optional(),
});

type AdmissionFormValues = z.infer<typeof admissionSchema>;

export default function Admissions() {
  const { toast } = useToast();
  const createLead = useCreateAdmissionLead();

  const form = useForm<AdmissionFormValues>({
    resolver: zodResolver(admissionSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      courseInterest: "",
      qualification: "",
      message: "",
    },
  });

  const onSubmit = (data: AdmissionFormValues) => {
    createLead.mutate({ data }, {
      onSuccess: () => {
        toast({
          title: "Application Submitted",
          description: "Our admissions team will contact you shortly.",
        });
        form.reset();
      },
      onError: () => {
        toast({
          variant: "destructive",
          title: "Error",
          description: "There was a problem submitting your application. Please try again.",
        });
      }
    });
  };

  return (
    <AppLayout>
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Admissions</h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Take the first step towards a rewarding career in engineering. Apply now for the upcoming academic session.
          </p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Info Side */}
          <div className="lg:col-span-7 space-y-12">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-6">Admission Process</h2>
              <div className="space-y-6">
                {[
                  { title: "Online Application", desc: "Fill out the admission inquiry form on this page with your details." },
                  { title: "Counseling & Guidance", desc: "Our admission counselors will contact you to discuss your career goals and course options." },
                  { title: "Document Verification", desc: "Submit your academic transcripts, entrance exam scores, and identity proofs." },
                  { title: "Seat Confirmation", desc: "Pay the required admission fee to confirm your enrollment in the chosen program." },
                ].map((step, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="shrink-0 w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">
                      {idx + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{step.title}</h3>
                      <p className="text-muted-foreground">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-primary mb-6">Eligibility Criteria</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                <Card className="border-border shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <GraduationCap className="h-6 w-6 text-accent" />
                      <h3 className="text-lg font-bold">Undergraduate (B.E.)</h3>
                    </div>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-accent shrink-0 mt-0.5" /> Passed 10+2 examination with Physics and Mathematics as compulsory subjects.</li>
                      <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-accent shrink-0 mt-0.5" /> Obtained at least 45% marks (40% for reserved category) in the above subjects taken together.</li>
                      <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-accent shrink-0 mt-0.5" /> Valid score in MHT-CET / JEE Main.</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="border-border shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <BookOpen className="h-6 w-6 text-secondary" />
                      <h3 className="text-lg font-bold">Postgraduate (M.E.)</h3>
                    </div>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-secondary shrink-0 mt-0.5" /> Bachelor's Degree in relevant field of Engineering and Technology.</li>
                      <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-secondary shrink-0 mt-0.5" /> Obtained at least 50% marks (45% for reserved category).</li>
                      <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-secondary shrink-0 mt-0.5" /> Valid Non-Zero GATE / MHT-CET score.</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div className="bg-muted p-6 rounded-xl flex items-start gap-4">
              <HelpCircle className="h-8 w-8 text-primary shrink-0" />
              <div>
                <h3 className="text-lg font-semibold mb-2">Need help with your application?</h3>
                <p className="text-muted-foreground mb-4">Our admission desk is open Monday to Saturday, 9:00 AM to 5:00 PM.</p>
                <p className="font-semibold text-primary">Call us: +91 20 1234 5678</p>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-5">
            <Card className="border-t-4 border-t-accent shadow-xl sticky top-28">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-2xl font-bold text-primary">Apply Now</CardTitle>
                <p className="text-sm text-muted-foreground">Submit your details to start the admission process.</p>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address *</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="john@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number *</FormLabel>
                            <FormControl>
                              <Input placeholder="+91 9876543210" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="courseInterest"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Interested Program *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a department" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {DEPARTMENTS.map((dept) => (
                                <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="qualification"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Qualification</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 12th Science / Diploma" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Any questions?</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Type your query here..." className="resize-none" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      className="w-full bg-accent hover:bg-accent/90 text-white h-12 text-lg mt-4"
                      disabled={createLead.isPending}
                    >
                      {createLead.isPending ? "Submitting..." : "Submit Application"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

        </div>
      </section>
    </AppLayout>
  );
}
