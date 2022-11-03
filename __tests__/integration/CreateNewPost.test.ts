import { jest } from "@jest/globals";

import App from "../../src/app";

import request from "supertest";

import Post from "../../src/database/models/postModel";

describe("create new post", () => {
  beforeEach(async () => {
    jest.setTimeout(30000);
  });

  afterEach(async () => {
    await Post.truncate({ cascade: true });
  });

  it("should return an exception if not authenticated", async () => {
    await request(new App().server)
      .post("/api/users/register")
      .set("Accept", "application/json")
      .send({
        email: "usernewpost@mail.com.br",
        password: "789789789",
        name: "user name name",
        bornAt: "01/09/2001",
      });

    const response = await request(new App().server)
      .post("/api/posts/register")
      .set("Accept", "application/json")
      .send({
        content: "titulo de post",
      });

    expect(response.status).toEqual(500);
  });

  it("should return an exception if wrong data is send", async () => {
    await request(new App().server)
      .post("/api/users/register")
      .set("Accept", "application/json")
      .send({
        email: "usernewpostcr@mail.com.br",
        password: "789789789",
        name: "user name name",
        bornAt: "01/09/2001",
      });

    const login = await request(new App().server)
      .post("/api/users/login")
      .set("Accept", "application/json")
      .send({
        email: "usernewpostcr@mail.com.br",
        password: "789789789",
      });

    const response = await request(new App().server)
      .post("/api/posts/register")
      .set("Cookie", [login.headers["set-cookie"]])
      .send({
        content: "",
      });

    expect(response.status).toEqual(400);
  });

  it("should create a new post", async () => {
    await request(new App().server)
      .post("/api/users/register")
      .set("Accept", "application/json")
      .send({
        email: "usercreatingpost@mail.com.br",
        password: "789789789",
        name: "user name name",
        bornAt: "01/09/2001",
      });

    const login = await request(new App().server)
      .post("/api/users/login")
      .set("Accept", "application/json")
      .send({
        email: "usercreatingpost@mail.com.br",
        password: "789789789",
      });

    const response = await request(new App().server)
      .post("/api/posts/register")
      .set("Cookie", [login.headers["set-cookie"]])
      .send({
        content: "novo post",
      });

    expect(response.status).toEqual(201);

    expect(response.body.post).toHaveProperty("id");
  });
});
