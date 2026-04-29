import { headers } from 'next/headers';
import CursorSystem from '@/components/CursorSystem';
import BackgroundAnimation from '@/components/BackgroundAnimation';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ExperienceSection from '@/components/ExperienceSection';
import ProjectsSection from '@/components/ProjectsSection';
import CertificationsSection from '@/components/CertificationsSection';
import AchievementsSection from '@/components/AchievementsSection';
import SkillsSection from '@/components/SkillsSection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

// Use standard API fetching or fallback to read module
async function fetchConfig() {
  const host = (await headers()).get('host') || 'localhost:3000';
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  let data;
  try {
    const res = await fetch(`${protocol}://${host}/api/content`, { next: { revalidate: 0 } });
    if (!res.ok) throw new Error('Fetch failed');
    data = await res.json();
  } catch (err) {
    // If we fail, try to construct the fallback 
    console.error('API Error, using fallback', err);
    data = null;
  }
  return data;
}

export default async function Page() {
  let data = await fetchConfig();

  // Very aggressive fallback if we cannot reach API due to next build phase etc.
  if (!data) {
    // Dynamically loading JSON prevents build errors if API fails
    const defaultData = await import('@/data/cms.json').then((m) => m.default).catch(() => ({}));
    data = defaultData;
  }

  return (
    <>
      <BackgroundAnimation />
      <CursorSystem />
      <Navbar data={data.hero || {}} />
      <main className="flex-1 w-full flex flex-col">
        <HeroSection data={data.hero || {}} />
        <ExperienceSection data={data.experience || []} />
        <ProjectsSection data={data.projects || []} />
        <CertificationsSection data={data.certifications || []} />
        <AchievementsSection data={data.achievements || []} />
        <SkillsSection data={data.skills || []} />
        <AboutSection data={data.about || null} />
        <ContactSection data={data.contact || null} />
      </main>
      <Footer data={data.hero || {}} />
    </>
  );
}
