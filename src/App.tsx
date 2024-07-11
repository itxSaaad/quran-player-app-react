import { RootState } from './features/store';

import { useSelector } from 'react-redux';
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
import ReciterScreen from './pages/ReciterScreen';
import RecitersScreen from './pages/RecitersScreen';
import SearchScreen from './pages/SearchScreen';

function App() {
  const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<DiscoverScreen />} />
        <Route path="/reciters" element={<RecitersScreen />} />
        <Route path="/reciter/:id" element={<ReciterScreen />} />
        <Route path="/search/:reciter" element={<SearchScreen />} />
        <Route path="*" element={<DiscoverScreen />} />
      </Route>
    )
  );

  const playerState = useSelector((state: RootState) => state.player);

  const currentTrack = playerState.currentPlayingSurahID;

  return (
    <section className="flex flex-col items-center justify-center w-screen h-screen bg-gradient-to-br from-black to-[#121286]">
      <RouterProvider router={routes} />
      {currentTrack ? <PlayerBar /> : null}
    </section>
  );
}

export default App;
