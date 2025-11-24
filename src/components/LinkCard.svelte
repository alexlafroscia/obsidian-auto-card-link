<script lang="ts" module>
  import type { LinkCard } from "./common";

  export type LinkCardProps = {
    card: LinkCard;
  };
</script>

<script lang="ts">
  import { Notice } from "obsidian";

  import Button from "./obsidian/Button.svelte";
  import { setIcon } from "./obsidian/set-icon";
  import { setTooltip } from "./obsidian/set-tooltip";
  import CardContents from "./CardContents.svelte";
  import CardContainer from "./CardContainer.svelte";

  let { card }: LinkCardProps = $props();
  let url = $derived(
    card.url.mapOr(undefined, (maybeUrl) => maybeUrl.unwrapOr(undefined))
  );
</script>

<CardContainer {card}>
  {#snippet contents()}
    <a href={url}>
      <CardContents {card} />
    </a>
  {/snippet}

  {#snippet buttons()}
    {#if url}
      <Button
        icon="copy"
        tooltip={`Copy URL\n${url}`}
        onClick={(event) => {
          // Stop the click event from triggering on the card itself
          event.preventDefault();
          event.stopPropagation();

          navigator.clipboard.writeText(url);
          new Notice("URL copied to your clipboard");
        }}
      />
    {/if}
  {/snippet}
</CardContainer>

<style>
  a {
    text-decoration: none;
  }
</style>
