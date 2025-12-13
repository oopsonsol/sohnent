import FirmProfilePageContent from "@/components/firm-profile-page";
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Firm Profile',
    description: 'Firm profile for Sohn Enterprises — a privately held U.S. investment syndicate with strategic operations in LATAM. Discipline-driven capital deployment and institutional-grade execution.',
    alternates: {
      canonical: '/firm-profile',
    },
};

export default function FirmProfilePage() {
  return <FirmProfilePageContent />;
}
