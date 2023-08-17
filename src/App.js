import { useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";

import Dashboard from "./scenes/dashboard/Dashboard";
import Sidebar from "./scenes/global/Sidebar";
import Members from "./scenes/team/Members";
//import Invoices from "./scenes/invoices";
//import Contacts from "./scenes/contacts";
//import Bar from "./scenes/bar";
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
        <Topbar/>
        <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/members" element={<Members />} />

            </Routes>
        </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
