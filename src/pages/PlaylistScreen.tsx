import { BsFillPlayFill } from 'react-icons/bs';

export default function PlaylistScreen() {
  const surahs = [
    {
      id: 1,
      name: 'Surah Name',
      description: 'Surah Description',
    },
    {
      id: 2,
      name: 'Surah Name',
      description: 'Surah Description',
    },
  ];

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

      <button className="bg-cyan-400 text-white font-bold py-2 px-4 rounded-lg mt-8">
        Play All
      </button>

      <div className="flex flex-col mt-8 animate-slideright">
        <h2 className="text-md md:text-lg font-bold text-white">Surahs</h2>
        <ul className="mt-4 mb-20 space-y-4">
          {surahs.map((surah) => (
            <li
              key={surah.id}
              className="flex flex-col md:flex-row items-center justify-between p-4 bg-[#191624] rounded-lg"
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
