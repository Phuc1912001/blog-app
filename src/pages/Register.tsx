import { Button, Form, Input } from "antd";
import { Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import Loading from "../components/Loading";
import * as message from "../components/Message";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../services/AxiosInstance";

interface IRegister {
  username: string;
  email: string;
  password: string;
}

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
  const onFinish = async (values: IRegister) => {
    setLoading(true);
    try {
      const userData = {
        user: values,
      };
      await api.post(`/users`, userData);
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

  const whitespaceValidator = (_: any, value: any) => {
    if (!value || value.trim() === "") {
      return Promise.reject("Field cannot contain whitespace only!");
    }
    return Promise.resolve();
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={12} fluid>
          <div className="d-flex flex-column align-items-center justify-content-center shadow p-5">
            <h1>Sign Up</h1>
            <Link
              to={"/login"}
              className="text-success text-decoration-none mb-3"
            >
              Have an account
            </Link>
            <Loading isLoading={loading}>
              <Form
                name="basic"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                initialValues={{ remember: true }}
                className="form-acount"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Please input your username!",
                    },
                    { validator: whitespaceValidator },
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
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                    { validator: whitespaceValidator },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
                  <Button type="primary" htmlType="submit">
                    Sign Up
                  </Button>
                </Form.Item>
              </Form>
            </Loading>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
