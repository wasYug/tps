import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function TermsOfUse() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white text-black font-sans antialiased flex flex-col">
      <div className="print:hidden">
        <Navbar theme="light" />
      </div>

      <main className="flex-grow mx-auto w-full max-w-4xl px-6 md:px-12 py-16 md:py-24 mt-16 md:mt-24">
        {/* Document Header */}
        <header className="border-b-2 border-black pb-8 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4 font-serif tracking-tight uppercase">Terms of Use</h1>
          <p className="text-gray-600 italic text-lg opacity-80">Governing your digital engagement with the Takshashila academic ecosystem.</p>
          <p className="text-sm mt-6 font-semibold">Effective Date: October 2026</p>
        </header>

        <div className="space-y-12">
          {/* Introductory Text */}
          <section>
            <p className="italic border-l-4 border-black pl-6 mb-6 text-lg text-gray-800">
              Welcome to the official digital platform of Takshashila Public School. These Terms of Use establish a formal agreement between the institution and our community members. Our goal is to provide a safe, respectful, and high-quality educational resource for all.
            </p>
          </section>

          {/* Notice Box */}
          <div className="border-2 border-black p-6 mb-12 font-bold text-center text-lg bg-gray-50">
            By using this website, you agree to comply with these Terms of Use.
          </div>

          {/* Document Sections */}
          <article className="prose prose-lg prose-headings:font-serif prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-b prose-h2:border-black prose-h2:pb-2 prose-a:text-blue-600 max-w-none text-gray-800 leading-relaxed">
            <section>
              <h2 className="uppercase">1. Acceptance of Terms</h2>
              <p>
                By accessing or using the Takshashila Public School website, you acknowledge that you have read, understood, and agree to be bound by these Terms of Use and our Privacy Policy. If you do not agree, please refrain from using our services.
              </p>
            </section>

            <section>
              <h2 className="uppercase">2. Use of Website Content</h2>
              <p>
                All educational materials, faculty publications, and campus news are provided for personal, non-commercial use. Any reproduction, distribution, or transformation of content without prior written institutional consent is strictly prohibited.
              </p>
            </section>

            <section>
              <h2 className="uppercase">3. Student, Parent and Visitor Responsibilities</h2>
              <p>
                Users must maintain academic integrity in digital interactions. You are responsible for ensuring that any information provided via portals or contact forms is accurate and does not violate the school's code of conduct.
              </p>
            </section>

            <section>
              <h2 className="uppercase">4. Intellectual Property Rights</h2>
              <p>
                The Takshashila crest, brand name, and all proprietary visual assets are trademarks of Takshashila Public School. Unauthorized use of these assets constitutes a violation of institutional intellectual property rights.
              </p>
            </section>

            <section>
              <h2 className="uppercase">5. External Links</h2>
              <p>
                Our platform may contain links to third-party educational tools or partner institutions. Takshashila Public School does not endorse or assume liability for the content or practices of these external sites.
              </p>
            </section>

            <section>
              <h2 className="uppercase">6. Privacy and Data Protection</h2>
              <p>
                We prioritize the protection of student and faculty data. All personal information collected through our portals is processed in accordance with our data protection policies and applicable educational privacy laws.
              </p>
            </section>

            <section>
              <h2 className="uppercase">7. Website Availability and Changes</h2>
              <p>
                We strive for 100% uptime, but technical maintenance may occasionally disrupt service. We reserve the right to modify content or terminate portal access to improve service delivery.
              </p>
            </section>

            <section>
              <h2 className="uppercase">8. Limitation of Liability</h2>
              <p>
                Takshashila Public School shall not be held liable for any damages arising from the use or inability to use our digital resources, including but not limited to information inaccuracies or service interruptions.
              </p>
            </section>

            <section className="border-t border-black pt-12 mt-12">
              <h2 className="uppercase">9. Contact Information</h2>
              <p className="mb-6">
                For legal inquiries regarding these terms, please contact the Administration Office or the Digital Policy Oversight committee.
              </p>
              <div className="mt-6 p-8 border border-gray-300 bg-gray-50 rounded-xl shadow-sm max-w-2xl">
                <p className="font-bold mb-2 text-xl text-black">Administration Office</p>
                <p className="mb-1 text-black font-medium">Takshashila Public School</p>
                <p className="mb-1">Bijlipura, Anta</p>
                <p className="mb-1">Shahjahanpur, Uttar Pradesh 242001</p>
                <div className="mt-6 space-y-2">
                  <p className="flex items-center gap-2">
                    <strong className="text-black">Email:</strong> 
                    <a className="text-blue-600 hover:underline hover:text-blue-800 transition-colors" href="mailto:tps_spn@rediffmail.com">tps_spn@rediffmail.com</a>
                  </p>
                  <p className="flex items-center gap-2">
                    <strong className="text-black">Phone:</strong> 
                    <span>05842-224555, +91 93350 06888</span>
                  </p>
                </div>
              </div>
            </section>
          </article>
        </div>

        {/* Print Action */}
        <div className="mt-16 text-center print:hidden border-t border-gray-200 pt-12">
          <button 
            className="px-8 py-3.5 border-2 border-black text-black font-bold uppercase tracking-widest text-sm hover:bg-black hover:text-white transition-all duration-300 cursor-pointer rounded-sm" 
            onClick={() => window.print()}
          >
            Print Document
          </button>
        </div>
      </main>

      <div className="print:hidden mt-auto">
        <Footer />
      </div>
      
      {/* Print styling injected globally just for this page */}
      <style>{`
        @media print {
          @page { margin: 2cm; }
          body { background: white !important; color: black !important; }
        }
      `}</style>
    </div>
  );
}
