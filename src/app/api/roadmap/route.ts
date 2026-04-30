import { NextResponse } from 'next/server';
import Papa from 'papaparse';
import { join } from 'path';
import { readFileSync } from 'fs';

// Read CSV URL from cms.json as fallback
let csvUrlFromConfig = '';
try {
  const cmsPath = join(process.cwd(), 'src', 'data', 'cms.json');
  if (require('fs').existsSync(cmsPath)) {
    const cmsData = JSON.parse(readFileSync(cmsPath, 'utf-8'));
    csvUrlFromConfig = cmsData.roadmapCsvUrl || '';
  }
} catch (e) {
  console.log('Could not read CSV URL from cms.json');
}

export async function GET() {
  try {
    // Try environment variable first, then fall back to cms.json
    const csvUrl = process.env.NEXT_PUBLIC_ROADMAP_CSV_URL || process.env.ROADMAP_CSV_URL || csvUrlFromConfig;
    
    if (!csvUrl) {
      console.error('ROADMAP_CSV_URL not configured in .env.local');
      return NextResponse.json({ milestones: [] }, { status: 500 });
    }

    console.log('Fetching CSV from:', csvUrl);
    const res = await fetch(csvUrl, { 
      redirect: 'follow',
      cache: 'no-store'
    });
    
    if (!res.ok) {
      console.error('Failed to fetch CSV:', res.status, res.statusText);
      throw new Error('Failed to fetch CSV');
    }
    
    const csvText = await res.text();
    
    // Check if we got HTML instead of CSV
    if (csvText.trim().toLowerCase().startsWith('<html') || csvText.trim().startsWith('<')) {
      console.error('Got HTML instead of CSV');
      return NextResponse.json({ milestones: [] }, { status: 500 });
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
      .filter((row) => row.id && row.title) // Filter out empty rows
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
    
    console.log('Parsed milestones:', milestones.length);
    return NextResponse.json({ milestones });
  } catch (error) {
    console.error('Roadmap API Error:', error);
    return NextResponse.json({ milestones: [] }, { status: 500 });
  }
}
