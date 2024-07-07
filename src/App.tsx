import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import './App.css';

import MainSection from './components/layout/MainSection';
import PlayerBar from './components/layout/PlayerBar';
import MainLayout from './components/layout/MainLayout';

function App() {
  const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<MainSection />} />
        <Route
          path="playlist/:id"
          element={
            <main className="w-3/4 h-full">
              <h1>Playlist</h1>
            </main>
          }
        />
      </Route>
    )
  );

  return (
    <section className="flex flex-col items-center justify-center w-full h-screen bg-gradient-to-br from-black to-[#121286]">
      <RouterProvider router={routes} />
      <PlayerBar />
    </section>
  );
}

export default App;
