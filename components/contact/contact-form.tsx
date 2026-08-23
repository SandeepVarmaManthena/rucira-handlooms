"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { EASE, mountFadeUp } from "@/lib/motion";

export function ContactForm() {
  const [submitted, setSubmitted] = React.useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // No backend exists yet — this only confirms the message was captured
    // locally, it does not send an email. See contact-form success copy.
    setSubmitted(true);
  }

  return (
    <motion.div {...mountFadeUp(0)} className="rounded-2xl border border-border bg-card p-6 sm:p-8">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="flex flex-col items-center py-8 text-center"
          >
            <span className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <CheckCircle2 className="size-6" />
            </span>
            <h3 className="mt-4 font-heading text-lg font-semibold">
              Thanks — we’ll get back to you soon.
            </h3>
            <p className="mt-1.5 max-w-xs text-sm text-muted-foreground">
              We’ve noted your message. If it’s urgent, call or email us
              directly using the details alongside.
            </p>
            <Button
              variant="outline"
              className="mt-6 h-10 rounded-full px-5"
              onClick={() => setSubmitted(false)}
            >
              Send another message
            </Button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <h2 className="font-heading text-lg font-semibold">Send a message</h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="contact-name">Name</Label>
                <Input id="contact-name" name="name" required placeholder="Your name" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="contact-email">Email</Label>
                <Input id="contact-email" name="email" type="email" required placeholder="you@example.com" />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="contact-message">Message</Label>
              <Textarea
                id="contact-message"
                name="message"
                required
                placeholder="How can we help?"
                className="min-h-32"
              />
            </div>

            <Button type="submit" size="lg" className="h-11 w-full rounded-xl sm:w-auto">
              <Send className="size-4" />
              Send message
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
