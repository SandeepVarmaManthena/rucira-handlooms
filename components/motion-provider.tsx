"use client";

import { MotionConfig } from "framer-motion";

/**
 * Respects the OS-level "reduce motion" preference site-wide: when a user
 * has it enabled, Framer Motion swaps transform/layout animations for
 * instant transitions instead of disabling motion component-by-component.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
