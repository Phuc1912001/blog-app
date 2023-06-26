import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";

const Rieng = () => {
  return (
    <Container>
      <Row>
        <Col md={2} className=" sticky-top ">
          alo
        </Col>
        <Col md={7}>
          <Outlet />
        </Col>
        <Col md={2}>tab</Col>
      </Row>
    </Container>
  );
};

export default Rieng;
