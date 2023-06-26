import { useEffect, useState } from "react";
import { AutoComplete, Button, Form, Input } from "antd";
import { Container, Row, Col } from "react-bootstrap";
import { Space, Tag } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/type";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { api } from "../services/AxiosInstance";
import * as message from "../components/Message";
import { isEqual } from "lodash";

const { TextArea } = Input;

const Editor = () => {
  const article: any = useSelector((state: RootState) => state.article.article);
  const tagsPopular: any = useSelector(
    (state: RootState) => state.tagsPopular.tagsPopular
  );

  const [loading, setLoading] = useState(false);
  const [tagList, setTagList] = useState<any>([]);
  const [initialTagList, setInitialTagList] = useState<any>([]);
  const [taglistEqual, setTagListEqual] = useState<any>(article.tagList);
  const [inputTag, setInputTag] = useState<any>("");
  const [isFormChanged, setIsFormChanged] = useState(false);
  console.log("taglistEqual ngoai ", taglistEqual);

  const navigate = useNavigate();
  const params = useParams();
  const { slug } = params;
  const [form] = Form.useForm();

  const handleFieldedForm = () => {
    if (slug) {
      form.setFieldsValue(article);
      setTagList(article.tagList);
      setInitialTagList(article.tagList);
    }
  };

  useEffect(() => {
    handleFieldedForm();
  }, [slug]);

  const onFinish = async (values: any) => {
    setLoading(true);

    let newSlug = slug;
    const newValues = { ...values, tagList: tagList };
    const payload = {
      article: newValues,
    };
    const request = slug
      ? api.put(`/articles/${slug}`, payload)
      : api.post(`/articles`, payload);

    try {
      const response = await request;
      newSlug = response.data.article.slug;
      navigate(`/articles/${newSlug}`);
      if (slug) {
        message.success("Update Article successfully!");
      } else {
        message.success("Create Article successfully!");
      }
    } catch (err) {
      message.error(`${err}`);
    }
    setLoading(false);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const handleTagInputChange = (e: any) => {
    setInputTag(e.target.value);
  };

  const handleTagselectedChange = (e: any) => {
    form.setFieldsValue({ tagLish: "" });
    if (e && !tagList.includes(e)) {
      setTagList((prevTagList: any) => {
        const newTagList = [...prevTagList, e];
        setTagListEqual(newTagList);
        return newTagList;
      });
    }
  };

  const handleTagInputConfirm = () => {
    form.setFieldsValue({ tagLish: "" });
    if (inputTag && !tagList.includes(inputTag)) {
      setTagList((prevTagList: any) => {
        const newTagList = [...prevTagList, inputTag];
        setTagListEqual(newTagList);
        return newTagList;
      });
    }
    setInputTag("");
  };

  const handleTagInputKeyDown = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleTagInputConfirm();
    }
  };

  const handleTagClose = (removedTag: string) => {
    const updatedTagList = tagList.filter((tag: string) => tag !== removedTag);
    setTagList(updatedTagList);
    setTagListEqual(updatedTagList);
    const isTagListChanged = !isEqual(updatedTagList, initialTagList);
    setIsFormChanged(isTagListChanged);
    console.log("isFormChanged", isTagListChanged);
  };

  const whitespaceValidator = (_: any, value: any) => {
    if (!value || value.trim() === "") {
      return Promise.reject("Field cannot contain whitespace only!");
    }
    return Promise.resolve();
  };

  const handleFormValuesChange = (_: any, allValues: any) => {
    const isFormChanged =
      !isEqual(allValues.title, article.title) ||
      !isEqual(allValues.description, article.description) ||
      !isEqual(allValues.body, article.body) ||
      !isEqual(initialTagList, taglistEqual);
    setIsFormChanged(isFormChanged);
    console.log("isFormChanged", isFormChanged);
  };

  return (
    <Container>
      <Row>
        <Col md={12}>
          <div className="d-flex justify-content-center align-items-center mt-2 p-5 shadow ">
            <Loading isLoading={loading}>
              <Form
                name="basic"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                className="form-article"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                form={form}
                onValuesChange={handleFormValuesChange}
              >
                <Form.Item
                  label="Title"
                  name="title"
                  rules={[
                    { required: true, message: "Please input your title!" },
                    { validator: whitespaceValidator },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Description"
                  name="description"
                  rules={[
                    {
                      required: true,
                      message: "Please input your description!",
                    },
                    { validator: whitespaceValidator },
                  ]}
                >
                  <TextArea rows={3} />
                </Form.Item>
                <Form.Item
                  label="Body"
                  name="body"
                  rules={[
                    { required: true, message: "Please input your body!" },
                    { validator: whitespaceValidator },
                  ]}
                >
                  <TextArea rows={9} />
                </Form.Item>
                <Form.Item label="Tag List" name="tagLish">
                  <AutoComplete
                    onSelect={handleTagselectedChange}
                    options={tagsPopular.map((tag: any) => ({ value: tag }))}
                  >
                    <Input
                      value={inputTag}
                      onChange={handleTagInputChange}
                      onKeyDown={handleTagInputKeyDown}
                    />
                  </AutoComplete>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
                  {tagList.map((tag: any, index: number) => (
                    <Space key={index}>
                      <Tag
                        color="green"
                        closable
                        onClose={() => handleTagClose(tag)}
                        className="d-flex justify-content-center align-items-center"
                      >
                        {tag}
                      </Tag>
                    </Space>
                  ))}
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 11, span: 24 }}>
                  {slug ? (
                    <Button
                      type="primary"
                      htmlType="submit"
                      disabled={!isFormChanged}
                    >
                      Update Article
                    </Button>
                  ) : (
                    <Button type="primary" htmlType="submit">
                      Pushlish Article
                    </Button>
                  )}
                </Form.Item>
              </Form>
            </Loading>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Editor;
