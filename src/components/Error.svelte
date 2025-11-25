<script lang="ts">
  import type { Snippet } from "svelte";

  type WithMessages = {
    messages: string[];
  };

  type WithChildren = {
    children: Snippet;
  };

  type Props = WithMessages | WithChildren;

  let errorProps: Props = $props();

  let children =
    "children" in errorProps ? errorProps.children : renderMessages;
  let messages = "messages" in errorProps ? errorProps.messages : [];
</script>

{#snippet renderMessages(messages: string[])}
  <ul>
    {#each messages as message}
      <li>{message}</li>
    {/each}
  </ul>
{/snippet}

<div class="auto-card-link-error-container">
  {@render children(messages)}
</div>

<style>
  .auto-card-link-error-container {
    max-width: 780px;
    border-radius: var(--error-card-radius, var(--radius-s));
    overflow: hidden;
    background-color: var(--background-modifier-error);
    padding: 10px;
    font-family: var(--font-text);
    white-space: pre;

    &:hover {
      background: var(--background-modifier-error-hover);
    }
  }
</style>
