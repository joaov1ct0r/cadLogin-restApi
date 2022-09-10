import { jest } from "@jest/globals";

import truncate from "../utils/truncate";

import App from "../../src/app";

import request from "supertest";

describe("delete post", () => {
  beforeEach(async () => {
    await truncate();

    jest.setTimeout(70000);
  });
});
