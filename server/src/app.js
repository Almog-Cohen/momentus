const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const planetsRouter = require("./routes/planets/planets.router");
const laucnhesRouter = require("./routes/launches/launches.router");

const app = express();
// app.use(cors({ origin: "http://localhost:3000" }));
app.use(cors());

// Logging requests
app.use(morgan("combined"));
app.use(express.json());

// Serving our frotend
app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/planets", planetsRouter);
app.use("/launches", laucnhesRouter);
// Send our homrpage route
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
