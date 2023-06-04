import { Container, Row, Col } from "react-bootstrap";
import { Tabs, Pagination, Space, Tag } from "antd";
import type { TabsProps } from "antd";

import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Redux/type";
import Blogs from "../components/Blogs";

const Home = () => {
  const [articles, setArticles] = useState<any>([]);
  const [tags, setTags] = useState<any>([]);
  const [tagParam, setTagParam] = useState<any>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(197);
  const [pageSize] = useState<number>(5);
  const user: any = useSelector((state: RootState) => state.user.user);

  const fetchGlobalArticles = async () => {
    const offset = (currentPage - 1) * pageSize;
    let apiUrl = `${process.env.REACT_APP_API_URL}/articles?limit=${pageSize}&offset=${offset}`;
    if (tagParam) {
      apiUrl += `&tag=${tagParam}`;
    }
    const response = await axios.get(apiUrl);
    const { articles, articlesCount } = response.data;
    setArticles(articles);
    setTotalItems(articlesCount);
  };

  useEffect(() => {
    if (tagParam || currentPage !== 1) {
      fetchGlobalArticles();
    }
  }, [currentPage, tagParam]);

  const fetchTags = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/tags`);
    setTags(res.data.tags);
  };
  useEffect(() => {
    fetchGlobalArticles();
    fetchTags();
  }, []);

  const onChange = (key: string) => {
    switch (key) {
      case "1":
        console.log("1");
        break;
      case "2":
        setCurrentPage(1); // Reset currentPage when switching tabs
        fetchGlobalArticles();
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
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Tab 1`,
    },
    {
      key: "2",
      label: `Tab 2`,
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
      <Row className="mt-4">
        <Col md={9}>
          <Tabs defaultActiveKey="2" items={visibleItems} onChange={onChange} />
          <div>
            {articles.map((article: any, index: number) => (
              <div key={index}>
                <Blogs article={article} />
                <hr />
              </div>
            ))}
          </div>

          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={totalItems}
            onChange={handlePaginationChange}
          />
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
