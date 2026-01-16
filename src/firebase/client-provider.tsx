'use client';

import React, { useMemo, type ReactNode, useEffect } from 'react';
import { FirebaseProvider } from '@/firebase/provider';
import { initializeFirebase, type FirebaseConfig } from '@/lib/firebase';
import { getRedirectResult } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';

interface FirebaseClientProviderProps {
  children: ReactNode;
  config: FirebaseConfig | any;
}

export function FirebaseClientProvider({ children, config }: FirebaseClientProviderProps) {
  const firebaseServices = useMemo(() => {
    // Initialize Firebase on the client side, once per component mount.
    return initializeFirebase(config);
  }, [config]);

  const { toast } = useToast();

  useEffect(() => {
    if (firebaseServices.auth) {
      getRedirectResult(firebaseServices.auth)
        .then((result) => {
          if (result) {
            // This is the sign-in result.
            console.log("Redirect sign-in success:", result.user);
            toast({ title: 'Signed in successfully!' });
          }
        })
        .catch((error) => {
          // Handle Errors here.
          console.error("Redirect sign-in error:", error);
          toast({
            variant: 'destructive',
            title: 'Sign-In Failed',
            description: error.message,
          });
        });
    }
  }, [firebaseServices.auth, toast]);


  return (
    <FirebaseProvider
      firebaseApp={firebaseServices.firebaseApp}
      auth={firebaseServices.auth}
      firestore={firebaseServices.firestore}
    >
      {children}
    </FirebaseProvider>
  );
}
