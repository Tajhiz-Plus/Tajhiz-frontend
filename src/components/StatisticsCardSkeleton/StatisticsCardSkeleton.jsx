import React from "react";
import { Card, Divider, Skeleton, Box } from "@mui/material";

export default function StatisticsCardSkeleton() {
  return (
    <Card>
      <Box display="flex" justifyContent="space-between" pt={1} px={2}>
        {/* النصوص (العنوان + الرقم) */}
        <Box sx={{ lineHeight: 1.25, flex: 1, pr: 2 }}>
          <Skeleton variant="text" width={120} height={18} />
          <Skeleton variant="text" width={80} height={36} />
        </Box>

        {/* صندوق الأيقونة */}
        <Box
          sx={{
            width: "3.25rem",
            height: "3.25rem",
            borderRadius: 2,
          }}
        >
          <Skeleton variant="rounded" width="100%" height="100%" />
        </Box>
      </Box>

      <Divider sx={{ mb: 0 }} />

      {/* السطر السفلي (النسبة + التسمية) */}
      <Box py={1.5} px={2}>
        <Skeleton variant="text" width={150} height={18} />
      </Box>
    </Card>
  );
}
