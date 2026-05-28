import React from 'react';
import { Gavel } from 'lucide-react';

const TermsContent = () => {
  const currentMonthYear = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(new Date());

  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-[2rem] shadow-xl shadow-slate-200/40 border border-slate-100">
          <div className="max-w-none">
            <p className="text-sm text-slate-500 leading-relaxed mb-4 font-medium">
              These Terms of Use govern your access to and use of LoanHero Canada&apos;s services and website. By utilizing our platform, you agree to comply with and be bound by these terms.
            </p>

            <p className="font-bold text-slate-900 mb-8 text-[11px] uppercase tracking-wider">
              Please read these terms carefully before proceeding with your application.
            </p>

            <div className="space-y-10">
              {[
                {
                  title: 'Jurisdiction Notice',
                  content: 'All financial transactions conducted through this platform are considered to occur at our principal place of business, irrespective of the user\'s geographic location.'
                },
                {
                  title: 'Short-Term Funding',
                  content: 'Our micro loans are designed to address immediate, short-term financial needs. Customers must fully repay their existing loan before qualifying for additional funding.'
                },
                {
                  title: 'Definitions',
                  content: 'Throughout these Terms, references to "Customer," "you," or "your" identify the individual applying for our services. "Company," "we," or "our" refer to LoanHero Canada.'
                },
                {
                  title: 'Agreement to Terms',
                  content: 'By authorizing automated withdrawals for loan repayment, you acknowledge acceptance of these Terms. These Terms were made accessible to you through multiple channels before finalizing your transaction.'
                },
                {
                  title: 'Electronic Authorization',
                  content: 'You consent to our use of electronic methods to collect amounts owed. This includes our right to re-submit collection attempts if initial efforts are unsuccessful, plus any applicable returned payment fees.'
                },
                {
                  title: 'Dispute Resolution',
                  content: 'You agree to resolve any disputes with us on an individual basis and waive participation in class action litigation. This provision does not limit your right to pursue individual legal remedies.'
                },
                {
                  title: 'Electronic Records',
                  content: 'Digital communications, online forms, and scanned documents hold the same legal weight as original paper documents. Your acceptance may be demonstrated through various electronic methods.'
                },
                {
                  title: 'Verification & Certification',
                  content: 'By submitting your application, you certify that all information is accurate. You authorize us to verify your details through consumer reporting agencies and other verification methods.'
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
                <Gavel className="w-4 h-4 text-[var(--primary)]" />
                Legal Commitment
              </h3>
              <p className="text-sm text-slate-600 mb-2 font-medium">By using our services, you confirm that you have read and understood these terms in their entirety.</p>
              <p className="text-sm font-bold text-slate-900 uppercase tracking-widest">
                LoanHero Canada
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

export default TermsContent;
