"use client";

import { useState, useEffect } from 'react';
import CountdownTimer from '@/components/countdown-timer';
import PhotoGallery from '@/components/photo-gallery';
import Confetti from '@/components/confetti';
import { AddMemoryForm } from '@/components/add-memory-form';
import { Flower2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { type ImagePlaceholder, PlaceHolderImages as initialImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [isBirthday, setIsBirthday] = useState(false);
  const [targetDate, setTargetDate] = useState<Date | null>(null);
  const [images, setImages] = useState<ImagePlaceholder[]>(initialImages);
  const [showAddMemory, setShowAddMemory] = useState(true);

  useEffect(() => {
    const now = new Date();
    const currentYear = now.getFullYear();
    
    // Birthday is September 21st.
    const birthdayThisYear = new Date(`${currentYear}-09-21T00:00:00`);

    // Check if the whole day of the birthday has passed.
    const endOfBirthday = new Date(birthdayThisYear);
    endOfBirthday.setDate(endOfBirthday.getDate() + 1);

    if (now >= birthdayThisYear && now < endOfBirthday) {
      setIsBirthday(true);
      setTargetDate(birthdayThisYear);
    } else {
      let nextBirthday = birthdayThisYear;
      if (now.getTime() > birthdayThisYear.getTime()) {
        nextBirthday.setFullYear(currentYear + 1);
      }
      setTargetDate(nextBirthday);
    }
  }, []);

  const handleCountdownComplete = () => {
    setIsBirthday(true);
  };

  const handleAddMemory = (newMemory: { imageUrl: string; description: string }) => {
    setImages(prevImages => [
      ...prevImages,
      {
        id: `new-memory-${Date.now()}`,
        imageHint: 'custom memory',
        ...newMemory,
      },
    ]);
    setShowAddMemory(false);
  };

  return (
    <>
      {isBirthday && <Confetti />}
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
            {isBirthday && (
              <p className="mt-4 text-2xl sm:text-3xl font-headline text-primary animate-in fade-in slide-in-from-bottom-4 duration-500">
                Happy Birthday!
              </p>
            )}
          </header>

          {!isBirthday ? (
            targetDate ? (
              <section className="mb-16 animate-in fade-in delay-200 duration-700">
                <CountdownTimer targetDate={targetDate} onComplete={handleCountdownComplete} />
              </section>
            ) : (
              <section className="mb-16">
                <div className="flex justify-center gap-4 sm:gap-8">
                  <Skeleton className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg" />
                  <Skeleton className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg" />
                  <Skeleton className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg" />
                  <Skeleton className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg" />
                </div>
              </section>
            )
          ) : null}

          <section className="animate-in fade-in delay-300 duration-700">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-headline">A Gallery of Memories</h2>
              {isBirthday && showAddMemory && (
                 <AddMemoryForm onAddMemory={handleAddMemory}>
                    <Button>Add Your Memory</Button>
                 </AddMemoryForm>
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
