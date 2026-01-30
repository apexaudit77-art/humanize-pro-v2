
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from 'firebase/firestore';

const firebaseConfig = { 
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY, 
    authDomain: "humanize-ai-pro.firebaseapp.com", 
    projectId: "studio-6364957707-14ef1", 
    storageBucket: "studio-6364957707-14ef1.firebasestorage.app", 
    messagingSenderId: "1039388373906", 
    appId: "1:1039388373906:web:81753e053e420d501e474b" 
};

let app: FirebaseApp | null = null;
let authInstance: Auth | null = null;
let firestoreInstance: Firestore | null = null;

try {
  if (firebaseConfig.apiKey) {
    app = getApps().length ? getApp() : initializeApp(firebaseConfig);
    authInstance = getAuth(app);
    firestoreInstance = getFirestore(app);
  } else {
    if (typeof window === 'undefined') {
      console.warn('Firebase API key is missing, Firebase features will be disabled on the server.');
    }
  }
} catch (e) {
    console.error("Firebase initialization failed:", e);
}

export const firebaseApp: FirebaseApp | null = app;
export const auth: Auth | null = authInstance; 
export const firestore: Firestore | null = firestoreInstance;
export const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({ 
  prompt: 'select_account' 
});
