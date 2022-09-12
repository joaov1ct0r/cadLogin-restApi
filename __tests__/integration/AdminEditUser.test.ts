import { jest } from "@jest/globals";

import truncate from "../utils/truncate";

import App from "../../src/app";

import request from "supertest";

describe("admin edit user", () => {
  beforeEach(async () => {
    await truncate();

    jest.setTimeout(70000);
  });

  it("should return an exception if not authenticated", async () => {
    await request(new App().server)
      .post("/api/users/register")
      .set("Accept", "application/json")
      .send({
        email: "user432840375lksjdlf@mail.com.br",
        password: "789789789",
        name: "user name name",
        bornAt: "01/09/2001",
      });

    const response = await request(new App().server)
      .put("/api/admin/user/edit")
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
        email: "userlkjsvxljvlkxdr4235@mail.com.br",
        password: "789789789",
        name: "user name name",
        bornAt: "01/09/2001",
      });

    const login = await request(new App().server)
      .post("/api/users/login")
      .set("Accept", "application/json")
      .send({
        email: "userlkjsvxljvlkxdr4235@mail.com.br",
        password: "789789789",
      });

    const response = await request(new App().server)
      .put("/api/admin/user/edit")
      .set("Cookie", [login.headers["set-cookie"]])
      .send({
        userEmail: "user58304vlxjl@mail.com.br",
        userNewEmail: "use94234758937394@mail.com.br",
        userNewPassword: "123123123",
        userNewName: "name name user",
        userNewBornAt: "05/09/2001",
      });

    expect(response.status).toEqual(401);
  });
});
