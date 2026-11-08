"use client";
import { useState } from "react";
import Link from "next/link";
import { Check, X } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { Stats } from "@/components/WorkoutCard";
import { Spinner } from "@/components/Library";

export default function MyPlan() {
  const { plan, saved, ready, removeFromPlan, removeFromSaved, markDone } = useApp();
  const [tab, setTab] = useState("plan");

  const minutes = plan.reduce((s, w) => s + w.duration, 0);
  const calories = plan.reduce((s, w) => s + w.caloriesBurned, 0);
  const list = tab === "plan" ? plan : saved;

  const metrics = [
    ["Exercises", plan.length],
    ["Minutes", minutes],
    ["Calories", calories],
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-4xl font-bold uppercase sm:text-5xl">My Plan</h1>
      <p className="mt-1 text-muted">Cap of five lifts for today. Finish them, then load more.</p>

      <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-4">
        {metrics.map(([label, val]) => (
          <div key={label} className="rounded-xl border border-line bg-card p-4 text-center">
            <p className="font-display text-3xl font-bold text-accent sm:text-4xl">{val}</p>
            <p className="text-xs uppercase tracking-wider text-muted">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex gap-2 border-b border-line">
        {[
          ["plan", "Today's Plan", plan.length],
          ["saved", "Saved", saved.length],
        ].map(([key, label, n]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`-mb-px border-b-2 px-4 py-2.5 text-sm font-semibold transition ${
              tab === key ? "border-accent text-accent" : "border-transparent text-muted hover:text-white"
            }`}
          >
            {label} ({n})
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-4">
        {!ready ? (
          <Spinner />
        ) : list.length === 0 ? (
          <div className="rounded-xl border border-dashed border-line py-16 text-center">
            <h2 className="font-display text-2xl font-bold uppercase">Nothing here yet</h2>
            <p className="mt-2 text-muted">Browse the library and add a lift to get today moving.</p>
            <Link href="/" className="mt-6 inline-block rounded-md bg-accent px-6 py-3 font-bold text-black">
              Go to workouts
            </Link>
          </div>
        ) : (
          list.map((w) => (
            <div
              key={w.id}
              className={`flex flex-col gap-4 rounded-xl border bg-card p-4 sm:flex-row sm:items-center ${
                w.done ? "border-accent/50 opacity-70" : "border-line"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={w.image} alt={w.name} className="h-24 w-full rounded-lg object-cover sm:w-28" />
              <div className="flex-1 space-y-1.5">
                <h3 className="font-display text-xl font-bold uppercase">
                  {w.name} {w.done && <span className="ml-2 text-xs text-accent">DONE</span>}
                </h3>
                <p className="text-sm text-muted">{w.equipment}</p>
                <Stats w={w} />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Link
                  href={`/workout/${w.id}`}
                  className="rounded-md border border-line px-3 py-2 text-sm font-semibold hover:border-accent"
                >
                  View Details
                </Link>
                {tab === "plan" && (
                  <button
                    onClick={() => markDone(w.id)}
                    disabled={w.done}
                    className="flex items-center gap-1 rounded-md bg-accent px-3 py-2 text-sm font-bold text-black disabled:opacity-40"
                  >
                    <Check size={16} /> {w.done ? "Done" : "Mark as Done"}
                  </button>
                )}
                <button
                  onClick={() => (tab === "plan" ? removeFromPlan(w.id) : removeFromSaved(w.id))}
                  aria-label={`Remove ${w.name}`}
                  className="rounded-md border border-line p-2 text-muted hover:border-red-500 hover:text-red-500"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
