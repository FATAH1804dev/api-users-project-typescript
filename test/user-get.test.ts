import { web } from "../src/application/web";
import { disconnect, UserTest } from "./util";
import supertest from "supertest";
import { logger } from "../src/application/logging";

describe("POST /api/users/current", () => {
  beforeEach(async () => {
    await UserTest.loggedInUser();
  });

  afterEach(async () => {
    await UserTest.deleteUsers();
  });

  afterAll(async () => {
    await disconnect();
  });

  it("should be able to get user", async () => {
    const user = await UserTest.getUser("test");
    const app = await supertest(web).get("/api/users/current").set({
      "X-API-TOKEN": user.token!,
    });

    logger.info(app.body);

    expect(app.status).toBe(200);
    expect(app.body.data.username).toBe("Ruzcen");
    expect(app.body.data.name).toBe("test");
  });

  it("should reject get user if token is invalid", async () => {
    const app = await supertest(web).get("/api/users/current").set({
      "X-API-TOKEN": "salah",
    });

    logger.info(app.body.errors);

    expect(app.status).toBe(401);
    expect(app.body.errors).toBeDefined();
  });
});
