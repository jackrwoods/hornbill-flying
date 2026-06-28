import type { FAQItem } from "@/types";

export const instructorsFAQ: FAQItem[] = [
  {
    id: "choose-instructor",
    question: "Can I choose my instructor at Hornbill Aviation?",
    answer:
      "Yes. Pick the CFI whose schedule and teaching style fit you. If your preferred instructor is unavailable, we will suggest another member of the team.",
  },
  {
    id: "bring-own-cfi",
    question: "Can I bring my own CFI?",
    answer:
      "Yes. As a Part 61 school, you can train with your own instructor in our PA28 fleet. We handle aircraft scheduling and checkout.",
  },
  {
    id: "book-specific-instructor",
    question: "How do I book a flight with a specific instructor?",
    answer:
      "Start by booking a discovery flight and select the instructor you want to fly with. For ongoing lessons, coordinate directly with your CFI or call the office.",
  },
  {
    id: "instructor-unavailable",
    question: "What if my preferred instructor is unavailable?",
    answer:
      "We will match you with another Hornbill Aviation CFI who teaches the same programs. Every instructor trains in the same PA28 fleet, so your progress stays consistent.",
  },
];
