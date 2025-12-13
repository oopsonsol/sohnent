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
            backgroundImage:
              "radial-gradient(ellipse at top center, hsla(42, 85%, 60%, 0.16) 0%, hsla(42, 85%, 60%, 0.06) 35%, transparent 70%)",
            backgroundPosition: "top center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "140% 75vh",
            filter: "blur(2px)",
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
