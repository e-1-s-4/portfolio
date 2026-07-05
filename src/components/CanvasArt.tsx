import React, { useRef, useEffect, useState } from 'react';
import { Play, Pause, RotateCcw, Download, Sparkles } from 'lucide-react';
import { useTheme } from './ThemeContext';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
}

export const CanvasArt: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  
  const [isPlaying, setIsPlaying] = useState(true);
  const [particleCount, setParticleCount] = useState(120);
  const [colorScheme, setColorScheme] = useState<'purple' | 'cyan' | 'emerald' | 'amber' | 'rainbow'>('purple');
  
  const particles = useRef<Particle[]>([]);
  const mouse = useRef({ x: -1000, y: -1000, active: false });
  const requestRef = useRef<number | null>(null);

  // Colors mapping based on selection
  const getColors = () => {
    switch (colorScheme) {
      case 'purple': return ['#a855f7', '#7e22ce', '#c084fc', '#d8b4fe', '#ffffff'];
      case 'cyan': return ['#06b6d4', '#0891b2', '#22d3ee', '#67e8f9', '#ffffff'];
      case 'emerald': return ['#10b981', '#059669', '#34d399', '#6ee7b7', '#ffffff'];
      case 'amber': return ['#f59e0b', '#d97706', '#fbbf24', '#fcd34d', '#ffffff'];
      case 'rainbow': return ['#ff4545', '#ff9f45', '#ffea45', '#45ff45', '#45eaff', '#4545ff', '#9f45ff'];
    }
  };

  const createParticle = (width: number, height: number, forceRandom = false): Particle => {
    const schemeColors = getColors();
    const color = schemeColors[Math.floor(Math.random() * schemeColors.length)];
    
    // If interactive mouse is active, spawn near mouse, else random
    let x = Math.random() * width;
    let y = Math.random() * height;
    
    if (mouse.current.active && !forceRandom && Math.random() < 0.4) {
      x = mouse.current.x + (Math.random() - 0.5) * 50;
      y = mouse.current.y + (Math.random() - 0.5) * 50;
    }

    return {
      x,
      y,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      size: Math.random() * 3 + 1,
      color,
      alpha: Math.random() * 0.5 + 0.3
    };
  };

  const initParticles = (width: number, height: number) => {
    particles.current = [];
    for (let i = 0; i < particleCount; i++) {
      particles.current.push(createParticle(width, height, true));
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      const parent = containerRef.current;
      if (!parent) return;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight || 400;
      initParticles(canvas.width, canvas.height);
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    handleResize();

    return () => {
      resizeObserver.disconnect();
    };
  }, [particleCount, colorScheme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width;
    let height = canvas.height;

    const render = () => {
      if (!isPlaying) return;

      // Dark theme gets deep black fade trail, light theme gets soft white fade trail
      ctx.fillStyle = theme === 'dark' ? 'rgba(15, 23, 42, 0.08)' : 'rgba(255, 255, 255, 0.08)';
      ctx.fillRect(0, 0, width, height);

      particles.current.forEach((p, idx) => {
        // Move particle
        p.x += p.vx;
        p.y += p.vy;

        // Apply slight friction
        p.vx *= 0.99;
        p.vy *= 0.99;

        // Attract to mouse if active and within range
        if (mouse.current.active) {
          const dx = mouse.current.x - p.x;
          const dy = mouse.current.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 220) {
            const force = (220 - dist) / 2500;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
            
            // Add custom vortex spin
            const angle = Math.atan2(dy, dx) + Math.PI / 2;
            p.vx += Math.cos(angle) * 0.05;
            p.vy += Math.sin(angle) * 0.05;
          }
        }

        // Boundary checks with soft bounce or wrap-around
        if (p.x < 0 || p.x > width) {
          p.vx *= -1;
          p.x = Math.max(0, Math.min(width, p.x));
        }
        if (p.y < 0 || p.y > height) {
          p.vy *= -1;
          p.y = Math.max(0, Math.min(height, p.y));
        }

        // Draw particle
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowBlur = p.size * 1.5;
        ctx.shadowColor = p.color;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Constellation lines to neighbors
        for (let j = idx + 1; j < particles.current.length; j++) {
          const other = particles.current[j];
          const ldx = other.x - p.x;
          const ldy = other.y - p.y;
          const ldist = Math.sqrt(ldx * ldx + ldy * ldy);

          if (ldist < 80) {
            ctx.save();
            ctx.globalAlpha = (1 - ldist / 80) * 0.12;
            ctx.strokeStyle = p.color;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
            ctx.restore();
          }
        }
      });

      requestRef.current = requestAnimationFrame(render);
    };

    if (isPlaying) {
      requestRef.current = requestAnimationFrame(render);
    }

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPlaying, theme]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouse.current.x = e.clientX - rect.left;
    mouse.current.y = e.clientY - rect.top;
    mouse.current.active = true;
  };

  const handleMouseLeave = () => {
    mouse.current.active = false;
    mouse.current.x = -1000;
    mouse.current.y = -1000;
  };

  const resetCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    initParticles(canvas.width, canvas.height);
  };

  const downloadArt = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Create link and download PNG
    const link = document.createElement('a');
    link.download = `e1s4-generative-art-${colorScheme}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="relative border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-950 p-4 shadow-sm" ref={containerRef}>
      {/* Canvas Controls */}
      <div className="absolute top-4 left-4 right-4 z-10 flex flex-wrap gap-2 items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-1.5 bg-white/85 dark:bg-slate-900/85 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-850 shadow-sm text-xs text-slate-800 dark:text-slate-200">
          <Sparkles className="w-3.5 h-3.5 text-cyan-500 animate-pulse" />
          <span className="font-medium font-mono text-[11px]">Interactive Canvas Generator</span>
        </div>

        <div className="flex gap-2">
          {/* Preset Buttons */}
          <div className="flex bg-white/85 dark:bg-slate-900/85 backdrop-blur-md p-1 rounded-full border border-slate-200 dark:border-slate-850 shadow-sm text-xs font-mono">
            {(['purple', 'cyan', 'emerald', 'amber', 'rainbow'] as const).map((scheme) => (
              <button
                key={scheme}
                onClick={() => setColorScheme(scheme)}
                className={`px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider transition ${
                  colorScheme === scheme
                    ? 'bg-slate-800 dark:bg-slate-100 text-white dark:text-slate-900'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                {scheme}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 bg-white/85 dark:bg-slate-900/85 backdrop-blur-md p-1 rounded-full border border-slate-200 dark:border-slate-850 shadow-sm">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={resetCanvas}
              className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
              title="Reset Particles"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={downloadArt}
              className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
              title="Download PNG Snapshot"
            >
              <Download className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Actual Canvas */}
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="w-full h-[320px] cursor-crosshair rounded-xl block bg-slate-900 dark:bg-slate-950 border border-slate-100 dark:border-slate-900"
      />

      <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-slate-400 dark:text-slate-500">
        <p>Interactive: Drag your cursor inside the stage to trigger physics vortex streams</p>
        <p className="hidden md:block">Particles: {particleCount} | Active const links</p>
      </div>
    </div>
  );
};
