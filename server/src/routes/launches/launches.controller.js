const { json } = require("express");
const { getAllLaunches, addNewLaunch } = require("../../model/launches.model");

const httpGetAllLaunches = (req, res) => {
  return res.json(getAllLaunches());
};

const httpAddNewLaunch = (req, res) => {
  const { launch } = req.body;
  console.log(req.body);
  if (!launch.mission || !launch.rocket || !launch.launchDate || !launch.target)
    return res.status(400).json({ error: "Missing required launch field" });

  launch.launchDate = new Date(launch.launchDate);
  if (isNaN(launch.launchDate))
    return res.status(400).json({ error: "Invaild launch date" });

  launch.launchDate = new Date(launch.launchDate);
  addNewLaunch(launch);
  return res.status(201).json(launch);
};

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
};
