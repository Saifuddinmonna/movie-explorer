
import {  Sparkles, Compass } from 'lucide-react';


export const BangladeshiSpotlight = ({ onSearchTerm }) => {
  const spotlightItems = [
    {
      title: 'Bengali & South Asian',
      query: 'Bengali',
      tag: 'Cinema Heritage',
      desc: 'Explore rich storytelling and dramas inspired by regional South Asian culture.',
    },
    {
      title: 'Dhaka City Stories',
      query: 'Dhaka',
      tag: 'Urban Thrillers',
      desc: 'High adrenaline crime, investigative, and urban thriller stories set in Dhaka.',
    },
    {
      title: 'Girls & Drama Hits',
      query: 'Girls',
      tag: 'Assignment Sample',
      desc: 'TVMaze official example endpoint query showcasing multi-season series.',
    },
    {
      title: 'Critically Acclaimed',
      query: 'World',
      tag: 'Global Classics',
      desc: 'Award-winning international productions, documentaries, and drama.',
    },
  ];

  return (
    <div className="rounded-2xl border border-rose-950/60 bg-gradient-to-r from-slate-900 via-rose-950/20 to-slate-900 p-5 sm:p-6 my-6 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">🇧🇩</span>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              Dhaka & Global Cinema Highlights
              <span className="rounded bg-rose-500/20 px-2 py-0.5 text-[10px] font-semibold text-rose-300">
                Quick Explorer
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Curated queries ready for instant one-click exploration
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-rose-400 font-medium">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Interactive Search Presets</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {spotlightItems.map((item) => (
          <button
            key={item.title}
            onClick={() => onSearchTerm(item.query)}
            className="group flex flex-col justify-between text-left rounded-xl border border-slate-800 bg-slate-950/60 p-3.5 transition-all duration-200 hover:border-rose-500/50 hover:bg-slate-900 hover:shadow-md"
          >
            <div>
              <div className="flex items-center justify-between text-[11px] mb-1.5">
                <span className="font-semibold text-rose-400">{item.tag}</span>
                <Compass className="h-3.5 w-3.5 text-slate-500 transition-transform group-hover:rotate-45 group-hover:text-rose-400" />
              </div>
              <h4 className="text-sm font-bold text-white group-hover:text-rose-300">
                {item.title}
              </h4>
              <p className="mt-1 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                {item.desc}
              </p>
            </div>
            <div className="mt-3 text-[11px] font-medium text-slate-300 group-hover:text-rose-400 flex items-center gap-1">
              <span>Search "{item.query}"</span> →
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
