import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Header from "layouts/ecommerce/orders/order-details/components/Header/Header";
import TrackOrder from "layouts/ecommerce/orders/order-details/components/TrackOrder/OrdersOverview";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchOrderDetails } from "services/queries/Orders/useFetchOrderDetails";
import { orderData } from "layouts/Orders/utils/data";
import OrderDetailsSkeleton from "./components/OrderDetailsSkeleton/OrderDetailsSkeleton";
import OrderInfo from "./components/OrderInfo/OrderInfo";
import OrderSummary from "./components/OrderSummary/OrderSummary";
import CustomerInformation from "./components/CustomerInformation/CustomerInformation";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Box } from "@mui/material";

function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  // const { data: order, isLoading } = useFetchOrderDetails(id);

  const order = orderData?.data?.orders.find((o) => String(o.id) === id);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {order ? (
        <MDBox my={6}>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} lg={8}>
              <Box
                sx={{ display: "flex", alignItems: "center", mb: 2 }}
                onClick={() => navigate("/orders")}
              >
                {" "}
                <ChevronRightIcon
                  sx={{
                    width: 30,
                    height: 30,
                    color: "#090E2D",
                    cursor: "pointer",
                  }}
                />
              </Box>
              <Card>
                <MDBox pt={2} px={2}>
                  <Header order={order} />
                </MDBox>
                <Divider />
                <MDBox pt={1} pb={3} px={2}>
                  <MDBox mb={3}>
                    <OrderInfo orderItems={order?.orderItems} />
                  </MDBox>
                  <Divider />
                  <MDBox mt={3}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6} lg={3}>
                        <TrackOrder />
                      </Grid>
                      <Grid item xs={12} md={6} lg={5}>
                        <CustomerInformation customer={order?.user} />
                      </Grid>
                      <Grid item xs={12} lg={3} sx={{ mr: "auto" }}>
                        <OrderSummary order={order} />
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
