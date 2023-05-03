import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <span className="text-xl font-bold">DrawLive</span>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
            <a href="#" className="text-white bg-gray-700 hover:bg-gray-800 transition-colors duration-300 px-3 py-2 rounded-md text-sm font-medium">Home</a>
            <a href="#" className="text-white bg-gray-700 hover:bg-gray-800 transition-colors duration-300 px-3 py-2 rounded-md text-sm font-medium">About</a>
            <a href="#" className="text-white bg-gray-700 hover:bg-gray-800 transition-colors duration-300 px-3 py-2 rounded-md text-sm font-medium">Contact</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
