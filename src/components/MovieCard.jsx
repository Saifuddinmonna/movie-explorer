import { useState } from 'react';
import { Star, Calendar,  Film, Eye } from 'lucide-react';

import { FALLBACK_POSTER, getReleaseYear, formatRating } from '../services/tvMazeApi';



export const MovieCard= ({ show, onSelect }) => {
  const [imgError, setImgError] = useState(false);

  const posterUrl = !imgError && show.image?.medium ? show.image.medium : FALLBACK_POSTER;
  const ratingValue = formatRating(show.rating);
  const releaseYear = getReleaseYear(show.premiered);
  const primaryGenre = show.genres && show.genres.length > 0 ? show.genres[0] : show.type || 'Drama';

  return (
    <article
      id={`movie-card-${show.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/90 shadow-lg shadow-black/40 transition-all duration-300 hover:-translate-y-1.5 hover:border-rose-500/50 hover:shadow-2xl hover:shadow-rose-950/20"
    >
      {/* Poster Image Container */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-slate-950">
        <img
          src={posterUrl}
          alt={show.name}
          onError={() => setImgError(true)}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Gradient Overlay on Poster bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

        {/* Floating Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
          <span className="rounded-full bg-slate-950/80 px-2.5 py-1 text-[11px] font-semibold text-rose-300 backdrop-blur-md border border-rose-500/30">
            {primaryGenre}
          </span>

          {show.status && (
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-medium backdrop-blur-md ${
                show.status === 'Running'
                  ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30'
                  : 'bg-slate-900/80 text-slate-300 border border-slate-700/50'
              }`}
            >
              {show.status}
            </span>
          )}
        </div>

        {/* Quick hover trigger overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
          <button
            onClick={() => onSelect(show)}
            className="flex items-center gap-1.5 rounded-full bg-rose-600 px-4 py-2 text-xs font-bold text-white shadow-lg transition hover:bg-rose-500 active:scale-95"
          >
            <Eye className="h-3.5 w-3.5" />
            Quick View
          </button>
        </div>
      </div>

      {/* Card Info Section matching wireframe */}
      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          {/* Title */}
          <h3
            title={show.name}
            className="line-clamp-1 text-base font-bold text-white transition group-hover:text-rose-400"
          >
            {show.name}
          </h3>

          {/* Rating & Release Year Row */}
          <div className="mt-2 flex items-center gap-3 text-xs text-slate-400">
            <span className="inline-flex items-center gap-1 font-semibold text-amber-400">
              <Star className="h-3.5 w-3.5 fill-amber-400" />
              {ratingValue !== 'N/A' ? `${ratingValue}` : 'N/A'}
            </span>

            <span>•</span>

            <span className="inline-flex items-center gap-1 text-slate-300">
              <Calendar className="h-3.5 w-3.5 text-slate-400" />
              {releaseYear}
            </span>

            {show.network?.country?.name && (
              <>
                <span>•</span>
                <span className="truncate max-w-[80px]" title={show.network.country.name}>
                  {show.network.country.code || show.network.country.name}
                </span>
              </>
            )}
          </div>
        </div>

        {/* CTA Button matching Wireframe: [ See Details ] */}
        <div className="mt-4 pt-3 border-t border-slate-800/80">
          <button
            id={`see-details-btn-${show.id}`}
            onClick={() => onSelect(show)}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-800/90 py-2.5 text-xs font-semibold text-rose-300 transition-all hover:bg-rose-600 hover:text-white active:scale-98"
          >
            <Film className="h-3.5 w-3.5" />
            <span> See Details... </span>
          </button>
        </div>
      </div>
    </article>
  );
};
