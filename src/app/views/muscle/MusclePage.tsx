import Button from '@suid/material/Button';
import TextField from '@suid/material/TextField';
import ToggleButton from '@suid/material/ToggleButton';
import ToggleButtonGroup from '@suid/material/ToggleButtonGroup';
import { useNavigate } from 'solid-app-router';
import * as Tone from 'tone';
import { mic, micRecorder } from '../../store/audio';
import { getMaxCount, setMaxCount } from '../../store/muscle';
import { setIsShowRootActions } from '../../store/root';
import styles from './MusclePage.module.scss';

const MusclePage = () => {
  // Header と Footer を表示させる
  setIsShowRootActions(true);

  const navigate = useNavigate();

  const [getMic, setMic] = mic;
  const [getMicRecorder] = micRecorder;

  const updateMaxCount = (_, value: number) => {
    if (value) setMaxCount(value);
  };

  const startMuscle = async () => {
    await Tone.start();

    const userMedia = new Tone.UserMedia();
    setMic(userMedia);
    getMic()?.connect(getMicRecorder());
    await getMic()?.open();
    await getMicRecorder().start();

    navigate('/action');
  };

  return (
    <div class={styles.host}>
      <form class={styles.form}>
        <TextField
          class={styles.input}
          required
          label="メニュー"
          defaultValue="スクワット"
          InputProps={{
            readOnly: true,
          }}
        />

        <ToggleButtonGroup
          class={`${styles.input} ${styles.levelSelector}`}
          color="primary"
          exclusive
          value={getMaxCount()}
          onChange={updateMaxCount}
        >
          <ToggleButton value={10} aria-label="easy">
            <span>イージー</span>
          </ToggleButton>
          <ToggleButton value={30} aria-label="normal">
            <span>ノーマル</span>
          </ToggleButton>
          <ToggleButton value={50} aria-label="hard">
            <span>ハード</span>
          </ToggleButton>
          <ToggleButton value={100} aria-label="super-muscle">
            <span>あゝ、筋肉</span>
          </ToggleButton>
        </ToggleButtonGroup>

        <Button class={styles.input} variant="contained" onClick={startMuscle}>
          筋トレ開始！
        </Button>
      </form>
    </div>
  );
};

export default MusclePage;
