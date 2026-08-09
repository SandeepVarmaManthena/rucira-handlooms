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
        className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-maroon via-[oklch(0.4_0.14_22)] to-[oklch(0.52_0.13_30)] px-6 py-12 text-center text-white shadow-[0_30px_60px_rgba(58,19,15,0.22)] sm:px-12 sm:py-16"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.12),transparent_25%)]" />

        <span className="relative inline-flex size-12 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/20">
          <Mail className="size-5" />
        </span>

        <h2 className="relative mt-5 text-balance font-heading text-2xl font-semibold tracking-[-0.02em] sm:text-3xl lg:text-[2.5rem]">
          Get 10% off your first saree
        </h2>
        <p className="relative mx-auto mt-3 max-w-lg text-balance text-sm text-white/80 sm:text-base">
          Join the Rucira family for early access to new weaves, festive drops, and the stories behind every sari.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="relative mx-auto mt-7 flex w-full max-w-md flex-col gap-3 sm:flex-row"
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
            className="h-12 rounded-full bg-accent px-7 text-gold-foreground shadow-[0_12px_22px_rgba(223,182,98,0.32)] transition-all hover:bg-accent/85 sm:w-auto"
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
