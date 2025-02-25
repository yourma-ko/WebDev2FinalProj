import {HOME_PAGE,CATAlOG_PAGE,ABOUT_PAGE,PROFILE_PAGE,AUTH_PAGE,NOT_FOUND_PAGE, CART_PAGE, PRODUCT_PAGE} from "./consts";
import MainPage from "../pages/MainPage";
import CatalogPage from "../pages/CatalogPage";
import AboutPage from "../pages/AboutPage";
import ProfilePage from "../pages/ProfilePage";
import AuthPage from "../pages/AuthPage";
import NotFoundPage from "../pages/NotFoundPage";
import CartPage from "../pages/CartPage";
import ProductPage from "../pages/ProductPage"
export const routes = [
    {path: HOME_PAGE, element:MainPage},
    {path: ABOUT_PAGE, element: AboutPage},
    {path: PROFILE_PAGE, element: ProfilePage},
    {path: AUTH_PAGE, element: AuthPage},
    {path: CATAlOG_PAGE, element: CatalogPage},
    {path:NOT_FOUND_PAGE, element: NotFoundPage},
    {path:PRODUCT_PAGE, element: ProductPage},
    {path:CART_PAGE, element:CartPage}
]