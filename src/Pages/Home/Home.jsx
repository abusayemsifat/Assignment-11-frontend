import { Link } from 'react-router';
import heroimg from '../../assets/Blood-Donation-1.jpg';

// ── Blood group data ──────────────────────────────────────────────
const bloodGroups = [
  { group: 'A+',  color: '#C00707', available: 12 },
  { group: 'A-',  color: '#FF4400', available: 5  },
  { group: 'B+',  color: '#134E8E', available: 18 },
  { group: 'B-',  color: '#FFB33F', available: 3  },
  { group: 'O+',  color: '#C00707', available: 24 },
  { group: 'O-',  color: '#FF4400', available: 7  },
  { group: 'AB+', color: '#134E8E', available: 9  },
  { group: 'AB-', color: '#FFB33F', available: 2  },
];

const steps = [
  { step: '01', icon: '📝', title: 'Register',      desc: 'Create your free account and fill in your blood group and location.' },
  { step: '02', icon: '🔍', title: 'Find or Post',  desc: 'Search for nearby donors or post an urgent blood request.' },
  { step: '03', icon: '🩸', title: 'Save a Life',   desc: 'Connect directly with the donor and coordinate the donation.' },
];

const stats = [
  { value: '10,000+', label: 'Registered Donors',   icon: '👥', color: '#C00707' },
  { value: '3,500+',  label: 'Lives Saved',          icon: '❤️', color: '#FF4400' },
  { value: '64',      label: 'Districts Covered',    icon: '📍', color: '#134E8E' },
  { value: '500+',    label: 'Donations This Month', icon: '🩸', color: '#FFB33F' },
];

const testimonials = [
  { name: 'Fatima Khanam',  location: 'Dhaka',      text: 'Blood+ connected me with a donor within 2 hours. My son is alive because of this platform.', avatar: '👩' },
  { name: 'Rahim Uddin',    location: 'Chittagong', text: 'I donate every 3 months. Blood+ makes it easy to find people who truly need help.', avatar: '👨' },
  { name: 'Nusrat Jahan',   location: 'Sylhet',     text: 'After my accident, the hospital needed O- urgently. Got a donor in under an hour!', avatar: '👩' },
];

const faqs = [
  { q: 'Who can donate blood?',              a: 'Anyone aged 18-65 in good health, weighing at least 50kg, can donate blood every 3 months.' },
  { q: 'Is blood donation safe?',            a: 'Yes. All equipment is sterile and single-use. You cannot contract any disease by donating.' },
  { q: 'How long does donation take?',       a: 'The actual donation takes 8-10 minutes. With registration and rest, expect about 45-60 minutes total.' },
  { q: 'Can I donate after vaccination?',    a: 'Yes, you can donate 48 hours after most vaccines. COVID-19 vaccine requires a 14-day wait.' },
];

