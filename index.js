require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const connectDB = require("./config/connectDB");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const cookieParser = require("cookie-parser");

const { POST = 5000 } = process.env;

// const POST = process.env.POST || 5000;
// const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET, POST = 5000 } = process.env;
// const base = "https://api-m.sandbox.paypal.com";

connectDB();

// app.use(express.static("client"));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

app.use("/auth", require("./routes/authRoutes"));
app.use("/users", require("./routes/userRoutes"));
app.use("/products", require("./routes/productRoutes"));
app.use("/categories", require("./routes/categoryRoutes"));
app.use("/cart", require("./routes/cartRoutes"));
app.use("/saved", require("./routes/savedRoutes"));
app.use("/settings", require("./routes/setttingsRoutes"));

// async function generateAccessToken() {
//   // To base64 encode your client id and secret using NodeJs
//   const BASE64_ENCODED_CLIENT_ID_AND_SECRET = Buffer.from(
//     `${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`
//   ).toString("base64");

//   const request = await fetch(
//     "https://api-m.sandbox.paypal.com/v1/oauth2/token",
//     {
//       method: "POST",
//       headers: {
//         Authorization: `Basic ${BASE64_ENCODED_CLIENT_ID_AND_SECRET}`,
//       },
//       body: new URLSearchParams({
//         grant_type: "client_credentials",
//         response_type: "id_token",
//         intent: "sdk_init",
//       }),
//     }
//   );
//   const json = await request.json();
//   return json.access_token;
// }
// module.exports = generateAccessToken;
// async function handleResponse(response) {
//   try {
//     const jsonResponse = await response.json();
//     return {
//       jsonResponse,
//       httpStatusCode: response.status,
//     };
//   } catch (err) {
//     const errorMessage = await response.text();
//     throw new Error(errorMessage);
//   }
// }

// /**
//  * Create an order to start the transaction.
//  * @see https://developer.paypal.com/docs/api/orders/v2/#orders_create
//  */
// const createOrder = async (cart) => {
//   // use the cart information passed from the front-end to calculate the purchase unit details
//   console.log(
//     "shopping cart information passed from the frontend createOrder() callback:",
//     cart
//   );

//   const accessToken = await generateAccessToken();
//   const url = `${base}/v2/checkout/orders`;

//   const payload = {
//     intent: "CAPTURE",
//     purchase_units: [
//       {
//         amount: {
//           currency_code: "USD",
//           value: "100",
//         },
//       },
//     ],
//   };

//   const response = await fetch(url, {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${accessToken}`,
//       // Uncomment one of these to force an error for negative testing (in sandbox mode only).
//       // Documentation: https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
//       // "PayPal-Mock-Response": '{"mock_application_codes": "MISSING_REQUIRED_PARAMETER"}'
//       // "PayPal-Mock-Response": '{"mock_application_codes": "PERMISSION_DENIED"}'
//       // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
//     },
//     method: "POST",
//     body: JSON.stringify(payload),
//   });

//   // createOrder route
//   app.post("/api/orders", async (req, res) => {
//     try {
//       // use the cart information passed from the front-end to calculate the order amount detals
//       const { cart } = req.body;
//       const { jsonResponse, httpStatusCode } = await createOrder(cart);
//       res.status(httpStatusCode).json(jsonResponse);
//     } catch (error) {
//       console.error("Failed to create order:", error);
//       res.status(500).json({ error: "Failed to create order." });
//     }
//   });

//   return handleResponse(response);
// };

// /**
//  * Capture payment for the created order to complete the transaction.
//  * @see https://developer.paypal.com/docs/api/orders/v2/#orders_capture
//  */
// const captureOrder = async (orderID) => {
//   const accessToken = await generateAccessToken();
//   const url = `${base}/v2/checkout/orders/${orderID}/capture`;

//   const response = await fetch(url, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${accessToken}`,
//       // Uncomment one of these to force an error for negative testing (in sandbox mode only).
//       // Documentation:
//       // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
//       // "PayPal-Mock-Response": '{"mock_application_codes": "INSTRUMENT_DECLINED"}'
//       // "PayPal-Mock-Response": '{"mock_application_codes": "TRANSACTION_REFUSED"}'
//       // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
//     },
//   });

//   return handleResponse(response);
// };

// // captureOrder route
// app.post("/api/orders/:orderID/capture", async (req, res) => {
//   try {
//     const { orderID } = req.params;
//     const { jsonResponse, httpStatusCode } = await captureOrder(orderID);
//     res.status(httpStatusCode).json(jsonResponse);
//   } catch (error) {
//     console.error("Failed to create order:", error);
//     res.status(500).json({ error: "Failed to capture order." });
//   }
// });

mongoose.connection.once("open", () => {
  console.log("Connected with mongodb");
  app.listen(POST, () => {
    console.log("Server run on Post", POST);
  });
});

mongoose.connection.on("error", (err) => {
  console.log("Error", err);
});
