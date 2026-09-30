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

  it("should be able search contact", async () => {
    const user = await UserTest.getUser("test");
    const app = await supertest(web)
      .get(`/api/contacts`)
      .set("X-API-TOKEN", user.token!);

    console.info(app.body);

    expect(app.status).toBe(200);
    expect(app.body.data.length).toBe(1);
    expect(app.body.data[0].email).toBe("yory432@gmail.com");
    expect(app.body.paging.current_page).toBe(1);
    expect(app.body.paging.total_page).toBe(1);
    expect(app.body.paging.size).toBe(10);
  });

  it("should be able search contact using name", async () => {
    const user = await UserTest.getUser("test");
    const app = await supertest(web)
      .get(`/api/contacts`)
      .set("X-API-TOKEN", user.token!)
      .query({ name: "ry" });

    console.info(app.body);

    expect(app.status).toBe(200);
    expect(app.body.data.length).toBe(1);
    expect(app.body.data[0].email).toBe("yory432@gmail.com");
    expect(app.body.paging.current_page).toBe(1);
    expect(app.body.paging.total_page).toBe(1);
    expect(app.body.paging.size).toBe(10);
  });

  it("should be able search contact using email", async () => {
    const user = await UserTest.getUser("test");
    const app = await supertest(web)
      .get(`/api/contacts`)
      .set("X-API-TOKEN", user.token!)
      .query({ email: ".com" });

    console.info(app.body);

    expect(app.status).toBe(200);
    expect(app.body.data.length).toBe(1);
    expect(app.body.data[0].email).toBe("yory432@gmail.com");
    expect(app.body.paging.current_page).toBe(1);
    expect(app.body.paging.total_page).toBe(1);
    expect(app.body.paging.size).toBe(10);
  });

  it("should be able search contact using phone", async () => {
    const user = await UserTest.getUser("test");
    const app = await supertest(web)
      .get(`/api/contacts`)
      .set("X-API-TOKEN", user.token!)
      .query({ phone: "8839" });

    console.info(app.body);

    expect(app.status).toBe(200);
    expect(app.body.data.length).toBe(1);
    expect(app.body.data[0].email).toBe("yory432@gmail.com");
    expect(app.body.paging.current_page).toBe(1);
    expect(app.body.paging.total_page).toBe(1);
    expect(app.body.paging.size).toBe(10);
  });

  it("should be able search contact but no result", async () => {
    const user = await UserTest.getUser("test");
    const app = await supertest(web)
      .get(`/api/contacts`)
      .set("X-API-TOKEN", user.token!)
      .query({ name: "salah" });

    console.info(app.body);

    expect(app.status).toBe(200);
    expect(app.body.data.length).toBe(0);
    expect(app.body.paging.current_page).toBe(1);
    expect(app.body.paging.total_page).toBe(0);
    expect(app.body.paging.size).toBe(10);
  });

  it("should be able search contact with paging", async () => {
    const user = await UserTest.getUser("test");
    const app = await supertest(web)
      .get(`/api/contacts`)
      .set("X-API-TOKEN", user.token!)
      .query({ page: 2, size: 1 });

    console.info(app.body);

    expect(app.status).toBe(200);
    expect(app.body.data.length).toBe(0);
    expect(app.body.paging.current_page).toBe(2);
    expect(app.body.paging.total_page).toBe(1);
    expect(app.body.paging.size).toBe(1);
  });
});
