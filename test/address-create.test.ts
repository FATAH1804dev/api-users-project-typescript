import { web } from "../src/application/web";
import { disconnect, UserTest, ContactTest, AddressTest } from "./util";
import supertest from "supertest";
import { logger } from "../src/application/logging";

describe("PUT /api/contacts/:contactId/addresses", () => {
  beforeEach(async () => {
    await UserTest.loggedInUser();
    await ContactTest.createContact();
  });

  afterEach(async () => {
    await AddressTest.deleteAll();
    await ContactTest.deleteAll();
    await UserTest.deleteUsers();
  });

  afterAll(async () => {
    await disconnect();
  });

  it("should be able to create address", async () => {
    const user = await UserTest.getUser("test");
    const contact = await ContactTest.getContact("Ruzcen", "test");
    const app = await supertest(web)
      .post(`/api/contacts/${contact.id}/addresses`)
      .set("X-API-TOKEN", user.token!)
      .send({
        street: "Piatnoe .st",
        city: "Tecdoh",
        province: "Kujsy",
        country: "test",
        postal_code: "335478",
      });

    console.info(app.body);
    const address = await AddressTest.getAddress("Ruzcen", contact.id, "test");

    expect(app.status).toBe(200);
    expect(app.body.data.id).toBe(address.id);
    expect(app.body.data.street).toBe("Piatnoe .st");
    expect(app.body.data.city).toBe("Tecdoh");
    expect(app.body.data.province).toBe("Kujsy");
    expect(app.body.data.postal_code).toBe("335478");
  });

  it("should reject create new address if request is invalid", async () => {
    const user = await UserTest.getUser("test");
    const contact = await ContactTest.getContact("Ruzcen", "test");
    const app = await supertest(web)
      .post(`/api/contacts/${contact.id}/addresses`)
      .set("X-API-TOKEN", user.token!)
      .send({
        street: "Piatnoe .st",
        city: "Tecdoh",
        postal_code: "",
      });

    console.info(app.body.errors);

    expect(app.status).toBe(400);
    expect(app.body.errors).toBeDefined();
  });

  it("should reject create new address if contact is not found", async () => {
    const user = await UserTest.getUser("test");
    const contact = await ContactTest.getContact("Ruzcen", "test");
    const app = await supertest(web)
      .post(`/api/contacts/${contact.id + 1}/addresses`)
      .set("X-API-TOKEN", user.token!)
      .send({
        street: "Piatnoe .st",
        city: "Tecdoh",
        province: "Kujsy",
        country: "test",
        postal_code: "472992",
      });

    console.info(app.body.errors);

    expect(app.status).toBe(404);
    expect(app.body.errors).toBeDefined();
  });
});
