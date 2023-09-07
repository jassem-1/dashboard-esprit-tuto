import { useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";

import Dashboard from "./scenes/dashboard/Dashboard";
import Sidebar from "./scenes/global/Sidebar";
import Members from "./scenes/team/Members";
import Calendar from "./scenes/calendar/Calendar";
//import Invoices from "./scenes/invoices";
//import Contacts from "./scenes/contacts";
import BarPage from "./scenes/barChart/BarPage";
import TeamsPage from "./scenes/team/TeamsPage";
import ProjectsPage from "./scenes/projects/ProjectsPage";
import ChatPage from "./scenes/chatroom/ChatPage";
//import Form from "./scenes/form";
//import Line from "./scenes/line";
//import Pie from "./scenes/pie";
//import FAQ from "./scenes/faq";

//import Calendar from "./scenes/calendar/calendar";

function App() {

  const [theme,colorMode]=useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
      <CssBaseline/>
        <div className="app">
        <Sidebar/>
        <main className="content">
        <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/members" element={<Members />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/bar" element={<BarPage />} />
              <Route path="/teams" element={<TeamsPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/chat" element={<ChatPage />} />





            </Routes>
          
        </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
