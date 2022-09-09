import { jest } from "@jest/globals";

import truncate from "../utils/truncate";

import App from "../../src/app";

import request from "supertest";

describe("edit post", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should return an exception if not authenticated", async () => {
    jest.setTimeout(70000);

    await request(new App().server)
      .post("/api/users/register")
      .set("Accept", "application/json")
      .send({
        email: "usernotauthenticated123@mail.com.br",
        password: "789789789",
        name: "user name name",
        bornAt: "01/09/2001",
      });

    const response = await request(new App().server)
      .put("/api/posts/edit")
      .set("Accept", "application/json")
      .send({
        postId: "1",
        content: "titulo editado de post",
      });

    expect(response.status).toEqual(500);
  });

  it("should return an exception if wrong data is send", async () => {
    await request(new App().server)
      .post("/api/users/register")
      .set("Accept", "application/json")
      .send({
        email: "userauthenticated123@mail.com",
        password: "789789789",
        name: "user name name",
        bornAt: "01/09/2001",
      });

    const login = await request(new App().server)
      .post("/api/users/login")
      .set("Accept", "application/json")
      .send({
        email: "userauthenticated123@mail.com",
        password: "789789789",
      });

    const response = await request(new App().server)
      .put("/api/posts/edit")
      .set("Cookie", [login.headers["set-cookie"]])
      .send({
        content: "",
      });

    expect(response.status).toEqual(400);
  });
});
