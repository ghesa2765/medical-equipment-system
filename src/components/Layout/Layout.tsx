'use client';

import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

interface LayoutProps {
  role: 'user' | 'admin';
  children: React.ReactNode;
}

export default function Layout({ role, children }: LayoutProps) {
  return (
    <>
      <Navbar />
      <div style={{ display: 'flex' }}>
        <Sidebar role={role} />
        <main style={{ marginLeft: role === 'admin' || role === 'user' ? '260px' : '0', padding: '1rem', flex: 1 }}>
          {children}
        </main>
      </div>
      <Footer />
    </>
  );
}
