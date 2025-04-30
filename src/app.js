const express = require("express");
const cors = require("cors");
const routes = require("./routes/routes");
require("dotenv").config();
const cookieSession = require("cookie-session");

const app = express();
app.use(cors());
app.use(express.json());

// Set up cookie-session
app.use(
  cookieSession(
    {
      name: "session",
      keys: [process.env.JWT_SECRET],
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      httpOnly: true,
    }
  )
);

app.use("/api", routes);

module.exports = app;
