import { jest } from "@jest/globals";

import truncate from "../utils/truncate";

import App from "../../src/app";

import request from "supertest";

describe("delete user", () => {
  beforeEach(async () => {
    await truncate();

    jest.setTimeout(30000);
  });

  it("should return an exception if not authenticated", async () => {
    await request(new App().server)
      .post("/api/users/register")
      .set("Accept", "application/json")
      .send({
        email: "userdeleted@mail.com.br",
        password: "789789789",
        name: "user name name",
        bornAt: "01/09/2001",
      });

    const response = await request(new App().server).delete(
      "/api/users/delete"
    );

    expect(response.status).toEqual(500);
  });

  it("should delete a user", async () => {
    await request(new App().server)
      .post("/api/users/register")
      .set("Accept", "application/json")
      .send({
        email: "userdeleting@mail.com.br",
        password: "123123123",
        name: "user name name",
        bornAt: "01/09/2001",
      });

    const loginRequest = await request(new App().server)
      .post("/api/users/login")
      .set("Accept", "application/json")
      .send({
        email: "userdeleting@mail.com.br",
        password: "123123123",
      });

    const response = await request(new App().server)
      .delete("/api/users/delete")
      .set("Cookie", [loginRequest.headers["set-cookie"]]);

    expect(response.status).toEqual(204);
  });
});
