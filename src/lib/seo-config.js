// lib/seo-config.js

/**
 * Checks if the current environment is development or staging.
 */
export const isDev = () => {
  return process.env.NODE_ENV !== 'production' || process.env.NEXT_PUBLIC_IS_STAGING === 'true';
};

export const siteConfig = {
  name: "Free ATS-Compliant Resume Builder: Create a Job-Winning CV",
  shortName: "QPkendra Resume Builder",
  url: "https://resume-builder.qpkendra.com",
  ogImage: "https://resume-builder.qpkendra.com/icon.png",
  description: "Create a professional, ATS-compliant resume for free. Our easy-to-use builder helps you get past automated filters and land more interviews with proven templates.",
  keywords: [
    "ats-compliant resume builder", "free resume builder", "online cv maker",
    "professional resume templates", "how to make a resume", "resume for jobs",
    "qpkendra", "best free resume maker", "ats friendly resume"
  ],
  author: "QPkendra",
  twitterHandle: "@qpkendra",
  location: {
    city: "India",
    country: "India",
    serviceArea: "Global"
  }
};

/**
 * Generates dynamic metadata for Next.js Metadata API.
 */
export const getMetadata = (page = {}) => {
  const title = (page.title || siteConfig.name).slice(0, 60);
  const description = (page.description || siteConfig.description).slice(0, 160);
  const path = page.path || "";
  const canonical = `${siteConfig.url}${path}`;

  return {
    title,
    description,
    keywords: page.keywords || siteConfig.keywords,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: canonical,
    },
    robots: page.robots || {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.shortName,
      images: [
        {
          url: page.ogImage || siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: title
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: siteConfig.twitterHandle,
      images: [page.ogImage || siteConfig.ogImage],
    },
    icons: {
      icon: [
        { url: '/icon.png' },
      ],
      shortcut: '/icon.png',
      apple: [
        { url: '/icon.png', sizes: '180x180', type: 'image/png' },
      ],
    },
    manifest: '/manifest.json',
    verification: siteConfig.verification,
    appleWebApp: {
      capable: true,
      statusBarStyle: 'default',
      title: siteConfig.shortName,
    },
    formatDetection: {
      telephone: false,
    },
  };
};

/**
 * Generates JSON-LD Structured Data for AEO/GEO.
 */
export const getJsonLd = (page = {}) => {
  const softwareApp = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": siteConfig.name,
    "alternateName": siteConfig.shortName,
    "description": siteConfig.description,
    "url": siteConfig.url,
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "1250"
    }
  };

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "QPkendra",
    "image": siteConfig.ogImage,
    "url": siteConfig.url,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": siteConfig.location.city,
      "addressCountry": siteConfig.location.country
    },
    "areaServed": siteConfig.location.serviceArea
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteConfig.url
      }
    ]
  };

  if (page.path && page.path !== "/") {
    breadcrumbs.itemListElement.push({
      "@type": "ListItem",
      "position": 2,
      "name": page.title,
      "item": `${siteConfig.url}${page.path}`
    });
  }

  const jsonLd = [softwareApp, localBusiness, breadcrumbs];

  if (page.faqs) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": page.faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    });
  }

  return jsonLd;
};

