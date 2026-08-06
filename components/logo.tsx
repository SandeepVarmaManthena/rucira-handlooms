import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <span className="inline-flex items-center">
      <Image
        src="/images/logo-light.png"
        alt="Rucira Sarees"
        width={889}
        height={311}
        priority
        className={cn("h-11 w-auto shrink-0 dark:hidden sm:h-14", className)}
      />
      <Image
        src="/images/logo-dark.png"
        alt="Rucira Sarees"
        width={1774}
        height={887}
        priority
        className={cn(
          "hidden h-12 w-auto shrink-0 dark:block sm:h-16",
          className,
        )}
      />
    </span>
  );
}
