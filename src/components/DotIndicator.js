class DotIndicator {
  constructor() {
    this.hasInitiallyShrunk = false;
    this.shrinkTimeout = null;
    this.container = this.createContainer();
    this.setupEventListeners();
  }

  createContainer() {
    const container = document.createElement("div");
    container.className = "url-dot-indicator";

    const buttonContainer = createButtonContainer(getPageType(location.href));
    container.appendChild(buttonContainer);

    return container;
  }

  setupEventListeners() {
    // Hover handlers
    this.container.addEventListener("mouseenter", () => {
      if (this.hasInitiallyShrunk) {
        this.container
          .querySelector(".button-container")
          .classList.remove("single-button");
      }
    });

    this.container.addEventListener("mouseleave", () => {
      if (this.hasInitiallyShrunk) {
        this.container
          .querySelector(".button-container")
          .classList.add("single-button");
      }
    });

    // Click handler
    document.addEventListener("click", (event) => {
      if (!this.hasInitiallyShrunk && !this.container.contains(event.target)) {
        this.startShrinkTimer();
      }
    });

    // Scroll handler
    document.addEventListener(
      "scroll",
      () => {
        if (!this.hasInitiallyShrunk) {
          this.startShrinkTimer();
        }
      },
      { passive: true }
    );
  }

  startShrinkTimer() {
    clearTimeout(this.shrinkTimeout);
    this.shrinkTimeout = setTimeout(() => {
      this.container
        .querySelector(".button-container")
        .classList.add("single-button");
      this.hasInitiallyShrunk = true;
    }, SHRINK_DELAY_MS);
  }

  mount() {
    document.body.appendChild(this.container);
  }

  unmount() {
    this.container.remove();
  }
}
