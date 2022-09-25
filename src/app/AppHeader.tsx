import AppBar from '@suid/material/AppBar';
import Typography from '@suid/material/Typography';
import styles from './AppHeader.module.scss';

const AppHeader = () => {
  return (
    <AppBar class={styles.host}>
      <Typography variant="h6" component="div">
        Muscle Impact
      </Typography>
    </AppBar>
  );
};

export default AppHeader;
