import { useState, useEffect } from "react";
import { axiosInstance } from "../services/axios";

export function useCart() {
  const [cartList, setCartList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      setIsLoading(false); 
      return;
    }

    const getCartItems = async () => {
      try {
        const response = await axiosInstance.get(`/Cart/${userId}`);
        setCartList(response.data.cartItems.$values);
      } catch (error) {
        console.error("Error fetching cart:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getCartItems();
  }, [userId]);

  return { cartList, isLoading, isError, setCartList };
}
