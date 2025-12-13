import HomePage from "@/components/home-page";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sohn Enterprises | Private Capital',
  description: 'Sohn Enterprises is a privately held U.S. investment syndicate with strategic operations in LATAM. We deploy private capital across real estate, structured development, and strategic land positions.',
  alternates: {
    canonical: '/',
  },
};

export default function Home() {
  return <HomePage />;
}
