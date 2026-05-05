'use client';

import { useState, useEffect } from 'react';
import GitHubHeatmap from './GitHubHeatmap';

type Repo = {
  name: string;
  stargazers_count: number;
  forks_count: number;
};

type ActivityData = {
  repos: number;
  estimatedCommits: number;
  loading: boolean;
};

export default function GitHubActivitySection({ username }: { username: string }) {
  const [data, setData] = useState<ActivityData>({ repos: 0, estimatedCommits: 0, loading: true });

  useEffect(() => {
    async function fetchActivity() {
      try {
        const res = await fetch(`/api/github/activity?username=${username}`);
        if (!res.ok) throw new Error('Failed to fetch activity');

        const data = await res.json();
        if (data.error) throw new Error(data.error);

        setData({
          repos: data.repos || 0,
          estimatedCommits: data.estimatedCommits || 0,
          loading: false,
        });
      } catch {
        setData({ repos: 0, estimatedCommits: 0, loading: false });
      }
    }

    fetchActivity();
  }, [username]);

  return (
    <section id="github-activity" className="py-[clamp(4rem,10vh,7rem)] px-[clamp(1.5rem,6vw,6rem)] max-w-[1200px] mx-auto w-full">
      <div className="mb-[2rem]">
        <p className="font-mono text-[0.62rem] tracking-[0.18em] uppercase text-[var(--color-cyan)] mb-[0.5rem]">
          GitHub
        </p>
        <h2 className="font-brutal text-[clamp(2rem,5vw,3.5rem)] text-[var(--color-text-main)]">
          Activity <span className="text-[var(--color-cyan)]">Heatmap</span>
        </h2>
      </div>

      {/* Heatmap */}
      <div className="mb-[2rem]">
        <GitHubHeatmap username={username} />
      </div>

      {/* Stats */}
      {!data.loading && data.estimatedCommits > 0 && (
        <div className="flex gap-[2rem] font-mono text-[0.75rem] text-[var(--color-text-muted)]">
          <div className="flex flex-col items-center">
            <span className="text-[1.5rem] text-[var(--color-cyan)] font-bold">{data.repos}</span>
            <span className="tracking-[0.1em] uppercase text-[0.6rem] text-[var(--color-text-dim)]">Repos</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[1.5rem] text-[var(--color-primary-green)] font-bold">
              {data.estimatedCommits}+
            </span>
            <span className="tracking-[0.1em] uppercase text-[0.6rem] text-[var(--color-text-dim)]">Est. Commits</span>
          </div>
        </div>
      )}
    </section>
  );
}
