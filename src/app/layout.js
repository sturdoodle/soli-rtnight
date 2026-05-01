import { getMetadata, getJsonLd, siteConfig } from "@/lib/seo-config";
import { 
  Inter, Lora, DM_Sans, Roboto, Poppins, Montserrat, Playfair_Display,
  Plus_Jakarta_Sans, Space_Grotesk, Merriweather, Figtree, Outfit
} from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: 'swap' });
const lora = Lora({ subsets: ["latin"], variable: "--font-lora", display: 'swap' });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: 'swap' });
const roboto = Roboto({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-roboto", display: 'swap' });
const poppins = Poppins({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-poppins", display: 'swap' });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat", display: 'swap' });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: 'swap' });
const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-plus-jakarta", display: 'swap' });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", display: 'swap' });
const merriweather = Merriweather({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-merriweather", display: 'swap' });
const figtree = Figtree({ subsets: ["latin"], variable: "--font-figtree", display: 'swap' });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", display: 'swap' });

export const viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const generateMetadata = async () => {
  return getMetadata();
};

export default function RootLayout({ children }) {
  const jsonLd = getJsonLd();

  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Preconnect to critical origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`antialiased ${inter.variable} ${lora.variable} ${dmSans.variable} ${roboto.variable} ${poppins.variable} ${montserrat.variable} ${playfair.variable} ${plusJakarta.variable} ${spaceGrotesk.variable} ${merriweather.variable} ${figtree.variable} ${outfit.variable}`}>
        <Providers>
          <div id="root" className="min-h-screen flex flex-col">
            <main className="flex-grow">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}

