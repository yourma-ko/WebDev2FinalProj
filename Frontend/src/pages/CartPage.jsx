import { Container, Typography, Paper, Box, Button } from "@mui/material";
import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import { useCart } from "../hooks/useCart";
import Loader from "../components/shared/Loader";
import Error from "../components/shared/Error";
import { axiosInstance } from "../services/axios";

export default function CartPage() {
  const userId = localStorage.getItem("userId");
  const isAuth = useSelector((state) => state.user?.isAuth);
  const { cartList, isLoading, isError, setCartList } = useCart();
  
  // Функция для вычисления общего итога
  const calculateTotal = () => {
    return cartList.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  const handleCheckOut = async () => {
    if (!isAuth || !userId) {
      alert("You need to be logged in to make order.");
      return;
    }
    if (cartList.length === 0) {
      alert("Your cart is empty!");
    }
    try {
      const response = await axiosInstance.post(`Cart/${userId}/checkout`);
      if (response.status === 200) {
        alert("Order created successfully! Check your profile");
      }
    } catch (error) {
      alert(error.response.data);
      console.error("Error creating Order:", error);
    }
  };

  const handleClearCart = async () => {
    if (!isAuth || !userId) {
      alert("You need to be logged in to clear the cart.");
      return;
    }

    try {
      const response = await axiosInstance.delete(`/Cart/${userId}`);
      if (response.status === 200) {
        alert("Cart cleared successfully!");
        setCartList([]);
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
      alert(error.response?.data?.message || "Failed to clear the cart. Try again.");
    }
  };

  const handleItemDelete = (itemId) => {
    setCartList(cartList.filter((item) => item.productId !== itemId));
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    setCartList(
      cartList.map((item) =>
        item.productId === itemId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  return (
    <div className="page">
      <Container maxWidth="lg" sx={{ py: 24, height: "100%" }}>
        <Paper elevation={6}>
          <Box sx={{ backgroundColor: "white", py: 4, px: 4, borderRadius: 3 }}>
            <Typography variant="h2" sx={{ fontWeight: "700", py: 4 }}>
              Cart
            </Typography>
            <Box>
              {isLoading ? (
                <Loader />
              ) : isError ? (
                <Error />
              ) : !isAuth || !userId ? (
                <Typography variant="h5" sx={{ textAlign: "center", py: 4 }}>
                  You are not logged in. Your cart is empty.
                </Typography>
              ) : cartList && cartList.length > 0 ? (
                cartList.map((item) => (
                  <CartItem
                    key={item.productId}
                    title={item.title}
                    price={item.price}
                    itemQuantity={item.quantity}
                    id={item.productId}
                    onDelete={() => handleItemDelete(item.productId)}
                    onQuantityChange={handleQuantityChange}
                  />
                ))
              ) : (
                <Typography variant="h5" sx={{ textAlign: "center", py: 4 }}>
                  Cart is Empty.
                </Typography>
              )}
            </Box>
            <Typography variant="h4" sx={{ textAlign: "center", py: 4 }}>
              Total: {calculateTotal()} ₸
            </Typography>
          </Box>
          {isAuth && userId && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                py: 6,
                gap: 6,
              }}
            >
              <Button variant="contained" onClick={handleCheckOut}>
                Make Order
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={handleClearCart}
              >
                Clear Cart
              </Button>
            </Box>
          )}
        </Paper>
      </Container>
    </div>
  );
}
