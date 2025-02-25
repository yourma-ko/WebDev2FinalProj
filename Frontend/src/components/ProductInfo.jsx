import { Paper, Box, Typography, Button, Container } from "@mui/material";
import { BsCart2 } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { axiosInstance } from "../services/axios";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/joy";
import { useState } from "react";
export default function ProductInfo({ imageUrl, title, price, charct, id, quantity }) {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [loading, setLoading] = useState(false);
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const isAuth = localStorage.getItem("isAuth");
  const handleDelete = async () => {
    try {
      const response = await axiosInstance.delete("/Product", {
        params: { id },
      });

      if (response.status === 200) {
        alert("Product deleted successfully!");
        navigate("/catalog");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert(
        error.response?.data?.message ||
          "Failed to delete the product. Try again."
      );
    }
  };

  const handleAddCart = async () => {
         if (!isAuth || isAuth === "false") {
            alert("You are not registered!");
            return;
         }
    try {
      const payload = {
        productId: id,
        title,
        price,
        quantity: 1,
        checked: true
      };

      const response = await axiosInstance.post(
        `/Cart/${userId}/items`,
        payload
      );
      alert("Product added to cart successfully!");
    } catch (error) {
      console.error(
        "Error adding product to cart:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <>
      <Container sx={{ py: 6 }}>
        <Paper elevation={6}>
          <Box
            sx={{
              backgroundColor: "white",
              display: "flex",
              justifyContent: "center",
              gap: 8,
              py: 4,
              px: 4,
              borderRadius: 3,
            }}
          >
            <img src={imageUrl} alt={title} className="product__img" />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                width: "520px",
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: "500", py: 4 }}>
                {title}
              </Typography>
              <Typography variant="h4">{price}₸</Typography>
              <br />
              <Typography variant="h5">In Stock: {quantity}x</Typography>
              <Button
                variant="contained"
                sx={{ marginTop: 6, display: "flex", gap: "12px" }}
                onClick={handleAddCart}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  <>
                    Add to Cart <BsCart2 />
                  </>
                )}
              </Button>
              {isAdmin && (
                <Button
                  variant="contained"
                  color="error"
                  sx={{ marginTop: 6, display: "flex", gap: "12px" }}
                  onClick={handleDelete}
                >
                  Delete Product <MdDelete />
                </Button>
              )}
            </Box>
          </Box>
        </Paper>
        <Paper elevation={6} sx={{ my: 8 }}>
          <Box sx={{ backgroundColor: "white", py: 4, px: 4, borderRadius: 3 }}>
            <Typography variant="h2" sx={{ fontWeight: "700", py: 4 }}>
              Characteristics
            </Typography>
            <ul className="product__items">
              {Array.isArray(charct) ? (
                charct.map((item, index) => {
                  const [name, value] = item.split(":");
                  return (
                    <li key={index} className="product__item">
                      <strong>{name}:</strong> {value}
                    </li>
                  );
                })
              ) : (
                <Typography variant="body1">
                  No characteristics available
                </Typography>
              )}
            </ul>
          </Box>
        </Paper>
      </Container>
    </>
  );
}
