import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  ToggleButtonGroup,
  ToggleButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Chip,
  Tooltip,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Edit,
  Delete,
  PersonAdd,
  AdminPanelSettings,
  Person,
  Shield,
  Close,
  CheckCircle,
  Block,
} from "@mui/icons-material";
import { deleteUser, getUser, registerUser, updateUser } from "../../api";

// ─── Color tokens (match your existing design) ───────────────────────────────
const WHITE = "#ffffff";
const BLACK = "#0f0f0f";
const G50 = "#f9fafb";
const G100 = "#f3f4f6";
const G200 = "#e5e7eb";
const G400 = "#9ca3af";
const G700 = "#374151";
const G900 = "#111827";
const O = "#f97316";
const O10 = "rgba(249,115,22,0.10)";
const GREEN = "#22c55e";
const GREEN_BG = "rgba(34,197,94,0.10)";
const RED = "#ef4444";
const RED_BG = "rgba(239,68,68,0.10)";
const BLUE = "#3b82f6";
const BLUE_BG = "rgba(59,130,246,0.10)";
const PURPLE = "#8b5cf6";
const PURPLE_BG = "rgba(139,92,246,0.10)";

// ─── Helpers ─────────────────────────────────────────────────────────────────
const initials = (name = "") =>
  name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const avPool = [
  { bg: O10, color: O },
  { bg: GREEN_BG, color: GREEN },
  { bg: BLUE_BG, color: BLUE },
  { bg: PURPLE_BG, color: PURPLE },
];
const avColor = (name = "") => avPool[name.charCodeAt(0) % avPool.length];

const PAGE_SIZE = 8;

// ─── Role Badge ───────────────────────────────────────────────────────────────
const RoleBadge = ({ role }) => {
  const map = {
    Admin: {
      bg: PURPLE_BG,
      color: PURPLE,
      icon: <AdminPanelSettings sx={{ fontSize: 12 }} />,
    },
    Manager: {
      bg: BLUE_BG,
      color: BLUE,
      icon: <Shield sx={{ fontSize: 12 }} />,
    },
    Editor: { bg: O10, color: O, icon: <Person sx={{ fontSize: 12 }} /> },
    Viewer: { bg: G100, color: G700, icon: <Person sx={{ fontSize: 12 }} /> },
  };
  const s = map[role] || map["Viewer"];
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
        px: 1.2,
        py: 0.4,
        borderRadius: "6px",
        background: s.bg,
        color: s.color,
        fontSize: 11,
        fontWeight: 700,
      }}
    >
      {s.icon}
      {role}
    </Box>
  );
};

// ─── Status Badge ─────────────────────────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const active = status === "Active";
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        px: 1.2,
        py: 0.4,
        borderRadius: "6px",
        background: active ? GREEN_BG : RED_BG,
        color: active ? GREEN : RED,
        fontSize: 11,
        fontWeight: 700,
      }}
    >
      <Box
        sx={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: active ? GREEN : RED,
          ...(active && { animation: "livePulse 2s infinite" }),
        }}
      />
      {status}
    </Box>
  );
};

// ─── Page Button ──────────────────────────────────────────────────────────────
const PageBtn = ({ n, current, onClick }) => (
  <IconButton
    size="small"
    onClick={onClick}
    sx={{
      width: 30,
      height: 30,
      borderRadius: "8px",
      border: `1px solid ${n === current ? BLACK : G200}`,
      background: n === current ? BLACK : WHITE,
      color: n === current ? WHITE : G700,
      fontSize: 12,
      fontWeight: 700,
      "&:hover": { background: n === current ? BLACK : G100 },
    }}
  >
    {n}
  </IconButton>
);

const ROLES = ["Admin", "User"];

const EMPTY_FORM = {
  name: "",
  email: "",
  password: "",
  role: "Viewer",
};

