import { Link } from 'react-router';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: 'var(--bg-subtle)', borderTop: '1px solid var(--border)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🩸</span>
              <span className="font-['Sora'] font-bold text-xl">
                <span style={{ color: '#C00707' }}>BLOOD</span>
                <span style={{ color: '#134E8E' }}>LINK</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Connecting blood donors with those in need. Every donation saves up to 3 lives.
              Join our mission today.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-['Sora'] font-semibold text-sm mb-4 uppercase tracking-wider"
                style={{ color: 'var(--text-primary)' }}>
              Quick Links
            </h4>
            <ul className="flex flex-col gap-2">
              {[
                { to: '/',             label: 'Home' },
                { to: '/all-requests', label: 'Blood Requests' },
                { to: '/search',       label: 'Find Donors' },
                { to: '/donate',       label: 'Donate Blood' },
                { to: '/blog',         label: 'Blog' },
                { to: '/about',        label: 'About Us' },
                { to: '/contact',      label: 'Contact' },
              ].map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm transition-colors"
                    style={{ color: 'var(--text-muted)' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#C00707'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-['Sora'] font-semibold text-sm mb-4 uppercase tracking-wider"
                style={{ color: 'var(--text-primary)' }}>
              Contact
            </h4>
            <ul className="flex flex-col gap-2 text-sm" style={{ color: 'var(--text-muted)' }}>
              <li>📧 support@bloodlink.com</li>
              <li>📞 +880 1XXX-XXXXXX</li>
              <li>📍 Dhaka, Bangladesh</li>
            </ul>

            {/* Social icons */}
            <div className="flex gap-3 mt-5">
              {[
                {
                  label: 'Twitter',
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                  ),
                },
                {
                  label: 'Facebook',
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                    </svg>
                  ),
                },
                {
                  label: 'YouTube',
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                    </svg>
                  ),
                },
              ].map(s => (
                <a key={s.label} href="#" aria-label={s.label}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                  style={{
                    backgroundColor: 'var(--bg-muted)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-muted)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.backgroundColor = '#C00707';
                    e.currentTarget.style.color = '#fff';
                    e.currentTarget.style.borderColor = '#C00707';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.backgroundColor = 'var(--bg-muted)';
                    e.currentTarget.style.color = 'var(--text-muted)';
                    e.currentTarget.style.borderColor = 'var(--border)';
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
             style={{ borderTop: '1px solid var(--border)' }}>
          <p className="text-sm" style={{ color: 'var(--text-faint)' }}>
            © {new Date().getFullYear()} BloodLink. All rights reserved.
          </p>
          <div className="flex gap-5">
            {[
              { label: 'Privacy Policy', to: '/contact' },
              { label: 'Terms of Service', to: '/about' },
              { label: 'Contact', to: '/contact' },
            ].map(item => (
              <Link key={item.label} to={item.to} className="text-xs transition-colors"
                style={{ color: 'var(--text-faint)' }}
                onMouseEnter={e => e.currentTarget.style.color = '#C00707'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-faint)'}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;