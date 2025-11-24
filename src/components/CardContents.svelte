<script lang="ts" module>
  import type { Snippet } from "svelte";
  import { Notice } from "obsidian";
  import { fromResult } from "true-myth/toolbelt";

  import type { CardProp, LinkCard } from "./common";
  import Button from "./obsidian/Button.svelte";

  type CardPropValues = Record<keyof LinkCard, string | undefined>;

  function extractPropValue(prop: CardProp): string | undefined {
    return fromResult(prop).flatten().unwrapOr(undefined);
  }

  function extractPropValues(card: LinkCard): CardPropValues {
    return {
      title: extractPropValue(card.title),
      description: extractPropValue(card.description),
      favicon: extractPropValue(card.favicon),
      image: extractPropValue(card.image),
      url: extractPropValue(card.url),
    };
  }
</script>

<script lang="ts">
  interface Props {
    card: LinkCard;
    buttons?: Snippet<[CardPropValues]>;
  }

  let { buttons, card }: Props = $props();

  let propValues = $derived(extractPropValues(card));
  let { title, description, favicon, image, url } = $derived(propValues);

  let host = $derived(url ? new URL(url).hostname : undefined);
</script>

<div class="link-card-contents">
  {#if image}
    <img
      class="link-card-thumbnail"
      src={image}
      alt="Thumbnail"
      draggable={false}
    />
  {/if}

  {#if title}
    <div class="link-card-title">
      {title}
    </div>
  {/if}

  {#if description}
    <div class="link-card-description">
      {description}
    </div>
  {/if}

  <div class="link-card-host">
    {#if favicon}
      <img src={favicon} alt="Favicon" />
    {/if}

    <span>{host}</span>
  </div>

  <div class="link-card-button-container">
    {@render buttons?.(propValues)}

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
  </div>
</div>

<style>
  .link-card-contents {
    display: grid;
    grid-template-columns: auto 1fr auto;
    grid-template-rows: auto 1fr auto;
    grid-template-areas:
      "image title title"
      "image description description"
      "image host buttons";
    gap: var(--size-2-2);
    height: 8em;
    max-height: 8em;
    transition: 20ms ease-in 0s;
    color: var(--link-external-color);
    background: var(--background-primary-alt);
    border: solid var(--border-width) var(--divider-color);
    border-radius: var(--radius-s);
    padding: var(--size-2-2);

    &:hover {
      background: var(--background-modifier-hover);
      border-color: var(--background-modifier-hover);
    }
  }

  .link-card-thumbnail {
    grid-area: image;
    max-height: calc(100% - (2 * var(--size-2-2)));
    border-radius: var(--radius-s) 0 0 var(--radius-s) !important;
    object-fit: cover;
    pointer-events: none;
    margin: calc(var(--size-2-2) * -1);
  }

  .link-card-title {
    grid-area: title;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    &:hover {
      color: var(--link-external-color-hover);
    }
  }

  .link-card-description {
    grid-area: description;
    color: var(--text-muted);
    font-size: var(--font-smallest);
  }

  .link-card-host {
    align-items: center;
    display: flex;
    flex-direction: row;
    font-size: var(--font-smallest);
    grid-area: host;

    &:hover {
      color: var(--link-external-color-hover);
    }

    /* Favicon */
    img {
      width: 16px !important;
      height: auto !important;
      margin: 0 0.5em 0 0 !important;
    }

    /* URL Host */
    span {
      flex-grow: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .link-card-button-container {
    grid-area: buttons;
    display: flex;
    opacity: 0;

    .link-card-contents:hover & {
      opacity: 1;
    }

    :global(.clickable-icon) {
      --cursor: pointer;
    }
  }
</style>
