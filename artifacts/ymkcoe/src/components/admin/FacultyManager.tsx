import { useState } from "react";
import { useGetFaculty, getGetFacultyQueryKey, useCreateFacultyMember, useDeleteFacultyMember } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Upload } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const DEPARTMENTS = [
  "Pharmacology",
  "Pharmaceutical Chemistry",
  "Pharmaceutics",
  "Pharmacognosy",
  "Quality Assurance",
  "D. Pharmacy",
];

const DESIGNATIONS = [
  "Principal",
  "Professor",
  "Assoc. Professor",
  "Assistant Professor",
  "HOD & Lecturer",
  "Lecturer",
];

const facultySchema = z.object({
  name: z.string().min(1, "Name is required"),
  department: z.string().min(1, "Department is required"),
  designation: z.string().min(1, "Designation is required"),
  qualification: z.string().optional(),
  specialization: z.string().optional(),
  experience: z.coerce.number().optional(),
  email: z.string().email().optional().or(z.literal('')),
  photoUrl: z.string().optional(),
  bio: z.string().optional(),
});

export function FacultyManager() {
  const { data: facultyData, isLoading } = useGetFaculty();
  const faculty = Array.isArray(facultyData) ? facultyData : [];
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const deleteFaculty = useDeleteFacultyMember();
  const createFaculty = useCreateFacultyMember();
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof facultySchema>>({
    resolver: zodResolver(facultySchema),
    defaultValues: {
      name: "",
      department: "Pharmacology",
      designation: "Assistant Professor",
      qualification: "",
      specialization: "",
      experience: 5,
      email: "",
      photoUrl: "",
      bio: "",
    }
  });

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>, onChange: (val: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: z.infer<typeof facultySchema>) => {
    createFaculty.mutate({ data }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getGetFacultyQueryKey() });
        toast({ title: "Faculty member added" });
        setOpen(false);
        form.reset();
      },
      onError: () => {
        toast({ variant: "destructive", title: "Failed to add faculty member" });
      }
    });
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to remove this faculty member?")) {
      deleteFaculty.mutate({ id }, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getGetFacultyQueryKey() });
          toast({ title: "Faculty member removed" });
        },
        onError: () => {
          toast({ variant: "destructive", title: "Failed to remove faculty member" });
        }
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Manage Faculty</h3>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary"><Plus className="w-4 h-4 mr-2" /> Add Faculty</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add Faculty Member</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem><FormLabel>Name</FormLabel><FormControl><Input placeholder="Enter full name" {...field} /></FormControl><FormMessage/></FormItem>
                  )} />
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" placeholder="email@kbiper.edu.in" {...field} /></FormControl><FormMessage/></FormItem>
                  )} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField control={form.control} name="department" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger><SelectValue placeholder="Select department" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {DEPARTMENTS.map(dept => (
                            <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="designation" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Designation</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger><SelectValue placeholder="Select designation" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {DESIGNATIONS.map(des => (
                            <SelectItem key={des} value={des}>{des}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <FormField control={form.control} name="qualification" render={({ field }) => (
                    <FormItem><FormLabel>Qualification</FormLabel><FormControl><Input placeholder="e.g. M. Pharm, Ph.D." {...field} /></FormControl><FormMessage/></FormItem>
                  )} />
                  <FormField control={form.control} name="specialization" render={({ field }) => (
                    <FormItem><FormLabel>Specialization</FormLabel><FormControl><Input placeholder="e.g. Pharmacology" {...field} /></FormControl><FormMessage/></FormItem>
                  )} />
                  <FormField control={form.control} name="experience" render={({ field }) => (
                    <FormItem><FormLabel>Experience (Years)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage/></FormItem>
                  )} />
                </div>

                <FormField control={form.control} name="photoUrl" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Photo</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-4 border border-input rounded-md p-2 bg-background">
                        <Input 
                          type="file" 
                          accept="image/*" 
                          onChange={(e) => handlePhotoChange(e, field.onChange)} 
                          className="cursor-pointer border-none shadow-none h-auto py-1"
                        />
                        {field.value && (
                          <img 
                            src={field.value} 
                            alt="Preview" 
                            className="h-10 w-10 rounded-full object-cover border border-border" 
                          />
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="bio" render={({ field }) => (
                  <FormItem><FormLabel>Bio / Description</FormLabel><FormControl><Textarea placeholder="Brief biography..." className="h-20 resize-none" {...field} /></FormControl><FormMessage/></FormItem>
                )} />

                <Button type="submit" className="w-full h-11 bg-primary text-white" disabled={createFaculty.isPending}>
                  {createFaculty.isPending ? "Saving..." : "Save Faculty Member"}
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Designation</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              [1, 2, 3].map(i => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-4 w-[150px]" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-[120px]" /></TableCell>
                  <TableCell><Skeleton className="h-8 w-20 ml-auto" /></TableCell>
                </TableRow>
              ))
            ) : faculty.length > 0 ? (
              faculty.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {member.name}
                      {member.isHOD && <Badge variant="outline" className="bg-accent/10 text-accent text-[10px] py-0">HOD</Badge>}
                    </div>
                  </TableCell>
                  <TableCell>{member.department}</TableCell>
                  <TableCell>{member.designation}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDelete(member.id)}><Trash2 className="h-4 w-4" /></Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">No faculty members found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
