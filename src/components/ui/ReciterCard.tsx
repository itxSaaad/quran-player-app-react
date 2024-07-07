import store, { RootState } from '../../features/store';
import { Reciter } from '../../interfaces/Reciter';

interface ReciterCardProps {
  reciter: Reciter;
}

import { BsFillPlayFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  setCurrentPlayingSurah,
  setCurrentReciter,
} from '../../features/slices/playerSlice';
import { fetchChapters } from '../../features/thunks/chaptersThunk';
import { useEffect } from 'react';

export default function ReciterCard({ reciter }: ReciterCardProps) {
  const dispatch = useDispatch<typeof store.dispatch>();

  const chapterState = useSelector((state: RootState) => state.chapters);
  const chapters = chapterState.chapters;

  const handlePlay = () => {
    dispatch(
      setCurrentReciter({
        serverURL: reciter.Server,
        name: reciter.name,
        id: reciter.id,
      })
    );
    if (chapters) {
      dispatch(
        setCurrentPlayingSurah({
          id: chapters[0].id,
          name: chapters[0].name_simple,
          nameArabic: chapters[0].name_arabic,
          nameEnglish: chapters[0].translated_name.language_name,
        })
      );
    }
  };

  useEffect(() => {
    if (chapters.length === 0) {
      dispatch(fetchChapters());
    }
  }, [dispatch, chapters]);
  return (
    <div
      key={reciter.id}
      className="flex flex-col w-full sm:w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer"
    >
      <div className="relative w-full h-48 sm:h-56 group">
        <img
          src="/images/reciter-avi.avif"
          alt="reciter-cover-art"
          className="w-full h-full rounded-lg object-cover"
        />
        <div
          onClick={handlePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <BsFillPlayFill size={45} color="#FFF" />
        </div>
      </div>
      <div className="flex flex-col mt-4">
        <p className="text-white text-base sm:text-lg font-bold">
          <Link to={`/reciter/${reciter.id}`} className="hover:underline">
            {reciter.name}
          </Link>
        </p>
        <p className="text-gray-300 text-sm sm:text-base">{reciter.rewaya}</p>
      </div>
    </div>
  );
}
