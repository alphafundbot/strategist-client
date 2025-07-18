"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Home,
  Briefcase,
  LogOut,
  Crown,
  User,
  Eye,
  Rocket
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function AppTabs() {
  const pathname = usePathname();
  const router = useRouter();
  const [tier, setTier] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedTier = localStorage.getItem('userTier');
      if (storedTier) {
        setTier(storedTier);
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
    Elite: <Crown className="h-5 w-5 text-yellow-400" />,
    Advisor: <User className="h-5 w-5 text-blue-400" />,
    Observer: <Eye className="h-5 w-5 text-gray-400" />,
  };

  const getActiveTab = () => {
    if (pathname.startsWith('/investor')) return '/investor';
    return '/dashboard';
  }

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 sm:px-6">
       <Link
          href="/dashboard"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Rocket className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">Strategist Systems</span>
        </Link>
      <div className="flex-1 flex justify-center">
        <Tabs value={getActiveTab()} className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="/dashboard" asChild>
                <Link href="/dashboard" className="flex items-center gap-2">
                    <Home className="h-4 w-4" />
                    Dashboard
                </Link>
            </TabsTrigger>
            <TabsTrigger value="/investor" asChild>
                <Link href="/investor" className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    Investor Mode
                </Link>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="lg"
            className="overflow-hidden rounded-full"
          >
            <div className="flex items-center gap-2">
                {tierIcons[tier] || <User className="h-5 w-5" />}
                <span className="font-medium">{tier || 'User'}</span>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
