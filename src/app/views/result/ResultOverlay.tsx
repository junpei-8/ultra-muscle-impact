import { createSignal } from 'solid-js';
import { setOverlayElement } from '../../store/root';
import styles from './ResultOverlay.module.scss';

const ResultOverlay = () => {
  const [getIsHidden, setIsHidden] = createSignal(false);

  setTimeout(() => setIsHidden(true), 1000);

  setTimeout(() => {
    // このオーバーレイを削除する
    setOverlayElement(null);
  }, 3000);

  return (
    <div classList={{ [styles.host]: true, [styles.hide]: getIsHidden() }}>
      <img class={styles.movie} src="src/assets/images/explosion.gif" />
    </div>
  );
};

export default ResultOverlay;