
"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2, PlusCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { ImagePlaceholder } from '@/lib/placeholder-images';

const memorySchema = z.object({
  image: z.any().refine(files => files?.length === 1, 'Image is required.'),
});

type AddMemoryFormProps = {
  onAddMemory: (newImage: ImagePlaceholder) => void;
};

// This component is currently not used, but is kept for future use.
export function AddMemoryForm({ onAddMemory }: AddMemoryFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof memorySchema>>({
    resolver: zodResolver(memorySchema),
  });

  const onSubmit = async (values: z.infer<typeof memorySchema>) => {
    setIsSubmitting(true);
    const file = values.image[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const imageUrl = reader.result as string;
      const newMemoryData: ImagePlaceholder = {
        id: `local-${Date.now()}`,
        imageUrl,
        description: 'A new memory from a friend',
        imageHint: 'uploaded memory',
      };
      
      try {
        // Here you would typically send the data to a server
        // For now, we just update the local state.
        onAddMemory(newMemoryData);
        toast({
          title: 'Memory Added!',
          description: 'Your special moment has been added for this session.',
        });

        setIsOpen(false);
        form.reset();
      } catch (error) {
        console.error(error);
        toast({
          variant: 'destructive',
          title: 'Upload Failed',
          description: 'Could not add your memory. Please try again later.',
        });
      } finally {
        setIsSubmitting(false);
      }
    };
    reader.onerror = () => {
        setIsSubmitting(false);
        toast({
          variant: 'destructive',
          title: 'File Read Error',
          description: 'There was an issue reading your selected file.',
        });
    };
  };
  
  const onOpenChange = (open: boolean) => {
    if (!isSubmitting) {
      setIsOpen(open);
      if (!open) {
        form.reset();
      }
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Your Memory
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a New Memory</DialogTitle>
          <DialogDescription>
            Upload a photo to share a special moment. This will only be stored for your current session.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Photo</FormLabel>
                  <FormControl>
                    <Input 
                      type="file" 
                      accept="image/*"
                      onChange={e => field.onChange(e.target.files)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Add Memory'
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
