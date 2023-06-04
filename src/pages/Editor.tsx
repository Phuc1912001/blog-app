import { useState } from "react";
import { Button, Form, Input } from "antd";
import { Container, Row, Col } from "react-bootstrap";

const { TextArea } = Input;

const Editor = () => {
  const [loading, setLoading] = useState(false);
  const [tagList, setTagList] = useState<any>([]);
  const [inputTag, setInputTag] = useState<any>("");

  const onFinish = (values: any) => {
    const updatedValues = { ...values, tagList: tagList };
    console.log("Success:", updatedValues);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const handleTagInputChange = (e: any) => {
    setInputTag(e.target.value);
  };

  const handleTagInputConfirm = () => {
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
  console.log("inputTag", inputTag);

  return (
    <Container>
      <Row>
        <Col
          md={12}
          className="d-flex justify-content-center align-items-center mt-5"
        >
          <Form
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            style={{ width: 900 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "Please input your title!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[
                { required: true, message: "Please input your description!" },
              ]}
            >
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item
              label="Body"
              name="body"
              rules={[{ required: true, message: "Please input your body!" }]}
            >
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item label="Tag List">
              <input
                value={inputTag}
                onChange={handleTagInputChange}
                onKeyDown={handleTagInputKeyDown}
              />
            </Form.Item>

            <div>
              {tagList.map((tag: any, index: number) => (
                <span key={index} className="mr-2">
                  {tag}
                </span>
              ))}
            </div>
            <Form.Item wrapperCol={{ offset: 11, span: 24 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Editor;
