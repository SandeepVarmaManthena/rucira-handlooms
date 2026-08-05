"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { CheckCircle2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { scaleIn } from "@/lib/motion";

const newsletterSchema = z.object({
  email: z.string().email("Enter a valid email address"),
});

type NewsletterValues = z.infer<typeof newsletterSchema>;

export function Newsletter() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<NewsletterValues>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    reset();
  };

  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
      <motion.div
        {...scaleIn()}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-maroon via-[oklch(0.4_0.14_22)] to-[oklch(0.52_0.13_30)] px-6 py-12 text-center text-white sm:px-12 sm:py-16"
      >
        <span className="relative inline-flex size-12 items-center justify-center rounded-full bg-white/15">
          <Mail className="size-5" />
        </span>

        <h2 className="relative mt-5 text-balance font-heading text-2xl font-semibold sm:text-3xl">
          Get 10% off your first saree
        </h2>
        <p className="relative mx-auto mt-3 max-w-md text-balance text-sm text-white/80 sm:text-base">
          Join the Rucira family for early access to new weaves, festive
          sales, and the stories behind every saree.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="relative mx-auto mt-7 flex max-w-md flex-col gap-3 sm:flex-row"
        >
          <div className="flex-1 text-left">
            <Input
              type="email"
              placeholder="you@example.com"
              className="h-12 rounded-full border-white/25 bg-white/10 px-5 text-white placeholder:text-white/60 focus-visible:border-white/50 focus-visible:ring-white/30"
              {...register("email")}
            />
            {errors.email && (
              <p className="mt-1.5 px-1 text-xs text-accent">
                {errors.email.message}
              </p>
            )}
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-12 rounded-full bg-accent px-7 text-gold-foreground hover:bg-accent/85"
          >
            {isSubmitSuccessful ? (
              <>
                <CheckCircle2 className="size-4" />
                Subscribed
              </>
            ) : isSubmitting ? (
              "Subscribing..."
            ) : (
              "Subscribe"
            )}
          </Button>
        </form>
      </motion.div>
    </section>
  );
}
