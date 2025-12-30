import React, { useState } from 'react';
import { Share2 } from 'lucide-react';

const Navbar = () => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(inputValue);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  
  return (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24 sm:h-16 flex-wrap">
          <div className="shrink-0">
            <span className="text-xl font-bold">DrawLive</span>
          </div>
          <div className='flex items-center'>
            {/* 2. Use the icon component directly */}
            <div className="text-white bg-gray-700 hover:bg-gray-800 mr-2 p-2 flex justify-center items-center rounded-md cursor-pointer">
              <Share2 size={18} strokeWidth={2.5} />
            </div>
            
            <form onSubmit={handleSubmit} className="flex items-center">
              <input
                type="text"
                value={inputValue}
                onChange={handleChange}
                className="border rounded-md py-1 px-2 mr-2 w-32"
                placeholder="Enter link"
              />
              <button type="submit" className="bg-gray-700 hover:bg-gray-800 text-white py-1 px-2 rounded w-20">
                Connect
              </button>
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;