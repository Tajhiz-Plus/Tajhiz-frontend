import React from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import HomeHeader from "./components/HomeHeader";
import AdminAnalytics from "./components/AdminAnalytics";

function HomePage() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <HomeHeader />
      <AdminAnalytics />
    </DashboardLayout>
  );
}

export default HomePage;
