import { Container, Box, Typography, Button,Modal } from "@mui/material";
import { Link } from "react-router-dom";
import { CATAlOG_PAGE } from "../utils/consts";
import React from "react";
import mainLaptopsImg from "../assets/img/mainlaptops.png";
import deliveryImg from "../assets/img/delivery.png";
export default function MainPage() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  return (
    <main>
      <div className="page">
        
        <Container maxWidth="lg">
          <Box sx={{ display: "flex", paddingTop: 8 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center",
                textAlign: "left",
              }}
            >
              <Typography variant="h2" sx={{ fontWeight: "500" }}>
                Huge Choise of Electronics
              </Typography>
              <Typography
                variant="p"
                sx={{ fontWeight: "400", marginTop: 4, textAlign: "right" }}
              >
                Smartphones,Laptops, TVs and more!
              </Typography>
              <Link to={CATAlOG_PAGE} className="link">
                <Button variant="contained" sx={{ marginTop: 6 }}>
                  Check Catalog
                </Button>
              </Link>
            </Box>
            <Box>
              <img src={mainLaptopsImg} alt="Laptop" />
            </Box>
          </Box>
          <Box>
            <Box sx={{ display: "flex", paddingTop: 16, columnGap: "12",justifyContent:"space-between" }}>
              <Box>
                <img
                  src={deliveryImg}
                  alt="delivery"
                  className="delivery-image"
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="h2"
                  sx={{ fontWeight: "500", textAlign: "right" }}
                >
                  Delivery 
                </Typography>
                <Typography
                  variant="p"
                  sx={{ fontWeight: "400", marginTop: 6, textAlign: "right" }}
                >
                 We will deliver you anywhere in the world!
                </Typography>
                <Button variant="contained" sx={{ marginTop: 6 }} onClick={handleOpen}>
                Find out the terms of delivery
                </Button>
                <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          The terms of delivery
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Delivery in Kazakhstan: Free, Worldwide: depending on the total cost
          </Typography>
        </Box>
      </Modal>
              </Box>
            </Box>
          </Box>
        </Container>
      </div>
    </main>
  );
}
