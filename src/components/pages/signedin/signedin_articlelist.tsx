import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";

function Signedin_ArticleList() {
  let [articles, setArticles] = useState<any>([]);

  async function fetchArticles() {
    let isMounted = true;
    const token = window.localStorage.getItem("token");
    if (!token) {
      throw new Error("no token supplied");
    }
    const response = await axios.get(
      "http://localhost:3000/api/v1/articles/?sort_by=createdAt&page=1&per_page=10&order_by=desc",
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    if (response.status == 200) {
      if (isMounted) {
        console.log(response.data.data);
        setArticles(response.data.data);
      }
    } else {
      alert("Hello");
    }
  }

  useEffect(() => {
    fetchArticles();
  }, []);

  const getFormattedArticleDate = (createdAt: string) => {
    const date = new Date(createdAt);
    const day = date.getDate();
    const year = date.getFullYear().toString().slice(-2);
    const month = date.toLocaleString("default", { month: "short" });
    const formattedDate = `${day}-${year} ${month}`;
    return formattedDate;
  };

  const handleFavourite = async (isFavourite: boolean, articleId: String) => {
    const token = window.localStorage.getItem("token");
    if (!token) {
      throw new Error("no token supplied");
    }

    if (isFavourite) {
      try {
        const response = await axios.delete(
          `http://localhost:3000/api/v1/favourites/dislike/${articleId}`,
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(token)}`,
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
        if (response.status === 200) {
          await fetchArticles();
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          if (axiosError.response && axiosError.response.status === 500) {
            alert("Something went wrong");
          } else {
            alert("Something went wrong");
          }
        } else {
          alert("Something went wrong");
        }
      }
    } else {
      try {
        const itemData = {
          itemId: articleId,
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
        if (response.status === 200) {
          await fetchArticles();
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          if (axiosError.response && axiosError.response.status === 500) {
            alert("Something went wrong");
          } else {
            alert("Something went wrong");
          }
        } else {
          alert("Something went wrong");
        }
      }
    }
  };

  return (
    <div className="flex flex-col items-center self-stretch pl-12 mt-9 w-full max-md:pl-5 max-md:max-w-full">
      <div className="self-stretch max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          {articles.map(
            (e: {
              _id: string;
              title: string;
              createdAt: string;
              author: string;
              isFavourite: boolean;
            }) => {
              return (
                <div className="flex flex-col w-[27%] max-md:ml-0 max-md:w-full">
                  <div className="flex flex-col grow px-6 py-7 mx-auto w-full font-medium bg-white rounded-3xl shadow leading-[124.5%] max-md:px-5 max-md:mt-10">
                    <img
                      loading="lazy"
                      srcSet="src\assets\article.png"
                      className="w-full aspect-[1.56]"
                    />

                    <div className="mt-6 flex items-center">
                      <div className="text-lg tracking-wide text-zinc-950">
                        {e.title}
                      </div>

                      {e.isFavourite ? (
                        <FaHeart
                          className="ml-2 cursor-pointer text-red-500"
                          style={{ width: "1.5em", height: "1.25em" }}
                          onClick={() => handleFavourite(e.isFavourite, e._id)}
                        />
                      ) : (
                        <CiHeart
                          className="ml-2 cursor-pointer text-black-500"
                          style={{ width: "2em", height: "1.55em" }}
                          onClick={() => handleFavourite(e.isFavourite, e._id)}
                        />
                      )}
                    </div>
                    <div className="flex gap-5 justify-between mt-6 text-base tracking-normal text-slate-500">
                      <div>{getFormattedArticleDate(e.createdAt)}</div>
                      <div className="flex-auto">by {e.author}</div>
                    </div>

                    {/* <div className="mt-6 text-lg tracking-wide text-zinc-950">
                      {e.title}
                    </div>

                    <br></br>
                    <div className="block gap-5 justify-between mt-6 text-base tracking-normal text-slate-500">
                      <div>{e.createdAt}</div>
                      <div className="flex-auto"> by {e.author}</div>
                    </div> */}
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
      <div className="mt-36 ml-6 text-3xl tracking-widest leading-10 text-center text-zinc-800 max-md:mt-10 max-md:max-w-full">
        Navigate Your Retail Adventure
      </div>
      <div className="mt-11 ml-6 text-xl text-center text-zinc-400 max-md:mt-10 max-md:max-w-full">
        Find your required market place with great ease, through the map.
      </div>
    </div>
  );
}

export default Signedin_ArticleList;
