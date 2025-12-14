import ContactPageContent from "@/components/contact-page";
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact',
    description: 'Contact Sohn Enterprises. Qualified inquiries only. Response within 1–2 business days.',
    alternates: {
      canonical: '/contact',
    },
};

export default function ContactPage() {
  return <ContactPageContent />;
}
