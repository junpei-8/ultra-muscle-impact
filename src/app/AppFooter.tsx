import LibraryBooksIcon from '@suid/icons-material/LibraryBooks';
import PersonIcon from '@suid/icons-material/Person';
import SettingsIcon from '@suid/icons-material/Settings';
import Button from '@suid/material/Button';
import { Link } from 'solid-app-router';
import styles from './AppFooter.module.scss';

const AppFooter = () => {
  return (
    <footer class={styles.host}>
      <div class={styles.navItem}>
        <Link href="/">
          <Button>
            <PersonIcon />
            <p>マッスル</p>
          </Button>
        </Link>
      </div>
      <div class={styles.navItem}>
        <Link href="/muscle/">
          <Button>
            <LibraryBooksIcon />
            <p>図鑑</p>
          </Button>
        </Link>
      </div>
      <div class={styles.navItem}>
        <Link href="/muscle/">
          <Button>
            <SettingsIcon />
            <p>設定</p>
          </Button>
        </Link>
      </div>
    </footer>
  );
};

export default AppFooter;
