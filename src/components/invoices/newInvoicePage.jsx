import React, { useState, useEffect } from "react";
import { getInvoices, removeInvoice, updateStatus } from "../../api";
import { useNavigate } from "react-router-dom";
import {
  Delete,
  Edit,
  RemoveRedEye,
  ThumbDown,
  ThumbUp,
  Search,
  CheckCircle,
  HourglassEmpty,
  Cancel,
  ReceiptLong,
  AttachMoney,
  Paid,
  NoteAdd,
  Article,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Chip,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Tooltip,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";

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

// ─── Helpers ──────────────────────────────────────────────────────────────────
const initials = (n = "") =>
  n
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const fmtMoney = (v) => "$" + Number(v || 0).toLocaleString();

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
  };
}
const paymentCurrencies = [
  {
    value: "PKR",
    label: "Rs",
  },
  {
    value: "USD",
    label: "$",
  },
  {
    value: "EUR",
    label: "€",
  },
  {
    value: "BTC",
    label: "฿",
  },
  {
    value: "JPY",
    label: "¥",
  },
];
// ─── Status Badge ─────────────────────────────────────────────────────────────
const Badge = ({ status }) => {
  const m = {
    Approve: { label: "Approved", color: GREEN, bg: GREEN_BG },
    Reject: { label: "Rejected", color: RED, bg: RED_BG },
  };
  const c = m[status] || { label: "Pending", color: O, bg: O10 };
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        px: "10px",
        py: "3px",
        borderRadius: "100px",
        background: c.bg,
        border: `1px solid ${c.color}33`,
      }}
    >
      <Box
        sx={{
          width: 5,
          height: 5,
          borderRadius: "50%",
          background: c.color,
          flexShrink: 0,
        }}
      />
      <Typography
        sx={{
          fontSize: 11,
          fontWeight: 700,
          color: c.color,
          letterSpacing: "0.05em",
        }}
      >
        {c.label}
      </Typography>
    </Box>
  );
};

// ─── Stat Card ────────────────────────────────────────────────────────────────
const StatCard = ({ label, value, sub, icon, variant = "default" }) => {
  const isSolid = variant === "orange";
  const isDark = variant === "dark";
  const isRed = variant === "rejected";
  const bg = isSolid
    ? O
    : isDark
      ? BLACK
      : isRed
        ? " rgba(255, 0, 0, 0.95)"
        : WHITE;
  const textMain = isSolid ? BLACK : isDark ? WHITE : isRed ? WHITE : G900;
  const textSub = isSolid
    ? "rgba(0,0,0,0.50)"
    : isDark
      ? G400
      : isRed
        ? WHITE
        : G400;
  const iconBg = isSolid
    ? "rgba(0,0,0,0.12)"
    : isDark
      ? O10
      : isRed
        ? WHITE
        : O10;
  const iconClr = isSolid ? BLACK : isRed ? " rgba(255, 0, 0, 0.95)" : O;
  const border = isSolid
    ? "none"
    : `1px solid ${isDark ? "rgba(255,255,255,0.08)" : G200}`;

  return (
    <Box
      sx={{
        background: bg,
        border,
        borderRadius: "16px",
        p: "20px 22px",
        position: "relative",
        overflow: "hidden",
        transition: "transform 0.18s, box-shadow 0.18s",
        boxShadow: isSolid
          ? `0 8px 32px ${O20}`
          : isDark
            ? "0 4px 20px rgba(0,0,0,0.35)"
            : "0 2px 10px rgba(0,0,0,0.05)",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: isSolid
            ? `0 14px 40px ${O20}`
            : "0 8px 24px rgba(0,0,0,0.10)",
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          right: -20,
          top: -20,
          width: 80,
          height: 80,
          borderRadius: "50%",
          border: `20px solid ${isSolid ? "rgba(0,0,0,0.07)" : isDark ? O10 : isRed ? O : O10}`,
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          width: 36,
          height: 36,
          borderRadius: "10px",
          background: iconBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: iconClr,
          "& svg": { fontSize: 18 },
          mb: 2,
        }}
      >
        {icon}
      </Box>
      <Typography
        sx={{
          fontSize: 28,
          fontWeight: 800,
          color: textMain,
          lineHeight: 1,
          mb: 0.4,
          letterSpacing: "-0.03em",
        }}
      >
        {value}
      </Typography>
      <Typography
        sx={{
          fontSize: 11,
          fontWeight: 700,
          color: textMain,
          opacity: 0.7,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          mb: 0.25,
        }}
      >
        {label}
      </Typography>
      <Typography sx={{ fontSize: 11, color: textSub }}>{sub}</Typography>
    </Box>
  );
};

