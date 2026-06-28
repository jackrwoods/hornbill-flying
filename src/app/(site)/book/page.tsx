import { Suspense } from "react";
import { BookingFlow } from "@/components/booking/BookingFlow";
import { BookingSkeleton } from "@/components/booking/BookingSkeleton";

export default function BookPage() {
  return (
    <Suspense fallback={<BookingSkeleton />}>
      <BookingFlow />
    </Suspense>
  );
}
