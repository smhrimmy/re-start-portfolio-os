import React from 'react';
import { BlogPost } from '@/types/portfolio';
import { Clock, Tag } from 'lucide-react';

interface BlogSectionProps {
  posts: BlogPost[];
}

export const BlogSection: React.FC<BlogSectionProps> = ({ posts }) => {
  const publishedPosts = posts.filter((p) => p.status === 'published');

  if (publishedPosts.length === 0) return null;

  return (
    <section id="writing" className="blog-section quiet-entrance relative z-10 py-24 px-6 sm:px-12">
      <div className="max-w-6xl mx-auto space-y-12">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#0066FF] block mb-2 font-sans-satoshi">
            04 // JOURNAL & ARTICLES
          </span>
          <h2 className="section-title text-4xl sm:text-6xl font-serif-instrument font-bold text-[#1A1A1A]">
            Latest Writing
          </h2>
        </div>

        <div className="blog-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {publishedPosts.slice(0, 6).map((post) => (
            <article key={post.id} className="blog-card glass-card p-6 rounded-2xl flex flex-col justify-between space-y-4 cursor-pointer">
              <div className="space-y-3">
                {post.coverImage && (
                  <div className="aspect-video rounded-xl overflow-hidden bg-[#EBE8E3]">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                )}
                <h3 className="text-xl font-serif-instrument font-bold text-[#1A1A1A] line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-[#5C5C5C] line-clamp-3 font-sans-satoshi leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-black/5 text-xs text-[#A0A0A0] font-sans-satoshi">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#0066FF]" /> {post.readingTimeMinutes || 5} min read
                </span>
                {post.tags && post.tags.length > 0 && (
                  <span className="flex items-center gap-1 text-[#0066FF] font-medium">
                    <Tag className="w-3 h-3" /> #{post.tags[0]}
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
