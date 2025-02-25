import { useState, useEffect } from "react";
import { axiosInstance } from "../services/axios";
export function useOrder(){
      const [orderList, setOrderList] = useState([]);
      const [isLoading, setIsLoading] = useState(true);
      const [isError, setIsError] = useState(false);
      const userId = localStorage.getItem("userId");
    
      useEffect(() => {
        if (!userId) {
          setIsLoading(false); 
          return;
        }
    
        const getOrderItems = async () => {
          try {
            const response = await axiosInstance.get(`/User/orders/${userId}`);
            setOrderList(response.data.$values);
          } catch (error) {
            console.error("Error fetching cart:", error);
            setIsError(true);
          } finally {
            setIsLoading(false);
          }
        };
    
        getOrderItems();
      }, [userId]);
    
      return { orderList, isLoading, isError, setOrderList };
    }
    