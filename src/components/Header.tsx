import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/type";
import { AppstoreAddOutlined, SettingOutlined } from "@ant-design/icons";

const Header = () => {
  const user: any = useSelector((state: RootState) => state.user.user);

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
                <NavLink
                  className="text-decoration-none text-dark"
                  to={"/profile"}
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
                </NavLink>
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
