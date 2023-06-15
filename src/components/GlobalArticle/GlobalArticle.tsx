import React, { useEffect, useState } from "react";
import Loading from "../Loading";
import { api } from "../../services/AxiosInstance";
import Blogs from "../Blogs";
import { dataImage } from "../../dataImage/dataImage";
import { Pagination } from "antd";

const GlobalArticle = ({
  showArticles,
  currentPageGlobal,
  pageSize,
  setCurrentPageGlobal,
}: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [globalArticles, setGlobalArticles] = useState<any>([]);
  const [totalItemsOfGlobalArticles, setTotalItemsOfGlobalArticles] =
    useState<number>(300);

  const fetchGlobalArticles = async () => {
    setLoading(true);
    const offset = (currentPageGlobal - 1) * pageSize;
    let apiUrl = `${process.env.REACT_APP_API_URL}/articles?limit=${pageSize}&offset=${offset}`;
    const response = await api.get(apiUrl);
    const { articles, articlesCount } = response.data;
    setGlobalArticles(articles);
    setTotalItemsOfGlobalArticles(articlesCount);
    setLoading(false);
  };

  useEffect(() => {
    fetchGlobalArticles();
  }, [currentPageGlobal]);

  const handlePaginationChangeGlobal = (page: number) => {
    setCurrentPageGlobal(page);
  };

  return (
    <div>
      {showArticles === "global-feed" && (
        <Loading isLoading={loading}>
          {globalArticles.map((article: any) => (
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
