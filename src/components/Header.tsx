import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../Redux/type";
import {
  AppstoreAddOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Popover } from "antd";
import { resetUser } from "../Redux/feature/userSlice";

const Header = () => {
  const user: any = useSelector((state: RootState) => state.user.user);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [popoverVisible, setPopoverVisible] = useState(false);

  const handleProfileUser = () => {
    setPopoverVisible(false);
    navigate(`/profiles/${user.username}`);
  };

  const handleLogout = () => {
    setPopoverVisible(false);
    localStorage.removeItem("token");
    dispatch(resetUser());
    navigate("/login");
  };

  const content = (
    <div className="p-2">
      <div className="text-propover" role="button" onClick={handleProfileUser}>
        Your Profile
      </div>
      <div
        className="d-flex align-items-center gap-2 mt-2 text-propover"
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
        <Col className="d-flex align-items-center justify-content-between">
          <NavLink
            className="text-decoration-none fw-bold fs-5 text-success "
            to={"/"}
          >
            Conduit
          </NavLink>
          <div className="d-flex align-items-center gap-3 ">
            <NavLink className="text-decoration-none text-dark" to={"/"}>
              Home
            </NavLink>
            {user.username ? (
              <>
                <NavLink
                  className="text-decoration-none text-dark d-flex align-items-center gap-1 "
                  to={"/editor"}
                >
                  <AppstoreAddOutlined />
                  <span> New Article</span>
                </NavLink>
                <NavLink
                  className="text-decoration-none text-dark d-flex align-items-center gap-1 "
                  to={"/settings"}
                >
                  <SettingOutlined />
                  Settings
                </NavLink>

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
    </Container>
  );
};

export default Header;
