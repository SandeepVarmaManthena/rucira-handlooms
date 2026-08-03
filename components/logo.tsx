import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 font-heading",
        className,
      )}
    >
      <span className="relative flex size-9 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary text-primary-foreground shadow-[0_1px_0_0_rgba(255,255,255,0.15)_inset]">
        <span className="text-[1.05rem] leading-none tracking-tight">R</span>
        <span className="absolute inset-0 rounded-full border border-accent/50" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-base font-semibold tracking-[0.14em]">
          RUCIRA
        </span>
        <span className="text-[0.6rem] tracking-[0.32em] text-muted-foreground">
          SAREES
        </span>
      </span>
    </span>
  );
}
