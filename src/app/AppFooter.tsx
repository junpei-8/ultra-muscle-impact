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
          <div>
            <PersonIcon />
            <Button>マッスル</Button>
          </div>
        </Link>
      </div>
      <div class={styles.navItem}>
        <Link href="/muscle/">
          <div>
            <LibraryBooksIcon />
            <Button>図鑑</Button>
          </div>
        </Link>
      </div>
      <div class={styles.navItem}>
        <Link href="/muscle/">
          <div>
            <SettingsIcon />
            <Button>設定</Button>
          </div>
        </Link>
      </div>
    </footer>
  );
};

export default AppFooter;
