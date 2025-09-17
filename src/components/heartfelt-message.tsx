"use client";

import { useState, useRef, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Gift, Mail } from 'lucide-react';

type HeartfeltMessageProps = {
  name: string;
};

const heartfeltMessage = `Happy 18th Birthday, Maica! 💜✨

I still can’t believe you’re finally 18. You’ve grown into such an amazing person, and I feel so lucky to be celebrating this special day with you. Thank you for always bringing so much love and light into my life—you really make everything better just by being you.

As you step into this new chapter, I just want you to know I’ll always be here for you—supporting you, cheering for you, and loving you every single day. You deserve all the happiness in the world, and I’ll do my best to give you that.

Happy debut, my love. I’m so proud of you, and I love you more than words can ever explain. 💜`;

const audioUrl = 'https://storage.googleapis.com/stedi-assets/misc/the-only-exception-chorus.mp3';

export function HeartfeltMessage({ name }: HeartfeltMessageProps) {
  const [isOpen, setIsOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Pre-create the audio element
    if (!audioRef.current) {
        audioRef.current = new Audio(audioUrl);
        audioRef.current.loop = true;
    }
  }, []);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      audioRef.current?.play().catch(error => console.error("Audio play failed", error));
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <div className="flex flex-col items-center justify-center cursor-pointer group">
          <Gift className="w-24 h-24 sm:w-32 sm:h-32 text-primary transition-transform duration-300 group-hover:scale-110" strokeWidth={1.5} />
          <p className="mt-4 text-lg font-semibold text-muted-foreground">A special message for you</p>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl flex flex-col max-h-[80vh]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <Mail className="w-6 h-6 text-primary" />
            <DialogTitle className="text-2xl font-headline">A Message for {name}</DialogTitle>
          </div>
          <DialogDescription>
            A few words to celebrate your special day.
          </DialogDescription>
        </DialogHeader>
        <div className="overflow-y-auto pr-4 flex-grow">
          <p className="whitespace-pre-wrap font-body text-base leading-relaxed text-foreground">
            {heartfeltMessage}
          </p>
        </div>
        <div className="mt-4 text-center text-muted-foreground">
            <p>Your Man,</p>
            <p>Tristan Jay</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
