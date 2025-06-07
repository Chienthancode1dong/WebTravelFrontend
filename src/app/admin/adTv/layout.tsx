"use client"
import { TravelProvider } from '../../../hook/TravelContext';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <TravelProvider>
      {children}
    </TravelProvider>
  );
}
