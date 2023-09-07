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
import BarPageScnd from "../barChart/BarPageScnd";

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
      <Grid container spacing={2}>
      <Grid item xs={4}> 
      <BarPageScnd className="smaller-width" />
    </Grid>
    <Grid item xs={8}> 
      <NotesComponent />
    </Grid>
    </Grid>
      </div>
      
          
      </div>
    </Box>
  );
}

export default Dashboard;


