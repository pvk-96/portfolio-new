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
import GitHubActivitySection from '@/components/GitHubActivitySection';
import {
  getHero,
  getProjects,
  getExperience,
  getSkills,
  getSections,
  getAchievements,
  getCertifications,
  getAbout,
  getContact,
  getSiteConfig,
} from '@/lib/data';

export const dynamic = 'force-dynamic'

export default async function Page() {
  const [
    hero,
    projects,
    experience,
    skills,
    sections,
    achievements,
    certifications,
    about,
    contact,
    siteConfig,
  ] = await Promise.all([
    getHero(),
    getProjects(),
    getExperience(),
    getSkills(),
    getSections(),
    getAchievements(),
    getCertifications(),
    getAbout(),
    getContact(),
    getSiteConfig(),
  ]);

  return (
    <>
      <BackgroundAnimation />
      <CursorSystem />
      <Navbar data={hero || {}} />
      <main className="flex-1 w-full flex flex-col">
        <HeroSection data={hero || {}} />
        <GitHubActivitySection username={siteConfig?.githubUsername || 'pvk-96'} />
        <ExperienceSection data={experience || []} />
        <ProjectsSection data={projects || []} />
        <CertificationsSection data={certifications || []} />
        <AchievementsSection data={achievements || []} />
        <SkillsSection data={skills || []} />
        {/* Dynamic Sections from Sanity */}
        {(sections || []).filter((s: any) => s.enabled).map((section: any) => (
          <section key={section._id || section.slug} id={section.slug || ''} className="py-[clamp(4rem,10vh,7rem)] px-[clamp(1.5rem,6vw,6rem)] max-w-[1200px] mx-auto w-full">
            <h2 className="font-brutal text-[2.5rem] mb-[1.5rem]">{section.title}</h2>
            <div className="text-[var(--color-text-muted)] leading-[1.7]" dangerouslySetInnerHTML={{ __html: section.content || '' }} />
          </section>
        ))}
        <AboutSection data={about || null} />
        <ContactSection data={contact || null} />
      </main>
      <Footer data={hero || {}} />
    </>
  );
}
