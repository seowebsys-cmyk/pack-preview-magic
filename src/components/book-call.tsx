// TODO: replace with the real RoasterPack Calendly event link once provided.
export const CALENDLY_URL = "https://calendly.com/roasterpack/intro-call";

export function BookCall() {
  return (
    <section className="border-t border-border bg-primary py-20 text-primary-foreground">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
        <p className="text-xs font-bold tracking-[0.25em] text-primary-foreground/60 uppercase">
          Speak with a representative
        </p>
        <h2 className="font-display mx-auto mt-3 max-w-2xl text-4xl text-balance sm:text-5xl">
          Talk packaging with our team
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-primary-foreground/70">
          Questions about sizes, materials, print or pricing? Book a call at a
          time that suits you and we'll walk you through it.
        </p>
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-background px-8 py-3.5 text-sm font-bold tracking-wide text-foreground uppercase transition-opacity hover:opacity-90"
        >
          Book a call
        </a>
      </div>
    </section>
  );
}
