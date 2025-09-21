import { Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import React from "react";
import Card from "@mui/material/Card";
import { useFetchAnalyticsOverview } from "services/queries/dashboard/useFetchAnalytics";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

function SellerDashboard() {
  const {
    data: overviewAnalytics,
    isLoading: isLoadingOverviewAnalytics,
    refetch: refetchOverviewAnalytics,
  } = useFetchAnalyticsOverview();

  const overViewData = overviewAnalytics?.data?.stats;
  //   const analyticsProductsData = analyticsProducts?.data?.products;

  return (
    <MDBox py={3}>
      <MDBox mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} lg={4}>
            <ComplexStatisticsCard
              title="إجمالي المستخدمين"
              count={overViewData?.totalUsers}
              icon="group"
              isLoading={isLoadingOverviewAnalytics}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <ComplexStatisticsCard
              title="إجمالي المنتجات"
              count={overViewData?.totalProducts}
              icon="shopping_bag"
              isLoading={isLoadingOverviewAnalytics}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <ComplexStatisticsCard
              title="إجمالي الفئات"
              count={overViewData?.totalCategories}
              icon="category"
              isLoading={isLoadingOverviewAnalytics}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <ComplexStatisticsCard
              title="إجمالي المنتجات"
              count={overViewData?.totalProducts}
              icon="shopping_bag" // أيقونة المنتجات
              isLoading={isLoadingOverviewAnalytics}
            />
          </Grid>

          <Grid item xs={12} sm={6} lg={4}>
            <ComplexStatisticsCard
              title="إجمالي الفئات"
              count={overViewData?.totalCategories}
              icon="category" // أيقونة التصنيفات
              isLoading={isLoadingOverviewAnalytics}
            />
          </Grid>

          <Grid item xs={12} sm={6} lg={4}>
            <ComplexStatisticsCard
              title="إجمالي الطلبات"
              count={overViewData?.totalOrders}
              icon="shopping_cart" // أيقونة الطلبات
              isLoading={isLoadingOverviewAnalytics}
            />
          </Grid>

          <Grid item xs={12} sm={6} lg={4}>
            <ComplexStatisticsCard
              title="المنتجات النشطة"
              count={overViewData?.activeProducts}
              icon="check_circle" // أيقونة الصح
              isLoading={isLoadingOverviewAnalytics}
            />
          </Grid>

          <Grid item xs={12} sm={6} lg={4}>
            <ComplexStatisticsCard
              title="المنتجات المميزة"
              count={overViewData?.featuredProducts}
              icon="star" // أيقونة النجمة
              isLoading={isLoadingOverviewAnalytics}
            />
          </Grid>

          <Grid item xs={12} sm={6} lg={4}>
            <ComplexStatisticsCard
              title="المستخدمين الجدد"
              count={overViewData?.recentUsers}
              icon="person_add" // أيقونة إضافة مستخدم
              isLoading={isLoadingOverviewAnalytics}
            />
          </Grid>

          <Grid item xs={12} sm={6} lg={4}>
            <ComplexStatisticsCard
              title="الطلبات المعلقة"
              count={overViewData?.pendingOrders}
              icon="pending_actions" // أيقونة الطلبات المعلقة
              isLoading={isLoadingOverviewAnalytics}
            />
          </Grid>

          <Grid item xs={12} sm={6} lg={4}>
            <ComplexStatisticsCard
              title="الطلبات المكتملة"
              count={overViewData?.completedOrders}
              icon="done_all" // أيقونة مكتملة
              isLoading={isLoadingOverviewAnalytics}
            />
          </Grid>

          <Grid item xs={12} sm={6} lg={4}>
            <ComplexStatisticsCard
              title="إجمالي الإيرادات"
              count={`$${overViewData?.totalRevenue}`}
              icon="attach_money" // أيقونة الدولار
              isLoading={isLoadingOverviewAnalytics}
            />
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

export default SellerDashboard;
