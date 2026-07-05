import React, { useState, useEffect } from 'react';
import { Keyboard, Flame, RefreshCw } from 'lucide-react';

export const KeyboardHeatmap: React.FC = () => {
  const [keystrokes, setKeystrokes] = useState<Record<string, number>>({
    'E': 14, 'I': 8, 'S': 9, 'A': 11, 'U': 5, 'B': 6, 'H': 7, 'R': 10, 'T': 12, 'O': 13, 'N': 11
  });
  const [totalKeys, setTotalKeys] = useState(106);
  const [lastKeyPressed, setLastKeyPressed] = useState<string>('');

  const keysRows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/']
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const char = e.key.toUpperCase();
      // Only record alphabetical letters for simple keyboard visualization
      if (/^[A-Z;,\./]$/.test(char)) {
        setKeystrokes((prev) => {
          const val = prev[char] || 0;
          return { ...prev, [char]: val + 1 };
        });
        setTotalKeys((prev) => prev + 1);
        setLastKeyPressed(char);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleKeyClick = (key: string) => {
    setKeystrokes((prev) => {
      const val = prev[key] || 0;
      return { ...prev, [key]: val + 1 };
    });
    setTotalKeys((prev) => prev + 1);
    setLastKeyPressed(key);
  };

  const getHeatmapColor = (count: number) => {
    if (!count) return 'bg-slate-100 dark:bg-slate-900 text-slate-400 dark:text-slate-600';
    if (count < 3) return 'bg-sky-200 dark:bg-sky-950 text-sky-800 dark:text-sky-300 ring-2 ring-sky-400/30';
    if (count < 7) return 'bg-emerald-200 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 ring-2 ring-emerald-400/30';
    if (count < 12) return 'bg-amber-200 dark:bg-amber-950 text-amber-800 dark:text-amber-300 ring-2 ring-amber-400/30';
    return 'bg-rose-200 dark:bg-rose-950 text-rose-800 dark:text-rose-300 font-bold ring-2 ring-rose-500/50 animate-pulse';
  };

  const resetHeatmap = () => {
    setKeystrokes({});
    setTotalKeys(0);
    setLastKeyPressed('');
  };

  return (
    <div className="border border-slate-200 dark:border-slate-800 rounded-2xl p-5 bg-slate-50 dark:bg-slate-950 shadow-sm relative">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Keyboard className="w-4 h-4 text-rose-500 animate-bounce" />
          <h4 className="font-display font-medium text-slate-800 dark:text-slate-200 text-sm">Keyboard Heatmap Sandbox</h4>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 font-mono">
            <Flame className="w-3.5 h-3.5 text-orange-500" />
            <span>Total Taps: <b>{totalKeys}</b></span>
          </div>
          <button
            onClick={resetHeatmap}
            className="flex items-center gap-1 text-[10px] font-mono uppercase font-bold tracking-wider text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 px-2.5 py-1 rounded-full"
          >
            <RefreshCw className="w-2.5 h-2.5" />
            Clear
          </button>
        </div>
      </div>

      <p className="text-[11px] font-mono text-slate-400 dark:text-slate-500 mb-4 text-center">
        Type on your computer keyboard or click individual keys below to generate a real-time keystroke density heatmap.
      </p>

      {/* Keyboard Grid Layout */}
      <div className="flex flex-col gap-1.5 max-w-lg mx-auto bg-slate-200/50 dark:bg-slate-900/40 p-3 rounded-xl border border-slate-200/50 dark:border-slate-850">
        {keysRows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center gap-1.5">
            {row.map((key) => {
              const count = keystrokes[key] || 0;
              const isLast = lastKeyPressed === key;
              return (
                <button
                  key={key}
                  onClick={() => handleKeyClick(key)}
                  className={`w-9 h-9 sm:w-10 sm:h-10 text-xs sm:text-sm font-mono flex flex-col items-center justify-between p-1.5 rounded-lg transition-all active:scale-95 select-none ${getHeatmapColor(count)} ${
                    isLast ? 'scale-105 ring-4 ring-rose-400/50' : ''
                  }`}
                >
                  <span className="font-bold">{key}</span>
                  {count > 0 && (
                    <span className="text-[8px] opacity-75 font-medium -mt-1">{count}</span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Last Key Pressed Output */}
      {lastKeyPressed && (
        <div className="mt-4 flex items-center justify-center gap-2 text-[11px] font-mono bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-900 py-1.5 px-3 rounded-full w-fit mx-auto shadow-sm">
          <span className="text-slate-400">Captured key:</span>
          <kbd className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold px-1.5 py-0.5 rounded text-xs border border-slate-200 dark:border-slate-700 shadow-sm">{lastKeyPressed}</kbd>
          <span className="text-slate-400">Total frequency: {keystrokes[lastKeyPressed] || 0} times</span>
        </div>
      )}
    </div>
  );
};
