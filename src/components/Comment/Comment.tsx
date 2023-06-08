import { Button, Form, Input, Popover } from "antd";
import { SendOutlined, DeleteOutlined, MoreOutlined } from "@ant-design/icons";
import { api } from "../../services/AxiosInstance";
import { useEffect, useState } from "react";
import moment from "moment";
import Loading from "../Loading";

const Comment = ({ user, article }: any) => {
  const [allComment, setAllComment] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [fetchedComments, setFetchedComments] = useState<boolean>(false);
  const [form] = Form.useForm();

  const fetchComment = async () => {
    setLoading(true);
    const commentGet = await api.get(
      `${process.env.REACT_APP_API_URL}/articles/${article?.slug}/comments`
    );
    setAllComment(commentGet?.data?.comments);
    setFetchedComments(true);
    setLoading(false);
  };

  useEffect(() => {
    if (!fetchedComments) {
      fetchComment();
    }
  }, [fetchedComments]);

  const onFinish = async (values: any) => {
    setLoading(true);
    const commentValues = {
      comment: {
        body: values.body,
      },
    };
    const commentPost = await api.post(
      `${process.env.REACT_APP_API_URL}/articles/${article?.slug}/comments`,
      commentValues
    );
    console.log("commentPost", commentPost);
    setFetchedComments(false);
    form.resetFields();
    setLoading(false);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const handleDeleteComment = async (id: number) => {
    console.log("id comment", id);

    const deleteComment = await api.delete(
      `${process.env.REACT_APP_API_URL}/articles/${article?.slug}/comments/${id}`
    );
    console.log("deleteComment", deleteComment);

    setFetchedComments(false);
  };
  console.log("allComment", allComment);

  const content = (id: number) => (
    <div>
      <div
        role="button"
        className="d-flex align-items-center gap-2 text-danger "
        onClick={() => handleDeleteComment(id)}
      >
        <DeleteOutlined /> Comment
      </div>
    </div>
  );
  return (
    <div>
      <Loading isLoading={loading}>
        {allComment.length === 0 ? (
          <div className="mt-3">you no have comment</div>
        ) : (
          <div>
            {allComment.map((comment: any, index: number) => (
              <div
                key={index}
                className="d-flex flex-wrap align-items-center gap-2 mt-4"
              >
                <div>
                  <img
                    src={comment?.author?.image}
                    alt="avatar"
                    style={{
                      height: "30px",
                      width: "30px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div className="comment-content">{comment.body}</div>
                <div>{moment(comment.createdAt).format("h")}h</div>
                <div>
                  <Popover
                    placement="rightTop"
                    content={() => content(comment.id)}
                    trigger="hover"
                  >
                    <div role="button">
                      <MoreOutlined className="fs-5 fw-bold " />
                    </div>
                  </Popover>
                </div>
              </div>
            ))}
          </div>
        )}
      </Loading>

      <div className="d-flex  align-items-center gap-2 mt-4 ">
        <div>
          <img
            src={user.image}
            alt="avatar"
            style={{
              height: "30px",
              width: "30px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        </div>

        <Form
          className="w-100"
          name="basic"
          wrapperCol={{ span: 24 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            className="m-0"
            name="body"
            rules={[{ required: true, message: "Please input your comment!" }]}
          >
            <Input
              placeholder="comment of you..."
              style={{
                width: "100%",
                borderTop: "none",
                borderLeft: "none",
                borderRight: "none",
              }}
              suffix={
                <Button
                  className="comment-btn"
                  icon={<SendOutlined />}
                  htmlType="submit"
                />
              }
            />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Comment;
