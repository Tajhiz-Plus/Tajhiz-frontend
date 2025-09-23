import React from "react";
import { Grid, Icon, Tooltip } from "@mui/material";
import MDBadgeDot from "components/MDBadgeDot";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import DefaultLineChart from "examples/Charts/LineCharts/DefaultLineChart";
import ChannelsChart from "layouts/dashboards/sales/components/ChannelsChart/ChannelsChart";
import defaultLineChartData from "layouts/dashboards/sales/data/defaultLineChartData";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";
import DefaultStatisticsCard from "examples/Cards/StatisticsCards/DefaultStatisticsCard";

function AdminAnalytics() {
  return (
    <MDBox mb={3}>
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} sm={6} lg={4}>
          <ChannelsChart />
        </Grid>
        <Grid item xs={12} sm={6} lg={8}>
          <DefaultLineChart
            title="إحصائيات الطلبات الشهرية"
            description={
              <MDBox display="flex" justifyContent="space-between">
                <MDBox display="flex" ml={-1}>
                  <MDBadgeDot
                    color="info"
                    size="sm"
                    badgeContent="طلبات مكتملة"
                  />
                  <MDBadgeDot
                    color="primary"
                    size="sm"
                    badgeContent="طلبات جديدة"
                  />
                </MDBox>
                <MDBox mt={-4} mr={-1} position="absolute" right="1.5rem">
                  <Tooltip
                    title="See which ads perform better"
                    placement="left"
                    arrow
                  >
                    <MDButton
                      variant="outlined"
                      color="secondary"
                      size="small"
                      circular
                      iconOnly
                    >
                      <Icon>priority_high</Icon>
                    </MDButton>
                  </Tooltip>
                </MDBox>
              </MDBox>
            }
            chart={defaultLineChartData}
          />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} xl={4}>
          <DefaultInfoCard
            icon="account_balance"
            title="salary"
            description="Belong Interactive"
            value="+$2000"
          />
        </Grid>
        <Grid item xs={12} md={6} xl={4}>
          <DefaultInfoCard
            icon="account_balance"
            title="salary"
            description="Belong Interactive"
            value="+$2000"
          />
        </Grid>
        <Grid item xs={12} md={6} xl={4}>
          <DefaultInfoCard
            icon="paypal"
            title="paypal"
            description="Freelance Payment"
            value="$455.00"
          />
        </Grid>
      </Grid>
      <MDBox my={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <DefaultStatisticsCard
              title="customers"
              count="3.200"
              percentage={{
                color: "success",
                value: "+12%",
                label: "since last month",
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DefaultStatisticsCard
              title="avg. revenue"
              count="$1.200"
              percentage={{
                color: "secondary",
                value: "+$213",
                label: "since last month",
              }}
            />
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

export default AdminAnalytics;
