import { Button, Space, Tag, Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { FavoriteButton } from "../Button/FavoriteButton";
import { FollowButton } from "../Button/FollowButton";
import * as message from "../../components/Message";

const UserAction = ({
  article,
  user,
  setStatusFavorite,
  setStatusFollow,
  handleEdit,
  confirm,
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
            setStatusFavorite={setStatusFavorite}
          />

          <FollowButton article={article} setStatusFollow={setStatusFollow} />
        </div>
      )}
    </div>
  );
};

export default UserAction;