// ─── User Form Dialog ─────────────────────────────────────────────────────────
const UserFormDialog = ({ open, onClose, onSave, editUser }) => {
  const [form, setForm] = useState(editUser || EMPTY_FORM);

  React.useEffect(() => {
    setForm(editUser || EMPTY_FORM);
  }, [editUser, open]);

  const handle = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const inputSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
      fontSize: 13,
      background: G50,
      "& fieldset": { borderColor: G200 },
      "&:hover fieldset": { borderColor: O },
      "&.Mui-focused fieldset": { borderColor: O, borderWidth: 1.5 },
    },
    "& .MuiInputLabel-root.Mui-focused": { color: O },
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "18px",
          border: `1px solid ${G200}`,
          boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          pb: 1,
          pt: 2.5,
          px: 3,
        }}
      >
        <Box>
          <Typography sx={{ fontSize: 16, fontWeight: 800, color: G900 }}>
            {editUser ? "Edit User" : "Add New User"}
          </Typography>
          <Typography sx={{ fontSize: 12, color: G400 }}>
            {editUser
              ? "Update user details below"
              : "Fill in the details to create a new user"}
          </Typography>
        </Box>
        <IconButton size="small" onClick={onClose} sx={{ color: G400 }}>
          <Close sx={{ fontSize: 18 }} />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ px: 3, pt: 2, pb: 1 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            label="Full Name"
            value={form.name}
            onChange={handle("name")}
            fullWidth
            size="small"
            sx={inputSx}
          />
          <TextField
            label={editUser ? "New Password" : "Password"}
            value={editUser ? form.newpassword : form.password}
            onChange={handle(`${editUser ? "newpassword" : "password"}`)}
            fullWidth
            size="small"
            type="email"
            sx={inputSx}
          />
          <TextField
            label="Email Address"
            value={form.email}
            onChange={handle("email")}
            fullWidth
            size="small"
            type="email"
            sx={inputSx}
          />
          <Box sx={{ display: "flex", gap: 2 }}>
            <FormControl fullWidth size="small" sx={inputSx}>
              <InputLabel>Role</InputLabel>
              <Select
                value={form.role}
                label="Role"
                onChange={handle("role")}
                sx={{ borderRadius: "10px", fontSize: 13 }}
              >
                {ROLES.map((r) => (
                  <MenuItem key={r} value={r}>
                    {r}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2.5, gap: 1 }}>
        <Button
          onClick={onClose}
          sx={{
            borderRadius: "10px",
            fontSize: 13,
            fontWeight: 700,
            color: G700,
            border: `1px solid ${G200}`,
            px: 2.5,
            textTransform: "none",
            "&:hover": { background: G100 },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => onSave(form)}
          disabled={!form.name || !form.email}
          sx={{
            borderRadius: "10px",
            fontSize: 13,
            fontWeight: 700,
            background: BLACK,
            color: WHITE,
            px: 2.5,
            textTransform: "none",
            "&:hover": { background: "#1f1f1f" },
            "&:disabled": { opacity: 0.4 },
          }}
        >
          {editUser ? "Save Changes" : "Create User"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// ─── Delete Confirm Dialog ────────────────────────────────────────────────────
const DeleteDialog = ({ open, user, onClose, onConfirm }) => (
  <Dialog
    open={open}
    onClose={onClose}
    maxWidth="xs"
    fullWidth
    PaperProps={{ sx: { borderRadius: "18px", border: `1px solid ${G200}` } }}
  >
    <DialogTitle sx={{ pt: 3, px: 3, pb: 1 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 1,
        }}
      >
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: "14px",
            background: RED_BG,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Delete sx={{ color: RED, fontSize: 22 }} />
        </Box>
        <Typography sx={{ fontSize: 16, fontWeight: 800, color: G900 }}>
          Delete User
        </Typography>
        <Typography sx={{ fontSize: 12, color: G400 }}>
          Are you sure you want to delete <strong>{user?.name}</strong>? This
          action cannot be undone.
        </Typography>
      </Box>
    </DialogTitle>
    <DialogActions sx={{ px: 3, py: 2.5, gap: 1, justifyContent: "center" }}>
      <Button
        onClick={onClose}
        sx={{
          borderRadius: "10px",
          fontSize: 13,
          fontWeight: 700,
          color: G700,
          border: `1px solid ${G200}`,
          px: 3,
          textTransform: "none",
          "&:hover": { background: G100 },
        }}
      >
        Cancel
      </Button>
      <Button
        onClick={onConfirm}
        sx={{
          borderRadius: "10px",
          fontSize: 13,
          fontWeight: 700,
          background: RED,
          color: WHITE,
          px: 3,
          textTransform: "none",
          "&:hover": { background: "#dc2626" },
        }}
      >
        Delete
      </Button>
    </DialogActions>
  </Dialog>
);

// ─── Main Component ───────────────────────────────────────────────────────────
export const UserManagementComponent = () => {
  const [users, setUsers] = useState();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);

  const [formOpen, setFormOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast] = useState(null);

  const nextId = React.useRef(users?.length + 1);

  // ── Derived counts

  const viewers = users?.filter((u) => u.role === "User");
  const admins = users?.filter((u) => u.role === "Admin");

  // ── Filtered
  const filtered = users?.filter((u) => {
    const ok =
      filter === "all" ||
      (filter === "admin" && u.role === "Admin") ||
      (filter === "user" && u.role === "User");
    const q = search?.toLowerCase();
    return (
      ok &&
      (!q ||
        u?.name?.toLowerCase().includes(q) ||
        u?.email?.toLowerCase().includes(q) ||
        u?.role?.toLowerCase().includes(q))
    );
  });

  // ── Pagination
  const totalPages = Math.max(1, Math.ceil(filtered?.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageRows = filtered?.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );
  const startRow = filtered?.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1;
  const endRow = Math.min(safePage * PAGE_SIZE, filtered?.length);
  const pageNums = (() => {
    const delta = 2,
      range = [];
    for (
      let i = Math.max(1, safePage - delta);
      i <= Math.min(totalPages, safePage + delta);
      i++
    )
      range.push(i);
    return range;
  })();

  // ── CRUD handlers
  const openCreate = () => {
    setEditUser(null);
    setFormOpen(true);
  };
  const openEdit = (u) => {
    setEditUser(u);
    setFormOpen(true);
  };

  const handleSave = async (form) => {
    if (editUser) {
      console.log(editUser);
      delete form.__v
      console.log( );
      const userUpdateData = await updateUser(form, editUser._id);
      console.log(userUpdateData, "userUpdateData");
    //   setUsers((us) =>
    //     us.map((u) => (u.id === editUser.id ? { ...u, ...form } : u)),
    //   );
      setToast({ msg: "User updated successfully", severity: "success" });
    } else {
      const cretaeUserData = form;
      const userData = await registerUser(cretaeUserData);
      console.log(userData, "userData");
      //   setUsers((us) => [...us, { id: nextId.current++, ...form, joined }]);
      setToast({ msg: "User created successfully", severity: "success" });
    }
    setFormOpen(false);
    setPage(1);
  };

  const handleDelete = () => {
    const res = deleteUser(deleteTarget._id)
    console.log(res);
    setDeleteTarget(null);
    setToast({ msg: "User deleted successfully", severity: "success" });
  };

  const fetchData = () => {
    getUser()
      .then((res) => {
        setUsers(res);
      })
      .catch((err) => console.log(err));
  };

  // Polling mechanism: Fetch data periodically
  useEffect(() => {
    const pollingInterval = setInterval(fetchData, 2000);

    // Cleanup: Stop polling when the component unmounts
    return () => clearInterval(pollingInterval);
  }, []);

  const headings = ["User", "Role", "Joined", "Actions"];

  return (
    <>
      <style>{`@keyframes livePulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.4)} }`}</style>

      {/* ── Top action buttons (matching InvoiceTable style) */}
      <Box
        sx={{
          display: "flex",
          gap: "12px",
          mb: 3.5,
          flexWrap: { xs: "wrap", sm: "nowrap" },
        }}
      >
        <Box
          onClick={openCreate}
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 1,
            px: 2.5,
            py: 1.2,
            borderRadius: "12px",
            cursor: "pointer",
            background: BLACK,
            color: WHITE,
            fontSize: 13,
            fontWeight: 700,
            boxShadow: "0 2px 10px rgba(0,0,0,0.18)",
            transition: "all 0.15s",
            "&:hover": {
              background: "#1f1f1f",
              transform: "translateY(-1px)",
              boxShadow: "0 4px 16px rgba(0,0,0,0.22)",
            },
          }}
        >
          <PersonAdd sx={{ fontSize: 18 }} />+ Add New User
        </Box>
      </Box>

      {/* ── Main table card */}
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
              User Management
            </Typography>
            <Typography sx={{ fontSize: 12, color: G400 }}>
              {filtered?.length} of {users?.length} users shown
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
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search name, email, dept..."
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
              onChange={(_, v) => {
                if (v) {
                  setFilter(v);
                  setPage(1);
                }
              }}
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
              <ToggleButton value="all">All ({users?.length})</ToggleButton>
              <ToggleButton value="user">
                Users ({viewers?.length})
              </ToggleButton>
              <ToggleButton value="admin">
                Admins ({admins?.length})
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Box>

        {/* Table */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {headings?.map((h) => (
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
              {filtered?.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={headings?.length}
                    sx={{
                      textAlign: "center",
                      py: 7,
                      color: G400,
                      fontSize: 13,
                      border: "none",
                    }}
                  >
                    No users match your search
                  </TableCell>
                </TableRow>
              ) : (
                pageRows?.map((row) => {
                  const av = avColor(row.name);
                  return (
                    <TableRow
                      key={row.id}
                      sx={{
                        "&:hover": { background: G50 },
                        transition: "background 0.12s",
                      }}
                    >
                      {/* User */}
                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                          }}
                        >
                          <Avatar
                            sx={{
                              width: 36,
                              height: 36,
                              background: av?.bg,
                              color: av?.color,
                              fontSize: 13,
                              fontWeight: 800,
                            }}
                          >
                            {initials(row.name)}
                          </Avatar>
                          <Box>
                            <Typography
                              sx={{
                                fontSize: 13,
                                fontWeight: 700,
                                color: G900,
                              }}
                            >
                              {row.name}
                            </Typography>
                            <Typography sx={{ fontSize: 11, color: G400 }}>
                              {row.email}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>

                      {/* Role */}
                      <TableCell>
                        <RoleBadge role={row.role} />
                      </TableCell>

                      {/* Joined */}
                      <TableCell>
                        <Typography sx={{ fontSize: 12, color: G400 }}>
                          {new Date(row.createdAt).toLocaleString("en-PK", {
                            timeZone: "Asia/Karachi",
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </Typography>
                      </TableCell>

                      {/* Actions */}
                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            gap: 0.5,
                          }}
                        >
                          <Tooltip title="Edit User" arrow>
                            <IconButton
                              size="small"
                              onClick={() => openEdit(row)}
                              sx={{
                                width: 32,
                                height: 32,
                                borderRadius: "8px",
                                border: `1px solid ${G200}`,
                                background: WHITE,
                                color: G700,
                                "&:hover": {
                                  background: BLUE_BG,
                                  color: BLUE,
                                  borderColor: BLUE,
                                },
                                transition: "all 0.15s",
                              }}
                            >
                              <Edit sx={{ fontSize: 15 }} />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete User" arrow>
                            <IconButton
                              size="small"
                              onClick={() => setDeleteTarget(row)}
                              sx={{
                                width: 32,
                                height: 32,
                                borderRadius: "8px",
                                border: `1px solid ${G200}`,
                                background: WHITE,
                                color: G700,
                                "&:hover": {
                                  background: RED_BG,
                                  color: RED,
                                  borderColor: RED,
                                },
                                transition: "all 0.15s",
                              }}
                            >
                              <Delete sx={{ fontSize: 15 }} />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination Footer */}
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
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography sx={{ fontSize: 12, color: G400 }}>
              Showing{" "}
              <Box component="span" sx={{ fontWeight: 700, color: G700 }}>
                {startRow}–{endRow}
              </Box>{" "}
              of{" "}
              <Box component="span" sx={{ fontWeight: 700, color: G700 }}>
                {filtered?.length}
              </Box>{" "}
              users
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

          <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
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

            {pageNums.map((n) => (
              <PageBtn
                key={n}
                n={n}
                current={safePage}
                onClick={() => setPage(n)}
              />
            ))}

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

      {/* Dialogs */}
      <UserFormDialog
        open={formOpen}
        onClose={() => {
          setFormOpen(false);
          setEditUser(EMPTY_FORM);
        }}
        onSave={handleSave}
        editUser={editUser}
      />
      <DeleteDialog
        open={!!deleteTarget}
        user={deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />

      {/* Toast */}
      <Snackbar
        open={!!toast}
        autoHideDuration={3000}
        onClose={() => setToast(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          severity={toast?.severity || "success"}
          onClose={() => setToast(null)}
          sx={{ borderRadius: "12px", fontWeight: 600, fontSize: 13 }}
        >
          {toast?.msg}
        </Alert>
      </Snackbar>
    </>
  );
};
