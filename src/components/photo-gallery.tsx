
"use client"

import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import type { ImagePlaceholder } from '@/lib/placeholder-images';
import Autoplay from "embla-carousel-autoplay";

type PhotoGalleryProps = {
  images: ImagePlaceholder[];
};

export default function PhotoGallery({ images }: PhotoGalleryProps) {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false, stopOnHover: false })
  )

  if (!images || images.length === 0) {
    return <p className="text-muted-foreground">The memory book is still empty.</p>;
  }
  
  return (
    <div className="flex justify-center">
      <Carousel 
        plugins={[plugin.current]}
        className="w-full max-w-lg" 
        opts={{ loop: true }}
      >
        <CarouselContent>
          {images.map((image) => (
            <CarouselItem key={image.id}>
              <Card className="overflow-hidden group hover:shadow-xl transition-shadow duration-300 border-8 border-accent">
                <CardContent className="p-0 relative">
                  <div className="aspect-[9/16] bg-muted">
                    <Image
                      src={image.imageUrl}
                      alt={image.description}
                      width={4000}
                      height={6000}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      data-ai-hint={image.imageHint}
                    />
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
