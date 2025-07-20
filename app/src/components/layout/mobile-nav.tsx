
"use client";

import Link from 'next/link';
import * as LucideIcons from 'lucide-react';
import { NavItem } from './types';

interface MobileNavProps {
  navItems: NavItem[];
  activePath: string;
}

export default function MobileNav({ navItems, activePath }: MobileNavProps) {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-sm border-t border-border z-40">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const Icon = LucideIcons[item.icon as keyof typeof LucideIcons] || LucideIcons['CircleHelp'];
          const isActive = activePath.startsWith(item.path);

          return (
            <Link
              key={item.name}
              href={item.path}
              className={`flex flex-col items-center justify-center w-full h-full text-sm font-medium transition-colors ${
                isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon className="h-6 w-6 mb-1" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
