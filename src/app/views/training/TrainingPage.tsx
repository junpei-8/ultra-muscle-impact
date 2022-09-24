import * as Tone from 'tone';
import styles from './TrainingPage.module.scss';

const TrainingPage = () => {
  const micRecorder = new Tone.Recorder();
  const explotionRecorder = new Tone.Recorder();

  async function startRecording(): Promise<void> {
    await Tone.start();
    const mic = new Tone.UserMedia();

    // 録音データの流し先
    mic.connect(micRecorder);

    mic.open().then(() => {
      console.debug('mic opened');
      micRecorder.start().then(() => {
        console.debug('recording...');
      });
    });
  }

  async function stopRecordWithExplosionize(): Promise<void> {
    const micBlob = await micRecorder.stop();
    const micBlobUrl = URL.createObjectURL(micBlob);

    const player = new Tone.Player(micBlobUrl, () => {
      // 爆発音の長さ(秒)
      const lengthSeconds = 4.0;

      // 任意の秒数の音声データにするために倍速再生する
      const playbackRate = player.buffer.duration / lengthSeconds;
      player.playbackRate = playbackRate;

      // フェードアウトさせる
      player.fadeOut = Tone.Time(lengthSeconds).toSeconds();

      // 音量をめちゃくちゃ上げる
      const upGainNode = new Tone.Gain({ gain: 1024, convert: true });
      // (倍速速度 + 1) * -12 くらいがちょうどいい
      const pitchDownNode = new Tone.PitchShift({
        pitch: -12 * playbackRate + 2.0,
        wet: 1.0,
      });
      const reverbNode = new Tone.Reverb();
      // スピーカーが壊れないようにリミッターをかませる
      const limiterNode = new Tone.Limiter(-10.0);

      // エフェクターをつなげていく
      player.connect(upGainNode);
      upGainNode.connect(pitchDownNode);
      pitchDownNode.connect(reverbNode);
      reverbNode.connect(limiterNode);
      limiterNode.toDestination();

      // 爆音レコーダー
      limiterNode.connect(explotionRecorder);

      // 爆音の再生と録音を開始
      player.start();
      explotionRecorder.start();

      player.onstop = function () {
        // 再生が終わってもリバーブがあるため追加で一秒待つ
        setTimeout(() => {
          explotionRecorder.stop().then((explotionBlob) => {
            const explotionBlobUrl = URL.createObjectURL(explotionBlob);
          });
        }, 1000);
      };
    });
  }

  return (
    <div class={styles.host}>
      <button onClick={startRecording}>トレーニングを開始する</button>
      <button onClick={stopRecordWithExplosionize}>
        トレーニングを終了する
      </button>
    </div>
  );
};

export default TrainingPage;
