import axios from "axios";

const url =
  process.env.REACT_APP_NODE_ENV === "local"
    ? "http://localhost:5000/api"
    : "https://vercel.com/shuja-siddiqui/maknisa-invoicing-system/api";

export const login = (data) => {
  return axios
    .post(url + "/auths/login", data)
    .then((res) => {
      return res.data?.data;
    })
    .catch((err) => {
      throw err;
    });
};
export const forgetPass = (data) => {
  return axios
    .post(url + "/auths/forget-password", data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
};
export const drawInvoiceTemplate = () => {
  const token = localStorage.getItem("@token");
  console.log(token, "token");
  const headers = {
    Authorization: `JWT ${token}`,
  };
  return axios
    .post(`${url}/invoice`, {}, { headers })
    .then((res) => {
      return res.data?.data;
    })
    .catch((err) => {
      throw err;
    });
};
export const updateInvoice = (data) => {
  const token = localStorage.getItem("@token");
  const invoiceId = localStorage.getItem("@invoiceId");
  console.log(token, "token");
  const headers = {
    Authorization: `JWT ${token}`,
  };
  return axios
    .put(`${url}/invoice/update-invoice/${invoiceId}`, data, { headers })
    .then((res) => {
      return res.data?.data;
    })
    .catch((err) => {
      throw err;
    });
};
export const updateItemsArray = (data) => {
  const token = localStorage.getItem("@token");
  const invoiceId = localStorage.getItem("@invoiceId");
  const headers = {
    Authorization: `JWT ${token}`,
  };
  return axios
    .patch(`${url}/invoice/${invoiceId}`, data, { headers })
    .then((res) => {
      return res.data?.data;
    })
    .catch((err) => {
      throw err;
    });
};
export const updateSelectedItem = (data) => {
  const token = localStorage.getItem("@token");
  const invoiceId = localStorage.getItem("@invoiceId");
  const headers = {
    Authorization: `JWT ${token}`,
  };
  return axios
    .put(`${url}/invoice/updateItem/${invoiceId}`, data, { headers })
    .then((res) => {
      return res.data?.data;
    })
    .catch((err) => {
      throw err;
    });
};
export const genrateInvoice = (data) => {
  const token = localStorage.getItem("@token");
  console.log(token, "token");
  const invoiceId = localStorage.getItem("@invoiceId");
  const headers = {
    Authorization: `JWT ${token}`,
  };
  return axios
    .patch(`${url}/invoice/genrate-invoice/${invoiceId}`, data, { headers })
    .then((res) => {
      return res.data?.data;
    })
    .catch((err) => {
      throw err;
    });
};
export const getInvoices = () => {
  console.log("first");
  const token = localStorage.getItem("@token");
  const headers = {
    Authorization: `JWT ${token}`,
  };
  return axios
    .get(`${url}/invoice/get-all`, { headers })
    .then((res) => {
      console.log(res);
      return res?.data?.invoices;
    })
    .catch((err) => {
      throw err;
    });
};
export const getDrafts = () => {
  console.log("first");
  const token = localStorage.getItem("@token");
  const headers = {
    Authorization: `JWT ${token}`,
  };
  return axios
    .get(`${url}/invoice/drafts`, { headers })
    .then((res) => {
      console.log(res);
      return res?.data?.data;
    })
    .catch((err) => {
      throw err;
    });
};

export const getInvoiceById = (id) => {
  console.log(id, "API")
  const token = localStorage.getItem("@token");
  const headers = {
    Authorization: `JWT ${token}`,
  };
  return axios
    .get(`${url}/invoice/${id}`, { headers })
    .then((res) => {
      console.log(res?.data?.data, "API")
      return res?.data?.data;
    })
    .catch((err) => {
      console.log(err);
      return {};
    });
};
