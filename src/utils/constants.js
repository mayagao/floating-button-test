const SHRINK_DELAY_MS = 3000;
const BUTTON_CONFIGS = {
  ISSUE: {
    buttons: [
      { type: "summarize", tooltip: "Summarize this issue" },
      { type: "explain", tooltip: "Generate plan" },
    ],
  },
  PR: {
    buttons: [
      { type: "summarize", tooltip: "Summarize this PR" },
      { type: "explain", tooltip: "Propose improvements" },
    ],
  },
  BLOB: {
    buttons: [
      { type: "summarize", tooltip: "Summarize this file" },
      { type: "explain", tooltip: "Refactor code" },
    ],
  },
  TREE: {
    buttons: [{ type: "explain", tooltip: "Explain folder" }],
  },
  FAILED_RUN: {
    buttons: [{ type: "summarize", tooltip: "Summarize job errors" }],
  },
};
