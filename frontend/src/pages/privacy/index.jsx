import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PrivacyPolicy() {
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
        <div className="border-b-2 border-black pb-8 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4 font-serif tracking-tight">Privacy Policy</h1>
          <p className="text-gray-600 italic">Last Revised: June 24, 2026</p>
          <p className="text-gray-500 uppercase tracking-widest text-xs font-bold mt-2">Official Institutional Document No. 882-PP</p>
        </div>

        {/* Policy Content Canvas */}
        <article className="prose prose-lg prose-headings:font-serif prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-b prose-h2:border-black prose-h2:pb-2 prose-a:text-blue-600 max-w-none text-gray-800 leading-relaxed">
          <section id="introduction">
            <h2>1. Introduction</h2>
            <p className="mb-6">
              Takshashila Public School ("the School," "we," "us," or "our") is committed to protecting the privacy and security of the personal information of our students, parents, faculty, alumni, and staff. This Privacy Policy outlines the types of information we collect, how it is used, and the measures we take to ensure its protection in accordance with academic standards and legal requirements.
            </p>
            <p className="mb-6">
              By accessing our institutional repository, digital library, or administrative portals, you acknowledge the practices described in this document. This policy is governed by the laws of India and adheres to the principles of institutional transparency.
            </p>
          </section>

          <section id="information-collection">
            <h2>2. Information Collection</h2>
            <p className="mb-4">
              We collect information necessary for the provision of academic services and the maintenance of institutional records. This information is categorized as follows:
            </p>
            <ul className="list-disc ml-6 mb-6 space-y-2">
              <li><strong>Directly Provided Information:</strong> Includes names, contact information, academic credentials, and identification numbers provided during admission or employment.</li>
              <li><strong>Academic Records:</strong> Information related to grades, attendance, extracurricular involvement, and disciplinary records.</li>
              <li><strong>Technical Logging:</strong> Automatic collection of IP addresses, browser types, and access timestamps for security and system optimization purposes.</li>
              <li><strong>Financial Data:</strong> Secure processing of school fees, tuition payments, and institutional donations through encrypted channels.</li>
            </ul>
          </section>

          <section id="use-of-information">
            <h2>3. Use of Information</h2>
            <p className="mb-4">
              Collected data is utilized strictly for the following academic and administrative purposes:
            </p>
            <ul className="list-disc ml-6 mb-6 space-y-2">
              <li>Administration of academic programs and student services.</li>
              <li>Facilitation of parent-teacher communication and school announcements.</li>
              <li>Compliance with mandatory reporting requirements to educational governing bodies.</li>
              <li>Enhancing the security of the School's digital and physical infrastructure.</li>
            </ul>
            <p className="mb-6 font-semibold text-black">
              Takshashila Public School does not sell, trade, or lease personal information to third-party commercial entities for marketing purposes.
            </p>
          </section>

          <section id="data-retention">
            <h2>4. Data Retention and Security</h2>
            <p className="mb-6">
              Personal data is retained only for as long as is necessary to fulfill the academic or legal purposes for which it was collected. Archival records are maintained in accordance with the School's Records Retention Schedule.
            </p>
            <p className="mb-6">
              We implement rigorous physical, technical, and administrative safeguards. However, no method of transmission over the internet or electronic storage is 100% secure. Users are responsible for maintaining the confidentiality of their institutional credentials.
            </p>
          </section>

          <section id="rights-access">
            <h2>5. Rights and Access</h2>
            <p className="mb-6">
              Individuals have the right to request access to their personal records, ask for corrections to inaccuracies, or request the deletion of data when it is no longer required for institutional purposes. Requests should be directed to the Administration Office or the Principal's Office.
            </p>
          </section>

          <section className="mt-16 pt-8 border-t border-black" id="contact-details">
            <h2>6. Contact Information</h2>
            <p className="mb-6">
              For inquiries regarding this Privacy Policy or the School's data practices, please contact:
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

          <section className="mt-12 text-gray-500" id="accessibility">
            <p className="text-sm italic">
              This document is available in alternative formats upon request to the School Administration.
            </p>
          </section>
        </article>

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
