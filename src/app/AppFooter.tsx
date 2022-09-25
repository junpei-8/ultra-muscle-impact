import LibraryBooksIcon from '@suid/icons-material/LibraryBooks';
import SettingsIcon from '@suid/icons-material/Settings';
import Button from '@suid/material/Button';
import { Link } from 'solid-app-router';
import { Component } from 'solid-js';
import styles from './AppFooter.module.scss';
import { MuscleIcon } from './components/MuscleIcon';

const AppFooter = () => {
  return (
    <footer class={styles.host}>
      <div class={styles.nav}>
        <FooterButton path="/" Icon={MuscleIcon} label="マッスル" />
      </div>
      <div class={styles.nav}>
        <FooterButton
          path="/muscle-collection"
          Icon={LibraryBooksIcon}
          label="図鑑"
        />
      </div>
      <div class={styles.nav}>
        <FooterButton path="/settings" Icon={SettingsIcon} label="設定" />
      </div>
    </footer>
  );
};

const FooterButton = (props: {
  path: string;
  Icon: Component<{ class: string }>;
  label: string;
  disabled?: boolean;
}) => {
  return (
    <Button class={styles.button} disabled={props.disabled}>
      <Link class={styles.link} href={props.path}>
        <props.Icon class={styles.icon} />
        <span class={styles.label}>{props.label}</span>
      </Link>
    </Button>
  );
};
// hoge
export default AppFooter;
