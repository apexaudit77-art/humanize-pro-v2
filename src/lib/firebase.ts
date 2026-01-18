'use client';

import { getApps, initializeApp, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, type Auth, signInWithRedirect } from 'firebase/auth';
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

// Singleton initialization function to prevent re-initialization
function initializeSingletonApp(config: FirebaseConfig): FirebaseApp {
    const apps = getApps();
    if (apps.length > 0) {
        return apps[0];
    }
    return initializeApp(config);
}

// Initialize the app as a singleton
const app: FirebaseApp = initializeSingletonApp(firebaseConfig);

// Export singleton instances of the services
export const auth: Auth = getAuth(app);
export const firestore: Firestore = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// Set custom parameters to ensure correct client ID and prompt for account selection.
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
  // This function now consistently returns the already-initialized singleton instances.
  // This ensures all parts of the app (providers, server actions) use the same instance.
  const appInstance = getApps().length ? getApp() : initializeApp(config);
  
  return {
    firebaseApp: appInstance,
    auth: getAuth(appInstance),
    firestore: getFirestore(appInstance)
  };
}

export { signInWithRedirect };
