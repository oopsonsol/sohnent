import ContactPageContent from "@/components/contact-page";
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact',
    description: 'Contact Sohn Enterprises. Qualified inquiries only. Response within 1–2 business days.',
    alternates: {
      canonical: '/contact',
    },
};

export default function ContactPage({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) {
  const success = searchParams?.success === '1';
  return <ContactPageContent initialSuccess={success} />;
}
