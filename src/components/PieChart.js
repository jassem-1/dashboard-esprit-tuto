import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import { ArcElement, Chart } from 'chart.js';
Chart.register(ArcElement);

class PieChart extends Component {
  state = {
    pieChartData: {},
  };

  constructor(props) {
    super(props);
    this.fetchPieChartData = this.fetchPieChartData.bind(this);
  }

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

    const data = {
      labels: [
        'Users with tasks < 2',
        'Users with tasks 3-5',
        'Users with tasks > 5',
        'Users assigned to teams',
        'Users not assigned to teams',
      ],
      datasets: [
        {
          data: [
            pieChartData.usersWithTasksBelow2,
            pieChartData.usersWithTasksBetween3And5,
            pieChartData.usersWithTasksAbove5,
            pieChartData.usersAssignedToTeams,
            pieChartData.usersNotAssignedToTeams,
          ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(153, 102, 255, 0.7)',
          ],
        },
      ],
    };

  
    const options = {
        plugins: {
          tooltip: {
            callbacks: {
              label: (tooltipItem, data) => {
                const dataIndex = tooltipItem.index;
                const value = data.datasets[0].data[dataIndex];
                return `${data.labels[dataIndex]}: ${value}`;
              },
            },
          },
        },
        legend: {
          display: true,
          position: 'bottom',
        },
      };
  
      const legendData = {
        labels: data.labels,
        datasets: [
          {
            backgroundColor: data.datasets[0].backgroundColor,
          },
        ],
      };
    return (
      <div>
        <h2>Pie Chart</h2>
        <Pie data={data}/>
        <div style={{ flex: '1' }}>
        <ul>
          {legendData.labels.map((label, index) => (
            <li key={index}>
              <span
                style={{
                  display: 'inline-block',
                  width: '12px',
                  height: '12px',
                  backgroundColor: legendData.datasets[0].backgroundColor[index],
                  marginRight: '6px',
                }}
              ></span>
              {label}
            </li>
          ))}
        </ul>
      </div>
      </div>
    );
  }
}

export default PieChart;
