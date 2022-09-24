import { Route, Routes } from 'solid-app-router';
import { Component, lazy, Suspense } from 'solid-js';
import AppFooter from './AppFooter';
import AppHeader from './AppHeader';
import LoadingPage from './views/loading/LoadingPage';

const MusclePage = lazy(() => import('./views/muscle/MusclePage'));

const App: Component = () => {
  return (
    <div class="app">
      <AppHeader />

      <Routes>
        <Suspense fallback={<LoadingPage />}>
          <Route path="/" element={<MusclePage />} />
          <Route path="/loading" element={<LoadingPage />} />
        </Suspense>
      </Routes>

      <AppFooter />
    </div>
  );
};

export default App;
