import React, { useState, useMemo, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Search, ChevronDown, CheckCircle, ArrowUpRight, ArrowLeft, ArrowRight, LayoutGrid, Calendar, ChevronRight, X } from 'lucide-react';

const newsArticles = [
  {
    id: 1,
    title: 'Graduation parade fills campus',
    date: 'May 29, 2024',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZ2mEcAdMzGixB_UgyHsr_ttKuBLjRvRPeEgtRUENWSXiq2JazDkGO9AE_gpCwhxfpodHTuMpSBER1MGck35ZzRQvD8IIWPsLphQmcycKXeOyB0dEQg2IRCjPCVWf6OQkiYGhpBRJtqELwZuTchPU05BWcqmoRob-Rf4N4xz6nUJ5yE6DXYA2BhR5BxM-XhHg71dcfYRH-fKDeR9idaBcBA2Qx1GFPvYhR3wxtxBx9clqJhkeQDV_0buJh5PZk8SYIqVYerl8c2Q1t'
  },
  {
    id: 2,
    title: 'Researchers test new lab methods',
    date: 'November 18, 2024',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAO18r7s0lbFJLTtSUUkSz9bDgyoFkq__hG09QG2SiOsg2unxHDxd2dxARC-lQO_mb49h71CWn1IP-UyLWM6zD9rvLW1rwE9n7kTxGm6opc0ATzbTAxq-hEfUN4TPl48ZNEzlD-wipq4VwpiI9K9hMq_2uDtEaBR8CmzUO-CZmjeXnrk9159I-6Z3ERD1kLWACZw7RX7RK4kvyk97Kss3pCDGpJnx8BVHq-zzCpHbIRmWWcx-lKuKw38IYcimE4k8BRrjx6i3WPvjRV'
  },
  {
    id: 3,
    title: 'Football team seals victory',
    date: 'October 12, 2024',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnAJzTYv1BhlPXk3BTvaAlUcoMDEV2HZAKLlgLtqSchGHZC157MSA4HUfrH6RATFJa8c2MJtxmSpX6vqtfAyoP9ym_47tR8JyrQQruv18I2SXZH1ZsvrxDH-upammaK-qvhGQ_oOFYeZqP9NaOLxUx-V7cuckK6VJD_C2v_8VaIys33qsrsJlbrOMDsFmIejQgCrgO9OZ_Xro03i7Bf-8p3EXZg5gGvB9s8iV0yneTk1WCD5UVocAAVtgCaO-5yhuKd4SQByLYko49'
  },
  {
    id: 4,
    title: 'Students celebrate scholarship wins',
    date: 'September 05, 2024',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBw6TMcqM6-JH3MibQABSPFdhkP1FHhbRLBxSS_YUsJGcDDbaJBZ0S_RxhxC1XfBcZEa-daUZZ6T8IUjN7R5rP3KYAi8tQbesjRGjwr3R9etZVctHz3Szge2sB4P8LE6iR2p0vv2hTKCx1zodJwQdCK45vID4BziDi34ZbrB4zjT64Ex4-2KWmlytv45B58JcLcT-GTuWseSnvryucvFUGOwbBAZv0Rfo2S0bUygH1zhCsaDNTmtzwKaNEe4AkpFP_THW9hq5Z7LuFx'
  },
  {
    id: 5,
    title: 'Neighbors launch service project',
    date: 'August 21, 2024',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4hd-0kxqqX3v4RFr11fS3QS4TBWjtv0dzjGw-ZBTc1w4qOcL2-wU3nv8L7XCxZW9iMMSofxgv1mrsrBXz_w31uvl63CyRt8xF6FkZ3myxx0gEurr0HuIqboISH4PjjF10oACAfT2CUIwUVEWj7g7OJqZxoc1AspTMu1rJGWg1oGE7kfHR0rkOc8a0-mpHOfH_J5GfvPVRn0fHVpoVy5enRP9HYfuilyQ01aMmTZlQwdPSwMz-Falj6Bs056PcqtHfuV3kdzr3iF2j'
  },
  {
    id: 6,
    title: 'Gallery opens student showcase',
    date: 'June 15, 2024',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxZri4lWy19MY3mGNs-qHgS93Rs4wgVesPMeYWpQltDLMwHiEGU6Lo-ISH5FBC7tXIG7wm4otvlMXwYM8RmoJ1QgTeEMORPMsrxLFALajo35JB8kqsz4FX_R-OqFDWWWDc4Ho47eic7qIMXcsvU3Hp0ySemsb_D-TiuMYI-jHOWqX-j8CZYAOaXckJf2fsF15DtUsuvtS9X9S1vhhEcB5LGGiJeq-1KJ6eQTTJvYETVLVf7P4Xse86gSNLsFGgST4QX2AXewSdcg-w'
  },
  {
    id: 7,
    title: 'Robotics club builds prototype',
    date: 'May 10, 2024',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCH4idfXMDQKWp7UX7O6DrWBFwpdCFzbMlx6rqaYfclR7epYls6cdYMcZDgzgm7u3vVb313suHrJVz-twmglZoCAUoQOXVKj7VekRibObA-QwnOl6BxAQLPuN1M9xvvkF4CQrNbtVI6CfBn0yfAqbV_1vjc1i9JDpaLiuTogaYL8wfkwSWNaGQyO7JdMiAtY7Gim_vtvd1JgShVtBvrzCNO_Gf7ok9oQboKs-LwZ1fgnVvkGquoHkTwnRim3v-ol9xs9iXHQL227pw8'
  },
  {
    id: 8,
    title: 'Classroom lesson sparks curiosity',
    date: 'April 02, 2024',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3yWvBXDuTMYL6GD5f6gnTX-CUKxpI5_2kjsfKlhhH_jfeI1zCicjD0mDTEnbYtVVIsph5ie9ZXR-PooLEUIoUOyZoNjKuNB815fKws0dBrQhY4xeXpXM_sLJEVI8Jn-n_KkjSrm43h1VsxfN7zK4pmBntlVVNBC6yPmVP4Xs29oNMI9eaEnv6Yh24INhNFmPxx0F4v_iKN2DGQ4CDlmNDQj20RMYQglx73VPCafQH9AKk0oIamOpRIX0E_yV2TBJKWCTMmr0eDTsJ'
  }
];

