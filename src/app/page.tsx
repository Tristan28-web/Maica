"use client";

import { useState, useEffect } from 'react';
import PhotoGallery from '@/components/photo-gallery';
import Confetti from '@/components/confetti';
import { HeartfeltMessage } from '@/components/heartfelt-message';
import { Flower2 } from 'lucide-react';
import { type ImagePlaceholder, PlaceHolderImages as initialImages } from '@/lib/placeholder-images';
import { AddMemoryForm } from '@/components/add-memory-form';
import { useToast } from '@/hooks/use-toast';

const LOCAL_STORAGE_KEY_IMAGES = 'maica-birthday-images';

export default function Home() {
  const [images, setImages] = useState<ImagePlaceholder[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const { toast } = useToast();
  const [storageError, setStorageError] = useState<string | null>(null);

  useEffect(() => {
    if (storageError) {
      toast({
        variant: 'destructive',
        title: 'Storage Full',
        description: storageError,
      });
      setStorageError(null);
    }
  }, [storageError, toast]);

  useEffect(() => {
    setIsMounted(true);
    try {
      // For this change, we will clear the local storage to ensure the new placeholder shows up.
      localStorage.removeItem(LOCAL_STORAGE_KEY_IMAGES);
      setImages(initialImages);
    } catch (error) {
      console.error("Failed to access localStorage", error);
      setImages(initialImages);
    }
  }, []);
  
  const handleAddMemory = (newImage: { imageUrl: string }) => {
    setImages(prevImages => {
        const newImages = [...prevImages];
        const placeholderIndex = prevImages.findIndex(img => img.imageUrl.startsWith('https://picsum.photos'));
        
        const imageToUpdateIndex = placeholderIndex !== -1 ? placeholderIndex : 0;

        if (newImages.length > 0) {
            newImages[imageToUpdateIndex] = {
                ...newImages[imageToUpdateIndex],
                imageUrl: newImage.imageUrl,
                description: 'A new memory',
                imageHint: 'custom memory',
            };
        } else {
            newImages.push({
                id: `memory-${Date.now()}`,
                imageUrl: newImage.imageUrl,
                description: 'A new memory',
                imageHint: 'custom memory',
            });
        }
        
        try {
          localStorage.setItem(LOCAL_STORAGE_KEY_IMAGES, JSON.stringify(newImages));
        } catch (error) {
            if (error instanceof DOMException && (error.name === 'QuotaExceededError' || error.name === 'NS_ERROR_DOM_QUOTA_REACHED')) {
                setStorageError("Your browser's local storage is full. This new memory will only be saved for this session.");
            } else {
                console.error("Failed to save images to localStorage", error);
                setStorageError("Could not save the new memory to your browser's storage.");
            }
        }
        return newImages;
    });
  };
  
  const showAddMemory = isMounted && (!images.length || images.some(img => img.imageUrl.startsWith('https://picsum.photos')));

  
  if (!isMounted) {
    return null; // or a loading spinner
  }

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
              {showAddMemory && (
                 <AddMemoryForm onAddMemory={handleAddMemory} />
              )}
            </div>
            <PhotoGallery images={images} />
          </section>

        </div>
      </main>
    </>
  );
}
