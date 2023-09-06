import React from "react";
import Header from "../../components/Header";
import { Box, Grid } from "@mui/material";
import PieChart from "../../components/PieChart";
import "./Dashboard.css";
import TasksPie from "../../components/TasksPie";
import TeamMembersPie from "../../components/TeamMembersPie";
import MemberChart from "../../components/PieChart";
import BarPage from "../barChart/BarPage";
import Members from "../team/Members";
import NotesComponent from "../../components/NotesComponent";

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
          <div className="tasks-pie-container">
          <TeamMembersPie/>       
             </div>
             
          </div>
      <div className="first-row">
      <BarPage/>
      <NotesComponent/>
      </div>
      
          
      </div>
    </Box>
  );
}

export default Dashboard;


