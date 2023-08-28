export const makeRequest = (url, method = "Get", body = null) => {
  if (method !== "GET") {
    return fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method,
      body: JSON.stringify(body),
    }).then((res) => res.json());
  }
  return fetch(url).then((res) => res.json());
};
