import { notification } from "antd";

const successNotification = (title, message) => {
  return notification.success({
    placement: "topRight",
    message: title,
    description: message,
    duration: 3,
  });
};

export default successNotification;
