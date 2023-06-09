import { Button } from "antd";
import { HeartFilled } from "@ant-design/icons";
import { Dispatch, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/type";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/AxiosInstance";
import * as message from "../../components/Message";
import { IUser } from "../../TypeInTypeScript/TypeUser";
import { IArticle } from "../../TypeInTypeScript/TypeArticle";

interface IProps {
  article: IArticle;
  favoriteCount: number;
  setFavoriteCount: Dispatch<number>;
  // abcd?: () => void;
}

export const FavoriteButton = ({
  article,
  favoriteCount,
  setFavoriteCount,
}: IProps) => {
  const [toggleFavorited, setToggleFavorited] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // New state to manage button disabled state

  useEffect(() => {
    if (article) {
      setToggleFavorited(article.favorited);
      setFavoriteCount(article.favoritesCount);
    }
  }, [article]);

  const user: IUser = useSelector((state: RootState) => state.user.user);
  const navigate = useNavigate();

  // toggleFavorite
  const toggleFavorite = async () => {
    if (user.username) {
      setIsButtonDisabled(true); // Disable the button before making the API call

      setFavoriteCount(toggleFavorited ? favoriteCount - 1 : favoriteCount + 1);
      setToggleFavorited(!toggleFavorited);
      const requestToggleFavorite = toggleFavorited ? api.delete : api.post;
      try {
        const dataToggleFavortite = await requestToggleFavorite(
          `/articles/${article?.slug}/favorite`
        );
        setFavoriteCount(dataToggleFavortite.data.article.favoritesCount);

        // if (toggleFavorited) {
        //   message.success("Unfavorite Article is successful");
        // } else {
        //   message.success("Favorite Article is successful");
        // }
      } catch (error) {
        setToggleFavorited(false); // Đặt lại giá trị ban đầu nếu có lỗi
        message.error(`${error}`);
        setFavoriteCount(
          article.favorited ? favoriteCount + 1 : favoriteCount - 1
        );
      } finally {
        setIsButtonDisabled(false); // Re-enable the button after API call is completed (success or error)
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
          className={`${toggleFavorited ? "favoriteBtn" : "unFavoriteBtn"}`}
          onClick={toggleFavorite}
          disabled={isButtonDisabled} // Add the disabled prop to the Button component
        >
          Heart
        </Button>
      )}
    </>
  );
};
