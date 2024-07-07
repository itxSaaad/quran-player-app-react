import { Outlet } from 'react-router-dom';

import LibrarySection from './LibrarySection';

export default function MainLayout() {
  return (
    <div className="flex flex-row items-center justify-evenly w-full h-full">
      <LibrarySection />
      <Outlet />
    </div>
  );
}
