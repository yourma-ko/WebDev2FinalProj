import { Box, Typography, Button } from "@mui/material";
import { axiosInstance } from "../services/axios";

export default function CartItem({ title, price, id, onDelete, itemQuantity, onQuantityChange }) {
  const userId = localStorage.getItem("userId");

  const handleChangeQuantity = async (changeValue) => {
    const newQuantity = itemQuantity + changeValue;

    if (newQuantity < 1) {
      alert("Quantity cannot be less than 1.");
      return;
    }

    onQuantityChange(id, newQuantity);

    try {
      await axiosInstance.post(
        `/Cart/${userId}/items/${id}/quantity`,
        changeValue,
        { headers: { "Content-Type": "application/json" } }
      );
    } catch (error) {
      onQuantityChange(id, itemQuantity);
      console.error("Error updating quantity:", error);
      alert(error.response?.data?.message || "Failed to update quantity. Try again.");
    }
  };

  const handleDelete = async () => {
    // Оптимистично удаляем из UI
    onDelete(id);

    try {
      const deletePayload = {
        productId: id,
        quantity: 0,
        price: price,
        title: title,
        checked: true
      };

      await axiosInstance.delete(`/Cart/${userId}/items`, {
        data: deletePayload,
        headers: { "Content-Type": "application/json" }
      });
    } catch (error) {
      console.error("Error deleting item:", error);
      // В случае ошибки можно добавить логику восстановления элемента
      alert(error.response?.data?.message || "Failed to delete item. Please try again.");
    }
  };

  return (
    <div className="cart__product">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          py: 6,
          px: 4,
        }}
      >
        <Typography sx={{ fontSize: "24px", fontWeight: "500" }}>
          {title}
        </Typography>
        <Box sx={{ alignItems: "center", textAlign: "center" }}>
          <Typography sx={{ py: 2, fontSize: 24 }}>{price} ₸</Typography>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box display="flex" alignItems="center" gap={2}>
              <Button
                variant="contained"
                sx={{ minWidth: 40 }}
                onClick={() => handleChangeQuantity(-1)}
              >
                -
              </Button>
              <Typography
                variant="h6"
                sx={{ minWidth: 30, textAlign: "center" }}
              >
                {itemQuantity}
              </Typography>
              <Button
                variant="contained"
                sx={{ minWidth: 40 }}
                onClick={() => handleChangeQuantity(1)}
              >
                +
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={handleDelete}
              >
                Delete
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
}