import { getMetadata, getJsonLd, siteConfig } from "@/lib/seo-config";
import { 
  Inter, Lora, Roboto, Poppins, Merriweather, Outfit
} from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: 'swap' });
const lora = Lora({ subsets: ["latin"], variable: "--font-lora", display: 'swap' });
const roboto = Roboto({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-roboto", display: 'swap' });
const poppins = Poppins({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-poppins", display: 'swap' });
const merriweather = Merriweather({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-merriweather", display: 'swap' });
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
      <body className={`antialiased ${inter.variable} ${lora.variable} ${roboto.variable} ${poppins.variable} ${merriweather.variable} ${outfit.variable}`}>
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

