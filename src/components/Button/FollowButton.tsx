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
  const [toggleFollowed, setToggleFollowed] = useState(false);

  const user: any = useSelector((state: RootState) => state.user.user);
  const navigate = useNavigate();

  useEffect(() => {
    setToggleFollowed(article?.author?.following);
  }, [article]);

  const toggleFollowing = async () => {
    if (user.username) {
      if (!toggleFollowed) {
        console.log("thực hiện followed");
        setToggleFollowed(true); // Đổi màu trước khi gọi API

        try {
          const followed = await api.post(
            `${process.env.REACT_APP_API_URL}/profiles/${article?.author?.username}/follow`
          );

          setToggleFollowed(followed?.data?.profile?.following);
          message.success("Follow Info is successfully");
          // Xử lý kết quả trả về từ yêu cầu POST ở đây (nếu cần)
        } catch (error) {
          setToggleFollowed(false); // Đặt lại giá trị ban đầu nếu có lỗi
          message.error(`${error}`);
          // Xử lý lỗi yêu cầu POST ở đây (nếu cần)
        }
      } else {
        console.log("thực hiện unfollow");
        setToggleFollowed(false); // Đổi màu trước khi gọi API

        // Thực hiện logic unfollow ở đây (nếu cần)
        try {
          const unFollowed = await api.delete(
            `${process.env.REACT_APP_API_URL}/profiles/${article?.author?.username}/follow`
          );

          setToggleFollowed(unFollowed?.data?.profile?.following);
          message.success("UnFollow Info is successfully");
        } catch (error) {
          setToggleFollowed(true); // Đặt lại giá trị ban đầu nếu có lỗi
          message.error(`${error}`);
        }
      }
    } else {
      navigate(`/login`);
    }
  };

  return (
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
  );
};
