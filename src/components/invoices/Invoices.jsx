import { useState, useEffect } from "react";
import { getInvoices, removeInvoice, updateStatus } from "../../api";
import { InvoiceTable } from "../invoiceTable";
import { Box } from "@mui/material";
import {
  AttachMoney,
  Cancel,
  CheckCircle,
  Delete,
  Edit,
  HourglassEmpty,
  Paid,
  ReceiptLong,
  RemoveRedEye,
  ThumbDown,
  ThumbUp,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { StatusCard } from "../statusCards";
import { PaymentStatCard } from "../invoiceButtonCard/PaymentStatCard";

// ─── Design Tokens ────────────────────────────────────────────────────────────
const O = "#F98E0A";
const O10 = "rgba(249,142,10,0.10)";
const O20 = "rgba(249,142,10,0.20)";
const BLACK = "#0D0D0D";
const WHITE = "#FFFFFF";
const G50 = "#F9F9F9";
const G100 = "#F0F0F0";
const G200 = "#E2E2E2";
const G400 = "#ABABAB";
const G700 = "#3A3A3A";
const G900 = "#161616";
const GREEN = "#16A34A";
const GREEN_BG = "rgba(22,163,74,0.10)";
const RED = "#DC2626";
const RED_BG = "rgba(220,38,38,0.10)";

function createData(
  _id,
  Client_Name,
  Currency_Type,
  House_No,
  Location,
  Area,
  Category,
  Status,
  invoice_id,
  items,
  Created_By,
  Actions,
) {
  return {
    _id,
    Client_Name,
    Currency_Type,
    House_No,
    Location,
    Area,
    Category,
    Status,
    invoice_id,
    items,
    Created_By,
    Actions,
  };
}

export const Invoices = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const viewInvoice = (id) => {
    localStorage.setItem("@invoiceId", id);
    navigate("/print-invoice");
  };

  const updateData = (id) => {
    localStorage.setItem("@invoiceId", id);
    navigate("/invoice-form");
  };

  const deleteDraft = (id) => {
    const userConfirmed = window.confirm(`Do you want to delete !`);

    if (userConfirmed) {
      removeInvoice(id)
        .then(() => fetchData())
        .catch((err) => console.error(err));
    }
  };

  const handleStatus = ({ invoiceStatus, statusId }) => {
    const userConfirmed = window.confirm(`Are you sure you want to ${invoiceStatus} the invoice`);
    if (userConfirmed) {
      updateStatus({ invoiceStatus, statusId })
        .then((res) => {
          // Manually update the status in the data array without refreshing
          const updatedData = data.map((item) => {
            if (item._id === statusId) {
              return { ...item, Status: invoiceStatus };
            }
            return item;
          });
          setData(updatedData);
        })
        .catch((error) => console.log(error));
    }
  };

  // ─── Derived stats ──────────────────────────────────────────────────────────
  const approved = data.filter((d) => d.Status === "Approve");
  const pending = data.filter(
    (d) => d.Status !== "Approve" && d.Status !== "Reject",
  );
  const rejected = data.filter((d) => d.Status === "Reject");

  const getCurrencyTotals = (list) => {
    return list.reduce((acc, d) => {
      const currency = d.Currency_Type || "PKR";

      const total =
        d.items?.reduce((sum, item) => sum + (item.price || 0), 0) || 0;

      if (!acc[currency]) {
        acc[currency] = 0;
      }

      acc[currency] += total;

      return acc;
    }, {});
  };

  const paidTotals = getCurrencyTotals(approved);
  const pendingTotals = getCurrencyTotals(pending);
  const rejectedTotals = getCurrencyTotals(rejected);

  const fetchData = () => {
    getInvoices()
      .then((res) => {
        const rows = res.map((data) =>
          createData(
            data?._id,
            data?.client_name,
            data?.currency_type,
            data?.location?.details,
            data?.location?.location,
            data?.location?.area + "," + data?.location?.city,
            data?.category,
            data?.currentStatus,
            data?.invoice_id,
            data.items,
            data?.createdBy,
          ),
        );
        setData(rows);
      })
      .catch((err) => console.log(err));
  };

  // Polling mechanism: Fetch data periodically
  useEffect(() => {
    const pollingInterval = setInterval(fetchData, 2000);

    // Cleanup: Stop polling when the component unmounts
    return () => clearInterval(pollingInterval);
  }, []);

  const actions = (row) => [
    {
      title: "View",
      icon: <RemoveRedEye sx={{ fontSize: 14 }} />,
      fn: () => viewInvoice(row._id),
      hc: O,
      hbg: O10,
    },
    {
      title: "Edit",
      icon: <Edit sx={{ fontSize: 14 }} />,
      fn: () => updateData(row._id),
      hc: O,
      hbg: O10,
    },
    {
      title: "Delete",
      icon: <Delete sx={{ fontSize: 14 }} />,
      fn: () => deleteDraft(row._id),
      hc: RED,
      hbg: RED_BG,
    },
    {
      title: "Approve",
      icon: <ThumbUp sx={{ fontSize: 14 }} />,
      fn: () => handleStatus({ invoiceStatus: "Approve", statusId: row._id }),
      hc: GREEN,
      hbg: GREEN_BG,
    },
    {
      title: "Reject",
      icon: <ThumbDown sx={{ fontSize: 14 }} />,
      fn: () => handleStatus({ invoiceStatus: "Reject", statusId: row._id }),
      hc: RED,
      hbg: RED_BG,
    },
  ];

  const userRole = JSON.parse(localStorage.getItem("@userDetails"));
  console.log(userRole);
  return (
    <>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(2, 1fr)",
            sm: "repeat(3, 1fr)",
            md: "repeat(4, 1fr)",
          },
          gap: "14px",
          mb: 3.5,
        }}
      >
        <StatusCard
          label="Total"
          value={data.length}
          sub="all invoices"
          icon={<ReceiptLong />}
          variant="dark"
        />
        <StatusCard
          label="Approved"
          value={approved?.length}
          sub="payments cleared"
          icon={<CheckCircle />}
          variant="orange"
        />
        <StatusCard
          label="Pending"
          value={pending?.length}
          sub="awaiting review"
          icon={<HourglassEmpty />}
          variant="default"
        />
        <StatusCard
          label="Rejected"
          value={rejected.length}
          sub="not cleared"
          icon={<Cancel />}
          variant="rejected"
        />
        {userRole.role === "Admin" && (
          <>
            <PaymentStatCard
              label="Paid "
              value={paidTotals}
              sub="approved amount"
              icon={<Paid />}
              variant="default"
            />
            <PaymentStatCard
              label="In Review Invoices Amount"
              value={pendingTotals}
              sub="pending amount"
              icon={<AttachMoney />}
              variant="default"
            />
            <PaymentStatCard
              label="Rejected Invoices Amount"
              value={rejectedTotals}
              sub="rejected amount"
              icon={<AttachMoney />}
              variant="default"
            />
          </>
        )}
      </Box>

      <InvoiceTable
        data={data}
        headings={[
          "invoice_id",
          "Client_Name",
          "House_No",
          "Location",
          "Area",
          "Category",
          "Status",
          "Created_By",
          "Actions",
        ]}
        actions={actions}
        tableHeadingText="All Invoices"
      />
    </>
  );
};
