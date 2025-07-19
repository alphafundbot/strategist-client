
"use client";

import { useState, ReactNode } from 'react';
import Sidebar from './sidebar';
import Header from './header';
import MobileNav from './mobile-nav';
import { NavItem } from './types';

interface AppLayoutProps {
  userInitials: string;
  userTier: string;
  navItems: NavItem[];
  bottomNavItems: NavItem[];
  activePath: string;
  children: ReactNode;
}

export default function AppLayout({
  userInitials,
  userTier,
  navItems,
  bottomNavItems,
  activePath,
  children,
}: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background">
      <Sidebar 
        navItems={navItems} 
        activePath={activePath} 
        className="hidden lg:flex" 
      />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Header 
          userInitials={userInitials} 
          userTier={userTier}
          onMenuClick={() => setSidebarOpen(!sidebarOpen)} 
        />
        
        <main className="flex-1 overflow-y-auto bg-background text-foreground">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>
      </div>
      
      <MobileNav 
        navItems={bottomNavItems}
        activePath={activePath}
      />
    </div>
  );
}
