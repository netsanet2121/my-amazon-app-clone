const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

const app = express();

// Enable CORS
app.use(cors({ origin: true }));

// Middleware to parse JSON
app.use(express.json());

// Route: Test
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Success!",
  });
});
app.post("/payment/create", async (req, res) => {
  const total = parseInt(req.query.total);

  if (total > 0) {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
    });
    console.log(paymentIntent);

    res.status(201).json({
      clientSecret: paymentIntent.client_secret,
    });
  } else {
    res.status(403).json({
      messege: "total must be greater than 0",
    });
  }
});

// Export as Firebase Function
exports.api = onRequest(app);
