import React, { useEffect, useState } from "react";
import Loading from "../Loading";
import Blogs from "../Blogs";
import { dataImage } from "../../dataImage/dataImage";
import { api } from "../../services/AxiosInstance";
import { Pagination } from "antd";
import { IArticleArray } from "../../TypeInTypeScript/TypeArticle";

const MyArticle = ({
  show,
  currentPageMyArticle,
  pageSize,
  username,
  setCurrentPageMyArticle,
}: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [myArticles, setMyArticles] = useState<IArticleArray>([]);
  const [totalItemsOfMyArticle, setTotalItemsOfMyArticle] =
    useState<number>(197);

  const fetchMyArticle = async () => {
    setLoading(true);
    const offset = (currentPageMyArticle - 1) * pageSize;
    const res = await api.get(
      `/articles?author=${username}&limit=${pageSize}&offset=${offset}`
    );
    const { articles, articlesCount } = res.data;
    setMyArticles(articles);
    setTotalItemsOfMyArticle(articlesCount);
    setLoading(false);
  };

  useEffect(() => {
    fetchMyArticle();
  }, [username, currentPageMyArticle]);

  const handlePaginationChangeMyArticle = (page: number) => {
    setCurrentPageMyArticle(page);
  };

  return (
    <div>
      {show === "my-article" && (
        <Loading isLoading={loading}>
          <div>
            {myArticles.map((article: any, index: number) => (
              <div key={index}>
                <Blogs
                  article={article}
                  imageUrl={
                    dataImage[Math.floor(Math.random() * dataImage.length)]
                      .imageUrl
                  }
                />
              </div>
            ))}
          </div>
        </Loading>
      )}
      {myArticles.length === 0 ? (
        " "
      ) : (
        <>
          {show === "my-article" && (
            <div className="text-center">
              <Pagination
                current={currentPageMyArticle}
                pageSize={pageSize}
                total={totalItemsOfMyArticle}
                onChange={handlePaginationChangeMyArticle}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MyArticle;
