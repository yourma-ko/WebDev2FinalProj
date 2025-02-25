import { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser, loginUser } from "../redux/slices/userSlice";

export default function AuthPage() {
  const PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [isLogin, setIsLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [showAdminSwitch, setShowAdminSwitch] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    hashedpassword: "",
  });
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorText, setPasswordErrorText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAdminPasswordChange = (e) => {
    const value = e.target.value;
    setAdminPassword(value);
    if (value === PASSWORD) {
      setShowAdminSwitch(true);
    } else {
      setShowAdminSwitch(false);
    }
  };

  const validateForm = () => {
    let isValid = true;

    if (formData.hashedpassword.length < 2) {
      setPasswordError(true);
      setPasswordErrorText("Password is small lol");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorText("");
    }

    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
  
    if (validateForm()) {
      setLoading(true);
      try {
        if (!isLogin) {
          const userData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            hashedpassword: formData.hashedpassword,
            role: isAdmin ? 0 : 1 
          };
  
          await dispatch(registerUser(userData)).unwrap();
        } else {
          await dispatch(loginUser({
            email: formData.email,
            hashedpassword: formData.hashedpassword
          })).unwrap();
        }
        navigate("/catalog");
      } catch (error) {
        console.error("Error:", error);
        setErrorMessage(error || "Error in query");
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {

    console.log("PASSWORD from env:", PASSWORD);
  }, []);

  return (
    <Container maxWidth="md" sx={{ py: 10, display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Paper elevation={6}>
        <Box sx={{ backgroundColor: "white", py: 4, px: 6, borderRadius: 3 }}>
          <Typography variant="h3" sx={{ mb: 3 }}>
            {isLogin ? "Sign In 🆔" : "Register"}
          </Typography>

          {errorMessage && (
            <Typography color="error" sx={{ mb: 2 }}>
              {errorMessage}
            </Typography>
          )}

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <TextField
                  name="firstName"
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                  value={formData.firstName}
                  onChange={handleInputChange}
                />

                <TextField
                  name="lastName"
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </>
            )}

            {!isLogin && (
              <TextField
                name="phone"
                label="Phone"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                value={formData.phone}
                onChange={handleInputChange}
              />
            )}

            <TextField
              name="email"
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              required
              value={formData.email}
              onChange={handleInputChange}
            />

            <TextField
              name="hashedpassword"
              label="Password"
              variant="outlined"
              fullWidth
              margin="normal"
              required
              type="password"
              value={formData.hashedpassword}
              onChange={handleInputChange}
              error={passwordError}
              helperText={passwordErrorText}
            />

            {!isLogin && (
              <TextField
                name="adminPassword"
                label="Admin Password"
                variant="outlined"
                fullWidth
                margin="normal"
                type="password"
                value={adminPassword}
                onChange={handleAdminPasswordChange}
              />
            )}

            {!isLogin && showAdminSwitch && (
              <FormControlLabel
                control={
                  <Switch
                    checked={isAdmin}
                    onChange={(e) => setIsAdmin(e.target.checked)}
                  />
                }
                label="Admin🥶"
              />
            )}

            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              sx={{ mt: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : isLogin ? "Sign In" : "Register"}
            </Button>

            <Button
              variant="outlined"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              onClick={() => {
                setIsLogin(!isLogin);
                setFormData({
                  firstName: "",
                  lastName: "",
                  email: "",
                  phone: "",
                  hashedpassword: "",
                });
                setAdminPassword("");
                setShowAdminSwitch(false);
                setErrorMessage("");
                setPasswordError(false);
                setPasswordErrorText("");
              }}
            >
              {isLogin ? "Don't have an account? Register" : "Already Have an account? Sign In"}
            </Button>
          </form>
        </Box>
      </Paper>
    </Container>
  );
}