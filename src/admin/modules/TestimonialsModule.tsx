import React, { useState } from 'react';
import { LedMasthead } from '../components/LedMasthead';
import { AdminDialog } from '../components/primitives/AdminDialog';
import { loadAdminStore, saveAdminStore, addRevisionCommit } from '../store/adminStore';
import { TestimonialItem } from '../types/admin-types';
import { Plus, Star, Eye, EyeOff } from 'lucide-react';

export const TestimonialsModule: React.FC = () => {
  const [store, setStore] = useState(() => loadAdminStore());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [quote, setQuote] = useState('');
  const [rating, setRating] = useState(5);

  const handleAddTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !quote.trim()) return;

    const newTestimonial: TestimonialItem = {
      id: `test-${Date.now()}`,
      name,
      role,
      company,
      quote,
      rating,
      isVisible: true,
      createdAt: new Date().toISOString(),
    };

    store.testimonials.unshift(newTestimonial);

    addRevisionCommit(
      store,
      'testimonial',
      newTestimonial.id,
      `Added client testimonial from ${newTestimonial.name}`,
      {},
      newTestimonial as unknown as Record<string, unknown>
    );

    saveAdminStore(store);
    setStore({ ...store });

    setIsModalOpen(false);
    setName('');
    setRole('');
    setCompany('');
    setQuote('');
  };

  const toggleVisibility = (id: string) => {
    store.testimonials = store.testimonials.map((t) => (t.id === id ? { ...t, isVisible: !t.isVisible } : t));
    saveAdminStore(store);
    setStore({ ...store });
  };

  return (
    <div className="max-w-5xl">
      <LedMasthead
        title="Testimonials & Endorsements CMS"
        subtitle="Manage client recommendations, ratings, and public visibility across portfolio themes"
        status="active"
      />

      <div className="flex items-center justify-between mb-8">
        <h2 className="font-mono text-base font-bold text-[#1a1a1a]">Testimonials ({store.testimonials.length})</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#10b981] text-white font-mono font-bold text-xs px-4 py-2.5 rounded-lg hover:bg-[#0d9668] transition-colors flex items-center gap-2"
        >
          <Plus size={16} /> Add Testimonial
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {store.testimonials.map((item) => (
          <div key={item.id} className="bg-[#f4f4f3] border border-[#dcdcdc] rounded-xl p-5 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1 text-amber-500">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                <button
                  onClick={() => toggleVisibility(item.id)}
                  className={`text-xs font-mono px-2 py-0.5 rounded flex items-center gap-1 ${
                    item.isVisible ? 'bg-green-100 text-green-800' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {item.isVisible ? <Eye size={12} /> : <EyeOff size={12} />}
                  <span>{item.isVisible ? 'Visible' : 'Hidden'}</span>
                </button>
              </div>

              <p className="text-sm font-sans italic text-[#1a1a1a] mb-4">"{item.quote}"</p>
            </div>

            <div className="pt-3 border-t border-[#dcdcdc] font-mono text-xs">
              <div className="font-bold text-[#1a1a1a]">{item.name}</div>
              <div className="text-[#666]">{item.role} @ {item.company}</div>
            </div>
          </div>
        ))}
      </div>

      <AdminDialog isOpen={isModalOpen} onOpenChange={setIsModalOpen} title="New Testimonial" description="Add an endorsement quote to showcase in portfolio layouts.">
        <form onSubmit={handleAddTestimonial} className="space-y-4 font-mono text-xs">
          <div>
            <label className="block uppercase font-bold text-[#666] mb-1">Author Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Sarah Jenkins"
              className="w-full bg-[#eaeaea] border border-[#dcdcdc] rounded-lg px-3 py-2 text-sm text-[#1a1a1a]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block uppercase font-bold text-[#666] mb-1">Role Title</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="VP of Engineering"
                className="w-full bg-[#eaeaea] border border-[#dcdcdc] rounded-lg px-3 py-2 text-sm text-[#1a1a1a]"
              />
            </div>
            <div>
              <label className="block uppercase font-bold text-[#666] mb-1">Company</label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Finverse Labs"
                className="w-full bg-[#eaeaea] border border-[#dcdcdc] rounded-lg px-3 py-2 text-sm text-[#1a1a1a]"
              />
            </div>
          </div>

          <div>
            <label className="block uppercase font-bold text-[#666] mb-1">Endorsement Quote</label>
            <textarea
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              rows={3}
              placeholder="Prajwal delivered exceptional results..."
              className="w-full bg-[#eaeaea] border border-[#dcdcdc] rounded-lg p-3 text-sm font-sans text-[#1a1a1a]"
            />
          </div>

          <div>
            <label className="block uppercase font-bold text-[#666] mb-1">Rating (1 to 5 Stars)</label>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full bg-[#eaeaea] border border-[#dcdcdc] rounded-lg px-3 py-2 text-sm text-[#1a1a1a]"
            >
              <option value={5}>5 Stars (Outstanding)</option>
              <option value={4}>4 Stars (Great)</option>
              <option value={3}>3 Stars (Good)</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-[#10b981] text-white font-bold text-sm py-2.5 rounded-lg hover:bg-[#0d9668] transition-colors"
          >
            Save Testimonial & Log Revision
          </button>
        </form>
      </AdminDialog>
    </div>
  );
};
