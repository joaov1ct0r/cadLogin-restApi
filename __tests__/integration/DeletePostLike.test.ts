import { jest } from "@jest/globals";

import truncate from "../utils/truncate";

import App from "../../src/app";

import request from "supertest";

describe("delete post like", () => {
  beforeEach(async () => {
    await truncate();

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
});
