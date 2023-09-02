import React from "react";
import Header from "../../components/Header";
import { Box } from "@mui/material";
import PieChart from "../../components/PieChart";
import "./Dashboard.css";
import TasksPie from "../../components/TasksPie";
import MemberChart from "../../components/PieChart";

function Dashboard() {
  return (
    <Box m="20px ">
      <div className="dashboard-container">
        <div className="header">
          <Header title="DASHBOARD" />
        </div>
        <div className="pie-chart-container">
          <MemberChart />
          <div className="tasks-pie-container">
          <TasksPie  />
          </div>
          </div>
      </div>
    </Box>
  );
}

export default Dashboard;
