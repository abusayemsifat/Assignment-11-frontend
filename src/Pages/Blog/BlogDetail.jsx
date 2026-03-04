import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router';
import useAxios from '../../hooks/useAxios';

const FD = "'Sora', sans-serif";
const FB = "'Plus Jakarta Sans', sans-serif";

const catColors = {
    News: '#134E8E', Guide: '#166534', Story: '#C00707',
    Health: '#6b21a8', Campaign: '#FF4400', Other: '#555',
};

export default function BlogDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const axiosInstance = useAxios();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        axiosInstance.get(`/blogs/${id}`)
            .then(res => setBlog(res.data))
            .catch(() => setNotFound(true))
            .finally(() => setLoading(false));
    }, [axiosInstance, id]);

    if (loading) {
        return (
            <div style={{ maxWidth: 780, margin: '60px auto', padding: '0 20px' }}>
                {[200, 120, 80, 80, 60, 60, 60].map((w, i) => (
                    <div key={i} style={{
                        height: i === 0 ? 36 : 16, width: w + '%',
                        borderRadius: 8, backgroundColor: 'var(--bg-subtle)',
                        marginBottom: 18, animation: 'pulse 1.5s infinite',
                    }} />
                ))}
                <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}`}</style>
            </div>
        );
    }

    if (notFound || !blog) {
        return (
            <div style={{ textAlign: 'center', padding: '80px 24px', fontFamily: FB }}>
                <div style={{ fontSize: 56, marginBottom: 16 }}>📭</div>
                <h2 style={{ fontFamily: FD, fontWeight: 800, fontSize: 24, color: 'var(--text-primary)', marginBottom: 10 }}>
                    Article not found
                </h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: 24, fontSize: 14 }}>
                    This article may have been removed or the link is incorrect.
                </p>
                <Link to="/blog" style={{
                    padding: '11px 24px', borderRadius: 12, textDecoration: 'none',
                    backgroundColor: '#C00707', color: '#fff',
                    fontFamily: FD, fontWeight: 700, fontSize: 14,
                }}>
                    ← Back to Blog
                </Link>
            </div>
        );
    }

    const color = catColors[blog.category] || '#555';
    const date = blog.createdAt
        ? new Date(blog.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
        : '';

    return (
        <div style={{ fontFamily: FB, backgroundColor: 'var(--bg-base)', minHeight: '60vh' }}>

            {/* Hero */}
            <div style={{
                background: `linear-gradient(135deg, ${color}dd, ${color}88)`,
                padding: 'clamp(36px,6vw,64px) 24px',
                position: 'relative', overflow: 'hidden',
            }}>
                <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'radial-gradient(circle at 80% 20%, white 0%, transparent 60%)' }} />
                <div style={{ maxWidth: 780, margin: '0 auto', position: 'relative' }}>
                    {/* Back link */}
                    <Link to="/blog" style={{
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                        fontFamily: FB, fontSize: 13, color: 'rgba(255,255,255,0.8)',
                        textDecoration: 'none', marginBottom: 20,
                    }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M19 12H5 M12 19l-7-7 7-7" />
                        </svg>
                        Back to Blog
                    </Link>

                    {/* Category */}
                    <div style={{ marginBottom: 14 }}>
                        <span style={{
                            display: 'inline-block', padding: '4px 12px', borderRadius: 8,
                            backgroundColor: 'rgba(255,255,255,0.2)', color: '#fff',
                            fontFamily: FD, fontWeight: 700, fontSize: 12,
                        }}>
                            {blog.category || 'Other'}
                        </span>
                    </div>

                    <h1 style={{
                        fontFamily: FD, fontWeight: 800,
                        fontSize: 'clamp(22px,4.5vw,38px)',
                        color: '#fff', margin: '0 0 14px', lineHeight: 1.2,
                    }}>
                        {blog.title}
                    </h1>

                    {date && (
                        <p style={{ fontFamily: FB, fontSize: 13, color: 'rgba(255,255,255,0.65)', margin: 0 }}>
                            Published {date}
                        </p>
                    )}
                </div>
            </div>

            {/* Featured image */}
            {blog.image && (
                <div style={{ maxWidth: 780, margin: '0 auto', padding: '0 20px' }}>
                    <div style={{
                        marginTop: -32, borderRadius: 16, overflow: 'hidden',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                        maxHeight: 400,
                    }}>
                        <img src={blog.image} alt={blog.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    </div>
                </div>
            )}

            {/* Content */}
            <article style={{ maxWidth: 780, margin: '0 auto', padding: '36px 20px 60px' }}>

                {blog.excerpt && (
                    <p style={{
                        fontFamily: FB, fontSize: 16, color: 'var(--text-muted)',
                        lineHeight: 1.7, borderLeft: `3px solid #C00707`,
                        paddingLeft: 18, marginBottom: 28,
                        fontStyle: 'italic',
                    }}>
                        {blog.excerpt}
                    </p>
                )}

                {/* Main content — rendered as formatted text */}
                <div style={{
                    fontFamily: FB, fontSize: 15, color: 'var(--text-primary)',
                    lineHeight: 1.8,
                    whiteSpace: 'pre-wrap',
                }}>
                    {blog.content}
                </div>

                {/* Tags */}
                {blog.tags?.length > 0 && (
                    <div style={{ marginTop: 36, paddingTop: 24, borderTop: '1px solid var(--border)' }}>
                        <div style={{ fontFamily: FD, fontWeight: 700, fontSize: 11, color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>
                            Tags
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                            {blog.tags.map(tag => (
                                <span key={tag} style={{
                                    padding: '4px 12px', borderRadius: 8,
                                    backgroundColor: 'var(--bg-subtle)',
                                    border: '1px solid var(--border)',
                                    fontFamily: FB, fontSize: 12, color: 'var(--text-muted)',
                                }}>
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Back CTA */}
                <div style={{ marginTop: 48, paddingTop: 28, borderTop: '1px solid var(--border)', textAlign: 'center' }}>
                    <Link to="/blog" style={{
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                        padding: '12px 24px', borderRadius: 12, textDecoration: 'none',
                        backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border)',
                        color: 'var(--text-primary)', fontFamily: FD, fontWeight: 700, fontSize: 14,
                    }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M19 12H5 M12 19l-7-7 7-7" />
                        </svg>
                        More Articles
                    </Link>
                </div>
            </article>
        </div>
    );
}