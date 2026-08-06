import React, { useEffect, useState, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './result.css';

export default function ResultPage() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [showAll12, setShowAll12] = useState(false);
    const [showAll10, setShowAll10] = useState(false);
    const [animatedBars, setAnimatedBars] = useState(false);
    const [chartClass, setChartClass] = useState('X');
    const analyticsRef = useRef(null);
    const class10ToppersRef = useRef(null);
    const class12ToppersRef = useRef(null);

    const class12Toppers = [
        { name: "Navansh Agnihotri", score: "97.8%", rank: 1, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA0X3BAApx_JQGglXGKodI3ASug84Xj9RlA9skVKOzTtEYzIH3KvMzngkq8o1DvGI6uUVzTaoItOXN1Ad6hihkFmAaaJuxnrYNgKCdUyvmBHR_gwL3xxUJvuaWBmfRYG9X_AuFuoYnxTsfgmqey-VyNvbMUQBNTpdBDT6inZJPcV1z8bykCY8Txf6E9-Szeledwu0fDWLxX3f-cnOGYiU8qdsxni41PJ1t4BTv0-yHEONUYWFSGGEc0eZcnVIzHPgvEnoGtqlKEfvtJ" },
        { name: "Krishdeep Singh", score: "96.8%", rank: 2, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDoHu_DTiZtgHLwK-wBf2y_RwS6EKHDWQbmBJ6j-ltsYhNg_-Kuz5PAzYKqWRIkGAlOEgKFypk_jQAchUCbRu66cTYvypMVM4ejbN_6495LsV66vGnpg2Gq0qMWOye-bn5INkcojGdH8Hk3BSnAxkeO5yu7PhvFW5qXm5cmRd60UO5h-sRIKYYI_rGfNE62XWWleGwlc9yWTzCRoB9bZWKegs2ResV5Os84_EMAZ7G9Wiz3elZwTHZYSe-Y2qrbiG3YRuicMaYcQR03" },
        { name: "Suryash Pratap Singh", score: "96.2%", rank: 3, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAEsX_v0CAieH-Ntigwfj0bCqcTDQuW680C1MeXqmrK8vQ-C3ESEHSz_fIPdD_j__JPCZ6qbhS_naIAeu3F3qWcNK3gZxPnQ3JdRb1NetJ8BXHZWaNESsUNmtP3KwD462SnjHTrIq7yIS919igmmGFqehWg_Skb00CeNPWXMBbYmgWYjgZMY871SUPnIFtT9RRfUDjJEX7MhOQDGTlhIGPyKH0MDf3fZ6y_JsbXDTp5tIC78OzBKTb9qQFYjsVK4zV4zB1cc8SIs3tt" },
        { name: "Inderveer Singh", score: "96%", rank: 4, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCLO9b9bjZWm0H1xlJM80ZWcag2Bo6bcwqMynK0KoyH8u8jMcbE9_8ZO099B3yEpjYli9QJzOaHoKKjnqV0NYOlpcHh_XsWf8d85o6jwhIeMow6UpThxn_X5Apw37KsCGAMZ5GKNpHUqrFVCWCbIMTU4BXev8J3FeX0NKKb8bNAn1jqG4GhVam_1mQt7hpRLzYFfctr6cAQvZBjO-yeOsmF5BKt2Z-L9esjm2W8VIZRSTTq7pzQd4Vd_ahZVjk7kROLQ5iOnzPl7wAi" },
        { name: "Suryash Pratap Singh", score: "96.2%", rank: 5, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAEsX_v0CAieH-Ntigwfj0bCqcTDQuW680C1MeXqmrK8vQ-C3ESEHSz_fIPdD_j__JPCZ6qbhS_naIAeu3F3qWcNK3gZxPnQ3JdRb1NetJ8BXHZWaNESsUNmtP3KwD462SnjHTrIq7yIS919igmmGFqehWg_Skb00CeNPWXMBbYmgWYjgZMY871SUPnIFtT9RRfUDjJEX7MhOQDGTlhIGPyKH0MDf3fZ6y_JsbXDTp5tIC78OzBKTb9qQFYjsVK4zV4zB1cc8SIs3tt" },
        { name: "Inderveer Singh", score: "96%", rank: 5, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCLO9b9bjZWm0H1xlJM80ZWcag2Bo6bcwqMynK0KoyH8u8jMcbE9_8ZO099B3yEpjYli9QJzOaHoKKjnqV0NYOlpcHh_XsWf8d85o6jwhIeMow6UpThxn_X5Apw37KsCGAMZ5GKNpHUqrFVCWCbIMTU4BXev8J3FeX0NKKb8bNAn1jqG4GhVam_1mQt7hpRLzYFfctr6cAQvZBjO-yeOsmF5BKt2Z-L9esjm2W8VIZRSTTq7pzQd4Vd_ahZVjk7kROLQ5iOnzPl7wAi" },
        { name: "Suryash Pratap Singh", score: "96.2%", rank: 6, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAEsX_v0CAieH-Ntigwfj0bCqcTDQuW680C1MeXqmrK8vQ-C3ESEHSz_fIPdD_j__JPCZ6qbhS_naIAeu3F3qWcNK3gZxPnQ3JdRb1NetJ8BXHZWaNESsUNmtP3KwD462SnjHTrIq7yIS919igmmGFqehWg_Skb00CeNPWXMBbYmgWYjgZMY871SUPnIFtT9RRfUDjJEX7MhOQDGTlhIGPyKH0MDf3fZ6y_JsbXDTp5tIC78OzBKTb9qQFYjsVK4zV4zB1cc8SIs3tt" },
        { name: "Inderveer Singh", score: "96%", rank: 7, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCLO9b9bjZWm0H1xlJM80ZWcag2Bo6bcwqMynK0KoyH8u8jMcbE9_8ZO099B3yEpjYli9QJzOaHoKKjnqV0NYOlpcHh_XsWf8d85o6jwhIeMow6UpThxn_X5Apw37KsCGAMZ5GKNpHUqrFVCWCbIMTU4BXev8J3FeX0NKKb8bNAn1jqG4GhVam_1mQt7hpRLzYFfctr6cAQvZBjO-yeOsmF5BKt2Z-L9esjm2W8VIZRSTTq7pzQd4Vd_ahZVjk7kROLQ5iOnzPl7wAi" },
        { name: "Suryash Pratap Singh", score: "96.2%", rank: 8, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAEsX_v0CAieH-Ntigwfj0bCqcTDQuW680C1MeXqmrK8vQ-C3ESEHSz_fIPdD_j__JPCZ6qbhS_naIAeu3F3qWcNK3gZxPnQ3JdRb1NetJ8BXHZWaNESsUNmtP3KwD462SnjHTrIq7yIS919igmmGFqehWg_Skb00CeNPWXMBbYmgWYjgZMY871SUPnIFtT9RRfUDjJEX7MhOQDGTlhIGPyKH0MDf3fZ6y_JsbXDTp5tIC78OzBKTb9qQFYjsVK4zV4zB1cc8SIs3tt" },
        { name: "Inderveer Singh", score: "96%", rank: 9, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCLO9b9bjZWm0H1xlJM80ZWcag2Bo6bcwqMynK0KoyH8u8jMcbE9_8ZO099B3yEpjYli9QJzOaHoKKjnqV0NYOlpcHh_XsWf8d85o6jwhIeMow6UpThxn_X5Apw37KsCGAMZ5GKNpHUqrFVCWCbIMTU4BXev8J3FeX0NKKb8bNAn1jqG4GhVam_1mQt7hpRLzYFfctr6cAQvZBjO-yeOsmF5BKt2Z-L9esjm2W8VIZRSTTq7pzQd4Vd_ahZVjk7kROLQ5iOnzPl7wAi" }
    ];

    const class10Toppers = [
        { name: "Mohd Arsalan Raza", score: "98.2%", rank: 1, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC9sbWwwaHA3msj8NsAncXDNFl6YKPhUzL5gPI3JnTeqVKqWMaNeSQNDqceaR1LmwsDcs9TWC7tHw--16x42PtZPDhE6AePPfW8ErmPptwemJUQA7ukY8JvUeL9w0C0nzfsBqhf1KGi1Khosb2pgy-VHZTK6KE7pO1IPcBrNRCCRDuwIQeeWIAnggRSkrM8y0_C1UBhhvYT5ZMNIjdTlFY4rRstrQHXpRxxLZWwH0tPrvMfr27pwkNGhtcY6FrCnt4ni25JfMY5-PJy" },
        { name: "Shiza Hikmat", score: "98.2%", rank: 1, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD69goOUwd7xhB2D-xPP0V94aBRkreRC4fTisz6wlU-mWHTgn7I86AD01bym_HGRzY4wK--J63GEGvJYICUZ30BcF-MFQ8CDtpZ5DA2pPSscd5lwmOWTmLKkY3I2jT_vG-Gtn02oyG0dlxq5CZR6XfsJzINA8lpKhsuZIAjmm_-FZrYKvFTtHKNxuhaXxWim6W4qWC7OcitxyqxZdYk1bEmPr3BQ1ftAPK3Ug3dzgr1TSrDznCbDYKa1BZhOllXPHpYX5G2ov3t7MR8" },
        { name: "Anukul Garg", score: "98%", rank: 2, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCE7Oas09lCbuyTN_3_wsU3rY0XguLv7I6vsd8DN1cbNlJ796Gu-R-m7FlJBsikZ2G4jdMKHxVzOzWPMdQlNsp8RYwiYz4_FGCCfgBqSb6TJFox9p4YyBc73FHCQJ388usxNOjpjSKkcDQGqTpDEkfGj_lDL9bhhWqZQnh0FQdWFwyxVn-X2ldbQ7vSQ70nbXXpQ3M0Ai7Ucz2JxguoCGzVHPcQ8VxvlYmvkk-C3Oy0EPuzTOhcrnkkOt6cYCeZVy0Rawn2u_x25Fpm" },
        { name: "Kavya Singh", score: "98%", rank: 3, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCHpCsOpcOlnT9DtYaWJgJs_cyYCz3o_RF3SLCpXF0dKh6UIclf2RMaMY0oYSpk5b_n7DGAioa965qkrGcl6Iurr5Q91XaNi9mWNv06dL8iSEmAvdFTsjE53fNMvciiulmxUZWpOOJlMBVL6dUJVfZNrabUgxBKHlncAPN9vi6N9hB1OBoeLwYqGXXfdR67wU-_iULQPjsupqRS8_A1bvvXNMiYV07xC0xAHDozAt3RVz_uISdLqZIJ_mLg0erwKlaChSlCkRmOiQ3p" },
        { name: "Anukul Garg", score: "98%", rank: 4, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCE7Oas09lCbuyTN_3_wsU3rY0XguLv7I6vsd8DN1cbNlJ796Gu-R-m7FlJBsikZ2G4jdMKHxVzOzWPMdQlNsp8RYwiYz4_FGCCfgBqSb6TJFox9p4YyBc73FHCQJ388usxNOjpjSKkcDQGqTpDEkfGj_lDL9bhhWqZQnh0FQdWFwyxVn-X2ldbQ7vSQ70nbXXpQ3M0Ai7Ucz2JxguoCGzVHPcQ8VxvlYmvkk-C3Oy0EPuzTOhcrnkkOt6cYCeZVy0Rawn2u_x25Fpm" },
        { name: "Kavya Singh", score: "98%", rank: 5, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCHpCsOpcOlnT9DtYaWJgJs_cyYCz3o_RF3SLCpXF0dKh6UIclf2RMaMY0oYSpk5b_n7DGAioa965qkrGcl6Iurr5Q91XaNi9mWNv06dL8iSEmAvdFTsjE53fNMvciiulmxUZWpOOJlMBVL6dUJVfZNrabUgxBKHlncAPN9vi6N9hB1OBoeLwYqGXXfdR67wU-_iULQPjsupqRS8_A1bvvXNMiYV07xC0xAHDozAt3RVz_uISdLqZIJ_mLg0erwKlaChSlCkRmOiQ3p" },
        { name: "Anukul Garg", score: "98%", rank: 6, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCE7Oas09lCbuyTN_3_wsU3rY0XguLv7I6vsd8DN1cbNlJ796Gu-R-m7FlJBsikZ2G4jdMKHxVzOzWPMdQlNsp8RYwiYz4_FGCCfgBqSb6TJFox9p4YyBc73FHCQJ388usxNOjpjSKkcDQGqTpDEkfGj_lDL9bhhWqZQnh0FQdWFwyxVn-X2ldbQ7vSQ70nbXXpQ3M0Ai7Ucz2JxguoCGzVHPcQ8VxvlYmvkk-C3Oy0EPuzTOhcrnkkOt6cYCeZVy0Rawn2u_x25Fpm" },
        { name: "Kavya Singh", score: "98%", rank: 7, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCHpCsOpcOlnT9DtYaWJgJs_cyYCz3o_RF3SLCpXF0dKh6UIclf2RMaMY0oYSpk5b_n7DGAioa965qkrGcl6Iurr5Q91XaNi9mWNv06dL8iSEmAvdFTsjE53fNMvciiulmxUZWpOOJlMBVL6dUJVfZNrabUgxBKHlncAPN9vi6N9hB1OBoeLwYqGXXfdR67wU-_iULQPjsupqRS8_A1bvvXNMiYV07xC0xAHDozAt3RVz_uISdLqZIJ_mLg0erwKlaChSlCkRmOiQ3p" },
        { name: "Anukul Garg", score: "98%", rank: 8, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCE7Oas09lCbuyTN_3_wsU3rY0XguLv7I6vsd8DN1cbNlJ796Gu-R-m7FlJBsikZ2G4jdMKHxVzOzWPMdQlNsp8RYwiYz4_FGCCfgBqSb6TJFox9p4YyBc73FHCQJ388usxNOjpjSKkcDQGqTpDEkfGj_lDL9bhhWqZQnh0FQdWFwyxVn-X2ldbQ7vSQ70nbXXpQ3M0Ai7Ucz2JxguoCGzVHPcQ8VxvlYmvkk-C3Oy0EPuzTOhcrnkkOt6cYCeZVy0Rawn2u_x25Fpm" },
        { name: "Kavya Singh", score: "98%", rank: 9, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCHpCsOpcOlnT9DtYaWJgJs_cyYCz3o_RF3SLCpXF0dKh6UIclf2RMaMY0oYSpk5b_n7DGAioa965qkrGcl6Iurr5Q91XaNi9mWNv06dL8iSEmAvdFTsjE53fNMvciiulmxUZWpOOJlMBVL6dUJVfZNrabUgxBKHlncAPN9vi6N9hB1OBoeLwYqGXXfdR67wU-_iULQPjsupqRS8_A1bvvXNMiYV07xC0xAHDozAt3RVz_uISdLqZIJ_mLg0erwKlaChSlCkRmOiQ3p" }
    ];

    const renderTopperCard = (topper, index, gradientFrom = 'from-tertiary-container', gradientTo = 'to-secondary') => {
        const isTopRank = topper.rank <= 3;
        return (
            <div key={index} className={`rounded-3xl transition-all duration-500 topper-card-enter ${
                isTopRank
                    ? `p-[3px] bg-gradient-to-br ${gradientFrom} ${gradientTo} shadow-xl hover:scale-[1.04] hover:shadow-2xl`
                    : 'glass-card p-[3px] hover:shadow-lg hover:-translate-y-1 group'
            }`} style={{ animationDelay: `${index * 0.08}s` }}>
                <div className="bg-white rounded-[21px] p-6 md:p-8 h-full flex flex-col items-center">
                    <div className="relative mb-6">
                        <div className={`${
                            isTopRank ? 'w-32 h-32 md:w-36 md:h-36' : 'w-28 h-28 md:w-32 md:h-32'
                        } rounded-full p-[4px] bg-gradient-to-br ${gradientFrom} via-secondary ${gradientTo} shadow-lg`}>
                            <div className="w-full h-full rounded-full overflow-hidden ring-2 ring-white">
                                <img src={topper.image} alt={topper.name} className="w-full h-full object-cover object-top" />
                            </div>
                        </div>
                        <div className={`absolute -bottom-2 -right-2 ${
                            isTopRank
                                ? 'bg-gradient-to-br from-tertiary-container to-tertiary text-on-tertiary-fixed w-10 h-10 text-lg shimmer-badge'
                                : 'bg-secondary text-white w-8 h-8 text-sm'
                        } rounded-full flex items-center justify-center font-bold shadow-lg border-[3px] border-white`}>
                            {topper.rank}
                        </div>
                    </div>
                    <h4 className={`font-headline-md text-on-surface text-center mb-1.5 ${isTopRank ? 'text-lg md:text-xl' : 'text-base md:text-lg'}`}>{topper.name}</h4>
                    <span className={`font-label-md font-semibold ${isTopRank ? 'text-tertiary text-xl md:text-2xl' : 'text-secondary text-2xl'}`}>{topper.score}</span>
                    <span className={`mt-3 inline-flex items-center gap-1.5 px-4 py-1 rounded-full text-xl font-label-md ${
                        isTopRank
                            ? 'bg-tertiary-container/20 text-tertiary'
                            : 'bg-surface-container text-on-surface-variant'
                    }`}>
                        {isTopRank && <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>emoji_events</span>}
                        Rank {topper.rank}
                    </span>
                </div>
            </div>
        );
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Intersection observer for analytics bars animation
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setAnimatedBars(true);
                    }
                });
            },
            { threshold: 0.3 }
        );

        if (analyticsRef.current) {
            observer.observe(analyticsRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div className="bg-surface text-on-surface font-body-md result-page-theme">
            {/* Navbar */}
            <Navbar theme='light' />

            <main className="pt-20">
                {/* Hero Section */}
                <section className="relative overflow-hidden py-24 md:py-32">
                    <div className="absolute inset-0 hero-pattern"></div>
                    <div className="relative px-6 md:px-12 lg:px-margin-desktop max-w-container-max mx-auto flex flex-col items-center text-center">
                        <div className="inline-flex items-center gap-2 bg-secondary-fixed text-on-secondary-fixed px-5 py-2 rounded-full font-label-md mb-8 fade-in-up shadow-sm">
                            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>school</span>
                            ACADEMIC SUCCESS 2026
                        </div>
                        <h1 className="font-display-lg text-4xl md:text-6xl text-primary mb-6 max-w-4xl leading-tight fade-in-up fade-in-up-delay-1">
                            CBSE Board Examination Results
                        </h1>
                        <p className="font-body-lg text-on-surface-variant max-w-2xl mb-12 text-lg leading-relaxed fade-in-up fade-in-up-delay-2">
                            Celebrating Excellence, Dedication &amp; Academic Success. Our students continue to set new benchmarks with outstanding performances in both Class X and Class XII examinations.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 fade-in-up fade-in-up-delay-3">
                            <a
                                className="cta-btn bg-secondary text-on-secondary px-8 py-4 rounded-full font-label-md flex items-center gap-2 hover:shadow-xl transition-all active:scale-95 hover:gap-3"
                                href="#class-selection"
                            >
                                View Detailed Results
                                <span className="material-symbols-outlined">arrow_downward</span>
                            </a>
                        </div>
                        {/* Static Topper Cards */}
                        <div className="flex flex-col md:flex-row gap-6 mt-16 lg:mt-20 w-full justify-center items-center fade-in-up fade-in-up-delay-3 relative z-10">
                            {/* Class 10 Topper */}
                            <div className="flex items-center gap-5 bg-surface/90 backdrop-blur-md p-4 pr-10 sm:p-5 sm:pr-12 rounded-full border border-outline-variant/30 shadow-sm hover:shadow-md transition-all">
                                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9sbWwwaHA3msj8NsAncXDNFl6YKPhUzL5gPI3JnTeqVKqWMaNeSQNDqceaR1LmwsDcs9TWC7tHw--16x42PtZPDhE6AePPfW8ErmPptwemJUQA7ukY8JvUeL9w0C0nzfsBqhf1KGi1Khosb2pgy-VHZTK6KE7pO1IPcBrNRCCRDuwIQeeWIAnggRSkrM8y0_C1UBhhvYT5ZMNIjdTlFY4rRstrQHXpRxxLZWwH0tPrvMfr27pwkNGhtcY6FrCnt4ni25JfMY5-PJy" alt="10th Topper" className="size-20 sm:size-24 lg:size-28 object-cover rounded-full border-[4px] border-secondary/30 shadow-inner" />
                                <div className="text-left flex flex-col justify-center">
                                    <div className="flex items-center gap-3 mb-1.5">
                                        <span className="bg-secondary/10 text-secondary text-xs sm:text-sm font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">Class X</span>
                                        <span className="text-secondary font-bold text-base sm:text-lg">98.8%</span>
                                    </div>
                                    <h3 className="font-headline-sm text-on-surface text-base sm:text-lg lg:text-xl font-bold">[10th Topper Name]</h3>
                                </div>
                            </div>
                            
                            {/* Class 12 Topper */}
                            <div className="flex items-center gap-5 bg-surface/90 backdrop-blur-md p-4 pr-10 sm:p-5 sm:pr-12 rounded-full border border-outline-variant/30 shadow-sm hover:shadow-md transition-all">
                                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0X3BAApx_JQGglXGKodI3ASug84Xj9RlA9skVKOzTtEYzIH3KvMzngkq8o1DvGI6uUVzTaoItOXN1Ad6hihkFmAaaJuxnrYNgKCdUyvmBHR_gwL3xxUJvuaWBmfRYG9X_AuFuoYnxTsfgmqey-VyNvbMUQBNTpdBDT6inZJPcV1z8bykCY8Txf6E9-Szeledwu0fDWLxX3f-cnOGYiU8qdsxni41PJ1t4BTv0-yHEONUYWFSGGEc0eZcnVIzHPgvEnoGtqlKEfvtJ" alt="12th Topper" className="size-20 sm:size-24 lg:size-28 object-cover rounded-full border-[4px] border-primary/30 shadow-inner" />
                                <div className="text-left flex flex-col justify-center">
                                    <div className="flex items-center gap-3 mb-1.5">
                                        <span className="bg-primary/10 text-primary text-xs sm:text-sm font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">Class XII</span>
                                        <span className="text-primary font-bold text-base sm:text-lg">99.2%</span>
                                    </div>
                                    <h3 className="font-headline-sm text-on-surface text-base sm:text-lg lg:text-xl font-bold">[12th Topper Name]</h3>
                                </div>
                            </div>
                        </div>

                        {/* Floating decorative icons */}
                        <div className="absolute top-20 left-10 md:left-20 animate-float opacity-30 hidden sm:block pointer-events-none">
                            <span className="material-symbols-outlined text-primary" style={{ fontSize: '72px' }}>auto_stories</span>
                        </div>
                        <div className="absolute bottom-32 right-10 md:right-20 animate-float opacity-30 hidden sm:block pointer-events-none" style={{ animationDelay: '2s' }}>
                            <span className="material-symbols-outlined text-secondary" style={{ fontSize: '72px' }}>military_tech</span>
                        </div>
                    </div>
                </section>

                {/* Stats Overview */}
                <section className="py-16 bg-surface-container-low relative z-10">
                    <div className="px-6 md:px-12 lg:px-margin-desktop max-w-container-max mx-auto">
                        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
                            {/* Class 10 Column */}
                            <div className="flex flex-col gap-6">
                                <h3 className="font-headline-md text-secondary text-center mb-2 flex items-center justify-center gap-2">
                                    <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>school</span>
                                    Class X Statistics
                                </h3>
                                <div className="glass-card p-8 rounded-2xl flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-300">
                                    <span className="text-secondary font-display-lg text-5xl mb-2 stat-pulse font-bold">27</span>
                                    <span className="font-label-md text-on-surface-variant uppercase tracking-wider">Class 10: 95% &amp; Above</span>
                                </div>
                                <div className="glass-card p-8 rounded-2xl flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-300">
                                    <span className="text-secondary font-display-lg text-5xl mb-2 stat-pulse font-bold" style={{ animationDelay: '0.5s' }}>63</span>
                                    <span className="font-label-md text-on-surface-variant uppercase tracking-wider">Class 10: 90% &amp; Above</span>
                                </div>
                                <div className="glass-card p-8 rounded-2xl flex flex-col items-center text-center border-t-4 border-tertiary-container hover:-translate-y-1 transition-transform duration-300">
                                    <span className="material-symbols-outlined text-tertiary mb-3" style={{ fontSize: '44px' }}>workspace_premium</span>
                                    <span className="font-label-md text-tertiary font-bold uppercase tracking-widest leading-relaxed">Highest Number of 90+ Scorers in the District (Class 10)</span>
                                </div>
                            </div>

                            {/* Class 12 Column */}
                            <div className="flex flex-col gap-6">
                                <h3 className="font-headline-md text-primary text-center mb-2 flex items-center justify-center gap-2">
                                    <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>psychology</span>
                                    Class XII Statistics
                                </h3>
                                <div className="glass-card p-8 rounded-2xl flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-300">
                                    <span className="text-primary font-display-lg text-5xl mb-2 stat-pulse font-bold" style={{ animationDelay: '0.3s' }}>18</span>
                                    <span className="font-label-md text-on-surface-variant uppercase tracking-wider">Class 12: 90% &amp; Above</span>
                                </div>
                                <div className="glass-card p-8 rounded-2xl flex flex-col items-center text-center border-t-4 border-tertiary-container hover:-translate-y-1 transition-transform duration-300">
                                    <span className="material-symbols-outlined text-tertiary mb-3" style={{ fontSize: '44px' }}>workspace_premium</span>
                                    <span className="font-label-md text-tertiary font-bold uppercase tracking-widest leading-relaxed">Highest Number of 90+ Scorers in the District (Class 12)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Achievement Banner */}
                <section className="py-16">
                    <div className="px-6 md:px-12 lg:px-margin-desktop max-w-container-max mx-auto">
                        <div className="achievement-banner bg-gradient-to-r from-secondary via-primary to-tertiary-container p-8 md:p-12 rounded-3xl relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
                            {/* Animated background circles */}
                            <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                            <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3"></div>
                            <div className="relative z-10 text-center md:text-left">
                                <h2 className="font-display-lg text-white text-3xl md:text-5xl mb-4 font-bold">100% CBSE Board Success</h2>
                                <p className="text-white/80 font-body-lg max-w-xl leading-relaxed">
                                    Every student from Takshashila Public School cleared the board exams with flying colors, a testament to our academic rigor and unwavering commitment to excellence.
                                </p>
                            </div>
                            <div className="relative z-10 flex-shrink-0">
                                <div className="relative">
                                    <span className="material-symbols-outlined text-white/20" style={{ fontSize: '140px' }}>emoji_events</span>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-white font-bold text-3xl">100%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Class Selection */}
                <section className="py-20 bg-surface" id="class-selection">
                    <div className="px-6 md:px-12 lg:px-margin-desktop max-w-container-max mx-auto">
                        <div className="flex flex-col items-center mb-16">
                            <h2 className="font-headline-lg text-on-surface mb-4">Explore Board Results</h2>
                            <div className="h-1 w-24 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Class X Card */}
                            <div 
                                className="group relative overflow-hidden rounded-3xl h-80 flex flex-col justify-end p-8 glass-card cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl transform-gpu isolate"
                                onClick={() => {
                                    class10ToppersRef.current?.scrollIntoView({ behavior: 'smooth' });
                                }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent -z-10 transition-opacity group-hover:from-primary/95"></div>
                                <div className="absolute top-0 right-0 p-8 -z-10 opacity-20 group-hover:opacity-40 transition-all duration-500 group-hover:scale-110">
                                    <span className="material-symbols-outlined" style={{ fontSize: '120px' }}>groups</span>
                                </div>
                                <div className="relative z-10 text-white">
                                    <h3 className="font-headline-lg text-3xl mb-2">Class X Results</h3>
                                    <p className="font-body-md text-white/80 mb-6">View comprehensive performance data, toppers, and analytics for Class 10.</p>
                                    <button className="flex items-center gap-2 font-label-md group-hover:gap-4 transition-all bg-white/20 backdrop-blur-sm px-5 py-2.5 rounded-full hover:bg-white/30">
                                        VIEW TOPPERS <span className="material-symbols-outlined">arrow_forward</span>
                                    </button>
                                </div>
                            </div>
                            {/* Class XII Card */}
                            <div 
                                className="group relative overflow-hidden rounded-3xl h-80 flex flex-col justify-end p-8 glass-card cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl transform-gpu isolate"
                                onClick={() => {
                                    class12ToppersRef.current?.scrollIntoView({ behavior: 'smooth' });
                                }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/40 to-transparent -z-10 transition-opacity group-hover:from-secondary/95"></div>
                                <div className="absolute top-0 right-0 p-8 -z-10 opacity-20 group-hover:opacity-40 transition-all duration-500 group-hover:scale-110">
                                    <span className="material-symbols-outlined" style={{ fontSize: '120px' }}>psychology</span>
                                </div>
                                <div className="relative z-10 text-white">
                                    <h3 className="font-headline-lg text-3xl mb-2">Class XII Results</h3>
                                    <p className="font-body-md text-white/80 mb-6">Analyze performance trends and meet the toppers of Class 12 Boards.</p>
                                    <button className="flex items-center gap-2 font-label-md group-hover:gap-4 transition-all bg-white/20 backdrop-blur-sm px-5 py-2.5 rounded-full hover:bg-white/30">
                                        VIEW TOPPERS <span className="material-symbols-outlined">arrow_forward</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Toppers Section */}
                <section className="py-24 bg-surface-container-low">
                    <div className="px-6 md:px-12 lg:px-margin-desktop max-w-container-max mx-auto">
                        <div className="text-center mb-16">
                            <span className="inline-flex items-center gap-2 font-label-md text-primary uppercase tracking-widest mb-3">
                                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>star</span>
                                Hall of Fame
                                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>star</span>
                            </span>
                            <h2 className="font-headline-lg text-on-surface">Top Performers 2026</h2>
                            <div className="h-1 w-16 bg-gradient-to-r from-primary to-tertiary-container rounded-full mx-auto mt-4"></div>
                        </div>

                        {/* Class XII Toppers */}
                        <div className="mb-20" ref={class12ToppersRef}>
                            <div className="flex items-center gap-4 mb-10">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-secondary" style={{ fontSize: '24px' }}>trophy</span>
                                    <h3 className="font-headline-md text-secondary">Class XII Toppers</h3>
                                </div>
                                <div className="h-px flex-1 bg-gradient-to-r from-outline-variant/30 to-transparent"></div>
                            </div>
                            <div className={`transition-all duration-300 ${showAll12 ? 'max-h-[600px] overflow-y-auto custom-scrollbar pr-2 pb-2' : ''}`}>
                                <div className="toppers-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                    {(showAll12 ? class12Toppers : class12Toppers.slice(0, 4)).map((t, i) => renderTopperCard(t, i))}
                                </div>
                            </div>
                            <div className="mt-8 text-center">
                                <button
                                    onClick={() => setShowAll12(!showAll12)}
                                    className="view-all-btn font-label-md inline-flex items-center gap-2 cursor-pointer"
                                >
                                    {showAll12 ? 'Collapse' : 'View All Toppers'}
                                    <span className="material-symbols-outlined transition-transform duration-300" style={{ transform: showAll12 ? 'rotate(180deg)' : 'rotate(0deg)' }}>expand_more</span>
                                </button>
                            </div>
                        </div>

                        {/* Class X Toppers */}
                        <div ref={class10ToppersRef}>
                            <div className="flex items-center gap-4 mb-10">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary" style={{ fontSize: '24px' }}>trophy</span>
                                    <h3 className="font-headline-md text-primary">Class X Toppers</h3>
                                </div>
                                <div className="h-px flex-1 bg-gradient-to-r from-outline-variant/30 to-transparent"></div>
                            </div>
                            <div className={`transition-all duration-300 ${showAll10 ? 'max-h-[600px] overflow-y-auto custom-scrollbar pr-2 pb-2' : ''}`}>
                                <div className="toppers-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                    {(showAll10 ? class10Toppers : class10Toppers.slice(0, 4)).map((t, i) => renderTopperCard(t, i, 'from-tertiary-container', 'to-primary'))}
                                </div>
                            </div>
                                <div className="mt-8 text-center">
                                    <button
                                        onClick={() => setShowAll10(!showAll10)}
                                        className="view-all-btn font-label-md inline-flex items-center gap-2 cursor-pointer"
                                    >
                                        {showAll10 ? 'Collapse' : 'View All Toppers'}
                                        <span className="material-symbols-outlined transition-transform duration-300" style={{ transform: showAll10 ? 'rotate(180deg)' : 'rotate(0deg)' }}>expand_more</span>
                                    </button>
                                </div>
                        </div>
                    </div>
                </section>

                {/* Performance Analytics */}
                <section className="py-24 bg-surface-container-low border-t border-outline-variant/30" ref={analyticsRef}>
                    <div className="px-6 md:px-12 lg:px-margin-desktop max-w-container-max mx-auto">
                        <div className="text-center mb-16">
                            <span className="inline-flex items-center gap-2 font-label-md text-secondary uppercase tracking-widest mb-3">
                                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>analytics</span>
                                Insights
                            </span>
                            <h2 className="font-headline-lg text-on-surface mb-4">Performance Analytics</h2>
                            <p className="text-on-surface-variant max-w-lg mx-auto">In-depth analysis of academic outcomes and grade distribution.</p>
                            <div className="h-1 w-16 bg-gradient-to-r from-secondary to-primary rounded-full mx-auto mt-4"></div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {/* Bar Chart */}
                            <div className="glass-card p-8 rounded-3xl shadow-sm hover:shadow-lg transition-shadow duration-300 relative">
                                <div className="flex justify-between items-center mb-8">
                                    <h3 className="font-headline-md flex items-center gap-2">
                                        <span className="material-symbols-outlined text-secondary" style={{ fontSize: '24px' }}>bar_chart</span>
                                        Class {chartClass} Grade Distribution
                                    </h3>
                                    <select 
                                        value={chartClass}
                                        onChange={(e) => {
                                            setChartClass(e.target.value);
                                            // Retrigger animation slightly
                                            setAnimatedBars(false);
                                            setTimeout(() => setAnimatedBars(true), 50);
                                        }}
                                        className="bg-surface-container-high text-on-surface font-label-md px-4 py-2 rounded-lg border-none focus:ring-2 focus:ring-primary outline-none cursor-pointer"
                                    >
                                        <option value="X">Class X</option>
                                        <option value="XII">Class XII</option>
                                    </select>
                                </div>
                                <div className="flex gap-2 sm:gap-4 h-64 border-b border-outline-variant/30 pb-2 px-2 sm:px-4 mt-8">
                                    {(chartClass === 'X' ? [
                                        { label: 'A1', height: 85, color: 'bg-secondary', count: '42' },
                                        { label: 'A2', height: 70, color: 'bg-primary', count: '35' },
                                        { label: 'B1', height: 55, color: 'bg-tertiary-container', count: '28' },
                                        { label: 'B2', height: 45, color: 'bg-secondary/80', count: '22' },
                                        { label: 'C1', height: 30, color: 'bg-primary/80', count: '15' },
                                        { label: 'C2', height: 20, color: 'bg-tertiary-container/80', count: '10' },
                                        { label: 'D', height: 10, color: 'bg-on-surface-variant/40', count: '5' },
                                        { label: 'E', height: 2, color: 'bg-error/80', count: '1' },
                                    ] : [
                                        { label: 'A1', height: 75, color: 'bg-secondary', count: '35' },
                                        { label: 'A2', height: 80, color: 'bg-primary', count: '38' },
                                        { label: 'B1', height: 60, color: 'bg-tertiary-container', count: '28' },
                                        { label: 'B2', height: 50, color: 'bg-secondary/80', count: '24' },
                                        { label: 'C1', height: 35, color: 'bg-primary/80', count: '16' },
                                        { label: 'C2', height: 25, color: 'bg-tertiary-container/80', count: '12' },
                                        { label: 'D', height: 15, color: 'bg-on-surface-variant/40', count: '7' },
                                        { label: 'E', height: 4, color: 'bg-error/80', count: '2' },
                                    ]).map((bar, i) => (
                                        <div key={i} className="flex-1 flex flex-col justify-end items-center gap-1 sm:gap-2 group h-full">
                                            <span className="text-[10px] sm:text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-on-surface-variant leading-none">{bar.count}</span>
                                            <div
                                                className={`w-full ${bar.color} rounded-t-lg sm:rounded-t-xl chart-bar shadow-sm hover:brightness-110 transition-all cursor-pointer`}
                                                style={{
                                                    height: animatedBars ? `${bar.height}%` : '0%',
                                                    transition: `height 1s cubic-bezier(0.4, 0, 0.2, 1) ${i * 0.1}s`
                                                }}
                                            ></div>
                                            <span className="text-[10px] sm:text-xs font-label-md font-semibold leading-none">{bar.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Progress Bars */}
                            <div className="glass-card p-8 rounded-3xl shadow-sm hover:shadow-lg transition-shadow duration-300">
                                <h3 className="font-headline-md mb-8 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary" style={{ fontSize: '24px' }}>trending_up</span>
                                    Success Trends
                                </h3>
                                <div className="space-y-8">
                                    {[
                                        { label: 'Distinctions', value: 92, color: 'bg-primary' },
                                        { label: 'First Divisions', value: 98, color: 'bg-secondary' },
                                        { label: 'Pass Rate', value: 100, color: 'bg-tertiary-container' },
                                    ].map((item, i) => (
                                        <div key={i} className="space-y-3">
                                            <div className="flex justify-between text-sm font-label-md">
                                                <span className="font-semibold">{item.label}</span>
                                                <span className="font-bold text-on-surface">{item.value}%</span>
                                            </div>
                                            <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full ${item.color} rounded-full progress-bar-glow`}
                                                    style={{
                                                        width: animatedBars ? `${item.value}%` : '0%',
                                                        transition: `width 1.2s cubic-bezier(0.4, 0, 0.2, 1) ${i * 0.2}s`
                                                    }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}
