<script lang="ts">
  import Maybe, { nothing } from "true-myth/maybe";

  import type { LinkCard } from "./common";

  export type LinkCardProps = {
    card: LinkCard;
  };

  import CardContents from "./CardContents.svelte";
  import CardContainer from "./CardContainer.svelte";

  let { card }: LinkCardProps = $props();

  let href = card.url
    .match<Maybe<string>>({
      Err: () => nothing(),
      Ok: (maybeUrl) => maybeUrl,
    })
    .unwrapOr(undefined);
</script>

<CardContainer {card}>
  {#snippet children(containerButtons)}
    <a {href}>
      <CardContents {card}>
        {#snippet buttons()}
          {@render containerButtons()}
        {/snippet}
      </CardContents>
    </a>
  {/snippet}
</CardContainer>

<style>
  a {
    text-decoration: none;
  }
</style>
