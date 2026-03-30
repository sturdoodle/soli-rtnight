import { ArrowLeft, Pencil, Download, Sparkles } from 'lucide-react';
import logo from './o-logo.png';

function Header() {
    return (
        <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
            {/* Key Change: Replaced max-w-4xl mx-auto with w-full to prevent centering */}
            <div className="w-full px-4 h-16 flex items-center justify-between">

                {/* Left side: Arrow and Title */}
                <div className="flex items-center gap-4">
                    <button className="-ml-2 hover:bg-gray-100 rounded-full transition-colors">
                        <img 
                    src={logo} 
                    alt="Application Logo" 
                    // Set a specific size for the logo, e.g., 24px (w-6 h-6)
                    className="w-6 h-6 object-contain" 
                />
                    </button>
                    <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2 group cursor-pointer">
                        Resume Builder
                    </h1>
                </div>

                {/* Right side: Modern toggle */}
                <div className="flex items-center gap-4">
                    <a 
                        href="#/modern" 
                        className="flex items-center gap-2 bg-sage-50 text-sage-600 px-4 py-2 rounded-full font-semibold border border-sage-100 hover:bg-sage-100 transition-all text-sm shadow-sm"
                    >
                        <Sparkles size={16} />
                        Switch to Modern UI
                    </a>
                </div>
            </div>
        </header>
    )
}

export default Header