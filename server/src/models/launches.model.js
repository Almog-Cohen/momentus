const axios = require("axios");
const launches = require("./launches.mongo");
const planets = require("./planets.mongo");
const DEFAULT_FLIGHT_NUMBER = 100;

// Return all laucnches from database
const getAllLaunches = async (skip, limit) => {
  return await launches
    .find({}, { _id: 0, __v: 0 })
    .sort({ flightNumber: 1 })
    .skip(skip)
    .limit(limit);
};

// Return the latest launch from database
const getLatestFlightNumber = async () => {
  const lastestLaunch = await launches.findOne().sort("-flightNumber");
  if (!lastestLaunch) return DEFAULT_FLIGHT_NUMBER;
  return lastestLaunch.flightNumber;
};

// Save launch
const saveLaunch = async (launch) => {
  // If launch is exists update launch object if not insert new launch object
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
  const planet = await planets.findOne({
    keplerName: launch.target,
  });
  // If planet not exists in database throw an error
  if (!planet) throw new Error("No matching planet was found");

  const newFlightNumber = (await getLatestFlightNumber()) + 1;
  const newLaunch = Object.assign(launch, {
    success: true,
    upcoming: true,
    customers: ["SpaceX", "Nasa"],
    flightNumber: newFlightNumber,
  });

  await saveLaunch(newLaunch);
};

// POST request to SpaceX api and get filtered launches with data about rokcets and payloads
const populatedLaunches = async () => {
  console.log("Downloading launch data");
  const response = await axios.post(process.env.SPACEX_API_URL, {
    query: {},
    options: {
      pagination: false,
      populate: [
        {
          path: "rocket",
          select: {
            name: 1,
          },
        },
        {
          path: "payloads",
          select: {
            customers: 1,
          },
        },
      ],
    },
  });

  if (response.status !== 200) {
    console.log("Problem downloading launches data from SpaceX");
    throw new Error("Launch data download failed");
  }

  const launchData = response.data.docs;
  launchData.map(async (launchDoc) => {
    const customers = launchDoc.payloads.flatMap((payload) => {
      return payload.customers;
    });

    const launch = {
      flightNumber: launchDoc.flight_number,
      mission: launchDoc.name,
      rocket: launchDoc.rocket.name,
      launchDate: launchDoc.date_local,
      upcoming: launchDoc.upcoming,
      success: launchDoc.success,
      customers,
    };
    // Populate launches collection
    await saveLaunch(launch);
  });
};

// Check if this launch exists by id
const existsLaunchById = async (launchId) => {
  return await findLaunch({ flightNumber: launchId });
};

// Find specsific Launch in the database
const findLaunch = async (filter) => {
  return await launches.findOne(filter);
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

const loadLaunchData = async () => {
  const firstLaunch = await findLaunch({
    flightNumber: 1,
    rocket: "Falcon 1",
    mission: "FalconSat",
  });

  if (firstLaunch) {
    console.log("Launches data already loaded");
  } else {
    populatedLaunches();
  }
};

module.exports = {
  loadLaunchData,
  getAllLaunches,
  scheduleNewLaunch,
  existsLaunchById,
  abortLaunchById,
};
