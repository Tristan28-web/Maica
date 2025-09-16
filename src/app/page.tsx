"use client";

import { useState } from 'react';
import PhotoGallery from '@/components/photo-gallery';
import Confetti from '@/components/confetti';
import { HeartfeltMessage } from '@/components/heartfelt-message';
import { Flower2, PlusCircle } from 'lucide-react';
import { type ImagePlaceholder, PlaceHolderImages as initialImages } from '@/lib/placeholder-images';
import { AddMemoryForm } from '@/components/add-memory-form';

export default function Home() {
  const [images, setImages] = useState<ImagePlaceholder[]>(initialImages);
  const [showAddMemory, setShowAddMemory] = useState(true);

  const handleAddMemory = (newImage: { imageUrl: string }) => {
    setImages(prevImages => [
      ...prevImages,
      {
        id: `memory-${Date.now()}`,
        imageUrl: newImage.imageUrl,
        description: 'A new memory',
        imageHint: 'custom memory',
      },
    ]);
    setShowAddMemory(false);
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

          <section className="animate-in fade-in delay-300 duration-700">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-headline">A Gallery of Memories</h2>
              {showAddMemory && (
                 <AddMemoryForm onAddMemory={handleAddMemory} />
              )}
            </div>
            <PhotoGallery images={images} />
          </section>

          <footer className="mt-16 text-muted-foreground text-sm">
            <p>With love from your friends and family.</p>
          </footer>
        </div>
      </main>
    </>
  );
}
