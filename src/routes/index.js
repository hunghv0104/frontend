import Product from "../components/Product";
 import Login from "../components/Login";

export const routes = [
    {
        path: '/',
        page: Login,
        isShowHeader: true
    },
    {
        path: '/product',
        page: Product,
        isShowHeader: true
    },
    // {
    //     path: '*',
    //     page: NotFoundPage
    // }
]