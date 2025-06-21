import { initializeApp } from 'firebase/app';
import { getAuth, FacebookAuthProvider, TwitterAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const facebookProvider = new FacebookAuthProvider();
export const twitterProvider = new TwitterAuthProvider();

// Configure Facebook provider
facebookProvider.addScope('email');
facebookProvider.addScope('public_profile');

// Configure Twitter provider
twitterProvider.addScope('email');
