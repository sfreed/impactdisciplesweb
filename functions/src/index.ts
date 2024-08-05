import {onCall} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import {getMessaging} from "firebase-admin/messaging";
import admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

export const sendNotification = onCall((request) => {
  const message = {
    token: request.data.token,
    notification: {
      title: request.data.title,
      body: request.data.body,
      imageUrl: "https://firebasestorage.googleapis.com/v0/b/impactdisciples-a82a8.appspot.com/o/Icons%2Ficon-72x72.png",
    },
  };

  getMessaging().send(message)
    .then((response) => {
      // Response is a message ID string.
      logger.info("Successfully sent message", message);
      logger.info("Successfully response", response);
    })
    .catch((error) => {
      logger.error("Error sending message:", error);
    });
});


