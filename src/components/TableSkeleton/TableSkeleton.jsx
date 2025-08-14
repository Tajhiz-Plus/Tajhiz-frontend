import React from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableRow,
  TableCell,
  Skeleton,
} from "@mui/material";
import MDBox from "components/MDBox";
import DataTableHeadCell from "examples/Tables/DataTable/DataTableHeadCell";

function TableSkeleton({
  table,
  rows = 10,
  isRTL = true,
  showHeader = true,
  dense = false,
}) {
  const columns = table?.columns ?? new Array(5).fill(null).map(() => ({}));
  const rowHeight = dense ? 36 : 56;

  return (
    <TableContainer
      sx={{ boxShadow: "none", direction: isRTL ? "rtl" : "ltr" }}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <Table sx={{ direction: "ltr" }}>
        {showHeader && (
          <MDBox component="thead">
            <TableRow>
              {columns.map((col, idx) => (
                <DataTableHeadCell
                  key={idx}
                  width={col.width || "auto"}
                  align={col.align || "left"}
                  sorted="none"
                >
                  <Skeleton
                    variant="text"
                    width={120}
                    height={20}
                    animation="wave"
                  />
                </DataTableHeadCell>
              ))}
            </TableRow>
          </MDBox>
        )}

        <TableBody>
          {Array.from({ length: rows }).map((_, r) => (
            <TableRow key={r}>
              {columns.map((_, c) => (
                <TableCell
                  key={c}
                  align="left"
                  sx={{
                    borderBottom: "1px solid",
                    borderColor: "divider",
                    height: rowHeight,
                  }}
                >
                  <Skeleton
                    variant="rectangular"
                    animation="wave"
                    height={16}
                    width={`${Math.max(30, 60 + ((c * 17 + r * 11) % 40))}%`}
                    sx={{ borderRadius: 1 }}
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableSkeleton;
