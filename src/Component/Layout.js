import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = ({ isOpen, setIsOpen, isAuthenticated, logout, role, children }) => {
  return (
    <div className={`min-h-screen w-full ${isAuthenticated ? 'lg:grid lg:grid-cols-[280px_1fr]' : ''}`}>
      <Sidebar logout={logout} role={role} isOpen={isOpen} setIsOpen={setIsOpen} />
      <div>
        <Header isAuthenticated={isAuthenticated} isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className="flex flex-col">
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;