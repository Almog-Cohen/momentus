require("dotenv").config();
const http = require("http");
const app = require("./app");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3001;

const { loadPlanetsData } = require("./model/planets.model");

const server = http.createServer(app);

mongoose.connection.once("open", () => {
  console.log("MongoDB connected");
});

mongoose.connection.on("error", (err) => {
  console.error(`There is error in mongodb ${err}`);
});

const startServer = async () => {
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
  await loadPlanetsData();
  server.listen(PORT, () => {
    console.log(`Server run on port ${PORT} `);
  });
};

startServer();
