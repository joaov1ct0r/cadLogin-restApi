import { jest } from "@jest/globals";

import App from "../../src/app";

import request from "supertest";

describe("admin edit user", () => {
  beforeEach(async () => {
    jest.setTimeout(70000);
  });

  it("should return an exception if not authenticated", async () => {
    await request(new App().server)
      .post("/api/users/register")
      .set("Accept", "application/json")
      .send({
        email: "admin4723892793@mail.com.br",
        password: "789789789",
        name: "user name name",
        bornAt: "01/09/2001",
      });

    const response = await request(new App().server)
      .delete("/api/admin/user/delete")
      .set("Accept", "application/json")
      .send({
        userEmail: "user432840375lksjdlf@mail.com.br",
      });

    expect(response.status).toEqual(500);
  });

  it("should return an exception if not admin", async () => {
    await request(new App().server)
      .post("/api/users/register")
      .set("Accept", "application/json")
      .send({
        email: "user482034982042@mail.com.br",
        password: "789789789",
        name: "user name name",
        bornAt: "01/09/2001",
      });

    const login = await request(new App().server)
      .post("/api/users/login")
      .set("Accept", "application/json")
      .send({
        email: "user482034982042@mail.com.br",
        password: "789789789",
      });

    const response = await request(new App().server)
      .delete("/api/admin/post/delete")
      .set("Cookie", [login.headers["set-cookie"]])
      .send({
        postId: "290",
      });

    expect(response.status).toEqual(401);
  });
});
