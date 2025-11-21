<script lang="ts" module>
  import type { CommonCardProps } from "./common";

  export interface FileCardProps extends CommonCardProps {
    onClick: (event: MouseEvent) => void;
  }
</script>

<script lang="ts">
  import { setIcon } from "./obsidian/set-icon";
  import { setTooltip } from "./obsidian/set-tooltip";
  import CardContainer from "./CardContainer.svelte";
  import CardContents from "./CardContents.svelte";

  let { onClick, ...rest }: FileCardProps = $props();
</script>

<CardContainer {...rest}>
  {#snippet children(containerButtons)}
    <div class="auto-card-link-card" onclick={onClick}>
      <CardContents {...rest}>
        {#snippet buttons({ url })}
          {@render containerButtons()}

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
          {/if}
        {/snippet}
      </CardContents>
    </div>
  {/snippet}
</CardContainer>
