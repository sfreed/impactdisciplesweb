import admin = require("firebase-admin");
import * as functions from "firebase-functions";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const cors = require("cors")({origin: true});

exports.subscriptions = functions
  .https.onRequest((request, response) => {
    return cors(request, response, async () => {
      const db = admin.firestore();

      response.set("Access-Control-Allow-Credentials", "true");
      response.set("Access-Control-Allow-Origin", "*");

      try {
        const email = request.query.email;
        const list = request.query.list;

        console.log("deleting + "+ email + " from " + list);

        const collection = db.collection(list as string);

        const docRef = collection.where("email", "==", email);

        docRef.get().then((docs) => {
          docs.forEach((doc) => {
            doc.ref.delete();
          });
        }).then(() => {
          response.send("You have been successfully removed from the " + list);
        });
      } catch (err) {
        response.send(err);
      }
    });
  });
