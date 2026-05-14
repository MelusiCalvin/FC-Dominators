'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { testimonialsAPI } from '@/lib/api';
import type { Testimonial } from '@/types';

export default function TestimonialsAdmin() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    quote: '',
  });
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await testimonialsAPI.getAll();
      setTestimonials(res.data.results || res.data);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTestimonial = async () => {
    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value);
    });
    if (image) {
      form.append('image', image);
    }

    try {
      if (editingId) {
        await testimonialsAPI.update(editingId, form);
      } else {
        await testimonialsAPI.create(form);
      }
      fetchTestimonials();
      resetForm();
    } catch (error) {
      console.error('Error saving testimonial:', error);
    }
  };

  const handleDeleteTestimonial = async (id: number) => {
    if (confirm('Are you sure you want to delete this testimonial?')) {
      try {
        await testimonialsAPI.delete(id);
        fetchTestimonials();
      } catch (error) {
        console.error('Error deleting testimonial:', error);
      }
    }
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingId(testimonial.id);
    setFormData({
      name: testimonial.name,
      role: testimonial.role,
      quote: testimonial.quote,
    });
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      name: '',
      role: '',
      quote: '',
    });
    setImage(null);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-white mb-8">Testimonials Management</h1>

      {/* Add/Edit Form */}
      <div className="bg-fc-dark rounded-lg p-6 mb-8 border border-fc-orange/20">
        <h2 className="text-xl font-bold text-white mb-6">{editingId ? 'Edit Testimonial' : 'Add New Testimonial'}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Member Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="bg-fc-darker text-white px-4 py-2 rounded border border-fc-orange/20 focus:border-fc-orange outline-none"
          />
          <input
            type="text"
            placeholder="Role/Title"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="bg-fc-darker text-white px-4 py-2 rounded border border-fc-orange/20 focus:border-fc-orange outline-none"
          />
          <input
            type="file"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className="bg-fc-darker text-white px-4 py-2 rounded border border-fc-orange/20 focus:border-fc-orange outline-none"
            accept="image/*"
          />
          <textarea
            placeholder="Quote/Testimonial"
            value={formData.quote}
            onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
            className="bg-fc-darker text-white px-4 py-2 rounded border border-fc-orange/20 focus:border-fc-orange outline-none col-span-2"
            rows={4}
          />
        </div>
        <div className="flex gap-4 mt-6">
          <button onClick={handleAddTestimonial} className="btn-primary">
            {editingId ? 'Update Testimonial' : 'Add Testimonial'}
          </button>
          {editingId && (
            <button onClick={resetForm} className="btn-secondary">
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : testimonials.length === 0 ? (
          <p className="text-gray-400">No testimonials yet</p>
        ) : (
          testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-fc-dark rounded-lg p-6 border border-fc-orange/20 hover:border-fc-orange transition">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {testimonial.image && (
                    <div className="w-12 h-12 relative rounded-full overflow-hidden">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <p className="text-white font-bold">{testimonial.name}</p>
                    <p className="text-fc-orange text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
              <p className="text-gray-300 italic mb-4">&quot;{testimonial.quote}&quot;</p>
              <div className="flex gap-2 pt-4 border-t border-fc-orange/10">
                <button
                  onClick={() => handleEdit(testimonial)}
                  className="text-fc-orange hover:text-orange-400 transition flex-1 py-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTestimonial(testimonial.id)}
                  className="text-red-500 hover:text-red-400 transition flex-1 py-2"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
