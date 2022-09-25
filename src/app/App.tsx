import { Route, Routes } from 'solid-app-router';
import { Component, lazy, Suspense } from 'solid-js';
import AppFooter from './AppFooter';
import AppHeader from './AppHeader';
import { getIsShowRootActions, getOverlayElement } from './store/root';
import ActionPage from './views/action/ActionPage';
import CollectionPage from './views/collection/CollectionPage';
import LoadingPage from './views/loading/LoadingPage';

const MusclePage = lazy(() => import('./views/muscle/MusclePage'));
// const ActionPage = lazy(() => import('./views/action/ActionPage'));
const ResultPage = lazy(() => import('./views/result/ResultPage'));
const SettingsPage = lazy(() => import('./views/settings/SettingsPage'));

const App: Component = () => {
  return (
    <div class="app">
      {getOverlayElement()}

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
