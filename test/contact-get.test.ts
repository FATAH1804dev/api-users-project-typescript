import { web } from "../src/application/web";
import { disconnect, UserTest, ContactTest } from "./util";
import supertest from "supertest";
import { logger } from "../src/application/logging";

describe("GET /api/contacts/:contactId", () => {
  beforeEach(async () => {
    await UserTest.loggedInUser();
    await ContactTest.createContact();
  });

  afterEach(async () => {
    await ContactTest.deleteAll();
    await UserTest.deleteUsers();
  });

  afterAll(async () => {
    await disconnect();
  });

  it("should be able get contact", async () => {
    const user = await UserTest.getUser("test");
    const contact = await ContactTest.getContact("Ruzcen", "test");
    const app = await supertest(web)
      .get(`/api/contacts/${contact.id}`)
      .set("X-API-TOKEN", user.token!);

    console.info(app.body);

    expect(app.status).toBe(200);
    expect(app.body.data.firstname).toBe("test");
    expect(app.body.data.lastname).toBe("Yory");
    expect(app.body.data.email).toBe("yory432@gmail.com");
    expect(app.body.data.phone).toBe("625648839243");
  });

  it("should reject get contact if contact is not found", async () => {
    const user = await UserTest.getUser("test");
    const contact = await ContactTest.getContact("Ruzcen", "test");
    const app = await supertest(web)
      .get(`/api/contacts/${contact.id + 1}`)
      .set("X-API-TOKEN", user.token!);

    console.info(app.body.errors);

    expect(app.status).toBe(404);
    expect(app.body.errors).toBeDefined();
  });
});
