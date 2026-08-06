import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { albumsData } from '../../data/galleryData';

const handleDownload = async (url, filename, e) => {
    e.stopPropagation();
    try {
        const response = await fetch(url);
        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = filename || 'download.jpg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
        console.error("Download failed:", error);
        window.open(url, '_blank');
    }
};

export default function AlbumViewer() {
    const { albumId } = useParams();
    const album = albumsData.find(a => a.id === albumId);
    
    // Get images for this album, fallback to empty array if none exist
    const images = album?.images || [];
    
    const [selectedImg, setSelectedImg] = useState(null);

    if (!album) {
        return (
            <div className="bg-gray-50/50 font-sans text-gray-800 antialiased min-h-screen">
                <Navbar theme="light" />
                <div className="pt-32 text-center pb-20">
                    <h2 className="text-2xl font-bold">Album not found</h2>
                    <Link to="/gallery" className="text-blue-600 hover:underline mt-4 inline-block">Return to Gallery</Link>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="bg-gray-50/50 font-sans text-gray-800 antialiased min-h-screen">
            <Navbar theme="light" />
            
            <div className="pt-24 md:pt-32 pb-20 px-4 max-w-7xl mx-auto">
                {/* Header Area */}
                <div className="mb-10">
                    <Link to="/gallery" className="text-gray-500 hover:text-[#e60000] font-medium text-sm flex items-center mb-6 transition-colors">
                        <span className="mr-2">←</span> Back to Gallery
                    </Link>
                    <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-10 shadow-sm relative overflow-hidden">
                        <div className="text-[#e60000] font-bold tracking-wider text-xs uppercase mb-2">
                            {album.category}
                        </div>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
                            {album.title}
                        </h1>
                        <p className="text-gray-500 text-sm md:text-base max-w-3xl">
                            {album.description}
                        </p>
                    </div>
                </div>

                {/* Images Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {images.map((src, idx) => (
                        <div 
                            key={idx} 
                            onClick={() => setSelectedImg(src)}
                            className="group cursor-pointer aspect-square bg-gray-100 rounded-2xl overflow-hidden relative shadow-sm hover:shadow-md transition-all"
                        >
                            <img 
                                src={src} 
                                alt={`${album.title} photo ${idx + 1}`} 
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors hidden md:flex items-center justify-center gap-6 opacity-0 group-hover:opacity-100">
                                <span className="text-white font-bold drop-shadow-md hover:scale-110 transition-transform flex items-center gap-1">
                                    🔍 View
                                </span>
                                <button 
                                    onClick={(e) => handleDownload(src, `${album.title.replace(/\s+/g, '_')}_photo_${idx + 1}.jpg`, e)}
                                    className="text-white font-bold drop-shadow-md hover:scale-110 transition-transform flex items-center gap-1"
                                >
                                    ⬇️ Download
                                </button>
                            </div>
                            
                            {/* Mobile Quick Download Button (Only visible on small screens) */}
                            <button 
                                onClick={(e) => handleDownload(src, `${album.title.replace(/\s+/g, '_')}_photo_${idx + 1}.jpg`, e)}
                                className="md:hidden absolute bottom-3 right-3 bg-black/50 hover:bg-black/70 text-white p-2.5 rounded-full backdrop-blur-md shadow-lg flex items-center justify-center"
                            >
                                ⬇️
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Lightbox Modal */}
            {selectedImg && (
                <div 
                    className="fixed inset-0 z-[100] bg-black/90 flex flex-col items-center justify-center p-4 backdrop-blur-sm"
                    onClick={() => setSelectedImg(null)}
                >
                    <button 
                        className="absolute top-6 right-6 text-white bg-black/50 hover:bg-red-600 rounded-full w-10 h-10 flex items-center justify-center transition-colors font-bold text-xl"
                        onClick={(e) => { e.stopPropagation(); setSelectedImg(null); }}
                    >
                        ×
                    </button>
                    <img 
                        src={selectedImg} 
                        alt="Enlarged view" 
                        className="max-w-full max-h-[75vh] md:max-h-[85vh] rounded-lg shadow-2xl"
                        onClick={(e) => e.stopPropagation()} 
                    />
                    
                    {/* Lightbox Download Button */}
                    <div className="mt-6 md:mt-8">
                        <button 
                            onClick={(e) => handleDownload(selectedImg, `${album.title.replace(/\s+/g, '_')}_download.jpg`, e)}
                            className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-6 py-2.5 rounded-full font-semibold flex items-center gap-2 transition-colors backdrop-blur-md shadow-lg"
                        >
                            <span>⬇️</span> Download Image
                        </button>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}
