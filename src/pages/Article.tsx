import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import moment from "moment";
import { Space, Tag } from "antd";

import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Redux/type";
import { infoArticle } from "../Redux/feature/articleSlice";
import Loading from "../components/Loading";
import * as message from "../components/Message";
import { api } from "../services/AxiosInstance";
import UserAction from "../components/UserAction/UserAction";
import Comment from "../components/Comment/Comment";

const Article = () => {
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [articleLoaded, setArticleLoaded] = useState<boolean>(false);
  console.log("article trong acrticle", article);

  const params = useParams();
  const { slug } = params;

  const user: any = useSelector((state: RootState) => state.user.user);

  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const fetchAnArticle = async () => {
    setLoading(true);

    const response = await api.get(
      `${process.env.REACT_APP_API_URL}/articles/${slug}`
    );
    setArticle(response.data.article);
    dispatch(infoArticle(response.data.article));
    setLoading(false);
    setArticleLoaded(true);
  };

  useEffect(() => {
    fetchAnArticle();
  }, [slug]);

  const handleProfileUser = () => {
    navigate(`/profiles/${article?.author?.username}`);
  };

  const handleEdit = () => {
    navigate(`/editor/${slug}`);
  };

  const confirm = async () => {
    await api.delete(`${process.env.REACT_APP_API_URL}/articles/${slug}`);
    message.success("Delete is successfully");
    navigate(`/`);
  };

  return (
    <Loading isLoading={loading}>
      <Container className="pt-5">
        <Row>
          <Col md={12} className="mb-5">
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
                  <h6
                    role="button"
                    className="text-warning"
                    onClick={handleProfileUser}
                  >
                    {article?.author?.username}
                  </h6>
                  <p className="text-secondary">
                    {moment(article?.createdAt).format("MMMM D, YYYY")}
                  </p>
                </div>
              </div>
              <UserAction
                article={article}
                user={user}
                handleEdit={handleEdit}
                confirm={confirm}
              />
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
          <hr />
          <Col md={12}>
            {articleLoaded && <Comment user={user} article={article} />}
          </Col>
        </Row>
      </Container>
    </Loading>
  );
};

export default Article;
