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
