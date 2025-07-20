
"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { auth, db } from '@/lib/firebase/client';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
  tier: z.enum(['Observer', 'Advisor', 'Elite']).optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tier: 'Observer',
    },
  });

  const selectedTier = watch('tier');

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      let userCredential;
      if (isLogin) {
        userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      } else {
        userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
        const user = userCredential.user;
        // Save user tier and other info to Firestore
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          email: user.email,
          tier: data.tier || 'Observer',
          createdAt: new Date(),
        });
      }
      router.push('/dashboard');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Authentication Failed",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuth = async (provider: 'google' | 'github') => {
    setIsLoading(true);
    const authProvider = provider === 'google' ? new GoogleAuthProvider() : new GithubAuthProvider();
    try {
        const result = await signInWithPopup(auth, authProvider);
        const user = result.user;
        // You might want to check if the user is new and set their tier
        // For simplicity, we'll just redirect. A real app might have a tier selection step.
        await setDoc(doc(db, 'users', user.uid), {
            uid: user.uid,
            email: user.email,
            name: user.displayName,
            tier: 'Observer', // Default tier for OAuth
            createdAt: new Date(),
        }, { merge: true }); // Merge to avoid overwriting existing data if user logs in again

        router.push('/dashboard');
    } catch (error: any) {
        toast({
            variant: "destructive",
            title: "Authentication Failed",
            description: error.message,
        });
    } finally {
        setIsLoading(false);
    }
  };


  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...register('email')} />
          {errors.email && <p className="text-destructive text-xs mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" {...register('password')} />
          {errors.password && <p className="text-destructive text-xs mt-1">{errors.password.message}</p>}
        </div>

        {!isLogin && (
          <div>
            <Label htmlFor="tier">Access Tier</Label>
            <Select onValueChange={(value) => setValue('tier', value as 'Observer' | 'Advisor' | 'Elite')} value={selectedTier}>
              <SelectTrigger>
                <SelectValue placeholder="Select your access tier" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Observer">Observer</SelectItem>
                <SelectItem value="Advisor">Advisor</SelectItem>
                <SelectItem value="Elite">Elite</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : (isLogin ? 'Sign In' : 'Create Account')}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>
      
       <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" onClick={() => handleOAuth('google')} disabled={isLoading}>
                Google
            </Button>
            <Button variant="outline" onClick={() => handleOAuth('github')} disabled={isLoading}>
                GitHub
            </Button>
        </div>

      <p className="text-center text-sm text-muted-foreground">
        {isLogin ? "Don't have an account?" : 'Already have an account?'}
        <Button variant="link" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Sign Up' : 'Sign In'}
        </Button>
      </p>
    </div>
  );
}
