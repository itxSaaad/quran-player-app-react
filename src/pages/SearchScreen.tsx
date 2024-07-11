import store, { RootState } from '../features/store';
import { Reciter } from '../interfaces/Reciter';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import SearchBar from '../components/layout/SearchBar';
import Loader from '../components/ui/Loader';
import ReciterCard from '../components/ui/ReciterCard';

import { fetchReciters } from '../features/thunks/reciterThunks';

export default function SearchScreen() {
  const [visibleCount, setVisibleCount] = useState(12);
  const [searchedReciters, setSearchedReciters] = useState<Reciter[]>([]);

  const dispatch = useDispatch<typeof store.dispatch>();
  const reciterState = useSelector((state: RootState) => state.reciters);

  const reciters = reciterState.reciters;
  const params = useParams<{ reciter: string }>();
  const searchValue = params.reciter;

  const normalizeString = (str: string) =>
    str.toLowerCase().replace(/\s+/g, '');

  useEffect(() => {
    if (reciters.length === 0) {
      dispatch(fetchReciters());
    }
    if (searchValue === undefined) {
      setSearchedReciters(reciters);
    } else if (searchValue !== undefined) {
      setSearchedReciters(
        reciters.filter((reciter) =>
          normalizeString(reciter.name).includes(normalizeString(searchValue))
        )
      );
    }
  }, [dispatch, reciters, searchValue]);

  const showMore = () => {
    setVisibleCount((prevCount) => prevCount + 12);
  };

  return (
    <main className="w-full sm:w-3/4 h-full flex flex-col p-4 sm:p-8 overflow-x-hidden">
      <h1 className="text-xl sm:text-2xl font-bold text-white">
        Search Results for "{searchValue}"
      </h1>
      <SearchBar />

      {reciterState.status === 'loading' ? (
        <div className="flex flex-row items-center justify-center h-full">
          <Loader loading={reciterState.status} />
        </div>
      ) : reciterState.status === 'success' && searchedReciters.length > 0 ? (
        <>
          <div className="flex flex-wrap justify-between gap-4 sm:gap-8 mt-4 mb-20">
            {searchedReciters.slice(0, visibleCount).map((reciter) => (
              <ReciterCard key={reciter.id} reciter={reciter} />
            ))}
          </div>
          {visibleCount < searchedReciters.length && (
            <button
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full"
              onClick={showMore}
            >
              Show More
            </button>
          )}
        </>
      ) : reciterState.status === 'success' && searchedReciters.length === 0 ? (
        <p className="text-gray-400 text-center">No Reciter Found!</p>
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
