import { useEffect,useState } from "react";
import { axiosInstance } from "../services/axios";
export function useCatalog(category, sortOrder){
     const [catalogList, setCatalog] = useState([]);
      const [isLoading, setLoading] = useState(false);
      const [isError, setError] = useState(false);
    
      useEffect(() => {
        async function getProducts() {
          try {
            setLoading(true);
            const endpoint = category ? `/Product?category=${category}`:`/Product`
            const response = await axiosInstance.get(endpoint);
            const data = response.data;
            let products = data.$values|| [];
            console.log(products)

            if (sortOrder === "asc") {
              products.sort((a, b) => a.price - b.price);
            } else if (sortOrder === "desc") {
              products.sort((a, b) => b.price - a.price);
            }
    
            setCatalog(products);

          } catch (error) {
            setError(true);
            console.error(error);
          } finally {
            setLoading(false);
          }
        }
        getProducts();
      }, [category,sortOrder]);
      console.log(catalogList);
    return {catalogList,isLoading,isError}
}