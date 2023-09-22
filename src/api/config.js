export const url =
  process.env.REACT_APP_NODE_ENV === "local"
    ? "http://localhost:5000/api"
    : "https://maknisa-invoicing-system-api.vercel.app/api";
export const file_url =
  process.env.REACT_APP_NODE_ENV === "local"
    ? "http://localhost:5000"
    : "https://maknisa-invoicing-system-api.vercel.app";
    