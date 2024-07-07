import { Reciter } from '../../interfaces/Reciter';

interface ReciterCardProps {
  key: string;
  reciter: Reciter;
}

import { BsFillPlayFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

export default function ReciterCard({ key, reciter }: ReciterCardProps) {
  return (
    <div
      key={key}
      className="flex flex-col w-full sm:w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer"
    >
      <div className="relative w-full h-48 sm:h-56 group">
        <img
          src="/android-chrome-192x192.png"
          alt="reciter-cover-art"
          className="w-full h-full rounded-lg object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
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
