import { Box, Button } from "@mui/material"
import { Link } from "react-router-dom"
export default function CatalogPanel({onCategorySelect}){
  const categories = ["Smartphones", "Laptops", "PC", "Printers", "TV"];
    return(
        <Box sx={{display:"flex", justifyContent:"center", gap:8, py:2, bgcolor:"white"} }>
            {categories.map((category) => (
        <Button
          key={category}
          variant="text"
          size="medium"
          sx={{ color: "black", fontWeight: 700, fontSize: "medium", textDecoration: "none" }}
          onClick={() => onCategorySelect(category)}
        >
          <Link className="link">{category}</Link>
        </Button>
      ))}
            </Box>
    )
}