export const url =
  process.env.REACT_APP_NODE_ENV === "local"
    ? "http://localhost:5000/api"
    : "https://vercel.com/shuja-siddiqui/maknisa-invoicing-system/api";
