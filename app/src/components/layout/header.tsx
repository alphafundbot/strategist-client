
"use client";

import Link from 'next/link';
import { Menu, BrainCircuit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import UserNav from './user-nav';

interface HeaderProps {
  userInitials: string;
  userTier: string;
  onMenuClick: () => void;
}

export default function Header({ userInitials, userTier, onMenuClick }: HeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-card/50 backdrop-blur-sm px-4 md:px-6 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onMenuClick}
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
         <Link href="/dashboard" className="hidden items-center gap-2 font-bold text-lg lg:flex">
            <BrainCircuit className="h-6 w-6 text-primary" />
            <span>Strategist</span>
        </Link>
      </div>
      <UserNav initials={userInitials} tier={userTier} />
    </header>
  );
}
