import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { SiteFooter } from '@/components/site-footer';
import { VisibilityProvider } from '@/hooks/use-visibility';

export const metadata: Metadata = {
  title: 'Sohn Enterprises',
  description: 'Private Capital. Strategic Deployment. Global Reach.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;600;700&display=swap" rel="stylesheet" />
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
