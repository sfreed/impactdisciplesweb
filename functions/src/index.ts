/* eslint-disable @typescript-eslint/no-var-requires */
const stripeApi = require("./stripe.functions");
exports.checkout = stripeApi.checkout;
exports.cancel = stripeApi.cancel;
exports.refund = stripeApi.refund;

const notifications = require("./notifications.functions");
exports.notifications = notifications.sendNotification;

const shipping = require("./shipping.functions");
exports.shipping = shipping.shipping;

const importJSON = require("./import.functions");
exports.importJson = importJSON.importJSON;

const imageUploader = require("./fetchimage.functions");
exports.uploadImageToStorage = imageUploader.uploadImageToStorage;

const subscriptions = require("./subscriptions.functions");
exports.subscriptions = subscriptions.subscriptions;
