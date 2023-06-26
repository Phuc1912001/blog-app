import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/type";
import { useNavigate } from "react-router-dom";
import * as message from "../../components/Message";
import { useEffect, useState } from "react";
import { api } from "../../services/AxiosInstance";
import { IUser } from "../../TypeInTypeScript/TypeUser";

export const FollowButton = ({ article }: any) => {
  const [toggleFollowed, setToggleFollowed] = useState(false);

  const user: IUser = useSelector((state: RootState) => state.user.user);
  const navigate = useNavigate();

  useEffect(() => {
    setToggleFollowed(article?.author?.following);
  }, [article]);

  const toggleFollowing = async () => {
    if (user.username) {
      setToggleFollowed(!toggleFollowed);
      const requestToggleFollow = toggleFollowed ? api.delete : api.post;
      try {
        const dataToggleFollow = await requestToggleFollow(
          `/profiles/${article?.author?.username}/follow`
        );
        setToggleFollowed(dataToggleFollow?.data?.profile?.following);
        if (toggleFollowed) {
          message.success("UnFollow Info is successfully ");
        } else {
          message.success("Follow Info is successfully");
        }
      } catch (error) {
        setToggleFollowed(true); // Đặt lại giá trị ban đầu nếu có lỗi
        message.error(`${error}`);
      }
    } else {
      navigate(`/login`);
    }
  };

  return (
    <Button
      icon={<PlusOutlined />}
      className={`${toggleFollowed ? "followBtn" : "unFollowBtn"}`}
      onClick={toggleFollowing}
    >
      <span>
        {` ${toggleFollowed ? "unfollowed" : "followed"} `}
        {article?.author?.username}
      </span>
    </Button>
  );
};
