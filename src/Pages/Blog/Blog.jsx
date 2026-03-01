import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import useAxios from '../../hooks/useAxios';

// ── Skeleton card while loading ──────────────────────────────────
function SkeletonCard() {
  return (
    <div className="rounded-2xl overflow-hidden animate-pulse"
         style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
      <div className="h-48 w-full" style={{ backgroundColor: 'var(--bg-muted)' }} />
      <div className="p-5 flex flex-col gap-3">
        <div className="h-3 w-1/3 rounded-full" style={{ backgroundColor: 'var(--bg-muted)' }} />
        <div className="h-5 w-full rounded-full" style={{ backgroundColor: 'var(--bg-muted)' }} />
        <div className="h-4 w-4/5 rounded-full" style={{ backgroundColor: 'var(--bg-muted)' }} />
        <div className="h-4 w-3/5 rounded-full" style={{ backgroundColor: 'var(--bg-muted)' }} />
        <div className="h-9 w-full rounded-xl mt-2" style={{ backgroundColor: 'var(--bg-muted)' }} />
      </div>
    </div>
  );
}

// ── Category badge ───────────────────────────────────────────────
const categoryColors = {
  'Health Tips':    { bg: 'rgba(192,7,7,0.1)',   text: '#C00707' },
  'Awareness':      { bg: 'rgba(255,68,0,0.1)',   text: '#FF4400' },
  'Donor Stories':  { bg: 'rgba(19,78,142,0.1)',  text: '#134E8E' },
  'News':           { bg: 'rgba(255,179,63,0.15)', text: '#B07800' },
  'default':        { bg: 'rgba(100,100,100,0.1)', text: '#666' },
};

function CategoryBadge({ category }) {
  const c = categoryColors[category] || categoryColors['default'];
  return (
    <span className="text-xs font-bold px-2.5 py-1 rounded-full"
          style={{ backgroundColor: c.bg, color: c.text }}>
      {category}
    </span>
  );
}

