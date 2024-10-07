import admin = require("firebase-admin");
import * as functions from "firebase-functions";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const cors = require("cors")({origin: true});

exports.importJSON = functions
  .https.onRequest((request, response) => {
    return cors(request, response, async () => {
      const db = admin.firestore();

      response.set("Access-Control-Allow-Credentials", "true");
      response.set("Access-Control-Allow-Origin", "*");
      const retval = [];

      const requestBody = request.body;

      const batch = db.batch();

      requestBody.forEach((record) => {
        const ref = db.doc(`blog-files-temp/${record.ID}`);
        batch.set(ref, record);
      });

      await batch.commit().then(() => {
        response.send(retval);
      });
    });
  });
