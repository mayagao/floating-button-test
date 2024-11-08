function createButton(type, tooltip) {
  const button = document.createElement("button");
  button.className = "dot-button";
  button.setAttribute("data-type", type);

  const svgIcon = document.createElement("img");

  svgIcon.src = chrome.runtime.getURL(`icons/${type}.svg`);

  svgIcon.className = "button-icon";
  button.appendChild(svgIcon);

  const tooltipSpan = document.createElement("span");
  tooltipSpan.className = "tooltip";
  tooltipSpan.textContent = tooltip;

  button.appendChild(tooltipSpan);
  return button;
}

function createDivider() {
  const divider = document.createElement("div");
  divider.className = "divider";
  return divider;
}
