import Button from '@suid/material/Button';
import { Link } from 'solid-app-router';
import { createEffect, onMount } from 'solid-js';
import WaveSurfer from 'wavesurfer.js';
import {
  explotionBlob,
  explotionPlayer,
  explotionRecorder,
} from '../../store/audio';
import styles from './ResultPage.module.scss';

const ResultPage = () => {
  const [getExplotionRecorder] = explotionRecorder;
  const [getExplotionBlob] = explotionBlob;

  const [getExplotionPlayer] = explotionPlayer;
  getExplotionRecorder().start();
  getExplotionPlayer()!.start('1s');

  let afterWaveform: { load: (arg0: string) => void } | null = null;

  onMount(() => {
    afterWaveform = WaveSurfer.create({
      container: '#waveform_after',
      waveColor: 'violet',
      progressColor: 'purple',
    });
  });

  createEffect(() => {
    if (getExplotionBlob() != null) {
      afterWaveform?.load(getExplotionBlob()!);
    }
  });

  return (
    <div class={styles.container}>
      <h2>
        おめでとう！！
        <br />
        筋肉が喜んでいるよ！！
      </h2>
      <div>
        <img
          src="src/assets/images/result.gif"
          alt=""
          class={styles.resultGif}
        />
      </div>
      <div class="waveform_container">
        <h1>あなたの鳴き声</h1>
        <div id="waveform_after" />
      </div>
      <Button variant="contained">
        <Link href="/">もう一度筋トレする</Link>
      </Button>
    </div>
  );
};

export default ResultPage;
