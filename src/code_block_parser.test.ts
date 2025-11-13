import * as assert from "node:assert";
import { test } from "node:test";

import { parseLinkMetadataFromJSON } from "./code_block_parser";

test("ensuring a link has a url and title", () => {
  assert.partialDeepStrictEqual(parseLinkMetadataFromJSON({}), {
    success: false,
  });

  assert.partialDeepStrictEqual(
    parseLinkMetadataFromJSON({
      url: "https://foobar.com",
    }),
    {
      success: false,
    },
  );

  assert.partialDeepStrictEqual(
    parseLinkMetadataFromJSON({
      title: "foo bar",
    }),
    {
      success: false,
    },
  );

  assert.partialDeepStrictEqual(
    parseLinkMetadataFromJSON({
      url: "https://foobar.com",
      title: "foo bar",
    }),
    {
      success: true,
      data: {
        url: "https://foobar.com",
        title: "foo bar",
      },
    },
  );
});
