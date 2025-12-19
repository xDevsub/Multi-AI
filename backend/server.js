const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./db/connection");
connectDB(); // 👈 VERY IMPORTANT

const chatRoute = require("./api/chat");
const conversationRoute = require("./api/conversation");
const multiCompareRoute = require("./api/multiCompare");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/chat", chatRoute);
app.use("/api/conversation", conversationRoute);
app.use("/api/multiCompare", multiCompareRoute);

app.listen(5000, () =>
  console.log("🚀 Backend running on http://localhost:5000")
);
