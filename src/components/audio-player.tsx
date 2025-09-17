
"use client";

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Music, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Skeleton } from './ui/skeleton';

export default function AudioPlayer() {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchAudio = async () => {
      try {
        const response = await fetch('/api/audio');
        if (!response.ok) {
          throw new Error('Failed to fetch audio.');
        }
        const audio = await response.json();
        if (audio) {
          setAudioUrl(audio.audioUrl);
        }
      } catch (error) {
        console.error(error);
        toast({
          variant: 'destructive',
          title: 'Could not load audio',
          description: 'There was a problem connecting to the database.',
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchAudio();
  }, [toast]);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const newAudioUrl = reader.result as string;
      
      try {
        const response = await fetch('/api/audio', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ audioUrl: newAudioUrl }),
        });

        if (!response.ok) {
          throw new Error('Failed to save audio to the database.');
        }
        
        const savedAudio = await response.json();
        setAudioUrl(savedAudio.audioUrl);
        toast({
          title: 'Audio Saved!',
          description: 'Your special song has been saved.',
        });
      } catch (error) {
        console.error(error);
        toast({
          variant: 'destructive',
          title: 'Upload Failed',
          description: 'Could not save your audio. Please try again later.',
        });
      } finally {
        setIsUploading(false);
      }
    };
    reader.onerror = () => {
        setIsUploading(false);
        toast({
          variant: 'destructive',
          title: 'File Read Error',
          description: 'There was an issue reading your selected file.',
        });
    };
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className="max-w-md mx-auto">
        <CardHeader>
            <div className="flex items-center gap-4">
                <Music className="w-6 h-6 text-primary" />
                <CardTitle>Play a Song</CardTitle>
            </div>
        </CardHeader>
        <CardContent>
            {isLoading ? (
                 <div className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                    </div>
                </div>
            ) : audioUrl ? (
                <audio controls src={audioUrl} className="w-full">
                    Your browser does not support the audio element.
                </audio>
            ) : (
                <p className="text-muted-foreground">No song has been uploaded yet.</p>
            )}
        </CardContent>
        <CardFooter>
            <Input 
                type="file" 
                accept="audio/*" 
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                disabled={isUploading}
            />
            <Button onClick={handleUploadClick} disabled={isUploading} className="w-full">
                {isUploading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Uploading...
                    </>
                ) : (
                    <>
                        <Upload className="mr-2 h-4 w-4" />
                        Upload a song
                    </>
                )}
            </Button>
        </CardFooter>
    </Card>
  );
}
