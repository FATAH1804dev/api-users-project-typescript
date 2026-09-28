import { web } from "../src/application/web";
import { disconnect, UserTest } from "./util";
import supertest from "supertest";
import { logger } from "../src/application/logging";

describe("POST /api/users/login", () => {
  beforeEach(async () => {
    await UserTest.createUser();
  });

  afterEach(async () => {
    await UserTest.deleteUsers();
  });

  afterAll(async () => {
    await disconnect();
  });

  it("should be able to login", async () => {
    const app = await supertest(web).post("/api/users/login").send({
      username: "Yaschor",
      password: "rahasiakita",
    });

    logger.info(app.body);

    expect(app.status).toBe(200);
    expect(app.body.data.username).toBe("Yaschor");
    expect(app.body.data.name).toBe("test");
    expect(app.body.data.token).toBeDefined();
  });

  it("should reject login user if username is wrong", async () => {
    const app = await supertest(web).post("/api/users/login").send({
      username: "Jake Cileuy",
      password: "rahasiakita",
    });

    logger.info(app.body.errors);

    expect(app.status).toBe(401);
    expect(app.body.errors).toBeDefined();
    expect(app.body.errors).toContain("Username or password is wrong!");
  });

  it("should reject login user if password is wrong", async () => {
    const app = await supertest(web).post("/api/users/login").send({
      username: "Yachor",
      password: "rahasia kita",
    });

    logger.info(app.body.errors);

    expect(app.status).toBe(401);
    expect(app.body.errors).toBeDefined();
    expect(app.body.errors).toContain("Username or password is wrong!");
  });
});
