const http = require("http");
const app = require("./app");
const PORT = process.env.PORT || 3001;

const { loadPlanetsData } = require("./model/planets.model");
const { mongoConnect } = require("./services/mongo");
const server = http.createServer(app);

const startServer = async () => {
  await mongoConnect();
  await loadPlanetsData();
  server.listen(PORT, () => {
    console.log(`Server run on port ${PORT} `);
  });
};

startServer();
