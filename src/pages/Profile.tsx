import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Blogs from "../components/Blogs";
import { Tabs, Pagination, Space, Tag } from "antd";
import type { TabsProps } from "antd";

const Profile = () => {
  const params = useParams();
  const [profile, setProfile] = useState<any>(null);
  const [articles, setArticles] = useState<any>([]);
  const { username } = params;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(197);
  const [pageSize] = useState<number>(5);

  const fetchProfileUser = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/profiles/${username}`
    );
    setProfile(response.data.profile);
  };

  const fetchMyArticle = async () => {
    const offset = (currentPage - 1) * pageSize;
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/articles?author=${username}&limit=${pageSize}&offset=${offset}`
    );
    const { articles, articlesCount } = res.data;
    setArticles(articles);
    setTotalItems(articlesCount);
  };

  useEffect(() => {
    fetchProfileUser();
  }, [username]);

  useEffect(() => {
    fetchMyArticle();
  }, []);

  useEffect(() => {
    fetchMyArticle();
  }, [currentPage]);

  const handlePaginationChange = (page: number) => {
    setCurrentPage(page);
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

  const onChange = (key: string) => {
    switch (key) {
      case "1":
        setCurrentPage(1); // Reset currentPage when switching tabs
        fetchMyArticle();
        break;
      case "2":
        console.log("2");

        break;
      default:
        break;
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <img
            src={profile?.image}
            alt="avatar"
            style={{
              height: "50px",
              width: "50px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
          <h3 className="text-warning">{profile?.username}</h3>
          <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
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
      </Row>
    </Container>
  );
};

export default Profile;
