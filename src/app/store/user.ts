import { onAuthStateChanged, User } from 'firebase/auth';
import { createSignal } from 'solid-js';
import { firebaseAuth } from '../../api/firebase';

export const [getAuthedUser, setAuthedUser] = createSignal<User | null>(null);

// Firebase のユーザーの情報が変更されたタイミングで DB からユーザー情報を取得する
onAuthStateChanged(firebaseAuth, async (user) => {
  if (user) {
    setAuthedUser(user);
  } else {
    setAuthedUser(null);
  }
});
