<script lang="ts">
  import { type IconName, ButtonComponent } from "obsidian";

  interface Props {
    icon: IconName;
    tooltip: string;
    onClick: (event: MouseEvent) => void;
  }

  let { icon, tooltip, onClick }: Props = $props();
  let wrapper = $state<HTMLElement>();

  $effect(() => {
    new ButtonComponent(wrapper!)
      .setClass("auto-card-link-copy-url")
      .setClass("clickable-icon")
      .setIcon(icon)
      .setTooltip(tooltip)
      .onClick(onClick);
  });
</script>

<div class="button-container" bind:this={wrapper}></div>

<style>
  .button-container {
    display: contents;
  }
</style>
