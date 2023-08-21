import React, { useState } from 'react'
import Header from '../../components/Header'
import { Box } from '@mui/material'
import BarChart from '../../components/BarChart'
import { UserData } from '../../data/barChartData';

function BarPage() {
    const [userData, setUserData] = useState({
        labels: UserData.map((data) => data.year),
        datasets: [
          {
            label: "Teams Productivity",
            data: UserData.map((data) => data.userGain),
            backgroundColor: [
              "rgba(75,192,192,1)",
            
            ],
            borderWidth: 2,
          },
        ],
      });
  return (
    <Box m="20px">
      <Header title="Bar Chart"  />
      <Box height="75vh">
        <BarChart chartData={userData}  />
      </Box>
    </Box>
  )
}

export default BarPage