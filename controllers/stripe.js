const prisma = require("../config/prisma");
const createError = require("../utils/create-error");
require("dotenv").config();

// This is your test secret API key.
const stripe = require("stripe")(
  "sk_test_51QTyM3JKsFVoUyyZqmnIcDBvNqDqppkVX5lBtKenZ7nXhnzjt35IZ2W6VirzVqSkq70pzeRh4k340M6NvQOU3R0D00wffXFHfq"
);

exports.payment = async (req, res, next) => {
  try {
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 5000,
      currency: "thb",
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {
        enabled: true,
      },
    });
    res.send({
      clientSecret: paymentIntent.client_secret,
      // [DEV]: For demo purposes only, you should avoid exposing the PaymentIntent ID in the client-side code.
      dpmCheckerLink: `https://dashboard.stripe.com/settings/payment_methods/review?transaction_id=${paymentIntent.id}`,
    });
  } catch (err) {
    next(err);
    console.log(err);
  }
};