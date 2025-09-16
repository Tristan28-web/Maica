"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Gift, Mail } from 'lucide-react';
import { generateHeartfeltMessage } from '@/ai/flows/heartfelt-message-flow';
import { ScrollArea } from './ui/scroll-area';
import { Skeleton } from './ui/skeleton';

type HeartfeltMessageProps = {
  name: string;
};

export function HeartfeltMessage({ name }: HeartfeltMessageProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleOpen = async () => {
    if (message) {
      setIsOpen(true);
      return;
    }

    setIsLoading(true);
    setError('');
    try {
      const result = await generateHeartfeltMessage({ name });
      setMessage(result.message);
      setIsOpen(true);
    } catch (err) {
      setError('Sorry, I couldn\'t write a message right now. Please try again in a moment.');
      // You could optionally open the dialog to show the error
      // setIsOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="flex flex-col items-center justify-center cursor-pointer group">
          <Gift className="w-24 h-24 sm:w-32 sm:h-32 text-primary transition-transform duration-300 group-hover:scale-110" strokeWidth={1.5} />
          <p className="mt-4 text-lg font-semibold text-muted-foreground">A special message for you</p>
          {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <Mail className="w-6 h-6 text-primary" />
            <DialogTitle className="text-2xl font-headline">A Message for {name}</DialogTitle>
          </div>
          <DialogDescription>
            A few words to celebrate your special day.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-1 -mx-6 px-6">
          <div className="py-4 text-left">
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                 <Skeleton className="h-4 w-3/4" />
              </div>
            ) : (
              <p className="whitespace-pre-wrap font-body text-base leading-relaxed text-foreground">
                {message}
              </p>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
