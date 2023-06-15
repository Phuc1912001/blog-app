import { message } from "antd";

export const showSuccessMessage = (messageApi: any, content: string) => {
  messageApi.open({
    type: "success",
    content: content,
  });
};

export const showErrorMessage = (messageApi: any, content: string) => {
  messageApi.open({
    type: "error",
    content: content,
  });
};

export const showWarningMessage = (messageApi: any, content: string) => {
  messageApi.open({
    type: "warning",
    content: content,
  });
};

const Notify = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const success = (mes: any) => {
    showSuccessMessage(messageApi, mes);
  };

  const error = (mes: any) => {
    showErrorMessage(messageApi, mes);
  };

  const warn = (mes: any) => {
    showWarningMessage(messageApi, mes);
  };

  return (
    <>
      <div style={{ zIndex: 1030 }}>{contextHolder}</div>
    </>
  );
};

export default Notify;
