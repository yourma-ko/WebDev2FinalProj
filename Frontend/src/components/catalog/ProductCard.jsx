import { Card, CardMedia, Typography, CardContent } from "@mui/material";
import { Link } from "react-router-dom";
import { PRODUCT_PAGE } from "../../utils/consts";
export default function ProductCard({imageUrl, title,price, id}) {
  return (
    <Link className="card-link" to={PRODUCT_PAGE.replace(":id", id)}>
    <Card
      sx={{
        maxWidth: "100%", height:"100%",
        "&:hover": {
          elevation: 6,
        },
      }}
    >
      <CardMedia
      component="img"
        sx={{ height: 320, objectFit:"contain"}}
        image={imageUrl}
        title={title}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h4"
          component="div"
          sx={{ fontWeight: "600" }}
        >
          {price}₸
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "text.secondary", fontSize: "24px" }}
        >
          {title}
        </Typography>
      </CardContent>
    </Card>
    </Link>
  );
}
