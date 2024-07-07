import store, { RootState } from '../features/store';
import { Reciter } from '../interfaces/Reciter';
import { Chapter } from '../interfaces/Chapter';

import { useEffect } from 'react';
import { BsFillPlayFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { fetchChapters } from '../features/thunks/chaptersThunk';
import { fetchReciters } from '../features/thunks/reciterThunks';

export default function ReciterScreen() {
  const dispatch = useDispatch<typeof store.dispatch>();

  const { id } = useParams();

  const recitor = useSelector((state: RootState) =>
    state.reciters.reciters.find((reciter: Reciter) => reciter.id === id)
  );

  const surahs = useSelector((state: RootState) => state.chapters.chapters);

  useEffect(() => {
    const fetchSurahs = () => {
      dispatch(fetchChapters());
    };

    if (!recitor) {
      dispatch(fetchReciters());
    }
    if (recitor && surahs.length === 0) {
      fetchSurahs();
    }
  }, [dispatch, recitor, surahs]);
  return (
    <main className="w-full md:w-3/4 h-full flex flex-col p-4 md:p-8 overflow-scroll">
      <div className="flex flex-col md:flex-row items-center justify-start p-4 bg-[#191624] rounded-lg animate-slideup">
        <img
          src="/images/reciter-avi.avif"
          alt="Reciter Name"
          className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-full"
        />
        <div className="flex flex-col items-center md:items-start justify-center mt-4 md:mt-0 ml-0 md:ml-4">
          <h2 className="text-md md:text-lg font-bold text-white">
            {recitor?.name}
          </h2>
          <p className="text-gray-400 mt-2 text-center md:text-left">
            {recitor?.rewaya}
          </p>
        </div>
      </div>

      <div className="flex flex-col mt-8 animate-slideright">
        <h2 className="text-md md:text-lg font-bold text-white">Surahs</h2>
        <ul className="mt-4 mb-20 space-y-4">
          {surahs.map((surah: Chapter) => (
            <li
              key={surah.id}
              className="flex flex-col md:flex-row items-center justify-between p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm rounded-lg"
            >
              <div className="flex flex-col items-center md:items-start justify-center">
                <h3 className="text-md md:text-lg font-bold text-white">
                  {surah.id}. {surah.name_simple} - {surah.name_arabic}
                </h3>
                <p className="text-gray-400 text-center md:text-left">
                  {surah.verses_count} verses - Page: {surah.pages[0]} to{' '}
                  {surah.pages[surah.pages.length - 1]}
                </p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <h3 className="text-md md:text-lg font-bold text-white">
                  {surah.translated_name.name}
                </h3>
                <p className="text-gray-400 text-center md:text-left">
                  {surah.revelation_place.toUpperCase()} :{' '}
                  {surah.revelation_order}
                </p>
              </div>
              <BsFillPlayFill
                size={30}
                color="#FFF"
                className="cursor-pointer hover:text-cyan-400 animate-slowfade mt-4 md:mt-0"
              />
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
