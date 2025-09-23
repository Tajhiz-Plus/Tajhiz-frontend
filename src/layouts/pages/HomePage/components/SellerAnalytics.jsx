import { Grid } from "@mui/material";
import MDBox from "components/MDBox";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import reportsBarChartData from "layouts/dashboards/analytics/data/reportsBarChartData";
import React from "react";

function SellerAnalytics() {
  return (
    <MDBox>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <MDBox mb={3}>
            <ReportsBarChart
              color="success"
              title="website views"
              description="Last Campaign Performance"
              date="campaign sent 2 days ago"
              chart={reportsBarChartData}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <MDBox mb={3}>
            {/* <ReportsLineChart
              color="success"
              title="daily sales"
              description={
                <>
                  (<strong>+15%</strong>) increase in today sales.
                </>
              }
              date="updated 4 min ago"
              chart={sales}
            /> */}
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <MDBox mb={3}>
            {/* <ReportsLineChart
              color="success"
              title="completed tasks"
              description="Last Campaign Performance"
              date="just updated"
              chart={tasks}
            /> */}
          </MDBox>
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default SellerAnalytics;
