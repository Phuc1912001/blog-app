import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import moment from "moment";
import { Space, Tag } from "antd";
import { HeartFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Redux/type";
import { infoArticle } from "../Redux/feature/articleSlice";
import Loading from "../components/Loading";
import * as message from "../components/Message";
import { api } from "../services/AxiosInstance";
import UserAction from "../components/UserAction/UserAction";
import Comment from "../components/Comment/Comment";
import { dataImage } from "../dataImage/dataImage";
import { IUser } from "../TypeInTypeScript/TypeUser";
import { IArticle } from "../TypeInTypeScript/TypeArticle";

const Article = () => {
  const [article, setArticle] = useState<IArticle | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [articleLoaded, setArticleLoaded] = useState<boolean>(false);

  const [favoriteCount, setFavoriteCount] = useState(article?.favoritesCount);
  const [showFullTitle, setShowFullTitle] = useState(false);

  const params = useParams();
  const { slug } = params;

  const user: IUser = useSelector((state: RootState) => state.user.user);

  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const fetchAnArticle = async () => {
    setLoading(true);
    const response = await api.get(`/articles/${slug}`);
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
    await api.delete(`/articles/${slug}`);
    message.success("Delete is successfully");
    navigate(`/`);
  };

  const fomatBody = article?.body || "";
  const newBody = fomatBody.replace(/\\n/g, "<br>");

  const truncatedTitle = article?.title?.substring(0, 50);

  const handleClickReadMore = () => {
    setShowFullTitle(true);
  };

  const handleClickHide = () => {
    setShowFullTitle(false);
  };
  console.log("article", article?.favoritesCount);

  return (
    <Loading isLoading={loading}>
      <Container className="pt-5">
        <Row className="detail-article">
          <Col md={8}>
            <div>
              <img
                src={`${
                  dataImage[Math.floor(Math.random() * dataImage.length)]
                    .imageUrl
                }`}
                onError={(e: any) => {
                  e.target.src =
                    "https://bizweb.dktcdn.net/100/321/653/themes/738854/assets/no-product.jpg?1685344097426";
                }}
                className="w-100 rounded img-detail "
                alt=""
              />
            </div>
            <div className="mt-2">
              <div dangerouslySetInnerHTML={{ __html: newBody }} />
            </div>
            <div className="comment-small">
              {articleLoaded && <Comment user={user} article={article} />}
            </div>
          </Col>
          <Col md={4}>
            <Col md={12} className="">
              <div>
                <div className="d-flex align-items-center gap-3">
                  {article?.author?.image && (
                    <img
                      src={article.author.image}
                      alt="avatar"
                      className="img-avatar-blog"
                    />
                  )}
                  <div>
                    <div
                      role="button"
                      className="text-warning"
                      onClick={handleProfileUser}
                    >
                      {article?.author?.username}
                    </div>
                    <p className="text-secondary">
                      {article?.updatedAt
                        ? moment(article?.updatedAt).fromNow()
                        : moment(article?.createdAt).fromNow()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-2">
                <h2>{showFullTitle ? article?.title : truncatedTitle}</h2>
                {!showFullTitle &&
                  article?.title &&
                  article?.title.length > 50 && (
                    <span
                      onClick={handleClickReadMore}
                      className="text-propover "
                      role="button"
                    >
                      ...Read More
                    </span>
                  )}
                {showFullTitle &&
                  article?.title &&
                  article?.title.length > 50 && (
                    <span
                      onClick={handleClickHide}
                      className="text-propover "
                      role="button"
                    >
                      Hide
                    </span>
                  )}
              </div>
              <div>
                {article?.tagList && (
                  <Space size={[0, 8]} wrap>
                    {article.tagList.map((tag: string, index: number) => (
                      <Tag key={index} color="green">
                        {tag}
                      </Tag>
                    ))}
                  </Space>
                )}
              </div>

              <hr />
              <div className="d-flex align-items-center gap-1 ">
                <div className="d-flex align-items-center text-danger ">
                  <HeartFilled />
                </div>
                <div>{favoriteCount || article?.favoritesCount}</div>
              </div>

              <hr />
              <UserAction
                article={article}
                user={user}
                handleEdit={handleEdit}
                confirm={confirm}
                favoriteCount={favoriteCount}
                setFavoriteCount={setFavoriteCount}
              />
            </Col>
            <hr />
            <Col md={12} className="comment-lage">
              {articleLoaded && <Comment user={user} article={article} />}
            </Col>
          </Col>
        </Row>
      </Container>
    </Loading>
  );
};

export default Article;
