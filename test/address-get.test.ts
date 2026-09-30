import { web } from "../src/application/web";
import { disconnect, UserTest, ContactTest, AddressTest } from "./util";
import supertest from "supertest";
import { logger } from "../src/application/logging";

describe("PUT /api/contacts/:contactId/addresses", () => {
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

  it("should be able to get address", async () => {
    const user = await UserTest.getUser("test");
    const contact = await ContactTest.getContact("Ruzcen", "test");
    const address = await AddressTest.getAddress("Ruzcen", contact.id, "test");
    const app = await supertest(web)
      .get(`/api/contacts/${contact.id}/addresses/${address.id}`)
      .set("X-API-TOKEN", user.token!);

    console.info(app.body);

    expect(app.status).toBe(200);
    expect(app.body.data.id).toBe(address.id);
    expect(app.body.data.street).toBe("Capoyurwyerns .st");
    expect(app.body.data.city).toBe("Kcysyl");
    expect(app.body.data.province).toBe("Tednuock");
    expect(app.body.data.postal_code).toBe("244764");
  });

  it("should reject get address if address is not found", async () => {
    const user = await UserTest.getUser("test");
    const contact = await ContactTest.getContact("Ruzcen", "test");
    const address = await AddressTest.getAddress("Ruzcen", contact.id, "test");
    const app = await supertest(web)
      .get(`/api/contacts/${contact.id}/addresses/${address.id + 1}`)
      .set("X-API-TOKEN", user.token!);

    console.info(app.body.errors);

    expect(app.status).toBe(404);
    expect(app.body.errors).toBeDefined();
  });

  it("should reject get address if address is not found", async () => {
    const user = await UserTest.getUser("test");
    const contact = await ContactTest.getContact("Ruzcen", "test");
    const address = await AddressTest.getAddress("Ruzcen", contact.id, "test");
    const app = await supertest(web)
      .get(`/api/contacts/${contact.id + 1}/addresses/${address.id}`)
      .set("X-API-TOKEN", user.token!);

    console.info(app.body.errors);

    expect(app.status).toBe(404);
    expect(app.body.errors).toBeDefined();
  });
});
