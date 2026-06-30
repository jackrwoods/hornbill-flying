"use client";

import { useState, useCallback } from "react";
import { AssetImage as Image } from "@/components/AssetImage";
import { cn } from "@/lib/utils";

export interface CarouselImage {
  src: string;
  alt: string;
}

interface ImageCarouselProps {
  images: CarouselImage[];
  aspectRatio?: string;
  className?: string;
}

export function ImageCarousel({
  images,
  aspectRatio = "aspect-[4/3]",
  className,
}: ImageCarouselProps) {
  const [current, setCurrent] = useState(0);

  const goTo = useCallback((index: number) => {
    setCurrent(index);
  }, []);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const previous = useCallback(() => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  if (images.length === 0) return null;

  return (
    <div className={cn("group relative w-full overflow-hidden rounded-xl", aspectRatio, className)}>
      {images.map((img, index) => (
        <div
          key={img.src}
          className={cn(
            "absolute inset-0 transition-opacity duration-500",
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          )}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
            priority={index === 0}
          />
        </div>
      ))}

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={previous}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 z-20 -translate-y-1/2 cursor-pointer rounded-full bg-dark/70 p-2 text-on-dark opacity-100 transition-opacity hover:bg-dark focus:outline-none focus:ring-2 focus:ring-focus-ring"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <button
            type="button"
            onClick={next}
            aria-label="Next image"
            className="absolute right-3 top-1/2 z-20 -translate-y-1/2 cursor-pointer rounded-full bg-dark/70 p-2 text-on-dark opacity-100 transition-opacity hover:bg-dark focus:outline-none focus:ring-2 focus:ring-focus-ring"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-2">
            {images.map((img, index) => (
              <button
                key={img.src}
                type="button"
                onClick={() => goTo(index)}
                aria-label={`Go to image ${index + 1} of ${images.length}`}
                aria-current={index === current ? "true" : undefined}
                className={cn(
                  "h-2 w-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-1",
                  index === current
                    ? "bg-white"
                    : "bg-white/60 hover:bg-white/90"
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
