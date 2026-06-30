import { AssetImage as Image } from "@/components/AssetImage";
import { cn } from "@/lib/utils";

interface InstructorPhotoProps {
  src?: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

const PLACEHOLDER_AVATAR = "/images/instructors/placeholder-avatar.svg";
const DEFAULT_WIDTH = 320;
const DEFAULT_HEIGHT = 400;

export function InstructorPhoto({
  src,
  alt,
  className,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 320px",
}: InstructorPhotoProps) {
  const imageSrc = src || PLACEHOLDER_AVATAR;

  return (
    <div
      className={cn(
        "relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-dark-muted",
        className
      )}
    >
      <Image
        src={imageSrc}
        alt={alt}
        width={DEFAULT_WIDTH}
        height={DEFAULT_HEIGHT}
        priority={priority}
        className="h-full w-full object-cover"
        sizes={sizes}
      />
    </div>
  );
}
