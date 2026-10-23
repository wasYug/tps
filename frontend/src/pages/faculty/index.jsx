import React, { useState, useEffect } from 'react';
import './faculty.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { supabase } from '@/lib/supabase';

const defaultFacultyData = {
    hero: {
        name: "Shri Tyagi Ji Maharaj",
        image: "\\tyagi_ji_maharaj.png"
    },
    administration: [
        { name: "Mr. Rohan Kapoor", role: "Director", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAvdN0aPnfns0QZ4gNOm_srLPvcQt3JiOzSpwD7bcW928wEaDHKZaBOlzAt7QqiNcQDLjFT7UhqRnyFzgS73ZjXIDEO-im24DGBI0494dgDNHXZomf7dERP53QpZj5_I-JixMN2HSkB5Gl1PgGSM5ityP5fdW12VXrsW8OL-mD6OsKhErrcaCgSwJRFbfgsooNQxv8MBFBWnM43BIEQg70sFUHrc3iPuaIb44akTjYh8p-A6ZPVTBm0gVgy8EciIHV3is5nIJHuzKmq", borderClass: "border-secondary/20", bgClass: "from-secondary/10", textClass: "text-secondary" },
        { name: "Mrs. Anjali Mehra", role: "Director", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBiDOrXUg5DxqKC6oS7pgrpmiCOg0dHIDpKyN62G4ITFYiJ_NfqnIIVsJ2_QVYaydo1FwyPTaBQkPkqJJNCIAdDwtRl2-PEIFITWe3DycYsZVbC6iBn85iYeQiXfYYdZH4MdCBxOMMlmlLLok-LPC0YyIp0H1aJfQHlIIWRUYXuVKwrRBQZml-fPykhwKxm4MlKeR-BEvZSWpTziJnTWRYhNuhvtR1BxtEPeXtfWsHll-YQ1vMxsWKzFtdRpyx3SB7A-OYrBbs-wrMt", borderClass: "border-secondary/20", bgClass: "from-secondary/10", textClass: "text-secondary" },
        { name: "Mr. Sanjay Iyer", role: "Manager", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA3vrHff_QIJUQSR6XnQAzLRbRW4gL1oGvpuh58Qe3l8lL_A0SyC9ZqUXMz_4COa9Yx1x7lLAbac1O9d3F27YQvjgo3aayYwwDJM_vz51H5QCtbEddQUKOMxDxVIVJx7vadhqX2tg-8ktXqpdeKvsdO-5Cl1nEU-UN9IZ6u_p-t4cONKdRjrGeXcj84ww2YR1PLy2yukuSN-F360ezbOT4XMpo4ou_phUxxOANT1Lh134kcCvJs0xJvwE9vkcJMguf0SaJ8cO2lK9xK", borderClass: "border-tertiary/20", bgClass: "from-tertiary/10", textClass: "text-primary" },
        { name: "Mr. Prakhar Khandewal", role: "Principal", image: "/prakhar_khandelwal.jpeg", borderClass: "border-primary/20", bgClass: "from-primary/10", textClass: "text-primary" },
        { name: "[Second Principal Name]", role: "Principal", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDQslp_fOr8t2_uUdaZJxmI-6s33upsAPLlEHr5zMlbvRQi_b5MwTsCDBtV87ape2mzws94NmsSW6xuotbuYl_bX2t1K4PNwyo9oVLd59gGudRl4IQWfBmwtDAKGuP5DlQZX9kszNfSLK58J2F9nTqG7Vibg73XzH50W43BQxiJsjb1aLBRgWmSFtOwMyK-pDEOUVslNs2RwgMgHoiGnU4N5E4Xr-4GPVHlqmbNKMG0bCdhSjgyDrSt3BZFFrfACFNzmn441a7Ml-Gg", borderClass: "border-primary/20", bgClass: "from-primary/10", textClass: "text-primary" },
        { name: "[Vice Principal Name]", role: "Vice Principal", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCcrVUoKDLVTlOPI2Bu12VTYplfTiGnAR4LjPsUmL6Rh9OC6TfO50wvIjQ3YSItPrCXjNJAW8Bu0dQceaxAuIXB_H7aKmd_9YI9emH6lrxqriLgXqoNZUtj26grVVZLZ8SaSc4N5k9QCL3UOrwx-9OW7ME1Myh_xyohZnhXsv8twfcZt7psPCIpDbyEQpS9KOOVDoe6d0I-WBHqGqpDe6ZFrWYXCaAaK2cN7Skd2klGhO-h5Xitl7fOMCUgmx594cmMDn_yAbzGwO19", borderClass: "border-primary/20", bgClass: "from-primary/10", textClass: "text-primary" }
    ],
    hods: [
        { name: "[HOD Name]", role: "HOD Science", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDQslp_fOr8t2_uUdaZJxmI-6s33upsAPLlEHr5zMlbvRQi_b5MwTsCDBtV87ape2mzws94NmsSW6xuotbuYl_bX2t1K4PNwyo9oVLd59gGudRl4IQWfBmwtDAKGuP5DlQZX9kszNfSLK58J2F9nTqG7Vibg73XzH50W43BQxiJsjb1aLBRgWmSFtOwMyK-pDEOUVslNs2RwgMgHoiGnU4N5E4Xr-4GPVHlqmbNKMG0bCdhSjgyDrSt3BZFFrfACFNzmn441a7Ml-Gg", borderClass: "border-tertiary/20", bgClass: "from-tertiary/10", textClass: "text-error" },
        { name: "[HOD Name]", role: "HOD Mathematics", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBiDOrXUg5DxqKC6oS7pgrpmiCOg0dHIDpKyN62G4ITFYiJ_NfqnIIVsJ2_QVYaydo1FwyPTaBQkPkqJJNCIAdDwtRl2-PEIFITWe3DycYsZVbC6iBn85iYeQiXfYYdZH4MdCBxOMMlmlLLok-LPC0YyIp0H1aJfQHlIIWRUYXuVKwrRBQZml-fPykhwKxm4MlKeR-BEvZSWpTziJnTWRYhNuhvtR1BxtEPeXtfWsHll-YQ1vMxsWKzFtdRpyx3SB7A-OYrBbs-wrMt", borderClass: "border-tertiary/20", bgClass: "from-tertiary/10", textClass: "text-error" },
        { name: "[HOD Name]", role: "HOD English", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCcrVUoKDLVTlOPI2Bu12VTYplfTiGnAR4LjPsUmL6Rh9OC6TfO50wvIjQ3YSItPrCXjNJAW8Bu0dQceaxAuIXB_H7aKmd_9YI9emH6lrxqriLgXqoNZUtj26grVVZLZ8SaSc4N5k9QCL3UOrwx-9OW7ME1Myh_xyohZnhXsv8twfcZt7psPCIpDbyEQpS9KOOVDoe6d0I-WBHqGqpDe6ZFrWYXCaAaK2cN7Skd2klGhO-h5Xitl7fOMCUgmx594cmMDn_yAbzGwO19", borderClass: "border-tertiary/20", bgClass: "from-tertiary/10", textClass: "text-error" },
        { name: "[HOD Name]", role: "HOD Commerce", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA3vrHff_QIJUQSR6XnQAzLRbRW4gL1oGvpuh58Qe3l8lL_A0SyC9ZqUXMz_4COa9Yx1x7lLAbac1O9d3F27YQvjgo3aayYwwDJM_vz51H5QCtbEddQUKOMxDxVIVJx7vadhqX2tg-8ktXqpdeKvsdO-5Cl1nEU-UN9IZ6u_p-t4cONKdRjrGeXcj84ww2YR1PLy2yukuSN-F360ezbOT4XMpo4ou_phUxxOANT1Lh134kcCvJs0xJvwE9vkcJMguf0SaJ8cO2lK9xK", borderClass: "border-tertiary/20", bgClass: "from-tertiary/10", textClass: "text-error" }
    ],
    coordinators: [
        { name: "Mrs. Priya Nair", role: "Nursery to Kindergarten", tag: "Pre-Primary", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCzWkOqu34NBKSOEGwir9YuFLVrdYkQWlYLP36iyCKBMBEfOQfl758sam-BeoN9qRI8WxkjJ_cXZmlgxnbbZn7ILtKB7RqSR0PYB05Oh2N2CjwXoqYuTMcEf5yOggDmi4-kVmgglV_m4thAiTDdJ6fGu8jx6x6WferRfLxQzZ01wmfmUZwzR0SW7sLOigWwRB_5vHBn9JVAZelFg_wBBohJHVNiCedtdeIYDqUCZDmt6adYKthPEf5ptyXVM9Fmm4k8wquWTQef55Sm", tagClass: "bg-primary/10 text-primary" },
        { name: "Mrs. Meera Iyer", role: "Classes 1 – 3", tag: "Primary", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCLYrrYA3sUfwczbCt8J3GPXpblREWg-HyMmvvDpnAzNLqmxJeTpyFpymfnZN6j6YkNa5qaWd2Tba6DOFDQYhviIuJq_RW1cYfR4gaiZqmndNmLoMKJpyfsSlv09txv2G1o63x6Ht3ijWBA_FTXln9DsnIwMdtTZf8qp8SpvKMn24E3u9AF_-CbT86qrRAVVCNWSCJFPJQLMU4CP6S1hkbIRdNR_bXBBQXkNybZdh7zk7UOqemK9rzWZHLho558sJ-brlM_Leq9sRXm", tagClass: "bg-secondary/10 text-secondary" },
        { name: "Mrs. Kavita Rao", role: "Classes 4 – 5", tag: "Upper Primary", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDvvzv77ukCpJcClcuO8oBcY75_fRSu5cZfHU8r0zl51tV2yDch07UEAfGwBWhkAF3ad3UbTY7USEjrzQrwHLozU37zPJzbwgO_11X1ri_mYg1QTeIRiBth6TslHkccW_st1TNwt9DU8wHTUXolDmfmRWGWcEdT3VKg6dXWXHJ7LcpJlSRS-MBOnvhjJKlzIwYUn_zDHRV3IF9C94crN4XrtB_nuPIL05RzIfFATZWVadQyH2Kg0RVvtCAuC-xnpBCjB0YSWlL9GdJ7", tagClass: "bg-secondary/10 text-secondary" },
        { name: "Mr. Arjun Verma", role: "Classes 6 – 8", tag: "Middle", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuACsE22F7coEppIy-DGvn9GQZJf_ciFIwHdqkNN63p6PAkDpqdplpoQwmQh5Kq3m4kjMhv6avGrvD69uze4_5a5xCAW-VVlVBqNMGzzw8Hn9Yw901UEmYW7wJj5WyMGS-PPuou_6cQEejaiL79y1cz3RinrmLCRqvIl6GbqcRZwZ7Sn2Xibqe7lLLoeDk8yq9taq0wsJr-_Sr1eTrbwcBmgo80rI5QOHYU8YFLeOar2VIFdTABfn3J5x-Ad3D-spgSSpogX7BtwRau4", tagClass: "bg-primary/10 text-primary" },
        { name: "Mr. Samuel Deshmukh", role: "Classes 9 – 10", tag: "Secondary", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCcrVUoKDLVTlOPI2Bu12VTYplfTiGnAR4LjPsUmL6Rh9OC6TfO50wvIjQ3YSItPrCXjNJAW8Bu0dQceaxAuIXB_H7aKmd_9YI9emH6lrxqriLgXqoNZUtj26grVVZLZ8SaSc4N5k9QCL3UOrwx-9OW7ME1Myh_xyohZnhXsv8twfcZt7psPCIpDbyEQpS9KOOVDoe6d0I-WBHqGqpDe6ZFrWYXCaAaK2cN7Skd2klGhO-h5Xitl7fOMCUgmx594cmMDn_yAbzGwO19", tagClass: "bg-secondary/10 text-secondary" },
        { name: "Mr. Aditya Sharma", role: "Classes 11 – 12", tag: "Senior", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDQslp_fOr8t2_uUdaZJxmI-6s33upsAPLlEHr5zMlbvRQi_b5MwTsCDBtV87ape2mzws94NmsSW6xuotbuYl_bX2t1K4PNwyo9oVLd59gGudRl4IQWfBmwtDAKGuP5DlQZX9kszNfSLK58J2F9nTqG7Vibg73XzH50W43BQxiJsjb1aLBRgWmSFtOwMyK-pDEOUVslNs2RwgMgHoiGnU4N5E4Xr-4GPVHlqmbNKMG0bCdhSjgyDrSt3BZFFrfACFNzmn441a7Ml-Gg", tagClass: "bg-primary/10 text-primary" }
    ],
    quote: {
        text: "At Takshashila, we believe true education nurtures both the intellect and the character. Our mentors are committed to research-based pedagogy that empowers every child to think boldly and lead with compassion.",
        name: "Mr. Prakhar Khandewal",
        role: "Principal, Takshashila Public School",
        image: "/prakhar_khandelwal.jpeg"
    }
};


export default function FacultyPage() {
  const [facultyData, setFacultyData] = useState(defaultFacultyData);

  useEffect(() => {
    window.scrollTo(0, 0);

    async function fetchSiteSettings() {
        try {
            const keysToFetch = [
                "faculty_hero_name", "faculty_hero_image",
                "faculty_quote_text", "faculty_quote_name", "faculty_quote_role", "faculty_quote_image"
            ];

            for(let i=0; i<6; i++) { keysToFetch.push(`faculty_admin_${i}_name`, `faculty_admin_${i}_role`, `faculty_admin_${i}_image`); }
            for(let i=0; i<4; i++) { keysToFetch.push(`faculty_hod_${i}_name`, `faculty_hod_${i}_role`, `faculty_hod_${i}_image`); }
            for(let i=0; i<6; i++) { keysToFetch.push(`faculty_coord_${i}_name`, `faculty_coord_${i}_role`, `faculty_coord_${i}_image`, `faculty_coord_${i}_tag`); }

            const { data: settingsData, error: settingsError } = await supabase
                .from("site_settings")
                .select("key, value")
                .in("key", keysToFetch);

            if (!settingsError && settingsData) {
                const settingsMap = settingsData.reduce((acc, curr) => {
                    acc[curr.key] = curr.value;
                    return acc;
                }, {});

                setFacultyData(prevData => {
                    const newData = JSON.parse(JSON.stringify(prevData));
                    
                    if (settingsMap.faculty_hero_name) newData.hero.name = settingsMap.faculty_hero_name;
                    if (settingsMap.faculty_hero_image) newData.hero.image = settingsMap.faculty_hero_image;
                    
                    if (settingsMap.faculty_quote_text) newData.quote.text = settingsMap.faculty_quote_text;
                    if (settingsMap.faculty_quote_name) newData.quote.name = settingsMap.faculty_quote_name;
                    if (settingsMap.faculty_quote_role) newData.quote.role = settingsMap.faculty_quote_role;
                    if (settingsMap.faculty_quote_image) newData.quote.image = settingsMap.faculty_quote_image;
                    
                    const updateArray = (prevArray, prefix) => {
                        return prevArray.map((item, idx) => ({
                            ...item,
                            name: settingsMap[`${prefix}_${idx}_name`] || item.name,
                            role: settingsMap[`${prefix}_${idx}_role`] || item.role,
                            image: settingsMap[`${prefix}_${idx}_image`] || item.image,
                            tag: settingsMap[`${prefix}_${idx}_tag`] || item.tag
                        }));
                    };

                    newData.administration = updateArray(newData.administration, 'faculty_admin');
                    newData.hods = updateArray(newData.hods, 'faculty_hod');
                    newData.coordinators = updateArray(newData.coordinators, 'faculty_coord');

                    return newData;
                });
            }
        } catch (err) {
            console.error("Error fetching site settings for faculty page:", err);
        }
    }
    
    fetchSiteSettings();
  }, []);

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
            <img alt={facultyData.hero.name} className="object-cover w-full h-full object-top transition-transform duration-700 group-hover:scale-105" src={facultyData.hero.image} />
            <div className="bg-[linear-gradient(to_top,oklch(0.145_0_0/.7),transparent_55%)] absolute inset-0"></div>
            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 text-center">
              <span className="font-serif text-white font-bold text-xl md:text-2xl drop-shadow-md">
                {facultyData.hero.name}
              </span>
            </div>
          </div>
        </div>
      </section>
      {/* END: HeroSection */}
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
          {facultyData.administration.map((admin, idx) => (
              <div key={idx} className="text-center glass-card border border-outline-variant/30 rounded-3xl p-6 flex flex-col items-center gap-4 hover:-translate-y-2 transition-transform duration-300">
                <div className={`size-32 sm:size-40 border-4 ${admin.borderClass} rounded-full overflow-hidden p-1 bg-gradient-to-br ${admin.bgClass} to-transparent`}>
                  <img alt={admin.role} className="object-cover w-full h-full rounded-full object-top" src={admin.image} />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-headline-sm text-on-surface text-base md:text-lg">{admin.name}</span>
                  <span className={`${admin.textClass} font-label-md text-sm md:text-base`}>{admin.role}</span>
                </div>
              </div>
          ))}
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
          {facultyData.hods.map((hod, idx) => (
            <div key={idx} className="text-center glass-card border border-outline-variant/30 rounded-3xl p-6 flex flex-col items-center gap-4 hover:-translate-y-2 transition-transform duration-300">
                <div className={`size-32 sm:size-40 border-4 ${hod.borderClass} rounded-full overflow-hidden p-1 bg-gradient-to-br ${hod.bgClass} to-transparent`}>
                <img alt={hod.role} className="object-cover w-full h-full rounded-full object-top" src={hod.image} />
                </div>
                <div className="flex flex-col gap-1">
                <span className="font-headline-sm text-on-surface text-base md:text-lg">{hod.name}</span>
                <span className={`${hod.textClass} font-label-md text-sm md:text-base`}>{hod.role}</span>
                </div>
            </div>
          ))}
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
          {facultyData.coordinators.map((coord, idx) => (
              <div key={idx} className="glass-card border border-outline-variant/30 rounded-3xl p-5 md:p-6 flex items-center gap-4 md:gap-5 hover:-translate-y-1 transition-transform duration-300">
                <div className="size-16 md:size-20 shrink-0 rounded-2xl overflow-hidden shadow-sm">
                  <img alt={coord.name} className="object-cover w-full h-full object-top" src={coord.image} />
                </div>
                <div className="flex flex-col flex-1 gap-1">
                  <span className="font-label-sm text-on-surface-variant tracking-wider">CO-ORDINATOR</span>
                  <span className="font-headline-sm text-on-surface text-lg">{coord.name}</span>
                  <span className="text-on-surface-variant font-body-sm">{coord.role}</span>
                  <span className={`${coord.tagClass} font-label-sm rounded-lg mt-2 px-3 py-1 w-fit`}>{coord.tag}</span>
                </div>
              </div>
          ))}
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
            {facultyData.quote.text}
          </p>
          <div className="relative flex items-center gap-4 md:gap-5 z-10 pl-0 md:pl-16">
            <div className="size-14 md:size-16 shrink-0 border-2 border-primary rounded-full overflow-hidden shadow-md">
              <img alt={facultyData.quote.name} className="object-cover w-full h-full object-top" src={facultyData.quote.image} />
            </div>
            <div className="flex flex-col">
              <span className="font-headline-sm text-on-surface text-base md:text-xl">{facultyData.quote.name}</span>
              <span className="text-on-surface-variant font-body-sm text-xs md:text-sm">{facultyData.quote.role}</span>
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
