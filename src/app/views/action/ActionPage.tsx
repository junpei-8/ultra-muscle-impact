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

const App: Component = () => {
  const [count, setCount] = createSignal<number>(0);
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

  const countUp = () => {
    setCount(count() + 1);

    // とりあえずデバッグ用に8回目で録音を止める
    if (count() == 8) {
      stopRecordWithExplosionize();
    }

    // とりあえずデバッグ用に10回目でリザルト画面に遷移
    if (count() == 10) {
      navigate('/result');
    }
  };

  createEffect(() => {
    // 自動検知
    console.log(count());
  });

  return (
    <>
      <div>Count: {count()}</div>
      <button onClick={() => countUp()}>up</button>
    </>
  );
};

export default App;
