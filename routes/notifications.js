const express = require("express");
const router = express.Router();
const admin = require("../firebase");
const db = admin.firestore();

router.post("/send-notification", async (req, res) => {
  try {
    const { receiverId, title, body, data } = req.body;

    const userDoc = await db.collection("users").doc(receiverId).get();
    const fcmToken = userDoc.data()?.fcmToken;

    if (!fcmToken) return res.status(400).json({ message: "No FCM token" });

    // Ensure data values are strings
    const stringifiedData = {};
    if (data) {
      for (const key in data) {
        stringifiedData[key] = String(data[key]);
      }
    }

    const message = {
  token: fcmToken,
   data: {
    title: String(title),
    body: String(body),
    ...stringifiedData,
  },
  android: {
    priority: 'high',

    notification: {
      channelId: 'high_importance_channel', // must match your Flutter channel
      clickAction: 'FLUTTER_NOTIFICATION_CLICK',
    },
  },
};

   
    await admin.messaging().send(message);

    res.json({ success: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});
module.exports = router;
