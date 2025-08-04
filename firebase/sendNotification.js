const admin = require("firebase-admin");
const path = require("path");
require("dotenv").config(); // <-- Load environment variables

// Load key path from .env
const keyPath = path.join(__dirname, "..", process.env.GOOGLE_APPLICATION_CREDENTIALS);

// Import the service account key
const serviceAccount = require(keyPath);

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
