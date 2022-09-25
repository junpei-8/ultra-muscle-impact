import { signInWithPopup } from 'firebase/auth';
import { firebaseAuth, firebaseProvider } from './firebase';

export const authGoogle = () => signInWithPopup(firebaseAuth, firebaseProvider);
