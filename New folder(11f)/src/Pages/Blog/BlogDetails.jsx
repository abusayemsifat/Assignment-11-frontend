import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router';
import useAxios from '../../hooks/useAxios';

// ── Skeleton ─────────────────────────────────────────────────────
function SkeletonDetail() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 animate-pulse">
      <div className="h-4 w-24 rounded-full mb-6" style={{ backgroundColor: 'var(--bg-muted)' }} />
      <div className="h-8 w-full rounded-xl mb-3" style={{ backgroundColor: 'var(--bg-muted)' }} />
      <div className="h-8 w-3/4 rounded-xl mb-8" style={{ backgroundColor: 'var(--bg-muted)' }} />
      <div className="h-72 w-full rounded-2xl mb-8" style={{ backgroundColor: 'var(--bg-muted)' }} />
      {[...Array(6)].map((_, i) => (
        <div key={i} className="h-4 w-full rounded-full mb-3" style={{ backgroundColor: 'var(--bg-muted)' }} />
      ))}
    </div>
  );
}

// Same fallback as Blog.jsx
const FALLBACK_POSTS = [
  {
    _id: 'f1',
    title: 'Why Blood Donation is the Most Powerful Act of Kindness',
    content: `Every two seconds, someone in the world needs blood. A single donation can save up to three lives — that is the kind of impact very few other acts of kindness can match.

Blood cannot be manufactured. It can only come from human donors. This means that every bag of blood used in a hospital, every transfusion that saves a crash victim, a cancer patient, or a mother during childbirth, came from someone who chose to give.

**Why donate?**

The need is constant. Hospitals use blood every single day for surgeries, accident victims, patients with chronic illnesses like sickle cell disease or thalassemia, and cancer patients undergoing chemotherapy. In Bangladesh alone, roughly 8 lakh units of blood are needed every year.

**Who benefits?**

- Accident and trauma patients
- Surgery patients
- Cancer patients receiving chemotherapy
- Mothers experiencing complications during childbirth
- Patients with blood disorders like thalassemia and sickle cell disease

**The donation process is simple.**

It takes less than an hour total, and the actual blood collection takes only 8–10 minutes. Your body replenishes the lost blood within 24–48 hours, and you can donate again after 3 months.

Start today. Register on Blood+ and find out how you can make a difference in your own community.`,
    excerpt: 'Every two seconds, someone in the world needs blood. A single donation can save up to three lives.',
    image: 'https://placehold.co/1200x600/C00707/white?text=Blood+Donation',
    author: 'Dr. Rahim Ahmed',
    category: 'Awareness',
    tags: ['donation', 'health', 'community'],
    createdAt: '2025-01-15',
    readTime: '4 min read',
  },
  {
    _id: 'f2',
    title: 'What to Eat Before and After Donating Blood',
    content: `Proper nutrition before and after blood donation helps your body recover faster and ensures the donation process is smooth and safe.

**Before donating:**

Eat a healthy meal 3–4 hours before your appointment. Focus on iron-rich foods:

- Lean red meat, poultry, or fish
- Leafy greens like spinach, kale, or broccoli
- Beans and lentils
- Iron-fortified cereals

Drink plenty of water — at least 16 oz (500ml) in the hours before your donation. Avoid fatty foods the day before, as fat in your blood can make it harder to test for infectious diseases.

**After donating:**

- Drink extra fluids for the next 24–48 hours
- Avoid strenuous exercise for the rest of the day
- Eat iron-rich foods and snacks to help rebuild your red blood cells
- If you feel lightheaded, sit down, put your head between your knees, or lie down

**Foods to avoid:**

- Alcohol for at least 24 hours after donating
- Aspirin or ibuprofen if you plan to donate platelets (wait 48 hours)

Taking care of your body after donation means you will recover quickly and be ready to donate again in 3 months.`,
    excerpt: 'Proper nutrition before and after blood donation helps your body recover faster.',
    image: 'https://placehold.co/1200x600/FF4400/white?text=Health+Tips',
    author: 'Nutritionist Fatima',
    category: 'Health Tips',
    tags: ['nutrition', 'tips', 'recovery'],
    createdAt: '2025-01-22',
    readTime: '5 min read',
  },
  {
    _id: 'f3',
    title: 'A Donor\'s Story: "I Didn\'t Know My Blood Could Save Three Lives"',
    content: `My name is Karim Hossain. I am 32 years old and I live in Dhaka. I have been donating blood regularly for the past six years, and this is my story.

I first donated when I was 26. A colleague at my office needed a rare blood type urgently after an accident, and I happened to match. I had never donated before — I was honestly a bit scared. But seeing my colleague recover, knowing my blood was part of that, changed something in me.

After that I signed up at a donation center and have been donating every 3 months ever since.

**The moment that changed everything**

About two years ago, I got a call from the donation center. They told me that the blood from my last three donations had gone to three different patients — a young mother who lost a lot of blood during childbirth, a teenager who was in a road accident, and an elderly man undergoing surgery for a tumor.

All three survived.

I sat quietly for a long time after that call. Three people. Three families. Three entire futures. All because I gave one hour of my time, three times.

**My message to you**

If you are healthy and able, please donate. It costs you nothing but a little time. For someone else, it could mean everything.

Register on Blood+ today. Your blood is needed.`,
    excerpt: 'Karim Hossain shares his journey of becoming a regular blood donor.',
    image: 'https://placehold.co/1200x600/134E8E/white?text=Donor+Story',
    author: 'Karim Hossain',
    category: 'Donor Stories',
    tags: ['story', 'inspiration', 'community'],
    createdAt: '2025-02-01',
    readTime: '6 min read',
  },
];

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosInstance = useAxios();

  const [post, setPost] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    window.scrollTo(0, 0);

    axiosInstance.get(`/blogs/${id}`)
      .then(res => {
        setPost(res.data);
      })
      .catch(() => {
        // Use fallback if API not ready
        const found = FALLBACK_POSTS.find(p => p._id === id);
        if (found) {
          setPost(found);
        } else {
          navigate('/blog');
        }
      })
      .finally(() => setLoading(false));
  }, [id, axiosInstance, navigate]);

  useEffect(() => {
    if (!post) return;
    // Fetch related posts (same category)
    axiosInstance.get(`/blogs?category=${post.category}&limit=3`)
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : [];
        setRelated(data.filter(p => p._id !== post._id).slice(0, 3));
      })
      .catch(() => {
        const fallbackRelated = FALLBACK_POSTS
          .filter(p => p._id !== post._id && p.category === post.category)
          .slice(0, 3);
        setRelated(fallbackRelated);
      });
  }, [post, axiosInstance]);

  const handleShare = (platform) => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(post?.title || '');
    const links = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter:  `https://twitter.com/intent/tweet?text=${title}&url=${url}`,
      copy: null,
    };
    if (platform === 'copy') {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied!');
    } else {
      window.open(links[platform], '_blank');
    }
  };

  if (loading) return (
    <div style={{ backgroundColor: 'var(--bg-base)', minHeight: '100vh' }}>
      <SkeletonDetail />
    </div>
  );

  if (!post) return null;

  // Render markdown-like content (bold, paragraphs, bullets)
  const renderContent = (text) => {
    return text.split('\n').map((line, i) => {
      if (!line.trim()) return <div key={i} className="h-4" />;

      // Bold text **text**
      const boldified = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

      // Heading lines
      if (line.startsWith('**') && line.endsWith('**') && !line.slice(2, -2).includes('**')) {
        return (
          <h3 key={i} className="font-['Sora'] font-bold text-xl mt-6 mb-2"
              style={{ color: 'var(--text-primary)' }}
              dangerouslySetInnerHTML={{ __html: boldified }} />
        );
      }

      // Bullet points
      if (line.startsWith('- ')) {
        return (
          <li key={i} className="ml-4 text-base leading-relaxed"
              style={{ color: 'var(--text-muted)' }}>
            {line.slice(2)}
          </li>
        );
      }

      return (
        <p key={i} className="text-base leading-relaxed"
           style={{ color: 'var(--text-muted)' }}
           dangerouslySetInnerHTML={{ __html: boldified }} />
      );
    });
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-base)', minHeight: '100vh' }}>

      {/* ── Hero image ───────────────────────────────────────── */}
      <div className="w-full h-72 md:h-96 overflow-hidden">
        <img
          src={post.image || `https://placehold.co/1200x600/C00707/white?text=${encodeURIComponent(post.title)}`}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* ── Article ──────────────────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Back link */}
        <Link to="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold mb-6 transition-colors"
          style={{ color: 'var(--text-muted)' }}
          onMouseEnter={e => e.currentTarget.style.color = '#C00707'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
        >
          ← Back to Blog
        </Link>

        {/* Category + read time */}
        <div className="flex items-center gap-3 mb-4">
          {post.category && (
            <span className="text-xs font-bold px-3 py-1 rounded-full"
                  style={{ backgroundColor: 'rgba(192,7,7,0.1)', color: '#C00707' }}>
              {post.category}
            </span>
          )}
          {post.readTime && (
            <span className="text-xs" style={{ color: 'var(--text-faint)' }}>
              ⏱ {post.readTime}
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="font-['Sora'] font-bold leading-tight mb-6"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', color: 'var(--text-primary)' }}>
          {post.title}
        </h1>

        {/* Author + date */}
        <div className="flex items-center gap-4 pb-6 mb-8"
             style={{ borderBottom: '1px solid var(--border)' }}>
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
               style={{ backgroundColor: '#C00707' }}>
            {(post.author || 'B')[0].toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
              {post.author || 'Blood+ Team'}
            </p>
            <p className="text-xs" style={{ color: 'var(--text-faint)' }}>
              {post.createdAt
                ? new Date(post.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
                : 'Recently'}
            </p>
          </div>

          {/* Share buttons */}
          <div className="ml-auto flex items-center gap-2">
            <span className="text-xs" style={{ color: 'var(--text-faint)' }}>Share:</span>
            {[
              { id: 'facebook', label: 'Facebook', icon: 'f' },
              { id: 'twitter', label: 'Twitter', icon: '𝕏' },
              { id: 'copy', label: 'Copy link', icon: '🔗' },
            ].map(s => (
              <button key={s.id} onClick={() => handleShare(s.id)}
                className="w-8 h-8 rounded-lg text-xs font-bold flex items-center justify-center
                           cursor-pointer transition-all"
                style={{ backgroundColor: 'var(--bg-muted)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}
                title={s.label}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#C00707'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'var(--bg-muted)'; e.currentTarget.style.color = 'var(--text-muted)'; }}
              >
                {s.icon}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-2 mb-10">
          {renderContent(post.content || post.excerpt || '')}
        </div>

        {/* Tags */}
        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-6" style={{ borderTop: '1px solid var(--border)' }}>
            {post.tags.map(tag => (
              <span key={tag} className="text-xs px-3 py-1.5 rounded-full font-medium"
                    style={{ backgroundColor: 'var(--bg-muted)', color: 'var(--text-muted)' }}>
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* CTA banner */}
        <div className="mt-12 p-6 rounded-2xl text-center"
             style={{ background: 'linear-gradient(135deg, #C00707 0%, #FF4400 100%)' }}>
          <p className="font-['Sora'] font-bold text-white text-xl mb-2">
            Ready to make a difference?
          </p>
          <p className="text-red-100 text-sm mb-4">
            Join thousands of donors across Bangladesh
          </p>
          <Link to="/signup"
            className="inline-block px-6 py-2.5 rounded-xl font-bold text-sm transition-all"
            style={{ backgroundColor: '#FFB33F', color: '#111' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#F0A020'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#FFB33F'}
          >
            🩸 Register as a Donor
          </Link>
        </div>
      </div>

      {/* ── Related posts ─────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="py-12" style={{ backgroundColor: 'var(--bg-subtle)', borderTop: '1px solid var(--border)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-['Sora'] font-bold text-2xl mb-8"
                style={{ color: 'var(--text-primary)' }}>
              Related Articles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map(rp => (
                <Link key={rp._id} to={`/blog/${rp._id}`}
                  className="flex gap-4 p-4 rounded-2xl transition-all"
                  style={{ backgroundColor: 'var(--bg-base)', border: '1px solid var(--border)' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = '#C00707'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                >
                  <img
                    src={rp.image || 'https://placehold.co/120x80/C00707/white?text=Blog'}
                    alt={rp.title}
                    className="w-20 h-16 rounded-xl object-cover shrink-0"
                    loading="lazy"
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold font-['Sora'] line-clamp-2 leading-snug"
                       style={{ color: 'var(--text-primary)' }}>
                      {rp.title}
                    </p>
                    <p className="text-xs mt-1" style={{ color: 'var(--text-faint)' }}>
                      {rp.author}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

    </div>
  );
};

export default BlogDetails;