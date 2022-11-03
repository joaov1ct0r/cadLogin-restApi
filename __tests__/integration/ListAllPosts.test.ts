import { jest } from "@jest/globals";

import App from "../../src/app";

import request from "supertest";

import Post from "../../src/database/models/postModel";

describe("list all posts", () => {
  beforeEach(async () => {
    jest.setTimeout(70000);
  });

  afterEach(async () => {
    await Post.truncate({ cascade: true });
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
      .get("/api/posts/post")
      .set("Accept", "application/json")
      .send({
        postId: "290",
      });

    expect(response.status).toEqual(500);
  });

  it("should return an post", async () => {
    await request(new App().server)
      .post("/api/users/register")
      .set("Accept", "application/json")
      .send({
        email: "userjsflsjl234235@mail.com.br",
        password: "789789789",
        name: "user name name",
        bornAt: "01/09/2001",
      });

    const login = await request(new App().server)
      .post("/api/users/login")
      .set("Accept", "application/json")
      .send({
        email: "userjsflsjl234235@mail.com.br",
        password: "789789789",
      });

    const response = await request(new App().server)
      .get("/api/posts/posts")
      .set("Cookie", [login.headers["set-cookie"]]);

    expect(response.status).toEqual(200);
  });
});
