import { useEffect, useState } from 'react';
import useAxios from '../../../hooks/useAxios';

const FONT_DISPLAY = "'Sora', sans-serif";
const FONT_BODY    = "'Plus Jakarta Sans', sans-serif";

const CATEGORIES = ['Awareness', 'Health Tips', 'Donor Stories', 'News'];

const catColors = {
  'Awareness':    { bg:'rgba(255,68,0,0.1)',   color:'#FF4400' },
  'Health Tips':  { bg:'rgba(192,7,7,0.1)',    color:'#C00707' },
  'Donor Stories':{ bg:'rgba(19,78,142,0.1)',  color:'#134E8E' },
  'News':         { bg:'rgba(255,179,63,0.15)',color:'#B07800' },
};

const EMPTY_FORM = { title:'', excerpt:'', content:'', category:'Awareness', tags:'', image:'' };

const DashBlog = () => {
  const axiosInstance = useAxios();
  const [posts, setPosts]         = useState([]);
  const [loading, setLoading]     = useState(true);
  const [showForm, setShowForm]   = useState(false);
  const [editPost, setEditPost]   = useState(null);
  const [form, setForm]           = useState(EMPTY_FORM);
  const [saving, setSaving]       = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const fetchPosts = () => {
    setLoading(true);
    axiosInstance.get('/blogs')
      .then(res => setPosts(Array.isArray(res.data) ? res.data : []))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchPosts(); }, [axiosInstance]);

  const openCreate = () => { setForm(EMPTY_FORM); setEditPost(null); setShowForm(true); };
  const openEdit   = (post) => {
    setForm({ title:post.title||'', excerpt:post.excerpt||'', content:post.content||'', category:post.category||'Awareness', tags:(post.tags||[]).join(', '), image:post.image||'' });
    setEditPost(post);
    setShowForm(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...form,
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
    };
    const req = editPost
      ? axiosInstance.patch(`/blogs/${editPost._id}`, payload)
      : axiosInstance.post('/blogs', payload);

    req.then(() => { fetchPosts(); setShowForm(false); })
       .catch(err => console.log(err))
       .finally(() => setSaving(false));
  };

  const handleDelete = (id) => {
    axiosInstance.delete(`/blogs/${id}`)
      .then(() => { setPosts(p => p.filter(b => b._id !== id)); setConfirmDelete(null); })
      .catch(err => console.log(err));
  };

  const inputStyle = {
    width:'100%', padding:'10px 14px', borderRadius:10, border:'1px solid var(--border)',
    backgroundColor:'var(--bg-base)', color:'var(--text-primary)', fontSize:13,
    fontFamily:FONT_BODY, outline:'none', boxSizing:'border-box',
  };
  const labelStyle = { display:'block', marginBottom:5, fontSize:11, fontWeight:700, color:'var(--text-muted)', fontFamily:FONT_DISPLAY, textTransform:'uppercase', letterSpacing:0.5 };

  return (
    <div style={{ fontFamily:FONT_BODY }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:24, flexWrap:'wrap', gap:12 }}>
        <div>
          <h1 style={{ fontFamily:FONT_DISPLAY, fontWeight:800, fontSize:22, color:'var(--text-primary)', margin:'0 0 4px' }}>Blog Management</h1>
          <p style={{ fontSize:13, color:'var(--text-muted)', margin:0 }}>{posts.length} published articles</p>
        </div>
        <button onClick={openCreate}
          style={{ padding:'10px 20px', borderRadius:12, border:'none', backgroundColor:'#C00707', color:'#fff', fontFamily:FONT_DISPLAY, fontWeight:700, fontSize:13, cursor:'pointer', transition:'background 0.15s' }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor='#A00606'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor='#C00707'}
        >+ New Article</button>
      </div>

      {/* Posts list */}
      {loading ? (
        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
          {[...Array(4)].map((_,i) => (
            <div key={i} style={{ height:80, borderRadius:14, backgroundColor:'var(--bg-subtle)', border:'1px solid var(--border)', animation:'pulse 1.5s infinite' }} />
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div style={{ textAlign:'center', padding:'60px 0', border:'2px dashed var(--border)', borderRadius:16 }}>
          <div style={{ fontSize:48, marginBottom:12 }}>📝</div>
          <p style={{ fontFamily:FONT_DISPLAY, fontWeight:700, fontSize:16, color:'var(--text-muted)', margin:'0 0 8px' }}>No articles yet</p>
          <p style={{ fontSize:13, color:'var(--text-faint)', margin:'0 0 20px' }}>Create your first blog post to share with the community</p>
          <button onClick={openCreate}
            style={{ padding:'10px 24px', borderRadius:12, border:'none', backgroundColor:'#C00707', color:'#fff', fontFamily:FONT_DISPLAY, fontWeight:700, fontSize:13, cursor:'pointer' }}>
            Create First Article
          </button>
        </div>
      ) : (
        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
          {posts.map(post => {
            const c = catColors[post.category] || catColors['Awareness'];
            return (
              <div key={post._id} style={{ backgroundColor:'var(--bg-base)', border:'1px solid var(--border)', borderRadius:14, padding:'16px 20px', display:'flex', gap:16, alignItems:'center', flexWrap:'wrap' }}>
                {post.image && (
                  <img src={post.image} alt={post.title} style={{ width:64, height:48, borderRadius:8, objectFit:'cover', flexShrink:0 }} loading="lazy" />
                )}
                <div style={{ flex:1, minWidth:200 }}>
                  <div style={{ display:'flex', gap:8, alignItems:'center', marginBottom:4, flexWrap:'wrap' }}>
                    <span style={{ fontSize:11, fontWeight:700, padding:'2px 8px', borderRadius:99, backgroundColor:c.bg, color:c.color, fontFamily:FONT_DISPLAY }}>{post.category}</span>
                    <span style={{ fontSize:11, color:'var(--text-faint)', fontFamily:FONT_BODY }}>
                      {post.createdAt ? new Date(post.createdAt).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'}) : ''}
                    </span>
                  </div>
                  <h3 style={{ fontFamily:FONT_DISPLAY, fontWeight:700, fontSize:14, color:'var(--text-primary)', margin:'0 0 3px', lineHeight:1.3 }}>{post.title}</h3>
                  <p style={{ fontSize:12, color:'var(--text-muted)', margin:0, lineHeight:1.4 }}>{post.excerpt?.slice(0,100)}{post.excerpt?.length>100?'...':''}</p>
                </div>
                <div style={{ display:'flex', gap:8, flexShrink:0 }}>
                  <button onClick={() => openEdit(post)}
                    style={{ padding:'7px 14px', borderRadius:9, border:'1px solid var(--border)', backgroundColor:'var(--bg-subtle)', color:'var(--text-muted)', fontSize:12, fontFamily:FONT_DISPLAY, fontWeight:600, cursor:'pointer', transition:'all 0.15s' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor='#134E8E'; e.currentTarget.style.color='#134E8E'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.color='var(--text-muted)'; }}
                  >Edit</button>
                  <button onClick={() => setConfirmDelete(post._id)}
                    style={{ padding:'7px 14px', borderRadius:9, border:'1px solid rgba(192,7,7,0.3)', backgroundColor:'rgba(192,7,7,0.08)', color:'#C00707', fontSize:12, fontFamily:FONT_DISPLAY, fontWeight:600, cursor:'pointer', transition:'all 0.15s' }}
                    onMouseEnter={e => { e.currentTarget.style.backgroundColor='#C00707'; e.currentTarget.style.color='#fff'; }}
                    onMouseLeave={e => { e.currentTarget.style.backgroundColor='rgba(192,7,7,0.08)'; e.currentTarget.style.color='#C00707'; }}
                  >Delete</button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Create/Edit Modal */}
      {showForm && (
        <div style={{ position:'fixed', inset:0, backgroundColor:'rgba(0,0,0,0.6)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:1000, padding:16, overflowY:'auto' }}>
          <div style={{ backgroundColor:'var(--bg-base)', borderRadius:20, padding:32, maxWidth:580, width:'100%', border:'1px solid var(--border)', maxHeight:'90vh', overflowY:'auto' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
              <h2 style={{ fontFamily:FONT_DISPLAY, fontWeight:800, fontSize:18, color:'var(--text-primary)', margin:0 }}>{editPost ? 'Edit Article' : 'New Article'}</h2>
              <button onClick={() => setShowForm(false)} style={{ background:'none', border:'none', fontSize:18, cursor:'pointer', color:'var(--text-faint)' }}>✕</button>
            </div>
            <form onSubmit={handleSave} style={{ display:'flex', flexDirection:'column', gap:16 }}>
              <div>
                <label style={labelStyle}>Title *</label>
                <input required value={form.title} onChange={e => setForm(f=>({...f,title:e.target.value}))} placeholder="Article title" style={inputStyle} onFocus={e=>e.target.style.borderColor='#C00707'} onBlur={e=>e.target.style.borderColor='var(--border)'} />
              </div>
              <div>
                <label style={labelStyle}>Category</label>
                <select value={form.category} onChange={e => setForm(f=>({...f,category:e.target.value}))} style={inputStyle} onFocus={e=>e.target.style.borderColor='#C00707'} onBlur={e=>e.target.style.borderColor='var(--border)'}>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Excerpt</label>
                <textarea value={form.excerpt} onChange={e=>setForm(f=>({...f,excerpt:e.target.value}))} rows={2} placeholder="Short description..." style={{...inputStyle, resize:'vertical'}} onFocus={e=>e.target.style.borderColor='#C00707'} onBlur={e=>e.target.style.borderColor='var(--border)'} />
              </div>
              <div>
                <label style={labelStyle}>Content *</label>
                <textarea required value={form.content} onChange={e=>setForm(f=>({...f,content:e.target.value}))} rows={6} placeholder="Full article content..." style={{...inputStyle, resize:'vertical'}} onFocus={e=>e.target.style.borderColor='#C00707'} onBlur={e=>e.target.style.borderColor='var(--border)'} />
              </div>
              <div>
                <label style={labelStyle}>Image URL</label>
                <input value={form.image} onChange={e=>setForm(f=>({...f,image:e.target.value}))} placeholder="https://..." style={inputStyle} onFocus={e=>e.target.style.borderColor='#C00707'} onBlur={e=>e.target.style.borderColor='var(--border)'} />
              </div>
              <div>
                <label style={labelStyle}>Tags (comma-separated)</label>
                <input value={form.tags} onChange={e=>setForm(f=>({...f,tags:e.target.value}))} placeholder="health, donation, awareness" style={inputStyle} onFocus={e=>e.target.style.borderColor='#C00707'} onBlur={e=>e.target.style.borderColor='var(--border)'} />
              </div>
              <div style={{ display:'flex', gap:10, justifyContent:'flex-end', marginTop:8 }}>
                <button type="button" onClick={()=>setShowForm(false)} style={{ padding:'10px 20px', borderRadius:10, border:'1px solid var(--border)', backgroundColor:'var(--bg-subtle)', color:'var(--text-muted)', fontSize:13, fontFamily:FONT_DISPLAY, cursor:'pointer' }}>Cancel</button>
                <button type="submit" disabled={saving} style={{ padding:'10px 24px', borderRadius:10, border:'none', backgroundColor:'#C00707', color:'#fff', fontSize:13, fontFamily:FONT_DISPLAY, fontWeight:700, cursor:saving?'not-allowed':'pointer', opacity:saving?0.7:1 }}>{saving ? 'Saving...' : editPost ? 'Update' : 'Publish'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {confirmDelete && (
        <div style={{ position:'fixed', inset:0, backgroundColor:'rgba(0,0,0,0.5)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:1000, padding:16 }}>
          <div style={{ backgroundColor:'var(--bg-base)', borderRadius:16, padding:28, maxWidth:360, width:'100%', border:'1px solid var(--border)' }}>
            <h3 style={{ fontFamily:FONT_DISPLAY, fontWeight:700, fontSize:16, color:'var(--text-primary)', margin:'0 0 10px' }}>Delete Article?</h3>
            <p style={{ fontSize:13, color:'var(--text-muted)', margin:'0 0 22px', fontFamily:FONT_BODY }}>This cannot be undone.</p>
            <div style={{ display:'flex', gap:10, justifyContent:'flex-end' }}>
              <button onClick={()=>setConfirmDelete(null)} style={{ padding:'9px 18px', borderRadius:10, border:'1px solid var(--border)', backgroundColor:'var(--bg-subtle)', color:'var(--text-muted)', fontSize:12, fontFamily:FONT_DISPLAY, cursor:'pointer' }}>Cancel</button>
              <button onClick={()=>handleDelete(confirmDelete)} style={{ padding:'9px 18px', borderRadius:10, border:'none', backgroundColor:'#C00707', color:'#fff', fontSize:12, fontFamily:FONT_DISPLAY, fontWeight:700, cursor:'pointer' }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashBlog;