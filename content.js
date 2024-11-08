function hideElement(selector) {
  const element = document.querySelector(selector);
  if (element) element.style.display = "none";
}

// Watch for URL changes and DOM changes
let lastUrl = location.href;
let dotIndicator = new DotIndicator();

const observer = new MutationObserver(() => {
  const currentUrl = location.href;
  if (currentUrl !== lastUrl) {
    lastUrl = currentUrl;
    dotIndicator.unmount();
    dotIndicator = new DotIndicator();
    dotIndicator.mount();
  }
  hideElement("#copilot-floating-button");
});

observer.observe(document, { subtree: true, childList: true });

// Initial creation
dotIndicator.mount();
