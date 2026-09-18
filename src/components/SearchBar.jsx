
import { Search, X, Loader2, Sparkles, Filter } from 'lucide-react';

export function SearchBar({
  searchQuery,
  onSearchChange,
  onClear,
  loading,
  selectedGenre,
  onGenreSelect,
  availableGenres,
}) {
  const popularPresets = ['Girls', 'Batman', 'Stranger', 'Money', 'Sherlock', 'Friends'];

  return (
    <div className="mx-auto w-full max-w-4xl space-y-4">
      {/* Search Input matching Wireframe */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin text-rose-500" />
          ) : (
            <Search className="h-5 w-5 text-rose-400" />
          )}
        </div>

        <input
          id="movie-search-input"
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="🔍 Search for a movie or TV show (e.g. Girls, Dark, Drama)..."
          className="w-full rounded-2xl border-2 border-slate-700 bg-slate-900/90 py-4 pl-12 pr-12 text-base text-white placeholder-slate-400 shadow-xl shadow-black/40 backdrop-blur-md transition-all focus:border-rose-500 focus:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-rose-500/20"
        />

        {searchQuery && (
          <button
            id="clear-search-btn"
            onClick={onClear}
            className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 hover:text-white"
            title="Clear search"
          >
            <div className="rounded-full bg-slate-800 p-1 hover:bg-slate-700">
              <X className="h-4 w-4" />
            </div>
          </button>
        )}
      </div>

      {/* Suggested Quick Searches & Genres */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
        {/* Quick search tags */}
        <div className="flex flex-wrap items-center gap-1.5 text-slate-400">
          <span className="flex items-center gap-1 font-medium text-slate-300">
            <Sparkles className="h-3 w-3 text-amber-400" />
            Suggestions:
          </span>
          {popularPresets.map((term) => (
            <button
              key={term}
              onClick={() => onSearchChange(term)}
              className={`rounded-full px-2.5 py-1 transition ${
                searchQuery.toLowerCase() === term.toLowerCase()
                  ? 'bg-rose-500 text-white font-medium'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {term}
            </button>
          ))}
        </div>

        {/* Genre Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="flex items-center gap-1 font-medium text-slate-300">
            <Filter className="h-3 w-3 text-rose-400" />
            Genre:
          </span>
          <button
            onClick={() => onGenreSelect('All')}
            className={`rounded-full px-2.5 py-1 transition ${
              selectedGenre === 'All'
                ? 'bg-rose-600 text-white font-medium'
                : 'bg-slate-800/80 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
            }`}
          >
            All
          </button>
          {availableGenres.slice(0, 5).map((genre) => (
            <button
              key={genre}
              onClick={() => onGenreSelect(genre)}
              className={`rounded-full px-2.5 py-1 transition ${
                selectedGenre === genre
                  ? 'bg-rose-600 text-white font-medium'
                  : 'bg-slate-800/80 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
