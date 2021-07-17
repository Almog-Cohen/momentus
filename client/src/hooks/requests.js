import axios from "axios";

const API_URL = `http://localhost:3001`;
async function httpGetPlanets() {
  const response = await axios.get(`${API_URL}/planets`);
  return response.data;
  // TODO: Once API is ready.
  // Load planets and return as JSON.
}

async function httpGetLaunches() {
  // TODO: Once API is ready.
  // Load launches, sort by flight number, and return as JSON.
  const response = await axios.get(`${API_URL}/launches`);
  console.log("called get", response);

  return response.data.sort((a, b) => {
    return a.flightNumber - b.flightNumber;
  });
}
// Submit given launch data to launch system.
async function httpSubmitLaunch(launch) {
  try {
    const response = await axios.post(`${API_URL}/launches`, {
      launch,
    });
    console.log("called with", response);

    return response;
  } catch (err) {
    return {
      ok: false,
    };
  }
}

async function httpAbortLaunch(id) {
  // TODO: Once API is ready.
  // Delete launch with given ID.
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
