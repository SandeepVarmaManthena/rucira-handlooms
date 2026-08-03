"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EASE } from "@/lib/motion";

const QUICK_PROMPTS = [
  "Help me find a saree for a wedding",
  "What fabric suits summer?",
  "Track my order",
];

export function ChatWidget() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="fixed bottom-5 right-4 z-50 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute bottom-16 right-0 flex h-[28rem] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-2xl"
          >
            <div className="flex items-center justify-between gap-3 bg-primary px-4 py-3.5 text-primary-foreground">
              <div className="flex items-center gap-2.5">
                <span className="flex size-8 items-center justify-center rounded-full bg-primary-foreground/15 text-sm font-heading">
                  R
                </span>
                <div className="leading-tight">
                  <p className="text-sm font-semibold">Rucira Assistant</p>
                  <p className="text-[0.7rem] text-primary-foreground/75">
                    Usually replies in a few minutes
                  </p>
                </div>
              </div>
              <button
                type="button"
                aria-label="Close chat"
                onClick={() => setOpen(false)}
                className="flex size-7 items-center justify-center rounded-full transition-colors hover:bg-primary-foreground/15"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              <div className="max-w-[85%] rounded-2xl rounded-bl-sm bg-muted px-3.5 py-2.5 text-sm">
                Namaste! 🙏 I&rsquo;m here to help you find the perfect
                handloom saree, or answer any questions about your order.
              </div>
              <div className="flex flex-col gap-2 pt-2">
                {QUICK_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    className="w-fit rounded-full border border-border bg-background px-3.5 py-1.5 text-left text-xs font-medium text-foreground/80 transition-colors hover:border-primary hover:text-primary"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex items-center gap-2 border-t border-border p-3"
            >
              <input
                type="text"
                placeholder="Type your message..."
                className="h-10 flex-1 rounded-full border border-border bg-background px-4 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              />
              <Button
                type="submit"
                size="icon"
                aria-label="Send message"
                className="rounded-full"
              >
                <Send className="size-4" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        aria-label={open ? "Close chat" : "Chat with us"}
        onClick={() => setOpen((v) => !v)}
        whileTap={{ scale: 0.94 }}
        className="relative flex size-13 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30"
      >
        {!open && (
          <motion.span
            aria-hidden
            animate={{ scale: [1, 1.35, 1], opacity: [0.35, 0, 0.35] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: EASE }}
            className="absolute inset-0 rounded-full bg-primary/50"
          />
        )}
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? "close" : "chat"}
            initial={{ opacity: 0, rotate: -45 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 45 }}
            transition={{ duration: 0.15 }}
            className="relative flex items-center justify-center"
          >
            {open ? (
              <X className="size-5" />
            ) : (
              <MessageCircle className="size-6" />
            )}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
