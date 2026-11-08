"use client";
import { useEffect, useMemo, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { getWorkouts } from "@/lib/api";
import WorkoutCard from "./WorkoutCard";

export function Spinner({ label = "Loading workouts…" }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20 text-muted">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-line border-t-accent" />
      <p>{label}</p>
    </div>
  );
}

export default function Library() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [sortBy, setSortBy] = useState("duration");
  const [query, setQuery] = useState("");

  useEffect(() => {
    getWorkouts()
      .then(setWorkouts)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const list = useMemo(() => {
    const key = { duration: "duration", calories: "caloriesBurned", rating: "rating" }[sortBy];
    const q = query.trim().toLowerCase();
    return workouts
      .filter(
        (w) =>
          !q ||
          w.name.toLowerCase().includes(q) ||
          w.muscleGroups.some((m) => m.toLowerCase().includes(q))
      )
      .sort((a, b) => b[key] - a[key]);
  }, [workouts, sortBy, query]);

  return (
    <section id="library" className="mx-auto max-w-7xl scroll-mt-20 px-4 sm:px-6">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="font-display text-3xl font-bold uppercase sm:text-4xl">The Library</h2>
          <p className="mt-1 text-muted">Twelve lifts covering every major muscle group.</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name or tag"
              className="w-full rounded-md border border-line bg-card py-2 pl-9 pr-3 text-sm outline-none focus:border-accent sm:w-56"
            />
          </div>
          <label className="flex items-center gap-2 text-sm text-muted">
            Sort By
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none rounded-md border border-line bg-card py-2 pl-3 pr-9 text-sm text-white outline-none focus:border-accent"
              >
                <option value="duration">Duration</option>
                <option value="calories">Calories</option>
                <option value="rating">Rating</option>
              </select>
              <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />
            </div>
          </label>
        </div>
      </div>

      {loading ? (
        <Spinner />
      ) : error ? (
        <p className="py-20 text-center text-muted">Could not load workouts. Please refresh.</p>
      ) : list.length === 0 ? (
        <p className="py-20 text-center text-muted">No workouts match your search.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((w) => (
            <WorkoutCard key={w.id} w={w} />
          ))}
        </div>
      )}
    </section>
  );
}
