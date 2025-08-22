import { Box, Button } from "@mui/material";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import React from "react";

function CategoriesTableHeader({ search, setSearch, onSearchChange, addCategory }) {
  return (
    <MDBox
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      width="100%"
      p={3}
    >
      <MDBox width="12rem">
        <MDInput
          placeholder="Search..."
          value={search}
          size="small"
          fullWidth
          onChange={({ currentTarget }) => {
            setSearch(currentTarget.value);
            onSearchChange(currentTarget.value);
          }}
        />
      </MDBox>
      <Box>
        {" "}
        <Button
          variant="contained"
          sx={{ color: "#FFF" }}
          onClick={() => addCategory.onOpen()}
        >
          إضافة تصنيف
        </Button>
      </Box>
    </MDBox>
  );
}

export default CategoriesTableHeader;
