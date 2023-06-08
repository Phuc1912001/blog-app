import { Button } from "antd";
import { HeartFilled } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/type";
import axios from "axios";
import * as message from "../../components/Message";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";
import { api } from "../../services/AxiosInstance";

export const FavoriteButton = ({ article }: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [toggleFavorited, setToggleFavorited] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState(0);

  useEffect(() => {
    setToggleFavorited(article?.favorited);
  }, [article]);
  useEffect(() => {
    setFavoriteCount(article?.favoritesCount);
  }, [article]);

  const user: any = useSelector((state: RootState) => state.user.user);
  const navigate = useNavigate();

  // toggleFavorite
  const toggleFavorite = async () => {
    setLoading(true);
    if (user.username) {
      if (!toggleFavorited) {
        try {
          const favorited = await api.post(
            `${process.env.REACT_APP_API_URL}/articles/${article?.slug}/favorite`
          );
          message.success("Favorite Article is successful");
          setToggleFavorited(favorited.data.article.favorited);
          setFavoriteCount(favorited.data.article.favoritesCount);
          // Xử lý kết quả trả về từ yêu cầu POST ở đây (nếu cần)
        } catch (error) {
          // Xử lý lỗi yêu cầu POST ở đây (nếu cần)
          message.error(`${error}`);
        }
      } else {
        console.log("thực hiện UnFavorite");
        // Thực hiện logic unfavorite ở đây (nếu cần)
        const unFavorited = await axios.delete(
          `${process.env.REACT_APP_API_URL}/articles/${article?.slug}/favorite`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setToggleFavorited(unFavorited.data.article.favorited);
        setFavoriteCount(unFavorited.data.article.favoritesCount);

        message.success("UnFavorite Article is successful");
      }
    } else {
      navigate(`/login`);
    }
    setLoading(false);
  };

  return (
    <Loading isLoading={loading}>
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
        <span>{`(${favoriteCount})`}</span>
      </Button>
    </Loading>
  );
};
