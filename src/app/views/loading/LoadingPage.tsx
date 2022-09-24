import CircularProgress from '@suid/material/CircularProgress';
import styles from './LoadingPage.module.scss';

const LoadingPage = () => {
  return (
    <div class={styles.host}>
      <CircularProgress class={styles.progress} size="64px" />
    </div>
  );
};

export default LoadingPage;
