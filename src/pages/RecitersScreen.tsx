import store, { RootState } from '../features/store';
import { Reciter } from '../interfaces/Reciter';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SearchBar from '../components/layout/SearchBar';
import Loader from '../components/ui/Loader';
import ReciterCard from '../components/ui/ReciterCard';

import { fetchReciters } from '../features/thunks/reciterThunks';

export default function RecitersScreen() {
  const [visibleCount, setVisibleCount] = useState(10);

  const dispatch = useDispatch<typeof store.dispatch>();
  const reciterState = useSelector((state: RootState) => state.reciters);

  const reciters = reciterState.reciters;

  useEffect(() => {
    if (reciters.length === 0) {
      dispatch(fetchReciters());
    }
  }, [dispatch, reciters]);

  const showMore = () => {
    setVisibleCount((prevCount) => prevCount + 10);
  };

  return (
    <main className="w-full sm:w-3/4 h-full flex flex-col p-4 sm:p-8 overflow-x-hidden">
      <h1 className="text-xl sm:text-2xl font-bold text-white">All Recitors</h1>
      <SearchBar />

      {reciterState.status === 'loading' ? (
        <div className="flex flex-row items-center justify-center h-full">
          <Loader loading={reciterState.status} />
        </div>
      ) : reciterState.status === 'success' ? (
        <>
          <div className="flex flex-wrap justify-between gap-4 sm:gap-8 mt-4">
            {reciters.slice(0, visibleCount).map((reciter: Reciter) => (
              <ReciterCard key={reciter.id} reciter={reciter} />
            ))}
          </div>
          {visibleCount < reciters.length && (
            <button
              onClick={showMore}
              className="mx-auto bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 mb-20"
            >
              Show More
            </button>
          )}
        </>
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
