import { jest } from "@jest/globals";
import App from "../../src/app";
import prismaClient from "../../src/database/prismaClient";
import request from "supertest";

describe("add post comment", () => {
  beforeAll(async () => {
    await prismaClient.$connect();
  });

  beforeEach(async () => {
    jest.setTimeout(70000);
  });

  afterAll(async () => {
    await prismaClient.comment.deleteMany();

    await prismaClient.$disconnect();
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

  it("should return an exception if post is null", async () => {
    await request(new App().server)
      .post("/api/users/register")
      .set("Accept", "application/json")
      .send({
        email: "user92483279847239@mail.com.br",
        password: "789789789",
        name: "user name name",
        bornAt: "01/09/2001",
      });

    const login = await request(new App().server)
      .post("/api/users/login")
      .set("Accept", "application/json")
      .send({
        email: "user92483279847239@mail.com.br",
        password: "789789789",
      });

    const response = await request(new App().server)
      .post("/api/posts/comment")
      .set("Cookie", [login.headers["set-cookie"]])
      .send({
        postId: "290",
        comment: "comentarios",
      });

    expect(response.body.status).toEqual(400);
  });

  it("should create a comment in post", async () => {
    await request(new App().server)
      .post("/api/users/register")
      .set("Accept", "application/json")
      .send({
        email: "user4238029843@mail.com.br",
        password: "789789789",
        name: "user name name",
        bornAt: "01/09/2001",
      });

    const login = await request(new App().server)
      .post("/api/users/login")
      .set("Accept", "application/json")
      .send({
        email: "user4238029843@mail.com.br",
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
        comment: "novo comment",
      });

    expect(response.body.status).toEqual(201);
  });
});
