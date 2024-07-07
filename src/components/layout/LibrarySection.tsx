import { HiOutlineHome } from 'react-icons/hi';
import { NavLink } from 'react-router-dom';

import '/android-chrome-192x192.png';

export default function LibrarySection() {
  return (
    <aside className="w-1/4 h-full bg-[#191624] p-8">
      <div className="flex flex-col items-center justify-center">
        <img
          src="/android-chrome-192x192.png"
          alt="Logo"
          className="w-16 h-16 object-cover rounded-full"
        />
        <h1 className="mt-4 text-lg font-bold text-white">Quran Player App</h1>
      </div>

      <nav className="mt-8">
        <ul className="space-y-4">
          <li>
            <NavLink
              to="/"
              className="flex flex-row justify-start items-center my-8 text-sm font-medium text-gray-400 hover:text-cyan-400"
              activeClassName="text-cyan-400"
            >
              <HiOutlineHome className="w-6 h-6 mr-2" />
              <span>Home</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
