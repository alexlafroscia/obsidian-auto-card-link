<script lang="ts">
  import type { Snippet } from "svelte";
  import { slide } from "svelte/transition";

  import type { CommonCardProps } from "./common";

  import Button from "./obsidian/Button.svelte";
  import CardErrors from "./CardErrors.svelte";

  type Buttons = Snippet;
  type Contents = Snippet<[Buttons]>;

  interface Props extends CommonCardProps {
    children: Contents;
  }

  let { children, ...rest }: Props = $props();

  let hasErrors = Object.values(rest).some((propValue) => propValue.isErr);
  let showErrors = $state(false);
</script>

{#snippet buttons()}
  {#if hasErrors}
    <Button
      --icon-color="var(--text-error)"
      icon="triangle-alert"
      tooltip="Show Errors"
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();

        showErrors = !showErrors;
      }}
    />
  {/if}
{/snippet}

<div class="auto-card-link-container" data-auto-card-link-depth="0">
  {@render children(buttons)}

  {#if showErrors}
    <div transition:slide>
      <CardErrors {...rest} />
    </div>
  {/if}
</div>
