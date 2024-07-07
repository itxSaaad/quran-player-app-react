import { useState } from 'react';
import { BsFillPlayFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

export default function PlaylistCard() {
  const [id, setId] = useState('1234');

  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="relative w-full h-56 group">
        <img
          src="https://via.placeholder.com/300"
          alt="playlist cover art"
          className="w-full h-full rounded-lg"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
          <BsFillPlayFill size={45} color="#FFF" />
        </div>
      </div>
      <div className="flex flex-col mt-4">
        <p className="text-white text-lg font-bold">
          <Link to={`/playlist/${id}`} className="hover:underline">
            Playlist Title
          </Link>
        </p>
        <p className="text-gray-300">Playlist Description</p>
      </div>
    </div>
  );
}
