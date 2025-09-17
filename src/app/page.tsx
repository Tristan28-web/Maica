
"use client";

import { useState, useEffect } from 'react';
import PhotoGallery from '@/components/photo-gallery';
import Confetti from '@/components/confetti';
import { HeartfeltMessage } from '@/components/heartfelt-message';
import { Flower2 } from 'lucide-react';
import { type ImagePlaceholder, PlaceHolderImages as initialImages } from '@/lib/placeholder-images';
import { AddMemoryForm } from '@/components/add-memory-form';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import AudioPlayer from '@/components/audio-player';

export default function Home() {
  const [images, setImages] = useState<ImagePlaceholder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchMemories = async () => {
      try {
        const response = await fetch('/api/memories');
        if (!response.ok) {
          throw new Error('Failed to fetch memories.');
        }
        const memories = await response.json();
        setImages(memories.length > 0 ? memories : initialImages);
      } catch (error) {
        console.error(error);
        toast({
          variant: 'destructive',
          title: 'Could not load memories',
          description: 'There was a problem connecting to the database. Displaying default image.',
        });
        setImages(initialImages);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMemories();
  }, [toast]);
  
  const handleAddMemory = (newImage: ImagePlaceholder) => {
    // Optimistically update the UI
    setImages(prevImages => {
      const newImages = [...prevImages];
      const placeholderIndex = prevImages.findIndex(img => img.imageUrl.startsWith('https://picsum.photos'));
      const imageToUpdateIndex = placeholderIndex !== -1 ? placeholderIndex : 0;
      if (newImages.length > 0) {
        newImages[imageToUpdateIndex] = newImage;
      } else {
        newImages.push(newImage);
      }
      return newImages;
    });
  };

  return (
    <>
      <Confetti />
      <main className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4 sm:p-8 font-body animate-in fade-in duration-1000">
        <div className="w-full max-w-5xl mx-auto text-center">
          <header className="my-12 sm:my-16 animate-in fade-in slide-in-from-top-10 duration-700">
            <div className="flex items-center justify-center gap-4">
              <Flower2 className="text-accent w-8 h-8 sm:w-10 sm:h-10" />
              <h1 className="text-4xl sm:text-6xl font-headline font-bold">
                Maica's 18th Birthday
              </h1>
              <Flower2 className="text-accent w-8 h-8 sm:w-10 sm:h-10" />
            </div>
            <p className="mt-4 text-2xl sm:text-3xl font-headline text-primary animate-in fade-in slide-in-from-bottom-4 duration-500">
              Happy Birthday!
            </p>
          </header>

          <section className="my-16 animate-in fade-in delay-200 duration-700">
            <HeartfeltMessage name="Maica" />
          </section>

          <section className="animate-in fade-in delay-300 duration-700 my-16">
             <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl sm:text-4xl font-headline">A Treasure of Memories</h2>
                <AddMemoryForm onAddMemory={handleAddMemory} />
            </div>
            {isLoading ? (
              <div className="flex justify-center">
                 <div className="overflow-hidden w-full max-w-lg">
                    <div className="aspect-[9/16] bg-muted">
                        <Skeleton className="w-full h-full" />
                    </div>
                </div>
              </div>
            ) : (
              <PhotoGallery images={images} />
            )}
          </section>

          <section className="my-16 animate-in fade-in delay-400 duration-700">
             <h2 className="text-3xl sm:text-4xl font-headline mb-8">A Special Song</h2>
             <AudioPlayer />
          </section>
        </div>
      </main>
    </>
  );
}
