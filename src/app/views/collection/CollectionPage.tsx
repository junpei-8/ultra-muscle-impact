import PlayCircleIcon from '@suid/icons-material/PlayCircle';
import Divider from '@suid/material/Divider';
import IconButton from '@suid/material/IconButton';
import List from '@suid/material/List';
import ListItem from '@suid/material/ListItem';
import ListItemText from '@suid/material/ListItemText';
import { createSignal, For } from 'solid-js';
import { setIsShowRootActions } from '../../store/root';
import styles from './CollectionPage.module.scss';

const CollectionPage = () => {
  // Header と Footer を表示させる
  setIsShowRootActions(true);

  const [collections] = createSignal([
    {
      client_id: 'aaaa',
      explosion_timestamp: '2022-09-24T06:46:18.199191+00:00',
      muscle_category: 'pectoralis',
    },
    {
      client_id: 'bbbb',
      explosion_timestamp: '2022-09-24T06:46:18.199191+00:00',
      muscle_category: 'pectoralis',
    },
    {
      client_id: 'cccc',
      explosion_timestamp: '2022-09-24T06:46:18.199191+00:00',
      muscle_category: 'pectoralis',
    },
  ]);

  return (
    <div class={styles.wrap}>
      <For each={collections()}>
        {(collection: any, _) => (
          <List class={styles.list}>
            <ListItem
              secondaryAction={
                <IconButton edge="end" aria-label="">
                  <PlayCircleIcon />
                </IconButton>
              }
            >
              <ListItemText
                primary={collection.client_id}
                secondary={collection.explosion_timestamp}
              />
            </ListItem>
            <Divider />
          </List>
        )}
      </For>
    </div>
  );
};

export default CollectionPage;
