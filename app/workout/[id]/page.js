"use client";
import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import { Bookmark, Plus } from "lucide-react";
import { getWorkout } from "@/lib/api";
import { useApp, PLAN_CAP } from "@/context/AppContext";
import { Spinner } from "@/components/Library";
import { Tags } from "@/components/WorkoutCard";

export default function WorkoutDetail() {
  const { id } = useParams();
  const { plan, addToPlan, addToSaved } = useApp();
  const [w, setW] = useState(null);
  const [loading, setLoading] = useState(true);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    getWorkout(id)
      .then((d) => (d && d.id ? setW(d) : setMissing(true)))
      .catch(() => setMissing(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Spinner label="Loading workout…" />;
  if (missing || !w) notFound();

  const inPlan = plan.some((p) => p.id === w.id);
  const full = plan.length >= PLAN_CAP && !inPlan;

  const specs = [
    ["Equipment", w.equipment],
    ["Difficulty", w.difficulty],
    ["Sets", w.sets],
    ["Reps", w.reps],
    ["Duration", `${w.duration} min`],
    ["Calories", `${w.caloriesBurned} kcal`],
    ["Rating", w.rating],
  ];

  return (
    <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-2">
      <div className="overflow-hidden rounded-2xl border border-line bg-black">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={w.image} alt={w.name} className="h-full w-full object-cover" />
      </div>

      <div className="space-y-6">
        <h1 className="font-display text-4xl font-bold uppercase sm:text-5xl">{w.name}</h1>
        <p className="text-muted">{w.description}</p>
        <Tags tags={w.muscleGroups} />

        <div className="rounded-xl border border-line bg-card">
          <h2 className="border-b border-line px-5 py-3 font-display text-sm uppercase tracking-widest text-accent">
            Key Specs
          </h2>
          <dl>
            {specs.map(([k, v]) => (
              <div key={k} className="flex justify-between border-b border-line px-5 py-2.5 last:border-0">
                <dt className="text-xs uppercase tracking-wider text-muted">{k}</dt>
                <dd className="text-sm font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <h2 className="mb-3 font-display text-sm uppercase tracking-widest text-accent">Instructions</h2>
          <ol className="space-y-3">
            {w.instructions.map((s, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-black">
                  {i + 1}
                </span>
                <span className="text-sm text-gray-300">{s}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            onClick={() => addToPlan(w)}
            disabled={full}
            className="flex items-center justify-center gap-2 rounded-md bg-accent px-6 py-3 font-bold text-black transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Plus size={18} /> {full ? "Plan is full (5/5)" : "Add to today's plan"}
          </button>
          <button
            onClick={() => addToSaved(w)}
            className="flex items-center justify-center gap-2 rounded-md border border-accent px-6 py-3 font-bold text-accent transition hover:bg-accent/10"
          >
            <Bookmark size={18} /> Save for later
          </button>
        </div>
      </div>
    </div>
  );
}