const getCurrencyMeta = (currency) => {
  return (
    paymentCurrencies.find((c) => c.value === currency) || {
      label: currency,
    }
  );
};

const PaymentStatCard = ({
  label,
  value = {},
  sub,
  icon,
  variant = "default",
}) => {
  const isSolid = variant === "orange";
  const isDark = variant === "dark";
  const isRed = variant === "rejected";

  const bg = isSolid
    ? O
    : isDark
      ? BLACK
      : isRed
        ? "rgba(255, 0, 0, 0.95)"
        : WHITE;

  const textMain = isSolid ? BLACK : isDark ? WHITE : isRed ? WHITE : G900;

  const textSub = isSolid
    ? "rgba(0,0,0,0.50)"
    : isDark
      ? G400
      : isRed
        ? WHITE
        : G400;

  const iconBg = isSolid
    ? "rgba(0,0,0,0.12)"
    : isDark
      ? O10
      : isRed
        ? WHITE
        : O10;

  const iconClr = isSolid ? BLACK : isRed ? "rgba(255, 0, 0, 0.95)" : O;

  const border = isSolid
    ? "none"
    : `1px solid ${isDark ? "rgba(255,255,255,0.08)" : G200}`;

  return (
    <Box
      sx={{
        background: bg,
        border,
        borderRadius: "16px",
        p: "20px 22px",
        position: "relative",
        overflow: "hidden",
        transition: "transform 0.18s, box-shadow 0.18s",
        boxShadow: isSolid
          ? `0 8px 32px ${O20}`
          : isDark
            ? "0 4px 20px rgba(0,0,0,0.35)"
            : "0 2px 10px rgba(0,0,0,0.05)",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: isSolid
            ? `0 14px 40px ${O20}`
            : "0 8px 24px rgba(0,0,0,0.10)",
        },
      }}
    >
      {/* Decorative circle */}
      <Box
        sx={{
          position: "absolute",
          right: -20,
          top: -20,
          width: 80,
          height: 80,
          borderRadius: "50%",
          border: `20px solid ${
            isSolid ? "rgba(0,0,0,0.07)" : isDark ? O10 : isRed ? O : O10
          }`,
        }}
      />

      {/* Icon */}
      <Box
        sx={{
          width: 36,
          height: 36,
          borderRadius: "10px",
          background: iconBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: iconClr,
          "& svg": { fontSize: 18 },
          mb: 2,
        }}
      >
        {icon}
      </Box>

      {/* 💰 Multi Currency Values */}
      <Box sx={{ mb: 1 }}>
        {Object.entries(value).map(([currency, amount]) => {
          const meta = getCurrencyMeta(currency);

          return (
            <Box sx={{ display: "flex", width: "100%" }}>
              <Typography
                key={currency}
                sx={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: textMain,
                  width: "100%",
                  lineHeight: 1.4,
                }}
              >
                {meta.label}
              </Typography>
              <Typography
                key={currency}
                sx={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: textMain,
                  lineHeight: 1.4,
                  width: "100%",
                }}
              >
                {amount}
              </Typography>
            </Box>
          );
        })}
      </Box>

      {/* Label */}
      <Typography
        sx={{
          fontSize: 11,
          fontWeight: 700,
          color: textMain,
          opacity: 0.7,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          mb: 0.25,
        }}
      >
        {label}
      </Typography>

      {/* Sub */}
      <Typography sx={{ fontSize: 11, color: textSub }}>{sub}</Typography>
    </Box>
  );
};

