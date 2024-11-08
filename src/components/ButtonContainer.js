function createButtonContainer(pageType) {
  const buttonContainer = document.createElement("div");
  buttonContainer.className = "button-container";

  if (pageType && BUTTON_CONFIGS[pageType]) {
    BUTTON_CONFIGS[pageType].buttons.forEach(({ type, tooltip }) => {
      buttonContainer.appendChild(createButton(type, tooltip));
    });
    buttonContainer.appendChild(createDivider());
  }

  // Always add Copilot button
  buttonContainer.appendChild(createButton("copilot", "Open Dotcom Chat"));

  return buttonContainer;
}
