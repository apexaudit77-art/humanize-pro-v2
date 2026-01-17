'use client';

import { getApps, initializeApp, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';

export interface FirebaseConfig {
  projectId?: string;
  appId?: string;
  apiKey?: string;
  authDomain?: string;
  messagingSenderId?: string;
  storageBucket?: string;
  measurementId?: string;
};

// This is the single source of truth for the Firebase config.
export const firebaseConfig: FirebaseConfig = {
    apiKey: "AIzaSyCoq5sje4AOlk9E2lCsZMKfnWTzRIZ5CL4",
    authDomain: "studio-6364957707-14ef1.firebaseapp.com",
    projectId: "studio-6364957707-14ef1",
    storageBucket: "studio-6364957707-14ef1.firebasestorage.app",
    messagingSenderId: "1039388373906",
    appId: "1:1039388373906:web:81753e053e420d501e474b"
};

const app: FirebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth: Auth = getAuth(app);
export const firestore: Firestore = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// Always prompt for account selection and set custom Client ID
googleProvider.setCustomParameters({
  prompt: 'select_account',
  client_id: '1039388373906-4heu6925l8v0h3ctqaqu6p4nrtq7kocv.apps.googleusercontent.com'
});

interface FirebaseServices {
    firebaseApp: FirebaseApp | null;
    auth: Auth | null;
    firestore: Firestore | null;
}

export function initializeFirebase(config: FirebaseConfig = firebaseConfig): FirebaseServices {
  if (getApps().length) {
    const existingApp = getApp();
    return {
      firebaseApp: existingApp,
      auth: getAuth(existingApp),
      firestore: getFirestore(existingApp)
    };
  }

  if (!config?.apiKey) {
     console.error("Firebase config is missing API Key. Initialization failed.");
    return { firebaseApp: null, auth: null, firestore: null };
  }

  const newApp = initializeApp(config);
  return {
    firebaseApp: newApp,
    auth: getAuth(newApp),
    firestore: getFirestore(newApp)
  };
}
