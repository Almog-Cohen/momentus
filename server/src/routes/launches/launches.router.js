const express = require("express");
const {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
} = require("./launches.controller");

const laucnhesRouter = express.Router();

laucnhesRouter.get("/", httpGetAllLaunches);
laucnhesRouter.post("/", httpAddNewLaunch);
laucnhesRouter.delete("/:id", httpAbortLaunch);

module.exports = laucnhesRouter;
