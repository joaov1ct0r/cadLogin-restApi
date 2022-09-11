import { jest } from "@jest/globals";

import truncate from "../utils/truncate";

import App from "../../src/app";

import request from "supertest";

describe("add post comment", () => {
  beforeEach(async () => {
    await truncate();

    jest.setTimeout(70000);
  });

  it("should return an exception if not authenticated", async () => {
    await request(new App().server)
      .post("/api/users/register")
      .set("Accept", "application/json")
      .send({
        email: "userjvfs0r42042j@mail.com.br",
        password: "789789789",
        name: "user name name",
        bornAt: "01/09/2001",
      });

    const response = await request(new App().server)
      .post("/api/posts/comment")
      .set("Accept", "application/json")
      .send({
        postId: "",
      });

    expect(response.status).toEqual(500);
  });

  it("should return an exception if wrong data is send", async () => {
    await request(new App().server)
      .post("/api/users/register")
      .set("Accept", "application/json")
      .send({
        email: "user84230gk2342@mail.com.br",
        password: "789789789",
        name: "user name name",
        bornAt: "01/09/2001",
      });

    const login = await request(new App().server)
      .post("/api/users/login")
      .set("Accept", "application/json")
      .send({
        email: "user84230gk2342@mail.com.br",
        password: "789789789",
      });

    const postCreated = await request(new App().server)
      .post("/api/posts/register")
      .set("Cookie", [login.headers["set-cookie"]])
      .send({
        content: "novo post",
      });

    const response = await request(new App().server)
      .post("/api/posts/comment")
      .set("Cookie", [login.headers["set-cookie"]])
      .send({
        postId: String(postCreated.body.post.id),
      });

    expect(response.status).toEqual(400);
  });
});
