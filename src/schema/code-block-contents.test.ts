import * as assert from "node:assert";
import { test } from "node:test";

import { parseCodeblockContents } from "./code-block-contents";

test("ensuring a link has a url and title", () => {
  assert.ok(parseCodeblockContents({}).isErr);

  assert.ok(
    parseCodeblockContents({
      url: "https://foobar.com",
    }).isErr,
  );

  assert.ok(
    parseCodeblockContents({
      title: "foo bar",
    }).isErr,
  );

  assert.ok(
    parseCodeblockContents({
      url: "https://foobar.com",
      title: "foo bar",
    }).isOk,
  );
});
