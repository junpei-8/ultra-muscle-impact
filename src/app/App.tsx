import { Route, Routes } from 'solid-app-router';
import { Component, lazy, Suspense } from 'solid-js';
import AppFooter from './AppFooter';
import AppHeader from './AppHeader';
import { getIsShowRootActions } from './store/root';
import CollectionPage from './views/collection/CollectionPage';
import LoadingPage from './views/loading/LoadingPage';
import ResultPage from './views/result/ResultPage';
import SettingsPage from './views/settings/Settings';

const MusclePage = lazy(() => import('./views/muscle/MusclePage'));

const ActionPage = lazy(() => import('./views/action/ActionPage'));

const App: Component = () => {
  return (
    <div class="app">
      {getIsShowRootActions() ? <AppHeader /> : null}

      <main class="app-main">
        <Routes>
          <Suspense fallback={<LoadingPage />}>
            <Route path="/" element={<MusclePage />} />
            <Route path="/loading" element={<LoadingPage />} />
            <Route path="/action" element={<ActionPage />} />
            <Route path="/result" element={<ResultPage />} />
            <Route path="/muscle-collection" element={<CollectionPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Suspense>
        </Routes>
      </main>

      {getIsShowRootActions() ? <AppFooter /> : null}
    </div>
  );
};

export default App;
