import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faShareNodes } from '@fortawesome/free-solid-svg-icons';

library.add(faShareNodes)

const Navbar = () => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log(inputValue);
  };

  const handleChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setInputValue(e.target.value);
  };
  
  return (
    <nav className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24 sm:h-16 flex-wrap">
          <div className="flex-shrink-0">
            <span className="text-xl font-bold">DrawLive</span>
          </div>
          <div className='flex'>
            <div className="text-white bg-gray-700 hover:bg-gray-800 mr-1 px-2 py-1 flex justify-center items-center rounded-md text-sm">
              <FontAwesomeIcon icon="share-nodes" />
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
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
