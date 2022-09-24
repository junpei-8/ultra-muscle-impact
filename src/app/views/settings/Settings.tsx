import Button from '@suid/material/Button';
import { signInWithPopup } from 'firebase/auth';
import { firebaseAuth, firebaseProvider } from '../../firebase';
import styles from './Settings.module.scss';

const SettingPage = () => {
  const authGoogle = () => {
    return signInWithPopup(firebaseAuth, firebaseProvider);
  };

  return (
    <div class={styles.host}>
      <Button component="div" onClick={authGoogle}>
        <img src="../../../assets/google.svg" />
        Google でログイン
      </Button>
    </div>
  );
};

export default SettingPage;
