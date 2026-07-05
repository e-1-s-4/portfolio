import React, { useState, useMemo } from 'react';
import { Calendar, HelpCircle } from 'lucide-react';
import { generateGitHubActivity } from '../data';
import { ContributionDay } from '../types';

export const ActivityGraph: React.FC = () => {
  const activityData = useMemo(() => generateGitHubActivity(), []);
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);

  // Chunk activity into weeks (7 days each)
  const weeks = useMemo(() => {
    const chunked: ContributionDay[][] = [];
    let currentWeek: ContributionDay[] = [];
    
    // We want to align days so each week starts on Sunday or matches correctly
    activityData.forEach((day) => {
      currentWeek.push(day);
      if (currentWeek.length === 7) {
        chunked.push(currentWeek);
        currentWeek = [];
      }
    });
    
    if (currentWeek.length > 0) {
      chunked.push(currentWeek);
    }
    
    return chunked;
  }, [activityData]);

  // Color grades mapping
  const getColorClass = (level: number) => {
    switch (level) {
      case 0: return 'bg-slate-100 dark:bg-slate-900 border border-slate-200/20 dark:border-slate-800/20';
      case 1: return 'bg-cyan-100 dark:bg-cyan-950/80 border border-cyan-300/10 dark:border-cyan-800/20';
      case 2: return 'bg-cyan-300 dark:bg-cyan-800/80 border border-cyan-400/10 dark:border-cyan-700/20';
      case 3: return 'bg-cyan-500 dark:bg-cyan-600 border border-cyan-550/10 dark:border-cyan-500/20';
      case 4: return 'bg-cyan-600 dark:bg-cyan-400 border border-cyan-700/10 dark:border-cyan-300/20';
      default: return 'bg-slate-100 dark:bg-slate-900';
    }
  };

  const getMonthLabel = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString('default', { month: 'short' });
  };

  // Extract month labels with positions
  const monthLabels = useMemo(() => {
    const labels: { text: string; weekIndex: number }[] = [];
    let lastMonth = '';
    
    weeks.forEach((week, index) => {
      const firstDay = week[0];
      if (firstDay) {
        const month = getMonthLabel(firstDay.date);
        if (month !== lastMonth) {
          labels.push({ text: month, weekIndex: index });
          lastMonth = month;
        }
      }
    });
    
    return labels;
  }, [weeks]);

  const totalContributions = useMemo(() => {
    return activityData.reduce((sum, d) => sum + d.count, 0);
  }, [activityData]);

  return (
    <div className="border border-slate-200 dark:border-slate-800 rounded-2xl p-5 bg-slate-50 dark:bg-slate-950 shadow-sm">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-cyan-500" />
          <h4 className="font-display font-medium text-slate-800 dark:text-slate-200 text-sm">GitHub Contribution Map (2026)</h4>
        </div>
        <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
          Total Commits: <strong className="text-cyan-600 dark:text-cyan-400 font-bold">{totalContributions}</strong>
        </div>
      </div>

      <div className="relative">
        {/* Graph stage */}
        <div className="overflow-x-auto scrollbar-none pb-2">
          <div className="min-w-[620px] flex flex-col gap-1 select-none">
            {/* Months Header row */}
            <div className="h-4 relative text-[9px] font-mono text-slate-400 dark:text-slate-500">
              {monthLabels.map((lbl, idx) => (
                <span
                  key={idx}
                  style={{ left: `${lbl.weekIndex * 11}px` }}
                  className="absolute"
                >
                  {lbl.text}
                </span>
              ))}
            </div>

            {/* Grid rows (7 rows representing days) */}
            <div className="flex gap-1">
              {/* Day indicator labels */}
              <div className="flex flex-col gap-1 justify-between h-[77px] pr-2 text-[8px] font-mono text-slate-400 dark:text-slate-500 w-5">
                <span>Mon</span>
                <span>Wed</span>
                <span>Fri</span>
              </div>

              {/* Columns of weeks */}
              <div className="flex gap-[3px]">
                {weeks.map((week, weekIdx) => (
                  <div key={weekIdx} className="flex flex-col gap-[3px]">
                    {week.map((day, dayIdx) => (
                      <div
                        key={dayIdx}
                        className={`w-[8px] h-[8px] sm:w-[9px] sm:h-[9px] rounded-sm transition-all cursor-pointer hover:ring-2 hover:ring-cyan-500/50 ${getColorClass(day.level)}`}
                        onMouseEnter={() => setHoveredDay(day)}
                        onMouseLeave={() => setHoveredDay(null)}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-between mt-3 text-[10px] font-mono text-slate-400 dark:text-slate-500">
          <span>Less active</span>
          <div className="flex gap-1 items-center mx-2">
            <div className="w-2.5 h-2.5 rounded-sm bg-slate-100 dark:bg-slate-900" />
            <div className="w-2.5 h-2.5 rounded-sm bg-cyan-100 dark:bg-cyan-950" />
            <div className="w-2.5 h-2.5 rounded-sm bg-cyan-300 dark:bg-cyan-800" />
            <div className="w-2.5 h-2.5 rounded-sm bg-cyan-500" />
            <div className="w-2.5 h-2.5 rounded-sm bg-cyan-600 dark:bg-cyan-400" />
          </div>
          <span>More active</span>
        </div>

        {/* Dynamic Tooltip */}
        <div className="h-8 mt-2 flex items-center justify-center">
          {hoveredDay ? (
            <div className="text-[11px] font-mono bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-850 shadow-sm py-1 px-3 rounded-full text-slate-700 dark:text-slate-300 animate-fade-in">
              <strong>{hoveredDay.count} commits</strong> on {new Date(hoveredDay.date).toLocaleDateString('default', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
            </div>
          ) : (
            <div className="text-[11px] font-mono text-slate-400 dark:text-slate-500 flex items-center gap-1">
              <HelpCircle className="w-3.5 h-3.5" /> Hover over pixel blocks to analyze individual commit timelines
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
