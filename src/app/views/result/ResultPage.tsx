import Button from '@suid/material/Button';
import styles from './ResultPage.module.scss';

const ResultPage = () => {
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
      <Button variant="contained">もう一度筋トレする</Button>
    </div>
  );
};

export default ResultPage;
