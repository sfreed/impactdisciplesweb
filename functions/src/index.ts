import {onCall} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import {getMessaging} from "firebase-admin/messaging";
import admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

export const sendNotification = onCall((request) => {
  logger.info("sendNotification!", {structuredData: true});

  const message = {
    token: request.data.token,
    notification: {
      title: "Test From Server",
      body: request.data.text,
    },
  };

  getMessaging().send(message)
    .then((response) => {
      // Response is a message ID string.
      logger.info("Successfully sent message", message);
      logger.info("Successfully response", response);
    })
    .catch((error) => {
      logger.info("Error sending message:", error);
    });
});


