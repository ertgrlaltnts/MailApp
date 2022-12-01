import { notification } from "antd";

const errorNotification = (title, message) => {
  return notification.warn({
    placement: "topRight",
    message: title,
    description: message,
    duration: 3,
  });
};

export default errorNotification;
