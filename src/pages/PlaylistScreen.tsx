import axios from 'axios';
import { RootState } from '../features/store';
import { Reciter } from '../interfaces/Reciter';

import { useEffect, useState } from 'react';
import { BsFillPlayFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchReciters } from '../features/thunks/reciterThunks';

export default function PlaylistScreen() {
  const dispatch = useDispatch();

  const [surahs, setSurahs] = useState([]);

  const { id } = useParams();

  const recitor = useSelector((state: RootState) =>
    state.reciters.reciters.find((reciter: Reciter) => reciter.id === id)
  );
  const recitorServer = recitor?.Server;

  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        const response = await axios.get(`${recitorServer}`);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (!recitor) {
      dispatch(fetchReciters());
    }

    if (recitor && recitorServer) {
      fetchSurahs();
    }

    return () => {
      setSurahs([]);
    };
  }, [dispatch, recitor, recitorServer]);

  return (
    <main className="w-full md:w-3/4 h-full flex flex-col p-4 md:p-8 overflow-scroll">
      <div className="flex flex-col md:flex-row items-center justify-start p-4 bg-[#191624] rounded-lg animate-slideup">
        <img
          src="https://via.placeholder.com/300"
          alt="Reciter Name"
          className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-full"
        />
        <div className="flex flex-col items-center md:items-start justify-center mt-4 md:mt-0 ml-0 md:ml-4">
          <h2 className="text-md md:text-lg font-bold text-white">
            Reciter Name
          </h2>
          <p className="text-gray-400 mt-2 text-center md:text-left">
            Reciter Description
          </p>
        </div>
      </div>

      <div className="flex flex-col mt-8 animate-slideright">
        <h2 className="text-md md:text-lg font-bold text-white">Surahs</h2>
        <ul className="mt-4 mb-20 space-y-4">
          {surahs.map((surah) => (
            <li
              key={surah.id}
              className="flex flex-col md:flex-row items-center justify-between p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm rounded-lg"
            >
              <div className="flex flex-col items-center md:items-start justify-center">
                <h3 className="text-md md:text-lg font-bold text-white">
                  {surah.name}
                </h3>
                <p className="text-gray-400 text-center md:text-left">
                  {surah.description}
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
