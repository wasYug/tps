import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { albumsData } from '../../data/galleryData';



export default function GalleryPage() {
    const [selectedYear, setSelectedYear] = useState("2025-26");
    const [appliedYear, setAppliedYear] = useState("2025-26");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [appliedCategory, setAppliedCategory] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 6;

    // Derive all unique categories from the album data
    const allCategories = ["All", ...new Set(albumsData.map(a => a.category))];

    // Compute which categories are available for the currently selected year
    const categoriesForSelectedYear = allCategories.filter(cat => {
        if (cat === "All") return true;
        return albumsData.some(album => album.academicYear === selectedYear && album.category === cat);
    });

    const filteredAlbums = albumsData.filter(album => {
        const yearMatch = appliedYear ? album.academicYear === appliedYear : true;
        const catMatch = appliedCategory === "All" ? true : album.category === appliedCategory;
        return yearMatch && catMatch;
    });

    const totalPages = Math.ceil(filteredAlbums.length / itemsPerPage);
    const currentAlbums = filteredAlbums.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    return (
        <div className="bg-gray-50/50 font-sans text-gray-800 antialiased min-h-screen">
            <Navbar theme="light" />
            
            <div className="pt-24 md:pt-32">
                {/* Main Content Container */}
                <main className="max-w-7xl mx-auto px-4 pb-20 space-y-12">
                    {/* School Gallery - Hero Header Card */}
                    <section className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
                        <div className="max-w-3xl">
                            {/* Small Camera Tagline */}
                            <div className="text-[#e60000] font-bold tracking-wider text-xs uppercase mb-2 flex items-center space-x-1.5">
                                <span>📷</span> <span>School Gallery</span>
                            </div>
                            {/* Main Title */}
                            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-3">
                                School Moments &amp; Memories
                            </h2>
                            {/* Description */}
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Explore the vibrant life at Takshashila Public School through our collection of photographs from
                                annual functions, festivals, sports days and cultural celebrations. Use the filters below to narrow
                                the gallery by academic year and event, then apply them to update the albums shown.
                            </p>
                        </div>

                        {/* Academic Year & Category Filter Box */}
                        <div className="mt-8 bg-gray-50/80 border border-gray-100 rounded-2xl p-5 flex flex-col md:flex-row md:items-end gap-5">
                            {/* Year Selection */}
                            <div className="w-full md:w-1/4 space-y-2">
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">Academic Year</label>
                                <select 
                                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 cursor-pointer outline-none focus:ring-2 focus:ring-[#e60000]/20 focus:border-[#e60000] transition-all" 
                                    value={selectedYear}
                                    onChange={(e) => { setSelectedYear(e.target.value); setSelectedCategory("All"); }}
                                >
                                    <option value="" disabled>Select Year</option>
                                    <option value="2025-26">2025-26</option>
                                    <option value="2024-25">2024-25</option>
                                    <option value="2023-24">2023-24</option>
                                </select>
                            </div>

                            {/* Category Selection */}
                            <div className="w-full md:w-1/3 space-y-2">
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">Category</label>
                                <select 
                                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 cursor-pointer outline-none focus:ring-2 focus:ring-[#e60000]/20 focus:border-[#e60000] transition-all" 
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                >
                                    {categoriesForSelectedYear.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Buttons */}
                            <div className="w-full md:w-auto flex items-center justify-end gap-3 self-end ml-auto">
                                <button 
                                    onClick={() => { setSelectedYear("2025-26"); setSelectedCategory("All"); setAppliedYear("2025-26"); setAppliedCategory("All"); setCurrentPage(1); }}
                                    className="flex items-center space-x-1.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 font-bold text-sm px-4 py-2.5 rounded-xl transition"
                                >
                                    <span>🔄</span> <span>Reset</span>
                                </button>
                                <button 
                                    onClick={() => { setAppliedYear(selectedYear); setAppliedCategory(selectedCategory); setCurrentPage(1); }}
                                    className="flex items-center space-x-1.5 bg-[#e60000] hover:bg-red-700 text-white font-bold text-sm px-5 py-2.5 rounded-xl transition shadow-md shadow-red-200"
                                >
                                    <span>🔍</span> <span>Apply Filters</span>
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* Albums Grid */}
                    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {currentAlbums.length > 0 ? (
                            currentAlbums.map(album => (
                                <Link to={`/gallery/${album.id}`} key={album.id} className="block">
                                    <div className="group h-full bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition">
                                        <div className="relative h-64 bg-gray-100">
                                            <img alt={album.title} src={album.cover} className="w-full h-full object-cover" />
                                            <span className="absolute top-4 left-4 bg-black/60 text-white text-xs font-bold px-2.5 py-1 rounded backdrop-blur-sm">{album.category}</span>
                                            <span className="absolute bottom-4 right-4 bg-black/75 text-white text-xs font-semibold px-2.5 py-1 rounded backdrop-blur-sm">📷 {album.count}</span>
                                        </div>
                                        <div className="p-5">
                                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#e60000] transition">{album.title}</h3>
                                            <p className="text-xs text-gray-500 mt-1">{album.description}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="col-span-full py-10 text-center text-gray-500">
                                No albums found for the selected filters. Try resetting or changing the category.
                            </div>
                        )}
                    </section>


                    {/* Pagination Footer */}
                    {totalPages > 0 && (
                        <section className="border-t border-gray-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                            <span className="text-sm text-gray-500 font-medium">
                                Showing {filteredAlbums.length} albums from {appliedYear} {appliedCategory !== "All" && ` from ${appliedCategory} category`}
                            </span>
                            <div className="flex items-center space-x-2">
                                <button 
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="px-3.5 py-2 border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-sm text-gray-600 transition"
                                >
                                    &lt;
                                </button>

                                {Array.from({ length: totalPages }).map((_, idx) => {
                                    const pageNum = idx + 1;
                                    return (
                                        <button 
                                            key={pageNum}
                                            onClick={() => setCurrentPage(pageNum)}
                                            className={`px-3.5 py-2 rounded-lg text-sm font-bold shadow-sm transition ${
                                                currentPage === pageNum 
                                                    ? "bg-[#e60000] text-white" 
                                                    : "border border-gray-200 hover:bg-gray-50 text-gray-600"
                                            }`}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                })}

                                <button 
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="px-3.5 py-2 border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-sm text-gray-600 transition"
                                >
                                    &gt;
                                </button>
                            </div>
                        </section>
                    )}
                </main>
            </div>
            
            <Footer />
        </div>
    );
}
