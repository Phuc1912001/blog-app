import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Col, Container, Row } from "react-bootstrap";
import Notify from "../components/Notify";

const LayoutBlog = () => {
  return (
    <Container fluid>
      <Row>
        <Col md={12} className="p-0">
          <div className="pt-3 pb-3  bg-white shadow">
            <Header />
          </div>
          <div className="">
            <Outlet />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LayoutBlog;
