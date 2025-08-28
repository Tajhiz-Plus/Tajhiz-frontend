import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Header from "layouts/ecommerce/orders/order-details/components/Header/Header";
import OrderInfo from "layouts/ecommerce/orders/order-details/components/OrderInfo";
import TrackOrder from "layouts/ecommerce/orders/order-details/components/TrackOrder";
import PaymentDetails from "layouts/ecommerce/orders/order-details/components/PaymentDetails";
import BillingInformation from "layouts/ecommerce/orders/order-details/components/BillingInformation";
import OrderSummary from "layouts/ecommerce/orders/order-details/components/OrderSummary";
import product from "assets/images/product-12.jpg";
import { useParams } from "react-router-dom";
import { useFetchOrderDetails } from "services/queries/Orders/useFetchOrderDetails";
import { orderData } from "layouts/Orders/utils/data";
import OrderDetailsSkeleton from "./components/OrderDetailsSkeleton/OrderDetailsSkeleton";

function OrderDetails() {
  const { id } = useParams();
  // const { data: order, isLoading } = useFetchOrderDetails(id);

  const order = orderData?.data?.orders.find((o) => String(o.id) === id);
  console.log(order);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {order ? (
        <MDBox my={6}>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} lg={8}>
              <Card>
                <MDBox pt={2} px={2}>
                  <Header order={order} />
                </MDBox>
                <Divider />
                <MDBox pt={1} pb={3} px={2}>
                  <MDBox mb={3}>
                    <OrderInfo />
                  </MDBox>
                  <Divider />
                  <MDBox mt={3}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6} lg={3}>
                        <TrackOrder />
                      </Grid>
                      <Grid item xs={12} md={6} lg={5}>
                        <PaymentDetails />
                        <MDBox mt={3}>
                          <BillingInformation />
                        </MDBox>
                      </Grid>
                      <Grid item xs={12} lg={3} sx={{ ml: "auto" }}>
                        <OrderSummary />
                      </Grid>
                    </Grid>
                  </MDBox>
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
      ) : (
        <OrderDetailsSkeleton />
      )}
    </DashboardLayout>
  );
}

export default OrderDetails;
