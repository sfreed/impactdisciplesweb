/* eslint-disable @typescript-eslint/no-var-requires */
import * as functions from "firebase-functions";

// eslint-disable-next-line max-len
const stripe = require("stripe")("sk_test_51IP8IBC4Pv6WfeJrQEz7yFtaw4k22dNegkjr9ySOYt6AxnMoGQxLXyQYaD7wuQCcrmu39sS8tCfEGLnwdKlT10Cx00UqG7qkw9");

const cors = require("cors")({
  origin: true,
});

exports.checkout = functions.https.onRequest((request, response) => {
  return cors(request, response, async () => {
    response.set("Access-Control-Allow-Credentials", "true");
    response.set("Access-Control-Allow-Origin", "*");

    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(request.body),
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    console.log(paymentIntent.client_secret);

    response.send({
      clientSecret: paymentIntent.client_secret,
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
