import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import './App.css';

import MainLayout from './components/layout/MainLayout';
import PlayerBar from './components/layout/PlayerBar';
import DiscoverScreen from './pages/DiscoverScreen';
import PlaylistScreen from './pages/PlaylistScreen';

function App() {
  const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<DiscoverScreen />} />
        <Route path="/reciter/:id" element={<PlaylistScreen />} />
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
