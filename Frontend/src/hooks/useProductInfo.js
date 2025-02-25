import { useEffect,useState } from "react";
import { axiosInstance } from "../services/axios";
import { useParams } from "react-router-dom";
export function useProductInfo(){
    const { id } = useParams();
    const [productInfo, setProductInfo] = useState();
    const [isLoading, setLoading] = useState(false);
    const [isError, setError] = useState(false);
    useEffect(() => {
      async function getProductInfo() {
        try {
          setLoading(true);
          const response = await axiosInstance.get(`/Product/${id}`);
          const data = response.data;
          setProductInfo(data);
          console.log(data);
        } catch (error) {
          setError(true);
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
      getProductInfo();
    }, [id]);
    return {productInfo, isLoading, isError}
}