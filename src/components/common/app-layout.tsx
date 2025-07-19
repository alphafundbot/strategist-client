
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Home,
  Briefcase,
  LogOut,
  Crown,
  User,
  Eye,
  Rocket,
  Settings,
  Star,
  Gem,
  Shield,
  AreaChart,
  Banknote,
} from 'lucide-react';

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import BottomNav from './bottom-nav';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [tier, setTier] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined') {
      const storedTier = localStorage.getItem('userTier');
      if (storedTier) {
        if (storedTier === 'Omega') {
            console.log("ISO/IEC 27001 Protocol: Omega tier access is restricted to manual-only. Redirecting.");
            localStorage.removeItem('userTier');
            router.push('/');
        } else {
            setTier(storedTier);
        }
      } else {
        router.push('/');
      }
    }
  }, [router]);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('userTier');
    }
    router.push('/');
  };

  const tierIcons: { [key: string]: React.ReactNode } = {
    Omega: <Crown className="h-5 w-5 text-yellow-400" />,
    Gold: <Star className="h-5 w-5 text-amber-500" />,
    Silver: <Gem className="h-5 w-5 text-slate-400" />,
    'Free+': <Shield className="h-5 w-5 text-orange-600" />,
  };
  
  const hasTradingAccess = isClient && (tier === 'Silver' || tier === 'Gold' || tier === 'Omega');
  const hasInvestorAccess = isClient && (tier === 'Silver' || tier === 'Gold' || tier === 'Omega');

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="icon">
              <Link href="/dashboard">
                <Rocket />
              </Link>
            </Button>
            <h2 className="text-lg font-semibold tracking-tight">
              Strategist Systems
            </h2>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname.startsWith('/dashboard')}
                tooltip={{ children: 'Dashboard' }}
              >
                <Link href="/dashboard">
                  <Home />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            {hasTradingAccess && (
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname.startsWith('/trading')}
                  tooltip={{ children: 'Trading' }}
                >
                  <Link href="/trading">
                    <AreaChart />
                    <span>Trading</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )}
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname.startsWith('/transfers')}
                tooltip={{ children: 'Transfers' }}
              >
                <Link href="/transfers">
                  <Banknote />
                  <span>Transfers</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            {hasInvestorAccess && (
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname.startsWith('/investor')}
                  tooltip={{ children: 'Investor Mode' }}
                >
                  <Link href="/investor">
                    <Briefcase />
                    <span>Investor Mode</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )}
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname.startsWith('/settings')}
                tooltip={{ children: 'Settings' }}
              >
                <Link href="/settings">
                  <Settings />
                  <span>Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={handleLogout} tooltip={{ children: 'Logout' }}>
                <LogOut />
                <span>Logout</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-14 items-center justify-between gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
          <SidebarTrigger className="md:hidden" />
          <div className="flex flex-1 items-center justify-end gap-4">
             <div className="flex items-center gap-2">
                {tierIcons[tier] || <User className="h-5 w-5" />}
                <span className="font-medium">{tier || 'User'} Tier</span>
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 sm:px-6 sm:py-4 pb-20 md:pb-4">{children}</main>
        <BottomNav />
      </SidebarInset>
    </SidebarProvider>
  );
}
