import * as assert from "node:assert";
import { describe, test } from "node:test";
import { ok } from "true-myth/result";
import { just, nothing } from "true-myth/maybe";

import type { Card } from "../schema/card";
import { enhanceCard } from "./card";

function justOk<T extends {}>(value: T) {
  return ok(just(value));
}

const DUMMY_CARD: Card = {
  title: ok(nothing()),
  description: ok(nothing()),
  image: ok(nothing()),
  favicon: ok(nothing()),
  url: justOk("https://example.com/first/second"),
  host: justOk("example.com"),
};

describe("enhanceCard", function () {
  describe("ensuring a host is provided", () => {
    test("when a host already exists", () => {
      const input = {
        ...DUMMY_CARD,
        host: justOk("different.com"),
      };
      const result = enhanceCard(input);

      assert.deepEqual(result, input);
    });

    test("when a host needs to be defined", () => {
      const result = enhanceCard({
        ...DUMMY_CARD,
        host: ok(nothing()),
      });

      assert.deepEqual(result, {
        ...DUMMY_CARD,
        host: ok(just("example.com")),
      });
    });
  });
});
