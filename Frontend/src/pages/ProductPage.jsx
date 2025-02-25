import Loader from "../components/shared/Loader";
import Error from "../components/shared/Error";
import { useProductInfo } from "../hooks/useProductInfo";
import ProductInfo from "../components/ProductInfo";
import { useParams } from "react-router-dom";

export default function ProductPage(){
    const {productInfo, isLoading,isError} = useProductInfo();
    console.log(productInfo)
    const {id} = useParams();
    console.log(id)

    return isLoading ? (
        <Loader />
      ) : isError ? (
        <Error />
      ) : productInfo ? (
        <ProductInfo imageUrl={productInfo.imageUrl} title={productInfo.title} price={productInfo.price} charct={productInfo.characteristics.$values} id = {id} quantity={productInfo.quantity}
        />
      ) : (
        null
      );
}