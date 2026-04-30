import { NextResponse } from 'next/server';
import Papa from 'papaparse';

export async function GET() {
  try {
    const csvUrl = process.env.NEXT_PUBLIC_ROADMAP_CSV_URL;
    
    if (!csvUrl) {
      return NextResponse.json({ error: 'CSV URL not configured' }, { status: 500 });
    }

    const res = await fetch(csvUrl);
    if (!res.ok) throw new Error('Failed to fetch CSV');
    
    const csvText = await res.text();
    
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
    
    return NextResponse.json({ milestones });
  } catch (error) {
    console.error('Roadmap API Error:', error);
    return NextResponse.json({ error: 'Failed to load roadmap data' }, { status: 500 });
  }
}
