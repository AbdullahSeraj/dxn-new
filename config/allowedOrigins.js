const webstie = process.env.WEBSITE_URL;
const allowedOrigins = [
  "http://localhost:3000",
  "https://dxn-new-front-end.onrender.com",
  webstie,
];

module.exports = allowedOrigins;
