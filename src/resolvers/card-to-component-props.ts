import type { App } from "obsidian";

import type { CommonCardProps } from "../components/common";
import type { Card } from "../schema/card";

import { enhanceCard } from "./card";
import { extractImageProperties } from "./image-link";

export function resolveComponentPropsFromCard(
  contents: Card,
  app: App,
): CommonCardProps {
  return {
    ...contents,
    ...enhanceCard(contents),
    ...extractImageProperties(contents, app),
  };
}
