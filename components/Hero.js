import { ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 md:py-20">
      <div>
        <p className="mb-3 text-sm font-semibold tracking-[0.25em] text-accent">WORKOUT LIBRARY</p>
        <h1 className="font-display text-4xl font-bold uppercase leading-tight sm:text-5xl lg:text-6xl">
          Train with intent. <span className="text-accent">Log every set.</span>
        </h1>
        <p className="mt-5 max-w-xl text-muted">
          FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan,
          and watch the week&apos;s work add up.
        </p>
        <a
          href="#library"
          className="mt-8 inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 font-bold uppercase text-black transition hover:brightness-110"
        >
          Browse Workouts <ArrowDown size={18} />
        </a>
      </div>
      <div className="flex justify-center md:justify-end">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/banner.png"
          alt="FitLog hero banner"
          className="w-full max-w-sm rounded-2xl border border-line object-cover"
        />
      </div>
    </section>
  );
}
