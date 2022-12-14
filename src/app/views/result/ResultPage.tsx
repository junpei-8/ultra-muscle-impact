import Button from '@suid/material/Button';
import { Link } from 'solid-app-router';
import { createEffect, onMount } from 'solid-js';
import WaveSurfer from 'wavesurfer.js';
import resultGifPath from '../../../assets/images/result.gif';
import {
  explotionBlob,
  explotionPlayer,
  explotionRecorder,
} from '../../store/audio';
import { setIsShowRootActions, setOverlayElement } from '../../store/root';
import ResultOverlay from './ResultOverlay';
import styles from './ResultPage.module.scss';

const ResultPage = () => {
  const [getExplotionRecorder] = explotionRecorder;
  const [getExplotionBlob] = explotionBlob;

  // Header と Footer を表示させる
  setIsShowRootActions(true);

  setOverlayElement(<ResultOverlay />);

  const [getExplotionPlayer] = explotionPlayer;
  getExplotionRecorder().start();
  getExplotionPlayer()?.start('1s');

  let afterWaveform: { load: (arg: string) => void } | null = null;

  onMount(() => {
    afterWaveform = WaveSurfer.create({
      container: '#waveform_after',
      waveColor: 'violet',
      progressColor: 'purple',
    });
  });

  createEffect(() => {
    const blob = getExplotionBlob();
    if (blob) afterWaveform?.load(blob);
  });

  // アクセス時に

  return (
    <div class={styles.host}>
      <h2>
        おめでとう！！
        <br />
        筋肉が喜んでいるよ！！
      </h2>
      <div class={styles.imgFrame}>
        <img src={resultGifPath} alt="" class={styles.resultGif} />
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
