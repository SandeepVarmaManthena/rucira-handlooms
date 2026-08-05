import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ComingSoon({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
        {eyebrow}
      </p>
      <h1 className="mt-5 text-balance font-heading text-3xl font-semibold sm:text-4xl">
        {title}
      </h1>
      <p className="mt-4 max-w-md text-balance leading-relaxed text-muted-foreground">
        {description}
      </p>
      <Button
        variant="outline"
        className="mt-8 h-11 rounded-full px-6"
        render={<Link href="/" />}
        nativeButton={false}
      >
        <ArrowLeft className="size-4" />
        Back to Home
      </Button>
    </section>
  );
}
