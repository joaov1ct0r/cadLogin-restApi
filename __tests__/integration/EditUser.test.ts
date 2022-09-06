import { jest } from "@jest/globals";

import truncate from "../utils/truncate";

import App from "../../src/app";

import request from "supertest";

describe("edit user", () => {
  beforeEach(async () => {
    await truncate();

    jest.setTimeout(30000);
  });

  it("should return an exception if wrong data is send", async () => {
    await request(new App().server)
      .post("/api/users/register")
      .set("Accept", "application/json")
      .send({
        email: "usereditingwrong@mail.com.br",
        password: "789789789",
        name: "user name name",
        bornAt: "01/09/2001",
      });

    const login = await request(new App().server)
      .post("/api/users/login")
      .set("Accept", "application/json")
      .send({
        email: "usereditingwrong@mail.com.br",
        password: "789789789",
      });

    const response = await request(new App().server)
      .put("/api/users/edit")
      .set("Cookie", [login.headers["set-cookie"]])
      .send({
        email: "usereditedwrong@mail.com.br",
        password: "123",
        name: "user",
        bornAt: "02",
      });

    expect(response.status).toEqual(400);
  });

  it("should edit user", async () => {
    await request(new App().server)
      .post("/api/users/register")
      .set("Accept", "application/json")
      .send({
        email: "userediting@mail.com.br",
        password: "789789789",
        name: "user name name",
        bornAt: "01/09/2001",
      });

    const login = await request(new App().server)
      .post("/api/users/login")
      .set("Accept", "application/json")
      .send({
        email: "userediting@mail.com.br",
        password: "789789789",
      });

    const response = await request(new App().server)
      .put("/api/users/edit")
      .set("Cookie", [login.headers["set-cookie"]])
      .send({
        email: "userneweditedemail@mail.com.br",
        password: "123123123",
        name: "user new edited name",
        bornAt: "02/09/2001",
      });

    expect(response.status).toEqual(204);
  });
});
