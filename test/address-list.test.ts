import { web } from "../src/application/web";
import { disconnect, UserTest, ContactTest, AddressTest } from "./util";
import supertest from "supertest";
import { logger } from "../src/application/logging";

describe("GET /api/contacts/:contactId/addresses", () => {
  beforeEach(async () => {
    await UserTest.loggedInUser();
    await ContactTest.createContact();
    await AddressTest.createAddress();
  });

  afterEach(async () => {
    await AddressTest.deleteAll();
    await ContactTest.deleteAll();
    await UserTest.deleteUsers();
  });

  afterAll(async () => {
    await disconnect();
  });

  it("should be able to list address", async () => {
    const user = await UserTest.getUser("test");
    const contact = await ContactTest.getContact("Ruzcen", "test");
    const address = await AddressTest.getAddress("Ruzcen", contact.id, "test");
    const app = await supertest(web)
      .get(`/api/contacts/${contact.id}/addresses`)
      .set("X-API-TOKEN", user.token!);

    console.info(app.body.data);

    expect(app.status).toBe(200);
    expect(app.body.data.length).toBe(1);
    expect(app.body.data[0].id).toBe(address.id);
    expect(app.body.data[0].postal_code).toBe(address.postal_code);
  });

  it("should reject list addresses if contact is not found", async () => {
    const user = await UserTest.getUser("test");
    const contact = await ContactTest.getContact("Ruzcen", "test");
    const app = await supertest(web)
      .get(`/api/contacts/${contact.id + 1}/addresses`)
      .set("X-API-TOKEN", user.token!);

    console.info(app.body.errors);

    expect(app.status).toBe(404);
    expect(app.body.errors).toBeDefined();
  });
});
