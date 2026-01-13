'use client';

import { getApps, initializeApp, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { type FirebaseConfig } from './config';


// IMPORTANT: DO NOT MODIFY THIS FUNCTION
export function initializeFirebase(config: FirebaseConfig) {
  if (getApps().length) {
    return getSdks(getApp());
  }

  if (!config?.apiKey) {
     console.error("Firebase config is not available.");
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

export * from './provider';
export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './non-blocking-updates';
export * from './non-blocking-login';
export * from './errors';
export * from './error-emitter';
