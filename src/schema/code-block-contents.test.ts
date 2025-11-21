import * as assert from "node:assert";
import { describe, test } from "node:test";
import { ok } from "true-myth/result";

import { parseCodeblockContents } from "./code-block-contents";

describe("parseCodeblockContents", () => {
  test("generating an error when the input is totally unexpected", () => {
    const result = parseCodeblockContents(10);

    assert.ok(result.isErr);
  });

  test("extracting a file link reference", () => {
    const result = parseCodeblockContents({
      file: "[[SomeFile]]",
    });

    assert.deepEqual(
      result,
      ok({
        file: {
          type: "internal",
          value: "SomeFile",
        },
      }),
    );
  });

  test('extracting a "self" reference', () => {
    const result = parseCodeblockContents({
      file: "self",
    });

    assert.deepEqual(
      result,
      ok({
        file: "self",
      }),
    );
  });

  test("extracting an inline link definition", () => {
    const result = parseCodeblockContents({
      title: "my cool file",
      url: "https://cool.town",
    });

    assert.deepEqual(
      result,
      ok({
        title: "my cool file",
        url: "https://cool.town",
      }),
    );
  });
});
