const express = require("express");
const {
  httpGetAllLaunches,
  httpAddNewLaunch,
} = require("./launches.controller");

const laucnhesRouter = express.Router();

laucnhesRouter.get("/", httpGetAllLaunches);
laucnhesRouter.post("/", httpAddNewLaunch);

module.exports = laucnhesRouter;
