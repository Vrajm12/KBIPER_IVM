import { useGetPlacements, getGetPlacementsQueryKey, useDeletePlacement, useCreatePlacement } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";

const DEPARTMENTS = [
  "D. Pharmacy",
  "B. Pharmacy",
  "M. Pharmacy (Pharmaceutics)",
  "M. Pharmacy (Pharmacology)",
];

const placementSchema = z.object({
  studentName: z.string().min(1, "Student Name is required"),
  company: z.string().min(1, "Company is required"),
  package: z.string().min(1, "Package is required (e.g. 4.5 LPA)"),
  role: z.string().optional(),
  department: z.string().min(1, "Department is required"),
  year: z.coerce.number().min(2000, "Enter a valid year"),
  logoUrl: z.string().optional(),
  testimonial: z.string().optional(),
});

export function PlacementsManager() {
  const { data: placementsData, isLoading } = useGetPlacements();
  const placements = Array.isArray(placementsData) ? placementsData : [];
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const deletePlacement = useDeletePlacement();
  const createPlacement = useCreatePlacement();
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof placementSchema>>({
    resolver: zodResolver(placementSchema),
    defaultValues: {
      studentName: "",
      company: "",
      package: "",
      role: "",
      department: "B. Pharmacy",
      year: new Date().getFullYear(),
      logoUrl: "",
      testimonial: "",
    }
  });

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>, onChange: (val: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: z.infer<typeof placementSchema>) => {
    createPlacement.mutate({ data }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getGetPlacementsQueryKey() });
        toast({ title: "Placement record added" });
        setOpen(false);
        form.reset();
      },
      onError: () => {
        toast({ variant: "destructive", title: "Failed to add placement record" });
      }
    });
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this placement record?")) {
      deletePlacement.mutate({ id }, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getGetPlacementsQueryKey() });
          toast({ title: "Placement record deleted" });
        },
        onError: () => {
          toast({ variant: "destructive", title: "Failed to delete placement record" });
        }
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-primary">Manage Placements</h3>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary"><Plus className="w-4 h-4 mr-2" /> Add Placement</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add Placement Record</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField control={form.control} name="studentName" render={({ field }) => (
                    <FormItem><FormLabel>Student Name</FormLabel><FormControl><Input placeholder="Full Name" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="company" render={({ field }) => (
                    <FormItem><FormLabel>Company Name</FormLabel><FormControl><Input placeholder="E.g. Cipla, Sun Pharma" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <FormField control={form.control} name="package" render={({ field }) => (
                    <FormItem><FormLabel>Package Offered</FormLabel><FormControl><Input placeholder="e.g. 4.2 LPA" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="role" render={({ field }) => (
                    <FormItem><FormLabel>Role / Title</FormLabel><FormControl><Input placeholder="e.g. QC Officer" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="year" render={({ field }) => (
                    <FormItem><FormLabel>Placement Year</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>

                <FormField control={form.control} name="department" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department / Program</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Select program" /></SelectTrigger>
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

                <FormField control={form.control} name="logoUrl" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Logo</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-4 border border-input rounded-md p-2 bg-background">
                        <Input 
                          type="file" 
                          accept="image/*" 
                          onChange={(e) => handleLogoChange(e, field.onChange)} 
                          className="cursor-pointer border-none shadow-none h-auto py-1"
                        />
                        {field.value && (
                          <img 
                            src={field.value} 
                            alt="Preview" 
                            className="h-10 w-10 object-contain border border-border bg-white p-1" 
                          />
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="testimonial" render={({ field }) => (
                  <FormItem><FormLabel>Student Testimonial</FormLabel><FormControl><Textarea placeholder="Share student feedback..." className="h-20 resize-none" {...field} /></FormControl><FormMessage /></FormItem>
                )} />

                <Button type="submit" className="w-full bg-primary text-white" disabled={createPlacement.isPending}>
                  {createPlacement.isPending ? "Adding..." : "Save Placement Record"}
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
              <TableHead>Student Name</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Package</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Year</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              [1, 2, 3].map(i => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-4 w-[150px]" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-[150px]" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-[60px]" /></TableCell>
                  <TableCell><Skeleton className="h-8 w-20 ml-auto" /></TableCell>
                </TableRow>
              ))
            ) : placements.length > 0 ? (
              placements.map((placement) => (
                <TableRow key={placement.id}>
                  <TableCell className="font-medium">{placement.studentName}</TableCell>
                  <TableCell>{placement.company}</TableCell>
                  <TableCell>{placement.package}</TableCell>
                  <TableCell>{placement.department}</TableCell>
                  <TableCell>{placement.year}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDelete(placement.id)}><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No placement records found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
