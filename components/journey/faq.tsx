"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqItems } from "@/lib/mock-data";
import { fadeUp } from "@/lib/motion";

export function Faq() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="text-center">
        <p className="text-xs font-semibold tracking-[0.2em] text-primary">
          QUESTIONS
        </p>
        <h2 className="mt-2 text-balance font-heading text-2xl font-semibold sm:text-3xl">
          Before you order
        </h2>
      </div>

      <motion.div {...fadeUp(0)} className="mt-10 sm:mt-12">
        <Accordion defaultValue={["item-0"]}>
          {faqItems.map((item, i) => (
            <AccordionItem key={item.question} value={`item-${i}`}>
              <AccordionTrigger className="text-left text-base font-medium hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </section>
  );
}
