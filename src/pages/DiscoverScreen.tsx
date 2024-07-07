import store, { RootState } from '../features/store';
import { Reciter } from '../interfaces/Reciter';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SearchBar from '../components/layout/SearchBar';
import ReciterCard from '../components/ui/ReciterCard';

import { fetchReciters } from '../features/thunks/reciterThunks';

export default function DiscoverScreen() {
  const dispatch = useDispatch<typeof store.dispatch>();
  const reciters = useSelector((state: RootState) => state.reciters.reciters);

  //  4 | 30 | 31 | 52 | 54 | 60 | 76 | 123 | 133 top reciter ids

  const topRecitors = reciters.filter((reciter: Reciter) =>
    ['4', '30', '31', '52', '54', '60', '76', '123', '133'].includes(reciter.id)
  );

  useEffect(() => {
    if (reciters.length === 0) {
      dispatch(fetchReciters());
    }
  }, [dispatch, reciters]);

  return (
    <main className="w-full sm:w-3/4 h-full flex flex-col p-4 sm:p-8 overflow-scroll">
      <h1 className="text-xl sm:text-2xl font-bold text-white">Discover</h1>
      <SearchBar />
      <div className="flex flex-wrap justify-between gap-4 sm:gap-8 mt-4 mb-20">
        {topRecitors.map((reciter: Reciter) => (
          <ReciterCard key={reciter.id} reciter={reciter} />
        ))}
      </div>
    </main>
  );
}
