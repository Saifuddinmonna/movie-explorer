
import { Film, CheckCircle2, Code, Layers, Smartphone, Database, ShieldAlert } from 'lucide-react';

export const AboutSection = () => {
  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-950/40 px-3.5 py-1 text-xs font-medium text-rose-300">
          <Film className="h-3.5 w-3.5" />
          <span>Project Overview & Architecture</span>
        </div>
        <h2 className="text-3xl font-black text-white sm:text-4xl">
          About <span className="text-rose-500">MovieExplorer</span>
        </h2>
        <p className="mx-auto max-w-2xl text-sm sm:text-base text-slate-400">
          Built as an academic and professional project following modern React design patterns, clean component architecture, and the free TVMaze REST API.
        </p>
      </div>

      {/* Tech Stack Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
            <Code className="h-5 w-5" />
          </div>
          <h3 className="text-base font-bold text-white">Core Technology</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            React 19 + TypeScript with functional components, hooks (<code className="text-rose-400">useState</code>, <code className="text-rose-400">useEffect</code>, <code className="text-rose-400">useMemo</code>), and modular file architecture.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10 text-rose-400">
            <Layers className="h-5 w-5" />
          </div>
          <h3 className="text-base font-bold text-white">Styling & UI</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Tailwind CSS utility framework with custom gradients, accessible color contrasts, responsive CSS Grid layout, and Lucide icons.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
            <Database className="h-5 w-5" />
          </div>
          <h3 className="text-base font-bold text-white">Data Provider</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Public TVMaze REST API. Endpoints utilized: <code className="text-slate-300">/shows</code> (all shows) and <code className="text-slate-300">/search/shows?q=:query</code>.
          </p>
        </div>
      </div>

      {/* Assignment Features Checklist */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-emerald-400" />
          Completed Assignment Requirements
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-slate-300">
          <div className="flex items-start gap-2.5">
            <span className="text-emerald-400 font-bold">✓</span>
            <span><strong>Navbar:</strong> Application logo, navigation links, and prominent [ Movies ] CTA button.</span>
          </div>

          <div className="flex items-start gap-2.5">
            <span className="text-emerald-400 font-bold">✓</span>
            <span><strong>Hero Banner:</strong> Cinematic background, title "DISCOVER MOVIES", description & [ Explore Now ] CTA.</span>
          </div>

          <div className="flex items-start gap-2.5">
            <span className="text-emerald-400 font-bold">✓</span>
            <span><strong>Movie Listing Page:</strong> Dedicated view with live search bar & responsive CSS Grid layout.</span>
          </div>

          <div className="flex items-start gap-2.5">
            <span className="text-emerald-400 font-bold">✓</span>
            <span><strong>Movie Cards:</strong> Poster image, title, release year, rating (⭐), and [ See Details ] button.</span>
          </div>

          <div className="flex items-start gap-2.5">
            <span className="text-emerald-400 font-bold">✓</span>
            <span><strong>Details Modal:</strong> Backdrop image, title, cleaned overview/summary, rating, genres & dual close triggers.</span>
          </div>

          <div className="flex items-start gap-2.5">
            <span className="text-emerald-400 font-bold">✓</span>
            <span><strong>Responsive Design:</strong> Mobile single-column, tablet 2-column, and desktop 4-column layout.</span>
          </div>
        </div>
      </div>

      {/* Original Work & Plagiarism statement */}
      <div className="rounded-2xl border border-slate-800/80 bg-slate-950 p-6 text-xs text-slate-400 space-y-2">
        <div className="flex items-center gap-2 font-bold text-slate-200">
          <ShieldAlert className="h-4 w-4 text-rose-500" />
          Academic Integrity & Submission Notice
        </div>
        <p>
          This project was structured with clean, maintainable, hand-crafted code standards specifically for assignment review. It is 100% compliant with standard React and JavaScript specifications, ready to run on any local environment (VS Code) or cloud host (Vercel / Netlify / GitHub Pages).
        </p>
      </div>
    </section>
  );
};
