import React, { useEffect, useState } from "react";
import Loading from "../Loading";
import { api } from "../../services/AxiosInstance";
import Blogs from "../Blogs";
import { dataImage } from "../../dataImage/dataImage";
import { Pagination } from "antd";
import { IArticle, IArticleArray } from "../../TypeInTypeScript/TypeArticle";

interface IPropGlobalArticle {
  showArticles: any;
  currentPageGlobal: any;
  pageSize: any;
  setCurrentPageGlobal: any;
}

const GlobalArticle = ({
  showArticles,
  currentPageGlobal,
  pageSize,
  setCurrentPageGlobal,
}: IPropGlobalArticle) => {
  console.log("đã vao global Article");

  const [loading, setLoading] = useState<boolean>(false);
  const [globalArticles, setGlobalArticles] = useState<IArticleArray>([]);
  const [totalItemsOfGlobalArticles, setTotalItemsOfGlobalArticles] =
    useState<number>(300);
  const fetchGlobalArticles = async () => {
    setLoading(true);
    const offset = (currentPageGlobal - 1) * pageSize;
    let apiUrl = `/articles?limit=${pageSize}&offset=${offset}`;
    const response = await api.get(apiUrl);
    const { articles, articlesCount } = response.data;
    setGlobalArticles(articles);
    setTotalItemsOfGlobalArticles(articlesCount);
    setLoading(false);
  };

  useEffect(() => {
    fetchGlobalArticles();
  }, [currentPageGlobal]);

  useEffect(() => {
    fetchGlobalArticles();
  }, [showArticles]);

  const handlePaginationChangeGlobal = (page: number) => {
    setCurrentPageGlobal(page);
  };

  return (
    <div>
      {showArticles === "global-feed" && (
        <Loading isLoading={loading}>
          {globalArticles.map((article: IArticle) => (
            <div key={article.slug}>
              <Blogs
                article={article}
                imageUrl={
                  dataImage[Math.floor(Math.random() * dataImage.length)]
                    .imageUrl
                }
              />
            </div>
          ))}
        </Loading>
      )}
      {globalArticles.length === 0 ? (
        ""
      ) : (
        <>
          {showArticles === "global-feed" && (
            <div className="text-center">
              <Pagination
                current={currentPageGlobal}
                pageSize={pageSize}
                total={totalItemsOfGlobalArticles}
                onChange={handlePaginationChangeGlobal}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default GlobalArticle;
