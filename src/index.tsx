/* @refresh reload */
import './index.scss';
import { Router } from 'solid-app-router';
import { render } from 'solid-js/web';
import App from './app/App';

// test push用のコメントです。

render(
  () => (
    <Router>
      <App />
    </Router>
  ),
  document.getElementById('root') as HTMLElement,
);
