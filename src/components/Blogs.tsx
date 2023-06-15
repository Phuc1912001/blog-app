import React, { useEffect, useState } from "react";
import { Tag, Space, Button } from "antd";

import { CommentOutlined, HeartFilled } from "@ant-design/icons";

import moment from "moment";
import { useNavigate } from "react-router-dom";
import { FavoriteButton } from "./Button/FavoriteButton";
import { FollowButton } from "./Button/FollowButton";

import { useSelector } from "react-redux";
import { RootState } from "../Redux/type";
import Comment from "./Comment/Comment";

import { api } from "../services/AxiosInstance";

const Blogs = ({ article, imageUrl }: any) => {
  const [toggleComment, setToggleComment] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [allCommentInBlog, setAllCommentInBlog] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const user: any = useSelector((state: RootState) => state.user.user);
  const articleRedux: any = useSelector(
    (state: RootState) => state.article.article
  );

  const navigate = useNavigate();

  const fetchComment = async () => {
    const commentBlog = await api.get(
      `${process.env.REACT_APP_API_URL}/articles/${article?.slug}/comments`
    );
    setAllCommentInBlog(commentBlog?.data?.comments);
  };
  useEffect(() => {
    fetchComment();
  }, []);

  const { author, tagList } = article;
  const handleDetailBlog = () => {
    navigate(`/articles/${article.slug}`);
  };

  const handleProfileUser = () => {
    navigate(`/profiles/${author.username}`);
  };

  const handleToggleComment = () => {
    if (user.username) {
      setToggleComment(!toggleComment);
    } else {
      navigate(`/login`);
    }
  };

  return (
    <div className="shadow rounded p-4 m-4 ">
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center justify-content-center  gap-3">
          <img
            src={author.image}
            alt="avatar"
            style={{
              height: "40px",
              width: "40px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
          <div>
            <div
              role="button"
              className="text-warning"
              onClick={handleProfileUser}
            >
              {author.username}
            </div>
            <div className="text-secondary">
              {moment(article.createdAt).fromNow()}
            </div>
          </div>
        </div>
        <div>
          {article?.author?.username === user.username ? (
            ""
          ) : (
            <FollowButton article={article} />
          )}
        </div>
      </div>
      <div className="mt-2 mb-2" role="button" onClick={handleDetailBlog}>
        <div>
          <p>{article.title}</p>
        </div>
        <div className="wrapper-img">
          <img src={`${imageUrl}`} className="img-blog" alt="" />
        </div>

        <div className="d-flex align-items-center justify-content-between mt-2 mb-2">
          <div className="text-secondary"></div>
          <div>
            <Space size={[0, 8]} wrap>
              {tagList.map((tag: string, index: number) => (
                <Tag
                  key={index}
                  color="magenta"
                  className="d-flex justify-content-center align-items-center"
                >
                  {tag}
                </Tag>
              ))}
            </Space>
          </div>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-between ">
        <div className="d-flex align-items-center gap-1 ">
          <div className="d-flex align-items-center text-danger ">
            <HeartFilled />
          </div>
          <div> {favoriteCount}</div>
        </div>
        <div>{allCommentInBlog.length} comment</div>
      </div>
      <hr />
      <div className="d-flex align-items-center justify-content-around">
        <div>
          <FavoriteButton
            article={article}
            favoriteCount={favoriteCount}
            setFavoriteCount={setFavoriteCount}
          />
        </div>
        <div>
          <Button onClick={handleToggleComment} icon={<CommentOutlined />}>
            Comment
          </Button>
        </div>
      </div>

      {toggleComment && (
        <>
          <hr />
          <Comment
            user={user}
            article={article}
            setAllCommentInBlog={setAllCommentInBlog}
            loading={loading}
            setLoading={setLoading}
          />
        </>
      )}
    </div>
  );
};

export default Blogs;
