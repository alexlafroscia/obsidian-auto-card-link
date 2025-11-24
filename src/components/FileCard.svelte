<script lang="ts" module>
  import type { FileCard } from "./common";

  export interface Props {
    card: FileCard;
  }
</script>

<script lang="ts">
  import { Notice } from "obsidian";

  import Button from "./obsidian/Button.svelte";
  import { setIcon } from "./obsidian/set-icon";
  import { setTooltip } from "./obsidian/set-tooltip";
  import CardContainer from "./CardContainer.svelte";
  import CardContents from "./CardContents.svelte";

  let { card }: Props = $props();
  let url = $derived(
    card.url.mapOr(undefined, (maybeUrl) => maybeUrl.unwrapOr(undefined))
  );
</script>

<CardContainer {card}>
  {#snippet contents()}
    <div onclick={card.onClick}>
      <CardContents {card} />
    </div>
  {/snippet}

  {#snippet buttons()}
    {#if url}
      <a
        class="clickable-icon"
        href={url}
        aria-label={`Open URL: ${url}`}
        onclick={(event) => {
          // Avoid the click handler on the parent element
          event.stopPropagation();
        }}
        use:setIcon={"link"}
        use:setTooltip={`Open URL\n${url}`}
      ></a>

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
