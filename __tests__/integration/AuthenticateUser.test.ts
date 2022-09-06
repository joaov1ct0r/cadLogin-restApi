import truncate from "../utils/truncate";

import App from "../../src/app";

import request from "supertest";

describe("authenticate user", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should return an exception if user is not registered", async () => {
    const response = await request(new App().server)
      .post("/api/users/login")
      .set("Accept", "application/json")
      .send({
        email: "usernewemail@mail.com.br",
        password: "123123123",
      });

    expect(response.status).toEqual(400);
  });

  it("should return an exception if passwords arent matching", async () => {
    await request(new App().server)
      .post("/api/users/register")
      .set("Accept", "application/json")
      .send({
        email: "usernewemail@mail.com.br",
        password: "789789789",
        name: "user name name",
        bornAt: "01/09/2001",
      });

    const response = await request(new App().server)
      .post("/api/users/login")
      .set("Accept", "application/json")
      .send({
        email: "usernewemail@mail.com.br",
        password: "123123123",
      });

    expect(response.status).toEqual(401);
  });
});
