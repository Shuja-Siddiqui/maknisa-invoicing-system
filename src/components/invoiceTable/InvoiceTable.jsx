import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  ToggleButtonGroup,
  ToggleButton,
  Avatar,
} from "@mui/material";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  NoteAdd,
  Article,
} from "@mui/icons-material";

import styled from "styled-components";
import { InvoiceButtonCard } from "../invoiceButtonCard";

export const StyledTableCell = styled(TableCell)({
  borderBottom: "1px solid #f98e0a",
  color: "#f98e0a",
});

export const WhiteTextTableCell = styled(TableCell)({
  color: "black",
});

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

// ─── Helpers ──────────────────────────────────────────────────────────────────
const initials = (n = "") =>
  n
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

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

export const InvoiceTable = ({
  data,
  headings = [],
  actions,
  tableHeadingText,
}) => {
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const PAGE_SIZE = 8;
  // ─── Derived stats ──────────────────────────────────────────────────────────
  const approved = data.filter((d) => d.Status === "Approve");
  const pending = data.filter(
    (d) => d.Status !== "Approve" && d.Status !== "Reject",
  );
  const rejected = data.filter((d) => d.Status === "Reject");

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

  return (
    <>
      <Box
        sx={{
          display: "flex",
          gap: "12px",
          mb: 3.5,
          flexWrap: {
            xs: "wrap",
            sm: "nowrap",
          },
        }}
      >
        <InvoiceButtonCard
          text={"+ ADD New"}
          path={"/invoice-form"}
          action={"newForm"}
          icon={<NoteAdd sx={{ fontSize: 18 }} />}
          variant="primary"
        />
        <InvoiceButtonCard
          text={"Draft Invoice"}
          path={"/drafts"}
          action={"draftForm"}
          icon={<Article sx={{ fontSize: 18 }} />}
          variant="secondary"
        />
      </Box>
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
              {tableHeadingText}
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
            {tableHeadingText !== "Draft Invoices" && (
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
            )}
          </Box>
        </Box>

        {/* Table */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {headings.map((h) => (
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
                pageRows.map((row) => (
                  <TableRow key={row._id}>
                    {headings.map((heading) => {
                      const key = heading;
                      // 🔥 Special cases handle karo
                      if (heading === "Client") {
                        const av = avColor(row.Client_Name);
                        return (
                          <TableCell key={heading}>
                            <Box sx={{ display: "flex", gap: 1.5 }}>
                              <Avatar sx={{ width: 34, height: 34 }}>
                                {initials(row.Client_Name)}
                              </Avatar>
                              <Box>
                                <Typography>{row.Client_Name}</Typography>
                                <Typography sx={{ fontSize: 11 }}>
                                  {row.Location}
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>
                        );
                      }

                      if (heading === "Status") {
                        return (
                          <TableCell key={heading}>
                            <Badge status={row.Status} />
                          </TableCell>
                        );
                      }

                      if (heading === "Actions") {
                        return (
                          <TableCell key={heading}>
                            <Box
                              sx={{ display: "flex", justifyContent: "center" }}
                            >
                              {actions(row).map((btn) => {
                                const isApproved = row.Status === "Approve";
                                const isRejected = row.Status === "Reject";

                                return (
                                  <IconButton
                                    key={btn.title}
                                    onClick={btn.fn}
                                    sx={{
                                      color:
                                        btn.title === "Approve" && isApproved
                                          ? "#16A34A" // ✅ green
                                          : btn.title === "Reject" && isRejected
                                            ? "#DC2626" // ✅ red
                                            : "",
                                      backgroundColor:
                                        btn.title === "Approve" && isApproved
                                          ? "rgba(22,163,74,0.10)"
                                          : btn.title === "Reject" && isRejected
                                            ? "rgba(220,38,38,0.10)"
                                            : "transparent",
                                      "&:hover": {
                                        backgroundColor:
                                          btn.title === "Approve"
                                            ? "rgba(22,163,74,0.15)"
                                            : btn.title === "Reject"
                                              ? "rgba(220,38,38,0.15)"
                                              : "rgba(0,0,0,0.05)",
                                      },
                                    }}
                                  >
                                    {btn.icon}
                                  </IconButton>
                                );
                              })}
                            </Box>
                          </TableCell>
                        );
                      }
                      // ✅ Default case
                      return (
                        <TableCell key={heading}>
                          {" "}
                          {row[key] ? row[key] : "_ "}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))
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
                <PageBtn n={1} current={safePage} onClick={() => setPage(1)} />
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
    </>
  );
};
