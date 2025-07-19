import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getFunctions, Functions } from 'firebase/functions';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
let app: FirebaseApp;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const auth: Auth = getAuth(app);
const firestore: Firestore = getFirestore(app);
const functions: Functions = getFunctions(app);

// Connect to emulators in development
if (process.env.NODE_ENV === 'development') {
    // Note: You may need to import these functions from 'firebase/*'
    // depending on your specific Firebase SDK version.
    import('firebase/auth').then(({ connectAuthEmulator }) => {
        // connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
    });
    import('firebase/firestore').then(({ connectFirestoreEmulator }) => {
        // connectFirestoreEmulator(firestore, 'localhost', 8080);
    });
    import('firebase/functions').then(({ connectFunctionsEmulator }) => {
        // connectFunctionsEmulator(functions, 'localhost', 5001);
    });
}


export { app, auth, firestore, functions };
