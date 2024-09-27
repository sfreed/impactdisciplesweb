/* eslint-disable @typescript-eslint/no-var-requires */
import * as functions from "firebase-functions";

let stripe;

const cors = require("cors")({
  origin: true,
});

exports.checkout = functions
  .runWith({secrets: ["STRIPE_SECRET_KEY"]})
  .https.onRequest((request, response) => {
    return cors(request, response, async () => {
      stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

      response.set("Access-Control-Allow-Credentials", "true");
      response.set("Access-Control-Allow-Origin", "*");

      const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(request.body),
        currency: "usd",
        automatic_payment_methods: {
          enabled: true,
        },
      });

      response.send({
        clientSecret: paymentIntent.client_secret,
        paymentIntent: paymentIntent.id,
      });
    });
  });


exports.cancel = functions
  .runWith({secrets: ["STRIPE_SECRET_KEY"]})
  .https.onRequest((request, response) => {
    return cors(request, response, async () => {
      stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

      response.set("Access-Control-Allow-Credentials", "true");
      response.set("Access-Control-Allow-Origin", "*");

      await stripe.paymentIntents.cancel(request.body.paymentIntent);

      response.send({
        id: request.body,
      });
    });
  });

const calculateOrderAmount = (items) => {
  let total = 0;
  items.forEach((item) => {
    total += item.amount;
  });
  return total;
};
