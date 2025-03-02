import React, { useCallback } from 'react';
import { useLocation } from 'react-router-dom';

const pathToTitleMap = {
  '/booking': 'Bookings',
  '/customers': 'Customers',
  '/your-booking': 'Your Booking',
  '/all-bookings': 'All Bookings',
  '/employee/all-bookings': 'All Bookings',
  '/statistic': 'Statistic',
  '/employee/statistic': 'Statistic',
  '/employee/customers': 'Customers',
  '/services': 'Services',
  '/setting': 'Setting',
  '/settings/account': 'personal account',
  '/settings/privacy': 'Privacy',
};
const hiddenHeaderPaths = ['/login', '/signup','/'];

const ResponsiveHeader = React.memo(({ isOpen, setIsOpen,isAuthenticated }) => {
  const location = useLocation();
  const title = pathToTitleMap[location.pathname] || 'Page Title';

  const toggleMenu = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen, setIsOpen]);
  const isHeaderHidden = hiddenHeaderPaths.includes(location.pathname);
  if (isHeaderHidden) {
    return null;
  }

  return (
    <header className={`bg-secondColor p-4 h-12 flex items-center justify-between relative`}>
      {isAuthenticated &&(
        <button
        onClick={toggleMenu}
        className="lg:hidden flex flex-col justify-center items-center w-6 h-6"
      >
        <span className={`bg-firstColor h-0.5 w-full transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
        <span className={`bg-firstColor h-0.5 w-full my-1 ${isOpen ? 'opacity-0' : ''}`}></span>
        <span className={`bg-firstColor h-0.5 w-full transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
      </button>
      )}
      <h1 className="text-xl font-bold text-firstColor absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {title}
      </h1>
    </header>
  );
});

export default ResponsiveHeader;