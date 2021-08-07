const http = require("http");
const app = require("./app");
const PORT = process.env.PORT || 3000;

const { loadPlanetsData } = require("./models/planets.model");
const { loadLaunchData } = require("./models/launches.model");
const { mongoConnect } = require("./services/mongo");
const server = http.createServer(app);

// Start mongodb connection, load the csv file into mongo and then start the server
const startServer = async () => {
  await mongoConnect();
  await loadLaunchData();
  await loadPlanetsData();
  server.listen(PORT, () => {
    console.log(`Server run on port ${PORT} `);
  });
};

startServer();
