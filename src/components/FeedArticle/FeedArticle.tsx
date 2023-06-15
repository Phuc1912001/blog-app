import React, { useEffect, useState } from "react";
import Loading from "../Loading";
import Blogs from "../Blogs";
import { api } from "../../services/AxiosInstance";
import { dataImage } from "../../dataImage/dataImage";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/type";
import { Pagination } from "antd";

const FeedArticle = ({
  showArticles,
  pageSize,
  currentPageFeed,
  setCurrentPageFeed,
}: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [feedArticles, setFeedGlobalArticles] = useState<any>([]);
  const [totalItemsOfFeedArticles, setTotalItemsOfFeedArticles] =
    useState<number>(300);

  const user: any = useSelector((state: RootState) => state.user.user);
  console.log("alo feed article");

  const fetchFeedArticles = async () => {
    setLoading(true);
    const offset = (currentPageFeed - 1) * pageSize;
    let apiUrl = `${process.env.REACT_APP_API_URL}/articles/feed?limit=${pageSize}&offset=${offset}`;

    const response = await api.get(apiUrl);
    const { articles, articlesCount } = response.data;
    setFeedGlobalArticles(articles);
    setTotalItemsOfFeedArticles(articlesCount);
    setLoading(false);
  };

  useEffect(() => {
    if (user.username && currentPageFeed) {
      fetchFeedArticles();
    }
  }, [user.username, currentPageFeed]);

  const handlePaginationChangeFeed = (page: number) => {
    setCurrentPageFeed(page);
  };

  return (
    <div>
      {showArticles === "your-feed" && (
        <div>
          {feedArticles.length === 0 ? (
            <Loading isLoading={loading} className="mt-5 ">
              làm ơn hãy follow
            </Loading>
          ) : (
            <Loading isLoading={loading}>
              {feedArticles.map((article: any) => (
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
        </div>
      )}

      {feedArticles.length === 0 ? (
        ""
      ) : (
        <>
          {showArticles === "your-feed" && (
            <div className="text-center">
              <Pagination
                current={currentPageFeed}
                pageSize={pageSize}
                total={totalItemsOfFeedArticles}
                onChange={handlePaginationChangeFeed}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FeedArticle;
