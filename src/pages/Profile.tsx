import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Blogs from "../components/Blogs";
import { Tabs, Pagination, Button } from "antd";
import type { TabsProps } from "antd";
import {
  MessageOutlined,
  HomeOutlined,
  WifiOutlined,
  FileDoneOutlined,
  EnvironmentOutlined,
  FieldTimeOutlined,
  PictureOutlined,
} from "@ant-design/icons";

import Loading from "../components/Loading";
import { api } from "../services/AxiosInstance";
import { dataImage } from "../dataImage/dataImage";
import MyArticle from "../components/MyArticle/MyArticle";
import { truncate } from "lodash";

const Profile = () => {
  const params = useParams();
  const [profile, setProfile] = useState<any>(null);
  const [favoriteArticles, setFavoriteArticles] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("my-article");
  const [show, setShow] = useState<string>("my-article");
  const { username } = params;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentPageMyArticle, setCurrentPageMyArticle] = useState<number>(1);
  const [totalItemsOfFavoriteArticle, setTotalItemsOfFavoriteArticle] =
    useState<number>(0);
  const [pageSize] = useState<number>(5);

  const fetchProfileUser = async () => {
    const response = await api.get(`/profiles/${username}`);
    setProfile(response.data.profile);
  };

  const fetchMyFavoriteArticle = async () => {
    setLoading(true);
    const offset = (currentPage - 1) * pageSize;
    const myFavoriteArticle = await api.get(
      `/articles?favorited=${username}&limit=${pageSize}&offset=${offset}`
    );
    const { articles, articlesCount } = myFavoriteArticle.data;
    setFavoriteArticles(articles);
    setTotalItemsOfFavoriteArticle(articlesCount);
    setLoading(false);
  };

  useEffect(() => {
    fetchProfileUser();
  }, [username]);
  useEffect(() => {
    fetchMyFavoriteArticle();
  }, [username, currentPage]);

  const handlePaginationChange = (page: number) => {
    setCurrentPage(page);
  };

  const onChange = (key: string) => {
    setActiveTab(key);
    switch (key) {
      case "my-article":
        setCurrentPageMyArticle(1);
        setShow("my-article");

        break;
      case "favorite-article":
        setCurrentPage(1);
        setShow("favorite-article");
        fetchMyFavoriteArticle();
        break;

      default:
        break;
    }
  };
  const items: TabsProps["items"] = [
    {
      key: "my-article",
      label: `My Article`,
      children: (
        <MyArticle
          show={show}
          currentPageMyArticle={currentPageMyArticle}
          setCurrentPageMyArticle={setCurrentPageMyArticle}
          pageSize={pageSize}
          username={username}
        />
      ),
    },
    {
      key: "favorite-article",
      label: `Favoriste Article`,
    },
  ];

  return (
    <Container>
      <Row>
        <Col md={12} className="mb-5">
          <div className="cover-image">
            <img
              src={
                "https://thcsbevandan.edu.vn/wp-content/uploads/2022/09/anh-bia-dep-ve-phong-canh-thien-nhien-29-9554641.jpg"
              }
              className="img-fluid rounded w-100 "
              alt=""
            />
          </div>

          <div className="d-flex align-items-center justify-content-between  ">
            <div className="d-flex align-items-center gap-3">
              <img
                src={profile?.image}
                alt="avatar"
                className="img-undercover"
                onError={(e: any) => {
                  e.target.src =
                    "https://bizweb.dktcdn.net/100/321/653/themes/738854/assets/no-product.jpg?1685344097426";
                }}
              />
              <div>
                <h5 role="button" className="text-dark  ">
                  {profile?.username}
                </h5>
                <span>500 friend</span>
              </div>
            </div>

            <div className="btn-message">
              <Button
                className="d-flex align-items-center  "
                icon={<MessageOutlined />}
              >
                Message
              </Button>
            </div>
          </div>
        </Col>
        <Col className=" shadow p-3 bg-white rounded " md={4}>
          <div className="d-flex align-items-center gap-3 ">
            <HomeOutlined />
            <div> Live in Ha Noi</div>
          </div>
          <div className="d-flex align-items-center gap-3 ">
            <WifiOutlined />
            <div> Have 10 followers</div>
          </div>
          <div className="d-flex align-items-center gap-3 ">
            <FileDoneOutlined />
            <div>Studied at Soc Son High School</div>
          </div>
          <div className="d-flex align-items-center gap-3 ">
            <EnvironmentOutlined />
            <div> hometown in Soc Son</div>
          </div>
          <div className="d-flex align-items-center gap-3 ">
            <FieldTimeOutlined />
            <div> join on September 10, 2022</div>
          </div>

          <div className="img-profile">
            <hr />
            <div className="d-flex align-items-center gap-3 mb-3 ">
              <PictureOutlined />
              <div> My Image</div>
            </div>
            <Row>
              {dataImage?.map((image) => (
                <Col xs={6} md={6} key={image.id} className="mt-2">
                  <img
                    src={`${image.imageUrl}`}
                    alt=""
                    className="img-profile "
                    onError={(e: any) => {
                      e.target.src =
                        "https://bizweb.dktcdn.net/100/321/653/themes/738854/assets/no-product.jpg?1685344097426";
                    }}
                  />
                </Col>
              ))}
            </Row>
          </div>
        </Col>
        <Col md={8}>
          <Tabs activeKey={activeTab} items={items} onChange={onChange} />

          {show === "favorite-article" && (
            <Loading isLoading={loading}>
              <div>
                {favoriteArticles.map((article: any, index: number) => (
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

          {favoriteArticles.length === 0 ? (
            ""
          ) : (
            <>
              {show === "favorite-article" && (
                <div className="text-center">
                  <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={totalItemsOfFavoriteArticle}
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

export default Profile;
