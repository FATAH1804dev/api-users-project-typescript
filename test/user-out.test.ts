import { web } from "../src/application/web";
import { disconnect, UserTest } from "./util";
import supertest from "supertest";
import { logger } from "../src/application/logging";

describe("DELETE /api/users/current", () => {
  beforeEach(async () => {
    await UserTest.loggedInUser();
  });

  afterEach(async () => {
    await UserTest.deleteUsers();
  });

  afterAll(async () => {
    await disconnect();
  });

  it("should be able to logout", async () => {
    const user = await UserTest.getUser();
    const app = await supertest(web).delete("/api/users/current").set({
      "X-API-TOKEN": user.token!,
    });

    logger.info(app.body.data);

    const loggedOutUser = await UserTest.getUser();

    expect(app.status).toBe(200);
    expect(app.body.data).toBe("user Ruzcen has been logged out");
    expect(loggedOutUser.token).toBeNull();
  });

  it("should reject logout user if token is wrong", async () => {
    // const user = await UserTest.getUser();
    const app = await supertest(web).delete("/api/users/current").set({
      "X-API-TOKEN": "salah",
    });

    logger.info(app.body.errors);

    expect(app.status).toBe(401);
    expect(app.body.errors).toBeDefined();
  });
});
