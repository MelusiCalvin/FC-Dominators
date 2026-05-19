import { NextResponse } from 'next/server';
import { listGalleryImages } from '@/lib/gallery';

export async function GET() {
  const images = await listGalleryImages();
  return NextResponse.json({ images });
}
