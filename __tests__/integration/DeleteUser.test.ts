import { jest } from "@jest/globals";

import truncate from "../utils/truncate";

import App from "../../src/app";

import request from "supertest";

describe("delete user", () => {
  beforeEach(async () => {
    await truncate();

    jest.setTimeout(30000);
  });
});
