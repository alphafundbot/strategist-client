import { NextResponse } from 'next/server';
import { generatePDF, generateMarkdown } from '@/lib/exporter';
import { Readable } from 'stream';

export async function POST(req: Request) {
  const { format, content, fileName } = await req.json();

  let data: Buffer | string;
  let type: string;

  if (format === 'pdf') {
    data = await generatePDF(content);
    type = 'application/pdf';
  } else {
    data = generateMarkdown(content);
    type = 'text/markdown';
  }

  return new NextResponse(data as any, {
    headers: {
      'Content-Type': type,
      'Content-Disposition': `attachment; filename="${fileName}.${format}"`,
    },
  });
}
