import { NextResponse } from 'next/server';
import { join } from 'path';
import { existsSync, readFileSync } from 'fs';

export async function GET() {
  const filePath = join(process.cwd(), 'public', 'Praneeth_Varma_Kopperla_Resume.pdf');
  
  if (!existsSync(filePath)) {
    return new NextResponse('Resume file not found', { status: 404 });
  }

  const fileBuffer = readFileSync(filePath);
  
  return new NextResponse(fileBuffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="Praneeth_Varma_Kopperla_Resume.pdf"',
      'Content-Length': fileBuffer.length.toString(),
    },
  });
}
