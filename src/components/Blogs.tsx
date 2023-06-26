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
import { IUser } from "../TypeInTypeScript/TypeUser";

interface IPropsBlog {
  article: any;
  imageUrl: any;
}

const Blogs = ({ article, imageUrl }: IPropsBlog) => {
  const [toggleComment, setToggleComment] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [allCommentInBlog, setAllCommentInBlog] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showFullTitle, setShowFullTitle] = useState(false);

  const user: IUser = useSelector((state: RootState) => state.user.user);

  const navigate = useNavigate();

  const fetchComment = async () => {
    const commentBlog = await api.get(`/articles/${article?.slug}/comments`);
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
  const handleClickReadMore = () => {
    setShowFullTitle(true);
  };

  const handleClickHide = () => {
    setShowFullTitle(false);
  };

  const truncatedTitle = article?.title?.substring(0, 50);

  return (
    <div className="shadow rounded p-4 m-4 ">
      <div className="d-flex align-items-center justify-content-between ">
        <div className="d-flex align-items-center justify-content-center  gap-3">
          <img src={author.image} alt="avatar" className="img-avatar-blog" />
          <div>
            <div
              role="button"
              className="text-warning"
              onClick={handleProfileUser}
            >
              {author.username}
            </div>
            <div className="text-secondary">
              {article?.updatedAt
                ? moment(article?.updatedAt).fromNow()
                : moment(article?.createdAt).fromNow()}
            </div>
          </div>
        </div>
        <div className="follow-blog">
          {article?.author?.username === user.username ? (
            ""
          ) : (
            <FollowButton article={article} />
          )}
        </div>
      </div>
      <div className="mb-2">
        <p className="mb-0">
          {showFullTitle ? article?.title : truncatedTitle}
        </p>
        {!showFullTitle && article?.title && article?.title.length > 50 && (
          <span
            onClick={handleClickReadMore}
            className="text-propover "
            role="button"
          >
            ...Read More
          </span>
        )}
        {showFullTitle && article?.title && article?.title.length > 50 && (
          <span
            onClick={handleClickHide}
            className="text-propover "
            role="button"
          >
            Hide
          </span>
        )}
      </div>
      <div className="mt-2 mb-2" role="button" onClick={handleDetailBlog}>
        <div className="wrapper-img">
          <img
            src={`${imageUrl}`}
            className="img-blog"
            alt=""
            onError={(e: any) => {
              e.target.src =
                "https://bizweb.dktcdn.net/100/321/653/themes/738854/assets/no-product.jpg?1685344097426";
            }}
          />
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
          <Button
            className="d-flex align-items-center"
            onClick={handleToggleComment}
            icon={<CommentOutlined />}
          >
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
