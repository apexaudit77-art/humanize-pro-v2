'use client';

import React, { useMemo, type ReactNode } from 'react';
import { FirebaseProvider } from '@/firebase/provider';
import { initializeFirebase, type FirebaseConfig } from '@/lib/firebase';

interface FirebaseClientProviderProps {
  children: ReactNode;
  config: FirebaseConfig | any;
}

export function FirebaseClientProvider({ children, config }: FirebaseClientProviderProps) {
  const firebaseServices = useMemo(() => {
    // Initialize Firebase on the client side, once per component mount.
    // This is now guaranteed to have the config object.
    return initializeFirebase(config);
  }, [config]);

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
