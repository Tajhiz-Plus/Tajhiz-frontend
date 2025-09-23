const defaultLineChartData = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  datasets: [
    {
      label: "Organic Search",
      color: "primary",
      data: [50, 40, 300, 220, 500, 250, 400, 230, 500 , 300, 400, 500],
    },
    {
      label: "Referral",
      color: "success",
      data: [30, 90, 40, 140, 290, 290, 340, 230, 400 , 200, 300, 400],
    },
    {
      label: "Direct",
      color: "primary",
      data: [40, 80, 70, 90, 30, 90, 140, 130, 200 , 100, 200, 300],
    },
  ],
};

export default defaultLineChartData;
