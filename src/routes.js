import Sales from "layouts/dashboards/sales";
import NewProduct from "layouts/ecommerce/products/new-product";
import Icon from "@mui/material/Icon";
import Dashboard from "layouts/Dashboard/Dashboard";
import Users from "layouts/Users/Users";
import Roles from "layouts/Roles/Roles";
import Products from "layouts/Products/Products";
import Orders from "layouts/Orders/Orders";
import Categories from "layouts/Categories/Categories";
import Permissions from "layouts/Permissions/Permissions";
import Reports from "layouts/Reports/Reports";

const routes = [
  {
    type: "collapse",
    name: "الرئيسية",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
    noCollapse: true,
    // protected: true,
  },
  {
    type: "collapse",
    name: "المنتجات",
    key: "products",
    route: "/products",
    icon: <Icon fontSize="small">shop</Icon>,
    component: <NewProduct />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "التصنيفات",
    key: "categories",
    icon: <Icon fontSize="small">category</Icon>,
    route: "/categories",
    component: <Categories />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "الطلبات",
    key: "orders",
    icon: <Icon fontSize="small">shopping_cart</Icon>,
    route: "/orders",
    component: <Orders />,
    noCollapse: true,
    // collapse: [
    //   {
    //     name: "الطلبات فرعي",
    //     key: "projects",
    //     noCollapse: true,
    //     icon: <Icon fontSize="small">apps</Icon>,
    //     route: "/orders",
    //     component: <Kanban />,
    //   },
    // ],
  },
  {
    type: "collapse",
    name: "إدارة المستخدمين",
    key: "users management",
    icon: <Icon fontSize="small">manage_accounts</Icon>,
    component: <Users />,
    collapse: [
      {
        name: "المستخدمين",
        key: "users",
        noCollapse: true,
        icon: <Icon fontSize="small">group</Icon>,
        route: "/users",
        component: <Users />,
      },
      {
        name: "الأدوار",
        key: "roles",
        noCollapse: true,
        icon: <Icon fontSize="small">admin_panel_settings</Icon>,
        route: "/roles",
        component: <Roles />,
      },
      {
        name: "الصلاحيات",
        key: "permissions",
        noCollapse: true,
        icon: <Icon fontSize="small">lock</Icon>,
        route: "/permissions",
        component: <Permissions />,
      },
    ],
  },
  {
    type: "collapse",
    name: "التقارير",
    key: "reports",
    icon: <Icon fontSize="small">assessment</Icon>,
    route: "/reports",
    component: <Reports />,
    noCollapse: true,
  },
];

export default routes;
