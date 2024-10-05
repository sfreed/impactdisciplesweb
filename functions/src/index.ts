/* eslint-disable @typescript-eslint/no-var-requires */
const stripeApi = require("./stripe.functions");
exports.checkout = stripeApi.checkout;
exports.cancel = stripeApi.cancel;

const notifications = require("./notifications.functions");
exports.notifications = notifications.sendNotification;

const shipping = require("./shipping.functions");
exports.shipping = shipping.shipping;
