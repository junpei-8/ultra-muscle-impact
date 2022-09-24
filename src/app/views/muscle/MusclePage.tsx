import Button from '@suid/material/Button';
import TextField from '@suid/material/TextField';
import { Link } from 'solid-app-router';
import styles from './MusclePage.module.scss';

const MusclePage = () => {
  return (
    <div class={styles.container}>
      <TextField
        required
        label="メニュー"
        defaultValue="スクワット"
        class={styles.textField}
      />
      <TextField required label="回数" type="number" class={styles.textField} />
      <TextField
        required
        label="セット数"
        type="number"
        class={styles.textField}
      />
      <Button variant="contained">
        <Link href="/action">筋トレ開始！</Link>
      </Button>
    </div>
  );
};

export default MusclePage;
