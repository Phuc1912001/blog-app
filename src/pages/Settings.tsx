import { Button, Form, Input } from "antd";
import { Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import * as message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { infoUser } from "../Redux/feature/userSlice";
import { AppDispatch, RootState } from "../Redux/type";
import { api } from "../services/AxiosInstance";
import { IUser } from "../TypeInTypeScript/TypeUser";

const { TextArea } = Input;

const Settings = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const user: IUser = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch<AppDispatch>();
  const [form] = Form.useForm();

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

  useEffect(() => {
    form.setFieldsValue(user);
  }, [user]);

  const onFinish = async (values: IUser) => {
    setLoading(true);
    const userData = {
      user: values,
    };
    try {
      const response = await api.put(`/user`, userData);
      dispatch(infoUser(response.data.user));
      message.success("Update Info is successfully");
      //navigate("/login");
    } catch (error) {
      console.error("Update Info is failed:", error);
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
          <div className="d-flex flex-column align-items-center justify-content-between">
            <h1>Your Settings</h1>
          </div>

          <Loading isLoading={loading}>
            <Form
              className="shadow p-5 form-setting "
              name="basic"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              form={form}
            >
              <Form.Item
                label="Image"
                name="image"
                rules={[
                  { required: true, message: "Please input your image!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item label="Bio" name="bio">
                <TextArea rows={4} />
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

              <Form.Item label="Password" name="password">
                <Input.Password />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 9, span: 24 }}>
                <Button type="primary" htmlType="submit">
                  Update Settings
                </Button>
              </Form.Item>
            </Form>
          </Loading>
        </Col>
      </Row>
    </Container>
  );
};

export default Settings;
