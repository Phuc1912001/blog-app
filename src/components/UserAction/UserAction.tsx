import { Button, Space, Tag, Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { FavoriteButton } from "../Button/FavoriteButton";
import { FollowButton } from "../Button/FollowButton";
import * as message from "../../components/Message";
import { useState } from "react";

const UserAction = ({
  article,
  user,
  handleEdit,
  confirm,
  favoriteCount,
  setFavoriteCount,
}: any) => {
  const cancel = () => {
    message.warning("Close Popconfirm ");
  };

  return (
    <div>
      {article?.author?.username === user.username ? (
        <div className="d-flex align-items-center gap-3">
          <Button
            icon={<EditOutlined />}
            size="small"
            className="button-edit"
            onClick={handleEdit}
          >
            Edit Article
          </Button>

          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button
              icon={<DeleteOutlined />}
              size="small"
              className="button-delete"
            >
              Delete Article
            </Button>
          </Popconfirm>
        </div>
      ) : (
        <div className="d-flex align-items-center gap-3">
          <FavoriteButton
            article={article}
            favoriteCount={favoriteCount}
            setFavoriteCount={setFavoriteCount}
          />

          <FollowButton article={article} />
        </div>
      )}
    </div>
  );
};

export default UserAction;
