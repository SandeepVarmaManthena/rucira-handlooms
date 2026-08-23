import { type RefObject, useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";

/** A confident, no-overshoot ease — settles precisely rather than bouncing past its mark. */
export const EASE = [0.16, 1, 0.3, 1] as const;

export function fadeUp(delay = 0, distance = 22) {
  return {
    initial: { opacity: 0, y: distance },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.7, ease: EASE, delay },
  };
}

export function fadeIn(delay = 0) {
  return {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.6, ease: EASE, delay },
  };
}

export function scaleIn(delay = 0) {
  return {
    initial: { opacity: 0, scale: 0.96 },
    whileInView: { opacity: 1, scale: 1 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.7, ease: EASE, delay },
  };
}

/**
 * Like fadeUp, but animates on mount instead of on scroll-into-view.
 * Use for form/dashboard content that must be visible immediately —
 * fadeUp's whileInView never fires for content that starts below the fold.
 */
export function mountFadeUp(delay = 0, distance = 16) {
  return {
    initial: { opacity: 0, y: distance },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: EASE, delay },
  };
}

/**
 * Parent/child variant pair for staggered reveals. Replaces manually
 * multiplying `i * delay` into `fadeUp()` for each list item — the parent
 * triggers once on scroll-into-view and orchestrates every child itself.
 *
 * Usage: `<motion.div {...staggerContainer()}>` wrapping
 * `<motion.div variants={staggerItem()}>` children (no `initial`/`whileInView`
 * needed on the children — they inherit the parent's variant state).
 */
export function staggerContainer(stagger = 0.08, delayChildren = 0) {
  return {
    initial: "hidden",
    whileInView: "show",
    viewport: { once: true, margin: "-80px" },
    variants: {
      hidden: {},
      show: { transition: { staggerChildren: stagger, delayChildren } },
    },
  };
}

export function staggerItem(distance = 18) {
  return {
    hidden: { opacity: 0, y: distance },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  };
}

/**
 * Scroll-linked parallax drift for a background/decorative element. Returns
 * a motion value to spread onto `style={{ y }}` — `ref` should point at the
 * element's scroll container (often a wrapping `motion.div`).
 */
export function useParallax(ref: RefObject<HTMLElement | null>, distance = 40) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  return useTransform(scrollYProgress, [0, 1], [distance, -distance]);
}

/**
 * Extraction of the scroll-progress-rail technique from the journey process
 * timeline, so other sections can reuse it without re-wiring `useScroll`.
 */
export function useScrollProgressLine(ref: RefObject<HTMLElement | null>) {
  return useScroll({ target: ref, offset: ["start 0.75", "end 0.4"] });
}

/** Editorial clip-path image reveal — an alternative to `scaleIn` for hero/spotlight imagery. */
export function imageRevealMask(delay = 0) {
  return {
    initial: { clipPath: "inset(0% 0% 100% 0%)" },
    whileInView: { clipPath: "inset(0% 0% 0% 0%)" },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.9, ease: EASE, delay },
  };
}

/**
 * Spring-driven count-up, triggered once when `ref` scrolls into view.
 * Framer-native replacement for a hand-rolled IntersectionObserver/rAF loop.
 */
export function useCountUp(value: number, { duration = 1.4 } = {}) {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration, bounce: 0 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, value, motionValue]);

  useEffect(() => {
    const unsubscribe = spring.on("change", (v) => setDisplay(Math.round(v)));
    return unsubscribe;
  }, [spring]);

  return { ref, display };
}
