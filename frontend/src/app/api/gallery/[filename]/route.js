import fs from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';
import { getGalleryImagePath } from '@/lib/gallery';

const CONTENT_TYPES = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
};

export async function GET(_request, { params }) {
  const filePath = await getGalleryImagePath(params.filename);

  if (!filePath) {
    return NextResponse.json({ error: 'Image not found' }, { status: 404 });
  }

  const fileBuffer = await fs.readFile(filePath);
  const extension = path.extname(filePath).toLowerCase();
  const contentType = CONTENT_TYPES[extension] || 'application/octet-stream';

  return new NextResponse(fileBuffer, {
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
