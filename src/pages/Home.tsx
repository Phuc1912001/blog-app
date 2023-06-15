import { Container, Row, Col } from "react-bootstrap";
import { Tabs, Pagination, Space, Tag } from "antd";
import type { TabsProps } from "antd";
import {
  AppstoreAddOutlined,
  ShopOutlined,
  FireOutlined,
  BulbOutlined,
  PlaySquareOutlined,
  HeartOutlined,
  BarChartOutlined,
  SketchOutlined,
  SettingOutlined,
  DollarOutlined,
  GlobalOutlined,
  MessageOutlined,
  PushpinOutlined,
  ShoppingCartOutlined,
  TrophyOutlined,
  SoundOutlined,
} from "@ant-design/icons";

import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Redux/type";
import Blogs from "../components/Blogs";
import { api } from "../services/AxiosInstance";
import Loading from "../components/Loading";
import { infoTagsPopular } from "../Redux/feature/tagsSlice";
import { dataImage } from "../dataImage/dataImage";
import FeedArticle from "../components/FeedArticle/FeedArticle";
import GlobalArticle from "../components/GlobalArticle/GlobalArticle";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const [tagsArticles, setTagsArticles] = useState<any>([]);
  const [tags, setTags] = useState<any>([]);
  const [tagParam, setTagParam] = useState<any>("");
  const [currentPageFeed, setCurrentPageFeed] = useState<number>(1);
  const [currentPageGlobal, setCurrentPageGlobal] = useState<number>(1);
  const [currentPageTags, setCurrentPageTags] = useState<number>(1);

  const [totalItemsOfTagArticles, setTotalItemsOfTagArticles] =
    useState<number>(300);
  const [pageSize] = useState<number>(5);
  const [showArticles, setShowArticle] = useState<string>("global-feed");

  const [activeTab, setActiveTab] = useState<string>("global-feed");

  const user: any = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const fetchTagArticles = async () => {
    setLoading(true);
    const offset = (currentPageTags - 1) * pageSize;
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
  }, []);

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

  const handleClickTags = (tag: any) => {
    setTagParam(tag);
    setActiveTab("tags");
    setShowArticle("tags");
    setCurrentPageTags(1);
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

  const handleNewArticle = () => {
    navigate(`/editor`);
  };
  const handleSetting = () => {
    navigate(`/settings`);
  };

  return (
    <Container>
      <Row className="">
        <Col md={2} className="shadow rounded p-3 ">
          <div
            className="d-flex align-items-center gap-3 text-propover "
            role="button"
            onClick={handleNewArticle}
          >
            <AppstoreAddOutlined />
            <div> New Article</div>
          </div>
          <div
            className="d-flex align-items-center gap-3 text-propover "
            role="button"
            onClick={handleSetting}
          >
            <SettingOutlined />
            <div> Settings</div>
          </div>
          <div className="d-flex align-items-center gap-3 ">
            <FireOutlined />
            <div> Games</div>
          </div>
          <div className="d-flex align-items-center gap-3 ">
            <BulbOutlined />
            <div> Ideal</div>
          </div>
          <hr />
          <div className="d-flex align-items-center gap-3 ">
            <PlaySquareOutlined />
            <div> Reel</div>
          </div>
          <div className="d-flex align-items-center gap-3 ">
            <HeartOutlined />
            <div> Love</div>
          </div>
          <div className="d-flex align-items-center gap-3 ">
            <BarChartOutlined />
            <div> Analysis</div>
          </div>
          <div className="d-flex align-items-center gap-3 ">
            <SketchOutlined />
            <div> Donate</div>
          </div>
          <hr />
          <div className="d-flex align-items-center gap-3 ">
            <SoundOutlined />
            <div> Notify</div>
          </div>
          <div className="d-flex align-items-center gap-3 ">
            <TrophyOutlined />
            <div> Cup</div>
          </div>
          <div className="d-flex align-items-center gap-3 ">
            <ShoppingCartOutlined />
            <div> Shop</div>
          </div>
          <div className="d-flex align-items-center gap-3 ">
            <PushpinOutlined />
            <div> Ghim</div>
          </div>
          <hr />
          <div className="d-flex align-items-center gap-3 ">
            <MessageOutlined />
            <div> Message</div>
          </div>
          <div className="d-flex align-items-center gap-3 ">
            <GlobalOutlined />
            <div> Global</div>
          </div>
          <div className="d-flex align-items-center gap-3 ">
            <DollarOutlined />
            <div> Coins</div>
          </div>
          <div className="d-flex align-items-center gap-3 ">
            <SketchOutlined />
            <div> Donate</div>
          </div>
          <hr />
          <div className="d-flex align-items-center gap-3 ">
            <ShopOutlined />
            <div> Shop</div>
          </div>
        </Col>
        <Col
          md={7}
          style={{ height: "90vh", overflow: "scroll", overflowX: "hidden" }}
        >
          <Tabs
            activeKey={activeTab}
            items={visibleItems}
            onChange={onChange}
          />

          {showArticles === "tags" && (
            <Loading isLoading={loading}>
              {tagsArticles.map((article: any) => (
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
        <Col md={3}>
          <div className=" p-3">
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
