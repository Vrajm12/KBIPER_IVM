import { useGetMediaItems, getGetMediaItemsQueryKey, useDeleteMediaItem, useCreateMediaItem } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, ImageIcon, PlayCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";

const mediaSchema = z.object({
  title: z.string().min(1, "Title is required"),
  type: z.enum(["image", "video"]),
  category: z.string().min(1, "Category is required"),
  url: z.string().min(1, "Media URL or file is required"),
  thumbnailUrl: z.string().optional(),
});

const CATEGORIES = ["campus", "events", "labs", "sports", "cultural"];

export function MediaManager() {
  const { data: mediaData, isLoading } = useGetMediaItems();
  const media = Array.isArray(mediaData) ? mediaData : [];
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const deleteMedia = useDeleteMediaItem();
  const createMedia = useCreateMediaItem();
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof mediaSchema>>({
    resolver: zodResolver(mediaSchema),
    defaultValues: {
      title: "",
      type: "image",
      category: "campus",
      url: "",
      thumbnailUrl: "",
    }
  });

  const mediaType = form.watch("type");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, onChange: (val: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: z.infer<typeof mediaSchema>) => {
    createMedia.mutate({ data }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getGetMediaItemsQueryKey() });
        toast({ title: "Media item added successfully" });
        setOpen(false);
        form.reset();
      },
      onError: () => {
        toast({ variant: "destructive", title: "Failed to upload media item" });
      }
    });
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this media item?")) {
      deleteMedia.mutate({ id }, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getGetMediaItemsQueryKey() });
          toast({ title: "Media item deleted" });
        },
        onError: () => {
          toast({ variant: "destructive", title: "Failed to delete media item" });
        }
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-primary">Manage Media Gallery</h3>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary"><Plus className="w-4 h-4 mr-2" /> Upload Media</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Upload Media Gallery Item</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField control={form.control} name="title" render={({ field }) => (
                  <FormItem><FormLabel>Title</FormLabel><FormControl><Input placeholder="E.g. Chemistry Lab Inauguration" {...field} /></FormControl><FormMessage /></FormItem>
                )} />

                <div className="grid grid-cols-2 gap-4">
                  <FormField control={form.control} name="type" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="image">Image</SelectItem>
                          <SelectItem value="video">Video</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="category" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {CATEGORIES.map(cat => (
                            <SelectItem key={cat} value={cat} className="capitalize">{cat}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>

                {mediaType === "image" ? (
                  <FormField control={form.control} name="url" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Upload Image</FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-4 border border-input rounded-md p-2 bg-background">
                          <Input 
                            type="file" 
                            accept="image/*" 
                            onChange={(e) => handleFileChange(e, field.onChange)} 
                            className="cursor-pointer border-none shadow-none h-auto py-1"
                          />
                          {field.value && (
                            <img 
                              src={field.value} 
                              alt="Preview" 
                              className="h-10 w-10 rounded object-cover border border-border" 
                            />
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                ) : (
                  <>
                    <FormField control={form.control} name="url" render={({ field }) => (
                      <FormItem><FormLabel>Video Link (YouTube URL / Direct MP4 URL)</FormLabel><FormControl><Input placeholder="https://www.youtube.com/watch?v=..." {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="thumbnailUrl" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Upload Video Thumbnail</FormLabel>
                        <FormControl>
                          <div className="flex items-center gap-4 border border-input rounded-md p-2 bg-background">
                            <Input 
                              type="file" 
                              accept="image/*" 
                              onChange={(e) => handleFileChange(e, field.onChange)} 
                              className="cursor-pointer border-none shadow-none h-auto py-1"
                            />
                            {field.value && (
                              <img 
                                src={field.value} 
                                alt="Preview" 
                                className="h-10 w-10 rounded object-cover border border-border" 
                              />
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </>
                )}

                <Button type="submit" className="w-full bg-primary text-white" disabled={createMedia.isPending}>
                  {createMedia.isPending ? "Uploading..." : "Save Media Item"}
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {isLoading ? (
          [1, 2, 3, 4, 5].map(i => (
            <div key={i} className="aspect-square rounded-lg bg-muted border border-border animate-pulse" />
          ))
        ) : media.length > 0 ? (
          media.map((item) => (
            <div key={item.id} className="group relative aspect-square rounded-lg overflow-hidden bg-muted border border-border">
              {item.type === 'video' && !item.thumbnailUrl ? (
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground bg-secondary/10">
                  <PlayCircle className="h-10 w-10 opacity-50" />
                </div>
              ) : (
                <img 
                  src={item.thumbnailUrl || item.url} 
                  alt={item.title} 
                  className="w-full h-full object-cover" 
                />
              )}
              
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                <div className="flex justify-between items-start">
                  <Badge variant="secondary" className="text-[10px] uppercase">{item.category}</Badge>
                  <Button variant="destructive" size="icon" className="h-7 w-7 rounded-full" onClick={() => handleDelete(item.id)}>
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
                <div className="text-white">
                  <div className="flex items-center gap-1 text-[10px] text-white/70 mb-1 uppercase tracking-wider font-semibold">
                    {item.type === 'video' ? <PlayCircle className="h-3 w-3" /> : <ImageIcon className="h-3 w-3" />}
                    {item.type}
                  </div>
                  <h4 className="text-sm font-medium line-clamp-2 leading-tight">{item.title}</h4>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-muted-foreground border-2 border-dashed rounded-lg">
            No media items found in the gallery.
          </div>
        )}
      </div>
    </div>
  );
}
