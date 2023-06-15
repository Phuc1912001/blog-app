import { useEffect, useState } from "react";
import { AutoComplete, Button, Form, Input } from "antd";
import { Container, Row, Col } from "react-bootstrap";
import { Space, Tag } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/type";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { api } from "../services/AxiosInstance";

const { TextArea } = Input;

const Editor = () => {
  const user: any = useSelector((state: RootState) => state.user.user);
  const article: any = useSelector((state: RootState) => state.article.article);
  const tagsPopular: any = useSelector(
    (state: RootState) => state.tagsPopular.tagsPopular
  );

  const [loading, setLoading] = useState(false);
  const [tagList, setTagList] = useState<any>([]);
  const [inputTag, setInputTag] = useState<any>("");

  const navigate = useNavigate();
  const params = useParams();
  const { slug } = params;
  const [form] = Form.useForm();

  const handleFieldedForm = () => {
    if (slug) {
      form.setFieldsValue(article);
      setTagList(article.tagList);
    }
  };

  useEffect(() => {
    handleFieldedForm();
  }, [slug]);

  const onFinish = async (values: any) => {
    setLoading(true);
    if (slug) {
      //update article

      const newValues = { ...values, tagList: tagList };
      const updateData = {
        article: {
          title: newValues.title,
          description: newValues.description,
          body: newValues.body,
          tagList: newValues.tagList,
        },
      };

      const updatedArticle = await api.put(
        `${process.env.REACT_APP_API_URL}/articles/${slug}`,
        updateData
      );
      navigate(`/articles/${updatedArticle?.data?.article?.slug}`);
    } else {
      // tạo article
      const updatedValues = { ...values, tagList: tagList };
      const articleData = {
        article: {
          title: updatedValues.title,
          description: updatedValues.description,
          body: updatedValues.body,
          tagList: updatedValues.tagList,
        },
      };
      const newArticle = await axios.post(
        `${process.env.REACT_APP_API_URL}/articles`,
        articleData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`, // Thêm thông tin xác thực vào tiêu đề Authorization
          },
        }
      );
      navigate(`/articles/${newArticle?.data?.article?.slug}`);
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
    form.setFieldValue("tagLish", "");
    if (e && !tagList.includes(e)) {
      setTagList([...tagList, e]);
    }
  };

  const handleTagInputConfirm = () => {
    form.setFieldValue("tagLish", "");
    if (inputTag && !tagList.includes(inputTag)) {
      setTagList([...tagList, inputTag]);
      setInputTag("");
    }
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
  };

  return (
    <Container>
      <Row>
        <Col md={12}>
          <div className="d-flex justify-content-center align-items-center mt-2 p-5 shadow ">
            <Loading isLoading={loading}>
              <Form
                name="basic"
                labelCol={{ span: 3 }}
                wrapperCol={{ span: 21 }}
                style={{ width: 800 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                form={form}
              >
                <Form.Item
                  label="Title"
                  name="title"
                  rules={[
                    { required: true, message: "Please input your title!" },
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
                  ]}
                >
                  <TextArea rows={3} />
                </Form.Item>
                <Form.Item
                  label="Body"
                  name="body"
                  rules={[
                    { required: true, message: "Please input your body!" },
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

                <Form.Item wrapperCol={{ offset: 4, span: 24 }}>
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
                    <Button type="primary" htmlType="submit">
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
