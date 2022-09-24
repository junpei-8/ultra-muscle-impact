import Button from '@suid/material/Button';
import { Link } from 'solid-app-router';
import * as Tone from 'tone';
import { explotionPlayer } from '../../store/audio';
import styles from './ResultPage.module.scss';

const ResultPage = () => {
  const [getExplotionPlayer, setExplotionPlayer] = explotionPlayer;
  getExplotionPlayer()!.start();

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
      <Button variant="contained">
        <Link href="/">もう一度筋トレする</Link>
      </Button>
    </div>
  );
};

export default ResultPage;
