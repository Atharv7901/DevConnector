export const BaseURL = window.location.origin.includes("localhost")
  ? "http://localhost:8000/api"
  : window.location.origin + "/api";
