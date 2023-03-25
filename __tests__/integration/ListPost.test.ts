import { jest } from "@jest/globals";
import App from "../../src/app";
import request from "supertest";
import prismaClient from "../../src/database/prismaClient";

describe("list post", () => {
  beforeAll(async () => {
    await prismaClient.$connect();
  });

  beforeEach(async () => {
    jest.setTimeout(70000);
  });

  afterAll(async () => {
    await prismaClient.$disconnect();
  });

  it("should return an exception if not authenticated", async () => {
    await request(new App().server)
      .post("/api/users/register")
      .set("Accept", "application/json")
      .send({
        email: "user942342739482hfsk@mail.com.br",
        password: "789789789",
        name: "user name name",
        bornAt: "01/09/2001",
      });

    const response = await request(new App().server)
      .get("/api/posts/post/290")
      .set("Accept", "application/json");

    expect(response.status).toEqual(500);
  });

  it("should return an exception if wrong data is send", async () => {
    await request(new App().server)
      .post("/api/users/register")
      .set("Accept", "application/json")
      .send({
        email: "userjljsfljsl5403@mail.com.br",
        password: "789789789",
        name: "user name name",
        bornAt: "01/09/2001",
      });

    const login = await request(new App().server)
      .post("/api/users/login")
      .set("Accept", "application/json")
      .send({
        email: "userjljsfljsl5403@mail.com.br",
        password: "789789789",
      });

    await request(new App().server)
      .post("/api/posts/register")
      .set("Cookie", [login.headers["set-cookie"]])
      .send({
        content: "novo post",
      });

    const response = await request(new App().server)
      .get("/api/posts/post")
      .set("Cookie", [login.headers["set-cookie"]]);

    expect(response.status).toEqual(400);
  });

  it("should return an exception if post is null", async () => {
    await request(new App().server)
      .post("/api/users/register")
      .set("Accept", "application/json")
      .send({
        email: "usergjslkxcljlx482032@mail.com.br",
        password: "789789789",
        name: "user name name",
        bornAt: "01/09/2001",
      });

    const login = await request(new App().server)
      .post("/api/users/login")
      .set("Accept", "application/json")
      .send({
        email: "usergjslkxcljlx482032@mail.com.br",
        password: "789789789",
      });

    const response = await request(new App().server)
      .get("/api/posts/post/29534")
      .set("Cookie", [login.headers["set-cookie"]]);

    expect(response.body.status).toEqual(400);
  });

  it("should return an post", async () => {
    await request(new App().server)
      .post("/api/users/register")
      .set("Accept", "application/json")
      .send({
        email: "user8420384208432@mail.com.br",
        password: "789789789",
        name: "user name name",
        bornAt: "01/09/2001",
      });

    const login = await request(new App().server)
      .post("/api/users/login")
      .set("Accept", "application/json")
      .send({
        email: "user8420384208432@mail.com.br",
        password: "789789789",
      });

    const postCreated = await request(new App().server)
      .post("/api/posts/register")
      .set("Cookie", [login.headers["set-cookie"]])
      .send({
        content: "novo post",
      });

    const response = await request(new App().server)
      .get(`/api/posts/post/${String(postCreated.body.post.id)}`)
      .set("Cookie", [login.headers["set-cookie"]]);

    expect(response.body.status).toEqual(200);
  });
});
