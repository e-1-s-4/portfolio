import React from 'react';
import { Star, GitFork, ArrowUpRight, Github, Code, Shield, Terminal, Server, Gamepad } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  onSelect?: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  // Map icons based on category
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Security': return <Shield className="w-4 h-4 text-rose-500" />;
      case 'Web Apps': return <Server className="w-4 h-4 text-cyan-500" />;
      case 'Automation': return <Terminal className="w-4 h-4 text-emerald-500" />;
      case 'Games & Creative': return <Gamepad className="w-4 h-4 text-amber-500" />;
      default: return <Code className="w-4 h-4 text-slate-500" />;
    }
  };

  const getLanguageColor = (lang: string) => {
    switch (lang.toLowerCase()) {
      case 'python': return 'bg-blue-500';
      case 'typescript': return 'bg-cyan-500';
      case 'javascript': return 'bg-yellow-500';
      case 'html': return 'bg-orange-500';
      case 'css': return 'bg-indigo-500';
      default: return 'bg-slate-400';
    }
  };

  return (
    <div className="group border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 overflow-hidden hover:border-cyan-500/50 dark:hover:border-cyan-500/50 hover:shadow-lg transition-all duration-300 flex flex-col h-full relative p-5">
      {/* Glow highlight background on group hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Header Info */}
      <div className="flex items-center justify-between mb-3 relative z-10">
        <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-850 px-2.5 py-1 rounded-full border border-slate-200/50 dark:border-slate-800/50 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
          {getCategoryIcon(project.category)}
          <span>{project.category}</span>
        </div>
        <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">{project.builtAt}</span>
      </div>

      {/* Title */}
      <div className="mb-2 relative z-10">
        <h4 className="font-display font-semibold text-slate-800 dark:text-slate-100 text-base flex items-center gap-1.5 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
          {project.name}
        </h4>
        <p className="text-slate-500 dark:text-slate-400 text-xs mt-1.5 leading-relaxed flex-grow">
          {project.description}
        </p>
      </div>

      {/* Tech Stack list */}
      <div className="flex flex-wrap gap-1.5 my-3 relative z-10">
        {project.languages.map((lang, idx) => (
          <span
            key={idx}
            className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border border-slate-150 dark:border-slate-850"
          >
            {lang}
          </span>
        ))}
      </div>

      <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-850/60 flex items-center justify-between relative z-10">
        {/* Languages and github stats */}
        <div className="flex items-center gap-3 text-[11px] font-mono text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${getLanguageColor(project.language)}`} />
            <span>{project.language}</span>
          </div>
          {project.stars > 0 && (
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500/30" />
              <span>{project.stars}</span>
            </div>
          )}
          {project.forks > 0 && (
            <div className="flex items-center gap-1">
              <GitFork className="w-3.5 h-3.5 text-slate-400" />
              <span>{project.forks}</span>
            </div>
          )}
        </div>

        {/* Links to repository/live */}
        <div className="flex items-center gap-2">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="p-1.5 rounded-lg bg-slate-50 dark:bg-slate-850 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/50 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition"
            title="View GitHub Repository"
          >
            <Github className="w-3.5 h-3.5" />
          </a>
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded-lg bg-slate-50 dark:bg-slate-850 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/50 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition flex items-center gap-1 text-[10px] font-mono font-bold tracking-wider uppercase pl-2"
              title="Visit Live Site"
            >
              <span>Live</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
