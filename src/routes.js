// Mixed route configuration: Dashboard flat, others collapsed
import Analytics from "layouts/dashboards/analytics";
import Sales from "layouts/dashboards/sales";
import ProfileOverview from "layouts/pages/profile/profile-overview";
import AllProjects from "layouts/pages/profile/all-projects";
import NewUser from "layouts/pages/users/new-user";
import Settings from "layouts/pages/account/settings";
import Billing from "layouts/pages/account/billing";
import Invoice from "layouts/pages/account/invoice";
import Timeline from "layouts/pages/projects/timeline";
import PricingPage from "layouts/pages/pricing-page";
import Widgets from "layouts/pages/widgets";
import RTL from "layouts/pages/rtl";
import Charts from "layouts/pages/charts";
import Notifications from "layouts/pages/notifications";
import Kanban from "layouts/applications/kanban";
import Wizard from "layouts/applications/wizard";
import DataTables from "layouts/applications/data-tables";
import Calendar from "layouts/applications/calendar";
import NewProduct from "layouts/ecommerce/products/new-product";
import EditProduct from "layouts/ecommerce/products/edit-product";
import ProductPage from "layouts/ecommerce/products/product-page";
import OrderList from "layouts/ecommerce/orders/order-list";
import OrderDetails from "layouts/ecommerce/orders/order-details";
import SignInBasic from "layouts/authentication/sign-in/basic";
import SignUpCover from "layouts/authentication/sign-up/cover";
import ResetCover from "layouts/authentication/reset-password/cover";
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "الرئيسية",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboards",
    component: <RTL />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "التصنيفات",
    key: "gategories",
    icon: <Icon fontSize="small">category</Icon>,
    route: "/categories",
    component: <Sales />,
    // noCollapse: true,
    collapse: [
      {
        name: "تصنيفات فرعي",
        key: "projects",
        noCollapse: true,
        icon: <Icon fontSize="small">apps</Icon>,
        route: "/categories",
        component: <Sales />,
      },
    ],
  },
  {
    type: "collapse",
    name: "الطلبات",
    key: "orders",
    icon: <Icon fontSize="small">apps</Icon>,
    route: "/orders",
    component: <Kanban />,
    // noCollapse: true,
    collapse: [
      {
        name: "الطلبات فرعي",
        key: "projects",
        noCollapse: true,
        icon: <Icon fontSize="small">apps</Icon>,
        route: "/orders",
        component: <Kanban />,
      },
    ],
  },
  {
    type: "collapse",
    name: "المستخدمين",
    key: "users",
    icon: <Icon fontSize="small">group</Icon>,
    route: "/users",
    component: <Timeline />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "الادوار",
    key: "roles",
    icon: <Icon fontSize="small">admin_panel_settings</Icon>,
    route: "/roles",
    component: <Timeline />,
    noCollapse: true,
  },
  // {
  //   type: "collapse",
  //   name: "Pages",
  //   key: "pages",
  //   icon: <Icon fontSize="small">image</Icon>,
  //   collapse: [
  //     {
  //       name: "Projects",
  //       key: "projects",
  //       collapse: [
  //         {
  //           name: "Timeline",
  //           key: "timeline",
  //           route: "/pages/projects/timeline",
  //           component: <Timeline />,
  //         },
  //       ],
  //     },
  //     {
  //       name: "Pricing Page",
  //       key: "pricing-page",
  //       route: "/pages/pricing-page",
  //       component: <PricingPage />,
  //     },
  //     { name: "RTL", key: "rtl", route: "/pages/rtl", component: <RTL /> },
  //     {
  //       name: "Widgets",
  //       key: "widgets",
  //       route: "/pages/widgets",
  //       component: <Widgets />,
  //     },
  //     {
  //       name: "Charts",
  //       key: "charts",
  //       route: "/pages/charts",
  //       component: <Charts />,
  //     },
  //     {
  //       name: "Notfications",
  //       key: "notifications",
  //       route: "/pages/notifications",
  //       component: <Notifications />,
  //     },
  //   ],
  // },
  // {
  //   type: "collapse",
  //   name: "Applications",
  //   key: "applications",
  //   icon: <Icon fontSize="small">apps</Icon>,
  //   collapse: [
  //     {
  //       name: "Kanban",
  //       key: "kanban",
  //       route: "/applications/kanban",
  //       component: <Kanban />,
  //     },
  //     {
  //       name: "Wizard",
  //       key: "wizard",
  //       route: "/applications/wizard",
  //       component: <Wizard />,
  //     },
  //     {
  //       name: "Data Tables",
  //       key: "data-tables",
  //       route: "/applications/data-tables",
  //       component: <DataTables />,
  //     },
  //     {
  //       name: "Calendar",
  //       key: "calendar",
  //       route: "/applications/calendar",
  //       component: <Calendar />,
  //     },
  //   ],
  // },
  // {
  //   type: "collapse",
  //   name: "Ecommerce",
  //   key: "ecommerce",
  //   icon: <Icon fontSize="small">shopping_basket</Icon>,
  //   collapse: [
  //     {
  //       name: "Products",
  //       key: "products",
  //       collapse: [
  //         {
  //           name: "New Product",
  //           key: "new-product",
  //           route: "/ecommerce/products/new-product",
  //           component: <NewProduct />,
  //         },
  //         {
  //           name: "Edit Product",
  //           key: "edit-product",
  //           route: "/ecommerce/products/edit-product",
  //           component: <EditProduct />,
  //         },
  //         {
  //           name: "Product Page",
  //           key: "product-page",
  //           route: "/ecommerce/products/product-page",
  //           component: <ProductPage />,
  //         },
  //       ],
  //     },
  //     {
  //       name: "Orders",
  //       key: "orders",
  //       collapse: [
  //         {
  //           name: "Order List",
  //           key: "order-list",
  //           route: "/ecommerce/orders/order-list",
  //           component: <OrderList />,
  //         },
  //         {
  //           name: "Order Details",
  //           key: "order-details",
  //           route: "/ecommerce/orders/order-details",
  //           component: <OrderDetails />,
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   type: "collapse",
  //   name: "Authentication",
  //   key: "authentication",
  //   icon: <Icon fontSize="small">content_paste</Icon>,

  //   collapse: [
  //     {
  //       name: "Sign In",
  //       key: "sign-in",
  //       route: "/authentication/sign-in/basic",
  //       component: <SignInBasic />,
  //     },
  //     {
  //       name: "Sign Up",
  //       key: "sign-up",
  //       route: "/authentication/sign-up/cover",
  //       component: <SignUpCover />,
  //     },
  //     {
  //       name: "Reset Password",
  //       key: "reset-password",
  //       collapse: [
  //         {
  //           name: "Cover",
  //           key: "cover",
  //           route: "/authentication/reset-password/cover",
  //           component: <ResetCover />,
  //         },
  //       ],
  //     },
  //   ],
  // },
];

export default routes;
