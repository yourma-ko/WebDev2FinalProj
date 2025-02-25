import { Box, Typography, Container } from "@mui/material";
import CatalogPanel from "../components/catalog/CatalogPanel";
import ProductCard from "../components/catalog/ProductCard";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import Dropdown from "@mui/joy/Dropdown";
import { useState } from "react";
import CatalogDecor from "../components/catalog/CatalogDecor";
import { useCatalog } from "../hooks/useCatalog";
import Loader from "../components/shared/Loader";
import Error from "../components/shared/Error";

export default function CatalogPage() {
  const [sortOrder, setSortOrder] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { catalogList, isLoading, isError } = useCatalog(
    selectedCategory,
    sortOrder
  );
  console.log(catalogList);
  return (
    <div className="page">
      <CatalogDecor />
      <CatalogPanel onCategorySelect={setSelectedCategory} />
      <Container>
        <Box sx={{ py: 4, display: "flex", justifyContent: "flex-end" }}>
          <Dropdown>
            <MenuButton size="lg">Sort By:</MenuButton>
            <Menu>
              <MenuItem onClick={() => setSortOrder("asc")}>
                Price Ascending
              </MenuItem>
              <MenuItem onClick={() => setSortOrder("desc")}>
                Price Descending
              </MenuItem>
            </Menu>
          </Dropdown>
        </Box>
        <div className="catalog__container">
          {isLoading ? (
            <Loader />
          ) : isError ? (
            <Error />
          ) : catalogList && catalogList.length > 0 ? (
            catalogList.map((item) => (
              <ProductCard
                key={item.id}
                imageUrl={item.imageUrl}
                title={item.title}
                price={item.price}
                id={item.id}
              />
            ))
          ) : (
            <Typography variant="h5" sx={{ textAlign: "center", py: 4 }}>
              No products available.
            </Typography>
          )}
        </div>
      </Container>
    </div>
  );
}
