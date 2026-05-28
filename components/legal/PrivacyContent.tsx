import React from 'react';
import { Mail } from 'lucide-react';

const PrivacyContent = () => {
  const currentMonthYear = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(new Date());

  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-[2rem] shadow-xl shadow-slate-200/40 border border-slate-100">
          <div className="max-w-none">
            <p className="text-sm text-slate-500 leading-relaxed mb-4 font-medium">
              We recognize the significance of safeguarding your personal data and appreciate the confidence you place in us. This policy explains our approach to collecting, using, and protecting the information you provide when utilizing our services.
            </p>

            <p className="font-bold text-slate-900 mb-8 text-[11px] uppercase tracking-wider">
              Your use of our platform constitutes acceptance of the privacy practices outlined below.
            </p>

            <div className="space-y-10">
              {[
                {
                  title: 'Data Protection Measures',
                  content: 'Our commitment to data security includes implementing advanced encryption protocols consistent with financial industry standards. We utilize SSL technology to protect the transmission of sensitive information, including financial and personal details. We regularly review and enhance our security infrastructure to maintain the highest level of data protection for our users.'
                },
                {
                  title: 'Restricted Internal Access',
                  content: 'Only designated personnel with proper authorization may access customer information. Every team member with data access privileges must complete comprehensive background screening before receiving clearance. This controlled access framework ensures information is handled exclusively for legitimate business purposes.'
                },
                {
                  title: 'Third-Party Disclosure',
                  content: 'To process your application and deliver our services effectively, we may disclose your information to selected external partners. These may include lending institutions, credit reporting agencies, collection agencies, and marketing service providers. All external parties are contractually obligated to maintain data confidentiality.'
                },
                {
                  title: 'Multi-Lender Network',
                  content: 'Applications submitted through our partner network are distributed to various lending institutions to maximize your approval likelihood. Network participants may reach out to you through email, telephone, or text messaging. You maintain the right to discontinue these communications at any time.'
                },
                {
                  title: 'Communication Authorization',
                  content: 'Providing your telephone number or email constitutes consent to receive electronic correspondence from us. This may include transaction confirmations, promotional content, and account notifications. You retain the right to revoke this consent whenever you choose.'
                },
                {
                  title: 'Information Retention',
                  content: 'Personal data will be maintained for the duration necessary to achieve the purposes described in this policy and to comply with legal and regulatory requirements. Should you wish to request deletion of your information, please reach out using our contact details below.'
                },
                {
                  title: 'Your Privacy Rights',
                  content: 'You maintain the right to review, correct, or request deletion of personal information we hold about you. To exercise these rights or if you have questions regarding your data, please contact us using the information provided below.'
                },
              ].map((section, idx) => (
                <section key={idx}>
                  <div className="mb-4">
                    <h2 className="text-xl font-bold text-slate-900 mb-2">{section.title}</h2>
                    <div 
                      className="w-10 h-1 rounded-full"
                      style={{ background: 'var(--gradient-primary)' }}
                    ></div>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium">
                    {section.content}
                  </p>
                </section>
              ))}
            </div>

            <div className="mt-12 p-6 bg-slate-50 rounded-2xl border-l-4 border-[var(--primary)]">
              <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Mail className="w-4 h-4 text-[var(--primary)]" />
                Reaching Us
              </h3>
              <p className="text-sm text-slate-600 mb-2 font-medium">For questions, concerns, or requests regarding your privacy or this policy, please contact us at:</p>
              <p className="text-sm font-bold text-slate-900">
                Email: <a href="mailto:support@loanhero.ca" className="text-[var(--primary)] hover:text-[var(--accent)] transition-colors">support@loanhero.ca</a>
              </p>
            </div>

            <div className="mt-10 pt-6 border-t border-slate-100 text-center text-slate-400 text-xs font-bold uppercase tracking-widest">
              Last Updated: {currentMonthYear}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyContent;
