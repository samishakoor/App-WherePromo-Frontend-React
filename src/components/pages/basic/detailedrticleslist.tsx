import React from 'react';
import { Link } from 'react-router-dom';


interface Article {
    id: number;
    name: string;
    author: string;
    date: string;
    content: string;
    image: string;
    filter?: string; // Optional filter property
}

interface DetailedArticlesListProps {
    filter?: string; // Make the filter prop optional
    searchQuery?: string;
}

const DetailedArticlesList: React.FC<DetailedArticlesListProps> = ({ filter, searchQuery }) => {
    // Assuming you have a list of articles data
    const articles: Article[] = [
        { id: 1, name: 'Article 1', author: 'Robbin Joseph', date: '14-29 June', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', image: 'src/assets/article.png' },
               { id: 2, name: 'Article 2', author: 'Robbin Joseph', date: '14-29 June', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', image: 'src/assets/article.png' }

    ];

    const filteredArticles = filter ? articles.filter(article => article.filter === filter) : articles;

    const searchedArticles = searchQuery ?
        filteredArticles.filter(article => article.name.toLowerCase().includes(searchQuery.toLowerCase())) :
        filteredArticles;

    return (
        <div>
            {searchedArticles.map(article => (
                <Link to={`/article/${article.id}`} key={article.id}>
                <div key={article.id} className="p-6 mt-16 bg-white rounded-3xl shadow max-md:px-5 max-md:mt-10 max-md:max-w-full">
                    <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                        <div className="flex flex-col w-[27%] max-md:ml-0 max-md:w-full">
                            <img
                                loading="lazy"
                                srcSet={article.image}
                                alt="Article Image"
                                className="grow w-full aspect-[1.02] max-md:mt-10"
                            />
                        </div>
                        <div className="flex flex-col ml-5 w-[73%] max-md:ml-0 max-md:w-full">
                            <div className="flex flex-col mt-1 font-medium leading-[124.5%] max-md:mt-10 max-md:max-w-full">
                                <div className="flex gap-5 max-md:flex-wrap max-md:max-w-full">
                                    <div className="flex-auto text-3xl tracking-wide text-zinc-950">
                                        {article.name}
                                    </div>
                                    <div className="flex-auto self-start text-base tracking-normal text-slate-500">
                                        by {article.author}
                                    </div>
                                </div>
                                <div className="mt-10 text-xl leading-10 text-zinc-400 max-md:max-w-full">
                                    {article.content}
                                </div>
                                <div className="self-end mt-6 text-base tracking-normal text-slate-500">
                                    {article.date}
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                    </Link>
            ))}
        </div>
    );
}

export default DetailedArticlesList;
