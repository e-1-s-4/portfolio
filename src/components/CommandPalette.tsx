import React, { useState, useEffect, useRef } from 'react';
import { Search, Terminal, ArrowRight, Shield, X, Moon, Sun, Command } from 'lucide-react';
import { useTheme } from './ThemeContext';
import { PROJECTS } from '../data';

interface CommandPaletteProps {
  onNavigate: (sectionId: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ onNavigate, isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const { theme, toggleTheme } = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sections = [
    { id: 'about', name: 'About E1S4', desc: 'Read background & philosophy' },
    { id: 'canvas', name: 'Interactive Canvas Art', desc: 'Play with physics particle vortex loops' },
    { id: 'projects', name: 'Public Projects Repository', desc: 'Browse full public repository listings' },
    { id: 'skills', name: 'Technical Skills Matrix', desc: 'Languages, tooling, & infrastructure stats' },
    { id: 'heatmap', name: 'Keyboard Heatmap Generator', desc: 'Test virtual keyboard keystroke triggers' },
    { id: 'visualizer', name: 'CSS Audio Visualizer', desc: 'Listen to ambient tracks and CSS lines' },
    { id: 'timeline', name: 'Experience & Milestones Timeline', desc: 'Inferred repository history milestones' },
    { id: 'contact', name: 'Connect / Message E1S4', desc: 'Send email message or social connect' }
  ];

  const filteredSections = sections.filter(
    (s) =>
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.desc.toLowerCase().includes(query.toLowerCase())
  );

  const filteredProjects = PROJECTS.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase()) ||
      p.language.toLowerCase().includes(query.toLowerCase())
  );

  const handleSectionClick = (id: string) => {
    onNavigate(id);
    onClose();
    setQuery('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4">
      {/* Dark overlay backdrop */}
      <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md" onClick={onClose} />

      {/* Actual Palette Modal box */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-xl shadow-2xl relative overflow-hidden z-10 flex flex-col max-h-[50vh] animate-in fade-in zoom-in-95 duration-150">
        
        {/* Input area */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-150 dark:border-slate-850">
          <Search className="w-5 h-5 text-slate-400 dark:text-slate-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command, project, or section name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none"
          />
          <kbd className="hidden sm:inline-flex items-center gap-0.5 text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700 shadow-sm shrink-0">
            ESC
          </kbd>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results area */}
        <div className="flex-1 overflow-y-auto p-2 scrollbar-none">
          {/* Quick Actions */}
          {query.length === 0 && (
            <div className="mb-3 px-2">
              <p className="text-[10px] uppercase tracking-wider font-mono font-bold text-slate-400 mb-1.5">Quick Commands</p>
              <button
                onClick={() => {
                  toggleTheme();
                  onClose();
                }}
                className="w-full flex items-center justify-between p-2 rounded-xl text-xs hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition"
              >
                <div className="flex items-center gap-2">
                  {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-indigo-500" />}
                  <span>Switch to {theme === 'dark' ? 'Light' : 'Dark'} Visual Mode</span>
                </div>
                <ArrowRight className="w-3 h-3 text-slate-400" />
              </button>
            </div>
          )}

          {/* Navigation Sections */}
          {filteredSections.length > 0 && (
            <div className="mb-3 px-2">
              <p className="text-[10px] uppercase tracking-wider font-mono font-bold text-slate-400 mb-1.5">Navigation Sections</p>
              <div className="space-y-0.5">
                {filteredSections.map((sect) => (
                  <button
                    key={sect.id}
                    onClick={() => handleSectionClick(sect.id)}
                    className="w-full text-left p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center justify-between"
                  >
                    <div>
                      <h5 className="text-xs font-semibold text-slate-800 dark:text-slate-200">{sect.name}</h5>
                      <p className="text-[10px] text-slate-500 mt-0.5">{sect.desc}</p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Project Repositories */}
          {filteredProjects.length > 0 && (
            <div className="px-2">
              <p className="text-[10px] uppercase tracking-wider font-mono font-bold text-slate-400 mb-1.5">Matching Repositories</p>
              <div className="space-y-0.5">
                {filteredProjects.map((p) => (
                  <a
                    key={p.id}
                    href={p.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full text-left p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <Terminal className="w-3.5 h-3.5 text-cyan-500" />
                        <h5 className="text-xs font-semibold text-slate-800 dark:text-slate-200">{p.name}</h5>
                      </div>
                      <p className="text-[10px] text-slate-500 mt-0.5 truncate max-w-sm">{p.description}</p>
                    </div>
                    <span className="text-[9px] font-mono bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-500">
                      {p.language}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {filteredSections.length === 0 && filteredProjects.length === 0 && (
            <div className="py-8 text-center">
              <p className="text-xs text-slate-400 font-mono">No matching commands or projects found.</p>
            </div>
          )}
        </div>

        {/* Footer info banner */}
        <div className="px-4 py-2 border-t border-slate-150 dark:border-slate-850 bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-between text-[10px] font-mono text-slate-400 dark:text-slate-500">
          <span className="flex items-center gap-1">
            <Command className="w-3 h-3" /> Search dynamically inside public profiles
          </span>
          <span>e-1-s-4 lab indexer v1.0.0</span>
        </div>
      </div>
    </div>
  );
};
