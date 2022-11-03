import { jest } from "@jest/globals";

import App from "../../src/app";

import request from "supertest";

describe("list all users", () => {
  beforeEach(async () => {
    jest.setTimeout(30000);
  });

  it("should return an exception if not authenticated", async () => {
    await request(new App().server)
      .post("/api/users/register")
      .set("Accept", "application/json")
      .send({
        email: "userlistingsall@mail.com.br",
        password: "789789789",
        name: "user name name",
        bornAt: "01/09/2001",
      });

    const response = await request(new App().server)
      .get("/api/users/users")
      .send({
        email: "userlistingsall@mail.com.br",
        password: "123123123",
        name: "user name name",
        bornAt: "02/09/2001",
      });

    expect(response.status).toEqual(500);
  });

  it("should return all users registered", async () => {
    await request(new App().server)
      .post("/api/users/register")
      .set("Accept", "application/json")
      .send({
        email: "userlisting12@mail.com.br",
        password: "789789789",
        name: "user name name",
        bornAt: "01/09/2001",
      });

    await request(new App().server)
      .post("/api/users/register")
      .set("Accept", "application/json")
      .send({
        email: "userlisting1234@mail.com.br",
        password: "789789789",
        name: "user name name",
        bornAt: "01/09/2001",
      });

    await request(new App().server)
      .post("/api/users/register")
      .set("Accept", "application/json")
      .send({
        email: "userlistedall@mail.com.br",
        password: "789789789",
        name: "user name name",
        bornAt: "01/09/2001",
      });

    const loginRequest = await request(new App().server)
      .post("/api/users/login")
      .set("Accept", "application/json")
      .send({
        email: "userlistedall@mail.com.br",
        password: "789789789",
      });

    const response = await request(new App().server)
      .get("/api/users/users")
      .set("Cookie", [loginRequest.headers["set-cookie"]]);

    expect(response.status).toEqual(200);

    expect(response.body.users).toBeDefined();
  });
});
