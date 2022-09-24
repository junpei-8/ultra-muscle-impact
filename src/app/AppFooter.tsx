import Button from '@suid/material/Button';
import { Link } from 'solid-app-router';
import styles from './AppFooter.module.scss';

const AppFooter = () => {
  return (
    <footer class={styles.host}>
      <div class={styles.navItem}>
        <Link href="/">
          <Button class={styles.navButton}>マッスル</Button>
        </Link>
      </div>
      <div class={styles.navItem}>
        <Link href="/muscle/">
          <Button class={styles.navButton}>図鑑</Button>
        </Link>
      </div>
    </footer>
  );
};

export default AppFooter;
