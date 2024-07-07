import { useEffect, useState, useRef, ChangeEvent } from 'react';
import {
  BsFillPauseFill,
  BsFillPlayFill,
  BsFillVolumeMuteFill,
  BsFillVolumeUpFill,
  BsVolumeDownFill,
} from 'react-icons/bs';
import { MdSkipNext, MdSkipPrevious } from 'react-icons/md';

export default function PlayerBar() {
  const songs = [
    {
      id: '1234',
      title: 'Song Title',
      subtitle: 'Song Subtitle',
      hub: {
        actions: [
          {
            uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
          },
        ],
      },
    },
    {
      id: '5678',
      title: 'Song Title',
      subtitle: 'Song Subtitle',
      hub: {
        actions: [
          {
            uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
          },
        ],
      },
    },
    {
      id: '91011',
      title: 'Song Title',
      subtitle: 'Song Subtitle',
      hub: {
        actions: [
          {
            uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
          },
        ],
      },
    },
    {
      id: '121314',
      title: 'Song Title',
      subtitle: 'Song Subtitle',
      hub: {
        actions: [
          {
            uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
          },
        ],
      },
    },
  ];

  const ref = useRef<HTMLAudioElement>(null);
  const [value, setValue] = useState(0);
  const min = 0;
  const [max, setMax] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSong, setActiveSong] = useState(songs[0]); // Set initial active song
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    if (ref.current) {
      ref.current.volume = volume;
    }
  }, [volume]);

  const handlePlayPause = () => {
    if (ref.current) {
      if (isPlaying) {
        ref.current.pause();
      } else {
        ref.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleNextSong = () => {
    const currentIndex = songs.findIndex((song) => song.id === activeSong.id);
    const nextIndex = (currentIndex + 1) % songs.length;
    setActiveSong(songs[nextIndex]);
    setIsPlaying(false);
  };

  const handlePrevSong = () => {
    const currentIndex = songs.findIndex((song) => song.id === activeSong.id);
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    setActiveSong(songs[prevIndex]);
    setIsPlaying(false);
  };

  const onEnded = () => {
    handleNextSong();
  };

  const onTimeUpdate = () => {
    if (ref.current) {
      setValue(ref.current.currentTime);
    }
  };

  const onLoadedData = () => {
    if (ref.current) {
      setMax(ref.current.duration);
    }
  };

  const onInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (ref.current) {
      ref.current.currentTime = parseFloat(e.target.value);
      setValue(parseFloat(e.target.value));
    }
  };

  const getTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

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
              {activeSong?.title}
            </p>
            <p className="truncate text-gray-300">{activeSong?.subtitle}</p>
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
            src={activeSong?.hub?.actions[0]?.uri}
            ref={ref}
            onEnded={onEnded}
            onTimeUpdate={onTimeUpdate}
            onLoadedData={onLoadedData}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
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
