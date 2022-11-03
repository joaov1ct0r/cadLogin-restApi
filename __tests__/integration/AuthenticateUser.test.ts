import App from "../../src/app";

import request from "supertest";

import User from "../../src/database/models/userModel";

describe("authenticate user", () => {
  afterEach(async () => {
    await User.truncate({ cascade: true });
  });
  it("should return an exception if user is not registered", async () => {
    const response = await request(new App().server)
      .post("/api/users/login")
      .set("Accept", "application/json")
      .send({
        email: "usernotregistered@mail.com.br",
        password: "123123123",
      });

    expect(response.status).toEqual(400);
  });

  it("should return an exception if passwords arent matching", async () => {
    await request(new App().server)
      .post("/api/users/register")
      .set("Accept", "application/json")
      .send({
        email: "usernotauthenticated@mail.com.br",
        password: "789789789",
        name: "user name name",
        bornAt: "01/09/2001",
      });

    const response = await request(new App().server)
      .post("/api/users/login")
      .set("Accept", "application/json")
      .send({
        email: "usernotauthenticated@mail.com.br",
        password: "123123123",
      });

    expect(response.status).toEqual(401);
  });

  it("should return an exception if wrong data is send", async () => {
    await request(new App().server)
      .post("/api/users/register")
      .set("Accept", "application/json")
      .send({
        email: "userwrongdata@mail.com.br",
        password: "789789789",
        name: "user name name",
        bornAt: "01/09/2001",
      });

    const response = await request(new App().server)
      .post("/api/users/login")
      .set("Accept", "application/json")
      .send({
        email: "userwrongdata@mail.com.br",
      });

    expect(response.status).toEqual(400);
  });

  it("should return a token when authenticated", async () => {
    await request(new App().server)
      .post("/api/users/register")
      .set("Accept", "application/json")
      .send({
        email: "userauthenticated@mail.com.br",
        password: "789789789",
        name: "user name name",
        bornAt: "01/09/2001",
      });

    const response = await request(new App().server)
      .post("/api/users/login")
      .set("Accept", "application/json")
      .send({
        email: "userauthenticated@mail.com.br",
        password: "789789789",
      });

    expect(response.headers["set-cookie"]).toBeDefined();

    expect(response.status).toEqual(200);
  });
});
