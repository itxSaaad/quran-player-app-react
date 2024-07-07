import { useEffect, useState, useRef } from 'react';
import {
  BsFillPauseFill,
  BsFillPlayFill,
  BsFillVolumeMuteFill,
  BsFillVolumeUpFill,
  BsVolumeDownFill,
} from 'react-icons/bs';
import { MdSkipNext, MdSkipPrevious } from 'react-icons/md';

export default function PlayerBar() {
  const ref = useRef<HTMLAudioElement>(null);
  const [value, setValue] = useState(0);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [activeSong, setActiveSong] = useState<Song | null>(null);

  const handlePlayPause = () => {
    if (isPlaying) {
      ref.current?.pause();
    } else {
      ref.current?.play();
    }
  };

  const handleNextSong = () => {
    console.log('Next Song');
  };

  const handlePrevSong = () => {
    console.log('Previous Song');
  };

  const onInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setValue(value);
    ref.current!.currentTime = value;
  };

  const onEnded = () => {
    console.log('Song Ended');
  };

  const onTimeUpdate = () => {
    setValue(ref.current!.currentTime);
  };

  const onLoadedData = () => {
    setMax(ref.current!.duration);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setValue(value);
    ref.current!.volume = value;
  };

  const setVolume = (value: number) => {
    setValue(value);
    ref.current!.volume = value;
  };

  const getTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.volume = value;
    }
  }, [value]);

  useEffect(() => {
    if (ref.current) {
      if (isPlaying) {
        ref.current.play();
      } else {
        ref.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (ref.current) {
      ref.current.currentTime = value;
    }
  }, [activeSong]);

  useEffect(() => {
    if (ref.current) {
      ref.current.currentTime = 0;
    }
  }, [activeSong]);

  useEffect(() => {
    if (ref.current) {
      ref.current.volume = value;
    }
  }, [value]);

  return (
    <section className="absolute h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10">
      <div className="relative sm:px-12 px-8 w-full flex items-center justify-between">
        <div className="flex-1 flex items-center justify-start">
          <div
            className={`${
              isPlaying && isActive ? 'animate-[spin_3s_linear_infinite]' : ''
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
              {activeSong?.title ? activeSong?.title : 'No active Song'}
            </p>
            <p className="truncate text-gray-300">
              {activeSong?.subtitle ? activeSong?.subtitle : 'No active Song'}
            </p>
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
            src={activeSong?.hub?.actions[1]?.uri}
            ref={ref}
            onEnded={onEnded}
            onTimeUpdate={onTimeUpdate}
            onLoadedData={onLoadedData}
          />
        </div>

        <div className="hidden lg:flex flex-1 items-center justify-end">
          {value <= 1 && value > 0.5 && (
            <BsFillVolumeUpFill
              size={25}
              color="#FFF"
              onClick={() => setVolume(0)}
              O
            />
          )}
          {value <= 0.5 && value > 0 && (
            <BsVolumeDownFill
              size={25}
              color="#FFF"
              onClick={() => setVolume(0)}
            />
          )}
          {value === 0 && (
            <BsFillVolumeMuteFill
              size={25}
              color="#FFF"
              onClick={() => setVolume(1)}
            />
          )}
          <input
            type="range"
            step="any"
            value={value}
            min={min}
            max={max}
            onChange={onChange}
            className="2xl:w-40 lg:w-32 md:w-32 h-1 ml-2"
          />
        </div>
      </div>
    </section>
  );
}
