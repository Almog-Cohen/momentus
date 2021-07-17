const { getAllPlanets } = require("../../model/planets.model");

const httpGetAllPlanets = (req, res) => {
  return res.json(getAllPlanets());
};

module.exports = {
  httpGetAllPlanets,
};
