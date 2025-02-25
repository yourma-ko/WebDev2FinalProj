import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Container,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { axiosInstance } from "../services/axios";
export default function AdminPanel() {
  const [productInfo, setProductInfo] = useState({
    title: "",
    price: 0,
    quantity: 0,
    imageUrl: "",
    createdAt: "",
    characteristics: [""],
    category: "",
  });
  const handleAddCharacteristic = () => {
    setProductInfo((prev) => ({
      ...prev,
      characteristics: [...prev.characteristics, ""],
    }));
  };
  const handleCharacteristicChange = (index, value) => {
    const updatedCharacteristics = [...productInfo.characteristics];
    updatedCharacteristics[index] = value;

    setProductInfo((prev) => ({
      ...prev,
      characteristics: updatedCharacteristics,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
         
          title: productInfo.title,
          price: Number(productInfo.price), 
          quantity: Number(productInfo.quantity),
          imageUrl: productInfo.imageUrl,
          createdAt: new Date().toISOString(), 
          characteristics: productInfo.characteristics,
          category: productInfo.category,
        
      };
  
      const response = await axiosInstance.post("/Product", payload);
      alert("Product created Successfuly!")
    } catch (error) {
      console.error(
        "Error creating product:",
        error.response ? error.response.data : error.message
      );
    }
  };
  return (
    <Paper elevation={6} sx={{ mt: 4 }}>
      <Box sx={{ backgroundColor: "white", py: 4, px: 4, borderRadius: 3 }}>
        <Typography variant="h2" sx={{ fontWeight: "700", py: 4 }}>
          Admin Panel
        </Typography>
        <Container>
          <Typography variant="h4" gutterBottom>
            Add Product
          </Typography>
          <form onSubmit={handleSubmit}>
            <div>
              <TextField
                label="Title"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                value={productInfo.title}
                onChange={(e) =>
                  setProductInfo({ ...productInfo, title: e.target.value })
                }
              />
            </div>

            <div>
              <TextField
                label="Price"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                type="number"
                value={productInfo.price}
                onChange={(e) =>
                  setProductInfo({ ...productInfo, price: e.target.value })
                }
              />
            </div>

            <div>
              <TextField
                label="Quantity"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                type="number"
                value={productInfo.quantity}
                onChange={(e) =>
                  setProductInfo({ ...productInfo, quantity: e.target.value })
                }
              />
            </div>

            <div>
              <TextField
                label="Image URL"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                value={productInfo.imageUrl}
                onChange={(e) =>
                  setProductInfo({ ...productInfo, imageUrl: e.target.value })
                }
              />
            </div>

            <div className="characteristics">
              {productInfo.characteristics.map((char, index) => (
                <TextField
                  key={index}
                  label={`Characteristic ${index + 1}`}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  multiline
                  value={char}
                  onChange={(e) =>
                    handleCharacteristicChange(index, e.target.value)
                  }
                />
              ))}
              <IconButton onClick={handleAddCharacteristic}>
                <FaPlusCircle />
              </IconButton>
            </div>

            <div>
              <TextField
                label="Category(Smartphones,Laptops,PC,Printers,TV)"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                value={productInfo.category}
                onChange={(e) =>
                  setProductInfo({ ...productInfo, category: e.target.value })
                }
              />
            </div>

            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              sx={{ mt: 2 }}
            >
              Create
            </Button>
          </form>
          
        </Container>
      </Box>
    </Paper>
  );
}
