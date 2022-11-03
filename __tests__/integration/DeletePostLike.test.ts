import { jest } from "@jest/globals";

import App from "../../src/app";

import request from "supertest";

describe("delete post like", () => {
  beforeEach(async () => {
    jest.setTimeout(70000);
  });

  it("should return an exception if not authenticated", async () => {
    await request(new App().server)
      .post("/api/users/register")
      .set("Accept", "application/json")
      .send({
        email: "userdelpoli563@mail.com.br",
        password: "789789789",
        name: "user name name",
        bornAt: "01/09/2001",
      });

    const response = await request(new App().server)
      .delete("/api/posts/like/delete")
      .set("Accept", "application/json")
      .send({
        postId: "290",
      });

    expect(response.status).toEqual(500);
  });

  it("should return an exception if wrong data is send", async () => {
    await request(new App().server)
      .post("/api/users/register")
      .set("Accept", "application/json")
      .send({
        email: "userwrdatadelp432@mail.com.br",
        password: "789789789",
        name: "user name name",
        bornAt: "01/09/2001",
      });

    const login = await request(new App().server)
      .post("/api/users/login")
      .set("Accept", "application/json")
      .send({
        email: "userwrdatadelp432@mail.com.br",
        password: "789789789",
      });

    const postCreated = await request(new App().server)
      .post("/api/posts/register")
      .set("Cookie", [login.headers["set-cookie"]])
      .send({
        content: "novo post",
      });

    await request(new App().server)
      .post("/api/posts/like")
      .set("Cookie", [login.headers["set-cookie"]])
      .send({
        postId: String(postCreated.body.post.id),
      });

    const response = await request(new App().server)
      .delete("/api/posts/like/delete")
      .set("Cookie", [login.headers["set-cookie"]])
      .send({
        postId: "",
      });

    expect(response.status).toEqual(400);
  });

  it("should return an exception if post is not registered", async () => {
    await request(new App().server)
      .post("/api/users/register")
      .set("Accept", "application/json")
      .send({
        email: "userdlakjr5l238@mail.com.br",
        password: "789789789",
        name: "user name name",
        bornAt: "01/09/2001",
      });

    const login = await request(new App().server)
      .post("/api/users/login")
      .set("Accept", "application/json")
      .send({
        email: "userdlakjr5l238@mail.com.br",
        password: "789789789",
      });

    const response = await request(new App().server)
      .delete("/api/posts/like/delete")
      .set("Cookie", [login.headers["set-cookie"]])
      .send({
        postId: "204",
      });

    expect(response.status).toEqual(400);
  });

  it("should return an exception if post is not liked", async () => {
    await request(new App().server)
      .post("/api/users/register")
      .set("Accept", "application/json")
      .send({
        email: "userlsfjdl4j208fs@mail.com.br",
        password: "789789789",
        name: "user name name",
        bornAt: "01/09/2001",
      });

    const login = await request(new App().server)
      .post("/api/users/login")
      .set("Accept", "application/json")
      .send({
        email: "userlsfjdl4j208fs@mail.com.br",
        password: "789789789",
      });

    const postCreated = await request(new App().server)
      .post("/api/posts/register")
      .set("Cookie", [login.headers["set-cookie"]])
      .send({
        content: "novo post",
      });

    const response = await request(new App().server)
      .delete("/api/posts/like/delete")
      .set("Cookie", [login.headers["set-cookie"]])
      .send({
        postId: String(postCreated.body.post.id),
      });

    expect(response.status).toEqual(400);
  });

  it("should a liked post", async () => {
    await request(new App().server)
      .post("/api/users/register")
      .set("Accept", "application/json")
      .send({
        email: "user023842fsofd24@mail.com.br",
        password: "789789789",
        name: "user name name",
        bornAt: "01/09/2001",
      });

    const login = await request(new App().server)
      .post("/api/users/login")
      .set("Accept", "application/json")
      .send({
        email: "user023842fsofd24@mail.com.br",
        password: "789789789",
      });

    const postCreated = await request(new App().server)
      .post("/api/posts/register")
      .set("Cookie", [login.headers["set-cookie"]])
      .send({
        content: "novo post",
      });

    await request(new App().server)
      .post("/api/posts/like")
      .set("Cookie", [login.headers["set-cookie"]])
      .send({
        postId: String(postCreated.body.post.id),
      });

    const response = await request(new App().server)
      .delete("/api/posts/like/delete")
      .set("Cookie", [login.headers["set-cookie"]])
      .send({
        postId: String(postCreated.body.post.id),
      });

    expect(response.status).toEqual(204);
  });
});
