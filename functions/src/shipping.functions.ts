/* eslint-disable @typescript-eslint/no-var-requires */
import * as functions from "firebase-functions";

const ShipEngine = require("shipengine");

const cors = require("cors")({origin: true});

exports.shipping = functions
  .runWith({secrets: ["SHIP_ENGINE_API_KEY"]})
  .https.onRequest((request, response) => {
    return cors(request, response, async () => {
      const shipengine = new ShipEngine(process.env.SHIP_ENGINE_API_KEY);

      response.set("Access-Control-Allow-Credentials", "true");
      response.set("Access-Control-Allow-Origin", "*");

      const requestBody = request.body;

      shipengine.getRatesWithShipmentDetails(requestBody).then((result) => {
        response.send(result);
      });
    });
  });
