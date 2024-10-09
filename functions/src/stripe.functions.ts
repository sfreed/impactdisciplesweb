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

      let total = 0;

      try {
        request.body.items.forEach((item) => {
          total += item.amount;
        });
        const paymentIntent = await stripe.paymentIntents.create({
          amount: total,
          currency: "usd",
          automatic_payment_methods: {
            enabled: true,
          },
          description: request.body.description,
        });

        response.send({
          clientSecret: paymentIntent.client_secret,
          paymentIntent: paymentIntent.id,
        });
      } catch (err) {
        response.send({
          code: 400,
          body: request.body,
          error: err,
        });
      }
    });
  });


exports.cancel = functions
  .runWith({secrets: ["STRIPE_SECRET_KEY"]})
  .https.onRequest((request, response) => {
    return cors(request, response, async () => {
      stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

      response.set("Access-Control-Allow-Credentials", "true");
      response.set("Access-Control-Allow-Origin", "*");

      try {
        await stripe.paymentIntents.cancel(request.body.paymentIntent);

        response.send({
          id: request.body,
        });
      } catch (err) {
        response.send({
          code: 400,
          body: request.body,
          error: err,
        });
      }
    });
  });

exports.refund = functions
  .runWith({secrets: ["STRIPE_SECRET_KEY"]})
  .https.onRequest((request, response) => {
    return cors(request, response, async () => {
      stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

      response.set("Access-Control-Allow-Credentials", "true");
      response.set("Access-Control-Allow-Origin", "*");

      try {
        const refund = await stripe.refunds.create({
          payment_intent: request.body.paymentIntent,
          amount: request.body.amount,
        });

        response.send(refund);
      } catch (err) {
        response.send({
          code: 400,
          body: request.body,
          error: err,
        });
      }
    });
  });
