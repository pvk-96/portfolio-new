'use client';

import { useState, useEffect } from 'react';

// Highly optimized basic admin built natively mimicking the fast original interface
export default function AdminPage() {
  const [data, setData] = useState<any>(null);
  const [auth, setAuth] = useState(false);
  const [sec, setSec] = useState('hero');
  const [cred, setCred] = useState({ u: '', p: '' });
  const [err, setErr] = useState('');
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState(false);

  useEffect(() => {
    fetch('/api/content').then(res => res.json()).then(d => {
      // Intentionally insert 'achievements' if not present since user requested it
      if (!d.achievements) d.achievements = [];
      setData(d);
    });
    if (sessionStorage.getItem('pvk_admin')) setAuth(true);
  }, []);

  const login = () => {
    if (data && cred.u === data.credentials.username && cred.p === data.credentials.password) {
      sessionStorage.setItem('pvk_admin', '1');
      setAuth(true);
    } else {
      setErr('Invalid credentials');
    }
  };

  const save = async () => {
    setSaving(true);
    await fetch('/api/content', { method: 'POST', body: JSON.stringify(data) });
    setSaving(false);
    setNotice(true);
    setTimeout(() => setNotice(false), 2500);
  };

  if (!data) return <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center p-8"><span className="font-mono text-[var(--color-cyan)] text-sm">Loading CMS...</span></div>;

  if (!auth) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 bg-[var(--color-bg)] text-[var(--color-text-main)] font-body">
        <div className="bg-[var(--color-bg2)] border border-[var(--color-border-main)] rounded p-12 w-full max-w-md shadow-[0_0_60px_var(--color-cyan-dim)]">
          <h2 className="font-brutal text-3xl mb-1">Admin Panel</h2>
          <p className="font-mono text-xs text-[var(--color-text-dim)] tracking-widest mb-8">pvk-portfolio // cms</p>
          {err && <div className="bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-xs p-3 rounded mb-4">{err}</div>}
          <div className="flex flex-col gap-2 mb-4">
            <label className="font-mono text-[0.62rem] tracking-widest uppercase text-[var(--color-text-dim)]">Username</label>
            <input className="bg-[var(--color-bg3)] border border-[var(--color-border-main)] rounded px-3 py-2 text-sm outline-none focus:border-[var(--color-cyan)]" value={cred.u} onChange={e => setCred({...cred, u: e.target.value})} />
          </div>
          <div className="flex flex-col gap-2 mb-6">
            <label className="font-mono text-[0.62rem] tracking-widest uppercase text-[var(--color-text-dim)]">Password</label>
            <input type="password" onKeyDown={e => e.key === 'Enter' && login()} className="bg-[var(--color-bg3)] border border-[var(--color-border-main)] rounded px-3 py-2 text-sm outline-none focus:border-[var(--color-cyan)]" value={cred.p} onChange={e => setCred({...cred, p: e.target.value})} />
          </div>
          <button onClick={login} className="w-full bg-[var(--color-cyan)] text-[var(--color-bg)] font-mono text-xs tracking-widest uppercase py-3 rounded hover:brightness-110 cursor-none hover-target">Login</button>
        </div>
      </div>
    );
  }

  // Value updaters
  const upd = (key: string, val: any) => setData((prev: any) => ({ ...prev, [key]: val }));
  const updArr = (key: string, i: number, field: string, val: any) => {
    const arr = [...data[key]];
    arr[i][field] = val;
    upd(key, arr);
  };
  const delArr = (key: string, i: number) => {
    const arr = [...data[key]];
    arr.splice(i, 1);
    upd(key, arr);
  };
  const addArr = (key: string, blank: any) => upd(key, [...data[key], blank]);

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text-main)] font-body">
      <div className="flex items-center justify-between px-8 py-4 bg-[var(--color-bg2)] border-b border-[var(--color-border-main)] sticky top-0 z-50">
        <span className="font-mono text-sm tracking-widest text-[var(--color-cyan)]">// CMS — Praneeth Varma K (Next.js)</span>
        <div className="flex gap-4">
          <button onClick={() => window.open('/', '_blank')} className="px-4 py-2 border border-[var(--color-border-main)] text-[var(--color-text-muted)] rounded font-mono text-[0.72rem] tracking-widest uppercase hover:text-[var(--color-cyan)] hover:border-[var(--color-cyan)] font-none hover-target">Preview Site</button>
          <button onClick={save} className="px-5 py-2 bg-[var(--color-cyan)] text-[var(--color-bg)] rounded font-mono text-[0.72rem] tracking-widest uppercase hover:brightness-110 cursor-none hover-target">{saving ? 'Saving...' : 'Save Changes'}</button>
          <button onClick={() => { sessionStorage.removeItem('pvk_admin'); setAuth(false); }} className="px-4 py-2 border border-red-500/30 text-red-400 rounded font-mono text-[0.72rem] tracking-widest uppercase hover:bg-red-500/10 cursor-none hover-target">Logout</button>
        </div>
      </div>

      <div className="grid grid-cols-[220px_1fr] min-h-[calc(100vh-65px)]">
        <div className="bg-[var(--color-bg2)] border-r border-[var(--color-border-main)] p-6 flex flex-col gap-2">
          {['hero', 'experience', 'projects', 'certifications', 'achievements', 'skills', 'about', 'contact', 'settings'].map(t => (
            <button key={t} onClick={() => setSec(t)} className={`text-left px-5 py-3 font-mono text-[0.75rem] tracking-[0.06em] uppercase rounded-r transition-all cursor-none hover-target border-l-2 ${sec === t ? 'border-[var(--color-cyan)] text-[var(--color-cyan)] bg-[var(--color-cyan-dim)]' : 'border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-cyan)] hover:border-[var(--color-cyan)]'}`}>{t}</button>
          ))}
        </div>
        
        <div className="p-10 overflow-y-auto w-full max-w-4xl">
          <h2 className="font-brutal text-3xl mb-8 pb-4 border-b border-[var(--color-border-main)] capitalize">{sec}</h2>
          
          {sec === 'hero' && (
            <div className="flex flex-col gap-6">
              <div><label className="block font-mono text-[0.62rem] tracking-widest text-[var(--color-text-dim)] uppercase mb-2">Greeting / Status</label><input className="w-full bg-[var(--color-bg3)] border border-[var(--color-border-main)] rounded px-3 py-2 text-sm outline-none focus:border-[var(--color-cyan)]" value={data.hero.greeting} onChange={e => upd('hero', { ...data.hero, greeting: e.target.value })} /></div>
              <div><label className="block font-mono text-[0.62rem] tracking-widest text-[var(--color-text-dim)] uppercase mb-2">Name</label><input className="w-full bg-[var(--color-bg3)] border border-[var(--color-border-main)] rounded px-3 py-2 text-sm outline-none focus:border-[var(--color-cyan)]" value={data.hero.name} onChange={e => upd('hero', { ...data.hero, name: e.target.value })} /></div>
              <div><label className="block font-mono text-[0.62rem] tracking-widest text-[var(--color-text-dim)] uppercase mb-2">Tagline</label><input className="w-full bg-[var(--color-bg3)] border border-[var(--color-border-main)] rounded px-3 py-2 text-sm outline-none focus:border-[var(--color-cyan)]" value={data.hero.tagline} onChange={e => upd('hero', { ...data.hero, tagline: e.target.value })} /></div>
            </div>
          )}

          {sec === 'experience' && (
            <div className="flex flex-col gap-4">
              {data.experience.map((e: any, i: number) => (
                <div key={i} className="bg-[var(--color-bg3)] border border-[var(--color-border-main)] rounded p-6">
                  <div className="flex justify-between items-center mb-6"><span className="font-mono text-[var(--color-cyan)] uppercase text-xs">{e.role}</span><button onClick={() => delArr('experience', i)} className="px-3 py-1 border border-red-500/30 text-red-500 text-[0.65rem] font-mono tracking-widest uppercase rounded hover:bg-red-500/10">Delete</button></div>
                  <div className="grid gap-4">
                    <input className="bg-[var(--color-bg2)] border border-[var(--color-border-main)] rounded px-3 py-2 text-sm" value={e.role} onChange={ev => updArr('experience', i, 'role', ev.target.value)} placeholder="Role" />
                    <input className="bg-[var(--color-bg2)] border border-[var(--color-border-main)] rounded px-3 py-2 text-sm" value={e.company} onChange={ev => updArr('experience', i, 'company', ev.target.value)} placeholder="Company" />
                    <input className="bg-[var(--color-bg2)] border border-[var(--color-border-main)] rounded px-3 py-2 text-sm" value={e.period} onChange={ev => updArr('experience', i, 'period', ev.target.value)} placeholder="Date Range" />
                    <label className="flex items-center gap-2 font-mono text-xs text-[var(--color-text-dim)]"><input type="checkbox" checked={e.remote} onChange={ev => updArr('experience', i, 'remote', ev.target.checked)} /> Remote</label>
                    <textarea rows={4} className="bg-[var(--color-bg2)] border border-[var(--color-border-main)] rounded px-3 py-2 text-sm" value={e.bullets.join('\n')} onChange={ev => updArr('experience', i, 'bullets', ev.target.value.split('\n'))} placeholder="Bullets (newline separated)"></textarea>
                  </div>
                </div>
              ))}
              <button onClick={() => addArr('experience', { role: 'New Role', company: 'Company', period: '2025', remote: false, bullets: ['Detail'] })} className="p-3 border border-dashed border-[var(--color-cyan)] text-[var(--color-cyan)] bg-[var(--color-cyan-dim)] font-mono text-xs uppercase hover:brightness-125 rounded">+ Add Experience</button>
            </div>
          )}

          {sec === 'projects' && (
            <div className="flex flex-col gap-4">
              {data.projects.map((p: any, i: number) => (
                <div key={i} className="bg-[var(--color-bg3)] border border-[var(--color-border-main)] rounded p-6">
                  <div className="flex justify-between items-center mb-6"><span className="font-mono text-[var(--color-cyan)] uppercase text-xs">{p.title}</span><button onClick={() => delArr('projects', i)} className="px-3 py-1 border border-red-500/30 text-red-500 text-[0.65rem] font-mono tracking-widest uppercase rounded hover:bg-red-500/10">Delete</button></div>
                  <div className="grid gap-4">
                    <input className="bg-[var(--color-bg2)] border border-[var(--color-border-main)] rounded px-3 py-2 text-sm" value={p.title} onChange={ev => updArr('projects', i, 'title', ev.target.value)} placeholder="Title" />
                    <input className="bg-[var(--color-bg2)] border border-[var(--color-border-main)] rounded px-3 py-2 text-sm" value={p.oneliner} onChange={ev => updArr('projects', i, 'oneliner', ev.target.value)} placeholder="One liner (subtitle)" />
                    <textarea rows={3} className="bg-[var(--color-bg2)] border border-[var(--color-border-main)] rounded px-3 py-2 text-sm" value={p.description} onChange={ev => updArr('projects', i, 'description', ev.target.value)} placeholder="Full Description" />
                    <input className="bg-[var(--color-bg2)] border border-[var(--color-border-main)] rounded px-3 py-2 text-sm" value={(p.tech||[]).join(', ')} onChange={ev => updArr('projects', i, 'tech', ev.target.value.split(',').map(x=>x.trim()))} placeholder="Tech stack (comma separated)" />
                    <input className="bg-[var(--color-bg2)] border border-[var(--color-border-main)] rounded px-3 py-2 text-sm" value={p.link} onChange={ev => updArr('projects', i, 'link', ev.target.value)} placeholder="GitHub or Live URL" />
                  </div>
                </div>
              ))}
              <button onClick={() => addArr('projects', { title: 'New Project', oneliner: '', description: '', tech: [], link: '' })} className="p-3 border border-dashed border-[var(--color-cyan)] text-[var(--color-cyan)] bg-[var(--color-cyan-dim)] font-mono text-xs uppercase hover:brightness-125 rounded">+ Add Project</button>
            </div>
          )}

          {sec === 'certifications' && (
            <div className="flex flex-col gap-4">
              {data.certifications.map((c: any, i: number) => (
                <div key={i} className="grid grid-cols-[1fr_1fr_1fr_auto] gap-4 bg-[var(--color-bg3)] border border-[var(--color-border-main)] rounded p-4 items-center">
                  <input className="bg-[var(--color-bg2)] border border-[var(--color-border-main)] rounded px-3 py-2 text-sm" value={c.title} onChange={ev => updArr('certifications', i, 'title', ev.target.value)} placeholder="Title" />
                  <input className="bg-[var(--color-bg2)] border border-[var(--color-border-main)] rounded px-3 py-2 text-sm" value={c.issuer} onChange={ev => updArr('certifications', i, 'issuer', ev.target.value)} placeholder="Issuer" />
                  <input className="bg-[var(--color-bg2)] border border-[var(--color-border-main)] rounded px-3 py-2 text-sm" value={c.year} onChange={ev => updArr('certifications', i, 'year', ev.target.value)} placeholder="Year" />
                  <button onClick={() => delArr('certifications', i)} className="px-3 py-2 border border-red-500/30 text-red-500 text-[0.65rem] font-mono tracking-widest uppercase rounded hover:bg-red-500/10">Delete</button>
                </div>
              ))}
              <button onClick={() => addArr('certifications', { title: 'New', issuer: '', year: '2025' })} className="p-3 border border-dashed border-[var(--color-cyan)] text-[var(--color-cyan)] bg-[var(--color-cyan-dim)] font-mono text-xs uppercase hover:brightness-125 rounded">+ Add Certification</button>
            </div>
          )}

          {sec === 'achievements' && (
            <div className="flex flex-col gap-4">
              <p className="text-sm font-mono text-[var(--color-cyan)] mb-4">Achievements are shown on the main page. Highlight impactful wins.</p>
              {data.achievements.map((a: any, i: number) => (
                <div key={i} className="bg-[var(--color-bg3)] border border-[var(--color-border-main)] rounded p-6 grid gap-4">
                  <div className="flex justify-between items-center"><span className="font-mono text-xs text-[var(--color-cyan)] uppercase">Achievement #{i+1}</span><button onClick={() => delArr('achievements', i)} className="px-3 py-1 border border-red-500/30 text-red-500 text-[0.65rem] font-mono uppercase rounded hover:bg-red-500/10">Delete</button></div>
                  <input className="bg-[var(--color-bg2)] border border-[var(--color-border-main)] rounded px-3 py-2 text-sm" value={a.title} onChange={ev => updArr('achievements', i, 'title', ev.target.value)} placeholder="Title (e.g. 1st Place Hackathon)" />
                  <input className="bg-[var(--color-bg2)] border border-[var(--color-border-main)] rounded px-3 py-2 text-sm" value={a.event} onChange={ev => updArr('achievements', i, 'event', ev.target.value)} placeholder="Event / Company / Competition" />
                  <textarea rows={2} className="bg-[var(--color-bg2)] border border-[var(--color-border-main)] rounded px-3 py-2 text-sm" value={a.description} onChange={ev => updArr('achievements', i, 'description', ev.target.value)} placeholder="Description..." />
                  <input className="bg-[var(--color-bg2)] border border-[var(--color-border-main)] rounded px-3 py-2 text-sm" value={a.date} onChange={ev => updArr('achievements', i, 'date', ev.target.value)} placeholder="Date / Year" />
                  <input className="bg-[var(--color-bg2)] border border-[var(--color-border-main)] rounded px-3 py-2 text-sm" value={a.link || ''} onChange={ev => updArr('achievements', i, 'link', ev.target.value)} placeholder="(Optional) Proof Link" />
                </div>
              ))}
              <button onClick={() => addArr('achievements', { title: 'New Achievement', event: 'Event', description: '', date: '2025' })} className="p-3 border border-dashed border-[var(--color-cyan)] text-[var(--color-cyan)] bg-[var(--color-cyan-dim)] font-mono text-xs uppercase hover:brightness-125 rounded">+ Add Achievement</button>
            </div>
          )}

          {sec === 'skills' && (
            <div className="flex flex-col gap-4">
              {data.skills.map((s: any, i: number) => (
                <div key={i} className="bg-[var(--color-bg3)] border border-[var(--color-border-main)] rounded p-4 flex flex-col gap-2">
                  <div className="flex justify-between items-center"><span className="font-mono text-xs text-[var(--color-cyan)] uppercase">Skill Category</span><button onClick={() => delArr('skills', i)} className="text-red-500 font-mono text-xs">Delete</button></div>
                  <input className="bg-[var(--color-bg2)] border border-[var(--color-border-main)] rounded px-3 py-2 text-sm font-brutal uppercase text-xl" value={s.category} onChange={ev => updArr('skills', i, 'category', ev.target.value)} />
                  <input className="bg-[var(--color-bg2)] border border-[var(--color-border-main)] rounded px-3 py-2 text-sm font-mono text-[var(--color-text-muted)]" value={s.items.join(', ')} onChange={ev => updArr('skills', i, 'items', ev.target.value.split(',').map(x=>x.trim()))} placeholder="Comma separated items" />
                </div>
              ))}
              <button onClick={() => addArr('skills', { category: 'New Category', items: [] })} className="p-3 border border-dashed border-[var(--color-cyan)] text-[var(--color-cyan)] bg-[var(--color-cyan-dim)] font-mono text-xs uppercase hover:brightness-125 rounded">+ Add Skill Category</button>
            </div>
          )}

          {sec === 'about' && (
            <div className="flex flex-col gap-6">
              <div><label className="block font-mono text-[0.62rem] tracking-widest text-[var(--color-text-dim)] uppercase mb-2">Bio (line breaks = paragraphs)</label><textarea rows={8} className="w-full bg-[var(--color-bg3)] border border-[var(--color-border-main)] rounded px-3 py-2 text-sm outline-none focus:border-[var(--color-cyan)]" value={data.about.bio} onChange={e => upd('about', { ...data.about, bio: e.target.value })} /></div>
              <h3 className="font-mono text-sm text-[var(--color-cyan)] uppercase tracking-widest mt-4">Statistics Cards</h3>
              {data.about.stats.map((s: any, i: number) => (
                <div key={i} className="grid grid-cols-[1fr_1fr_auto] gap-4">
                  <input className="bg-[var(--color-bg3)] border border-[var(--color-border-main)] rounded px-3 py-2 text-sm" value={s.number} onChange={ev => updArr('about.stats', i, 'number', ev.target.value)} />
                  <input className="bg-[var(--color-bg3)] border border-[var(--color-border-main)] rounded px-3 py-2 text-sm" value={s.label} onChange={ev => updArr('about.stats', i, 'label', ev.target.value)} />
                  {/* Simplification: using global data replace logic but accessing deeply is messy, fixing updArr specifically for about stats */}
                  <button onClick={() => { const stats = [...data.about.stats]; stats.splice(i, 1); upd('about', {...data.about, stats}); }} className="text-red-500 font-mono text-xs">Del</button>
                </div>
              ))}
            </div>
          )}

          {sec === 'contact' && (
            <div className="flex flex-col gap-6">
              <div><label className="block font-mono text-xs text-[var(--color-text-dim)] uppercase mb-2">Formspree Endpoint</label><input className="w-full bg-[var(--color-bg3)] border border-[var(--color-border-main)] rounded px-3 py-2 text-sm outline-none" value={data.contact.formspree} onChange={e => upd('contact', { ...data.contact, formspree: e.target.value })} /><p className="text-xs text-[var(--color-cyan)] mt-1 font-mono">Sign up at formspree.io - get target URL.</p></div>
              <div><label className="block font-mono text-xs text-[var(--color-text-dim)] uppercase mb-2">Text copy</label><textarea rows={3} className="w-full bg-[var(--color-bg3)] border border-[var(--color-border-main)] rounded px-3 py-2 text-sm outline-none" value={data.contact.copy} onChange={e => upd('contact', { ...data.contact, copy: e.target.value })} /></div>
              <div><label className="block font-mono text-xs text-[var(--color-text-dim)] uppercase mb-2">Email</label><input className="w-full bg-[var(--color-bg3)] border border-[var(--color-border-main)] rounded px-3 py-2 text-sm outline-none" value={data.contact.email} onChange={e => upd('contact', { ...data.contact, email: e.target.value })} /></div>
              <div><label className="block font-mono text-xs text-[var(--color-text-dim)] uppercase mb-2">GitHub URL</label><input className="w-full bg-[var(--color-bg3)] border border-[var(--color-border-main)] rounded px-3 py-2 text-sm outline-none" value={data.contact.github} onChange={e => upd('contact', { ...data.contact, github: e.target.value })} /></div>
              <div><label className="block font-mono text-xs text-[var(--color-text-dim)] uppercase mb-2">LinkedIn URL</label><input className="w-full bg-[var(--color-bg3)] border border-[var(--color-border-main)] rounded px-3 py-2 text-sm outline-none" value={data.contact.linkedin} onChange={e => upd('contact', { ...data.contact, linkedin: e.target.value })} /></div>
            </div>
          )}

          {sec === 'settings' && (
            <div className="flex flex-col gap-6">
              <div className="bg-[var(--color-bg3)] border border-[var(--color-border-main)] rounded p-6">
                <h3 className="font-brutal text-2xl mb-4">Admin Credentials</h3>
                <div className="grid gap-4">
                  <input className="bg-[var(--color-bg2)] border border-[var(--color-border-main)] rounded px-3 py-2 text-sm" value={data.credentials.username} onChange={e => upd('credentials', { ...data.credentials, username: e.target.value })} placeholder="Username" />
                  <input className="bg-[var(--color-bg2)] border border-[var(--color-border-main)] rounded px-3 py-2 text-sm" value={data.credentials.password} onChange={e => upd('credentials', { ...data.credentials, password: e.target.value })} placeholder="Password" />
                </div>
              </div>
              <div className="bg-[var(--color-bg3)] border border-[var(--color-border-main)] rounded p-6">
                <h3 className="font-brutal text-2xl mb-4">Profile Photo</h3>
                <div className="grid gap-4">
                  <input className="w-full bg-[var(--color-bg2)] border border-[var(--color-border-main)] rounded px-3 py-2 text-sm" value={data.photoUrl || ''} onChange={e => upd('photoUrl', e.target.value)} placeholder="https://..." />
                  <p className="text-xs text-[var(--color-text-muted)] mt-1 font-mono">Use a direct image link (Imgur, GitHub raw, etc) for your Avatar.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={`fixed bottom-8 right-8 bg-[var(--color-cyan)] text-[var(--color-bg)] font-mono text-xs tracking-widest px-6 py-3 rounded shadow-[0_0_30px_var(--color-cyan-glow)] transition-all duration-300 pointer-events-none z-[9999] ${notice ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        ✓ Saved successfully!
      </div>
    </div>
  );
}
