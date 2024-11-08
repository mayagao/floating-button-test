function getPageType(url) {
  url = url.toLowerCase();

  if (
    url.includes("runs") &&
    document.querySelector('svg[aria-label^="failed:"]')
  ) {
    return "FAILED_RUN";
  }
  if (/\/issues\/\d+/.test(url)) return "ISSUE";
  if (/\/pull\/\d+/.test(url)) return "PR";
  if (url.includes("/blob/")) return "BLOB";
  if (url.includes("tree/")) return "TREE";
  return null;
}
