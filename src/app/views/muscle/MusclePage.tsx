import Button from '@suid/material/Button';
import TextField from '@suid/material/TextField';
import { useNavigate } from 'solid-app-router';
import * as Tone from 'tone';
import { mic, micRecorder } from '../../store/audio';
import { getNumberOfTimes, setNumberOfTimes } from '../../store/muscle';
import { setIsShowRootActions } from '../../store/root';
import styles from './MusclePage.module.scss';

const MusclePage = () => {
  // Header と Footer を表示させる
  setIsShowRootActions(true);

  const navigate = useNavigate();

  const [getMic, setMic] = mic;
  const [getMicRecorder] = micRecorder;

  const updateNumberOfTimes = (event: Event) => {
    setNumberOfTimes(Number((event.target as HTMLInputElement).value));
  };

  const startMuscle = async () => {
    await Tone.start();

    if (getNumberOfTimes() > 0) {
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
        <Button variant="contained" onClick={startMuscle}>
          筋トレ開始！
        </Button>
      </form>
    </div>
  );
};

export default MusclePage;
