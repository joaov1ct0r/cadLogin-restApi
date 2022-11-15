import App from "../../src/app";
import request from "supertest";
import prismaClient from "../../src/database/prismaClient";

describe("create user", () => {
  beforeAll(async () => {
    await prismaClient.$connect();
  });

  afterAll(async () => {
    await prismaClient.$disconnect();
  });

  it("should return an exception if wrong data is send", async () => {
    const response = await request(new App().server)
      .post("/api/users/register")
      .set("Accept", "application/json")
      .send({
        email: "any@mail.com.br",
        password: "123",
        name: "user name",
        bornAt: "01/09/2001",
      });

    expect(response.status).toEqual(400);
  });

  it("should return an exception if user already exists", async () => {
    await request(new App().server)
      .post("/api/users/register")
      .set("Accept", "application/json")
      .send({
        email: "anyuseremail@mail.com.br",
        password: "123123123",
        name: "user name name",
        bornAt: "01/09/2001",
      });

    const response = await request(new App().server)
      .post("/api/users/register")
      .set("Accept", "application/json")
      .send({
        email: "anyuseremail@mail.com.br",
        password: "123123123",
        name: "user name name",
        bornAt: "01/09/2001",
      });

    expect(response.body.status).toEqual(400);
  });

  it("should create a new user", async () => {
    const response = await request(new App().server)
      .post("/api/users/register")
      .set("Accept", "application/json")
      .send({
        email: "anycreateusernew@mail.com.br",
        password: "123123123",
        name: "user name name",
        bornAt: "01/09/2001",
      });

    expect(response.body.status).toEqual(201);

    expect(response.body.user).toHaveProperty("id");
  });
});
