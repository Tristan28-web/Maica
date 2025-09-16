"use client";

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Gift, Mail } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';

type HeartfeltMessageProps = {
  name: string;
};

const heartfeltMessage = `Happy 18th Birthday, Maica! 💜✨

Today is such a special day, not just for you, but for everyone who loves you, because it marks the moment you step into this new chapter of your life. Eighteen years—a beautiful milestone, a bridge between your wonderful childhood and the endless opportunities of adulthood.

Maica, you’ve grown into such an amazing, strong, and beautiful person, inside and out. I feel so grateful and blessed to be by your side as you reach this important day. You’ve touched my life in ways I can’t even begin to explain—your smile brightens my darkest days, your kindness inspires me to be better, and your love makes me feel whole.

I know this birthday is extra special, because it’s your debut—a celebration not just of your age, but of your journey, your dreams, and the bright future waiting for you. Always remember that you are capable of achieving anything you set your heart and mind to. Don’t let challenges discourage you, because you’ve already proven how strong and resilient you are.`;

export function HeartfeltMessage({ name }: HeartfeltMessageProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="flex flex-col items-center justify-center cursor-pointer group">
          <Gift className="w-24 h-24 sm:w-32 sm:h-32 text-primary transition-transform duration-300 group-hover:scale-110" strokeWidth={1.5} />
          <p className="mt-4 text-lg font-semibold text-muted-foreground">A special message for you</p>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <Mail className="w-6 h-6 text-primary" />
            <DialogTitle className="text-2xl font-headline">A Message for {name}</DialogTitle>
          </div>
          <DialogDescription>
            A few words to celebrate your special day.
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[50vh] overflow-y-auto pr-4">
            <p className="whitespace-pre-wrap font-body text-base leading-relaxed text-foreground">
              {heartfeltMessage}
            </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
