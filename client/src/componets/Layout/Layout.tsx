import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className='flex flex-col h-screen'>
      <Navbar />
      <div className='container mx-auto flex-grow'>{children}</div>
      <Footer />
    </div>
  );
};
