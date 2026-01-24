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

// Safe initialization to prevent reloading error
const app: FirebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig); 

export const firebaseApp: FirebaseApp = app;
export const auth: Auth = getAuth(app); 
export const firestore: Firestore = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({ 
  prompt: 'select_account' 
});
