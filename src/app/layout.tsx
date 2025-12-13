import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { SiteFooter } from '@/components/site-footer';
import { VisibilityProvider } from '@/hooks/use-visibility';

const siteConfig = {
  name: "Sohn Enterprises",
  url: "https://sohnenterprises.com",
  description: "Sohn Enterprises is a privately held U.S. investment syndicate with strategic operations in LATAM. We deploy private capital across real estate, structured development, and strategic land positions.",
  ogImage: "https://sohnenterprises.com/og/sohn-enterprises-og.png",
  tagline: "Private Capital • Strategic Deployment • Global Reach",
  markets: "United States • LATAM Markets",
  short_og_description: "Privately held U.S. investment syndicate with strategic operations in LATAM.",
  keywords: "private capital, investment syndicate, real estate investment, structured development, land acquisition, LATAM, United States",
  theme_color: "#D4AF37",
  contact_email: "operations@sohnenterprises.com"
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Private Capital`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords.split(", "),
  robots: {
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
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    url: siteConfig.url,
    title: {
      default: siteConfig.name,
      template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.short_og_description,
    siteName: siteConfig.name,
    type: 'website',
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: {
      default: siteConfig.name,
      template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.short_og_description,
    images: [siteConfig.ogImage],
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
};

export const viewport: Viewport = {
  themeColor: siteConfig.theme_color,
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    contactPoint: {
      '@type': 'ContactPoint',
      email: siteConfig.contact_email,
      contactType: 'customer service',
    },
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;600;700&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="font-body antialiased">
        <div
          className="fixed inset-0 -z-10 pointer-events-none"
          style={{
            backgroundImage: `
              radial-gradient(ellipse at top center, hsla(42,45%,55%,0.09) 0%, transparent 70%),
              radial-gradient(ellipse at top center, hsla(42,45%,55%,0.04) 0%, transparent 55%)
            `,
            backgroundPosition: 'center 0, center 0',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '140% 90vh, 110% 60vh',
            filter: 'blur(0.2px)',
          }}
        />
        <VisibilityProvider>
          <div className="flex flex-col min-h-screen">
            <main className="flex-grow">
              {children}
            </main>
            <SiteFooter />
          </div>
          <Toaster />
        </VisibilityProvider>
      </body>
    </html>
  );
}
