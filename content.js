let shrinkTimeout;
let isMouseInCorner = false;

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

  const buttonContainer = document.createElement("div");
  buttonContainer.className = "button-container";

  const url = window.location.href.toLowerCase();
  const isSpecificIssue = /\/issues\/\d+/.test(url);
  const isSpecificPR = /\/pull\/\d+/.test(url);
  const isIssuesList = url.endsWith("/issues");
  const isPRList = url.endsWith("/pulls");
  const isBlob = url.includes("/blob/");

  if (isSpecificIssue) {
    buttonContainer.appendChild(
      createButton("summarize", "Summarize this issue")
    );
    buttonContainer.appendChild(createButton("explain", "Explain this issue"));
  } else if (isSpecificPR) {
    buttonContainer.appendChild(createButton("summarize", "Summarize this PR"));
    buttonContainer.appendChild(
      createButton("generate", "Generate suggestion")
    );
  } else if (isIssuesList) {
    buttonContainer.appendChild(createButton("summarize", "Summarize all"));
  } else if (isPRList) {
    buttonContainer.appendChild(createButton("summarize", "Summarize all"));
  } else if (isBlob) {
    buttonContainer.appendChild(
      createButton("summarize", "Summarize this file")
    );
    buttonContainer.appendChild(createButton("explain", "Explain this code"));
  }

  if (isSpecificIssue || isSpecificPR || isIssuesList || isPRList || isBlob) {
    buttonContainer.appendChild(createDivider());
  }

  const copilotButton = createButton("copilot", "Open Dotcom Chat");
  buttonContainer.appendChild(copilotButton);

  container.appendChild(buttonContainer);
  document.body.appendChild(container);

  // Add hover logic
  buttonContainer.addEventListener("mouseenter", () => {
    clearTimeout(shrinkTimeout);
    buttonContainer.classList.remove("single-button");
    isMouseInCorner = true;
  });

  buttonContainer.addEventListener("mouseleave", () => {
    isMouseInCorner = false;
    startShrinkTimer(buttonContainer);
  });

  startShrinkTimer(buttonContainer);
}

function startShrinkTimer(buttonContainer) {
  clearTimeout(shrinkTimeout);
  shrinkTimeout = setTimeout(() => {
    if (!isMouseInCorner) {
      buttonContainer.classList.add("single-button");
    }
  }, 2000);
}

// Listen for mouse movements
window.addEventListener("mousemove", (event) => {
  const { clientX, clientY } = event;
  const { innerWidth, innerHeight } = window;
  const cornerThreshold = 140; // 100px + 40px buffer

  if (
    clientX > innerWidth - cornerThreshold &&
    clientY > innerHeight - cornerThreshold
  ) {
    isMouseInCorner = true;
  } else {
    isMouseInCorner = false;
  }
});

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
