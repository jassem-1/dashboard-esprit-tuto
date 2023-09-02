import React, { Component } from 'react';
import axios from 'axios';
import { PieChart, Pie, Legend, Cell, Tooltip } from 'recharts';

class MemberChart extends Component {
  state = {
    pieChartData: {},
  };

  componentDidMount() {
    this.fetchPieChartData();
  }

  fetchPieChartData() {
    axios
      .get('http://localhost:8080/users/pieChartData')
      .then((response) => {
        const data = response.data;
        this.setState({ pieChartData: data });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const { pieChartData } = this.state;

    const data = [
      {
        name: 'members with tasks < 2',
        value: pieChartData.usersWithTasksBelow2,
      },
      {
        name: 'members with tasks 3-5',
        value: pieChartData.usersWithTasksBetween3And5,
      },
      {
        name: 'members with tasks > 5',
        value: pieChartData.usersWithTasksAbove5,
      },
      {
        name: 'members assigned to teams',
        value: pieChartData.usersAssignedToTeams,
      },
      {
        name: 'members not assigned to teams',
        value: pieChartData.usersNotAssignedToTeams,
      },
    ];

    const colors = ['#FF6361', '#BC5090', '#FFA600', '#003F5C', '#665191']; // Define custom colors

    return (
      <div>
        <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    );
  }
}

export default MemberChart;
