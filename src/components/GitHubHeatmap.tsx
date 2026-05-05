'use client';

import { useState, useEffect, useCallback } from 'react';

type ContributionDay = {
  date: string;
  contributionCount: number;
};

type Week = {
  contributionDays: ContributionDay[];
};

type HeatmapProps = {
  username: string;
};

const COLORS = {
  0: 'rgba(0, 201, 167, 0.05)',
  1: 'rgba(0, 201, 167, 0.2)',
  2: 'rgba(0, 201, 167, 0.4)',
  3: 'rgba(0, 201, 167, 0.7)',
  4: 'rgba(0, 201, 167, 1)',
};

function getColor(count: number): string {
  if (count === 0) return COLORS[0];
  if (count <= 2) return COLORS[1];
  if (count <= 5) return COLORS[2];
  if (count <= 10) return COLORS[3];
  return COLORS[4];
}

function Tooltip({ day, x, y }: { day: ContributionDay | null; x: number; y: number }) {
  if (!day) return null;
  return (
    <div
      className="fixed z-[10000] bg-[#1a1a2e] border border-[var(--color-border-h)] rounded-[4px] px-[10px] py-[6px] text-[0.7rem] text-[var(--color-text-main)] pointer-events-none"
      style={{ left: x + 10, top: y - 30 }}
    >
      <span className="font-mono">{day.date}: </span>
      <span className="text-[var(--color-cyan)]">{day.contributionCount} contributions</span>
    </div>
  );
}

export default function GitHubHeatmap({ username }: HeatmapProps) {
  const [weeks, setWeeks] = useState<Week[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [tooltip, setTooltip] = useState<{ day: ContributionDay | null; x: number; y: number }>({
    day: null,
    x: 0,
    y: 0,
  });

  const fetchData = useCallback(async () => {
    try {
      const query = `
        query {
          user(login: "${username}") {
            contributionsCollection {
              contributionCalendar {
                weeks {
                  contributionDays {
                    date
                    contributionCount
                  }
                }
              }
            }
          }
        }
      `;

      const res = await fetch('/api/github/heatmap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      if (!res.ok) throw new Error('GitHub API failed');

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      const weeksData = data.data?.user?.contributionsCollection?.contributionCalendar?.weeks || [];
      setWeeks(weeksData);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [username]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return <div className="font-mono text-[0.7rem] text-[var(--color-text-dim)]">Loading heatmap...</div>;
  }

  if (error || weeks.length === 0) {
    return null; // Hide on error, no zero values
  }

  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="overflow-x-auto">
      <div className="flex gap-[2px]">
        {/* Day labels */}
        <div className="flex flex-col gap-[2px] mr-[4px]">
          {dayLabels.map((day, i) => (
            <div key={i} className="h-[12px] w-[30px] text-[0.55rem] text-[var(--color-text-dim)] flex items-center">
              {(i % 2 === 1 || i === 0) && day}
            </div>
          ))}
        </div>

        {/* Heatmap grid */}
        <div className="flex gap-[2px]">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[2px]">
              {week.contributionDays.map((day: ContributionDay, di: number) => (
                <div
                  key={day.date}
                  className="w-[12px] h-[12px] rounded-[2px] cursor-pointer transition-opacity hover:opacity-80"
                  style={{ backgroundColor: getColor(day.contributionCount) }}
                  onMouseEnter={(e) => {
                    setTooltip({ day, x: e.clientX, y: e.clientY });
                  }}
                  onMouseLeave={() => setTooltip({ day: null, x: 0, y: 0 })}
                  title={`${day.date}: ${day.contributionCount} contributions`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <Tooltip day={tooltip.day} x={tooltip.x} y={tooltip.y} />
    </div>
  );
}
