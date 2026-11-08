"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/context/AppContext";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = useApp();
  const link = (href, label, active) => (
    <Link
      href={href}
      className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
        active ? "bg-white/10 text-accent" : "text-muted hover:text-white"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-base/90 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="FitLog logo" width={28} height={28} />
          <span className="hidden font-display text-xl font-bold tracking-wide sm:inline">FITLOG</span>
        </Link>

        <div className="flex items-center gap-1">
          {link("/", "Workout", pathname === "/" || pathname.startsWith("/workout"))}
          {link("/my-plan", "My Plan", pathname === "/my-plan")}
        </div>

        <div className="flex items-center gap-2">
          <Link href="/my-plan" className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-black">
            Plan <span className="ml-1">{plan.length}</span>
          </Link>
          <Link
            href="/my-plan"
            className="rounded-full border border-accent px-3 py-1 text-xs font-bold text-accent"
          >
            Saved <span className="ml-1">{saved.length}</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
