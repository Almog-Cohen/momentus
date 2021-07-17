const path = require("path");
const fs = require("fs");
const parse = require("csv-parse");
// Filter by kioinsol (temparetures), koi_prad(radius of the star)
const isHabitablePlanet = (planet) => {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
};

const habitablePlanets = [];

const loadPlanetsData = () => {
  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, "..", "..", "data", "kepler_data.csv")
    )
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", (data) => {
        isHabitablePlanet(data) && habitablePlanets.push(data);
      })
      .on("error", (error) => {
        console.log(error);
        reject(err);
      })
      .on("end", () => {
        console.log(`${habitablePlanets.length} habitanble plants found!`);
        resolve();
      });
  });
};

// pasring the data from the fille

const getAllPlanets = () => {
  return habitablePlanets;
};

module.exports = {
  loadPlanetsData,
  getAllPlanets,
};
