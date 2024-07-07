import { HiOutlineHome } from 'react-icons/hi';
import { NavLink } from 'react-router-dom';

import '/android-chrome-192x192.png';

export default function LibrarySection() {
  return (
    <aside className="w-1/4 h-full bg-[#191624] p-4 sm:p-8">
      <div className="flex flex-col items-center justify-center">
        <img
          src="/android-chrome-192x192.png"
          alt="Logo"
          className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-full"
        />
        <h1 className="mt-4 text-md sm:text-lg font-bold text-white sm:block hidden">
          Quran Player App
        </h1>
      </div>

      <nav className="mt-8">
        <ul className="space-y-4">
          <li>
            <NavLink
              to="/"
              className="flex flex-col sm:flex-row justify-center sm:justify-start items-center text-sm font-medium text-gray-400 hover:text-cyan-400 animate-slowfade"
            >
              <HiOutlineHome className="w-6 h-6 mb-2 sm:mb-0 sm:mr-2" />
              <span className="sm:inline-block hidden">Home</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
