import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/type";
import { useNavigate } from "react-router-dom";

import * as message from "../../components/Message";
import { useEffect, useState } from "react";
import Loading from "../Loading";
import { api } from "../../services/AxiosInstance";

export const FollowButton = ({ article }: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [toggleFollowed, setToggleFollowed] = useState(false);

  const user: any = useSelector((state: RootState) => state.user.user);
  const navigate = useNavigate();

  useEffect(() => {
    setToggleFollowed(article?.author?.following);
  }, [article]);

  const toggleFollowing = async () => {
    setLoading(true);
    if (user.username) {
      if (!toggleFollowed) {
        console.log("thực hiện followed");
        try {
          const followed = await api.post(
            `${process.env.REACT_APP_API_URL}/profiles/${article?.author?.username}/follow`
          );
          setToggleFollowed(followed?.data?.profile?.following);
          message.success("Follow Info is successfully");
          // Xử lý kết quả trả về từ yêu cầu POST ở đây (nếu cần)
        } catch (error) {
          // Xử lý lỗi yêu cầu POST ở đây (nếu cần)
          message.error(`${error}`);
        }
      } else {
        console.log("thực hiện unfollow");
        // Thực hiện logic unfollow ở đây (nếu cần)
        const unFollowed = await api.delete(
          `${process.env.REACT_APP_API_URL}/profiles/${article?.author?.username}/follow`
        );
        setToggleFollowed(unFollowed?.data?.profile?.following);
        message.success("UnFollow Info is successfully");
      }
    } else {
      navigate(`/login`);
    }
    setLoading(false);
  };

  return (
    <Loading isLoading={loading}>
      <Button
        icon={<PlusOutlined />}
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: toggleFollowed ? "green" : "inherit",
          color: toggleFollowed ? "white" : "green",
          border: `1px solid ${toggleFollowed ? "" : "green"} `,
        }}
        ghost={!toggleFollowed}
        onClick={toggleFollowing}
      >
        <span>
          {` ${toggleFollowed ? "unfollowed" : "followed"} `}
          {article?.author?.username}
        </span>
      </Button>
    </Loading>
  );
};
