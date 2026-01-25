'use client';

import React, { type ReactNode, useEffect } from 'react';
import { FirebaseProvider } from '@/firebase/provider';
import { firebaseApp, auth, firestore } from '@/lib/firebase';
import { getRedirectResult } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

interface FirebaseClientProviderProps {
  children: ReactNode;
}

export function FirebaseClientProvider({ children }: FirebaseClientProviderProps) {
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    // `auth` is a stable singleton import, so it can be used directly.
    getRedirectResult(auth)
      .then((result) => {
        if (result) {
          // This is the sign-in result.
          console.log("Redirect sign-in success:", result.user);
          toast({ title: 'Signed in successfully!' });
          router.push('/en/humanize-ai');
        }
      })
      .catch((error) => {
        // Handle Errors here.
        console.error("Firebase Redirect Result Error:", error.code, error.message);
        toast({
          variant: 'destructive',
          title: 'Sign-In Failed After Redirect',
          description: `Error: ${error.message}`,
        });
      });
  }, [toast, router]);


  return (
    <FirebaseProvider
      firebaseApp={firebaseApp}
      auth={auth}
      firestore={firestore}
    >
      {children}
    </FirebaseProvider>
  );
}
