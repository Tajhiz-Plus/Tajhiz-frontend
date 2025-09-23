import React from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import HomeHeader from "./components/HomeHeader";
import AdminAnalytics from "./components/AdminAnalytics";
import { useAuth } from "shared/hooks/useAuth";
import SellerAnalytics from "./components/SellerAnalytics";

function HomePage() {
  const { IS_ADMIN, IS_SUPER_ADMIN } = useAuth();
console.log(IS_ADMIN, IS_SUPER_ADMIN);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <HomeHeader />
      {IS_ADMIN || IS_SUPER_ADMIN ? <AdminAnalytics /> : <SellerAnalytics />}
    </DashboardLayout>
  );
}

export default HomePage;
