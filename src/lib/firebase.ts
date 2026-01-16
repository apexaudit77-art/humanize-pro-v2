'use client';

import { getApps, initializeApp, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

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
    appId: "1:1039388373906:web:81753e053e420d501e474b",
    measurementId: "G-FR6P8X409N"
};

// IMPORTANT: DO NOT MODIFY THIS FUNCTION
export function initializeFirebase(config: FirebaseConfig = firebaseConfig) {
  if (getApps().length) {
    return getSdks(getApp());
  }

  if (!config?.apiKey) {
     console.error("Firebase config is missing API Key. Initialization failed.");
    // Return a mock structure to prevent crashing the app
    return { firebaseApp: null, auth: null, firestore: null };
  }

  const firebaseApp = initializeApp(config);
  return getSdks(firebaseApp);
}

export function getSdks(firebaseApp: FirebaseApp) {
  return {
    firebaseApp,
    auth: getAuth(firebaseApp),
    firestore: getFirestore(firebaseApp)
  };
}
