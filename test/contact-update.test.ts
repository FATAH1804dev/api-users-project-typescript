import { web } from "../src/application/web";
import { disconnect, UserTest, ContactTest } from "./util";
import supertest from "supertest";
import { logger } from "../src/application/logging";

describe("PUT /api/contacts/:contactId", () => {
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

  it("should be able to update contact", async () => {
    const user = await UserTest.getUser();
    const contact = await ContactTest.getContact();
    const app = await supertest(web)
      .put(`/api/contacts/${contact.id}`)
      .set("X-API-TOKEN", user.token!)
      .send({
        firstname: "test new firstname",
        lastname: "Obeydh",
        email: "obey589@gmail.com",
        phone: "6245635738809",
      });

    console.info(app.body);

    expect(app.status).toBe(200);
    expect(app.body.data.id).toBe(contact.id);
    expect(app.body.data.firstname).toBe("test new firstname");
    expect(app.body.data.lastname).toBe("Obeydh");
    expect(app.body.data.email).toBe("obey589@gmail.com");
    expect(app.body.data.phone).toBe("6245635738809");
  });

  it("should be able to update contact partial", async () => {
    const user = await UserTest.getUser();
    const contact = await ContactTest.getContact();
    const app = await supertest(web)
      .put(`/api/contacts/${contact.id}`)
      .set("X-API-TOKEN", user.token!)
      .send({
        lastname: "Obeydh",
        email: "obey589@gmail.com",
      });

    console.info(app.body);

    expect(app.status).toBe(200);
    expect(app.body.data.id).toBe(contact.id);
    expect(app.body.data.firstname).toBe(contact.firstname);
    expect(app.body.data.lastname).toBe("Obeydh");
    expect(app.body.data.email).toBe("obey589@gmail.com");
    expect(app.body.data.phone).toBe(contact.phone);
  });

  it("shouldreject update contact if request is invalid", async () => {
    const user = await UserTest.getUser();
    const contact = await ContactTest.getContact();
    const app = await supertest(web)
      .put(`/api/contacts/${contact.id}`)
      .set("X-API-TOKEN", user.token!)
      .send({
        firstname: "",
        lastname: "",
        email: "obey589gmail.com",
        phone: "624563573880942343242354543535432432424325523242343",
      });

    console.info(app.body.errors);

    expect(app.status).toBe(400);
    expect(app.body.errors).toBeDefined();
  });
});
