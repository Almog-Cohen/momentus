const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const api = require("./routes/api");

const app = express();

app.use(cors());

// Logging requests
// app.use(morgan("combined"));
app.use(express.json());

// app.use(helmet());
// Serving our frotend
app.use(express.static(path.join(__dirname, "..", "public")));

// Strucutre to support more api versions
app.use("/v1", api);

// Send our homrpage route
app.get("/*", (req, res) => {
  console.log("Send html to the server");
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
