import { Container, Row, Col } from "react-bootstrap";
import { Tabs, Pagination, Space, Tag } from "antd";
import type { TabsProps } from "antd";

import { useState, useEffect, useContext } from "react";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Redux/type";
import Blogs from "../components/Blogs";
import { api } from "../services/AxiosInstance";
import Loading from "../components/Loading";

import { dataImage } from "../dataImage/dataImage";
import FeedArticle from "../components/FeedArticle/FeedArticle";
import GlobalArticle from "../components/GlobalArticle/GlobalArticle";
import { useNavigate } from "react-router-dom";
import { IUser } from "../TypeInTypeScript/TypeUser";
import { IArticle, IArticleArray } from "../TypeInTypeScript/TypeArticle";
import { tabContext } from "../App";

const Home = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const [tagsArticles, setTagsArticles] = useState<IArticleArray>([]);

  const [currentPageFeed, setCurrentPageFeed] = useState<number>(1);
  const [currentPageGlobal, setCurrentPageGlobal] = useState<number>(1);

  const [totalItemsOfTagArticles, setTotalItemsOfTagArticles] =
    useState<number>(300);
  const [pageSize] = useState<number>(5);

  const user: IUser = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const tabValueContext: any = useContext(tabContext);
  const {
    showArticles,
    setShowArticle,
    currentPageTags,
    setCurrentPageTags,
    tagParam,
    setTagParam,
    activeTab,
    setActiveTab,
  } = tabValueContext;

  const fetchTagArticles = async () => {
    setLoading(true);
    const offset = (currentPageTags - 1) * pageSize;
    let apiUrl = `/articles?tag=${tagParam}&limit=${pageSize}&offset=${offset}`;
    const response = await api.get(apiUrl);
    const { articles, articlesCount } = response.data;
    setTagsArticles(articles);
    setTotalItemsOfTagArticles(articlesCount);
    setLoading(false);
  };

  useEffect(() => {
    fetchTagArticles();
  }, [currentPageTags]);

  useEffect(() => {
    fetchTagArticles();
  }, [tagParam]);

  const onChange = (key: string) => {
    setActiveTab(key);
    switch (key) {
      case "your-feed":
        setShowArticle("your-feed");
        setCurrentPageFeed(1);
        break;
      case "global-feed":
        setShowArticle("global-feed");
        setTagParam("");
        setCurrentPageGlobal(1);
        break;
      case "tags":
        setCurrentPageTags(1);
        setTagParam("");
        break;
      default:
        break;
    }
  };

  const handlePaginationChange = (page: number) => {
    setCurrentPageTags(page);
  };

  const items: TabsProps["items"] = [
    {
      key: "your-feed",
      label: `Your Feed`,
      children: (
        <FeedArticle
          showArticles={showArticles}
          currentPageFeed={currentPageFeed}
          setCurrentPageFeed={setCurrentPageFeed}
          pageSize={pageSize}
        />
      ),
    },
    {
      key: "global-feed",
      label: `Global Feed`,
      children: (
        <GlobalArticle
          showArticles={showArticles}
          currentPageGlobal={currentPageGlobal}
          setCurrentPageGlobal={setCurrentPageGlobal}
          pageSize={pageSize}
        />
      ),
    },

    {
      key: "tags",
      label: `${tagParam.length === 0 ? `` : `# ${tagParam}`}`,
    },
  ];

  const visibleItems = user.username ? items : items.slice(1); /// cho vaof useMemo

  return (
    <Container>
      <Row className="">
        <Col md={12}>
          <Tabs
            activeKey={activeTab}
            items={visibleItems}
            onChange={onChange}
          />

          {showArticles === "tags" && (
            <Loading isLoading={loading}>
              {tagsArticles.map((article: IArticle) => (
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
          {tagsArticles.length === 0 ? (
            ""
          ) : (
            <>
              {showArticles === "tags" && (
                <div className="text-center">
                  <Pagination
                    current={currentPageTags}
                    pageSize={pageSize}
                    total={totalItemsOfTagArticles}
                    onChange={handlePaginationChange}
                  />
                </div>
              )}
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
