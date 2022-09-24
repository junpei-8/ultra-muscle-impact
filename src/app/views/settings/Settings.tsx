import Button from '@suid/material/Button';
import styles from './TopPage.module.scss';

const SettingPage = () => {
  const authGoogle = () => {};

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
