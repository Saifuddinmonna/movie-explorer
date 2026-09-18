import { useEffect, useState } from 'react';
import { X, Star, Calendar, Globe, Clock, Tv, ExternalLink, Bookmark, Check } from 'lucide-react';
import { stripHtml, getReleaseYear, formatRating, FALLBACK_BACKDROP, FALLBACK_POSTER } from '../services/tvMazeApi';

export function MovieModal({ show, onClose }) {
  const [backdropError, setBackdropError] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (show) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [show, onClose]);

  if (!show) return null;

  const backdropUrl =
    !backdropError && show.image?.original
      ? show.image.original
      : show.image?.medium || FALLBACK_BACKDROP;

  const ratingStr = formatRating(show.rating);
  const releaseYear = getReleaseYear(show.premiered);
  const overviewText = stripHtml(show.summary);

  return (
    <div
      id="movie-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 animate-fadeIn"
      onClick={onClose}
    >
      {/* Dark backdrop with blur */}
      <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md transition-opacity" />

      {/* Modal Dialog Card */}
      <div
        id="movie-details-modal"
        className="relative z-10 max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-slate-700/80 bg-slate-900 shadow-2xl shadow-black/80"
        onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside modal
      >
        {/* Top Header Bar with Close Button (✕) */}
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-800/80 bg-slate-900/90 px-6 py-3.5 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-rose-500 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Movie Details
            </span>
          </div>

          {/* Close button [ ✕ ] matching wireframe */}
          <button
            id="modal-close-top-btn"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-300 transition-colors hover:bg-rose-600 hover:text-white"
            title="Close modal (Esc)"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Backdrop Image Section matching wireframe */}
        <div className="relative aspect-[16/9] max-h-72 w-full overflow-hidden bg-slate-950">
          <img
            src={backdropUrl}
            alt={show.name}
            onError={() => setBackdropError(true)}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

          {/* Poster inset on bottom left */}
          <div className="absolute bottom-4 left-6 flex items-end gap-4">
            <img
              src={show.image?.medium || FALLBACK_POSTER}
              alt={show.name}
              className="hidden h-32 w-24 rounded-xl border-2 border-slate-700 object-cover shadow-2xl sm:block"
            />
            <div>
              <div className="flex flex-wrap gap-1.5 mb-1.5">
                {show.genres?.map((g) => (
                  <span
                    key={g}
                    className="rounded-full bg-rose-600/80 px-2.5 py-0.5 text-[11px] font-semibold text-white backdrop-blur-sm"
                  >
                    {g}
                  </span>
                ))}
              </div>
              <h2 className="text-2xl font-black text-white sm:text-3xl drop-shadow-md">
                {show.name}
              </h2>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Metadata Row matching wireframe: ⭐ Rating: 8.5 | 📅 Release: 2024 */}
          <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-slate-800 bg-slate-950/60 p-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-amber-400 font-bold flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-amber-400" />
                Rating: {ratingStr !== 'N/A' ? `${ratingStr} / 10` : 'Not Rated'}
              </span>
            </div>

            <span className="text-slate-600">|</span>

            <div className="flex items-center gap-2 text-slate-300">
              <Calendar className="h-4 w-4 text-rose-400" />
              <span>Release: {releaseYear}</span>
            </div>

            {show.language && (
              <>
                <span className="text-slate-600">|</span>
                <div className="flex items-center gap-2 text-slate-300">
                  <Globe className="h-4 w-4 text-sky-400" />
                  <span>Language: {show.language}</span>
                </div>
              </>
            )}

            {show.runtime && (
              <>
                <span className="text-slate-600">|</span>
                <div className="flex items-center gap-2 text-slate-300">
                  <Clock className="h-4 w-4 text-emerald-400" />
                  <span>Runtime: {show.runtime} min</span>
                </div>
              </>
            )}
          </div>

          {/* Overview / Summary matching wireframe */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 mb-2">
              Overview:
            </h4>
            <div className="text-slate-300 text-sm leading-relaxed sm:text-base bg-slate-950/40 p-4 rounded-2xl border border-slate-800/60">
              {overviewText}
            </div>
          </div>

          {/* Additional Info Grid (Genre, Network/Country, Schedule, Status) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-3.5 space-y-1.5">
              <p className="font-semibold text-slate-400 flex items-center gap-1.5">
                <Tv className="h-3.5 w-3.5 text-rose-400" />
                Network / Broadcast:
              </p>
              <p className="text-slate-200 font-medium">
                {show.network?.name || show.webChannel?.name || 'Independent / Streaming'}
                {show.network?.country?.name ? ` (${show.network.country.name})` : ''}
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-3.5 space-y-1.5">
              <p className="font-semibold text-slate-400 flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-amber-400" />
                Schedule:
              </p>
              <p className="text-slate-200 font-medium">
                {show.schedule?.days?.length > 0
                  ? `${show.schedule.days.join(', ')} ${show.schedule.time ? `at ${show.schedule.time}` : ''}`
                  : 'On-Demand / Streaming'}
              </p>
            </div>
          </div>

          {/* Links & Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
            <div className="flex items-center gap-2">
              {show.officialSite && (
                <a
                  href={show.officialSite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2 text-xs font-medium text-slate-200 hover:bg-slate-700 hover:text-white"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  Official Site
                </a>
              )}
              {show.url && (
                <a
                  href={show.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2 text-xs font-medium text-slate-200 hover:bg-slate-700 hover:text-white"
                >
                  <Tv className="h-3.5 w-3.5" />
                  TVMaze Page
                </a>
              )}

              <button
                onClick={() => setIsSaved(!isSaved)}
                className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-medium transition ${
                  isSaved
                    ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/40'
                    : 'bg-slate-800 text-slate-300 border border-slate-700 hover:text-white'
                }`}
              >
                {isSaved ? <Check className="h-3.5 w-3.5" /> : <Bookmark className="h-3.5 w-3.5" />}
                {isSaved ? 'In Watchlist' : 'Add to Watchlist'}
              </button>
            </div>

            {/* Bottom Close Button matching wireframe: [ ❌ Close ] */}
            <button
              id="modal-close-bottom-btn"
              onClick={onClose}
              className="flex items-center gap-2 rounded-xl bg-slate-800 px-5 py-2.5 text-xs font-bold text-slate-200 transition hover:bg-rose-600 hover:text-white active:scale-95"
            >
              <X className="h-4 w-4" />
              <span>[ ❌ Close ]</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
