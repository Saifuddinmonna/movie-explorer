
import { Play, Sparkles, Film, ArrowRight, Star } from 'lucide-react';



export const HeroBanner = ({
  onExploreClick,
  onQuickSearch,
}) => {
  return (
    <section className="relative overflow-hidden border-b border-slate-800 bg-slate-950 py-16 sm:py-24 lg:py-28">
      {/* Background Image with Dark Vignette & Gradient Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=2000&q=80"
          alt="Cinema Movie Theater"
          className="h-full w-full object-cover opacity-20 filter blur-[1px]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-rose-950/30" />
      </div>

      {/* Decorative Glow Dots */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-rose-600/15 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-10 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl" />

      {/* Hero Content matching Wireframe */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        {/* Subtle pill badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-950/40 px-4 py-1.5 text-xs font-medium text-rose-300 backdrop-blur-md">
          <Sparkles className="h-3.5 w-3.5 text-rose-400" />
          <span>Interactive Movie Explorer • Live TVMaze API</span>
          <span className="hidden sm:inline text-rose-400">• 🇧🇩 Dhaka Edition</span>
        </div>

        {/* Heading: DISCOVER MOVIES (Wireframe compliant) */}
        <h1 className="text-4xl font-black uppercase tracking-tight text-white sm:text-6xl md:text-7xl">
          DISCOVER <span className="bg-gradient-to-r from-rose-500 via-red-400 to-amber-400 bg-clip-text text-transparent">MOVIES</span>
        </h1>

        {/* Description (Engaging, Wireframe compliant) */}
        <p className="mx-auto mt-6 max-w-2xl text-base text-slate-300 sm:text-lg md:text-xl font-normal leading-relaxed">
          Explore and discover your favorite movies and TV shows from around the world.
          Search hundreds of titles, check ratings, release dates, and deep dive into detailed storylines.
        </p>

        {/* CTA Button matching Wireframe: [ Explore Now ] */}
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            id="hero-explore-btn"
            onClick={onExploreClick}
            className="group flex w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 px-8 py-3.5 text-base font-bold text-white shadow-xl shadow-rose-900/40 transition hover:from-rose-500 hover:to-red-500 active:scale-95 sm:w-auto"
          >
            <Play className="h-5 w-5 fill-white" />
            <span>[ Explore Now ]</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={() => onQuickSearch && onQuickSearch('Girls')}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-6 py-3.5 text-sm font-semibold text-slate-200 backdrop-blur-sm transition hover:border-slate-600 hover:bg-slate-800 active:scale-95 sm:w-auto"
          >
            <Film className="h-4 w-4 text-amber-400" />
            <span>Sample Search: "Girls"</span>
          </button>
        </div>

        {/* Quick Highlights info strip */}
        <div className="mt-12 grid grid-cols-2 gap-3 border-t border-slate-800/80 pt-8 sm:grid-cols-4">
          <div className="rounded-xl border border-slate-800/60 bg-slate-900/40 p-3 text-center">
            <p className="text-xl font-bold text-white">240+</p>
            <p className="text-xs text-slate-400">Curated Shows</p>
          </div>
          <div className="rounded-xl border border-slate-800/60 bg-slate-900/40 p-3 text-center">
            <p className="text-xl font-bold text-amber-400 flex items-center justify-center gap-1">
              <Star className="h-4 w-4 fill-amber-400" /> 8.5+
            </p>
            <p className="text-xs text-slate-400">Top Rated Titles</p>
          </div>
          <div className="rounded-xl border border-slate-800/60 bg-slate-900/40 p-3 text-center">
            <p className="text-xl font-bold text-emerald-400">100% Free</p>
            <p className="text-xs text-slate-400">No Key Needed</p>
          </div>
          <div className="rounded-xl border border-slate-800/60 bg-slate-900/40 p-3 text-center">
            <p className="text-xl font-bold text-rose-400">Instant</p>
            <p className="text-xs text-slate-400">Detail Modals</p>
          </div>
        </div>
      </div>
    </section>
  );
};
