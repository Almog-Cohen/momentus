const request = require("supertest");
const app = require("../../app");
const { mongoConnect, mongoDisconnect } = require("../../services/mongo");

describe("Launches API", () => {
  beforeAll(async () => {
    await mongoConnect();
  });

  describe("Test GET /v1/launches", () => {
    test(`It should respond with 200 success`, async () => {
      const response = await request(app)
        .get("/v1/launches")
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });

  describe("Test POST /v1/launches", () => {
    const completLaunchData = {
      mission: `USS enterprise`,
      rocket: `NCC 1701-D`,
      target: `Kepler-62 f`,
      launchDate: `January 4,2028`,
    };

    const launchDataWithoutTheDate = {
      mission: `USS enterprise`,
      rocket: `NCC 1701-D`,
      target: `Kepler-62 f`,
    };
    test(`It should be respond with 201 success`, async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(completLaunchData);

      const requestDate = new Date(completLaunchData.launchDate).valueOf();
      const responseDate = new Date(response.body.launchDate).valueOf();
      expect(responseDate).toBe(requestDate);
      expect(response.body).toMatchObject(launchDataWithoutTheDate);
    });

    test(`It is missing required launch field`, async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(launchDataWithoutTheDate)
        .expect("Content-Type", /json/)
        .expect(400);
      // Check the object has all the properties
      expect(response.body).toStrictEqual({ error: "Invaild launch date" });
    });

    test(`Invaild launch date`, () => {});

    afterAll(async () => {
      await mongoDisconnect();
    });
  });
});
