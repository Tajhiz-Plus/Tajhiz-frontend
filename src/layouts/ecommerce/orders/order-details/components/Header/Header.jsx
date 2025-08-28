import React from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

function Header({ order }) {
  return (
    <MDBox display="flex" justifyContent="space-between" alignItems="center">
      <MDBox>
        <MDBox mb={1}>
          <MDTypography variant="h6" fontWeight="medium">
            تفاصيل الطلب
          </MDTypography>
        </MDBox>
        <MDTypography component="p" variant="button" color="text">
          رقم الطلب. <b>{order?.orderNumber}</b>
        </MDTypography>
      </MDBox>
    </MDBox>
  );
}

export default Header;
