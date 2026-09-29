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

  it("should be able to remove contact", async () => {
    const user = await UserTest.getUser();
    const contact = await ContactTest.getContact();
    const app = await supertest(web)
      .delete(`/api/contacts/${contact.id}`)
      .set("X-API-TOKEN", user.token!);

    console.info(app.body);

    expect(app.status).toBe(200);
    expect(app.body.data).toBe(
      `contact user ${contact.firstname} with id ${contact.id} has been removed`,
    );
  });

  it("should reject remove contact if contact is not found", async () => {
    const user = await UserTest.getUser();
    const contact = await ContactTest.getContact();
    const app = await supertest(web)
      .delete(`/api/contacts/${contact.id + 1}`)
      .set("X-API-TOKEN", user.token!);

    console.info(app.body.errors);

    expect(app.status).toBe(404);
    expect(app.body.errors).toBeDefined();
  });
});
