import React, { useContext, useEffect, useState } from 'react'
import { SIDE_MENU_DATA, SIDE_MENU_USER_DATA } from '../../utils/data';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import UserAvatar from '../UserAvatar';

const SideMenu = ({activeMenu, isMobile = false}) => {
  const { user, clearUser } = useContext(UserContext);
  const [sideMenuData, setSideMenuData] = useState([]);

  const navigate = useNavigate();

  const handleClick = (route) => {
    if(route === "logout") {
      handleLogout();
      return;
    }

    navigate(route);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  useEffect(() => {
    if (user) {
      setSideMenuData(user.role === "admin" ? SIDE_MENU_DATA : SIDE_MENU_USER_DATA);
    }
  }, [user]);

  return (
    <nav className={`${isMobile ? "h-auto w-full p-4" : "sticky top-16 h-[calc(100vh-4rem)] w-72 p-5"} border-r border-slate-200 bg-white/85 backdrop-blur-xl`}>
      <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4">
        <div className="flex items-center gap-3">
          <UserAvatar
            src={user?.profileImageUrl}
            name={user?.name}
            alt="Profile"
            className="h-12 w-12 rounded-full border-2 border-white object-cover shadow-sm"
          />

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="truncate text-sm font-bold text-slate-950">
                {user?.name || ""}
              </h2>
              {user?.role === "admin" && (
                <span className="rounded-full bg-blue-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                  Admin
                </span>
              )}
            </div>
            <p className="truncate text-xs text-slate-500">
              {user?.email || ""}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 space-y-1.5">
        {sideMenuData.map((item) => {
          const isActive = activeMenu === item.label;
          return (
            <button
              key={item.id}
              type="button"
              className={`w-full rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
                isActive
                  ? "bg-blue-600 text-white shadow-sm shadow-blue-600/20"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
              }`}
              onClick={() => handleClick(item.path)}
            >
              <span className="flex items-center gap-3">
                <item.icon className="text-xl" />
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

export default SideMenu
