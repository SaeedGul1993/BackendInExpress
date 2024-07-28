import FCM from "fcm-node";

const firebasePushNotification = () => {
  const serverKey = process.env.SERVER_KEY;
  const fcm = new FCM(serverKey);
  return fcm;
};

export { firebasePushNotification };
