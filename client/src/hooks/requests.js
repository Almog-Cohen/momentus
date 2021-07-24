import axios from "axios";

const API_URL = `http://localhost:3001`;
async function httpGetPlanets() {
  const response = await axios.get(`${API_URL}/planets`);
  return response.data;
  // Load planets and return as JSON.
}

async function httpGetLaunches() {
  // Load launches, sort by flight number, and return as JSON.
  const response = await axios.get(`${API_URL}/launches`);
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

    return response;
  } catch (err) {
    console.log(err);
    return {
      ok: false,
    };
  }
}

async function httpAbortLaunch(id) {
  // Delete launch with given ID.
  try {
    const response = await axios.delete(`${API_URL}/launches/${id}`);
    return response;
  } catch (err) {
    console.log(err);
    return {
      ok: false,
    };
  }
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
