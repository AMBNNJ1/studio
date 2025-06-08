import type { Metadata } from 'next';
import HomeClient from '@/components/home';

export const metadata: Metadata = {
  title: 'Become a Profitable Trader',
};

export default function Home() {
  return <HomeClient />;
}
