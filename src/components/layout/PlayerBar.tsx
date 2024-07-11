import store, { RootState } from '../../features/store';

import { ChangeEvent, useEffect, useRef, useState } from 'react';
import {
  BsFillPauseFill,
  BsFillPlayFill,
  BsFillVolumeMuteFill,
  BsFillVolumeUpFill,
  BsVolumeDownFill,
} from 'react-icons/bs';
import { MdSkipNext, MdSkipPrevious } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';

import {
  setCurrentPlayingSurah,
  setIsPlaying,
} from '../../features/slices/playerSlice';

export default function PlayerBar() {
  const [value, setValue] = useState(0);
  const min = 0;
  const [max, setMax] = useState(0);
  const [volume, setVolume] = useState(1);

  const ref = useRef<HTMLAudioElement>(null);

  const dispatch = useDispatch<typeof store.dispatch>();

  const playerDetails = useSelector((state: RootState) => state.player);
  const {
    isPlaying,
    currentAudioURL,
    nextSurahID,
    prevSurahID,
    currentPlayingSurahName,
    currentReciterName,
  } = playerDetails;

  const chapterState = useSelector((state: RootState) => state.chapters);
  const chapters = chapterState.chapters;

  const findSurah = (id: number) => {
    const surah = chapters.find((chapter) => chapter.id === id);

    return {
      id: id,
      name: surah?.name_simple,
      nameArabic: surah?.name_arabic,
      nameEnglish: surah?.translated_name.language_name,
    };
  };

  const onInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(parseFloat(e.target.value));
    ref.current!.currentTime = parseFloat(e.target.value);
  };

  const onTimeUpdate = () => {
    setValue(ref.current!.currentTime);
  };

  const onLoadedData = () => {
    setMax(ref.current!.duration);
  };

  const onEnded = () => {
    dispatch(setCurrentPlayingSurah(findSurah(nextSurahID)));
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      ref.current!.pause();
    } else {
      ref.current!.play();
    }
  };

  const handlePlay = () => {
    dispatch(setIsPlaying(true));
  };

  const handlePause = () => {
    dispatch(setIsPlaying(false));
  };

  const handleNextSong = () => {
    dispatch(setCurrentPlayingSurah(findSurah(nextSurahID)));
  };

  const handlePrevSong = () => {
    if (prevSurahID === 0) {
      return;
    }
    dispatch(setCurrentPlayingSurah(findSurah(prevSurahID)));
  };

  useEffect(() => {
    if (isPlaying) {
      ref.current!.play();
    } else {
      ref.current!.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (ref.current) {
      ref.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (ref.current) {
      ref.current.src = currentAudioURL;
      ref.current.play();
    }
  }, [currentAudioURL]);

  const getTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const ReciterName =
    currentReciterName.length > 10
      ? currentReciterName.slice(0, 18) + '...'
      : currentReciterName;

  return (
    <section className="absolute h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10">
      <div className="relative sm:px-12 px-8 w-full flex items-center justify-between">
        <div className="flex-1 flex items-center justify-start">
          <div className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 2xl:w-24 2xl:h-24 mr-4">
            <img
              src="/android-chrome-192x192.png"
              alt="cover art"
              className="rounded-full"
            />
          </div>

          <div className="w-1/2">
            <p className="truncate text-white font-bold text-lg">
              {currentPlayingSurahName}
            </p>
            <p className="truncate text-gray-300">{ReciterName}</p>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="flex items-center justify-around md:w-36 lg:w-52 2xl:w-80">
            <MdSkipPrevious
              size={30}
              color="#FFF"
              className="cursor-pointer"
              onClick={handlePrevSong}
            />

            {isPlaying ? (
              <BsFillPauseFill
                size={45}
                color="#FFF"
                onClick={handlePlayPause}
                className="cursor-pointer"
              />
            ) : (
              <BsFillPlayFill
                size={45}
                color="#FFF"
                onClick={handlePlayPause}
                className="cursor-pointer"
              />
            )}

            <MdSkipNext
              size={30}
              color="#FFF"
              className="cursor-pointer"
              onClick={handleNextSong}
            />
          </div>
          <div className="hidden sm:flex flex-row items-center">
            <p className="text-white">
              {value === 0 ? '0:00' : getTime(value)}
            </p>
            <input
              title="Seekbar"
              type="range"
              step="any"
              value={value}
              min={min}
              max={max}
              onInput={onInput}
              className="md:block w-24 md:w-56 2xl:w-96 h-1 mx-4 2xl:mx-6 rounded-lg"
            />
            <p className="text-white">{max === 0 ? '0:00' : getTime(max)}</p>
          </div>
          <audio
            src={currentAudioURL}
            ref={ref}
            onEnded={onEnded}
            onTimeUpdate={onTimeUpdate}
            onLoadedData={onLoadedData}
            onPlay={handlePlay}
            onPause={handlePause}
          />
        </div>

        <div className="hidden lg:flex flex-1 items-center justify-end">
          {volume > 0.5 ? (
            <BsFillVolumeUpFill
              size={25}
              color="#FFF"
              onClick={() => setVolume(0)}
            />
          ) : volume > 0 ? (
            <BsVolumeDownFill
              size={25}
              color="#FFF"
              onClick={() => setVolume(0)}
            />
          ) : (
            <BsFillVolumeMuteFill
              size={25}
              color="#FFF"
              onClick={() => setVolume(1)}
            />
          )}
          <input
            title="Volume Slider"
            type="range"
            step="any"
            value={volume}
            min={0}
            max={1}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="2xl:w-40 lg:w-32 md:w-32 h-1 ml-2"
          />
        </div>
      </div>
    </section>
  );
}
