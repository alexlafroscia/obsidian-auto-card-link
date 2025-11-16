import type { App } from "obsidian";
import Result, { ok } from "true-myth/result";

import type { LinkCardProps } from "../components/link-card";
import type { Card } from "../schema/card";

import { enhanceCard } from "./card";
import { resolveImageProperties } from "./image-link";

export function resolveComponentPropsFromCard(
  contents: Card,
  app: App,
): Result<LinkCardProps, string> {
  return ok({
    ...enhanceCard(contents),
    ...resolveImageProperties(contents, app),
  });
}
