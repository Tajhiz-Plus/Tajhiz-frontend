import React from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useFetchProductDetails } from "services/queries/products/useFetchProductDetails";
import { useNavigate, useParams } from "react-router-dom";
import ProductSkeleton from "./components/ProductSkeleton/ProductSkeleton";
import ProductImages from "./components/ProductImages/ProductImages";
import ProductInfo from "./components/ProductInfo/ProductInfo";

function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: product, isLoading } = useFetchProductDetails(id);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {isLoading ? (
        <ProductSkeleton />
      ) : (
        <MDBox py={3}>
          <Card sx={{ overflow: "visible" }}>
            <MDBox p={3}>
              <MDBox mb={3}>
                <MDTypography variant="h5" fontWeight="medium">
                  تفاصيل المنتج
                </MDTypography>
              </MDBox>

              <Grid container spacing={3}>
                <Grid item xs={12} lg={6} xl={5}>
                  <ProductImages productImages={product?.data.images} />
                </Grid>
                <Grid item xs={12} lg={5} sx={{ mx: "auto" }}>
                  <ProductInfo product={product?.data} />
                </Grid>
              </Grid>
            </MDBox>
          </Card>
        </MDBox>
      )}
    </DashboardLayout>
  );
}

export default ProductPage;
