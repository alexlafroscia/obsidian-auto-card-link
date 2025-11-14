import * as z from "zod/mini";
import { type StandardSchemaV1, parserFor } from "true-myth/standard-schema";

export function makeSchemaParser<S extends StandardSchemaV1>(schema: S) {
  const parser = parserFor(schema);

  return function (value: unknown) {
    return parser(value).mapErr((err) => z.prettifyError(err));
  };
}
