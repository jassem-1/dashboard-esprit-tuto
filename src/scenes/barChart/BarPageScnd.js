import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area, Label } from 'recharts';
import { Box } from '@mui/material'


const BarPageScnd = () => {
  const [chartData, setChartData] = useState([]);
  const maxCompletedTaskCount = Math.max(...chartData.map(data => data.data));

  const tickValues = Array.from({ length: maxCompletedTaskCount + 3 }, (_, index) => index);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/teams/completed-task-count');
      const formattedData = response.data.map(item => ({
        label: item.teamName,
        data: item.completedTaskCount,
        totalTasks: item.totalTaskCount,
      }));
      setChartData(formattedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const teamLabel = payload[0].payload.label;
      const completedTasks = payload[0].value;
      const totalTasks = payload[0].payload.totalTasks;

      return (
        <div className="custom-tooltip">
          <p>{`Team: ${teamLabel}`}</p>
          <p>{`Completed Tasks: ${completedTasks}`}</p>
          <p>{`Total Tasks: ${totalTasks}`}</p>
        </div>
      );
    }

    return null;
  };
  return (
    <Box m="20px">
    <Box height="75vh">
    <BarChart width={550} height={400} data={chartData} margin={{ top: 40, right: 30, left: 70, bottom: 0 }}>
        <XAxis dataKey="label" />
        <YAxis ticks={tickValues}>
        <Label
        value="Completed Tasks"
        position="top"
        style={{ textAnchor: 'middle', fontSize: '15px', fontWeight: 'bold', color:"white" }}
      /></YAxis>
        <Tooltip content={<CustomTooltip />} />

        <Bar dataKey="data" fill="#6b6767" />
      </BarChart>
      </Box>
      </Box>
  );
};

export default BarPageScnd;
