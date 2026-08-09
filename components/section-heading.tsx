export function SectionHeading({ index, title }: { index: number; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
        {index}
      </span>
      <h2 className="font-heading text-base font-semibold">{title}</h2>
    </div>
  );
}
