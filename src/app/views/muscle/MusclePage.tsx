import Button from '@suid/material/Button';
import TextField from '@suid/material/TextField';
import { useNavigate } from 'solid-app-router';
import { JSX } from 'solid-js';
import * as Tone from 'tone';
import { mic, micRecorder } from '../../store/audio';
import {
  getNumberOfTimes,
  setNumberOfTimes,
  getSetCount,
  setSetCount,
} from '../../store/muscle';
import styles from './MusclePage.module.scss';

const MusclePage = () => {
  const navigate = useNavigate();

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

  const startMuscle = async () => {
    if (!(getNumberOfTimes() === 0 || getSetCount() === 0)) {
      await Tone.start();
      const userMedia = new Tone.UserMedia();
      setMic(userMedia);
      getMic()?.connect(getMicRecorder());
      await getMic()?.open();
      await getMicRecorder().start();

      navigate('/action');
    }
  };

  return (
    <div class={styles.container}>
      <form>
        <TextField
          required
          label="メニュー"
          defaultValue="スクワット"
          class={styles.textField}
          InputProps={{
            readOnly: true,
          }}
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
        <Button variant="contained" onClick={startMuscle}>
          筋トレ開始！
        </Button>
      </form>
    </div>
  );
};

export default MusclePage;
