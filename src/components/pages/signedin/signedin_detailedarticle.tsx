// import { useParams } from 'react-router-dom';
import { FaHeart } from "react-icons/fa"; // Import the heart icon
import { useEffect, useState } from "react";
import coverImage from "../signedin/articlecover.png";
import axios from "axios";
import { useParams } from "react-router-dom";
import Signedin_Navbar from "./signedin_navbar";

function Signedin_DetailedArticle() {
  const { id } = useParams();
  const [isFavorite, setIsFavorite] = useState(false); // State to manage favorite status

  let [articleData, setData] = useState<any>({});

  useEffect(() => {
    async function fetchArticle() {
      const token = window.localStorage.getItem("token");
      if (!token) {
        throw new Error("no token supplied");
      }
      const response = await axios.get(
        `http://localhost:3000/api/v1/articles/${id}`,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      if (response.status == 200) {
        console.log(response.data);
        setData(response.data.data);
        setIsFavorite(response.data.data.isFavourite);
      } else {
        alert("Hello");
      }
    }
    fetchArticle();
  }, []);

  // Function to toggle favorite status
  const toggleFavorite = async () => {
    if (isFavorite === false) {
      const token = window.localStorage.getItem("token");
      if (!token) {
        throw new Error("no token supplied");
      }
      const itemData = {
        itemId: articleData["_id"],

        itemType: "article",
      };
      const response = await axios.post(
        "http://localhost:3000/api/v1/favourites/like",
        itemData,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      if (response.status == 200) {
        alert("Sucess");
      }
    } else {
      const token = window.localStorage.getItem("token");
      if (!token) {
        throw new Error("no token supplied");
      }
      const response = await axios.delete(
        `http://localhost:3000/api/v1/favourites/dislike/${id}`,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      if (response.status == 200) {
        alert("Sucess");
      }
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <div>
      <Signedin_Navbar />
      <div className="flex flex-col items-center justify-center h-full">
        <img
          src={coverImage} // Use the imported image
          alt="Article Cover"
          className="w-full aspect-[3.33] max-md:max-w-full"
        />
        <div className="flex flex-col self-center px-5 mt-24 w-full max-w-screen-lg max-md:mt-10 max-md:max-w-full">
          <div className="flex justify-between items-center">
            <div className="self-center text-5xl tracking-widest leading-[69.12px] text-zinc-800 max-md:text-4xl">
              Article {articleData.title}
            </div>
            <button
              className={`px-4 py-2 bg-transparent border border-gray-500 rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-600 focus:outline-none`}
              onClick={toggleFavorite}
            >
              <FaHeart className={`mr-2 ${isFavorite ? "text-red-500" : ""}`} />
              {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </button>
          </div>
          <div className="mt-14 text-base font-bold tracking-normal leading-5 underline text-neutral-600 max-md:mt-10 max-md:max-w-full">
            By {articleData.author}
          </div>
          <div className="mt-5 text-base font-medium tracking-normal leading-5 text-neutral-600 max-md:max-w-full">
            {articleData.createdAt}
          </div>
          <div className="mt-14 text-xl leading-10 text-zinc-400 max-md:mt-10 max-md:max-w-full">
            {articleData.content}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signedin_DetailedArticle;
