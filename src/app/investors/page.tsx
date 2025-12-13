import InvestorsPageContent from "@/components/investors-page";
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Investor Portal',
    description: 'Investor Portal for authorized access to Sohn Enterprises materials and updates.',
    alternates: {
      canonical: '/investors',
    },
};

export default function InvestorsPage() {
    return <InvestorsPageContent />;
}
