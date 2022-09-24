import { Route, Routes } from 'solid-app-router';
import { Component, lazy, Suspense } from 'solid-js';
import AppFooter from './AppFooter';
import AppHeader from './AppHeader';
import { rootActionsState } from './store/root';
import LoadingPage from './views/loading/LoadingPage';

const MusclePage = lazy(() => import('./views/muscle/MusclePage'));

const ActionPage = lazy(() => import('./views/action/ActionPage'));

const App: Component = () => {
  const [isShowActions] = rootActionsState;

  return (
    <div class="app">
      {isShowActions() ? <AppHeader /> : null}

      <Routes>
        <Suspense fallback={<LoadingPage />}>
          <Route path="/" element={<MusclePage />} />
          <Route path="/loading" element={<LoadingPage />} />
          <Route path="/action" element={<ActionPage />} />
        </Suspense>
      </Routes>

      {isShowActions() ? <AppFooter /> : null}
    </div>
  );
};

export default App;
