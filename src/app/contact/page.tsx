import ContactPageContent from "@/components/contact-page";
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact',
    description: 'Contact Sohn Enterprises. Qualified inquiries only. Response within 1–2 business days.',
    alternates: {
      canonical: '/contact',
    },
};

type SearchParams = {
  success?: string;
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const initialSuccess = searchParams?.success === "1";
  return <ContactPageContent initialSuccess={initialSuccess} />;
}