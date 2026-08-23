import Image from "next/image";

const BANDS = [
  {
    name: "Sarees",
    detail: "Cotton & blends",
    image: "/images/saree/Chettinad-Cotton.jpg",
  },
  {
    name: "Dress materials",
    detail: "Unstitched sets",
    image: "/images/saree/Kota-Doria.jpg",
  },
] as const;

/**
 * Non-interactive on purpose — there's no real Officewear catalogue route
 * yet, and linking these into `/shop` would silently surface Handlooms
 * products under an Officewear category (the H-16 "sections must never mix"
 * hazard). Becomes a real listing link once the option-engine catalogue for
 * this section is built.
 */
export function CategoryBands() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-9 sm:px-6 lg:px-8">
      <div className="grid gap-4 sm:grid-cols-2">
        {BANDS.map((band) => (
          <div
            key={band.name}
            className="relative aspect-[16/7] overflow-hidden rounded-3xl bg-muted"
          >
            <Image
              src={band.image}
              alt=""
              fill
              sizes="(min-width: 640px) 45vw, 90vw"
              className="object-cover"
              style={{ objectPosition: "center 30%" }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/68 to-black/5" />
            <div className="absolute inset-y-0 left-6 flex flex-col justify-center text-white">
              <span className="text-lg font-semibold tracking-[-0.025em]">{band.name}</span>
              <span className="mt-1 text-sm text-white/80">{band.detail}</span>
              <span className="mt-3 inline-flex w-fit items-center rounded-full bg-white/15 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.1em] backdrop-blur-sm">
                Coming soon
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
