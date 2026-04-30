import { headers } from 'next/headers';
import CursorSystem from '@/components/CursorSystem';
import BackgroundAnimation from '@/components/BackgroundAnimation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RoadmapTimeline from '@/components/RoadmapTimeline';
import SectionLabel from '@/components/SectionLabel';

interface Milestone {
  id: string;
  date: string;
  title: string;
  category: string;
  description: string;
  status: 'completed' | 'in-progress' | 'planned';
  tags: string[];
  order: number;
}

interface RoadmapData {
  milestones: Milestone[];
}

interface HeroData {
  greeting?: string;
  name?: string;
  tagline?: string;
  photoUrl?: string;
}

async function fetchRoadmapData(): Promise<RoadmapData> {
  const host = (await headers()).get('host') || 'localhost:3000';
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  
  try {
    const res = await fetch(`${protocol}://${host}/api/roadmap`, { next: { revalidate: 0 } });
    if (!res.ok) throw new Error('Fetch failed');
    return await res.json();
  } catch (err) {
    console.error('Roadmap API Error', err);
    return { milestones: [] };
  }
}

async function fetchHeroData(): Promise<HeroData> {
  const host = (await headers()).get('host') || 'localhost:3000';
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  
  try {
    const res = await fetch(`${protocol}://${host}/api/content`, { next: { revalidate: 0 } });
    if (!res.ok) throw new Error('Fetch failed');
    const data = await res.json();
    return data.hero || {};
  } catch (err) {
    console.error('Hero API Error', err);
    return {};
  }
}

export const metadata = {
  title: 'Praneeth Varma K — Career Roadmap',
  description: 'My professional journey and milestones',
};

export default async function RoadmapPage() {
  const [roadmapData, heroData] = await Promise.all([
    fetchRoadmapData(),
    fetchHeroData()
  ]);

  return (
    <>
      <BackgroundAnimation />
      <CursorSystem />
      <Navbar data={heroData} />
      <main className="flex-1 w-full flex flex-col">
        <section className="py-[clamp(4rem,10vh,7rem)] px-[clamp(1.5rem,6vw,6rem)] max-w-[1200px] mx-auto w-full">
          <SectionLabel label="Career" title="My" titleEm="Roadmap" />
          
          <div className="mt-[3rem]">
            {roadmapData.milestones.length === 0 ? (
              <div className="text-center py-20">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-cyan)] mb-4"></div>
                <p className="font-mono text-[var(--color-text-dim)]">No milestones yet. Check back soon!</p>
              </div>
            ) : (
              <RoadmapTimeline milestones={roadmapData.milestones} />
            )}
          </div>
        </section>
      </main>
      <Footer data={heroData} />
    </>
  );
}
