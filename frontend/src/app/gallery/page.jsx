'use client';

import { useEffect, useMemo, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

function formatDate(value) {
  try {
    return new Date(value).toLocaleDateString();
  } catch {
    return '';
  }
}

export default function GalleryPage() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('/api/gallery/');
        const data = await response.json();
        setImages(data.images || []);
      } catch (error) {
        console.error('Failed to load gallery images:', error);
      } finally {
        setLoading(false);
        setTimeout(() => setVisible(true), 80);
      }
    };

    fetchImages();
  }, []);

  const gridItems = useMemo(() => images, [images]);

  return (
    <>
      <Header />

      <section className="py-24 bg-fc-dark min-h-screen">
        <div className="container">
          <div className="text-center mb-12">
            <span className="text-fc-orange text-sm font-bold tracking-widest uppercase">Gallery</span>
            <h1 className="section-title mt-4">Team Moments</h1>
            <p className="text-gray-400 max-w-2xl mx-auto mt-4">
              A full visual archive from the <code>images</code> folder with motion and interactive transitions.
            </p>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <p className="text-gray-400">Loading gallery...</p>
            </div>
          ) : gridItems.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400">No images were found in the images folder.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {gridItems.map((image, index) => (
                <button
                  key={image.name}
                  onClick={() => setSelectedImage(image)}
                  className={`group overflow-hidden rounded-xl border border-fc-orange/20 bg-fc-darker text-left transition-all duration-700 ${
                    visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                  } hover:border-fc-orange/70 hover:-translate-y-1 hover:shadow-2xl`}
                  style={{ transitionDelay: `${Math.min(index * 30, 420)}ms` }}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={`/api/gallery/${encodeURIComponent(image.name)}`}
                      alt={image.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
                  </div>
                  <div className="p-4">
                    <p className="text-white font-semibold truncate">{image.name}</p>
                    <p className="text-gray-400 text-sm mt-1">Updated {formatDate(image.updatedAt)}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {selectedImage && (
        <div
          className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="max-w-5xl w-full bg-fc-darker border border-fc-orange/30 rounded-xl overflow-hidden animate-[fadeIn_220ms_ease-out]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative max-h-[75vh] overflow-hidden">
              <img
                src={`/api/gallery/${encodeURIComponent(selectedImage.name)}`}
                alt={selectedImage.name}
                className="w-full h-full object-contain bg-black"
              />
            </div>
            <div className="p-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-white font-semibold">{selectedImage.name}</p>
                <p className="text-gray-400 text-sm">Updated {formatDate(selectedImage.updatedAt)}</p>
              </div>
              <button onClick={() => setSelectedImage(null)} className="btn-secondary">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
