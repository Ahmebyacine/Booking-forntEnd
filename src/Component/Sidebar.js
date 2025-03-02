import React from 'react';
import { PresentationChartBarIcon, PowerIcon } from "@heroicons/react/24/solid";
import CalendarIcon from "@/Assets/Icons/CalendarIcon";
import Package2Icon from "@/Assets/Icons/Package2Icon";
import HomeIcon from "@/Assets/Icons/HomeIcon";
import UsersIcon from "@/Assets/Icons/UsersIcon";
import ServiceIcon from "@/Assets/Icons/ServiceIcon";
import SettingsIcon from "@/Assets/Icons/SettingsIcon";
import { NavLink, useLocation} from "react-router-dom";
const hiddenHeaderPaths = ['/login', '/signup','/'];

const Sidebar = React.memo(({ logout, role, isOpen, setIsOpen }) => {
  const location = useLocation();
  const isHeaderHidden = hiddenHeaderPaths.includes(location.pathname);
  if (isHeaderHidden) {
    return null;
  }
  return (
    <>
      <div
        className={`fixed top-0 left-0 z-40 h-full lg:w-full w-64 bg-secondColor border-r transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:block`}
      >
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[60px] items-center border-b px-6">
            <div className="flex text-fristColor items-center gap-2 font-semibold">
              <Package2Icon className="h-6 w-6" />
              <span>Glamour Salon</span>
            </div>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700">
              <>

                {role === 'user' && (
                  <>
                    <NavLink to="/booking" className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all text-secondGray hover:text-primary">
                      <HomeIcon className="h-4 w-4" />
                      Dashboard
                    </NavLink>
                    <NavLink to="your-booking" className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all text-secondGray hover:text-primary">
                      <CalendarIcon className="h-4 w-4" />
                      Your Booking
                    </NavLink>
                  </>
                )}


                {role === 'admin' && (
                  <>
                    <NavLink to="/all-bookings" className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all text-secondGray hover:text-primary">
                      <CalendarIcon className="h-4 w-4" />
                      Bookings
                    </NavLink>
                    <NavLink to="/services" className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all text-secondGray hover:text-primary">
                      <ServiceIcon className="h-4 w-4" />
                      Services
                    </NavLink>
                    <NavLink to="/customers" className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all text-secondGray hover:text-primary">
                      <UsersIcon className="h-4 w-4" />
                      Customers
                    </NavLink>
                    <NavLink to="/statistic" className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all text-secondGray hover:text-primary">
                      <PresentationChartBarIcon className="h-5 w-5" />
                      Statistic
                    </NavLink>
                  </>
                )}


                {role === 'employee' && (
                  <>
                    <NavLink to="/employee/all-bookings" className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all text-secondGray hover:text-primary">
                      <CalendarIcon className="h-4 w-4" />
                      Bookings
                    </NavLink>
                    <NavLink to="/employee/customers" className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all text-secondGray hover:text-primary">
                      <UsersIcon className="h-4 w-4" />
                      Customers
                    </NavLink>
                    <NavLink to="/employee/statistic" className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all text-secondGray hover:text-primary">
                      <PresentationChartBarIcon className="h-5 w-5" />
                      Statistic
                    </NavLink>
                  </>
                )}


                <NavLink to="/setting" className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all text-secondGray hover:text-primary">
                   <SettingsIcon className="h-5 w-5" />
                   Setting
                 </NavLink>
                <button
                  onClick={logout}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all text-secondGray hover:text-primary"
                >
                  <PowerIcon className="h-4 w-4" />
                  Logout
                </button>
              </>
            </nav>
          </div>
        </div>
      </div>
      {isOpen && <div className="fixed inset-0 z-30 bg-black opacity-50 lg:hidden" onClick={() => setIsOpen(false)} />}
    </>
  );
});

export default Sidebar;