import { Link } from "react-router-dom";
import { Home, Compass } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col bg-background font-body-md text-on-surface">
            {/* Main Content */}
            <main className="flex-grow flex flex-col items-center justify-center px-4 relative">
                {/* 404 Watermark + Logo */}
                <div className="relative flex items-center justify-center mb-6 w-full max-w-md h-64">
                    <span className="absolute text-[12rem] md:text-[18rem] font-black text-outline-variant opacity-10 z-0 select-none tracking-tighter">
                        404
                    </span>
                    <img 
                        src="/logo.png" 
                        alt="Takshashila Public School" 
                        className="relative z-10 w-40 md:w-48 object-contain drop-shadow-sm" 
                    />
                </div>

                {/* Heading */}
                <h1 className="text-2xl md:text-3xl font-bold text-error font-headline-lg mb-4 text-center">
                    Oops! Page Not Found
                </h1>

                {/* Paragraph */}
                <p className="text-center text-on-surface-variant max-w-md mb-10 leading-relaxed">
                    The page you are looking for does not exist, may have been moved, or the link may be incorrect.
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
                    <Link 
                        to="/" 
                        className="flex items-center justify-center gap-2 bg-error text-white px-8 py-3 rounded hover:bg-red-800 transition-colors font-medium w-full sm:w-auto shadow-sm"
                    >
                        <Home size={18} />
                        Back to Home
                    </Link>
                    <Link 
                        to="/" 
                        className="flex items-center justify-center gap-2 bg-transparent border border-secondary text-secondary px-8 py-3 rounded hover:bg-secondary/5 transition-colors font-medium w-full sm:w-auto"
                    >
                        <Compass size={18} />
                        Explore Our Website
                    </Link>
                </div>

                {/* Small Divider Line */}
                <div className="w-16 h-[3px] bg-quaternary rounded-full mb-8"></div>
            </main>

            {/* Footer Area */}
            <footer className="w-full border-t border-outline-variant/30 py-6 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between text-sm text-on-surface-variant bg-surface">
                <div className="font-bold text-error mb-4 md:mb-0 text-base font-headline-lg">
                    Takshashila Public School
                </div>
                
                <div className="mb-4 md:mb-0 text-center">
                    © 2026 Takshashila Public School. All Rights Reserved.
                </div>
                
                <div className="flex flex-wrap items-center justify-center gap-6">
                    <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
                    <Link to="/terms-of-use" className="hover:text-primary transition-colors">Terms of Service</Link>
                    <Link to="/contact" className="hover:text-primary transition-colors">Contact Support</Link>
                </div>
            </footer>
        </div>
    );
}
