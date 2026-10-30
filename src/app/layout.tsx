import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'TransitLive - Bus Tracker', description: 'Real-time public transport tracker' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body style={{ margin: 0, padding: 0 }}>{children}</body></html>;
}