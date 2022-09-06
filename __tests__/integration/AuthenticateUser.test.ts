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
});
