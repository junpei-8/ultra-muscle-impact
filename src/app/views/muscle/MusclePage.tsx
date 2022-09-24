import Button from '@suid/material/Button';
import TextField from '@suid/material/TextField';
import { Link } from 'solid-app-router';
import { JSX } from 'solid-js';
import { inputNumberOfTimes, inputSetCount } from '../../store/root';
import styles from './MusclePage.module.scss';

const MusclePage = () => {
  const [numberOfTimes, setNumberOfTimes] = inputNumberOfTimes;
  const [setCount, setSetCount] = inputSetCount;

  const updateNumberOfTimes: JSX.EventHandlerUnion<HTMLInputElement, Event> = (
    e,
  ) => {
    setNumberOfTimes(Number((e.target as HTMLInputElement).value));
  };

  const updateSetCount: JSX.EventHandlerUnion<HTMLInputElement, Event> = (
    e,
  ) => {
    setSetCount(Number((e.target as HTMLInputElement).value));
  };

  const submitMenu = () => {
    console.log(numberOfTimes(), setCount());
  };

  return (
    <div class={styles.container}>
      <TextField
        required
        label="メニュー"
        defaultValue="スクワット"
        class={styles.textField}
      />
      <TextField
        required
        label="回数"
        type="number"
        class={styles.textField}
        value={numberOfTimes()}
        onChange={updateNumberOfTimes}
      />
      <TextField
        required
        label="セット数"
        type="number"
        class={styles.textField}
        onChange={updateSetCount}
      />
      <Button variant="contained">
        <Link href="/action">筋トレ開始！</Link>
      </Button>
      <Button onClick={submitMenu}>test</Button>
    </div>
  );
};

export default MusclePage;
