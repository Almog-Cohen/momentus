const { json } = require("express");
const {
  getAllLaunches,
  addNewLaunch,
  existsLaunchById,
  abortLaunchById,
} = require("../../model/launches.model");

const httpGetAllLaunches = (req, res) => {
  return res.json(getAllLaunches());
};

const httpAddNewLaunch = (req, res) => {
  const { launch } = req.body;
  if (!launch.mission || !launch.rocket || !launch.launchDate || !launch.target)
    return res.status(400).json({ error: "Missing required launch field" });

  launch.launchDate = new Date(launch.launchDate);
  if (isNaN(launch.launchDate))
    return res.status(400).json({ error: "Invaild launch date" });

  launch.launchDate = new Date(launch.launchDate);
  console.log(launch.launchDate);
  addNewLaunch(launch);
  return res.status(201).json(launch);
};

const httpAbortLaunch = (req, res) => {
  const launchId = Number(req.params.id);
  //if launch doesn't exists
  if (!existsLaunchById(launchId))
    return res.status(404).json({ error: "Launch not found" });

  //if launch exists
  const aborted = abortLaunchById(launchId);
  return res.status(200).json(aborted);
};

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
};
