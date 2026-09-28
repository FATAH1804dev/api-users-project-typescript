import { web } from "../src/application/web";
import { disconnect, UserTest } from "./util";
import supertest from "supertest";
import { logger } from "../src/application/logging";
import bcrypt from "bcrypt";

describe("PATCH /api/users/current", () => {
  beforeEach(async () => {
    await UserTest.loggedInUser();
  });

  afterEach(async () => {
    await UserTest.deleteUsers();
  });

  afterAll(async () => {
    await disconnect();
  });

  it("should reject update user if request is invalid", async () => {
    const user = await UserTest.getUser();
    const app = await supertest(web)
      .patch("/api/users/current")
      .set({
        "X-API-TOKEN": user.token!,
      })
      .send({
        name: "",
        password: "",
      });

    logger.info(app.body.errors);

    expect(app.status).toBe(400);
    expect(app.body.errors).toBeDefined();
  });

  it("should reject update user if token is wrong", async () => {
    // const user = await UserTest.getUser();
    const app = await supertest(web)
      .patch("/api/users/current")
      .set({
        "X-API-TOKEN": "salah",
      })
      .send({
        name: "test",
        password: "benar",
      });

    logger.info(app.body.errors);

    expect(app.status).toBe(401);
    expect(app.body.errors).toBeDefined();
  });

  it("should be able to update name", async () => {
    const user = await UserTest.getUser();
    const app = await supertest(web)
      .patch("/api/users/current")
      .set({
        "X-API-TOKEN": user.token!,
      })
      .send({
        name: "test lagi",
      });

    logger.info(app.body);

    expect(app.status).toBe(200);
    expect(app.body.data.username).toBe("Ruzcen");
    expect(app.body.data.name).toBe("test lagi");
  });

  it("should be able to update password", async () => {
    const user = await UserTest.getUser();
    const app = await supertest(web)
      .patch("/api/users/current")
      .set({
        "X-API-TOKEN": user.token!,
      })
      .send({
        password: "rahasia lagi",
      });

    logger.info(app.body);

    const updatedUser = await UserTest.getUser();

    expect(app.status).toBe(200);
    expect(app.body.data.username).toBe("Ruzcen");
    expect(app.body.data.name).toBe("test");
    expect(await bcrypt.compare("rahasia lagi", updatedUser.password)).toBe(
      true,
    );
  });
});