const Home = () => {
  return (
    <div style={{ backgroundColor: 'var(--bg-base)' }}>

      {/* ── 1. HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ minHeight: '65vh' }}>
        <div className="absolute inset-0">
          <img src={heroimg} alt="Blood Donation" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.75) 40%, rgba(0,0,0,0.2))' }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center"
             style={{ minHeight: '65vh' }}>
          <div className="max-w-xl">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4"
                  style={{ backgroundColor: '#C00707', color: '#fff' }}>
              🩸 Save Lives Today
            </span>
            <h1 className="font-['Sora'] font-bold text-white mb-4 leading-tight"
                style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
              Every Drop Counts.<br />
              <span style={{ color: '#FFB33F' }}>Be a Hero.</span>
            </h1>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Bangladesh's largest blood donation network. Connect with donors, post urgent requests, and save lives — all in one place.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/signup"
                className="px-6 py-3 rounded-xl font-semibold text-white transition-all"
                style={{ backgroundColor: '#C00707' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#A00606'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#C00707'}
              >
                Join as a Donor
              </Link>
              <Link to="/search"
                className="px-6 py-3 rounded-xl font-semibold transition-all"
                style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.25)'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)'}
              >
                Search Donors
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. STATS ─────────────────────────────────────────────── */}
      <section style={{ backgroundColor: '#C00707' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map(s => (
              <div key={s.label} className="text-center text-white">
                <div className="text-3xl mb-1">{s.icon}</div>
                <p className="font-['Sora'] font-bold text-3xl">{s.value}</p>
                <p className="text-red-200 text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. HOW IT WORKS ──────────────────────────────────────── */}
      <section className="py-20" style={{ backgroundColor: 'var(--bg-subtle)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-['Sora'] font-bold text-3xl md:text-4xl mb-3"
                style={{ color: 'var(--text-primary)' }}>
              How It Works
            </h2>
            <p style={{ color: 'var(--text-muted)' }}>Three simple steps to save a life</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <div key={i} className="text-center p-8 rounded-2xl relative"
                   style={{ backgroundColor: 'var(--bg-base)', border: '1px solid var(--border)' }}>
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full
                                  flex items-center justify-center text-xs font-bold text-white font-['Sora']"
                      style={{ backgroundColor: '#C00707' }}>
                  {s.step}
                </span>
                <div className="text-5xl mb-4 mt-2">{s.icon}</div>
                <h3 className="font-['Sora'] font-bold text-lg mb-2" style={{ color: 'var(--text-primary)' }}>
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. BLOOD GROUP AVAILABILITY ──────────────────────────── */}
      <section className="py-20" style={{ backgroundColor: 'var(--bg-base)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-['Sora'] font-bold text-3xl md:text-4xl mb-3"
                style={{ color: 'var(--text-primary)' }}>
              Blood Group Availability
            </h2>
            <p style={{ color: 'var(--text-muted)' }}>Live donor counts across Bangladesh</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {bloodGroups.map(bg => (
              <Link to={`/search?blood=${bg.group}`} key={bg.group}
                className="p-6 rounded-2xl text-center transition-all hover:-translate-y-1"
                style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border)' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = bg.color}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
              >
                <p className="font-['Sora'] font-black text-4xl mb-1" style={{ color: bg.color }}>
                  {bg.group}
                </p>
                <p className="text-xs font-semibold" style={{ color: 'var(--text-faint)' }}>
                  {bg.available} donors
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. FEATURED REQUESTS ─────────────────────────────────── */}
      <section className="py-20" style={{ backgroundColor: 'var(--bg-subtle)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="font-['Sora'] font-bold text-3xl md:text-4xl"
                  style={{ color: 'var(--text-primary)' }}>
                Urgent Requests
              </h2>
              <p className="mt-1" style={{ color: 'var(--text-muted)' }}>People who need blood right now</p>
            </div>
            <Link to="/all-requests"
              className="text-sm font-semibold px-4 py-2 rounded-xl transition-all hidden sm:block"
              style={{ color: '#C00707', border: '1px solid #C00707' }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#C00707'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#C00707'; }}
            >
              View All →
            </Link>
          </div>
          {/* Placeholder cards — replace with real API data */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Karim Hossain',  blood: 'O-',  location: 'Dhaka Medical',   urgency: 'Critical', time: '2 hours ago' },
              { name: 'Sumaiya Akter',  blood: 'AB+', location: 'Chittagong CMH',  urgency: 'Urgent',   time: '5 hours ago' },
              { name: 'Rashed Ahmed',   blood: 'B+',  location: 'Sylhet MAG',       urgency: 'Normal',   time: '1 day ago'   },
            ].map((req, i) => (
              <div key={i} className="rounded-2xl p-5 flex flex-col gap-3"
                   style={{ backgroundColor: 'var(--bg-base)', border: '1px solid var(--border)' }}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold font-['Sora']" style={{ color: 'var(--text-primary)' }}>{req.name}</p>
                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>📍 {req.location}</p>
                  </div>
                  <span className="text-xl font-black font-['Sora']" style={{ color: '#C00707' }}>{req.blood}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs px-2.5 py-1 rounded-full font-semibold"
                        style={{
                          backgroundColor: req.urgency === 'Critical' ? 'rgba(192,7,7,0.1)' : req.urgency === 'Urgent' ? 'rgba(255,68,0,0.1)' : 'rgba(19,78,142,0.1)',
                          color: req.urgency === 'Critical' ? '#C00707' : req.urgency === 'Urgent' ? '#FF4400' : '#134E8E',
                        }}>
                    {req.urgency}
                  </span>
                  <span className="text-xs" style={{ color: 'var(--text-faint)' }}>{req.time}</span>
                </div>
                <Link to="/all-requests"
                  className="w-full text-center py-2 rounded-xl text-sm font-semibold text-white transition-all"
                  style={{ backgroundColor: '#C00707' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#A00606'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = '#C00707'}
                >
                  Respond
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. TESTIMONIALS ──────────────────────────────────────── */}
      <section className="py-20" style={{ backgroundColor: 'var(--bg-base)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-['Sora'] font-bold text-3xl md:text-4xl mb-3"
                style={{ color: 'var(--text-primary)' }}>
              Real Stories
            </h2>
            <p style={{ color: 'var(--text-muted)' }}>Lives changed by our community</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="p-6 rounded-2xl"
                   style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
                <p className="text-4xl mb-1" style={{ color: '#C00707' }}>"</p>
                <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-muted)' }}>{t.text}</p>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{t.avatar}</span>
                  <div>
                    <p className="text-sm font-semibold font-['Sora']" style={{ color: 'var(--text-primary)' }}>{t.name}</p>
                    <p className="text-xs" style={{ color: 'var(--text-faint)' }}>📍 {t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. FAQ ───────────────────────────────────────────────── */}
      <section className="py-20" style={{ backgroundColor: 'var(--bg-subtle)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-['Sora'] font-bold text-3xl md:text-4xl mb-3"
                style={{ color: 'var(--text-primary)' }}>
              Frequently Asked
            </h2>
            <p style={{ color: 'var(--text-muted)' }}>Everything you need to know about donating blood</p>
          </div>
          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <div key={i} className="p-5 rounded-2xl"
                   style={{ backgroundColor: 'var(--bg-base)', border: '1px solid var(--border)' }}>
                <p className="font-semibold font-['Sora'] mb-2" style={{ color: 'var(--text-primary)' }}>
                  {faq.q}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. NEWSLETTER / CTA ──────────────────────────────────── */}
      <section className="py-20" style={{ background: 'linear-gradient(135deg, #C00707 0%, #FF4400 100%)' }}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-['Sora'] font-bold text-3xl md:text-4xl text-white mb-3">
            Ready to Save Lives?
          </h2>
          <p className="text-red-100 mb-8 text-lg">
            Join 10,000+ donors across Bangladesh. Register free and be someone's hero today.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/signup"
              className="px-8 py-3.5 rounded-xl font-bold text-base transition-all"
              style={{ backgroundColor: '#FFB33F', color: '#111' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#F0A020'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#FFB33F'}
            >
              🩸 Become a Donor
            </Link>
            <Link to="/all-requests"
              className="px-8 py-3.5 rounded-xl font-bold text-base transition-all text-white"
              style={{ border: '2px solid rgba(255,255,255,0.5)' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              View Urgent Requests
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;