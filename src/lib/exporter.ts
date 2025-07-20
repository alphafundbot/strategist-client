import PDFDocument from 'pdfkit';
import { Readable } from 'stream';

// Generate PDF from a text string
export function generatePDF(text: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const buffers: Buffer[] = [];

    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => resolve(Buffer.concat(buffers)));
    doc.on('error', reject);

    doc.text(text);
    doc.end();
  });
}

// Generate Markdown (pass-through)
export function generateMarkdown(text: string): string {
  return text;
}
