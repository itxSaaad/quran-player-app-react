import store, { RootState } from '../features/store';
import { Reciter } from '../interfaces/Reciter';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SearchBar from '../components/layout/SearchBar';
import Loader from '../components/ui/Loader';
import ReciterCard from '../components/ui/ReciterCard';

import { fetchReciters } from '../features/thunks/reciterThunks';

export default function DiscoverScreen() {
  const dispatch = useDispatch<typeof store.dispatch>();

  const reciterState = useSelector((state: RootState) => state.reciters);
  const reciters = reciterState.reciters;

  //  4 | 30 | 31 | 52 | 54 | 60 | 76 | 123 | 133 top reciter ids

  const topRecitors = reciters.filter((reciter: Reciter) =>
    ['4', '30', '31', '52', '54', '60', '76', '123', '133'].includes(reciter.id)
  );

  useEffect(() => {
    if (topRecitors.length === 0) {
      dispatch(fetchReciters());
    }
  }, [dispatch, topRecitors]);

  return (
    <main className="w-full sm:w-3/4 h-full flex flex-col p-4 sm:p-8 overflow-x-hidden">
      <h1 className="text-xl sm:text-2xl font-bold text-white">Discover</h1>
      <SearchBar />
      {reciterState.status === 'loading' ? (
        <div className="flex flex-row items-center justify-center h-full">
          <Loader loading={reciterState.status} />
        </div>
      ) : reciterState.status === 'success' ? (
        <div className="flex flex-wrap justify-between gap-4 sm:gap-8 mt-4 mb-20">
          {topRecitors.map((reciter: Reciter) => (
            <ReciterCard key={reciter.id} reciter={reciter} />
          ))}
        </div>
      ) : reciterState.error && reciterState.status === 'idle' ? (
        <div className="flex flex-row items-center justify-center">
          <h3 className="text-md md font-bold text-white mr-2">Error:</h3>
          <p className="text-gray-400 text-center">{reciterState.error}</p>
        </div>
      ) : (
        <p className="text-gray-400 text-center">No Reciter Found!</p>
      )}
    </main>
  );
}
