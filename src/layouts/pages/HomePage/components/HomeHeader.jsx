import React from "react";
import { Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard/ComplexStatisticsCard";

function HomeHeader() {
  return (
    <MDBox pb={3}>
      <MDBox mb={3} ml={1}>
        <MDTypography variant="h4" fontWeight="bold">
          إحصائيات الأداء
        </MDTypography>
      </MDBox>
      <MDBox mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox>
              <ComplexStatisticsCard
                icon="inventory"
                title="المنتجات المنشورة"
                count={281}
                percentage={{
                  color: "success",
                  amount: "+55%",
                  label: "عن الأسبوع الماضي",
                }}
              />
            </MDBox>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <MDBox>
              <ComplexStatisticsCard
                icon="inventory_2"
                title="المنتجات غير المنشورة"
                count="2,300"
                percentage={{
                  color: "error",
                  amount: "-3%",
                  label: "عن الشهر الماضي",
                }}
              />
            </MDBox>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <MDBox>
              <ComplexStatisticsCard
                icon="category"
                title="الفئات المنشورة"
                count="34k"
                percentage={{
                  color: "success",
                  amount: "+1%",
                  label: "عن الأمس",
                }}
              />
            </MDBox>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <MDBox>
              <ComplexStatisticsCard
                icon="category_outlined"
                title="الفئات غير المنشورة"
                count="91"
                percentage={{
                  color: "warning",
                  amount: "",
                  label: "تم التحديث الآن",
                }}
              />
            </MDBox>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <MDBox>
              <ComplexStatisticsCard
                icon="groups"
                title="عدد العملاء"
                count="+91"
                percentage={{
                  color: "info",
                  amount: "",
                  label: "تم التحديث الآن",
                }}
              />
            </MDBox>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <MDBox>
              <ComplexStatisticsCard
                icon="storefront"
                title="عدد البائعين"
                count="+91"
                percentage={{
                  color: "info",
                  amount: "",
                  label: "تم التحديث الآن",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

export default HomeHeader;
