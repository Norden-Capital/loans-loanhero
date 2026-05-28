import React from 'react';

// Premium Inline SVGs
const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
);
const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
);
const MapIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
);

const ContactInfo = () => {
  const infoCards = [
    {
      icon: PhoneIcon,
      title: 'Call Us',
      desc: 'Our team is available 24/7 to answer your questions.',
      linkText: '1-888-LOANHERO',
      href: 'tel:1-888-LOANHERO',
    },
    {
      icon: MailIcon,
      title: 'Email Us',
      desc: 'Send us an email and we\'ll respond within 24 hours.',
      linkText: 'support@loanhero.ca',
      href: 'mailto:support@loanhero.ca',
    },
    {
      icon: MapIcon,
      title: 'Our Locations',
      desc: 'Licensed across multiple provinces.',
      extra: 'Ontario • BC • Alberta',
    },
  ];

  return (
    <div className="grid gap-4">
      {infoCards.map((card, i) => (
        <div 
          key={i} 
          className="group bg-white p-5 rounded-2xl shadow-xl shadow-slate-200/20 transition-all duration-300 hover:scale-[1.01] hover:border-[var(--primary)]/20 border border-slate-100"
        >
          <div className="flex items-center gap-5">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-indigo-500/10"
              style={{ background: 'var(--gradient-primary)' }}
            >
              <card.icon />
            </div>
            <div className="flex-1">
              <div className="mb-2">
                <h3 className="text-base font-medium text-slate-900 mb-1 tracking-tight">{card.title}</h3>
                <div 
                  className="w-6 h-0.5 rounded-full opacity-50"
                  style={{ background: 'var(--gradient-primary)' }}
                ></div>
              </div>
              <p className="text-slate-500 text-[11px] leading-relaxed mb-3 font-medium">{card.desc}</p>
              {card.href ? (
                <a 
                  href={card.href} 
                  className="text-[var(--primary)] font-semibold text-xs hover:text-[var(--accent)] transition-colors tracking-wide"
                >
                  {card.linkText}
                </a>
              ) : (
                <p className="font-semibold text-slate-900 text-[10px] uppercase tracking-widest">{card.extra}</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactInfo;
