import { jest } from "@jest/globals";
import App from "../../src/app";
import request from "supertest";
import prismaClient from "../../src/database/prismaClient";

describe("delete post comment", () => {
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
        email: "user944274932flsjfdl@mail.com.br",
        password: "789789789",
        name: "user name name",
        bornAt: "01/09/2001",
      });

    const response = await request(new App().server)
      .delete("/api/posts/comment/delete")
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
        email: "user42938729flsdjld@mail.com.br",
        password: "789789789",
        name: "user name name",
        bornAt: "01/09/2001",
      });

    const login = await request(new App().server)
      .post("/api/users/login")
      .set("Accept", "application/json")
      .send({
        email: "user42938729flsdjld@mail.com.br",
        password: "789789789",
      });

    const postCreated = await request(new App().server)
      .post("/api/posts/register")
      .set("Cookie", [login.headers["set-cookie"]])
      .send({
        content: "novo post",
      });

    await request(new App().server)
      .post("/api/posts/comment")
      .set("Cookie", [login.headers["set-cookie"]])
      .send({
        postId: String(postCreated.body.post.id),
        comment: "novo comment",
      });

    const response = await request(new App().server)
      .delete("/api/posts/comment/delete")
      .set("Cookie", [login.headers["set-cookie"]]);

    expect(response.status).toEqual(400);
  });

  it("should return an exception if post is null", async () => {
    await request(new App().server)
      .post("/api/users/register")
      .set("Accept", "application/json")
      .send({
        email: "user48203482lkasf@mail.com.br",
        password: "789789789",
        name: "user name name",
        bornAt: "01/09/2001",
      });

    const login = await request(new App().server)
      .post("/api/users/login")
      .set("Accept", "application/json")
      .send({
        email: "user48203482lkasf@mail.com.br",
        password: "789789789",
      });

    const response = await request(new App().server)
      .delete("/api/posts/comment/delete")
      .set("Cookie", [login.headers["set-cookie"]])
      .send({
        commentId: "290",
        postId: "290",
      });

    expect(response.body.status).toEqual(400);
  });

  it("should return an exception if comment is null", async () => {
    await request(new App().server)
      .post("/api/users/register")
      .set("Accept", "application/json")
      .send({
        email: "user4234729vjlsdkj@mail.com.br",
        password: "789789789",
        name: "user name name",
        bornAt: "01/09/2001",
      });

    const login = await request(new App().server)
      .post("/api/users/login")
      .set("Accept", "application/json")
      .send({
        email: "user4234729vjlsdkj@mail.com.br",
        password: "789789789",
      });

    const postCreated = await request(new App().server)
      .post("/api/posts/register")
      .set("Cookie", [login.headers["set-cookie"]])
      .send({
        content: "novo post",
      });

    const response = await request(new App().server)
      .delete("/api/posts/comment/delete")
      .set("Cookie", [login.headers["set-cookie"]])
      .send({
        postId: String(postCreated.body.post.id),
        commentId: "290",
      });

    expect(response.body.status).toEqual(400);
  });

  it("should delete a comment in post", async () => {
    await request(new App().server)
      .post("/api/users/register")
      .set("Accept", "application/json")
      .send({
        email: "userflskjfdlsj24803@mail.com.br",
        password: "789789789",
        name: "user name name",
        bornAt: "01/09/2001",
      });

    const login = await request(new App().server)
      .post("/api/users/login")
      .set("Accept", "application/json")
      .send({
        email: "userflskjfdlsj24803@mail.com.br",
        password: "789789789",
      });

    const postCreated = await request(new App().server)
      .post("/api/posts/register")
      .set("Cookie", [login.headers["set-cookie"]])
      .send({
        content: "novo post",
      });

    const commentCreated = await request(new App().server)
      .post("/api/posts/comment")
      .set("Cookie", [login.headers["set-cookie"]])
      .send({
        postId: String(postCreated.body.post.id),
        comment: "novo comment",
      });

    const response = await request(new App().server)
      .delete("/api/posts/comment/delete")
      .set("Cookie", [login.headers["set-cookie"]])
      .send({
        postId: String(postCreated.body.post.id),
        commentId: String(commentCreated.body.newComment.id),
      });

    expect(response.status).toEqual(204);
  });
});
