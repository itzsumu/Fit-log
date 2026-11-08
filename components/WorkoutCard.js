import Link from "next/link";
import { Clock, Flame, Star } from "lucide-react";

export function Tags({ tags }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((t) => (
        <span
          key={t}
          className="rounded-full border border-line bg-white/5 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-accent"
        >
          {t}
        </span>
      ))}
    </div>
  );
}

export function Stats({ w }) {
  return (
    <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
      <span className="flex items-center gap-1"><Clock size={15} className="text-accent" />{w.duration} min</span>
      <span className="flex items-center gap-1"><Flame size={15} className="text-accent" />{w.caloriesBurned} kcal</span>
      <span className="flex items-center gap-1"><Star size={15} className="text-accent" />{w.rating}</span>
    </div>
  );
}

export default function WorkoutCard({ w }) {
  return (
    <Link
      href={`/workout/${w.id}`}
      className="group block overflow-hidden rounded-xl border border-line bg-card transition hover:-translate-y-1 hover:border-accent/60"
    >
      <div className="aspect-[4/3] overflow-hidden bg-black">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={w.image}
          alt={w.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>
      <div className="space-y-3 p-4">
        <Tags tags={w.muscleGroups} />
        <h3 className="font-display text-xl font-bold uppercase">{w.name}</h3>
        <p className="text-sm text-muted">{w.equipment}</p>
        <Stats w={w} />
      </div>
    </Link>
  );
}
