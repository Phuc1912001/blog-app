import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import Blogs from "../components/Blogs";
import { Tabs, Pagination, Space, Tag } from "antd";
import type { TabsProps } from "antd";

import { useSelector } from "react-redux";
import { RootState } from "../Redux/type";
import Loading from "../components/Loading";
import { api } from "../services/AxiosInstance";
import { FollowButton } from "../components/Button/FollowButton";

const Profile = () => {
  const params = useParams();
  const [profile, setProfile] = useState<any>(null);
  const [myArticles, setMyArticles] = useState<any>([]);
  const [favoriteArticles, setFavoriteArticles] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("my-article");
  const [show, setShow] = useState<string>("my-article");

  const { username } = params;

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItemsOfMyArticle, setTotalItemsOfMyArticle] =
    useState<number>(197);
  const [totalItemsOfFavoriteArticle, setTotalItemsOfFavoriteArticle] =
    useState<number>(197);
  const [pageSize] = useState<number>(5);

  const user: any = useSelector((state: RootState) => state.user.user);

  const fetchProfileUser = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/profiles/${username}`
    );
    setProfile(response.data.profile);
  };

  const fetchMyArticle = async () => {
    setLoading(true);
    const offset = (currentPage - 1) * pageSize;
    const res = await api.get(
      `${process.env.REACT_APP_API_URL}/articles?author=${username}&limit=${pageSize}&offset=${offset}`
    );
    const { articles, articlesCount } = res.data;
    setMyArticles(articles);
    setTotalItemsOfMyArticle(articlesCount);
    setLoading(false);
  };

  const fetchMyFavoriteArticle = async () => {
    setLoading(true);
    const offset = (currentPage - 1) * pageSize;
    const myFavoriteArticle = await api.get(
      `${process.env.REACT_APP_API_URL}/articles?favorited=${username}&limit=${pageSize}&offset=${offset}`
    );
    const { articles, articlesCount } = myFavoriteArticle.data;
    setFavoriteArticles(articles);
    setTotalItemsOfFavoriteArticle(articlesCount);
    setLoading(false);
  };

  useEffect(() => {
    fetchProfileUser();
    fetchMyArticle();
  }, [username]);

  useEffect(() => {
    fetchMyArticle();
    fetchMyFavoriteArticle();
  }, [currentPage]);

  const handlePaginationChange = (page: number) => {
    setCurrentPage(page);
  };

  const onChange = (key: string) => {
    setActiveTab(key);
    switch (key) {
      case "my-article":
        setCurrentPage(1);
        setShow("my-article");
        fetchMyArticle();
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
    },
    {
      key: "favorite-article",
      label: `Favoriste Article`,
    },
  ];

  return (
    <Container>
      <Row>
        <Col>
          <div className="d-flex flex-column align-items-center justify-content-center ">
            <img
              src={profile?.image}
              alt="avatar"
              style={{
                height: "100px",
                width: "100px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
            <h3 role="button" className="text-warning">
              {profile?.username}
            </h3>
          </div>

          <Tabs activeKey={activeTab} items={items} onChange={onChange} />

          {show === "my-article" && (
            <Loading isLoading={loading}>
              <div>
                {myArticles.map((article: any, index: number) => (
                  <div key={index}>
                    <Blogs article={article} />
                  </div>
                ))}
              </div>
            </Loading>
          )}

          {show === "favorite-article" && (
            <Loading isLoading={loading}>
              <div>
                {favoriteArticles.map((article: any, index: number) => (
                  <div key={index}>
                    <Blogs article={article} />
                  </div>
                ))}
              </div>
            </Loading>
          )}

          {show === "my-article" && (
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={totalItemsOfMyArticle}
              onChange={handlePaginationChange}
            />
          )}
          {show === "favorite-article" && (
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={totalItemsOfFavoriteArticle}
              onChange={handlePaginationChange}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
