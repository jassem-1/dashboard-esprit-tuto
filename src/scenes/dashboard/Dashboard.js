import React from "react";
import Header from "../../components/Header";
import { Box } from "@mui/material";
import PieChart from "../../components/PieChart";
import "./Dashboard.css"

function Dashboard() {
  return (
    <Box m="20px ">
      <div className="dashboard-container">
      
        <div className="header">
       
          <Header title="DASHBOARD" />
        </div>
        <div className="pie-chart-container">
       
          <div className="small-pie-chart">
            <PieChart />
          </div>
        </div>
      </div>
    </Box>
  );
}

export default Dashboard;
