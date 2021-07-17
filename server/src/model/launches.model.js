const launches = new Map();

let lastestFlightNumber = 100;

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

launches.set(launch.flightNumber, launch);

const getAllLaunches = () => {
  return Array.from(launches.values());
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
module.exports = {
  getAllLaunches,
  addNewLaunch,
};
