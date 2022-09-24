import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

export const firebaseApp = initializeApp({});

export const firebaseAuth = getAuth();

export const firebaseProvider = new GoogleAuthProvider();
