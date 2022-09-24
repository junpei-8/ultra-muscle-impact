import LibraryBooksIcon from '@suid/icons-material/LibraryBooks';
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
            <svg
              class={styles.icon}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                d="M487.379 344.399c-1.771-5.989-5.322-16.856-11.749-36.353-20.818-63.816-134.955-287.63-134.955-287.63C334.247 6.459 319.617-1.53 304.339.245L163.175 17.539c-9.545 1.102-17.748 6.855-22.4 15.272 0 0-16.379 26.823-23.261 43.443-6.861 16.62-2.877 33.24 11.08 42.994 13.957 9.733 80.437 26.363 93.078 20.822 21.059-9.314 31.92-51.4 31.92-51.4l31.898-5.54s13.31 45.85 11.08 86.191c-2.877 49.861.358 70.64 7.24 113.624-8.732 3.006-17.888-8.01-36.929-25.86-59.09-55.4-133.126-33.657-165.987 14.845-8.636-7.316-40.85-11.144-77.779-14.845V512c62.79-7.379 90.848-50.32 90.848-50.32 34.369 6.855 87.372 2.235 131.19-5.177 80.956-13.69 134.735-44.962 134.735-44.962l89.101-30.138c15.277-5.315 23.475-21.721 18.39-37.004z"
                fill="#fff"
              />
            </svg>
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
