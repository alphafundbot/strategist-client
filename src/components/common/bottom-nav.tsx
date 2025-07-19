
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, AreaChart, Banknote, Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

export default function BottomNav() {
  const pathname = usePathname();
  const [tier, setTier] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined') {
      const storedTier = localStorage.getItem('userTier') || '';
      setTier(storedTier);
    }
  }, []);

  const navItems = [
    { href: '/dashboard', icon: Home, label: 'Dashboard', tier: 'all' },
    { href: '/trading', icon: AreaChart, label: 'Trading', tier: ['Silver', 'Gold', 'Omega'] },
    { href: '/transfers', icon: Banknote, label: 'Transfers', tier: 'all' },
    { href: '/investor', icon: Briefcase, label: 'Investor', tier: ['Silver', 'Gold', 'Omega'] },
  ];

  const filteredNavItems = isClient ? navItems.filter(item => {
    if (item.tier === 'all') return true;
    if (Array.isArray(item.tier)) {
      return item.tier.includes(tier);
    }
    return false;
  }) : [];


  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-20 border-t bg-background/95 backdrop-blur-sm">
      <div className="flex h-16 items-center justify-around">
        {filteredNavItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center gap-1 text-xs transition-colors w-1/4',
                isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary'
              )}
            >
              <item.icon className="h-6 w-6" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
