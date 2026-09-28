import { web } from "../src/application/web";
import { disconnect, UserTest } from "./util";
import supertest from "supertest";
import { logger } from "../src/application/logging";

describe("POST /api/users", () => {
  afterEach(async () => {
    await UserTest.deleteUsers();
  });

  afterAll(async () => {
    await disconnect();
  });

  it("should reject register new user if request is invalid", async () => {
    const app = await supertest(web).post("/api/users").send({
      username: "",
      password: "",
      name: "",
    });

    console.info(app.body.errors);

    expect(app.body.errors).toBeDefined();
    expect(app.status).toBe(400);
  });

  it("should register new user", async () => {
    const app = await supertest(web).post("/api/users").send({
      username: "Jake Cileuy",
      password: "rahasia kita",
      name: "test",
    });

    console.info(app.body);

    expect(app.status).toBe(200);
    expect(app.body.data.username).toBe("Jake Cileuy");
    expect(app.body.data.name).toBe("test");
  });
});
