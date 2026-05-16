import React, { useState } from 'react';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import SideMenu from './SideMenu';

const Navbar = ({activeMenu}) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
      <div className="flex h-16 items-center gap-4 px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          aria-label="Toggle navigation menu"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 min-[1080px]:hidden"
          onClick={() => setOpenSideMenu((prev) => !prev)}
        >
          {openSideMenu ? (
            <HiOutlineX className="text-2xl" />
          ) : (
            <HiOutlineMenu className="text-2xl" />
          )}
        </button>

        <div>
          <h1 className="text-base font-bold text-slate-950 sm:text-lg">
            Team Task Manager
          </h1>
          <p className="hidden text-xs text-slate-500 sm:block">
            Organize work, track progress, and keep the team aligned
          </p>
        </div>
      </div>

      {openSideMenu && (
        <div className="fixed inset-x-0 top-16 z-40 border-b border-slate-200 bg-white shadow-xl min-[1080px]:hidden">
          <SideMenu activeMenu={activeMenu} isMobile />
        </div>
      )}
    </header>
  )
}

export default Navbar
