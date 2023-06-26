import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../Redux/type";
import {
  AppstoreAddOutlined,
  SettingOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Popover } from "antd";
import { resetUser } from "../Redux/feature/userSlice";
import Notify from "./Notify";
import { IUser } from "../TypeInTypeScript/TypeUser";

const Header = () => {
  const user: IUser = useSelector((state: RootState) => state.user.user);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [popoverVisible, setPopoverVisible] = useState(false);

  const handleProfileUser = () => {
    setPopoverVisible(false);
    navigate(`/profiles/${user.username}`);
  };

  const handleNewArticle = () => {
    setPopoverVisible(false);
    navigate(`/editor`);
  };
  const handleSetting = () => {
    setPopoverVisible(false);
    navigate(`/settings`);
  };

  const handleLogout = () => {
    setPopoverVisible(false);
    localStorage.removeItem("token");
    dispatch(resetUser());
    navigate("/login");
  };

  const content = (
    <div className="p-2">
      <div
        className="d-flex align-items-center gap-2 text-propover"
        role="button"
        onClick={handleNewArticle}
      >
        <AppstoreAddOutlined />
        <div> New Article</div>
      </div>
      <div
        className="d-flex align-items-center gap-2 text-propover"
        role="button"
        onClick={handleSetting}
      >
        <SettingOutlined />
        <div> Settings</div>
      </div>
      <div
        className="d-flex align-items-center gap-2 text-propover"
        role="button"
        onClick={handleProfileUser}
      >
        <UserOutlined />
        Your Profile
      </div>
      <hr />
      <div
        className="d-flex align-items-center gap-2 text-propover"
        role="button"
        onClick={handleLogout}
      >
        <LogoutOutlined />
        <div>Logout</div>
      </div>
    </div>
  );

  return (
    <Container>
      <Row>
        <Col className="d-flex align-items-center justify-content-between ">
          <NavLink
            className="text-decoration-none fw-bold fs-5 text-danger "
            to={"/"}
          >
            Bờ Lốc
          </NavLink>
          <div className="d-flex align-items-center gap-3 ">
            {user.username ? (
              <>
                <Popover
                  placement="bottomRight"
                  content={content}
                  trigger="click"
                  visible={popoverVisible}
                  onVisibleChange={setPopoverVisible}
                >
                  <div
                    role="button"
                    className="text-decoration-none text-dark d-flex align-items-center gap-2 "
                  >
                    <img
                      src={user.image}
                      alt="avatar"
                      style={{
                        height: "30px",
                        width: "30px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                    {user.username}
                  </div>
                </Popover>
              </>
            ) : (
              <>
                <NavLink
                  className="text-decoration-none text-dark"
                  to={"/login"}
                >
                  Login
                </NavLink>
                <NavLink
                  className="text-decoration-none text-dark"
                  to={"/register"}
                >
                  SignUp
                </NavLink>
              </>
            )}
          </div>
        </Col>
      </Row>

      <Notify />
    </Container>
  );
};

export default Header;
