
"use client";

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase/client';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';

interface UserNavProps {
  initials: string;
  tier: string;
}

const getTierColor = (tier: string) => {
    switch(tier.toLowerCase()) {
        case 'elite': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
        case 'advisor': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
        case 'observer': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
        default: return 'bg-primary/20 text-primary border-primary/30';
    }
}

export default function UserNav({ initials, tier }: UserNavProps) {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut(auth);
    router.push('/');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-primary text-primary-foreground font-bold">
                {initials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">Strategist</p>
             <div className="flex items-center pt-1">
                <Badge className={`text-xs font-semibold ${getTierColor(tier)}`}>
                    {tier} Tier
                </Badge>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
