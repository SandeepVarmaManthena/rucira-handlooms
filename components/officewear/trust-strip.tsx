import { Package, CheckCircle2, Sparkles } from "lucide-react";

const ITEMS = [
  {
    icon: Package,
    title: "Dispatched in [N] days",
    detail: "[Intake D5]",
  },
  {
    icon: CheckCircle2,
    title: "[N]-day returns",
    detail: "[Intake E1]",
  },
  {
    icon: Sparkles,
    title: "Woven by hand",
    detail: "Same looms, everyday cloth",
  },
] as const;

/**
 * The two intake-gated facts (dispatch SLA, return window) use the same
 * bracket-placeholder convention as the approved design canvas — honest
 * about what's unanswered rather than inventing a number.
 */
export function TrustStrip() {
  return (
    <div className="border-t border-border bg-card">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-9 sm:grid-cols-3 sm:px-6 lg:px-8">
        {ITEMS.map(({ icon: Icon, title, detail }) => (
          <div key={title} className="flex items-start gap-3">
            <Icon className="mt-0.5 size-[1.05rem] shrink-0 text-primary" />
            <div>
              <p className="text-sm font-semibold">{title}</p>
              <p className="mt-1 text-xs text-muted-foreground">{detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
