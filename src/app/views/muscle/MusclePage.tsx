import Button from '@suid/material/Button';
import TextField from '@suid/material/TextField';
import { Link } from 'solid-app-router';
import { JSX } from 'solid-js';
import * as Tone from 'tone';
import { mic, micRecorder } from '../../store/audio';
import { inputNumberOfTimes, inputSetCount } from '../../store/muscle';
import styles from './MusclePage.module.scss';

const MusclePage = () => {
  const [getNumberOfTimes, setNumberOfTimes] = inputNumberOfTimes;
  const [getSetCount, setSetCount] = inputSetCount;
  const [getMic, setMic] = mic;
  const [getMicRecorder, setMicRecorder] = micRecorder;

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

  const requestMicAccess = async () => {
    await Tone.start();
    const userMedia = new Tone.UserMedia();
    setMic(userMedia);
    getMic()?.connect(getMicRecorder());
    await getMic()?.open();
    await getMicRecorder().start();
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
        value={getNumberOfTimes()}
        onChange={updateNumberOfTimes}
      />
      <TextField
        required
        label="セット数"
        type="number"
        class={styles.textField}
        value={getSetCount()}
        onChange={updateSetCount}
      />
      <Button variant="contained" onClick={requestMicAccess}>
        <Link href="/action">筋トレ開始！</Link>
      </Button>
    </div>
  );
};

export default MusclePage;
