import React from "react";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import orderImage from "assets/images/product-12.jpg";
import SAR from "assets/images/SAR.svg";
import { Box } from "@mui/material";

function OrderInfo({ orderItems }) {
  return (
    <Grid container spacing={3} alignItems="center">
      {orderItems.map((item) => (
        <Grid item xs={12} md={6} p={1}>
          <MDBox display="flex" alignItems="center">
            <MDBox mr={2}>
              <MDAvatar size="xl" src={orderImage} alt="Gold Glasses" />
            </MDBox>
            <MDBox lineHeight={1}>
              <MDTypography variant="h6" fontWeight="medium">
                {item?.product?.nameAr}
              </MDTypography>
              <Box
                mb={2}
                sx={{ display: "flex", alignItems: "center", gap: 0 }}
              >
                <MDTypography variant="button" color="text">
                  <span
                    style={{
                      fontWeight: 500,
                      color: "#000",
                    }}
                  >
                    السعر
                  </span>{" "}
                  :
                </MDTypography>
                <MDTypography variant="button" color="text">
                  {Number(item?.product?.price).toFixed(2)}
                </MDTypography>
                <img
                  src={SAR}
                  alt={"ريال"}
                  width={20}
                  height={20}
                  crossOrigin="anonymous"
                  loading="lazy"
                  style={{ marginBottom: 3 }}
                />
              </Box>
            </MDBox>
          </MDBox>
        </Grid>
      ))}
    </Grid>
  );
}

export default OrderInfo;
