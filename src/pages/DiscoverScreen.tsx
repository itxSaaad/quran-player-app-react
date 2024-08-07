import store, { RootState } from '../features/store';
import { Reciter } from '../interfaces/Reciter';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SearchBar from '../components/layout/SearchBar';
import Loader from '../components/ui/Loader';
import ReciterCard from '../components/ui/ReciterCard';

import { fetchReciters } from '../features/thunks/reciterThunks';

export default function DiscoverScreen() {
  const [topReciters, setTopReciters] = useState<Reciter[]>([]);
  const [visibleCount, setVisibleCount] = useState(12);

  const dispatch = useDispatch<typeof store.dispatch>();

  const reciterState = useSelector((state: RootState) => state.reciters);
  const reciters = reciterState.reciters;

  useEffect(() => {
    if (topReciters.length === 0) {
      dispatch(fetchReciters()).then(() => {
        setTopReciters(
          reciters.filter((reciter: Reciter) =>
            ['4', '30', '31', '52', '54', '60', '76', '123', '133'].includes(
              reciter.id
            )
          )
        );
      });
    }
  }, [dispatch, reciters, topReciters.length]);

  const showMore = () => {
    setVisibleCount((prevCount) => prevCount + 12);
  };

  return (
    <main className="w-full sm:w-3/4 h-full flex flex-col p-4 sm:p-8 overflow-y-auto">
      <h1 className="text-xl sm:text-2xl font-bold text-white">Discover</h1>
      <SearchBar />
      {reciterState.status === 'loading' ? (
        <div className="flex flex-row items-center justify-center h-full">
          <Loader loading={reciterState.status} />
        </div>
      ) : reciterState.status === 'success' && topReciters.length > 0 ? (
        <>
          <div className="flex flex-wrap justify-between gap-4 sm:gap-8 mt-4 mb-20">
            {topReciters.slice(0, visibleCount).map((reciter) => (
              <ReciterCard key={reciter.id} reciter={reciter} />
            ))}
          </div>
          {visibleCount < topReciters.length && (
            <button
              className="bg-primary text-white font-bold py-2 px-4 rounded-lg"
              onClick={showMore}
            >
              Show More
            </button>
          )}
        </>
      ) : reciterState.status === 'success' && topReciters.length === 0 ? (
        <div className="flex flex-row items-center justify-center h-full">
          <p className="text-white">No reciters found.</p>
        </div>
      ) : (
        reciterState.error &&
        reciterState.status === 'idle' && (
          <div className="flex flex-row items-center justify-center">
            <h3 className="text-md md font-bold text-white mr-2">Error:</h3>
            <p className="text-gray-400 text-center">{reciterState.error}</p>
          </div>
        )
      )}
    </main>
  );
}
