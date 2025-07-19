
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
  Settings,
  Star,
  Gem,
  Shield,
  AreaChart,
  Banknote,
  TrendingUp,
  Wallet,
  Activity,
  ShieldAlert,
  Gauge,
  Landmark,
  CandlestickChart,
  Zap,
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
import { StrategistLogo } from './strategist-logo';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '../settings/theme-toggle';

const strategistData: { [key: string]: any } = {
    "Free+": { fingerprint: "Alpha-1", vault: 1000.00, roi: 8, growth: 0.2, volatility: 0.89, entropy: 0.12 },
    "Silver": { fingerprint: "Beta-3", vault: 12450.00, roi: 12, growth: 2.1, volatility: 0.45, entropy: 0.09 },
    "Gold": { fingerprint: "Gamma-6", vault: 28900.00, roi: 18, growth: 4.8, volatility: 0.21, entropy: 0.05 },
    "Omega": { fingerprint: "Omega-9", vault: 102000.00, roi: 20, growth: 12.3, volatility: 0.08, entropy: 0.02 },
}

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
  
  const currentData = strategistData[tier] || strategistData['Free+'];
  const showSidebar = pathname !== '/onboarding';

  return (
    <SidebarProvider>
      {showSidebar && (
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost" size="icon">
                <Link href="/dashboard">
                  <StrategistLogo className="text-sidebar-foreground" />
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
               <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname.startsWith('/vaults')}
                  tooltip={{ children: 'Collective Vaults' }}
                >
                  <Link href="/vaults">
                    <Landmark />
                    <span>Vaults</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
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
               <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname.startsWith('/connect')}
                  tooltip={{ children: 'Connect' }}
                >
                  <Link href="/connect">
                    <Zap />
                    <span>Connect</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname.startsWith('/assets')}
                  tooltip={{ children: 'Assets' }}
                >
                  <Link href="/assets">
                    <CandlestickChart />
                    <span>Assets</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
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
      )}
      <SidebarInset>
        <div className="flex flex-col h-screen" data-testid="app-layout-container">
          <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between gap-6 border-b bg-background/80 px-6 backdrop-blur-md">
            <SidebarTrigger className="md:hidden" />
            <div className="flex flex-1 items-center justify-end gap-4 md:gap-6">
              <div className="hidden md:flex items-center gap-6 text-sm font-medium">
                  <div className="flex items-center gap-2">
                      <Wallet className="h-5 w-5 text-muted-foreground" />
                      <span>${currentData.vault.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-muted-foreground" />
                      <span>{currentData.roi > 0 ? '+' : ''}{currentData.roi}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                      <Activity className="h-5 w-5 text-muted-foreground" />
                      <span>{currentData.growth > 0 ? '+' : ''}{currentData.growth}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                      <ShieldAlert className="h-5 w-5 text-muted-foreground" />
                      <span>{currentData.volatility}</span>
                  </div>
                  <div className="flex items-center gap-2">
                      <Gauge className="h-5 w-5 text-muted-foreground" />
                      <span>{currentData.entropy}</span>
                  </div>
              </div>
              <ThemeToggle />
              <div className="flex items-center gap-2">
                  {tierIcons[tier] || <User className="h-5 w-5" />}
                  <div className="flex flex-col text-left">
                    <span className="font-semibold text-sm">{currentData.fingerprint}</span>
                    <span className="text-xs text-muted-foreground">{tier || 'User'} Tier</span>
                  </div>
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto p-6 lg:p-8 pb-20 md:pb-8">{children}</main>
        </div>
        {showSidebar && <BottomNav />}
      </SidebarInset>
    </SidebarProvider>
  );
}
