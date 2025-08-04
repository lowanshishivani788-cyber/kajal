const admin = require("firebase-admin");
const path = require("path");

const serviceAccount = require(path.join(__dirname, "serviceAccountKey.json"));

// Initialize Firebase Admin only once
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const sendNotification = async (token) => {
  const message = {
    token,
    notification: {
      title: "Hello from KajalSalon 🎉",
      body: "This is a push notification from Firebase",
    },
    android: {
      priority: "high",
    },
    apns: {
      payload: {
        aps: {
          sound: "default",
        },
      },
    },
  };

 const response = await admin.messaging().send(message);
  console.log("✅ Push Notification sent successfully!");
    return response;
};

module.exports = sendNotification;
