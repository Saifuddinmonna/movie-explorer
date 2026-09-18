import { useState, useEffect, useMemo, } from 'react';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { SearchBar } from './components/SearchBar';
import { MovieCard } from './components/MovieCard';
import { MovieModal } from './components/MovieModal';
import { Footer } from './components/Footer';
import { BangladeshiSpotlight } from './components/BangladeshiSpotlight';
import { AboutSection } from './components/AboutSection';
import { getShows, searchShows } from './services/tvMazeApi';
import { Film, AlertCircle, RefreshCw, Layers, Sparkles, ChevronDown } from 'lucide-react';

export default function App() {
  const [shows, setShows] = useState([]);
  const [allShowsBackup, setAllShowsBackup] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedShow, setSelectedShow] = useState(null);
  const [activeTab, setActiveTab] = useState('home');
  const [visibleCount, setVisibleCount] = useState(24);

  // Fetch initial shows on mount (no synchronous setState inside effect body)
  useEffect(() => {
    let ignore = false;

    async function loadInitialShows() {
      try {
        const data = await getShows();
        if (!ignore) {
          setShows(data || []);
          setAllShowsBackup(data || []);
          setLoading(false);
        }
      } catch (err) {
        if (!ignore) {
          console.error('Fetch shows error:', err);
          setError('Unable to connect to TVMaze API. Please verify your internet connection.');
          setLoading(false);
        }
      }
    }

    loadInitialShows();

    return () => {
      ignore = true;
    };
  }, []);

  // Retry handler for error state (called on button click)
  const handleRetry = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getShows();
      setShows(data || []);
      setAllShowsBackup(data || []);
    } catch (err) {
      console.error('Fetch shows retry error:', err);
      setError('Unable to connect to TVMaze API. Please verify your internet connection.');
    } finally {
      setLoading(false);
    }
  };

  // Debounced search effect - only runs when searching
  useEffect(() => {
    if (!searchQuery.trim()) {
      return;
    }

    let ignore = false;
    const handler = setTimeout(async () => {
      setLoading(true);
      setError(null);
      try {
        const searchResults = await searchShows(searchQuery);
        if (!ignore) {
          setShows(searchResults || []);
          setVisibleCount(24);
        }
      } catch (err) {
        if (!ignore) {
          console.error('Search error:', err);
          setError(`Failed to search for "${searchQuery}". Please try again.`);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }, 450);

    return () => {
      ignore = true;
      clearTimeout(handler);
    };
  }, [searchQuery]);

  // Extract all available unique genres dynamically
  const availableGenres = useMemo(() => {
    const genreSet = new Set();
    allShowsBackup.forEach((show) => {
      show.genres?.forEach((genre) => genreSet.add(genre));
    });
    return Array.from(genreSet).sort();
  }, [allShowsBackup]);

  // Filter shows by selected genre
  const filteredShows = useMemo(() => {
    if (selectedGenre === 'All') return shows;
    return shows.filter((show) => show.genres?.includes(selectedGenre));
  }, [shows, selectedGenre]);

  // Currently visible slice of shows for performance
  const displayedShows = useMemo(() => {
    return filteredShows.slice(0, visibleCount);
  }, [filteredShows, visibleCount]);

  const handleClearSearch = () => {
    setSearchQuery('');
    setSelectedGenre('All');
    setShows(allShowsBackup);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setShows(allShowsBackup);
    }
  };

  const handleQuickSearch = (term) => {
    setSearchQuery(term);
    setActiveTab('movies');
    setTimeout(() => {
      document.getElementById('movie-listing-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleExploreNow = () => {
    setActiveTab('movies');
    setTimeout(() => {
      document.getElementById('movie-listing-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 selection:bg-rose-500 selection:text-white">
      {/* 1. Header / Navbar */}
      <Navbar
        activeTab={activeTab}
        onNavigate={(tab) => {
          setActiveTab(tab);
          if (tab === 'movies') {
            setTimeout(() => {
              document.getElementById('movie-listing-section')?.scrollIntoView({ behavior: 'smooth' });
            }, 50);
          }
        }}
        totalShowsCount={shows.length}
      />

      <main className="relative z-10">
        {/* VIEW 1: Home Landing Page */}
        {activeTab === 'home' && (
          <>
            {/* Hero Banner Component (Wireframe compliant) */}
            <HeroBanner
              onExploreClick={handleExploreNow}
              onQuickSearch={handleQuickSearch}
            />

            {/* Featured / Trending Highlights on Home */}
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
              {/* Bangladeshi & Regional Cinema Spotlight Banner */}
              <BangladeshiSpotlight onSearchTerm={handleQuickSearch} />

              {/* Trending Section Preview */}
              <div className="mt-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-2xl font-black text-white sm:text-3xl flex items-center gap-2">
                    <Sparkles className="h-6 w-6 text-rose-500" />
                    Featured & Trending Shows
                  </h2>
                  <p className="mt-1 text-sm text-slate-400">
                    Highest rated and trending television titles streaming right now
                  </p>
                </div>

                <button
                  onClick={handleExploreNow}
                  className="inline-flex items-center gap-2 text-sm font-bold text-rose-400 hover:text-rose-300 transition"
                >
                  <span>View All {shows.length} Movies</span>
                  <span>→</span>
                </button>
              </div>

              {/* 8 Featured Cards Grid */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {shows.slice(0, 8).map((show) => (
                  <MovieCard
                    key={`home-feat-${show.id}`}
                    show={show}
                    onSelect={(s) => setSelectedShow(s)}
                  />
                ))}
              </div>

              {/* Bottom CTA on Home */}
              <div className="mt-16 text-center rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/60 to-slate-950 p-10">
                <h3 className="text-2xl font-bold text-white sm:text-3xl">
                  Ready to explore the entire catalog?
                </h3>
                <p className="mt-2 text-sm text-slate-400 max-w-xl mx-auto">
                  Browse through comprehensive lists, search by any title, view seasons, release dates, and cast.
                </p>
                <button
                  onClick={handleExploreNow}
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-rose-600 px-8 py-3 text-sm font-bold text-white shadow-xl shadow-rose-950/50 hover:bg-rose-500 active:scale-95 transition"
                >
                  <Film className="h-4 w-4" />
                  <span>Go to Movie Listing Page</span>
                </button>
              </div>
            </div>
          </>
        )}

        {/* VIEW 2: Movie Listing Page (Dedicated Browse & Search View) */}
        {activeTab === 'movies' && (
          <section id="movie-listing-section" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            {/* Listing Page Header */}
            <div className="mb-8 text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/10 px-3 py-1 text-xs font-semibold text-rose-400">
                <Layers className="h-3.5 w-3.5" />
                <span>Live TV Shows Catalog</span>
              </div>
              <h1 className="text-3xl font-black text-white sm:text-4xl">
                Browse & Search Movies
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
                Search through hundreds of titles via the live TVMaze REST API. Filter by category, check IMDb-style ratings, and read full synopses.
              </p>
            </div>

            {/* Prominent Search Bar (Wireframe compliant) */}
            <div className="mb-10">
              <SearchBar
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
                onClear={handleClearSearch}
                loading={loading}
                selectedGenre={selectedGenre}
                onGenreSelect={(g) => setSelectedGenre(g)}
                availableGenres={availableGenres}
              />
            </div>

            {/* Results Status Bar */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white">
                  {filteredShows.length} {filteredShows.length === 1 ? 'Show' : 'Shows'} found
                </span>
                {searchQuery && (
                  <span className="rounded-full bg-slate-800 px-2 py-0.5 text-rose-400">
                    Query: "{searchQuery}"
                  </span>
                )}
                {selectedGenre !== 'All' && (
                  <span className="rounded-full bg-slate-800 px-2 py-0.5 text-amber-400">
                    Genre: {selectedGenre}
                  </span>
                )}
              </div>

              {(searchQuery || selectedGenre !== 'All') && (
                <button
                  onClick={handleClearSearch}
                  className="text-rose-400 hover:text-rose-300 font-medium"
                >
                  Reset filters
                </button>
              )}
            </div>

            {/* Error Message with Retry */}
            {error && (
              <div className="my-8 flex items-center justify-between rounded-2xl border border-rose-500/40 bg-rose-950/30 p-5 text-sm text-rose-300">
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-5 w-5 text-rose-500 shrink-0" />
                  <span>{error}</span>
                </div>
                <button
                  onClick={handleRetry}
                  className="flex items-center gap-1.5 rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-rose-500"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  Retry
                </button>
              </div>
            )}

            {/* Loading Skeleton Grid */}
            {loading && shows.length === 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-pulse">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="rounded-2xl border border-slate-800 bg-slate-900 p-4 space-y-3">
                    <div className="aspect-[2/3] w-full rounded-xl bg-slate-800" />
                    <div className="h-4 w-3/4 rounded bg-slate-800" />
                    <div className="h-3 w-1/2 rounded bg-slate-800" />
                    <div className="h-8 w-full rounded-xl bg-slate-800" />
                  </div>
                ))}
              </div>
            )}

            {/* Empty State */}
            {!loading && filteredShows.length === 0 && !error && (
              <div className="my-16 text-center space-y-4 rounded-3xl border border-slate-800/80 bg-slate-900/30 p-12">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-950/50 text-rose-400 border border-rose-800/30">
                  <Film className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-white">No Movies or Shows Found</h3>
                <p className="text-sm text-slate-400 max-w-md mx-auto">
                  We couldn't find any results matching "{searchQuery}". Try searching with a different keyword like "Girls", "Action", or "Batman".
                </p>
                <button
                  onClick={handleClearSearch}
                  className="rounded-xl bg-rose-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-rose-500 transition"
                >
                  Clear Search & View All Shows
                </button>
              </div>
            )}

            {/* Responsive Movie Grid (Wireframe compliant: 1 col mobile, 2 sm, 3 md, 4 lg/xl) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {displayedShows.map((show) => (
                <MovieCard
                  key={show.id}
                  show={show}
                  onSelect={(s) => setSelectedShow(s)}
                />
              ))}
            </div>

            {/* Load More Button for Pagination */}
            {visibleCount < filteredShows.length && (
              <div className="mt-12 text-center">
                <button
                  id="load-more-shows-btn"
                  onClick={() => setVisibleCount((prev) => prev + 24)}
                  className="inline-flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-900 px-6 py-3 text-sm font-bold text-slate-200 transition hover:border-rose-500 hover:text-white hover:bg-slate-800 active:scale-95"
                >
                  <span>Load More Titles ({filteredShows.length - visibleCount} remaining)</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
            )}
          </section>
        )}

        {/* VIEW 3: About Page */}
        {activeTab === 'about' && <AboutSection />}
      </main>

      {/* 3. Movie Details Modal (Wireframe compliant) */}
      <MovieModal
        show={selectedShow}
        onClose={() => setSelectedShow(null)}
      />

      {/* 4. Footer */}
      <Footer />
    </div>
  );
}