// ── Blog card ────────────────────────────────────────────────────
function BlogCard({ post }) {
  return (
    <div className="rounded-2xl overflow-hidden flex flex-col h-full transition-all duration-200
                    hover:-translate-y-1"
         style={{ backgroundColor: 'var(--bg-base)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}
         onMouseEnter={e => e.currentTarget.style.boxShadow = 'var(--shadow-md)'}
         onMouseLeave={e => e.currentTarget.style.boxShadow = 'var(--shadow-sm)'}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={post.image || `https://placehold.co/800x400/C00707/white?text=${encodeURIComponent(post.title || 'Blog')}`}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-300"
          loading="lazy"
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        />
        {post.category && (
          <div className="absolute top-3 left-3">
            <CategoryBadge category={post.category} />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 gap-2">
        {/* Meta */}
        <div className="flex items-center gap-3 text-xs" style={{ color: 'var(--text-faint)' }}>
          <span>✍️ {post.author || 'Blood+ Team'}</span>
          <span>•</span>
          <span>📅 {post.createdAt ? new Date(post.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Recently'}</span>
        </div>

        {/* Title */}
        <h3 className="font-['Sora'] font-bold text-base leading-snug line-clamp-2"
            style={{ color: 'var(--text-primary)' }}>
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm leading-relaxed line-clamp-3 flex-1"
           style={{ color: 'var(--text-muted)' }}>
          {post.excerpt || post.content?.slice(0, 120) + '...'}
        </p>

        {/* Tags */}
        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-1">
            {post.tags.slice(0, 3).map(tag => (
              <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                    style={{ backgroundColor: 'var(--bg-muted)', color: 'var(--text-faint)' }}>
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* CTA */}
        <Link
          to={`/blog/${post._id}`}
          className="mt-auto w-full text-center py-2.5 rounded-xl text-sm font-semibold
                     text-white transition-all"
          style={{ backgroundColor: '#C00707' }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#A00606'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = '#C00707'}
        >
          Read More →
        </Link>
      </div>
    </div>
  );
}

// ── Fallback static posts (shown if API has no blog data yet) ────
const FALLBACK_POSTS = [
  {
    _id: 'f1',
    title: 'Why Blood Donation is the Most Powerful Act of Kindness',
    excerpt: 'Every two seconds, someone in the world needs blood. A single donation can save up to three lives. Here is why you should consider becoming a regular donor.',
    image: 'https://placehold.co/800x400/C00707/white?text=Blood+Donation',
    author: 'Dr. Rahim Ahmed',
    category: 'Awareness',
    tags: ['donation', 'health', 'community'],
    createdAt: '2025-01-15',
  },
  {
    _id: 'f2',
    title: 'What to Eat Before and After Donating Blood',
    excerpt: 'Proper nutrition before and after blood donation helps your body recover faster and ensures the donation process is smooth and safe for both you and the recipient.',
    image: 'https://placehold.co/800x400/FF4400/white?text=Health+Tips',
    author: 'Nutritionist Fatima',
    category: 'Health Tips',
    tags: ['nutrition', 'tips', 'recovery'],
    createdAt: '2025-01-22',
  },
  {
    _id: 'f3',
    title: 'A Donor\'s Story: "I Didn\'t Know My Blood Could Save Three Lives"',
    excerpt: 'Karim Hossain from Dhaka shares his journey of becoming a regular blood donor and the emotional moment he learned his donation had saved a child\'s life.',
    image: 'https://placehold.co/800x400/134E8E/white?text=Donor+Story',
    author: 'Karim Hossain',
    category: 'Donor Stories',
    tags: ['story', 'inspiration', 'community'],
    createdAt: '2025-02-01',
  },
  {
    _id: 'f4',
    title: 'Understanding Blood Types: Which Groups Are Most in Demand?',
    excerpt: 'Not all blood types are equally available. O negative is the universal donor and is always in short supply. Learn which blood types Bangladesh needs most.',
    image: 'https://placehold.co/800x400/C00707/white?text=Blood+Types',
    author: 'Blood+ Team',
    category: 'Health Tips',
    tags: ['blood types', 'science', 'O negative'],
    createdAt: '2025-02-10',
  },
  {
    _id: 'f5',
    title: 'Blood+ Reaches 10,000 Registered Donors Across Bangladesh',
    excerpt: 'A major milestone for our platform. Blood+ has now connected over 10,000 donors with patients in need across all 64 districts of Bangladesh.',
    image: 'https://placehold.co/800x400/FFB33F/111?text=Milestone',
    author: 'Blood+ Team',
    category: 'News',
    tags: ['milestone', 'community', 'Bangladesh'],
    createdAt: '2025-02-18',
  },
  {
    _id: 'f6',
    title: 'Myths About Blood Donation — Debunked',
    excerpt: 'Many people avoid donating blood due to common misconceptions. We address the top 7 myths and explain the real facts about the donation process.',
    image: 'https://placehold.co/800x400/FF4400/white?text=Myths+Debunked',
    author: 'Dr. Nusrat Jahan',
    category: 'Awareness',
    tags: ['myths', 'facts', 'education'],
    createdAt: '2025-03-01',
  },
];

const CATEGORIES = ['All', 'Awareness', 'Health Tips', 'Donor Stories', 'News'];
const POSTS_PER_PAGE = 6;

// ── Main Blog page ───────────────────────────────────────────────
const Blog = () => {
  const axiosInstance = useAxios();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    axiosInstance.get('/blogs')
      .then(res => {
        const data = res.data;
        setPosts(Array.isArray(data) && data.length > 0 ? data : FALLBACK_POSTS);
      })
      .catch(() => {
        // API doesn't have /blogs yet — use fallback
        setPosts(FALLBACK_POSTS);
      })
      .finally(() => setLoading(false));
  }, [axiosInstance]);

  // Filter by search + category
  const filtered = posts.filter(p => {
    const matchSearch = search === '' ||
      p.title?.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt?.toLowerCase().includes(search.toLowerCase()) ||
      p.tags?.some(t => t.toLowerCase().includes(search.toLowerCase()));
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    return matchSearch && matchCat;
  });

  // Pagination
  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  // Reset to page 1 on filter change
  useEffect(() => { setPage(1); }, [search, activeCategory]);

  return (
    <div style={{ backgroundColor: 'var(--bg-base)', minHeight: '100vh' }}>

      {/* ── Hero header ───────────────────────────────────────── */}
      <section style={{ background: 'linear-gradient(135deg, #C00707 0%, #FF4400 100%)' }}
               className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase
                           tracking-wider mb-4 bg-white/20 text-white">
            📝 Our Blog
          </span>
          <h1 className="font-['Sora'] font-bold text-4xl md:text-5xl text-white mb-3">
            Stories, Tips & News
          </h1>
          <p className="text-red-100 text-lg max-w-xl mx-auto">
            Everything you need to know about blood donation — from health tips to inspiring donor stories.
          </p>
        </div>
      </section>

      {/* ── Filters ───────────────────────────────────────────── */}
      <section style={{ backgroundColor: 'var(--bg-subtle)', borderBottom: '1px solid var(--border)' }}
               className="sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4
                        flex flex-col sm:flex-row items-stretch sm:items-center gap-3">

          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-base"
                  style={{ color: 'var(--text-faint)' }}>🔍</span>
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none"
              style={{
                backgroundColor: 'var(--bg-base)',
                border: '1px solid var(--border)',
                color: 'var(--text-primary)',
              }}
              onFocus={e => e.target.style.borderColor = '#C00707'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
          </div>

          {/* Category tabs */}
          <div className="flex items-center gap-2 flex-wrap">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-3 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer"
                style={{
                  backgroundColor: activeCategory === cat ? '#C00707' : 'var(--bg-base)',
                  color: activeCategory === cat ? '#fff' : 'var(--text-muted)',
                  border: `1px solid ${activeCategory === cat ? '#C00707' : 'var(--border)'}`,
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Result count */}
          <p className="text-xs shrink-0" style={{ color: 'var(--text-faint)' }}>
            {filtered.length} article{filtered.length !== 1 ? 's' : ''}
          </p>
        </div>
      </section>

      {/* ── Posts grid ────────────────────────────────────────── */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : paginated.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-5xl mb-4">🔍</p>
              <p className="font-['Sora'] font-bold text-xl mb-2" style={{ color: 'var(--text-primary)' }}>
                No articles found
              </p>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                Try a different search term or category
              </p>
              <button
                onClick={() => { setSearch(''); setActiveCategory('All'); }}
                className="mt-4 px-5 py-2 rounded-xl text-sm font-semibold text-white"
                style={{ backgroundColor: '#C00707' }}
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginated.map(post => <BlogCard key={post._id} post={post} />)}
            </div>
          )}

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer
                           disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}
              >
                ← Prev
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className="w-9 h-9 rounded-xl text-sm font-semibold transition-all cursor-pointer"
                  style={{
                    backgroundColor: page === i + 1 ? '#C00707' : 'var(--bg-subtle)',
                    color: page === i + 1 ? '#fff' : 'var(--text-muted)',
                    border: `1px solid ${page === i + 1 ? '#C00707' : 'var(--border)'}`,
                  }}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer
                           disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}
              >
                Next →
              </button>
            </div>
          )}
        </div>
      </section>

    </div>
  );
};

export default Blog;