/** 
  All of the routes for the page layout of Tajhiz are added here,
  You can add a new route, customize the routes and delete the routes here.

*/

import Profile from "layouts/Profile/Profile";
import { lazy } from "react";
const RolesEdit = lazy(() => import("layouts/RolesEdit/RolesEdit"));
const ProductPage = lazy(() =>
  import("layouts/ecommerce/products/product-page/ProductPage")
);

const pageRoutes = [
  { id: 1, name: "profile", route: "/profile", component: <Profile /> },
  { id: 1, name: "roles/:id", route: "/roles/:id", component: <RolesEdit /> },
  {
    id: 1,
    name: "roles/:id",
    route: "/products/:id",
    component: <ProductPage />,
  },
];

export default pageRoutes;
