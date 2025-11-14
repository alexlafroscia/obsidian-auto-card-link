export function createErrorCard(message: string): HTMLElement {
  const containerEl = document.createElement("div");
  containerEl.addClass("auto-card-link-error-container");

  containerEl.textContent = message;

  return containerEl;
}
