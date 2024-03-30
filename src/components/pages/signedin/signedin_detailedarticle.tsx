import { useParams } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa'; // Import the heart icon
import { useState } from 'react';
import coverImage from '../signedin/articlecover.png';

function Signedin_DetailedArticle() {
  const { id } = useParams();
  const [isFavorite, setIsFavorite] = useState(false); // State to manage favorite status

  // Function to toggle favorite status
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <img
        src={coverImage} // Use the imported image
        alt="Article Cover"
        className="w-full aspect-[3.33] max-md:max-w-full"
      />
      <div className="flex flex-col self-center px-5 mt-24 w-full max-w-screen-lg max-md:mt-10 max-md:max-w-full">
        <div className="flex justify-between items-center">
          <div className="self-center text-5xl tracking-widest leading-[69.12px] text-zinc-800 max-md:text-4xl">
            Article Name
          </div>
          <button
            className={`px-4 py-2 bg-transparent border border-gray-500 rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-600 focus:outline-none`}
            onClick={toggleFavorite}
          >
            <FaHeart className={`mr-2 ${isFavorite ? 'text-red-500' : ''}`} />
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>
        </div>
        <div className="mt-14 text-base font-bold tracking-normal leading-5 underline text-neutral-600 max-md:mt-10 max-md:max-w-full">
          By Robbin joseph
        </div>
        <div className="mt-5 text-base font-medium tracking-normal leading-5 text-neutral-600 max-md:max-w-full">
          14-29 June
        </div>
        <div className="mt-14 text-xl leading-10 text-zinc-400 max-md:mt-10 max-md:max-w-full">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat.
        </div>
      </div>
    </div>
  );
}

export default Signedin_DetailedArticle;
