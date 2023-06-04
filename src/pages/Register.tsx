import { Button, Form, Input } from "antd";
import { Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import Loading from "../components/Loading";
import * as message from "../components/Message";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const validateEmail = (_: any, value: any) => {
    // Pattern for email validation
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!value || value.match(emailRegex)) {
      return Promise.resolve();
    }
    return Promise.reject("Please enter a valid email address!");
  };
  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const userData = {
        user: {
          username: values.username,
          email: values.email,
          password: values.password,
        },
      };
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/users`,
        userData
      );

      message.success("Register is successfully");
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      message.error(`${error}`);
    }
    setLoading(false);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Container>
      <Row>
        <Col
          md={12}
          className="d-flex flex-column align-items-center justify-content-center"
        >
          <h1>Sign Up</h1>
          <p className="text-success">Have an acount</p>
          <Loading isLoading={loading}>
            <Form
              name="basic"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              style={{ width: 600 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                  { validator: validateEmail },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Sign Up
                </Button>
              </Form.Item>
            </Form>
          </Loading>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
