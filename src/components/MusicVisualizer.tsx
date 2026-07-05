import React, { useState, useEffect, useRef } from 'react';
import { Volume2, Play, Pause, Radio, RefreshCcw } from 'lucide-react';

const AUDIO_TRACKS = [
  { id: 'synth', name: 'Ambient Homelab Synth Wave', bpm: 110, style: 'from-purple-500 to-indigo-600' },
  { id: 'hum', name: 'Server Rack Deep Hum Soundscape', bpm: 80, style: 'from-fuchsia-500 to-violet-600' },
  { id: 'glitch', name: 'Cybernetic Hacker Glitch Beats', bpm: 140, style: 'from-pink-500 to-purple-600' }
];

export const MusicVisualizer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState(AUDIO_TRACKS[0]);
  const [barsCount] = useState(24);
  const [barHeights, setBarHeights] = useState<number[]>([]);
  const intervalRef = useRef<number | null>(null);

  // Initialize bar heights
  useEffect(() => {
    setBarHeights(Array.from({ length: barsCount }, () => Math.floor(Math.random() * 85) + 15));
  }, [barsCount]);

  // Handle visual animation loops when playing
  useEffect(() => {
    if (isPlaying) {
      const ms = 1000 / (selectedTrack.bpm / 20); // Scale height refresh rates with BPM
      intervalRef.current = window.setInterval(() => {
        setBarHeights((prev) =>
          prev.map((h) => {
            // Keep dynamic movement within nice bounds
            const change = (Math.random() - 0.5) * 55;
            const next = Math.max(10, Math.min(100, h + change));
            return Math.floor(next);
          })
        );
      }, ms);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      // Decay back to resting heights
      setBarHeights(Array.from({ length: barsCount }, () => Math.floor(Math.random() * 15) + 8));
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, selectedTrack, barsCount]);

  const handleTrackChange = (track: typeof AUDIO_TRACKS[0]) => {
    setSelectedTrack(track);
    // Brief animation jump on track change
    setBarHeights((prev) => prev.map(() => Math.floor(Math.random() * 90) + 10));
  };

  return (
    <div className="border border-slate-200 dark:border-slate-800 rounded-2xl p-5 bg-slate-50 dark:bg-slate-950 shadow-sm relative overflow-hidden">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2 relative z-10">
        <div className="flex items-center gap-2">
          <Volume2 className="w-4 h-4 text-cyan-500 animate-pulse" />
          <h4 className="font-display font-medium text-slate-800 dark:text-slate-200 text-sm">CSS-Reactive Audio Visualizer</h4>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`flex items-center gap-1.5 text-xs font-mono uppercase font-bold tracking-wider px-3.5 py-1.5 rounded-full transition-all shadow-sm ${
              isPlaying
                ? 'bg-rose-500 text-white hover:bg-rose-600'
                : 'bg-slate-800 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-700 dark:hover:bg-slate-200'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5" /> Stop
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" /> Listen Live
              </>
            )}
          </button>
        </div>
      </div>

      <div className="mb-4">
        {/* Track selections */}
        <div className="flex flex-col sm:flex-row gap-2">
          {AUDIO_TRACKS.map((track) => (
            <button
              key={track.id}
              onClick={() => handleTrackChange(track)}
              className={`flex-1 text-left p-2.5 rounded-xl border transition ${
                selectedTrack.id === track.id
                  ? 'bg-white dark:bg-slate-900 border-cyan-500/50 dark:border-cyan-500/50 ring-2 ring-cyan-500/10'
                  : 'bg-white/50 dark:bg-slate-900/50 border-slate-100 dark:border-slate-900 hover:border-slate-200 dark:hover:border-slate-800'
              }`}
            >
              <div className="flex items-center gap-2">
                <Radio className={`w-3.5 h-3.5 ${selectedTrack.id === track.id ? 'text-cyan-500 animate-pulse' : 'text-slate-400'}`} />
                <div>
                  <p className="text-xs font-medium text-slate-800 dark:text-slate-200 leading-tight">{track.name}</p>
                  <p className="text-[9px] font-mono text-slate-400 dark:text-slate-500 mt-0.5">{track.bpm} BPM | CSS reactive variables</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Actual Bars Container */}
      <div className="h-[120px] bg-slate-900 dark:bg-slate-950 rounded-xl border border-slate-200/40 dark:border-slate-850 flex items-end justify-between p-4 overflow-hidden gap-1">
        {barHeights.map((height, i) => (
          <div
            key={i}
            style={{ height: `${height}%` }}
            className={`w-full rounded-t-sm transition-all duration-150 bg-gradient-to-t ${selectedTrack.style}`}
          />
        ))}
      </div>

      <div className="mt-3 text-center text-[10px] font-mono text-slate-400 dark:text-slate-500">
        {isPlaying ? (
          <span className="flex items-center justify-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            Active loop: {selectedTrack.name} @ {selectedTrack.bpm} BPM variables reacting...
          </span>
        ) : (
          <span>Click listen to activate CSS-keyframes simulation.</span>
        )}
      </div>
    </div>
  );
};
