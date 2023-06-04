import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import moment from "moment";
import { Button, Space, Tag } from "antd";
import { HeartFilled } from "@ant-design/icons";

const Article = () => {
  const [article, setArticle] = useState<any>(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);

  const params = useParams();
  const { slug } = params;

  const fetchAnArticle = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/articles/${slug}`
    );
    setArticle(response.data.article);
  };

  useEffect(() => {
    fetchAnArticle();
  }, [slug]);

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
  };
  const handleFollow = () => {
    setIsFollowed(!isFollowed);
  };

  return (
    <Container className="pt-5">
      <Row>
        <Col md={12}>
          <h2>{article?.title}</h2>
          <div className="d-flex align-items-center gap-3">
            <div className="d-flex align-items-center gap-3">
              <img
                src={article?.author?.image}
                alt="avatar"
                style={{
                  height: "50px",
                  width: "50px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
              <div>
                <h6 className="text-warning">{article?.author?.username}</h6>
                <p className="text-secondary">
                  {moment(article?.createdAt).format("MMMM D, YYYY")}
                </p>
              </div>
            </div>
            <Button
              type={isFavorited ? "primary" : "default"}
              icon={<HeartFilled />}
              size="small"
              style={{
                display: "flex",
                alignItems: "center",
                color: isFavorited ? "white" : "blue",
                border: `1px solid ${isFavorited ? "" : "blue"} `,
              }}
              ghost={!isFavorited}
              onClick={handleFavorite}
            >
              <span>{`${isFavorited ? "UnFavorite" : "Favorite"} Article (${
                article?.favoritesCount
              })`}</span>
            </Button>
            <Button
              icon={<HeartFilled />}
              size="small"
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: isFollowed ? "green" : "inherit",
                color: isFollowed ? "white" : "green",
                border: `1px solid ${isFollowed ? "" : "green"} `,
              }}
              ghost={!isFollowed}
              onClick={handleFollow}
            >
              <span>{`${isFollowed ? "UnFollow" : "UnFollow"} ${
                article?.author?.username
              } `}</span>
            </Button>
          </div>
          <p>{article?.body}</p>
          <div>
            <Space size={[0, 8]} wrap>
              {article?.tagList.map((tag: string, index: number) => (
                <Tag key={index} color="green">
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

export default Article;
