import React, { useContext } from 'react'
import { UserContext } from '../../context/userContext';
import Navbar from './Navbar';
import SideMenu from './SideMenu';

const DashboardLayout = ({children, activeMenu}) => {
  const {user} = useContext(UserContext);

  return (
    <div className="min-h-screen bg-transparent">
      <Navbar activeMenu={activeMenu}/>

      {user && (
        <div className="flex">
          <aside className="hidden min-[1080px]:block">
            <SideMenu activeMenu={activeMenu}/>
          </aside>

          <main className="min-w-0 flex-1 px-4 py-5 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-7xl">
              {children}
            </div>
          </main>
        </div>
      )}
    </div>
  )
}

export default DashboardLayout
