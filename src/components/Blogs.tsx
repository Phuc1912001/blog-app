import React, { useState } from "react";
import { Tag, Space, Button } from "antd";
import { CommentOutlined, SendOutlined } from "@ant-design/icons";

import moment from "moment";
import { useNavigate } from "react-router-dom";
import { FavoriteButton } from "./Button/FavoriteButton";
import { FollowButton } from "./Button/FollowButton";

import { useSelector } from "react-redux";
import { RootState } from "../Redux/type";
import Comment from "./Comment/Comment";

const Blogs = ({ article }: any) => {
  const [toggleComment, setToggleComment] = useState(false);
  console.log("alo");

  const user: any = useSelector((state: RootState) => state.user.user);

  const navigate = useNavigate();

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
    <div className="shadow rounded p-5 m-4 ">
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center justify-content-center  gap-3">
          <img
            src={author.image}
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
              {author.username}
            </h6>
            <div className="text-secondary">
              {moment(article.createdAt).format("MMMM D, YYYY")}
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
          <h5>{article.title}</h5>
        </div>
        <div>
          <p className="text-secondary">{article.description}</p>
        </div>
        <div className="d-flex align-items-center justify-content-between mb-2">
          <div className="text-secondary"></div>
          <div>
            <Space size={[0, 8]} wrap>
              {tagList.map((tag: string, index: number) => (
                <Tag key={index} color="magenta">
                  {tag}
                </Tag>
              ))}
            </Space>
          </div>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-between">
        <div>
          <FavoriteButton article={article} />
        </div>
        <div>
          <Button onClick={handleToggleComment} icon={<CommentOutlined />}>
            Comment
          </Button>
        </div>
      </div>
      {toggleComment && <Comment user={user} article={article} />}
    </div>
  );
};

export default Blogs;
