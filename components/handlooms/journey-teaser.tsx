import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const STEPS = [
  { step: "01", title: "Yarn & dye" },
  { step: "02", title: "Warping the loom" },
  { step: "03", title: "Weaving" },
] as const;

/**
 * Per-weave journey pages don't exist yet (deferred — see plan); this teases
 * the concept and routes everyone to the single existing global `/journey`
 * page in the meantime, using the same bracket-placeholder convention the
 * approved design uses for content still gated on client intake.
 */
export function JourneyTeaser() {
  return (
    <div className="border-t border-border bg-card">
      <div className="mx-auto grid max-w-7xl gap-7 px-4 py-11 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <h2 className="font-heading text-xl font-semibold tracking-[-0.02em]">
            The journey of each weave
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Origin, process, and how to tell a real one from a powerloom copy —
            written per weave.
          </p>
          <Button
            variant="outline"
            className="mt-4 h-[2.35rem] rounded-xl px-5 text-sm font-medium"
            render={<Link href="/journey" />}
            nativeButton={false}
          >
            All eight journeys
            <ArrowRight className="size-3.5" />
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 lg:col-span-2">
          {STEPS.map((s) => (
            <div key={s.step} className="rounded-2xl border border-border bg-background p-4">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-primary">
                Step {s.step}
              </p>
              <p className="mt-2 text-sm font-semibold">{s.title}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                [Client content — intake H2]
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
