import { Box, Typography } from "@mui/material";

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

export const PaymentStatCard = ({
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

const getCurrencyMeta = (currency) => {
  return (
    paymentCurrencies.find((c) => c.value === currency) || {
      label: currency,
    }
  );
};