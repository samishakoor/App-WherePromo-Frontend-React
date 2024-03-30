import React, { useState } from 'react';
import { FaHeart } from 'react-icons/fa'; // Import the heart icon

import Signedin_Navbar from './signedin_navbar';

function Favorites() {
  // State variables to manage selected option and favorite items for articles and shops
  const [selectedOption, setSelectedOption] = useState('articles');
  const [favoriteArticles, setFavoriteArticles] = useState([]);
  const [favoriteShops, setFavoriteShops] = useState([]);

  // Function to handle switching between articles and shops
  const handleOptionChange = (option: React.SetStateAction<string>) => {
    setSelectedOption(option);
  };

  return (
    <>
      <Signedin_Navbar />
      <div className="container flex flex-col items-center justify-center max-w-full mt-10 mb-10">
        {/* Heading */}
        <h1 className="text-3xl text-center mb-4">Favourites</h1>

        {/* Toggle menu */}
        <div className="toggle-menu flex justify-center mb-4">
          <button
            className={`toggle-button ${selectedOption === 'articles' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} hover:bg-blue-600 hover:text-white px-4 py-2 rounded-l-md`}
            onClick={() => handleOptionChange('articles')}
          >
            Articles
          </button>
          <button
            className={`toggle-button ${selectedOption === 'shops' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} hover:bg-blue-600 hover:text-white px-4 py-2 rounded-r-md`}
            onClick={() => handleOptionChange('shops')}
          >
            Shops
          </button>
        </div>

        {/* Display favorite items based on selected option */}
        {selectedOption === 'articles' && (
          <div className="favorite-articles">
            <div className="flex flex-col grow px-6 py-7 mx-auto w-full font-medium bg-white rounded-3xl shadow leading-[124.5%] max-md:px-5 max-md:mt-10 relative">
              <img
                loading="lazy"
                srcSet="src\assets\article.png"
                className="w-full aspect-[1.56]"
              />
              <div className="mt-6 flex items-center">
                <div className="text-lg tracking-wide text-zinc-950">Article Name</div>
                <FaHeart
                  className={`ml-2 cursor-pointer 'text-gray-500'}`}
                />
              </div>
              <div className="flex gap-5 justify-between mt-6 text-base tracking-normal text-slate-500">
                <div>14-29 June</div>
                <div className="flex-auto">by Robbin joseph</div>
              </div>
                      </div>
                      
          </div>
        )}

       {selectedOption === 'shops' && (
  <div className="favorite-shops flex justify-center flex-wrap">
    <div className="flex flex-col items-center relative">
      <img
        loading="lazy"
        src="src/assets/store.png" 
        className="w-full aspect-[0.87]" 
        alt="Shop 1"
      />
      <div className="mt-2 text-base">Store Name 1</div>
    </div>
    <div className="flex flex-col items-center relative">
      <img
        loading="lazy"
        src="src/assets/store.png" 
        className="w-full aspect-[0.87]" 
        alt="Shop 2"
      />
      <div className="mt-2 text-base">Store Name 2</div>
                      </div>
                        <div className="flex flex-col items-center relative">
      <img
        loading="lazy"
        src="src/assets/store.png" 
        className="w-full aspect-[0.87]" 
        alt="Shop 1"
      />
      <div className="mt-2 text-base">Store Name 1</div>
    </div>
    <div className="flex flex-col items-center relative">
      <img
        loading="lazy"
        src="src/assets/store.png" 
        className="w-full aspect-[0.87]" 
        alt="Shop 2"
      />
      <div className="mt-2 text-base">Store Name 2</div>
                      </div>
                        <div className="flex flex-col items-center relative">
      <img
        loading="lazy"
        src="src/assets/store.png" 
        className="w-full aspect-[0.87]" 
        alt="Shop 1"
      />
      <div className="mt-2 text-base">Store Name 1</div>
    </div>
    <div className="flex flex-col items-center relative">
      <img
        loading="lazy"
        src="src/assets/store.png" 
        className="w-full aspect-[0.87]" 
        alt="Shop 2"
      />
      <div className="mt-2 text-base">Store Name 2</div>
    </div>
  </div>
)}

      </div>
    </>
  );
}

export default Favorites;
