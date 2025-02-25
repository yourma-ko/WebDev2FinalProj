import { Paper, Box, Typography, Container, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/userSlice";
import AdminPanel from "../components/AdminPanel";
import OrderItem from "../components/OrderItem";
import { useOrder } from "../hooks/useOrder";
import Loader from "../components/shared/Loader";
import Error from "../components/shared/Error";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orderList, isError, isLoading } = useOrder();
  const userName = localStorage.getItem("userName") || "Неизвестно";
  const userNumber = localStorage.getItem("userNumber") || "Неизвестно";
  const userEmail = localStorage.getItem("userEmail") || "Неизвестно";
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  console.log(orderList);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="page">
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Paper elevation={6}>
          <Box sx={{ backgroundColor: "white", py: 4, px: 4, borderRadius: 3 }}>
            <Typography variant="h2" sx={{ fontWeight: "700", py: 4 }}>
              Your Profile
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: "700", py: 2 }}>
              Name: {userName}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: "700", py: 2 }}>
              Number: {userNumber}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: "700", py: 2 }}>
              Email: {userEmail}
            </Typography>
            <Button
              variant="contained"
              color="error"
              sx={{ mt: 3 }}
              onClick={handleLogout}
            >
              LogOut
            </Button>
          </Box>
        </Paper>
        <Paper elevation={6}>
          <Box
            sx={{
              backgroundColor: "white",
              py: 4,
              px: 4,
              borderRadius: 3,
              my: 6,
            }}
          >
            <Typography variant="h2" sx={{ fontWeight: "700", py: 4 }}>
              {" "}
              Orders
            </Typography>
            <Box>
              {isLoading ? (
                <Loader />
              ) : isError ? (
                <Error />
              ) : (
                orderList.map((item, index) => {
              
                  const orderItems = item.orderItems?.$values || [];
                  const formattedDate = new Date(
                    item.orderDateTime
                  ).toLocaleString("ru-RU", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  });

                  return (
                    <OrderItem
                      key={index}
                      orderItems={orderItems} 
                      total={item.total}
                      createdAt={formattedDate}
                    />
                  );
                })
              )}
            </Box>
          </Box>
        </Paper>

        {isAdmin && <AdminPanel />}
      </Container>
    </div>
  );
}
