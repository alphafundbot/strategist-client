
"use client";

import Link from 'next/link';
import { NavItem } from './types';
import * as LucideIcons from 'lucide-react';
import { BrainCircuit } from 'lucide-react';

interface SidebarProps {
  navItems: NavItem[];
  activePath: string;
  className?: string;
}

export default function Sidebar({ navItems, activePath, className }: SidebarProps) {
  return (
    <aside className={`w-64 flex-col border-r border-border bg-card/50 backdrop-blur-sm p-4 ${className}`}>
      <div className="flex items-center gap-2 h-16 px-2">
        <BrainCircuit className="h-8 w-8 text-primary" />
        <span className="font-bold text-xl">Strategist</span>
      </div>
      <nav className="flex-1 mt-4 space-y-1">
        {navItems.map((item) => {
           const Icon = LucideIcons[item.icon as keyof typeof LucideIcons] || LucideIcons['CircleHelp'];
           const isActive = activePath.startsWith(item.path);
          return (
            <Link
              key={item.name}
              href={item.path}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-base font-medium transition-all ${
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
