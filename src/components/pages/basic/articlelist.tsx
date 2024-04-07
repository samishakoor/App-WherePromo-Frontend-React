import axios from "axios";
import {
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useState,
} from "react";

function ArticleList() {
  let [articles, setArticles] = useState<any>([]);
  useEffect(() => {
    async function fetchArticles() {
      const response = await axios.get(
        "http://localhost:3000/api/v1/articles/?sort_by=createdAt&page=1&per_page=10&order_by=desc",
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      if (response.status == 200) {
        console.log(response.data.data);
        setArticles(response.data.data);
      } else {
        alert("Hello");
      }
    }
    fetchArticles();
  }, []);

  return (
    <div className="flex flex-col items-center self-stretch pl-12 mt-9 w-full max-md:pl-5 max-md:max-w-full">
      <div className="self-stretch max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          {articles.map(
            (e: {
              title:
                | string
                | number
                | boolean
                | ReactElement<any, string | JSXElementConstructor<any>>
                | Iterable<ReactNode>
                | ReactPortal
                | null
                | undefined;
              createdAt:
                | string
                | number
                | boolean
                | ReactElement<any, string | JSXElementConstructor<any>>
                | Iterable<ReactNode>
                | ReactPortal
                | null
                | undefined;
              author:
                | string
                | number
                | boolean
                | ReactElement<any, string | JSXElementConstructor<any>>
                | Iterable<ReactNode>
                | ReactPortal
                | null
                | undefined;
            }) => {
              return (
                <div className="flex flex-col w-[27%] max-md:ml-0 max-md:w-full">
                  <div className="flex flex-col grow px-6 py-7 mx-auto w-full font-medium bg-white rounded-3xl shadow leading-[124.5%] max-md:px-5 max-md:mt-10">
                    <img
                      loading="lazy"
                      srcSet="src\assets\article.png"
                      className="w-full aspect-[1.56]"
                    />
                    <div className="mt-6 text-lg tracking-wide text-zinc-950">
                      {e.title}
                    </div>
                    <br></br>
                    <div className="block gap-5 justify-between mt-6 text-base tracking-normal text-slate-500">
                      <div>{e.createdAt}</div>
                      <div className="flex-auto"> by {e.author}</div>
                    </div>
                  </div>
                </div>
              );
            }
          )}
          {/* <div className="flex flex-col w-[27%] max-md:ml-0 max-md:w-full">
    
            <div className="flex flex-col grow px-6 py-7 mx-auto w-full font-medium bg-white rounded-3xl shadow leading-[124.5%] max-md:px-5 max-md:mt-10">
              <img
                loading="lazy"
                srcSet="src\assets\article.png"
                className="w-full aspect-[1.56]"
              />
              <div className="mt-6 text-lg tracking-wide text-zinc-950">
                Article Name
              </div>
              <div className="flex gap-5 justify-between mt-6 text-base tracking-normal text-slate-500">
                <div>14-29 June</div>
                <div className="flex-auto">by Robbin joseph</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[27%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow px-6 py-7 mx-auto w-full font-medium bg-white rounded-3xl shadow leading-[124.5%] max-md:px-5 max-md:mt-10">
              <img
                loading="lazy"
                srcSet="src\assets\article.png"
                className="w-full aspect-[1.56]"
              />
              <div className="mt-6 text-lg tracking-wide text-zinc-950">
                Article Name
              </div>
              <div className="flex gap-5 justify-between mt-6 text-base tracking-normal text-slate-500">
                <div>14-29 June</div>
                <div className="flex-auto">by Robbin joseph</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[27%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow px-6 py-7 mx-auto w-full font-medium bg-white rounded-3xl shadow leading-[124.5%] max-md:px-5 max-md:mt-10">
              <img
                loading="lazy"
                srcSet="src\assets\article.png"
                className="w-full aspect-[1.56]"
              />
              <div className="mt-6 text-lg tracking-wide text-zinc-950">
                Article Name
              </div>
              <div className="flex gap-5 justify-between mt-6 text-base tracking-normal text-slate-500">
                <div>14-29 June</div>
                <div className="flex-auto">by Robbin joseph</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[18%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow py-7 pl-6 mx-auto w-full font-medium bg-white rounded-3xl shadow leading-[124.5%] max-md:mt-10">
              <img
                loading="lazy"
                srcSet="src\assets\article.png"
                className="self-center aspect-[1.04] w-[168px]"
              />
              <div className="mt-6 text-lg tracking-wide text-zinc-950">
                Article Name
              </div>
              <div className="flex gap-5 justify-between mt-6 text-base tracking-normal text-slate-500">
                <div>14-29 June</div>
                <div>by Robbin joseph</div>
              </div>
            </div>
          </div> */}
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
export default ArticleList;
