import Image from 'next/image';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function PhotoGallery() {
  if (!PlaceHolderImages.length) {
    return <p className="text-muted-foreground">The memory book is still empty.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {PlaceHolderImages.map((image) => (
        <Card key={image.id} className="overflow-hidden group hover:shadow-xl transition-shadow duration-300 border-2 border-transparent hover:border-accent">
          <CardContent className="p-0 relative">
            <div className="aspect-[4/3] bg-muted">
              <Image
                src={image.imageUrl}
                alt={image.description}
                width={600}
                height={400}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                data-ai-hint={image.imageHint}
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
              <p className="text-sm text-white/90 italic">{image.description}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
