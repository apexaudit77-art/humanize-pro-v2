'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2, Mail, X } from 'lucide-react';
import Link from 'next/link';
import { signInWithRedirect } from 'firebase/auth';
import { googleProvider } from '@/lib/firebase';
import { useAuth } from '@/firebase';
import { useToast } from '@/hooks/use-toast';

const GoogleIcon = () => (
    <svg
      className="mr-3 h-5 w-5"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
    >
      <path
        fill="#FFC107"
        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
      />
      <path
        fill="#FF3D00"
        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
      />
      <path
        fill="#4CAF50"
        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.223,0-9.65-3.317-11.297-7.962l-6.571,4.819C9.656,39.663,16.318,44,24,44z"
      />
      <path
        fill="#1976D2"
        d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C43.021,36.251,44,30.686,44,24C44,22.659,43.862,21.35,43.611,20.083z"
      />
    </svg>
  );
  
interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const modalConfig = {
    title: "Join for Free Access",
    description: "Sign in to humanize your AI text and bypass detectors instantly.",
    googleButton: "Continue with Google",
    emailButton: "Continue with Email",
    or: "Or",
    signupText: "Don't have an account?",
    signupLink: "Sign up",
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const authInstance = useAuth();
    const { toast } = useToast();
    
    const handleGoogleLogin = async () => {
        if (!authInstance) {
          toast({ variant: 'destructive', title: 'Error', description: 'Authentication service not available.' });
          return;
        }
        setIsGoogleLoading(true);
        try {
            await signInWithRedirect(authInstance, googleProvider);
        } catch (error: any) {
            console.error("Google Sign-In Initiation Error:", error);
            toast({
                variant: 'destructive',
                title: 'Sign In Failed',
                description: error.message || 'Could not initiate Google Sign-In.',
            });
            setIsGoogleLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md bg-card/80 backdrop-blur-lg border-border/50">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-headline text-center">
                        {modalConfig.title}
                    </DialogTitle>
                    <DialogDescription className="text-center text-lg pt-2 text-muted-foreground">
                        {modalConfig.description}
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-4">
                    <Button
                        variant="outline"
                        className="w-full h-12 text-lg"
                        onClick={handleGoogleLogin}
                        disabled={isGoogleLoading}
                    >
                        {isGoogleLoading ? (
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        ) : (
                            <GoogleIcon />
                        )}
                        {modalConfig.googleButton}
                    </Button>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-border/50" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-card px-2 text-muted-foreground">
                                {modalConfig.or}
                            </span>
                        </div>
                    </div>
                    <Button asChild variant="secondary" className="w-full h-12 text-lg">
                        <Link href="/login">
                            <Mail className="mr-3 h-5 w-5" />
                            {modalConfig.emailButton}
                        </Link>
                    </Button>
                </div>

                <p className="text-center text-sm text-muted-foreground">
                    {modalConfig.signupText}{" "}
                    <Link
                        href="/signup"
                        className="font-semibold text-primary hover:underline"
                    >
                        {modalConfig.signupLink}
                    </Link>
                </p>

                <DialogClose asChild>
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
                    >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Close</span>
                    </Button>
                </DialogClose>
            </DialogContent>
        </Dialog>
    );
}
