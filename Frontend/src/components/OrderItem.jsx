import { Typography, Box } from "@mui/material";

export default function OrderItem({ orderItems = [], total, createdAt }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        py: 6,
        px: 4,
      }}
    >
      <ul className="order__items">
        {orderItems.length > 0 ? (
          orderItems.map((item, index) => (
            <li key={index} className="order__item">
              {item.title} <span className="order__quantity">x{item.quantity}</span>
            </li>
          ))
        ) : (
          <li className="order__item">Нет товаров</li>
        )}
      </ul>
      <Typography sx={{ fontWeight: "600", fontSize: "24px" }}>{total}₸</Typography>
      <Typography sx={{ fontWeight: "600", fontSize: "18px" }}>{createdAt}🕒</Typography>
    </Box>
  );
}
