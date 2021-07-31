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

const getAllLaunches = async () => {
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

  await launches.updateOne(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    {
      upsert: true,
    }
  );
};

const addNewLaunch = (launch) => {
  lastestFlightNumber++;
  launches.set(
    lastestFlightNumber,
    Object.assign(launch, {
      success: true,
      upcoming: true,
      customers: ["Zero to mastery", "Nasa"],
      flightNumber: lastestFlightNumber,
    })
  );
};

const existsLaunchById = (launchId) => {
  return launches.has(launchId);
};

const abortLaunchById = (launchId) => {
  const aborted = launches.get(launchId);
  aborted.upcoming = false;
  aborted.success = false;
  return aborted;
};

saveLaunch(launch);

module.exports = {
  getAllLaunches,
  addNewLaunch,
  existsLaunchById,
  abortLaunchById,
};
