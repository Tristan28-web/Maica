import Image from 'next/image';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import type { ImagePlaceholder } from '@/lib/placeholder-images';

type PhotoGalleryProps = {
  images: ImagePlaceholder[];
};

export default function PhotoGallery({ images }: PhotoGalleryProps) {
  const mainImage = images && images.length > 0 ? images[0] : null;

  if (!mainImage) {
    return <p className="text-muted-foreground">The memory book is still empty.</p>;
  }

  return (
    <div className="flex justify-center">
      <Card className="overflow-hidden group hover:shadow-xl transition-shadow duration-300 border-8 border-accent w-full max-w-lg">
        <CardContent className="p-0 relative">
          <div className="aspect-[9/16] bg-muted">
            <Image
              src={mainImage.imageUrl}
              alt={mainImage.description}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              data-ai-hint={mainImage.imageHint}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
