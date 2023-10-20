import React, { Component } from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import axios from 'axios';

class TasksPie extends Component {
  state = {
    pieChartData: [],
  };

  componentDidMount() {
    this.fetchPieChartData();
  }

  fetchPieChartData() {
    axios
      .get('http://localhost:8080/tasks/completed-count')
      .then((response) => {
        const completedTaskCount = response.data;
        axios
          .get('http://localhost:8080/tasks/uncompleted-count')
          .then((response) => {
            const uncompletedTaskCount = response.data;
            axios
              .get('http://localhost:8080/tasks/unassigned-count')
              .then((response) => {
                const unassignedTaskCount = response.data;
                this.setState({
                  pieChartData: [
                    { name: 'Completed Tasks', value: completedTaskCount },
                    { name: 'Uncompleted Tasks', value: uncompletedTaskCount },
                    { name: 'Unassigned Tasks', value: unassignedTaskCount },
                  ],
                });
              })
              .catch((error) => {
                console.error(error);
              });
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const { pieChartData } = this.state;

    return (
      <div>
        <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={pieChartData}
            cx={200}
            cy={200}
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {pieChartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getColor(index)} />
            ))}
          </Pie>
          <Legend />
          <Tooltip />
        </PieChart>
      </div>
    );
  }
}

const getColor = (index) => {
  const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];
  return colors[index % colors.length];
};

export default TasksPie;
