import LinearProgress from '@suid/material/LinearProgress';
import { useNavigate } from 'solid-app-router';
import { Component, createMemo, createSignal, onCleanup } from 'solid-js';
import * as Tone from 'tone';
import explosionVideoPath from '../../../assets/movie/leg-explosion.mp4';
import {
  explotionBlob,
  explotionPlayer,
  explotionRecorder,
  mic,
  micBlob,
  micRecorder,
} from '../../store/audio';
import { getMaxCount } from '../../store/muscle';
import { setIsShowRootActions } from '../../store/root';
import styles from './ActionPage.module.scss';
const y_list: number[] = [];
let ay;

const App: Component = () => {
  const navigate = useNavigate();

  // カウント（回数）が格納されていない場合はトップページに遷移する
  if (getMaxCount() <= 0) {
    navigate('/'); // eslint-disable-next-line solid/components-return-once
    return <></>;
  }

  // Header と Footer を隠す
  setIsShowRootActions(false);

  const [getTop, setTop] = createSignal(0);
  const [getMic] = mic;
  const [getMicRecorder] = micRecorder;
  const [getExplotionRecorder] = explotionRecorder;
  const [, setExplotionPlayer] = explotionPlayer;

  const [, setExplotionBlob] = explotionBlob;
  const [, setMicBlob] = micBlob;

  const stopRecordWithExplosionize = async () => {
    // 二重に止めないようにする
    if (!getMicRecorder().disposed) {
      const micBlob = await getMicRecorder().stop();

      getMicRecorder().dispose();

      // 録音止める
      getMic()!.dispose();

      const micBlobUrl = URL.createObjectURL(micBlob);

      setMicBlob(micBlobUrl);

      // 爆発音の長さ(秒)
      const lengthSeconds = 4.0;

      const explotionPlayer = new Tone.Player(micBlobUrl, () => {
        // 任意の秒数の音声データにするために倍速再生する
        const playbackRate = explotionPlayer.buffer.duration / lengthSeconds;
        explotionPlayer.playbackRate = playbackRate;

        // フェードアウトさせる
        explotionPlayer.fadeOut = Tone.Time(lengthSeconds).toSeconds();

        // 音量をめちゃくちゃ上げる
        const upGainNode = new Tone.Gain({ gain: 1024, convert: true });

        // (倍速速度 + 2) * -12 くらいがちょうどいい
        const pitchDownNode = new Tone.PitchShift({
          pitch: -12 * playbackRate + 2.0,
          wet: 1.0,
        });

        const reverbNode = new Tone.Reverb();

        // スピーカーが壊れないようにリミッターをかませる
        const limiterNode = new Tone.Limiter(0.0);

        // エフェクターをつなげていく
        explotionPlayer.connect(upGainNode);
        upGainNode.connect(pitchDownNode);
        pitchDownNode.connect(reverbNode);
        reverbNode.connect(limiterNode);

        // 爆音レコーダー
        limiterNode.connect(getExplotionRecorder());

        limiterNode.toDestination();
      });

      explotionPlayer.onstop = function () {
        // 再生が終わってもリバーブがあるので追加で1秒くらい待つ
        setTimeout(() => {
          getExplotionRecorder()
            .stop()
            .then((explotionBlob) => {
              const explotionBlobUrl = URL.createObjectURL(explotionBlob);
              setExplotionBlob(explotionBlobUrl);
            });
        }, 1000);
      };

      setExplotionPlayer(explotionPlayer);
    } else {
      // do nothing
    }
  };

  const [getPlayerElement, setPlayerElement] = createSignal<HTMLVideoElement>(
    null!,
  );

  /** 動画ロード時に代入される */
  let maxVideoTime = 0;

  /** 動画を停止させる時間を代入する */
  let limitVideoTime = 0;

  const [getCurrentVideoTime, setCurrentVideoTime] = createSignal(0);

  /** カウントの進捗状況を計算し、状態として管理する */
  const countProgress = createMemo(() => (getTop() / getMaxCount()) * 100 || 0);

  /** ビデオの進捗状況を計算し、状態として管理する */
  const videoTimeProgress = createMemo(() =>
    Math.min(
      (getCurrentVideoTime() / maxVideoTime) * 100 || 0,
      countProgress(),
    ),
  );

  /** カウントする */
  const countUp = (incremental: number) => {
    setTop(getTop() + incremental);

    const maxCount = getMaxCount();

    const counter: number = Math.round(getTop());
    console.log(counter, maxCount);

    if (counter >= maxCount) {
      // 最後のカウントの場合は動画を停止させない
      limitVideoTime = Infinity;
      getPlayerElement().play();
      setTop(maxCount);
      return;
    }

    // 達成率が８割になったら録音を止める
    if (counter >= maxCount * 0.8) stopRecordWithExplosionize();

    limitVideoTime = maxVideoTime * (counter / maxCount);

    getPlayerElement().play();
  };

  const handleMotionEvent = (e: any) => {
    const Y = e.accelerationIncludingGravity?.y;
    if (Y !== null) {
      ay = Y;
      y_list.push(ay);
      const basePosition = y_list[0];
      const topPosition = basePosition + 8.0;

      if (ay >= topPosition) {
        countUp(0.16);
      }
    }
  };

  window.addEventListener('devicemotion', handleMotionEvent, false);
  onCleanup(() =>
    window.removeEventListener('devicemotion', handleMotionEvent),
  );

  const [getHasVideoLoaded, setHasVideoLoaded] = createSignal(false);
  /** 動画がロードされたタイミングで動画の秒数を取得する */
  const initMaxVideoTime = () => {
    const playerEl = getPlayerElement();
    maxVideoTime = playerEl.duration;
    setHasVideoLoaded(true);
  };

  /** 現在の動画の再生時間を更新する */
  const updateCurrentVideoTime = () => {
    const playerEl = getPlayerElement();

    const currTime = playerEl.currentTime || 0;

    setCurrentVideoTime(currTime);

    // 現在の動画の再生時間が停止させる時間と同じになったら動画を停止させる
    if (limitVideoTime <= currTime) playerEl.pause();
  };

  const complete = () => {
    navigate('/result');
  };

  return (
    <div class={styles.host} onClick={() => getHasVideoLoaded() && countUp(1)}>
      <video
        ref={setPlayerElement}
        src={explosionVideoPath}
        controls={false}
        onLoadedData={initMaxVideoTime}
        onTimeUpdate={updateCurrentVideoTime}
        onEnded={complete}
        class={styles.video}
      />

      {getHasVideoLoaded() ? (
        <LinearProgress
          class={styles.progress}
          color="success"
          variant="buffer"
          value={videoTimeProgress()}
          valueBuffer={countProgress()}
        />
      ) : null}
    </div>
  );
};

export default App;
