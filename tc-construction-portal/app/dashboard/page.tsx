import { Metadata } from 'next';
import DashboardClient from '@/components/dashboard/DashboardClient';

export const metadata: Metadata = {
  title: 'ESG & HVAC Performance Dashboard',
  description: 'Real-time Web3-powered dashboard for ESG compliance tracking and HVAC contract performance monitoring.',
};

export default function DashboardPage() {
  return <DashboardClient />;
}
