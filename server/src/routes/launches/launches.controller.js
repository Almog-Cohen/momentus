const { json } = require("express");
const {
  getAllLaunches,
  scheduleNewLaunch,
  existsLaunchById,
  abortLaunchById,
} = require("../../models/launches.model");
const { getPagination } = require("../../services/query");

const httpGetAllLaunches = async (req, res) => {
  const { skip, limit } = getPagination(req.query);
  const launches = await getAllLaunches(skip, limit);
  return res.json(launches);
};

const httpAddNewLaunch = async (req, res) => {
  const { launch } = req.body;
  if (!launch.mission || !launch.rocket || !launch.launchDate || !launch.target)
    return res.status(400).json({ error: "Missing required launch field" });

  launch.launchDate = new Date(launch.launchDate);
  if (isNaN(launch.launchDate))
    return res.status(400).json({ error: "Invaild launch date" });

  launch.launchDate = new Date(launch.launchDate);
  console.log(launch.launchDate);
  await scheduleNewLaunch(launch);
  return res.status(201).json(launch);
};

const httpAbortLaunch = async (req, res) => {
  const launchId = Number(req.params.id);
  //if launch doesn't exists
  const existsLaunch = await existsLaunchById(launchId);
  if (!existsLaunch) return res.status(404).json({ error: "Launch not found" });

  //if launch exists
  const aborted = await abortLaunchById(launchId);
  if (!aborted) return res.status(400).json({ error: "Launch not aborted" });
  return res.status(200).json(aborted);
};

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
};
