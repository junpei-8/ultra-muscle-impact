import LibraryBooksIcon from '@suid/icons-material/LibraryBooks';
import PersonIcon from '@suid/icons-material/Person';
import SettingsIcon from '@suid/icons-material/Settings';
import Button from '@suid/material/Button';
import { Link } from 'solid-app-router';
import styles from './AppFooter.module.scss';

const AppFooter = () => {
  return (
    <footer class={styles.host}>
      <div class={styles.nav}>
        <Link class={styles.link} href="/">
          <Button class={styles.button}>
            <PersonIcon class={styles.icon} />
            <span class={styles.label}>マッスル</span>
          </Button>
        </Link>
      </div>
      <div class={styles.nav}>
        <Link class={styles.link} href="/muscle-collection/">
          <Button class={styles.button}>
            <LibraryBooksIcon class={styles.icon} />
            <span class={styles.label}>図鑑</span>
          </Button>
        </Link>
      </div>
      <div class={styles.nav}>
        <Link class={styles.link} href="/settings/">
          <Button class={styles.button}>
            <SettingsIcon class={styles.icon} />
            <span class={styles.label}>設定</span>
          </Button>
        </Link>
      </div>
    </footer>
  );
};

export default AppFooter;
