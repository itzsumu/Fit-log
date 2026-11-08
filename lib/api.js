const BASE = "https://api.abcz.workers.dev/api/fitlog";
const ALT = "https://api.api-store.workers.dev/api/fitlog";

async function tryFetch(path) {
  for (const base of [BASE, ALT]) {
    try {
      const res = await fetch(`${base}${path}`);
      if (res.ok) return await res.json();
    } catch (e) {
      // fall through to the alternative API
    }
  }
  throw new Error("Failed to fetch data");
}

export const getWorkouts = () => tryFetch("");
export const getWorkout = (id) => tryFetch(`/${id}`);
