import { ArrowLeft, Pencil, Download } from 'lucide-react';
import logo from './o-logo.png';

function Header() {
    return (
        <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
            {/* Key Change: Replaced max-w-4xl mx-auto with w-full to prevent centering */}
            <div className="w-full px-4 h-16 flex items-center justify-between">

                {/* Left side: Arrow and Title */}
                <div className="flex items-center gap-4">
                    <button className="-ml-2 hover:bg-gray-100 rounded-full transition-colors">
                        {/* <ArrowLeft className="text-gray-600" />
                         */}
                        <img 
                    src={logo} 
                    alt="Application Logo" 
                    // Set a specific size for the logo, e.g., 24px (w-6 h-6)
                    className="w-6 h-6 object-contain" 
                />
                    </button>
                    <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2 group cursor-pointer">
                        Resume Builder
                        <Pencil size={16} className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h1>
                </div>

                {/* Right side: Download Button */}
                {/* <button className="download-pdf">
                    <Download size={18} className="inline mr-2" /> Download PDF
                </button> */}
            </div>
        </header>
    )
}

export default Header