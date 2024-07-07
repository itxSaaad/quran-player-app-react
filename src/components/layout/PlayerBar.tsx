import { useEffect, useState, useRef, ChangeEvent } from 'react';
import {
  BsFillPauseFill,
  BsFillPlayFill,
  BsFillVolumeMuteFill,
  BsFillVolumeUpFill,
  BsVolumeDownFill,
} from 'react-icons/bs';
import { MdSkipNext, MdSkipPrevious } from 'react-icons/md';
import store, { RootState } from '../../features/store';
import { useSelector } from 'react-redux';

export default function PlayerBar() {
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

  return (
    <section className="absolute h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10">
      <div className="relative sm:px-12 px-8 w-full flex items-center justify-between">
        <div className="flex-1 flex items-center justify-start">
          <div
            className={`${
              isPlaying ? 'animate-[spin_3s_linear_infinite]' : ''
            } hidden sm:block h-16 w-16 mr-4`}
          >
            <img
              src="https://via.placeholder.com/50"
              alt="cover art"
              className="rounded-full"
            />
          </div>

          <div className="w-[50%]">
            <p className="truncate text-white font-bold text-lg">
              {currentPlayingSurahName}
            </p>
            <p className="truncate text-gray-300">{currentReciterName}</p>
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
