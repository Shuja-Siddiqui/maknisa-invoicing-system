import axios from 'axios';

import { url } from './config';

export const drawInvoiceTemplate = () => {
  const token = localStorage.getItem('@token');
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
  const token = localStorage.getItem('@token');
  const invoiceId = localStorage.getItem('@invoiceId');
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
export const updateImage = (data, id) => {
  const token = localStorage.getItem('@token');
  const headers = {
    Authorization: `JWT ${token}`,
  };
  return axios
    .patch(`${url}/files/${id}`, data, { headers })
    .then((res) => {
      return res.data?.data;
    })
    .catch((err) => {
      throw err;
    });
};
export const updateItemsArray = (data) => {
  const token = localStorage.getItem('@token');
  const invoiceId = localStorage.getItem('@invoiceId');
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
  const token = localStorage.getItem('@token');
  const invoiceId = localStorage.getItem('@invoiceId');
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
export const deleteSelectedItem = (data) => {
  const token = localStorage.getItem('@token');
  const invoiceId = localStorage.getItem('@invoiceId');
  const headers = {
    Authorization: `JWT ${token}`,
  };
  return axios
    .delete(`${url}/invoice/deleteItem/${invoiceId}?index=${data}`, { headers })
    .then((res) => {
      localStorage.setItem('@token', res?.data?.token);
      return res.data?.data;
    })
    .catch((err) => {
      throw err;
    });
};
export const genrateInvoice = (data) => {
  const token = localStorage.getItem('@token');
  const invoiceId = localStorage.getItem('@invoiceId');
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

export const updateStatus = (invoiceData) => {
  const token = localStorage.getItem('@token');
  const invoiceId = localStorage.getItem('@invoiceId');
  const headers = {
    Authorization: `JWT ${token}`,
  };
  return axios
    .patch(
      `${url}/invoice/update-status/${invoiceId}`,
      { invoiceData },
      {
        headers,
      }
    )
    .then((res) => {
      return res.data?.data;
    })
    .catch((err) => {
      throw err;
    });
};

export const getInvoices = () => {
  const token = localStorage.getItem('@token');
  const headers = {
    Authorization: `JWT ${token}`,
  };
  return axios
    .get(`${url}/invoice/get-all`, { headers })
    .then((res) => {
      return res?.data?.invoices;
    })
    .catch((err) => {
      throw err;
    });
};
export const removeInvoice = (id) => {
  const token = localStorage.getItem('@token');
  const headers = {
    Authorization: `JWT ${token}`,
  };
  return axios
    .delete(`${url}/invoice/${id}`, { headers })
    .then((res) => {
      return res?.data?.invoices;
    })
    .catch((err) => {
      throw err;
    });
};
export const getDrafts = () => {
  const token = localStorage.getItem('@token');
  const headers = {
    Authorization: `JWT ${token}`,
  };
  return axios
    .get(`${url}/invoice/drafts`, { headers })
    .then((res) => {
      return res?.data?.data;
    })
    .catch((err) => {
      throw err;
    });
};

export const getInvoiceById = (id) => {
  const token = localStorage.getItem('@token');
  const headers = {
    Authorization: `JWT ${token}`,
  };
  return axios
    .get(`${url}/invoice/${id}`, { headers })
    .then((res) => {
      return res?.data?.data;
    })
    .catch((err) => {
      console.log(err);
      return {};
    });
};
