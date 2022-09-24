import { useNavigate } from 'solid-app-router';
import { Component, createSignal, createEffect } from 'solid-js';
import * as Tone from 'tone';
import {
  explotionBlob,
  explotionPlayer,
  explotionRecorder,
  mic,
  micBlob,
  micRecorder,
} from '../../store/audio';
import { getNumberOfTimes } from '../../store/muscle';

const App: Component = () => {
  const [getCount, setCount] = createSignal<number>(0);
  const [getMic] = mic;
  const [getMicRecorder] = micRecorder;
  const [getExplotionRecorder] = explotionRecorder;
  const [, setExplotionPlayer] = explotionPlayer;

  const [, setExplotionBlob] = explotionBlob;
  const [, setMicBlob] = micBlob;

  const navigate = useNavigate();

  async function stopRecordWithExplosionize(): Promise<void> {
    // 録音止める
    getMic()!.close();
    const micBlob = await getMicRecorder().stop();
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
  }

  const [getPlayerElement, setPlayerElement] = createSignal<HTMLVideoElement>(
    null!,
  );

  /** TODO: 状態か定数として持つ */
  const videoSeconds = 8;

  /** 現在のカウント / 最大のカウント数 を計算する */
  const calcCountProgress = (count: number) => count / getNumberOfTimes();

  /** 動画の秒数 / 現在の進捗の割合 現在の動画の秒数を計算する */
  const calcPlayerTime = (count: number) =>
    videoSeconds * calcCountProgress(count);

  // カウントアップを検知
  const countUp = () => {
    setCount(getCount() + 1);

    // とりあえずデバッグ用に8回目で録音を止める
    if (getCount() == 8) {
      stopRecordWithExplosionize();
    }

    // とりあえずデバッグ用に10回目でリザルト画面に遷移
    if (getCount() == 10) {
      navigate('/result');
    }

    // const count = getCount() + 1;

    // console.log(calcCountProgress(count), calcPlayerTime(count));

    // setCount(count);
  };

  /** lottie-player にイベントリスナーを追加 */
  createEffect(() => {
    const playerEl = getPlayerElement();
    playerEl.currentTime = 1;
  });

  const complete = () => {
    console.log('complete!!!');
  };

  return (
    <div>
      <video ref={setPlayerElement} controls={false} onEnded={complete} />
      <div>Count: {getCount()}</div>
      <button onClick={countUp}>up</button>
    </div>
  );
};

export default App;
