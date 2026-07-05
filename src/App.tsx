/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Github, Mail, MapPin, Terminal, Search, Shield, 
  Menu, X, Code, ExternalLink, Star, GitFork, 
  Sparkles, CheckCircle, Flame, Moon, Sun, Laptop, ArrowUpRight, Cpu
} from 'lucide-react';

import { ThemeProvider, useTheme } from './components/ThemeContext';
import { PERSONAL_INFO, PROJECTS, SKILL_CATEGORIES, TIMELINE } from './data';
import { CanvasArt } from './components/CanvasArt';
import { KeyboardHeatmap } from './components/KeyboardHeatmap';
import { MusicVisualizer } from './components/MusicVisualizer';
import { ActivityGraph } from './components/ActivityGraph';
import { ProjectCard } from './components/ProjectCard';
import { ContactForm } from './components/ContactForm';
import { CommandPalette } from './components/CommandPalette';

function PortfolioContent() {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  
  // Projects list state
  const [projectSearch, setProjectSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Triggering command palette on Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  // Filter project categories
  const categories = ['All', 'Security', 'Web Apps', 'Automation', 'Games & Creative'];

  const filteredProjects = PROJECTS.filter((proj) => {
    const matchesCategory = activeCategory === 'All' || proj.category === activeCategory;
    const matchesSearch = proj.name.toLowerCase().includes(projectSearch.toLowerCase()) || 
                          proj.description.toLowerCase().includes(projectSearch.toLowerCase()) ||
                          proj.languages.some((l) => l.toLowerCase().includes(projectSearch.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredProjects = PROJECTS.filter(p => p.featured);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 selection:bg-cyan-500/35 transition-colors duration-300">
      
      {/* Dynamic Header */}
      <nav className="sticky top-0 z-40 bg-white/70 dark:bg-slate-950/70 backdrop-blur-md border-b border-slate-100 dark:border-slate-900 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo Name */}
          <button 
            onClick={() => handleNavigate('hero')}
            className="flex items-center gap-2 font-display font-bold text-lg text-slate-900 dark:text-white tracking-tight hover:opacity-80 transition"
          >
            <Cpu className="w-5 h-5 text-cyan-500 animate-pulse" />
            <span>{PERSONAL_INFO.name}</span>
            <span className="text-[10px] font-mono bg-slate-100 dark:bg-slate-900 px-2.5 py-0.5 rounded-full border border-slate-200/50 dark:border-slate-800/50 text-slate-500 dark:text-slate-400 font-normal">lab</span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => handleNavigate('about')} className="text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition">About</button>
            <button onClick={() => handleNavigate('canvas')} className="text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition">Canvas Art</button>
            <button onClick={() => handleNavigate('projects')} className="text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition">Projects</button>
            <button onClick={() => handleNavigate('skills')} className="text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition">Skills</button>
            <button onClick={() => handleNavigate('heatmap')} className="text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition">Heatmap</button>
            <button onClick={() => handleNavigate('timeline')} className="text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition">Timeline</button>
            <button onClick={() => handleNavigate('contact')} className="text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition">Contact</button>
          </div>

          {/* Control items */}
          <div className="flex items-center gap-3">
            {/* Command Palette Button */}
            <button
              onClick={() => setPaletteOpen(true)}
              className="flex items-center gap-2 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-850 px-3 py-1.5 rounded-xl transition text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              title="Open Command Palette (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="text-[10px] font-mono hidden sm:inline">Search...</span>
              <kbd className="hidden sm:inline-flex text-[9px] font-mono px-1 rounded bg-slate-200 dark:bg-slate-800 text-slate-500 border border-slate-350 dark:border-slate-700 shadow-sm">
                Ctrl K
              </kbd>
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-850 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition"
              title="Toggle Theme Mode"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-indigo-500" />}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 text-slate-600 dark:text-slate-400 transition"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-slate-100 dark:border-slate-900 mt-3 pt-3 flex flex-col gap-2.5 overflow-hidden"
            >
              <button onClick={() => handleNavigate('about')} className="text-left py-1 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition">About</button>
              <button onClick={() => handleNavigate('canvas')} className="text-left py-1 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition">Canvas Art</button>
              <button onClick={() => handleNavigate('projects')} className="text-left py-1 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition">Projects</button>
              <button onClick={() => handleNavigate('skills')} className="text-left py-1 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition">Skills</button>
              <button onClick={() => handleNavigate('heatmap')} className="text-left py-1 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition">Heatmap</button>
              <button onClick={() => handleNavigate('timeline')} className="text-left py-1 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition">Timeline</button>
              <button onClick={() => handleNavigate('contact')} className="text-left py-1 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition">Contact</button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="max-w-7xl mx-auto px-6 py-12 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 font-mono text-[10px] uppercase font-bold tracking-wider animate-pulse">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Building, Breaking, Learning</span>
          </div>

          <div className="space-y-2">
            <h1 className="font-display font-bold text-4xl md:text-6xl tracking-tight text-slate-900 dark:text-white">
              Hey, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-500 font-black">{PERSONAL_INFO.name}</span> 👋
            </h1>
            <p className="font-display font-medium text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-lg leading-relaxed">
              {PERSONAL_INFO.subtitle}
            </p>
          </div>

          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed max-w-md">
            I build lightweight security automation, modular web platforms, and interactive canvas tools to reverse engineer things and watch how they tick.
          </p>

          {/* Social and CTA buttons */}
          <div className="flex flex-wrap gap-3.5 items-center pt-2">
            <button 
              onClick={() => handleNavigate('projects')}
              className="flex items-center gap-2 bg-slate-800 dark:bg-slate-100 hover:bg-slate-700 dark:hover:bg-slate-200 text-white dark:text-slate-900 px-5 py-2.5 rounded-xl font-mono text-xs uppercase font-bold tracking-wider transition-all shadow-sm shrink-0 cursor-pointer"
            >
              <Terminal className="w-4 h-4" />
              <span>Explore Projects</span>
            </button>
            <a 
              href={PERSONAL_INFO.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 px-5 py-2.5 rounded-xl font-mono text-xs uppercase font-bold tracking-wider transition border border-slate-200/60 dark:border-slate-800 shrink-0"
            >
              <Github className="w-4 h-4" />
              <span>GitHub Stats</span>
            </a>
            <button
              onClick={() => handleNavigate('contact')}
              className="p-2.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition"
              title="Email E1S4"
            >
              <Mail className="w-5 h-5" />
            </button>
          </div>

          {/* Key Quick Stats (Authentic, public_repos: 19) */}
          <div className="pt-6 border-t border-slate-150 dark:border-slate-900 flex gap-8">
            <div>
              <p className="text-2xl font-display font-bold text-slate-900 dark:text-white">19</p>
              <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mt-1">Public Repositories</p>
            </div>
            <div>
              <p className="text-2xl font-display font-bold text-slate-900 dark:text-white">3+</p>
              <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mt-1">Honeypot Systems</p>
            </div>
            <div>
              <p className="text-2xl font-display font-bold text-slate-900 dark:text-white">2026</p>
              <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mt-1">Lab Established</p>
            </div>
          </div>
        </div>

        {/* Hero Interactive Area: Dynamic CSS-reactive visualizer and terminal logs */}
        <div className="relative">
          <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur opacity-15" />
          <div className="relative border border-slate-200 dark:border-slate-850 rounded-2xl p-5 bg-slate-900 text-slate-100 font-mono shadow-xl space-y-4 max-w-lg mx-auto">
            {/* Header circles */}
            <div className="flex justify-between items-center border-b border-slate-800 pb-2.5">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-[10px] text-slate-500">e1s4_kernel_shell_v1.sh</span>
            </div>

            {/* Simulated typing code */}
            <div className="space-y-2 text-xs leading-relaxed text-slate-300">
              <p className="text-cyan-400 font-bold">$ cat profile_motto.txt</p>
              <p className="text-emerald-400">"Building things to learn. Breaking things to understand."</p>
              <p className="text-cyan-400 font-bold">$ find /home/e1s4/projects/ -name "*.py" -or -name "*.ts"</p>
              <p className="text-slate-400">
                [+] baitbox/honeypot.py - <span className="text-rose-400 font-semibold">Active trap bound to :22</span> <br />
                [+] FamilyFinance/ledger.ts - <span className="text-cyan-400">Aesthetic tracking active</span> <br />
                [+] Aether/physics_engine.ts - <span className="text-amber-400">Vortex calculations ready</span>
              </p>
              <p className="text-cyan-400 font-bold">$ npm run deploy --prod</p>
              <p className="text-slate-500 animate-pulse"># Listening on https://ais-dev-p7lqjqzsqbu2awn5avgngw...</p>
            </div>
          </div>
        </div>
      </section>

      {/* About & Philosophy Section */}
      <section id="about" className="bg-slate-50/50 dark:bg-slate-900/10 border-t border-b border-slate-100 dark:border-slate-900 py-16 px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="max-w-xl">
            <h2 className="font-display font-bold text-3xl tracking-tight text-slate-900 dark:text-white">
              Behind the Terminal
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 leading-relaxed">
              How a security enthusiast and creative front-end developer integrates physical homelabs with smooth client-side animations.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Bio info */}
            <div className="space-y-6">
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                {PERSONAL_INFO.bio}
              </p>
              
              {/* Location pin */}
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono">
                <MapPin className="w-4 h-4 text-cyan-500" />
                <span>Operating Location: {PERSONAL_INFO.location}</span>
              </div>

              {/* Quotes/Philosophy cards */}
              <div className="space-y-4 pt-4 border-t border-slate-200/60 dark:border-slate-900">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">My Philosophies</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {PERSONAL_INFO.philosophies.map((phil, i) => (
                    <div key={i} className="p-4 rounded-xl border border-slate-150 dark:border-slate-850 bg-white dark:bg-slate-950 shadow-sm space-y-1">
                      <h5 className="text-xs font-bold font-display text-slate-850 dark:text-slate-100">{phil.title}</h5>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">{phil.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Live Homelab Stats Simulation */}
            <div className="space-y-5">
              <div className="border border-slate-200 dark:border-slate-800 rounded-2xl p-5 bg-white dark:bg-slate-950 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1.5 text-slate-800 dark:text-slate-200 font-medium">
                    <Laptop className="w-4 h-4 text-cyan-500" />
                    <h4 className="text-xs uppercase tracking-wider font-bold font-mono">Homelab Dashboard v2</h4>
                  </div>
                  <span className="flex items-center gap-1 text-[10px] text-emerald-500 font-mono">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                    ONLINE
                  </span>
                </div>

                <div className="space-y-3.5 text-xs font-mono">
                  {/* Cpu */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] text-slate-500">
                      <span>Node CPU Load (Raspberry Pi 4)</span>
                      <span>14%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-500 rounded-full" style={{ width: '14%' }} />
                    </div>
                  </div>

                  {/* Memory */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] text-slate-500">
                      <span>Ram Usage (Docker Nodes)</span>
                      <span>3.2GB / 8GB</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-600 dark:bg-cyan-400 rounded-full" style={{ width: '40%' }} />
                    </div>
                  </div>

                  {/* Honeypot traps */}
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-850 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider font-bold">Inbound SSH Honeypot Traps</p>
                      <p className="text-base font-bold text-slate-900 dark:text-slate-100 mt-1">429 Attacker Attempts</p>
                    </div>
                    <Shield className="w-8 h-8 text-rose-500/20" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Generative Canvas Sandbox Section */}
      <section id="canvas" className="max-w-7xl mx-auto px-6 py-16 space-y-8">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-mono text-[10px] font-bold uppercase tracking-wider mb-2">
            Creative Playground
          </div>
          <h2 className="font-display font-bold text-3xl tracking-tight text-slate-900 dark:text-white">
            Interactive Art Sandbox
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1.5">
            Inspired by my <b>Interactive-Canvas-Art-Generator</b> repo. Click, move, or drag inside the stage to trigger fluid particle const vectors.
          </p>
        </div>

        <CanvasArt />
      </section>

      {/* Projects Repository Section */}
      <section id="projects" className="max-w-7xl mx-auto px-6 py-16 space-y-10">
        <div className="flex justify-between items-end flex-wrap gap-4">
          <div className="max-w-xl">
            <h2 className="font-display font-bold text-3xl tracking-tight text-slate-900 dark:text-white">
              Public Repository Explorer
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1.5">
              Strictly authenticated projects from my GitHub profile <b>e-1-s-4</b>. No simulated repos. Use queries to filter.
            </p>
          </div>

          {/* Search bar inside project grid */}
          <div className="flex gap-2 items-center w-full sm:w-80 shrink-0">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search repo names or languages..."
                value={projectSearch}
                onChange={(e) => setProjectSearch(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 focus:border-cyan-500/50 dark:focus:border-cyan-500/50 focus:outline-none rounded-xl pl-9.5 pr-4 py-2 text-xs text-slate-800 dark:text-slate-100 transition duration-150"
              />
            </div>
          </div>
        </div>

        {/* Category filtering chips */}
        <div className="flex flex-wrap gap-2 pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-mono uppercase font-bold tracking-wider transition cursor-pointer ${
                activeCategory === cat
                  ? 'bg-slate-800 dark:bg-slate-100 text-white dark:text-slate-900'
                  : 'bg-slate-50 dark:bg-slate-900 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 border border-slate-150 dark:border-slate-850'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Active Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((p) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                <ProjectCard project={p} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredProjects.length === 0 && (
          <div className="py-12 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl text-center">
            <p className="text-xs text-slate-400 font-mono">No matching public repositories found in database.</p>
          </div>
        )}
      </section>

      {/* Skills Matrix Section */}
      <section id="skills" className="bg-slate-50/50 dark:bg-slate-900/10 border-t border-b border-slate-100 dark:border-slate-900 py-16 px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="max-w-xl">
            <h2 className="font-display font-bold text-3xl tracking-tight text-slate-900 dark:text-white">
              Technical Skill Mapping
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1.5">
              Proficiencies in technologies inferred strictly from public codebase languages and tooling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SKILL_CATEGORIES.map((category, idx) => (
              <div key={idx} className="space-y-4">
                <h4 className="text-[11px] font-mono uppercase tracking-wider font-bold text-slate-400 dark:text-slate-500">
                  {category.title}
                </h4>
                <div className="space-y-3.5 bg-white dark:bg-slate-950 p-5 rounded-2xl border border-slate-150 dark:border-slate-850 shadow-sm">
                  {category.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="space-y-1">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-semibold text-slate-700 dark:text-slate-300">{skill.name}</span>
                        <span className="font-mono text-[10px] text-slate-400">{skill.level}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-50 dark:bg-slate-900 rounded-full overflow-hidden border border-slate-100 dark:border-slate-800">
                        <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${skill.level}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* GitHub Activity Section */}
          <div className="pt-6">
            <ActivityGraph />
          </div>
        </div>
      </section>

      {/* Heatmap Section */}
      <section id="heatmap" className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 font-mono text-[10px] uppercase font-bold tracking-wider">
            <Flame className="w-3.5 h-3.5 text-rose-500" />
            <span>Interactive Experiment</span>
          </div>
          <h2 className="font-display font-bold text-3xl tracking-tight text-slate-900 dark:text-white">
            Keystroke Heatmap Logger
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
            A recreation of my <b>Keyboard-Heatmap-Generator</b> project. The terminal logs each hardware stroke dynamically, computing relative character distribution densities and rendering heat levels on the virtual grid.
          </p>
          <div className="p-4 rounded-xl border border-slate-200/50 dark:border-slate-850 bg-slate-50 dark:bg-slate-900/50 text-xs text-slate-500 font-mono space-y-1">
            <p>✔ Active hardware capture active on keydown</p>
            <p>✔ Color grade updates automatically based on weight frequency</p>
          </div>
        </div>

        <KeyboardHeatmap />
      </section>

      {/* CSS Music Visualizer Sandbox */}
      <section id="visualizer" className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center border-t border-slate-100 dark:border-slate-900">
        <MusicVisualizer />

        <div className="space-y-4">
          <h3 className="font-display font-bold text-2xl tracking-tight text-slate-900 dark:text-white">
            CSS-Reactive Music Engine
          </h3>
          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
            Inspired by my <b>Pure-CSS-Music-Visualizer</b> repository. Exploring styling boundaries using purely reactive state cycles that synchronize the height values of vertical bars with the BPM metric of select simulated ambient track presets.
          </p>
          <div className="flex gap-4">
            <div>
              <p className="text-xl font-display font-extrabold text-slate-850 dark:text-white">100%</p>
              <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mt-1">CSS Animation Layouts</p>
            </div>
            <div>
              <p className="text-xl font-display font-extrabold text-slate-850 dark:text-white">No</p>
              <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mt-1">Heavy Canvas overhead needed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience / Milestones Timeline */}
      <section id="timeline" className="bg-slate-50/50 dark:bg-slate-900/10 border-t border-b border-slate-100 dark:border-slate-900 py-16 px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="max-w-xl">
            <h2 className="font-display font-bold text-3xl tracking-tight text-slate-900 dark:text-white">
              Project Milestones Timeline
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1.5">
              Development history inferred strictly from real GitHub repository creation dates and active commits.
            </p>
          </div>

          {/* Timeline chart */}
          <div className="relative border-l border-slate-200 dark:border-slate-800 ml-4 pl-8 space-y-10 max-w-2xl">
            {TIMELINE.map((evt) => (
              <div key={evt.id} className="relative">
                {/* Node icon */}
                <span className="absolute -left-[45px] top-1 w-8 h-8 rounded-full bg-white dark:bg-slate-900 border-2 border-cyan-500 flex items-center justify-center shadow-sm text-cyan-600 dark:text-cyan-400">
                  <Terminal className="w-3.5 h-3.5" />
                </span>

                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 dark:bg-cyan-500/5 px-2.5 py-0.5 rounded-full border border-cyan-500/15">
                    {evt.date}
                  </span>
                  <h4 className="font-display font-bold text-slate-800 dark:text-slate-200 text-base">
                    {evt.title}
                  </h4>
                  <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                    {evt.description}
                  </p>

                  {/* Linked Projects tags */}
                  {evt.projectsLinked && evt.projectsLinked.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {evt.projectsLinked.map((projId) => {
                        const projObj = PROJECTS.find(p => p.id === projId);
                        return (
                          <span
                            key={projId}
                            className="text-[9px] font-mono px-2 py-0.5 rounded bg-white dark:bg-slate-950 text-slate-500 border border-slate-150 dark:border-slate-850"
                          >
                            📁 {projObj?.name || projId}
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Connect / Contact Section */}
      <section id="contact" className="max-w-7xl mx-auto px-6 py-16 space-y-12">
        <div className="max-w-xl">
          <h2 className="font-display font-bold text-3xl tracking-tight text-slate-900 dark:text-white">
            Establish Connection
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1.5">
            Send a secure message directly to my local homelab outbox simulation, or inspect source code files on GitHub.
          </p>
        </div>

        <ContactForm />
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 dark:border-slate-900 bg-slate-50/50 dark:bg-slate-950 px-6 py-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 font-display font-bold text-slate-900 dark:text-white text-base">
            <Cpu className="w-4 h-4 text-cyan-500" />
            <span>E1S4 LABS</span>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap gap-5 justify-center text-xs font-mono text-slate-500">
            <button onClick={() => handleNavigate('about')} className="hover:text-cyan-500 transition">About</button>
            <button onClick={() => handleNavigate('canvas')} className="hover:text-cyan-500 transition">Art Canvas</button>
            <button onClick={() => handleNavigate('projects')} className="hover:text-cyan-500 transition">Projects</button>
            <button onClick={() => handleNavigate('skills')} className="hover:text-cyan-500 transition">Skills</button>
            <button onClick={() => handleNavigate('heatmap')} className="hover:text-cyan-500 transition">Heatmap</button>
            <button onClick={() => handleNavigate('timeline')} className="hover:text-cyan-500 transition">Timeline</button>
          </div>

          {/* Social icons */}
          <div className="flex gap-4 items-center">
            <a 
              href={PERSONAL_INFO.githubUrl} 
              target="_blank" 
              rel="noreferrer" 
              className="text-slate-400 hover:text-cyan-500 transition"
              title="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a 
              href={`mailto:${PERSONAL_INFO.email}`} 
              className="text-slate-400 hover:text-cyan-500 transition"
              title="Send Direct Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto text-center mt-8 pt-6 border-t border-slate-100 dark:border-slate-900/50 text-[10px] font-mono text-slate-400 dark:text-slate-500">
          <p>© 2026 E1S4. Made with high precision React + Tailwind CSS. Designed to observe, break, and rebuild.</p>
        </div>
      </footer>

      {/* Floating Shortcut Helper Icon in bottom right */}
      <button
        onClick={() => setPaletteOpen(true)}
        className="fixed bottom-6 right-6 z-30 p-3 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:scale-105 transition-all shadow-lg border border-slate-800 dark:border-slate-150 flex items-center justify-center"
        title="Open Command Center (Ctrl+K)"
      >
        <Search className="w-4 h-4" />
      </button>

      {/* Command Palette Overlay Modal */}
      <CommandPalette 
        isOpen={paletteOpen} 
        onClose={() => setPaletteOpen(false)} 
        onNavigate={handleNavigate} 
      />

    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioContent />
    </ThemeProvider>
  );
}
