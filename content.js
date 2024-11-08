let shrinkTimeout;

function hideElement(selector) {
  const elements = document.querySelectorAll(selector);
  elements.forEach((element) => {
    console.log("Hiding element:", element);
    element.style.display = "none";
  });
}

function createButton(type, tooltip) {
  const button = document.createElement("button");
  button.className = "dot-button";

  const img = document.createElement("img");
  img.src = chrome.runtime.getURL(`icons/${type}.svg`);
  img.alt = type;

  const tooltipDiv = document.createElement("div");
  tooltipDiv.className = "tooltip";
  tooltipDiv.textContent = tooltip;

  button.appendChild(img);
  button.appendChild(tooltipDiv);

  return button;
}

function createDivider() {
  const divider = document.createElement("div");
  divider.className = "divider";
  return divider;
}

function createDotIndicator() {
  // Remove existing indicator if any
  const existingIndicator = document.querySelector(".url-dot-indicator");
  if (existingIndicator) {
    existingIndicator.remove();
  }

  // Hide original Copilot button
  hideElement("#copilot-floating-button");

  // Create main container
  const container = document.createElement("div");
  container.className = "url-dot-indicator";

  // Create single button container for all buttons
  const buttonContainer = document.createElement("div");
  buttonContainer.className = "button-container";

  const url = window.location.href.toLowerCase();

  if (url.includes("issues")) {
    buttonContainer.appendChild(
      createButton("summarize", "Summarize this issue")
    );
    buttonContainer.appendChild(createButton("explain", "Explain this issue"));
  } else if (url.includes("pr")) {
    buttonContainer.appendChild(createButton("summarize", "Summarize this PR"));
    buttonContainer.appendChild(
      createButton("generate", "Generate suggestion")
    );
  }

  // Add divider if we have action buttons
  if (url.includes("issues") || url.includes("pr")) {
    buttonContainer.appendChild(createDivider());
  }

  // Always add the Copilot button
  buttonContainer.appendChild(createButton("copilot", "Open Dotcom Chat"));

  container.appendChild(buttonContainer);
  document.body.appendChild(container);
}

// Watch for URL changes and DOM changes
let lastUrl = location.href;
const observer = new MutationObserver(() => {
  const currentUrl = location.href;
  if (currentUrl !== lastUrl) {
    lastUrl = currentUrl;
    createDotIndicator();
  }
  // Always try to hide the Copilot button as it might be dynamically added
  hideElement("#copilot-floating-button");
});

observer.observe(document, { subtree: true, childList: true });

// Initial creation
createDotIndicator();
