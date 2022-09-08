import { jest } from "@jest/globals";

import truncate from "../utils/truncate";

import App from "../../src/app";

import request from "supertest";

describe("create new post", () => {
  beforeEach(async () => {
    await truncate();

    jest.setTimeout(30000);
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
});
