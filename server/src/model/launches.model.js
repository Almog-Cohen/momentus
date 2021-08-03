const launches = require("./launches.mongo");
const planets = require("./planets.mongo");

const DEFAULT_FLIGHT_NUMBER = 100;
const launch = {
  flightNumber: 2,
  mission: "kepler",
  rocket: "explorer",
  launchDate: new Date("December 27,2030"),
  target: "Kepler-442 b",
  customers: ["ZTM", "NASA"],
  upcoming: true,
  success: true,
};

// Return all laucnches from database
const getAllLaunches = async () => {
  console.log();
  return await launches.find({}, { _id: 0, __v: 0 });
};

// Return the latest launch from database
const getLatestFlightNumber = async () => {
  const lastestLaunch = await launches.findOne().sort("-flightNumber");
  if (!lastestLaunch) return DEFAULT_FLIGHT_NUMBER;
  return lastestLaunch.flightNumber;
};

const saveLaunch = async (launch) => {
  const planet = await planets.findOne({
    keplerName: launch.target,
  });

  if (!planet) throw new Error("No matching planet was found");

  await launches.findOneAndUpdate(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    {
      upsert: true,
    }
  );
};

// Add new launch object(with increament flight number) to the database
const scheduleNewLaunch = async (launch) => {
  const newFlightNumber = (await getLatestFlightNumber()) + 1;
  const newLaunch = Object.assign(launch, {
    success: true,
    upcoming: true,
    customers: ["SpaceX", "Nasa"],
    flightNumber: newFlightNumber,
  });

  await saveLaunch(newLaunch);
};

// Check if this launch exists by id
const existsLaunchById = async (launchId) => {
  return await launches.findOne({ flightNumber: launchId });
};

// Abort the launch by id
const abortLaunchById = async (launchId) => {
  const aborted = await launches.updateOne(
    {
      flightNumber: launchId,
    },
    {
      upcoming: false,
      success: false,
    }
  );
  // The aborted complete and modified only one document
  return aborted.nModified === 1 && aborted.ok === 1;
};

saveLaunch(launch);

module.exports = {
  getAllLaunches,
  scheduleNewLaunch,
  existsLaunchById,
  abortLaunchById,
};
