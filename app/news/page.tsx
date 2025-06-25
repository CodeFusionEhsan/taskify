'use client'
import React, { useEffect } from "react";
import { useState } from "react";
import { Jost } from 'next/font/google';

const jost = Jost({ subsets: ['latin'], weight: ['400', '600'] });

type Article = {
  title: string;
  description: string;
  url: string;
  image: string;
  publishedAt: string;
  source: { name: string; url: string };
};

export default function NewsPage() {
  const[limit, setLimit] = useState(20)
  const[loading, setLoading] = useState(false)
  const[articles, setArticles]= useState<Article[]>([])

  async function fetchNews(limit: number) {

    const API_KEY = process.env.GNEWS_API_KEY;
    console.log(API_KEY)

    const res = await fetch(
        `https://gnews.io/api/v4/top-headlines?lang=en&topic=technology&max=${limit}&apikey=a1fe63b203b6cef0fcef1a2633250ae1`
    );
    const data = await res.json();
    console.log(data)
    const new_articles = articles.concat(data.articles)
    setArticles(new_articles || [])
    console.log(articles)
  }

  useEffect(() => {
    fetchNews(limit)
  }, [])

  const handleLoadMore = async () => {
    setLoading(true)
    setLimit(limit+10)
    await fetchNews(limit)
    setLoading(false)
  }

  return (
    <main className={`${jost.className} w-full min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 px-4 py-8`}>
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        <span className="inline-flex items-center gap-2">
          <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 21H5a2 2 0 01-2-2V7a2 2 0 012-2h2l2-2h6l2 2h2a2 2 0 012 2v12a2 2 0 01-2 2z" />
          </svg>
          Latest Science & Business News
        </span>
      </h1>
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.length === 0 && !loading && (
          <div className="col-span-full text-center text-gray-500">No news found.</div>
        )}
        {articles.map((article, idx) => (
          <a
            key={idx}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden group"
          >
            <div className="h-48 w-full bg-gray-200 flex items-center justify-center overflow-hidden">
              {article.image ? (
                <img
                  src={article.image}
                  alt={article.title}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              )}
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <h2 className="font-semibold text-lg mb-2 text-gray-800 line-clamp-2">{article.title}</h2>
              <p className="text-gray-600 text-sm flex-1 mb-3 line-clamp-3">{article.description}</p>
              <div className="flex items-center justify-between mt-auto">
                <span className="inline-flex items-center gap-1 text-xs text-blue-600">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm2 0v10h12V5H4zm2 2h8v2H6V7zm0 4h5v2H6v-2z" />
                  </svg>
                  {article.source.name}
                </span>
                <span className="text-xs text-gray-400">
                  {new Date(article.publishedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </a>
        ))}
      </section>
      <div className="flex justify-center mt-8">
          <button
            onClick={handleLoadMore}
            className="px-6 py-2 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition-colors disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Loading..." : "Load More"}
          </button>
      </div>
    </main>
  );
}