// ─── Page Number Button ───────────────────────────────────────────────────────
const PageBtn = ({ n, current, onClick }) => (
  <Box
    component="button"
    onClick={onClick}
    sx={{
      width: 30,
      height: 30,
      borderRadius: "8px",
      border: n === current ? `1.5px solid ${O}` : `1px solid ${G200}`,
      background: n === current ? O : WHITE,
      color: n === current ? BLACK : G700,
      fontSize: 12,
      fontWeight: n === current ? 800 : 600,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "all 0.15s",
      "&:hover": n !== current ? { background: G100, borderColor: G400 } : {},
    }}
  >
    {n}
  </Box>
);

// ─── Main Component ───────────────────────────────────────────────────────────
export const NewInvoicesPage = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 8;
  const navigate = useNavigate();

  const viewInvoice = (id) => {
    localStorage.setItem("@invoiceId", id);
    navigate("/print-invoice");
  };
  const editInvoice = (id) => {
    localStorage.setItem("@invoiceId", id);
    navigate("/invoice-form");
  };

  const deleteDraft = (id) => {
    if (!window.confirm("Delete this invoice?")) return;
    removeInvoice(id).then(fetchData).catch(console.error);
  };

  const handleStatus = ({ invoiceStatus, statusId }) => {
    updateStatus({ invoiceStatus, statusId })
      .then(() =>
        setData((prev) =>
          prev.map((r) =>
            r._id === statusId ? { ...r, Status: invoiceStatus } : r,
          ),
        ),
      )
      .catch(console.error);
  };

  const fetchData = () => {
    getInvoices()
      .then((res) =>
        setData(
          res.map((d) =>
            createData(
              d?._id,
              d?.client_name,
              d?.currency_type,
              d?.location?.details,
              d?.location?.location,
              d?.location?.area + ", " + d?.location?.city,
              d?.category,
              d?.currentStatus,
              d?.invoice_id,
              d?.items || 0,
            ),
          ),
        ),
      )
      .catch(console.error);
  };

  useEffect(() => {
    fetchData();
    const t = setInterval(fetchData, 2000);
    return () => clearInterval(t);
  }, []);

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

  // ─── Filtered rows ──────────────────────────────────────────────────────────
  const filtered = data.filter((row) => {
    const ok =
      filter === "all" ||
      (filter === "approve" && row.Status === "Approve") ||
      (filter === "pending" &&
        row.Status !== "Approve" &&
        row.Status !== "Reject") ||
      (filter === "reject" && row.Status === "Reject");
    const q = search.toLowerCase();
    return (
      ok &&
      (!q ||
        row.Client_Name?.toLowerCase().includes(q) ||
        row.Location?.toLowerCase().includes(q) ||
        row.Category?.toLowerCase().includes(q) ||
        row.invoice_id?.toLowerCase().includes(q))
    );
  });

  // Avatar color pool
  const avPool = [
    { bg: O10, color: O },
    { bg: GREEN_BG, color: GREEN },
    { bg: "rgba(99,102,241,0.12)", color: "#6366F1" },
    { bg: "rgba(14,165,233,0.12)", color: "#0EA5E9" },
  ];
  const avColor = (name = "") => avPool[name.charCodeAt(0) % avPool.length];

  // ─── Pagination ─────────────────────────────────────────────────────────────
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageRows = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );
  const startRow = filtered.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1;
  const endRow = Math.min(safePage * PAGE_SIZE, filtered.length);

  // page number buttons (max 5 visible)
  const pageNums = (() => {
    const delta = 2;
    const range = [];
    for (
      let i = Math.max(1, safePage - delta);
      i <= Math.min(totalPages, safePage + delta);
      i++
    )
      range.push(i);
    return range;
  })();

  // ─── Action button config ───────────────────────────────────────────────────
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
      fn: () => editInvoice(row._id),
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

  // ─── Render ─────────────────────────────────────────────────────────────────
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: G50,
        fontFamily: "'Plus Jakarta Sans', 'DM Sans', sans-serif",
      }}
    >
      <Box sx={{ background: WHITE }}>
        {/* ── Page Heading ── */}
        {/* <Box sx={{ mb: 3 }}>
          <Typography sx={{ fontSize: 26, fontWeight: 800, color: G900, letterSpacing: "-0.03em", lineHeight: 1 }}>
            Dashboard
          </Typography>
          <Typography sx={{ fontSize: 13, color: G400, mt: 0.5 }}>
            Track, manage and review all payment invoices in real-time
          </Typography>
        </Box> */}

        {/* ── Stat Cards Grid ── */}
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
          <StatCard
            label="Total"
            value={data.length}
            sub="all invoices"
            icon={<ReceiptLong />}
            variant="dark"
          />
          <StatCard
            label="Approved"
            value={approved.length}
            sub="payments cleared"
            icon={<CheckCircle />}
            variant="orange"
          />
          <StatCard
            label="Pending"
            value={pending.length}
            sub="awaiting review"
            icon={<HourglassEmpty />}
            variant="default"
          />
          <StatCard
            label="Rejected"
            value={rejected.length}
            sub="not cleared"
            icon={<Cancel />}
            variant="rejected"
          />
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
        </Box>

        {/* ── Action Buttons ── */}
        <Box
          sx={{
            display: "flex",
            gap: "12px",
            mb: 3.5,
            flexWrap: {
              xs: "wrap", // mobile
              sm: "nowrap", // tablet and above (optional)
            },
          }}
        >
          {/* Add New Invoice */}
          <Button
            onClick={() => navigate("/invoice-form")}
            startIcon={<NoteAdd sx={{ fontSize: 18 }} />}
            sx={{
              background: BLACK,
              color: WHITE,
              fontWeight: 700,
              fontSize: 13,
              px: 3,
              py: 1.2,
              width: "100%",
              borderRadius: "12px",
              textTransform: "none",
              letterSpacing: "-0.01em",
              border: `2px solid ${O}`,
              boxShadow: `0 4px 20px ${O20}`,
              transition: "all 0.18s",
              "&:hover": {
                background: O,
                color: BLACK,
                boxShadow: `0 6px 28px ${O20}`,
                transform: "translateY(-2px)",
              },
            }}
          >
            Add New Invoice
          </Button>

          {/* Draft Invoice */}
          <Button
            onClick={() => navigate("/drafts")}
            startIcon={<Article sx={{ fontSize: 18 }} />}
            sx={{
              background: WHITE,
              width: "100%",
              color: G700,
              fontWeight: 700,
              fontSize: 13,
              px: 3,
              py: 1.2,
              borderRadius: "12px",
              textTransform: "none",
              letterSpacing: "-0.01em",
              border: `1.5px solid ${G200}`,
              boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
              transition: "all 0.18s",
              "&:hover": {
                background: G50,
                borderColor: G400,
                transform: "translateY(-2px)",
                boxShadow: "0 6px 20px rgba(0,0,0,0.10)",
              },
            }}
          >
            Draft Invoice
          </Button>
        </Box>

        {/* ── Invoice Table Card ── */}
        <Box
          sx={{
            background: WHITE,
            borderRadius: "18px",
            border: `1px solid ${G200}`,
            overflow: "hidden",
            boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
          }}
        >
          {/* Toolbar */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 2,
              px: 3,
              py: "14px",
              borderBottom: `1px solid ${G100}`,
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: 15,
                  fontWeight: 800,
                  color: G900,
                  letterSpacing: "-0.01em",
                }}
              >
                All Invoices
              </Typography>
              <Typography sx={{ fontSize: 12, color: G400 }}>
                {filtered.length} of {data.length} records shown
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                gap: 1.5,
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              {/* Search */}
              <TextField
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search client, category..."
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ fontSize: 15, color: G400 }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  width: 220,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                    fontSize: 13,
                    background: G50,
                    "& fieldset": { borderColor: G200 },
                    "&:hover fieldset": { borderColor: O },
                    "&.Mui-focused fieldset": {
                      borderColor: O,
                      borderWidth: 1.5,
                    },
                  },
                }}
              />

              {/* Filter Tabs */}
              <ToggleButtonGroup
                value={filter}
                exclusive
                onChange={(_, v) => v && setFilter(v)}
                size="small"
                sx={{
                  background: G50,
                  border: `1px solid ${G200}`,
                  borderRadius: "10px",
                  p: "3px",
                  gap: "2px",
                  "& .MuiToggleButtonGroup-grouped": {
                    border: "none !important",
                    borderRadius: "7px !important",
                    fontSize: 12,
                    fontWeight: 700,
                    px: 1.5,
                    py: 0.5,
                    color: G400,
                    textTransform: "none",
                    transition: "all 0.15s",
                    "&.Mui-selected": { background: BLACK, color: WHITE },
                    "&:hover:not(.Mui-selected)": { background: G100 },
                  },
                }}
              >
                <ToggleButton value="all">All ({data.length})</ToggleButton>
                <ToggleButton value="approve">
                  Approved ({approved.length})
                </ToggleButton>
                <ToggleButton value="pending">
                  Pending ({pending.length})
                </ToggleButton>
                <ToggleButton value="reject">
                  Rejected ({rejected.length})
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </Box>

          {/* Table */}
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {[
                    "Client",
                    "Invoice ID",
                    "Category",
                    "Area",
                    "Status",
                    "Actions",
                  ].map((h) => (
                    <TableCell
                      key={h}
                      sx={{
                        fontSize: 10.5,
                        fontWeight: 800,
                        color: G400,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        background: G50,
                        borderBottom: `1px solid ${G100}`,
                        py: 1.5,
                        whiteSpace: "nowrap",
                        ...(h === "Actions" ? { textAlign: "center" } : {}),
                      }}
                    >
                      {h}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      sx={{
                        textAlign: "center",
                        py: 7,
                        color: G400,
                        fontSize: 13,
                        border: "none",
                      }}
                    >
                      No invoices match your search
                    </TableCell>
                  </TableRow>
                ) : (
                  pageRows.map((row) => {
                    const av = avColor(row.Client_Name);
                    return (
                      <TableRow
                        key={row._id}
                        sx={{
                          "&:hover": { background: G50 },
                          "& td": { borderBottom: `1px solid ${G100}` },
                          "&:last-child td": { borderBottom: "none" },
                          transition: "background 0.12s",
                        }}
                      >
                        {/* Client */}
                        <TableCell sx={{ py: 1.5 }}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1.5,
                            }}
                          >
                            <Avatar
                              sx={{
                                width: 34,
                                height: 34,
                                fontSize: 11,
                                fontWeight: 800,
                                background: av?.bg,
                                color: av?.color,
                                border: `1.5px solid ${av?.color}33`,
                              }}
                            >
                              {initials(row.Client_Name)}
                            </Avatar>
                            <Box>
                              <Typography
                                sx={{
                                  fontSize: 13,
                                  fontWeight: 700,
                                  color: G900,
                                }}
                              >
                                {row.Client_Name}
                              </Typography>
                              <Typography sx={{ fontSize: 11, color: G400 }}>
                                {row.Location}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>

                        {/* Invoice ID */}
                        <TableCell>
                          <Box
                            sx={{
                              display: "inline-block",
                              px: "8px",
                              py: "3px",
                              background: O10,
                              borderRadius: "7px",
                              border: `1px solid ${O}22`,
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: 11,
                                fontWeight: 700,
                                color: O,
                                fontFamily: "monospace",
                                letterSpacing: "0.03em",
                              }}
                            >
                              {row.invoice_id}
                            </Typography>
                          </Box>
                        </TableCell>

                        {/* Category */}
                        <TableCell>
                          <Chip
                            label={row.Category}
                            size="small"
                            sx={{
                              background: G50,
                              color: G700,
                              fontSize: 11,
                              fontWeight: 700,
                              border: `1px solid ${G200}`,
                              borderRadius: "7px",
                              height: 23,
                            }}
                          />
                        </TableCell>

                        {/* Area */}
                        <TableCell>
                          <Typography sx={{ fontSize: 12, color: G400 }}>
                            {row.Area}
                          </Typography>
                        </TableCell>


                        {/* Status */}
                        <TableCell>
                          <Badge status={row.Status} />
                        </TableCell>

                        {/* Actions */}
                        <TableCell>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: 0.25,
                            }}
                          >
                            {actions(row).map((btn) => (
                              <Tooltip key={btn.title} title={btn.title} arrow>
                                <IconButton
                                  size="small"
                                  onClick={btn.fn}
                                  sx={{
                                    width: 28,
                                    height: 28,
                                    borderRadius: "7px",
                                    color: G400,
                                    "&:hover": {
                                      color: btn.hc,
                                      background: btn.hbg,
                                    },
                                    transition: "all 0.15s",
                                  }}
                                >
                                  {btn.icon}
                                </IconButton>
                              </Tooltip>
                            ))}
                          </Box>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* ── Pagination Footer ── */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 2,
              px: 3,
              py: "12px",
              borderTop: `1px solid ${G100}`,
              background: G50,
            }}
          >
            {/* Left: row count info */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography sx={{ fontSize: 12, color: G400 }}>
                Showing{" "}
                <Box component="span" sx={{ fontWeight: 700, color: G700 }}>
                  {startRow}–{endRow}
                </Box>{" "}
                of{" "}
                <Box component="span" sx={{ fontWeight: 700, color: G700 }}>
                  {filtered.length}
                </Box>{" "}
                invoices
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
                <Box
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: GREEN,
                    animation: "livePulse 2s infinite",
                  }}
                />
                <Typography sx={{ fontSize: 11, color: G400 }}>Live</Typography>
              </Box>
            </Box>

            {/* Right: page buttons */}
            <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
              {/* Prev */}
              <IconButton
                size="small"
                disabled={safePage === 1}
                onClick={() => setPage((p) => p - 1)}
                sx={{
                  width: 30,
                  height: 30,
                  borderRadius: "8px",
                  border: `1px solid ${G200}`,
                  background: WHITE,
                  color: safePage === 1 ? G200 : G700,
                  "&:hover:not(:disabled)": {
                    background: G100,
                    borderColor: G400,
                  },
                  "&:disabled": { opacity: 0.4 },
                }}
              >
                <ChevronLeft sx={{ fontSize: 16 }} />
              </IconButton>

              {/* First page + ellipsis */}
              {pageNums[0] > 1 && (
                <>
                  <PageBtn
                    n={1}
                    current={safePage}
                    onClick={() => setPage(1)}
                  />
                  {pageNums[0] > 2 && (
                    <Typography sx={{ fontSize: 12, color: G400, px: 0.5 }}>
                      …
                    </Typography>
                  )}
                </>
              )}

              {/* Visible page numbers */}
              {pageNums.map((n) => (
                <PageBtn
                  key={n}
                  n={n}
                  current={safePage}
                  onClick={() => setPage(n)}
                />
              ))}

              {/* Last page + ellipsis */}
              {pageNums[pageNums.length - 1] < totalPages && (
                <>
                  {pageNums[pageNums.length - 1] < totalPages - 1 && (
                    <Typography sx={{ fontSize: 12, color: G400, px: 0.5 }}>
                      …
                    </Typography>
                  )}
                  <PageBtn
                    n={totalPages}
                    current={safePage}
                    onClick={() => setPage(totalPages)}
                  />
                </>
              )}

              {/* Next */}
              <IconButton
                size="small"
                disabled={safePage === totalPages}
                onClick={() => setPage((p) => p + 1)}
                sx={{
                  width: 30,
                  height: 30,
                  borderRadius: "8px",
                  border: `1px solid ${G200}`,
                  background: WHITE,
                  color: safePage === totalPages ? G200 : G700,
                  "&:hover:not(:disabled)": {
                    background: G100,
                    borderColor: G400,
                  },
                  "&:disabled": { opacity: 0.4 },
                }}
              >
                <ChevronRight sx={{ fontSize: 16 }} />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>

      <style>{`
        @keyframes livePulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.25; }
        }
      `}</style>
    </Box>
  );
};
