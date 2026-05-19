import fs from 'fs/promises';
import path from 'path';

const ALLOWED_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif']);

async function isDirectory(targetPath) {
  try {
    const stats = await fs.stat(targetPath);
    return stats.isDirectory();
  } catch {
    return false;
  }
}

export async function resolveGalleryDirectory() {
  const candidates = [
    path.join(process.cwd(), 'images'),
    path.join(process.cwd(), '..', 'images'),
  ];

  for (const candidate of candidates) {
    if (await isDirectory(candidate)) {
      return candidate;
    }
  }

  return null;
}

export async function listGalleryImages() {
  const galleryDirectory = await resolveGalleryDirectory();
  if (!galleryDirectory) {
    return [];
  }

  const entries = await fs.readdir(galleryDirectory, { withFileTypes: true });
  const images = [];

  for (const entry of entries) {
    if (!entry.isFile()) {
      continue;
    }

    const extension = path.extname(entry.name).toLowerCase();
    if (!ALLOWED_EXTENSIONS.has(extension)) {
      continue;
    }

    const filePath = path.join(galleryDirectory, entry.name);
    const stats = await fs.stat(filePath);

    images.push({
      name: entry.name,
      size: stats.size,
      updatedAt: stats.mtime.toISOString(),
    });
  }

  images.sort((a, b) => a.name.localeCompare(b.name));
  return images;
}

export async function getGalleryImagePath(filename) {
  const galleryDirectory = await resolveGalleryDirectory();
  if (!galleryDirectory) {
    return null;
  }

  const safeName = path.basename(filename);
  const extension = path.extname(safeName).toLowerCase();
  if (!ALLOWED_EXTENSIONS.has(extension)) {
    return null;
  }

  const fullPath = path.join(galleryDirectory, safeName);

  try {
    const stats = await fs.stat(fullPath);
    if (!stats.isFile()) {
      return null;
    }
    return fullPath;
  } catch {
    return null;
  }
}
