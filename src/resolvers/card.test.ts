import * as assert from "node:assert";
import { describe, test } from "node:test";

import { enhanceCard } from "./card";

const DUMMY_CARD = {
  title: "Dummy Card",
  url: "https://example.com/first/second",
  host: "example.com",
};

describe("enhanceCard", function () {
  describe("providing a host to the favicon", () => {
    test("when the favicon does not exist", () => {
      const result = enhanceCard({
        ...DUMMY_CARD,
      });

      assert.deepEqual(result, {
        ...DUMMY_CARD,
      });
    });

    test("when an external favicon lacks a host", () => {
      const result = enhanceCard({
        ...DUMMY_CARD,
        favicon: {
          type: "external",
          value: "/favicon.ico",
        },
      });

      assert.deepEqual(result, {
        ...DUMMY_CARD,
        favicon: {
          type: "external",
          value: "https://example.com/favicon.ico",
        },
      });
    });

    test("when an external favicon has a host", () => {
      const result = enhanceCard({
        ...DUMMY_CARD,
        favicon: {
          type: "internal",
          value: "https://different.com/favicon.ico",
        },
      });

      assert.deepEqual(result, {
        ...DUMMY_CARD,
        favicon: {
          type: "internal",
          value: "https://different.com/favicon.ico",
        },
      });
    });

    test("when an internal favicon lacks a host", () => {
      const result = enhanceCard({
        ...DUMMY_CARD,
        favicon: {
          type: "internal",
          value: "/favicon.ico",
        },
      });

      assert.deepEqual(result, {
        ...DUMMY_CARD,
        favicon: {
          type: "internal",
          value: "/favicon.ico",
        },
      });
    });
  });

  describe("ensuring a host is provided", () => {
    test("when a host already exists", () => {
      const result = enhanceCard({
        ...DUMMY_CARD,
        host: "different.com",
      });

      assert.deepEqual(result, {
        ...DUMMY_CARD,
        host: "different.com",
      });
    });

    test("when a host needs to be defined", () => {
      const result = enhanceCard({
        ...DUMMY_CARD,
        host: undefined,
      });

      assert.deepEqual(result, {
        ...DUMMY_CARD,
        host: "example.com",
      });
    });
  });
});
