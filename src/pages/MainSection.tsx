import { useState } from 'react';
import PlaylistCard from '../components/library/PlaylistCard';
import SearchBar from '../components/layout/SearchBar';

export default function MainSection() {
  const [reciters, setReciters] = useState<Reciter[]>([
    {
      id: '1234',
      name: 'Reciter Name',
      description: 'Reciter Description',
      image: 'https://via.placeholder.com/300',
    },
    {
      id: '5678',
      name: 'Reciter Name',
      description: 'Reciter Description',
      image: 'https://via.placeholder.com/300',
    },
    {
      id: '91011',
      name: 'Reciter Name',
      description: 'Reciter Description',
      image: 'https://via.placeholder.com/300',
    },
    {
      id: '121314',
      name: 'Reciter Name',
      description: 'Reciter Description',
      image: 'https://via.placeholder.com/300',
    },
    {
      id: '151617',
      name: 'Reciter Name',
      description: 'Reciter Description',
      image: 'https://via.placeholder.com/300',
    },
    {
      id: '181920',
      name: 'Reciter Name',
      description: 'Reciter Description',
      image: 'https://via.placeholder.com/300',
    },
    {
      id: '212223',
      name: 'Reciter Name',
      description: 'Reciter Description',
      image: 'https://via.placeholder.com/300',
    },
    {
      id: '242526',
      name: 'Reciter Name',
      description: 'Reciter Description',
      image: 'https://via.placeholder.com/300',
    },
    {
      id: '272829',
      name: 'Reciter Name',
      description: 'Reciter Description',
      image: 'https://via.placeholder.com/300',
    },
    {
      id: '303132',
      name: 'Reciter Name',
      description: 'Reciter Description',
      image: 'https://via.placeholder.com/300',
    },
  ]);

  return (
    <main className="w-full sm:w-3/4 h-full flex flex-col p-4 sm:p-8 overflow-scroll">
      <h1 className="text-xl sm:text-2xl font-bold text-white">All Reciters</h1>
      <SearchBar />
      <div className="flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-8 mt-4 mb-20">
        {reciters.length ? (
          reciters.map((reciter) => (
            <PlaylistCard key={reciter.id} reciter={reciter} />
          ))
        ) : (
          <p className="text-white">No reciters found</p>
        )}
      </div>
    </main>
  );
}
