import { Button } from "antd";
import { HeartFilled } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/type";
import { useNavigate } from "react-router-dom";
import Notify from "../../components/Notify";
import { api } from "../../services/AxiosInstance";
import axios from "axios";
import * as message from "../../components/Message";

export const FavoriteButton = ({
  article,
  favoriteCount,
  setFavoriteCount,
}: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [toggleFavorited, setToggleFavorited] = useState(false);

  useEffect(() => {
    setToggleFavorited(article?.favorited);
  }, [article]);

  useEffect(() => {
    setFavoriteCount(article?.favoritesCount);
  }, [article]);

  const user: any = useSelector((state: RootState) => state.user.user);
  const navigate = useNavigate();

  // toggleFavorite
  // toggleFavorite
  const toggleFavorite = async () => {
    if (user.username) {
      if (!toggleFavorited) {
        try {
          setToggleFavorited(true); // Đổi màu trước khi gọi API

          const favorited = await api.post(
            `${process.env.REACT_APP_API_URL}/articles/${article?.slug}/favorite`
          );

          setFavoriteCount(favorited.data.article.favoritesCount);
          message.success("Favorite Article is successful");
        } catch (error) {
          setToggleFavorited(false); // Đặt lại giá trị ban đầu nếu có lỗi
          message.error(`${error}`);
        }
      } else {
        console.log("thực hiện UnFavorite");
        setToggleFavorited(false); // Đổi màu trước khi gọi API

        try {
          const unFavorited = await axios.delete(
            `${process.env.REACT_APP_API_URL}/articles/${article?.slug}/favorite`,
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );

          setFavoriteCount(unFavorited.data.article.favoritesCount);
          message.success("Unfavorite Article is successful");
        } catch (error) {
          setToggleFavorited(true); // Đặt lại giá trị ban đầu nếu có lỗi
          message.error(`${error}`);
        }
      }
    } else {
      navigate(`/login`);
    }
  };

  return (
    <>
      {favoriteCount !== undefined && (
        <Button
          icon={<HeartFilled />}
          style={{
            display: "flex",
            alignItems: "center",
            color: toggleFavorited ? "white" : "#DC143C",
            backgroundColor: toggleFavorited ? "#DC143C" : "inherit",
            border: `1px solid ${toggleFavorited ? "" : "#DC143C"}`,
          }}
          ghost={!toggleFavorited}
          onClick={toggleFavorite}
        >
          Heart
        </Button>
      )}
    </>
  );
};
