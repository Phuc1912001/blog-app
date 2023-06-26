import { Button, Form, Input } from "antd";
import { Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import Loading from "../components/Loading";
import * as message from "../components/Message";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { infoUser } from "../Redux/feature/userSlice";
import { AppDispatch } from "../Redux/type";
import { api } from "../services/AxiosInstance";
interface ILogin {
  email: string;
  password: string;
}

const Login = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const validateEmail = (_: any, value: any) => {
    // Pattern for email validation
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!value || value.match(emailRegex)) {
      return Promise.resolve();
    }
    return Promise.reject("Please enter a valid email address!");
  };

  const whitespaceValidator = (_: any, value: any) => {
    if (!value || value.trim() === "") {
      return Promise.reject("Field cannot contain whitespace only!");
    }
    return Promise.resolve();
  };

  const onFinish = async (values: ILogin) => {
    setLoading(true);
    const userData = {
      user: values,
    };
    try {
      const response = await api.post(`/users/login`, userData);
      dispatch(infoUser(response?.data?.user));
      message.success("Login is successfully");
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      message.error(`email or password is invalid`);
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
          className="d-flex flex-column align-items-center justify-content-center "
        >
          <div className="shadow p-5 d-flex flex-column align-items-center justify-content-center ">
            <h1>Sign In</h1>
            <Link
              to={"/register"}
              className="text-success text-decoration-none mb-3 "
            >
              Need an acount
            </Link>
            <Loading isLoading={loading}>
              <Form
                name="basic"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                className="form-acount"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
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
                    { validator: whitespaceValidator },
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
                  <Button type="primary" htmlType="submit">
                    Sign In
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

export default Login;
