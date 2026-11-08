"use client";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";

const AppContext = createContext(null);
export const PLAN_CAP = 5;

export function AppProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [ready, setReady] = useState(false);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    try {
      setPlan(JSON.parse(localStorage.getItem("fitlog-plan") || "[]"));
      setSaved(JSON.parse(localStorage.getItem("fitlog-saved") || "[]"));
    } catch (e) {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem("fitlog-plan", JSON.stringify(plan));
      localStorage.setItem("fitlog-saved", JSON.stringify(saved));
    } catch (e) {}
  }, [plan, saved, ready]);

  const toast = useCallback((message) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, message }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2800);
  }, []);

  const addToPlan = (w) => {
    if (plan.some((p) => p.id === w.id)) return toast(`${w.name} is already in today's plan`);
    if (plan.length >= PLAN_CAP) return toast(`Plan is full — max ${PLAN_CAP} lifts`);
    setPlan([...plan, { ...w, done: false }]);
    toast(`Added "${w.name}" to today's plan`);
  };

  const addToSaved = (w) => {
    if (saved.some((s) => s.id === w.id)) return toast(`${w.name} is already saved`);
    setSaved([...saved, w]);
    toast(`Saved "${w.name}" for later`);
  };

  const removeFromPlan = (id) => {
    const w = plan.find((p) => p.id === id);
    setPlan(plan.filter((p) => p.id !== id));
    toast(`Removed "${w?.name}" from today's plan`);
  };

  const removeFromSaved = (id) => {
    const w = saved.find((s) => s.id === id);
    setSaved(saved.filter((s) => s.id !== id));
    toast(`Removed "${w?.name}" from saved`);
  };

  const markDone = (id) => {
    const w = plan.find((p) => p.id === id);
    if (!w || w.done) return;
    setPlan(plan.map((p) => (p.id === id ? { ...p, done: true } : p)));
    toast(`Nice work! "${w.name}" marked as done`);
  };

  return (
    <AppContext.Provider
      value={{ plan, saved, ready, addToPlan, addToSaved, removeFromPlan, removeFromSaved, markDone, toast }}
    >
      {children}
      <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="toast-in flex items-center gap-2 rounded-lg border border-accent/40 bg-card px-4 py-3 text-sm shadow-lg"
          >
            <CheckCircle2 size={18} className="text-accent" />
            {t.message}
          </div>
        ))}
      </div>
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
