
import { Film, Github, Heart, Globe,  ArrowUp } from 'lucide-react';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-600 text-white shadow-md">
                <Film className="h-4 w-4" />
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                Movie<span className="text-rose-500">Explorer</span>
              </span>
              <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] text-slate-300 font-mono">
                v1.0.0
              </span>
            </div>

            <p className="max-w-md text-sm text-slate-400 leading-relaxed">
              MovieExplorer is a high-performance, responsive React web application powered by the public TVMaze REST API. Browse thousands of TV shows, explore detailed synopsis, ratings, and schedules.
            </p>

            <div className="flex items-center gap-2 pt-1 text-xs text-rose-400 font-medium">
              <span>Crafted with</span>
              <Heart className="h-3.5 w-3.5 fill-rose-500 text-rose-500 inline animate-bounce" />
              <span>in Dhaka, Bangladesh 🇧🇩</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Quick Navigation
            </h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a
                  href="#home"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToTop();
                  }}
                  className="hover:text-rose-400 transition"
                >
                  Home Landing
                </a>
              </li>
              <li>
                <a
                  href="#movies"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('movie-listing-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-rose-400 transition"
                >
                  Movie Listing Grid
                </a>
              </li>
              <li>
                <a
                  href="https://www.tvmaze.com/api"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-rose-400 transition inline-flex items-center gap-1"
                >
                  <Globe className="h-3.5 w-3.5 text-slate-500" />
                  TVMaze API Docs
                </a>
              </li>
            </ul>
          </div>

          {/* Links & Repository */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Project & Links
            </h4>
            <div className="mt-3 space-y-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 text-xs font-semibold text-slate-300 transition hover:border-rose-500 hover:text-white"
              >
                <Github className="h-4 w-4" />
                <span>GitHub Repository</span>
              </a>

              <p className="text-xs text-slate-500">
                Built with React 19, Tailwind CSS, and TVMaze Open API. Ready for deployment on Vercel, Netlify, or GitHub Pages.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar matching Wireframe: © 2026 MovieExplorer */}
        <div className="mt-10 flex flex-col items-center justify-between border-t border-slate-800/80 pt-6 text-xs text-slate-500 sm:flex-row">
          <p>© 2026 MovieExplorer. All rights reserved.</p>

          <div className="mt-3 flex items-center gap-4 sm:mt-0">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-slate-400 hover:text-rose-400 transition"
            >
              <span>Back to Top</span>
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
