import { useParams } from 'react-router-dom';
import coverImage from '../basic/articlecover.png';

function DetailedArticle() {
  const { id } = useParams();

  // Fetch the article data based on the ID and display it

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <img
        src={coverImage} // Use the imported image
        alt="Article Cover"
        className="w-full aspect-[3.33] max-md:max-w-full"
      />
      <div className="flex flex-col self-center px-5 mt-24 w-full max-w-screen-lg max-md:mt-10 max-md:max-w-full">
        <div className="self-center text-5xl tracking-widest leading-[69.12px] text-zinc-800 max-md:text-4xl">
          Article {id}
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

export default DetailedArticle;
