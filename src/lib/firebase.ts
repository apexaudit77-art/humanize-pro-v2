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
    apiKey: "AIzaSyCoq5sjE4AOlk9E2lCsZMKfnWTzRIZ5CL4",
    authDomain: "humanize-ai.ooguy.com",
    projectId: "studio-6364957707-14ef1",
    storageBucket: "studio-6364957707-14ef1.firebasestorage.app",
    messagingSenderId: "1039388373906",
    appId: "1:1039388373906:web:81753e053e420d501e474b"
};

// تهيئة آمنة تمنع خطأ التحميل
const app: FirebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Export singleton instances of the services
export const firebaseApp: FirebaseApp = app;
export const auth: Auth = getAuth(app);
export const firestore: Firestore = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// إعدادات إضافية لضمان عمل الهوية
googleProvider.setCustomParameters({ 
  prompt: 'select_account' 
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
