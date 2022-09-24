import { Route, Routes } from 'solid-app-router';
import { Component, lazy, Suspense } from 'solid-js';
import AppFooter from './AppFooter';
import AppHeader from './AppHeader';
import { rootActionsState } from './store/root';
import LoadingPage from './views/loading/LoadingPage';

const MusclePage = lazy(() => import('./views/muscle/MusclePage'));

const App: Component = () => {
  const [isShowActions] = rootActionsState;

  return (
    <div class="app">
      {isShowActions() ? <AppHeader /> : null}

      <main class="app-main">
        <Routes>
          <Suspense fallback={<LoadingPage />}>
            {/* <Route path="/" element={<SettingPage />} /> */}
            <Route path="/" element={<MusclePage />} />
            <Route path="/loading" element={<LoadingPage />} />
          </Suspense>
        </Routes>
      </main>

      {isShowActions() ? <AppFooter /> : null}
    </div>
  );
};

export default App;
