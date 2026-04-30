import { NextResponse } from 'next/server';
import Papa from 'papaparse';

// Fallback data in case CSV fetch fails
const FALLBACK_MILESTONES = [
  {
    id: '1',
    date: 'Sep 2025 - Oct 2025',
    title: 'Machine Learning Intern',
    category: 'internship',
    description: 'Improved model accuracy via hyperparameter tuning and feature engineering. Applied NLP techniques for text classification and sentiment analysis.',
    status: 'completed' as const,
    tags: ['Machine Learning', 'NLP', 'Python'],
    order: 1,
  },
  {
    id: '2',
    date: '2025',
    title: 'Sankalp 2025 Organizer',
    category: 'career',
    description: 'Organized Sankalp 2025 hackathon at MVGR College of Engineering.',
    status: 'completed' as const,
    tags: ['Hackathon', 'Organizer', 'Leadership'],
    order: 2,
  },
  {
    id: '3',
    date: '2026',
    title: 'AADHRITA 2026 Hack24 Organizer',
    category: 'career',
    description: 'Organizing AADHRITA 2026 Hack24 at MVGR College of Engineering.',
    status: 'in-progress' as const,
    tags: ['Hackathon', 'Organizer', 'Leadership'],
    order: 3,
  },
];

export async function GET() {
  try {
    const csvUrl = process.env.NEXT_PUBLIC_ROADMAP_CSV_URL;
    
    if (!csvUrl) {
      console.log('No CSV URL configured, using fallback data');
      return NextResponse.json({ milestones: FALLBACK_MILESTONES });
    }

    const res = await fetch(csvUrl, { redirect: 'follow' });
    if (!res.ok) throw new Error('Failed to fetch CSV');
    
    const csvText = await res.text();
    
    // Check if we got HTML instead of CSV
    if (csvText.trim().startsWith('<')) {
      console.log('Got HTML instead of CSV, using fallback data');
      return NextResponse.json({ milestones: FALLBACK_MILESTONES });
    }
    
    const parseResult = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (h: string) => h.trim().toLowerCase(),
    });
    
    if (parseResult.errors.length > 0) {
      console.error('CSV Parse errors:', parseResult.errors);
    }
    
    const milestones = (parseResult.data as any[])
      .map((row) => ({
        id: String(row.id || ''),
        date: String(row.date || ''),
        title: String(row.title || ''),
        category: String(row.category || ''),
        description: String(row.description || ''),
        status: String(row.status || 'planned') as 'completed' | 'in-progress' | 'planned',
        tags: String(row.tags || '').split(',').map((t: string) => t.trim()).filter(Boolean),
        order: Number(row.order) || 0,
      }))
      .sort((a, b) => a.order - b.order);
    
    if (milestones.length === 0) {
      console.log('No milestones from CSV, using fallback data');
      return NextResponse.json({ milestones: FALLBACK_MILESTONES });
    }
    
    return NextResponse.json({ milestones });
  } catch (error) {
    console.error('Roadmap API Error:', error);
    console.log('Using fallback data due to error');
    return NextResponse.json({ milestones: FALLBACK_MILESTONES });
  }
}
