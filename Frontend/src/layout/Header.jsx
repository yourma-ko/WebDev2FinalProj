import { ShoppingCart } from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { AppBar, IconButton, Toolbar, Button } from "@mui/material";
import { 
  HOME_PAGE, 
  CATAlOG_PAGE, 
  ABOUT_PAGE, 
  CART_PAGE, 
  PROFILE_PAGE,
  AUTH_PAGE 
} from "../utils/consts";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const isAuth = useSelector((state) => state.user.isAuth);

  return (
    <AppBar position="relative" sx={{ bgcolor: "transparent" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "center", gap: 6 }}>
        <Button 
          variant="text"  
          size="medium" 
          sx={{
            color: "black", 
            fontWeight: 700, 
            fontSize: "medium", 
            textDecoration: "none"
          }}
        >
          <Link to={HOME_PAGE} className="link">
            Main
          </Link>
        </Button>
        
        <Button 
          variant="text"  
          size="medium" 
          sx={{
            color: "black", 
            fontWeight: 700, 
            fontSize: "medium"
          }}
        >
          <Link to={CATAlOG_PAGE} className="link">
            Catalog
          </Link>
        </Button>
        
        <Button 
          variant="text"  
          size="medium" 
          sx={{
            color: "black", 
            fontWeight: 700, 
            fontSize: "medium"
          }}
        >
          <Link to={ABOUT_PAGE} className="link">
            About Us
          </Link>
        </Button>
        
        <IconButton>
          <Link to={CART_PAGE} className="link">
            <ShoppingCart />
          </Link>
        </IconButton>
        
        <IconButton>
          <Link to={isAuth ? PROFILE_PAGE : AUTH_PAGE} className="link">
            <AccountCircleIcon />
          </Link>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}