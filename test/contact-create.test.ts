import { web } from "../src/application/web";
import { disconnect, UserTest, ContactTest } from "./util";
import supertest from "supertest";
import { logger } from "../src/application/logging";

describe("POST /api/contacts", () => {
  beforeEach(async () => {
    await UserTest.loggedInUser();
  });

  afterEach(async () => {
    await ContactTest.deleteAll();
    await UserTest.deleteUsers();
  });

  afterAll(async () => {
    await disconnect();
  });

  it("should create new contact", async () => {
    const user = await UserTest.getUser("test");
    const app = await supertest(web)
      .post("/api/contacts")
      .set("X-API-TOKEN", user.token!)
      .send({
        firstname: "test",
        lastname: "Ruzcen",
        email: "ruzc223@gmail.com",
        phone: "62443875432",
      });

    console.info(app.body);

    expect(app.status).toBe(200);
    expect(app.body.data.firstname).toBe("test");
    expect(app.body.data.lastname).toBe("Ruzcen");
    expect(app.body.data.email).toBe("ruzc223@gmail.com");
    expect(app.body.data.phone).toBe("62443875432");
  });

  it("should reject create new contact if data is invalid", async () => {
    const user = await UserTest.getUser("test");
    const app = await supertest(web)
      .post("/api/contacts")
      .set("X-API-TOKEN", user.token!)
      .send({
        firstname: "",
        lastname: "",
        email: "ruzc223gmail.com",
        phone: "62443875432432424324234324342343243432432554",
      });

    console.info(app.body.errors);

    expect(app.status).toBe(400);
    expect(app.body.errors).toBeDefined();
  });
});
