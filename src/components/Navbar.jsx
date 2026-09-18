import  { useState } from 'react';
import { Film, Clapperboard, Compass, Info, Menu, X, Flame } from 'lucide-react';

export function Navbar({ activeTab, onNavigate, totalShowsCount }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleTabClick = (tab) => {
    onNavigate(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur-md transition-all">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand / Logo */}
        <div
          id="navbar-brand"
          onClick={() => handleTabClick('home')}
          className="group flex cursor-pointer items-center gap-2.5 transition hover:opacity-90"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-rose-600 via-red-500 to-amber-500 shadow-lg shadow-rose-900/30">
            <Clapperboard className="h-5 w-5 text-white transition-transform group-hover:scale-110" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-bold tracking-tight text-white">
                Movie<span className="text-rose-500">Explorer</span>
              </span>
              <span className="rounded bg-rose-500/20 px-1.5 py-0.5 text-[10px] font-semibold tracking-wider text-rose-300">
                BD Edition
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Discover Movies & Shows</p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-1 md:flex">
          <button
            id="nav-link-home"
            onClick={() => handleTabClick('home')}
            className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition ${
              activeTab === 'home'
                ? 'bg-rose-500/15 text-rose-400'
                : 'text-slate-300 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <Film className="h-4 w-4" />
            Home
          </button>

          <button
            id="nav-link-movies"
            onClick={() => handleTabClick('movies')}
            className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition ${
              activeTab === 'movies'
                ? 'bg-rose-500/15 text-rose-400'
                : 'text-slate-300 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <Compass className="h-4 w-4" />
            Browse Shows
            {totalShowsCount && totalShowsCount > 0 ? (
              <span className="ml-1 rounded-full bg-slate-800 px-2 py-0.5 text-[11px] text-slate-300">
                {totalShowsCount}
              </span>
            ) : null}
          </button>

          <button
            id="nav-link-about"
            onClick={() => handleTabClick('about')}
            className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition ${
              activeTab === 'about'
                ? 'bg-rose-500/15 text-rose-400'
                : 'text-slate-300 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <Info className="h-4 w-4" />
            About
          </button>
        </nav>

        {/* Prominent CTA Button (as specified in assignment wireframe) */}
        <div className="hidden items-center gap-3 md:flex">
          <button
            id="nav-cta-movies"
            onClick={() => handleTabClick('movies')}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-rose-950/50 transition hover:from-rose-500 hover:to-red-500 active:scale-95"
          >
            <Flame className="h-4 w-4 text-amber-300" />
            [ Movies ]
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          id="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-300 hover:text-white md:hidden"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="border-b border-slate-800 bg-slate-950 px-4 py-4 md:hidden">
          <div className="flex flex-col gap-2">
            <button
              onClick={() => handleTabClick('home')}
              className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium ${
                activeTab === 'home'
                  ? 'bg-rose-500/15 text-rose-400'
                  : 'text-slate-300 hover:bg-slate-900'
              }`}
            >
              <Film className="h-4 w-4" />
              Home
            </button>
            <button
              onClick={() => handleTabClick('movies')}
              className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium ${
                activeTab === 'movies'
                  ? 'bg-rose-500/15 text-rose-400'
                  : 'text-slate-300 hover:bg-slate-900'
              }`}
            >
              <Compass className="h-4 w-4" />
              Movie Listing Page
            </button>
            <button
              onClick={() => handleTabClick('about')}
              className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium ${
                activeTab === 'about'
                  ? 'bg-rose-500/15 text-rose-400'
                  : 'text-slate-300 hover:bg-slate-900'
              }`}
            >
              <Info className="h-4 w-4" />
              About Project
            </button>
            <button
              onClick={() => handleTabClick('movies')}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-rose-600 py-2.5 text-center text-sm font-semibold text-white shadow-lg hover:bg-rose-500"
            >
              <Clapperboard className="h-4 w-4" />
              Explore All Movies
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
