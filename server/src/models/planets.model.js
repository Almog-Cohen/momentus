const path = require("path");
const fs = require("fs");
const parse = require("csv-parse");

const planets = require("./planets.mongo");
// Filter by kioinsol (temparetures), koi_prad(radius of the star)
const isHabitablePlanet = (planet) => {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
};

// Read data from kepler_data.csv
const loadPlanetsData = () => {
  return new Promise((resolve, reject) => {
    // Open a stream to read csv
    fs.createReadStream(
      path.join(__dirname, "..", "..", "data", "kepler_data.csv")
    )
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", async (data) => {
        // Save in database all the filtered planets
        isHabitablePlanet(data) && savePlanet(data);
      })
      .on("error", (error) => {
        console.log(error);
        reject(err);
      })
      .on("end", async () => {
        // Get from database all the planets
        const countPlanetsFound = (await getAllPlanets()).length;
        console.log(`${countPlanetsFound} habitanble plants found!`);
        resolve();
      });
  });
};

// Return all the planets from the db
const getAllPlanets = async () => {
  return await planets.find({}, { __v: 0, _id: 0 });
};

// Save the plantes in database
const savePlanet = async (planet) => {
  try {
    // If it exists update it if its not exists insert it
    await planets.updateOne(
      {
        keplerName: planet.kepler_name,
      },
      {
        keplerName: planet.kepler_name,
      },
      {
        upsert: true,
      }
    );
  } catch (error) {
    console.error(`Could not save planet  ${error}`);
  }
};

module.exports = {
  loadPlanetsData,
  getAllPlanets,
};
