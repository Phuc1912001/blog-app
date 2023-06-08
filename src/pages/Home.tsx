import { Container, Row, Col } from "react-bootstrap";
import { Tabs, Pagination, Space, Tag } from "antd";
import type { TabsProps } from "antd";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Redux/type";
import Blogs from "../components/Blogs";
import { api } from "../services/AxiosInstance";
import Loading from "../components/Loading";
import { infoTagsPopular } from "../Redux/feature/tagsSlice";

const Home = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [globalArticles, setGlobalArticles] = useState<any>([]);
  const [feedArticles, setFeedGlobalArticles] = useState<any>([]);
  const [tagsArticles, setTagsArticles] = useState<any>([]);
  const [tags, setTags] = useState<any>([]);
  const [tagParam, setTagParam] = useState<any>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItemsOfGlobalArticles, setTotalItemsOfGlobalArticles] =
    useState<number>(300);
  const [totalItemsOfFeedArticles, setTotalItemsOfFeedArticles] =
    useState<number>(300);
  const [totalItemsOfTagArticles, setTotalItemsOfTagArticles] =
    useState<number>(300);
  const [pageSize] = useState<number>(5);
  const [showArticles, setShowArticle] = useState<string>("global-feed");

  const [activeTab, setActiveTab] = useState<string>("global-feed");

  const user: any = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch<AppDispatch>();

  const fetchGlobalArticles = async () => {
    setLoading(true);
    const offset = (currentPage - 1) * pageSize;
    let apiUrl = `${process.env.REACT_APP_API_URL}/articles?limit=${pageSize}&offset=${offset}`;
    const response = await api.get(apiUrl);
    const { articles, articlesCount } = response.data;
    setGlobalArticles(articles);
    setTotalItemsOfGlobalArticles(articlesCount);
    setLoading(false);
  };
  const fetchFeedArticles = async () => {
    setLoading(true);
    const offset = (currentPage - 1) * pageSize;
    let apiUrl = `${process.env.REACT_APP_API_URL}/articles/feed?limit=${pageSize}&offset=${offset}`;

    const response = await api.get(apiUrl);
    const { articles, articlesCount } = response.data;
    setFeedGlobalArticles(articles);
    setTotalItemsOfFeedArticles(articlesCount);
    setLoading(false);
  };

  const fetchTagArticles = async () => {
    setLoading(true);
    const offset = (currentPage - 1) * pageSize;
    console.log("tagParam", tagParam);

    let apiUrl = `${process.env.REACT_APP_API_URL}/articles?tag=${tagParam}&limit=${pageSize}&offset=${offset}`;

    const response = await api.get(apiUrl);
    const { articles, articlesCount } = response.data;
    setTagsArticles(articles);
    setTotalItemsOfTagArticles(articlesCount);
    setLoading(false);
  };

  const fetchTags = async () => {
    setLoading(true);
    const res = await api.get(`${process.env.REACT_APP_API_URL}/tags`);
    setTags(res.data.tags);
    dispatch(infoTagsPopular(res.data.tags));
    setLoading(false);
  };

  useEffect(() => {
    fetchTags();
    fetchGlobalArticles();
  }, []);

  useEffect(() => {
    fetchGlobalArticles();
    if (user.username) {
      fetchFeedArticles();
    }
    fetchTagArticles();
  }, [currentPage]);

  useEffect(() => {
    fetchTagArticles();
  }, [tagParam]);

  useEffect(() => {
    if (user.username) {
      fetchFeedArticles();
    }
  }, [user]);

  const onChange = (key: string) => {
    setActiveTab(key);
    switch (key) {
      case "your-feed":
        setShowArticle("your-feed");
        setCurrentPage(1);
        fetchFeedArticles();
        break;
      case "global-feed":
        console.log("tao đây");
        setShowArticle("global-feed");
        setTagParam("");
        setCurrentPage(1);
        fetchGlobalArticles();
        break;
      case "tags":
        setCurrentPage(1);
        setTagParam("");
        break;
      default:
        break;
    }
  };

  const handlePaginationChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleClickTags = (tag: any) => {
    setTagParam(tag);
    setActiveTab("tags");
    setShowArticle("tags");
    setCurrentPage(1);
  };

  const items: TabsProps["items"] = [
    {
      key: "your-feed",
      label: `Your Feed`,
    },
    {
      key: "global-feed",
      label: `Global Feed`,
    },

    {
      key: "tags",
      label: `${tagParam.length === 0 ? `` : `# ${tagParam}`}`,
    },
  ];

  const visibleItems = user.username ? items : items.slice(1);

  const colorTags = [
    "magenta",
    "red",
    "volcano",
    "orange",
    "gold",
    "lime",
    "green",
    "blue",
    "cyan",
    "geekblue",
    "purple",
  ];

  return (
    <Container>
      <Row className="">
        <Col md={9}>
          <Tabs
            activeKey={activeTab}
            items={visibleItems}
            onChange={onChange}
          />
          {showArticles === "your-feed" && (
            <div>
              {feedArticles.length === 0 ? (
                <Loading isLoading={loading} className="mt-5 mb-5">
                  làm ơn hãy follow
                </Loading>
              ) : (
                <Loading isLoading={loading}>
                  {feedArticles.map((article: any) => (
                    <div key={article.slug}>
                      <Blogs article={article} />
                    </div>
                  ))}
                </Loading>
              )}
            </div>
          )}

          {showArticles === "global-feed" && (
            <Loading isLoading={loading}>
              {globalArticles.map((article: any) => (
                <div key={article.slug}>
                  <Blogs article={article} />
                </div>
              ))}
            </Loading>
          )}

          {showArticles === "tags" && (
            <Loading isLoading={loading}>
              {tagsArticles.map((article: any) => (
                <div key={article.slug}>
                  <Blogs article={article} />
                </div>
              ))}
            </Loading>
          )}

          {showArticles === "your-feed" && (
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={totalItemsOfFeedArticles}
              onChange={handlePaginationChange}
            />
          )}
          {showArticles === "global-feed" && (
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={totalItemsOfGlobalArticles}
              onChange={handlePaginationChange}
            />
          )}
          {showArticles === "tags" && (
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={totalItemsOfTagArticles}
              onChange={handlePaginationChange}
            />
          )}
        </Col>
        <Col md={3}>
          <div className="bg-light p-3">
            <p>Popular Tag</p>
            <Space size={[0, 8]} wrap>
              {tags.map((tag: any, index: number) => (
                <Tag
                  role="button"
                  key={index}
                  color={colorTags[index % colorTags.length]}
                  onClick={() => handleClickTags(tag)}
                >
                  {tag}
                </Tag>
              ))}
            </Space>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
