import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import Header from "../components/Header";

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
import { Space, Tag } from "antd";
import { useState, useEffect, useContext } from "react";
import { api } from "../services/AxiosInstance";
import { tabContext } from "../App";

const LayoutBlog = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [tags, setTags] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const tabValueContext: any = useContext(tabContext);
  const { setTagParam, setActiveTab, setShowArticle, setCurrentPageTags } =
    tabValueContext;

  const fetchTags = async () => {
    setLoading(true);
    const res = await api.get(`/tags`);
    setTags(res.data.tags);

    setLoading(false);
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const handleNewArticle = () => {
    navigate(`/editor`);
  };
  const handleSetting = () => {
    navigate(`/settings`);
  };

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

  const handleClickTags = (tag: any) => {
    setTagParam(tag);
    setActiveTab("tags");
    setShowArticle("tags");
    setCurrentPageTags(1);
  };

  return (
    <Container fluid>
      <Row>
        <Col md={12} className="p-0">
          <div className="pt-3 pb-3 bg-white shadow sticky-top">
            <Header />
          </div>

          <Container>
            <Row>
              {location.pathname === "/" && (
                <Col md={2} className="shadow rounded p-3 sidebar sidebar ">
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
              )}

              <Col md={location.pathname === "/" ? 7 : undefined}>
                <Outlet />
              </Col>
              {location.pathname === "/" && (
                <Col md={3} className="tab">
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
              )}
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default LayoutBlog;
