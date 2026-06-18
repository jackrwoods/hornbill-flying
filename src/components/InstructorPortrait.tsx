import Image from "next/image";
import { cn } from "@/lib/utils";

interface InstructorPortraitProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

const PLACEHOLDER_SIZE = 320;

export function InstructorPortrait({
  src,
  alt,
  className,
  priority = false,
}: InstructorPortraitProps) {
  return (
    <div
      className={cn(
        "relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-xl bg-navy-800",
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        width={PLACEHOLDER_SIZE}
        height={Math.round(PLACEHOLDER_SIZE * 1.25)}
        priority={priority}
        className="h-full w-full object-cover"
        sizes="(max-width: 768px) 100vw, 320px"
      />
    </div>
  );
}
