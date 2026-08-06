import React from 'react';
import './faculty.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
export default function FacultyPage() {
  return (
    <div className="bg-white text-neutral-950 antialiased overflow-x-hidden faculty-page-theme">
      {/* BEGIN: MainHeader */}
      <Navbar theme='light'/>
      {/* END: MainHeader */}
      {/* BEGIN: HeroSection */}
      <section className="relative bg-surface border-b border-outline-variant/30 overflow-hidden pt-32 md:pt-40 pb-16">
        {/* Gradient Backgrounds */}
        <div className="bg-[radial-gradient(ellipse_at_top_right,oklch(0.45_0.16_255/.12),transparent_55%)] absolute inset-0"></div>
        <div className="bg-[radial-gradient(ellipse_at_bottom_left,oklch(0.6_0.22_25/.1),transparent_50%)] absolute inset-0"></div>
        <div className="relative flex flex-col md:flex-row p-6 md:p-12 items-center gap-8 md:gap-12">
          <div className="flex flex-col flex-1 gap-6 order-2 md:order-1">
            {/* Section Badge */}
            <div className="font-semibold rounded-full bg-white text-neutral-950 text-[10px] md:text-xs leading-4 tracking-[4px] border border-neutral-200 px-4 py-1.5 flex items-center gap-2 w-fit shadow-sm">
              <span className="size-2 bg-[oklch(0.6_0.22_25)] rounded-full"></span>
              OUR LEADERSHIP
            </div>
            {/* Hero Title */}
            <h1 className="text-[oklch(0.45_0.16_255)] italic font-serif text-4xl md:text-5xl leading-tight tracking-tight">
              Meet Our <span className="text-[oklch(0.6_0.22_25)]">Mentors</span>
            </h1>
            <p className="max-w-xl text-neutral-600 text-sm md:text-base leading-relaxed">
              Guided by resolute excellence and a spirit of service, our faculty members are mentors, researchers and pioneers shaping the future of Takshashila.
            </p>
            {/* Stats Grid */}
            <div className="flex mt-2 items-center gap-4 md:gap-8 overflow-x-auto pb-2 scrollbar-hide">
              <div className="flex flex-col min-w-max">
                <span className="text-[oklch(0.45_0.16_255)] font-extrabold text-2xl md:text-3xl leading-9">120+</span>
                <span className="text-neutral-500 text-[10px] md:text-xs leading-4">Faculty Members</span>
              </div>
              <div className="bg-neutral-200 w-px h-12 shrink-0"></div>
              <div className="flex flex-col min-w-max">
                <span className="text-[oklch(0.45_0.16_255)] font-extrabold text-2xl md:text-3xl leading-9">25</span>
                <span className="text-neutral-500 text-[10px] md:text-xs leading-4">Years of Legacy</span>
              </div>
              <div className="bg-neutral-200 w-px h-12 shrink-0"></div>
              <div className="flex flex-col min-w-max">
                <span className="text-[oklch(0.6_0.22_25)] font-extrabold text-2xl md:text-3xl leading-9">A+</span>
                <span className="text-neutral-500 text-[10px] md:text-xs leading-4">Accreditation</span>
              </div>
            </div>
          </div>
          {/* Hero Image */}
          <div className="relative shrink-0 ring-1 ring-neutral-200 rounded-3xl w-full max-w-[280px] sm:max-w-[320px] aspect-square mx-auto md:mx-0 overflow-hidden order-1 md:order-2 group">
            <img alt="Shri Tyagi Ji Maharaj" className="object-cover w-full h-full object-top transition-transform duration-700 group-hover:scale-105" src="\tyagi_ji_maharaj.png" />
            <div className="bg-[linear-gradient(to_top,oklch(0.145_0_0/.7),transparent_55%)] absolute inset-0"></div>
            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 text-center">
              <span className="font-serif text-white font-bold text-xl md:text-2xl drop-shadow-md">
                Shri Tyagi Ji Maharaj
              </span>
            </div>
          </div>
        </div>
      </section>
      {/* END: HeroSection */}
      {/* BEGIN: AdministrationGrid */}
      {/* BEGIN: AdministrationGrid */}
      <section className="bg-surface-container-low p-6 md:p-12 lg:p-16 relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="flex mb-12 items-center gap-4 relative z-10">
          <span className="bg-primary w-12 h-1 rounded-full"></span>
          <span className="font-bold text-primary text-xs md:text-sm leading-4 tracking-widest uppercase">
            School Administration
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {/* Director 1 */}
          <div className="text-center glass-card border border-outline-variant/30 rounded-3xl p-6 flex flex-col items-center gap-4 hover:-translate-y-2 transition-transform duration-300">
            <div className="size-32 sm:size-40 border-4 border-secondary/20 rounded-full overflow-hidden p-1 bg-gradient-to-br from-secondary/10 to-transparent">
              <img alt="Director" className="object-cover w-full h-full rounded-full object-top" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvdN0aPnfns0QZ4gNOm_srLPvcQt3JiOzSpwD7bcW928wEaDHKZaBOlzAt7QqiNcQDLjFT7UhqRnyFzgS73ZjXIDEO-im24DGBI0494dgDNHXZomf7dERP53QpZj5_I-JixMN2HSkB5Gl1PgGSM5ityP5fdW12VXrsW8OL-mD6OsKhErrcaCgSwJRFbfgsooNQxv8MBFBWnM43BIEQg70sFUHrc3iPuaIb44akTjYh8p-A6ZPVTBm0gVgy8EciIHV3is5nIJHuzKmq" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-headline-sm text-on-surface text-base md:text-lg">Mr. Rohan Kapoor</span>
              <span className="text-secondary font-label-md text-sm md:text-base">Director</span>
            </div>
          </div>
          
          {/* Director 2 */}
          <div className="text-center glass-card border border-outline-variant/30 rounded-3xl p-6 flex flex-col items-center gap-4 hover:-translate-y-2 transition-transform duration-300">
            <div className="size-32 sm:size-40 border-4 border-secondary/20 rounded-full overflow-hidden p-1 bg-gradient-to-br from-secondary/10 to-transparent">
              <img alt="Director" className="object-cover w-full h-full rounded-full object-top" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBiDOrXUg5DxqKC6oS7pgrpmiCOg0dHIDpKyN62G4ITFYiJ_NfqnIIVsJ2_QVYaydo1FwyPTaBQkPkqJJNCIAdDwtRl2-PEIFITWe3DycYsZVbC6iBn85iYeQiXfYYdZH4MdCBxOMMlmlLLok-LPC0YyIp0H1aJfQHlIIWRUYXuVKwrRBQZml-fPykhwKxm4MlKeR-BEvZSWpTziJnTWRYhNuhvtR1BxtEPeXtfWsHll-YQ1vMxsWKzFtdRpyx3SB7A-OYrBbs-wrMt" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-headline-sm text-on-surface text-base md:text-lg">Mrs. Anjali Mehra</span>
              <span className="text-secondary font-label-md text-sm md:text-base">Director</span>
            </div>
          </div>
          
          {/* Manager */}
          <div className="text-center glass-card border border-outline-variant/30 rounded-3xl p-6 flex flex-col items-center gap-4 hover:-translate-y-2 transition-transform duration-300">
            <div className="size-32 sm:size-40 border-4 border-tertiary/20 rounded-full overflow-hidden p-1 bg-gradient-to-br from-tertiary/10 to-transparent">
              <img alt="Manager" className="object-cover w-full h-full rounded-full object-top" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3vrHff_QIJUQSR6XnQAzLRbRW4gL1oGvpuh58Qe3l8lL_A0SyC9ZqUXMz_4COa9Yx1x7lLAbac1O9d3F27YQvjgo3aayYwwDJM_vz51H5QCtbEddQUKOMxDxVIVJx7vadhqX2tg-8ktXqpdeKvsdO-5Cl1nEU-UN9IZ6u_p-t4cONKdRjrGeXcj84ww2YR1PLy2yukuSN-F360ezbOT4XMpo4ou_phUxxOANT1Lh134kcCvJs0xJvwE9vkcJMguf0SaJ8cO2lK9xK" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-headline-sm text-on-surface text-base md:text-lg">Mr. Sanjay Iyer</span>
              <span className="text-primary font-label-md text-sm md:text-base">Manager</span>
            </div>
          </div>

          {/* Principal 1 */}
          <div className="text-center glass-card border border-outline-variant/30 rounded-3xl p-6 flex flex-col items-center gap-4 hover:-translate-y-2 transition-transform duration-300">
            <div className="size-32 sm:size-40 border-4 border-primary/20 rounded-full overflow-hidden p-1 bg-gradient-to-br from-primary/10 to-transparent">
              <img alt="Principal" className="object-cover w-full h-full rounded-full object-top" src="/prakhar_khandelwal.jpeg" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-headline-sm text-on-surface text-base md:text-lg">Mr. Prakhar Khandewal</span>
              <span className="text-primary font-label-md text-sm md:text-base">Principal</span>
            </div>
          </div>

          {/* Principal 2 */}
          <div className="text-center glass-card border border-outline-variant/30 rounded-3xl p-6 flex flex-col items-center gap-4 hover:-translate-y-2 transition-transform duration-300">
            <div className="size-32 sm:size-40 border-4 border-primary/20 rounded-full overflow-hidden p-1 bg-gradient-to-br from-primary/10 to-transparent">
              <img alt="Principal" className="object-cover w-full h-full rounded-full object-top" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQslp_fOr8t2_uUdaZJxmI-6s33upsAPLlEHr5zMlbvRQi_b5MwTsCDBtV87ape2mzws94NmsSW6xuotbuYl_bX2t1K4PNwyo9oVLd59gGudRl4IQWfBmwtDAKGuP5DlQZX9kszNfSLK58J2F9nTqG7Vibg73XzH50W43BQxiJsjb1aLBRgWmSFtOwMyK-pDEOUVslNs2RwgMgHoiGnU4N5E4Xr-4GPVHlqmbNKMG0bCdhSjgyDrSt3BZFFrfACFNzmn441a7Ml-Gg" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-headline-sm text-on-surface text-base md:text-lg">[Second Principal Name]</span>
              <span className="text-primary font-label-md text-sm md:text-base">Principal</span>
            </div>
          </div>

          {/* Vice Principal */}
          <div className="text-center glass-card border border-outline-variant/30 rounded-3xl p-6 flex flex-col items-center gap-4 hover:-translate-y-2 transition-transform duration-300">
            <div className="size-32 sm:size-40 border-4 border-primary/20 rounded-full overflow-hidden p-1 bg-gradient-to-br from-primary/10 to-transparent">
              <img alt="Vice Principal" className="object-cover w-full h-full rounded-full object-top" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcrVUoKDLVTlOPI2Bu12VTYplfTiGnAR4LjPsUmL6Rh9OC6TfO50wvIjQ3YSItPrCXjNJAW8Bu0dQceaxAuIXB_H7aKmd_9YI9emH6lrxqriLgXqoNZUtj26grVVZLZ8SaSc4N5k9QCL3UOrwx-9OW7ME1Myh_xyohZnhXsv8twfcZt7psPCIpDbyEQpS9KOOVDoe6d0I-WBHqGqpDe6ZFrWYXCaAaK2cN7Skd2klGhO-h5Xitl7fOMCUgmx594cmMDn_yAbzGwO19" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-headline-sm text-on-surface text-base md:text-lg">[Vice Principal Name]</span>
              <span className="text-primary font-label-md text-sm md:text-base">Vice Principal</span>
            </div>
          </div>
        </div>
      </section>
      {/* END: AdministrationGrid */}
      
      {/* BEGIN: HODGrid */}
      <section className="bg-surface p-6 md:p-12 lg:p-16 relative border-t border-outline-variant/30">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-tertiary/5 rounded-full blur-3xl"></div>
        <div className="flex mb-12 items-center gap-4 relative z-10">
          <span className="bg-error w-12 h-1 rounded-full"></span>
          <span className="font-bold text-error text-xs md:text-sm leading-4 tracking-widest uppercase">
            Heads of Departments
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
          {/* HOD 1 */}
          <div className="text-center glass-card border border-outline-variant/30 rounded-3xl p-6 flex flex-col items-center gap-4 hover:-translate-y-2 transition-transform duration-300">
            <div className="size-32 sm:size-40 border-4 border-tertiary/20 rounded-full overflow-hidden p-1 bg-gradient-to-br from-tertiary/10 to-transparent">
              <img alt="HOD Science" className="object-cover w-full h-full rounded-full object-top" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQslp_fOr8t2_uUdaZJxmI-6s33upsAPLlEHr5zMlbvRQi_b5MwTsCDBtV87ape2mzws94NmsSW6xuotbuYl_bX2t1K4PNwyo9oVLd59gGudRl4IQWfBmwtDAKGuP5DlQZX9kszNfSLK58J2F9nTqG7Vibg73XzH50W43BQxiJsjb1aLBRgWmSFtOwMyK-pDEOUVslNs2RwgMgHoiGnU4N5E4Xr-4GPVHlqmbNKMG0bCdhSjgyDrSt3BZFFrfACFNzmn441a7Ml-Gg" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-headline-sm text-on-surface text-base md:text-lg">[HOD Name]</span>
              <span className="text-error font-label-md text-sm md:text-base">HOD Science</span>
            </div>
          </div>
          
          {/* HOD 2 */}
          <div className="text-center glass-card border border-outline-variant/30 rounded-3xl p-6 flex flex-col items-center gap-4 hover:-translate-y-2 transition-transform duration-300">
            <div className="size-32 sm:size-40 border-4 border-tertiary/20 rounded-full overflow-hidden p-1 bg-gradient-to-br from-tertiary/10 to-transparent">
              <img alt="HOD Mathematics" className="object-cover w-full h-full rounded-full object-top" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBiDOrXUg5DxqKC6oS7pgrpmiCOg0dHIDpKyN62G4ITFYiJ_NfqnIIVsJ2_QVYaydo1FwyPTaBQkPkqJJNCIAdDwtRl2-PEIFITWe3DycYsZVbC6iBn85iYeQiXfYYdZH4MdCBxOMMlmlLLok-LPC0YyIp0H1aJfQHlIIWRUYXuVKwrRBQZml-fPykhwKxm4MlKeR-BEvZSWpTziJnTWRYhNuhvtR1BxtEPeXtfWsHll-YQ1vMxsWKzFtdRpyx3SB7A-OYrBbs-wrMt" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-headline-sm text-on-surface text-base md:text-lg">[HOD Name]</span>
              <span className="text-error font-label-md text-sm md:text-base">HOD Mathematics</span>
            </div>
          </div>

          {/* HOD 3 */}
          <div className="text-center glass-card border border-outline-variant/30 rounded-3xl p-6 flex flex-col items-center gap-4 hover:-translate-y-2 transition-transform duration-300">
            <div className="size-32 sm:size-40 border-4 border-tertiary/20 rounded-full overflow-hidden p-1 bg-gradient-to-br from-tertiary/10 to-transparent">
              <img alt="HOD English" className="object-cover w-full h-full rounded-full object-top" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcrVUoKDLVTlOPI2Bu12VTYplfTiGnAR4LjPsUmL6Rh9OC6TfO50wvIjQ3YSItPrCXjNJAW8Bu0dQceaxAuIXB_H7aKmd_9YI9emH6lrxqriLgXqoNZUtj26grVVZLZ8SaSc4N5k9QCL3UOrwx-9OW7ME1Myh_xyohZnhXsv8twfcZt7psPCIpDbyEQpS9KOOVDoe6d0I-WBHqGqpDe6ZFrWYXCaAaK2cN7Skd2klGhO-h5Xitl7fOMCUgmx594cmMDn_yAbzGwO19" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-headline-sm text-on-surface text-base md:text-lg">[HOD Name]</span>
              <span className="text-error font-label-md text-sm md:text-base">HOD English</span>
            </div>
          </div>

          {/* HOD 4 */}
          <div className="text-center glass-card border border-outline-variant/30 rounded-3xl p-6 flex flex-col items-center gap-4 hover:-translate-y-2 transition-transform duration-300">
            <div className="size-32 sm:size-40 border-4 border-tertiary/20 rounded-full overflow-hidden p-1 bg-gradient-to-br from-tertiary/10 to-transparent">
              <img alt="HOD Commerce" className="object-cover w-full h-full rounded-full object-top" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3vrHff_QIJUQSR6XnQAzLRbRW4gL1oGvpuh58Qe3l8lL_A0SyC9ZqUXMz_4COa9Yx1x7lLAbac1O9d3F27YQvjgo3aayYwwDJM_vz51H5QCtbEddQUKOMxDxVIVJx7vadhqX2tg-8ktXqpdeKvsdO-5Cl1nEU-UN9IZ6u_p-t4cONKdRjrGeXcj84ww2YR1PLy2yukuSN-F360ezbOT4XMpo4ou_phUxxOANT1Lh134kcCvJs0xJvwE9vkcJMguf0SaJ8cO2lK9xK" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-headline-sm text-on-surface text-base md:text-lg">[HOD Name]</span>
              <span className="text-error font-label-md text-sm md:text-base">HOD Commerce</span>
            </div>
          </div>
        </div>
      </section>
      {/* END: HODGrid */}
      {/* BEGIN: AcademicExcellence */}
      <section className="bg-surface relative border-y border-outline-variant/30 p-6 md:p-12 lg:p-16 overflow-hidden">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="flex mb-4 items-center gap-4 relative z-10">
          <span className="bg-secondary w-12 h-1 rounded-full"></span>
          <span className="font-bold text-secondary text-xs md:text-sm leading-4 tracking-widest uppercase">
            Academic Excellence
          </span>
        </div>
        <h2 className="font-headline-lg text-on-surface mb-12 relative z-10">
          Class Co-ordinators
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {/* Pre-Primary */}
          <div className="glass-card border border-outline-variant/30 rounded-3xl p-5 md:p-6 flex items-center gap-4 md:gap-5 hover:-translate-y-1 transition-transform duration-300">
            <div className="size-16 md:size-20 shrink-0 rounded-2xl overflow-hidden shadow-sm">
              <img alt="Mrs. Priya Nair" className="object-cover w-full h-full object-top" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzWkOqu34NBKSOEGwir9YuFLVrdYkQWlYLP36iyCKBMBEfOQfl758sam-BeoN9qRI8WxkjJ_cXZmlgxnbbZn7ILtKB7RqSR0PYB05Oh2N2CjwXoqYuTMcEf5yOggDmi4-kVmgglV_m4thAiTDdJ6fGu8jx6x6WferRfLxQzZ01wmfmUZwzR0SW7sLOigWwRB_5vHBn9JVAZelFg_wBBohJHVNiCedtdeIYDqUCZDmt6adYKthPEf5ptyXVM9Fmm4k8wquWTQef55Sm" />
            </div>
            <div className="flex flex-col flex-1 gap-1">
              <span className="font-label-sm text-on-surface-variant tracking-wider">CO-ORDINATOR</span>
              <span className="font-headline-sm text-on-surface text-lg">Mrs. Priya Nair</span>
              <span className="text-on-surface-variant font-body-sm">Nursery to Kindergarten</span>
              <span className="bg-primary/10 text-primary font-label-sm rounded-lg mt-2 px-3 py-1 w-fit">Pre-Primary</span>
            </div>
          </div>
          {/* Primary */}
          <div className="glass-card border border-outline-variant/30 rounded-3xl p-5 md:p-6 flex items-center gap-4 md:gap-5 hover:-translate-y-1 transition-transform duration-300">
            <div className="size-16 md:size-20 shrink-0 rounded-2xl overflow-hidden shadow-sm">
              <img alt="Mrs. Meera Iyer" className="object-cover w-full h-full object-top" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLYrrYA3sUfwczbCt8J3GPXpblREWg-HyMmvvDpnAzNLqmxJeTpyFpymfnZN6j6YkNa5qaWd2Tba6DOFDQYhviIuJq_RW1cYfR4gaiZqmndNmLoMKJpyfsSlv09txv2G1o63x6Ht3ijWBA_FTXln9DsnIwMdtTZf8qp8SpvKMn24E3u9AF_-CbT86qrRAVVCNWSCJFPJQLMU4CP6S1hkbIRdNR_bXBBQXkNybZdh7zk7UOqemK9rzWZHLho558sJ-brlM_Leq9sRXm" />
            </div>
            <div className="flex flex-col flex-1 gap-1">
              <span className="font-label-sm text-on-surface-variant tracking-wider">CO-ORDINATOR</span>
              <span className="font-headline-sm text-on-surface text-lg">Mrs. Meera Iyer</span>
              <span className="text-on-surface-variant font-body-sm">Classes 1 – 3</span>
              <span className="bg-secondary/10 text-secondary font-label-sm rounded-lg mt-2 px-3 py-1 w-fit">Primary</span>
            </div>
          </div>
          {/* Upper Primary */}
          <div className="glass-card border border-outline-variant/30 rounded-3xl p-5 md:p-6 flex items-center gap-4 md:gap-5 hover:-translate-y-1 transition-transform duration-300">
            <div className="size-16 md:size-20 shrink-0 rounded-2xl overflow-hidden shadow-sm">
              <img alt="Mrs. Kavita Rao" className="object-cover w-full h-full object-top" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvvzv77ukCpJcClcuO8oBcY75_fRSu5cZfHU8r0zl51tV2yDch07UEAfGwBWhkAF3ad3UbTY7USEjrzQrwHLozU37zPJzbwgO_11X1ri_mYg1QTeIRiBth6TslHkccW_st1TNwt9DU8wHTUXolDmfmRWGWcEdT3VKg6dXWXHJ7LcpJlSRS-MBOnvhjJKlzIwYUn_zDHRV3IF9C94crN4XrtB_nuPIL05RzIfFATZWVadQyH2Kg0RVvtCAuC-xnpBCjB0YSWlL9GdJ7" />
            </div>
            <div className="flex flex-col flex-1 gap-1">
              <span className="font-label-sm text-on-surface-variant tracking-wider">CO-ORDINATOR</span>
              <span className="font-headline-sm text-on-surface text-lg">Mrs. Kavita Rao</span>
              <span className="text-on-surface-variant font-body-sm">Classes 4 – 5</span>
              <span className="bg-secondary/10 text-secondary font-label-sm rounded-lg mt-2 px-3 py-1 w-fit">Upper Primary</span>
            </div>
          </div>
          {/* Middle */}
          <div className="glass-card border border-outline-variant/30 rounded-3xl p-5 md:p-6 flex items-center gap-4 md:gap-5 hover:-translate-y-1 transition-transform duration-300">
            <div className="size-16 md:size-20 shrink-0 rounded-2xl overflow-hidden shadow-sm">
              <img alt="Mr. Arjun Verma" className="object-cover w-full h-full object-top" src="https://lh3.googleusercontent.com/aida-public/AB6AXuACsE22F7coEppIy-DGvn9GQZJf_ciFIwHdqkNN63p6PAkDpqdplpoQwmQh5Kq3m4kjMhv6avGrvD69uze4_5a5xCAW-VVlVBqNMGzzw8Hn9Yw901UEmYW7wJj5WyMGS-PPuou_6cQEejaiL79y1cz3RinrmLCRqvIl6GbqcRZwZ7Sn2Xibqe7lLLoeDk8yq9taq0wsJr-_Sr1eTrbwcBmgo80rI5QOHYU8YFLeOar2VIFdTABfn3J5x-Ad3D-spgSSpogX7BtwRau4" />
            </div>
            <div className="flex flex-col flex-1 gap-1">
              <span className="font-label-sm text-on-surface-variant tracking-wider">CO-ORDINATOR</span>
              <span className="font-headline-sm text-on-surface text-lg">Mr. Arjun Verma</span>
              <span className="text-on-surface-variant font-body-sm">Classes 6 – 8</span>
              <span className="bg-primary/10 text-primary font-label-sm rounded-lg mt-2 px-3 py-1 w-fit">Middle</span>
            </div>
          </div>
          {/* Secondary */}
          <div className="glass-card border border-outline-variant/30 rounded-3xl p-5 md:p-6 flex items-center gap-4 md:gap-5 hover:-translate-y-1 transition-transform duration-300">
            <div className="size-16 md:size-20 shrink-0 rounded-2xl overflow-hidden shadow-sm">
              <img alt="Mr. Samuel Deshmukh" className="object-cover w-full h-full object-top" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcrVUoKDLVTlOPI2Bu12VTYplfTiGnAR4LjPsUmL6Rh9OC6TfO50wvIjQ3YSItPrCXjNJAW8Bu0dQceaxAuIXB_H7aKmd_9YI9emH6lrxqriLgXqoNZUtj26grVVZLZ8SaSc4N5k9QCL3UOrwx-9OW7ME1Myh_xyohZnhXsv8twfcZt7psPCIpDbyEQpS9KOOVDoe6d0I-WBHqGqpDe6ZFrWYXCaAaK2cN7Skd2klGhO-h5Xitl7fOMCUgmx594cmMDn_yAbzGwO19" />
            </div>
            <div className="flex flex-col flex-1 gap-1">
              <span className="font-label-sm text-on-surface-variant tracking-wider">CO-ORDINATOR</span>
              <span className="font-headline-sm text-on-surface text-lg">Mr. Samuel Deshmukh</span>
              <span className="text-on-surface-variant font-body-sm">Classes 9 – 10</span>
              <span className="bg-secondary/10 text-secondary font-label-sm rounded-lg mt-2 px-3 py-1 w-fit">Secondary</span>
            </div>
          </div>
          {/* Senior */}
          <div className="glass-card border border-outline-variant/30 rounded-3xl p-5 md:p-6 flex items-center gap-4 md:gap-5 hover:-translate-y-1 transition-transform duration-300">
            <div className="size-16 md:size-20 shrink-0 rounded-2xl overflow-hidden shadow-sm">
              <img alt="Mr. Aditya Sharma" className="object-cover w-full h-full object-top" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQslp_fOr8t2_uUdaZJxmI-6s33upsAPLlEHr5zMlbvRQi_b5MwTsCDBtV87ape2mzws94NmsSW6xuotbuYl_bX2t1K4PNwyo9oVLd59gGudRl4IQWfBmwtDAKGuP5DlQZX9kszNfSLK58J2F9nTqG7Vibg73XzH50W43BQxiJsjb1aLBRgWmSFtOwMyK-pDEOUVslNs2RwgMgHoiGnU4N5E4Xr-4GPVHlqmbNKMG0bCdhSjgyDrSt3BZFFrfACFNzmn441a7Ml-Gg" />
            </div>
            <div className="flex flex-col flex-1 gap-1">
              <span className="font-label-sm text-on-surface-variant tracking-wider">CO-ORDINATOR</span>
              <span className="font-headline-sm text-on-surface text-lg">Mr. Aditya Sharma</span>
              <span className="text-on-surface-variant font-body-sm">Classes 11 – 12</span>
              <span className="bg-primary/10 text-primary font-label-sm rounded-lg mt-2 px-3 py-1 w-fit">Senior</span>
            </div>
          </div>
        </div>
      </section>
      {/* END: AcademicExcellence */}
      {/* BEGIN: QuoteSection */}
      <section className="bg-surface-container-low p-4 md:p-12 lg:p-16">
        <div className="relative glass-card border border-outline-variant/30 rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-16 flex flex-col gap-6 md:gap-8 overflow-hidden shadow-sm">
          <div className="bg-[radial-gradient(ellipse_at_left,oklch(0.45_0.16_255/.1),transparent_60%)] absolute inset-0"></div>
          {/* Quote Icon */}
          <span className="material-symbols-outlined text-tertiary opacity-40 absolute top-4 left-4 md:top-10 md:left-10 text-[60px] md:text-[100px]">format_quote</span>
          <p className="relative max-w-4xl font-headline-sm md:font-headline-lg text-on-surface leading-relaxed z-10 pt-10 md:pt-0 pl-0 md:pl-16">
            At Takshashila, we believe true education nurtures both the intellect and the character. Our mentors are committed to research-based pedagogy that empowers every child to think boldly and lead with compassion.
          </p>
          <div className="relative flex items-center gap-4 md:gap-5 z-10 pl-0 md:pl-16">
            <div className="size-14 md:size-16 shrink-0 border-2 border-primary rounded-full overflow-hidden shadow-md">
              <img alt="Mr. Prakhar Khandewal" className="object-cover w-full h-full object-top" src="/prakhar_khandelwal.jpeg" />
            </div>
            <div className="flex flex-col">
              <span className="font-headline-sm text-on-surface text-base md:text-xl">Mr. Prakhar Khandewal</span>
              <span className="text-on-surface-variant font-body-sm text-xs md:text-sm">Principal, Takshashila Public School</span>
            </div>
          </div>
        </div>
      </section>
      {/* END: QuoteSection */}
      {/* BEGIN: Footer */}
      <Footer/>
      {/* END: Footer */}
    </div>
  );
}
