/* eslint-disable @typescript-eslint/no-var-requires */
import * as functions from "firebase-functions";

const cors = require("cors")({
  origin: true,
});

exports.get_youtube_keys = functions
  .runWith({secrets: ["GOOGLE_SECRET_KEY", "YOUTUBE_PLAYLIST_KEY"]})
  .https.onRequest((request, response) => {
    return cors(request, response, async () => {
      response.set("Access-Control-Allow-Credentials", "true");
      response.set("Access-Control-Allow-Origin", "*");

      response.send({api_key: process.env.GOOGLE_SECRET_KEY,
        playlist_key: process.env.YOUTUBE_PLAYLIST_KEY});
    });
  });
