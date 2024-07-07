import store, { RootState } from '../features/store';
import { Chapter } from '../interfaces/Chapter';
import { Reciter } from '../interfaces/Reciter';

import { useEffect } from 'react';
import { BsFillPlayFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Loader from '../components/ui/Loader';

import { fetchChapters } from '../features/thunks/chaptersThunk';
import { fetchReciters } from '../features/thunks/reciterThunks';
import {
  setCurrentPlayingSurah,
  setCurrentReciter,
} from '../features/slices/playerSlice';

export default function ReciterScreen() {
  const dispatch = useDispatch<typeof store.dispatch>();

  const { id } = useParams();

  const reciterState = useSelector((state: RootState) => state.reciters);
  const reciter = reciterState.reciters.find(
    (reciter: Reciter) => reciter.id === id
  );

  const chapterState = useSelector((state: RootState) => state.chapters);
  const chapters = chapterState.chapters;

  const handlePlay = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: number,
    name_simple: string,
    name_arabic: string,
    translated_name: { language_name: string }
  ) => {
    e.preventDefault();
    dispatch(
      setCurrentReciter({
        serverURL: reciter?.Server,
        name: reciter?.name,
        id: reciter?.id,
      })
    );
    if (chapters) {
      dispatch(
        setCurrentPlayingSurah({
          id: id,
          name: name_simple,
          nameArabic: name_arabic,
          nameEnglish: translated_name.language_name,
        })
      );
    }
  };

  useEffect(() => {
    const fetchSurahs = () => {
      dispatch(fetchChapters());
    };

    if (!reciter) {
      dispatch(fetchReciters());
    }

    if (reciter && chapters.length === 0) {
      fetchSurahs();
    }
  }, [dispatch, reciter, chapters]);

  return (
    <main className="w-full sm:w-3/4 h-full flex flex-col p-4 sm:p-8 overflow-x-hidden">
      {chapterState.status === 'loading' ? (
        <div className="flex flex-row items-center justify-center h-full">
          <Loader loading={chapterState.status} />
        </div>
      ) : reciterState.status === 'loading' ? (
        <div className="flex flex-row items-center justify-center h-full">
          <Loader loading={reciterState.status} />
        </div>
      ) : chapterState.status === 'success' ? (
        reciterState.status === 'success' ? (
          <>
            <div className="flex flex-col md:flex-row items-center justify-start p-4 bg-[#191624] rounded-lg animate-slideup">
              <img
                src="/images/reciter-avi.avif"
                alt="Reciter Name"
                className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-full"
              />
              <div className="flex flex-col items-center md:items-start justify-center mt-4 md:mt-0 ml-0 md:ml-4">
                <h2 className="text-md md:text-lg font-bold text-white">
                  {reciter?.name}
                </h2>
                <p className="text-gray-400 mt-2 text-center md:text-left">
                  {reciter?.rewaya}
                </p>
              </div>
            </div>

            <div className="flex flex-col mt-8 animate-slideright">
              <h2 className="text-md md:text-lg font-bold text-white">
                Surahs
              </h2>
              <ul className="mt-4 mb-20 space-y-4">
                {chapters.map((chapter: Chapter) => (
                  <li
                    key={chapter.id}
                    className="flex flex-col md:flex-row items-center justify-between p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm rounded-lg"
                  >
                    <div className="flex flex-col items-center md:items-start justify-center">
                      <h3 className="text-md md:text-lg font-bold text-white">
                        {chapter.id}. {chapter.name_simple} -{' '}
                        {chapter.name_arabic}
                      </h3>
                      <p className="text-gray-400 text-center md:text-left">
                        {chapter.verses_count} verses - Page: {chapter.pages[0]}{' '}
                        to {chapter.pages[chapter.pages.length - 1]}
                      </p>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <h3 className="text-md md:text-lg font-bold text-white">
                        {chapter.translated_name.name}
                      </h3>
                      <p className="text-gray-400 text-center md:text-left">
                        {chapter.revelation_place.toUpperCase()} :{' '}
                        {chapter.revelation_order}
                      </p>
                    </div>
                    <button
                      title="Play Surah"
                      onClick={(e) =>
                        handlePlay(
                          e,
                          chapter.id,
                          chapter.name_simple,
                          chapter.name_arabic,
                          chapter.translated_name
                        )
                      }
                      className="bg-cyan-500 text-white p-2 rounded-full hover:bg-cyan-600 transition duration-300 mt-4 md:mt-0"
                    >
                      <BsFillPlayFill size={30} color="#FFF" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : chapterState.error ? (
          <div className="flex flex-row items-center justify-center h-full">
            <h3 className="text-md md font-bold text-white mr-2">Error:</h3>
            <p className="text-gray-400 text-center">{chapterState.error}</p>
          </div>
        ) : reciterState.error && reciterState.status === 'idle' ? (
          <div className="flex flex-row items-center justify-center h-full">
            <h3 className="text-md md font-bold text-white mr-2">Error:</h3>
            <p className="text-gray-400 text-center">{reciterState.error}</p>
          </div>
        ) : (
          <p className="text-gray-400 text-center">No Reciter Found!</p>
        )
      ) : (
        <p className="text-gray-400 text-center">No Surah Found!</p>
      )}
    </main>
  );
}
