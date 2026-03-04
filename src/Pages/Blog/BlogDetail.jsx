import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import useAxios from '../../hooks/useAxios';

const FD = "'Sora', sans-serif";
const FB = "'Plus Jakarta Sans', sans-serif";

const catColors = {
    News: '#134E8E', Guide: '#166534', Story: '#C00707',
    Health: '#6b21a8', Campaign: '#FF4400', Other: '#555',
};

const CATS = ['All', 'News', 'Guide', 'Story', 'Health', 'Campaign', 'Other'];

function BlogCard({ blog }) {
    const color = catColors[blog.category] || '#555';
    const date = blog.createdAt
        ? new Date(blog.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
        : '';

    return (
        <Link
            to={`/blog/${blog._id}`}
            style={{ textDecoration: 'none', display: 'block' }}
        >
            <article style={{
                backgroundColor: 'var(--bg-subtle)',
                border: '1px solid var(--border)',
                borderRadius: 16,
                overflow: 'hidden',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                cursor: 'pointer',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
            }}
                onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.18)';
                }}
                onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                }}
            >
                {/* Image */}
                <div style={{
                    height: 180, backgroundColor: 'var(--bg-muted)',
                    overflow: 'hidden', flexShrink: 0,
                }}>
                    {blog.image ? (
                        <img src={blog.image} alt={blog.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                        <div style={{
                            width: '100%', height: '100%',
                            background: `linear-gradient(135deg, ${color}22, ${color}44)`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 40,
                        }}>🩸</div>
                    )}
                </div>

                {/* Body */}
                <div style={{ padding: '18px 20px 20px', flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {/* Category + date */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                        <span style={{
                            display: 'inline-block', padding: '3px 10px', borderRadius: 8,
                            backgroundColor: color + '20', color,
                            fontFamily: FD, fontWeight: 700, fontSize: 11,
                        }}>
                            {blog.category || 'Other'}
                        </span>
                        {date && (
                            <span style={{ fontFamily: FB, fontSize: 11, color: 'var(--text-faint)' }}>{date}</span>
                        )}
                    </div>

                    {/* Title */}
                    <h3 style={{
                        fontFamily: FD, fontWeight: 700, fontSize: 16,
                        color: 'var(--text-primary)', margin: 0,
                        lineHeight: 1.35,
                        display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                    }}>
                        {blog.title}
                    </h3>

                    {/* Excerpt */}
                    {blog.excerpt && (
                        <p style={{
                            fontFamily: FB, fontSize: 13, color: 'var(--text-muted)',
                            margin: 0, lineHeight: 1.6,
                            display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                        }}>
                            {blog.excerpt}
                        </p>
                    )}

                    {/* Read more */}
                    <div style={{ marginTop: 'auto', paddingTop: 8 }}>
                        <span style={{
                            fontFamily: FB, fontWeight: 600, fontSize: 13, color: '#C00707',
                            display: 'flex', alignItems: 'center', gap: 5,
                        }}>
                            Read more
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M5 12h14 M12 5l7 7-7 7" />
                            </svg>
                        </span>
                    </div>
                </div>
            </article>
        </Link>
    );
}

export default function BlogList() {
    const axiosInstance = useAxios();
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [activeCat, setActiveCat] = useState('All');

    useEffect(() => {
        axiosInstance.get('/blogs')
            .then(res => setBlogs(res.data || []))
            .catch(() => {})
            .finally(() => setLoading(false));
    }, [axiosInstance]);

    const filtered = blogs.filter(b => {
        const matchCat = activeCat === 'All' || b.category === activeCat;
        const matchSearch = !search || b.title?.toLowerCase().includes(search.toLowerCase()) || b.excerpt?.toLowerCase().includes(search.toLowerCase());
        return matchCat && matchSearch;
    });

    return (
        <div style={{ fontFamily: FB, backgroundColor: 'var(--bg-base)', minHeight: '60vh' }}>

            {/* Hero banner */}
            <div style={{
                background: 'linear-gradient(135deg,#7B0000,#C00707 55%,#FF4400)',
                padding: 'clamp(40px,8vw,80px) 24px',
                textAlign: 'center',
            }}>
                <h1 style={{
                    fontFamily: FD, fontWeight: 800, fontSize: 'clamp(26px,5vw,44px)',
                    color: '#fff', margin: '0 0 12px',
                }}>
                    Blood+ Blog
                </h1>
                <p style={{ fontFamily: FB, fontSize: 15, color: 'rgba(255,255,255,0.75)', margin: '0 0 28px' }}>
                    Stories, guides and campaigns from the donor community
                </p>
                {/* Search */}
                <div style={{ maxWidth: 460, margin: '0 auto', position: 'relative' }}>
                    <input
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search articles..."
                        style={{
                            width: '100%', padding: '13px 44px 13px 18px',
                            borderRadius: 12, border: 'none',
                            backgroundColor: 'rgba(255,255,255,0.12)',
                            color: '#fff', fontFamily: FB, fontSize: 14,
                            outline: 'none', backdropFilter: 'blur(6px)',
                            boxSizing: 'border-box',
                        }}
                    />
                    <svg style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', opacity: 0.6 }}
                        width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                    </svg>
                </div>
            </div>

            <div style={{ maxWidth: 1200, margin: '0 auto', padding: '36px 20px' }}>

                {/* Category filter */}
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32 }}>
                    {CATS.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCat(cat)}
                            style={{
                                padding: '7px 16px', borderRadius: 10,
                                border: `1px solid ${activeCat === cat ? '#C00707' : 'var(--border)'}`,
                                backgroundColor: activeCat === cat ? '#C00707' : 'var(--bg-subtle)',
                                color: activeCat === cat ? '#fff' : 'var(--text-muted)',
                                fontFamily: FD, fontWeight: 600, fontSize: 13,
                                cursor: 'pointer', transition: 'all 0.18s',
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                {loading ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 20 }}>
                        {[...Array(6)].map((_, i) => (
                            <div key={i} style={{ height: 340, borderRadius: 16, backgroundColor: 'var(--bg-subtle)', animation: 'pulse 1.5s infinite' }} />
                        ))}
                    </div>
                ) : filtered.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
                        <div style={{ fontSize: 48, marginBottom: 14 }}>📝</div>
                        <div style={{ fontFamily: FD, fontWeight: 700, fontSize: 18, color: 'var(--text-primary)', marginBottom: 8 }}>
                            No articles found
                        </div>
                        <p style={{ fontSize: 14 }}>Try a different search or category.</p>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 20 }}>
                        {filtered.map(b => <BlogCard key={b._id} blog={b} />)}
                    </div>
                )}
            </div>

            <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}`}</style>
        </div>
    );
}