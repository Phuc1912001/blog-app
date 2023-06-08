import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Col, Container, Row } from "react-bootstrap";

const LayoutBlog = () => {
  return (
    <Container>
      <Row>
        <Col md={12} className="p-0">
          <div className="pt-3 pb-3  ">
            <Header />
          </div>
          <div className="mb-5">
            <Outlet />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LayoutBlog;
