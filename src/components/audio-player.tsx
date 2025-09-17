
"use client";

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, Music } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  // The audio will not play until you add your mp3 file.
  // 1. Add your song (e.g., "little-things.mp3") to the `public/audio` folder in your project.
  // 2. The `src` below will then correctly point to your song.
  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
          <div className="flex flex-col items-center gap-2">
              <Music className="w-8 h-8 text-primary" />
              <div className="text-center">
                <CardTitle>Little Things</CardTitle>
                <CardDescription>One Direction</CardDescription>
              </div>
          </div>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center p-6">
        <audio 
            ref={audioRef} 
            src="/audio/little-things.mp3" 
            onEnded={() => setIsPlaying(false)}
            preload="auto"
        />
        <Button onClick={togglePlayPause} size="lg" className="w-full">
          {isPlaying ? (
            <>
              <Pause className="mr-2" /> Pause
            </>
          ) : (
            <>
              <Play className="mr-2" /> Play Song
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