const News = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const itemsPerPage = 4;

  const filteredArticles = useMemo(() => {
    return newsArticles.filter(article => {
      const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            article.date.toLowerCase().includes(searchQuery.toLowerCase());
      
      let matchesYear = true;
      if (selectedYear !== 'All') {
        if (selectedYear === 'Older') {
          matchesYear = !['2026', '2025', '2024', '2023'].some(y => article.date.includes(y));
        } else {
          matchesYear = article.date.includes(selectedYear);
        }
      }
      return matchesSearch && matchesYear;
    });
  }, [searchQuery, selectedYear]);

  const totalPages = Math.max(1, Math.ceil(filteredArticles.length / itemsPerPage));
  
  const currentArticles = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredArticles.slice(start, start + itemsPerPage);
  }, [filteredArticles, currentPage, itemsPerPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedYear]);

  return (
    <div className="bg-white text-gray-900 font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[650px] flex items-center justify-center text-center text-white">
        <div className="absolute inset-0 z-0">
          <img
            alt="Archive Background"
            className="w-full h-full object-cover"
            src="/image.png"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative z-10 max-w-3xl px-4">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm mb-6">
            <LayoutGrid className="w-4 h-4 mr-2" />
            <span className="text-xs font-bold tracking-widest uppercase">TPS News</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 font-serif">TPS News</h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
            Explore our newspaper publications and media coverage capturing the finest moments of academic excellence, preserved in print since 1923.
          </p>
          <div className="flex justify-center items-center space-x-6 text-sm font-medium">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
              240+ Editions
            </div>
            <div className="h-4 w-px bg-white/30"></div>
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Est. 2000
            </div>
          </div>
        </div>
      </section>

      {/* Archive Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <div className="flex items-center mb-4">
            <div className="w-8 h-px bg-black mr-3"></div>
            <span className="text-xs font-bold tracking-[0.2em] uppercase">Digital Repository</span>
          </div>
          <h2 className="text-4xl font-bold mb-6 font-serif">Newspaper Archive</h2>
          <p className="text-gray-600 max-w-3xl leading-relaxed">
            Welcome to our digital repository of history. Our collection showcases the authentic voice of the press, documenting student success stories, athletic triumphs, and the significant milestones that define The Perfect School's journey through the decades.
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white border border-gray-200 rounded-3xl p-4 shadow-sm mb-12">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="relative flex-grow">
              <span className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </span>
              <input
                className="w-full pl-12 pr-4 py-3 border-gray-100 rounded-2xl bg-gray-50 focus:ring-black focus:border-black text-sm outline-none"
                placeholder="Search by name, year, or month..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {/* Year Tags */}
            <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
              <button 
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${selectedYear === 'All' ? 'bg-black text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                onClick={() => setSelectedYear('All')}
              >
                All
              </button>
              {['2026', '2025', '2024', '2023', 'Older'].map((year) => (
                <button
                  key={year}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${selectedYear === year ? 'bg-black text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  onClick={() => setSelectedYear(year)}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Archive Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {currentArticles.length > 0 ? currentArticles.map((article) => (
            <article
              key={article.id}
              className="bg-white border border-gray-200 rounded-3xl overflow-hidden flex flex-col transition-all duration-200 ease-in-out hover:-translate-y-1 hover:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)] cursor-pointer"
              onClick={() => setSelectedImage(article.image)}
            >
              <div className="relative h-48">
                <img
                  alt={article.title}
                  className="w-full h-full object-cover"
                  src={article.image}
                />
                <div className="absolute top-4 left-4 flex items-center space-x-2">
                  <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded flex items-center">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    VERIFIED
                  </span>
                </div>
                <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md text-gray-600 hover:text-black transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="font-serif text-lg font-bold mb-4 leading-snug">
                  {article.title}
                </h3>
                <div className="flex items-center text-gray-400 text-xs mt-auto">
                  <Calendar className="w-4 h-4 mr-1.5" />
                  {article.date}
                </div>
              </div>
            </article>
          )) : (
            <div className="col-span-full py-12 text-center text-gray-500">
              No articles found matching your criteria.
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-16 flex justify-center items-center space-x-2">
            <button 
              className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium transition-colors ${currentPage === i + 1 ? 'bg-black text-white border border-black' : 'border border-gray-100 text-gray-600 hover:bg-gray-50'}`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            
            <button 
              className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-6xl w-full h-full flex items-center justify-center">
            <button 
              className="absolute top-4 right-4 md:top-8 md:right-8 text-white hover:text-gray-300 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-50 backdrop-blur-md"
              onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
            >
              <X className="w-6 h-6" />
            </button>
            <img 
              src={selectedImage} 
              alt="Enlarged view" 
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl" 
              onClick={(e) => e.stopPropagation()} 
            />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default News;
