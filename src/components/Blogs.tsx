import React from "react";
import { Button, Tag, Space } from "antd";
import { HeartFilled } from "@ant-design/icons";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const Blogs = ({ article }: any) => {
  const navigate = useNavigate();

  const { author, tagList } = article;
  const handleDetailBlog = () => {
    navigate(`/articles/${article.slug}`);
  };

  const handleProfileUser = () => {
    navigate(`profiles/${author.username}`);
  };

  return (
    <div>
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
            <p className="text-secondary">
              {moment(article.createdAt).format("MMMM D, YYYY")}
            </p>
          </div>
        </div>
        <div>
          <Button
            icon={<HeartFilled />}
            size="small"
            style={{ display: "flex", alignItems: "center" }}
          >
            <span>{article.favoritesCount}</span>
          </Button>
          <Button
            type="primary"
            icon={<HeartFilled />}
            size="small"
            style={{ display: "flex", alignItems: "center" }}
            ghost
          >
            <span>{article.favoritesCount}</span>
          </Button>
        </div>
      </div>
      <div role="button" onClick={handleDetailBlog}>
        <div>
          <h5>{article.title}</h5>
        </div>
        <div>
          <p className="text-secondary">{article.description}</p>
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <div className="text-secondary">readmore....</div>
          <div>
            <Space size={[0, 8]} wrap>
              {tagList.map((tag: string, index: number) => (
                <Tag key={index} color="green">
                  {tag}
                </Tag>
              ))}
            </Space>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
