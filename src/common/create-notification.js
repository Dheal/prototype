import { NotificationManager } from "react-notifications";
export const createNotification = (type, title, message, time) => {
  switch (type) {
    case "info":
      NotificationManager.info(message, title, time || 3000);
      break;
    case "success":
      NotificationManager.success(message, title, time || 2000);
      break;
    case "warning":
      NotificationManager.warning(message, title, time || 3000);
      break;
    case "error":
      NotificationManager.error(message, title, time || 2000);
      break;
    default:
      return <></>;
  }
};
