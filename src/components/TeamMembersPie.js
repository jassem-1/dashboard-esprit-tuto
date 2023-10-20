import React, { Component } from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import axios from 'axios';

class TeamMembersPie extends Component {
  state = {
    pieChartData: [],
  };

  componentDidMount() {
    this.fetchTeamMemberData();
  }

  fetchTeamMemberData() {
    axios
      .get('http://localhost:8080/teams/members-less-than-three')
      .then((response1) => {
        const teamsWithMembersLessThanThree = response1.data.length;

        axios
          .get('http://localhost:8080/teams/members-between-four-and-seven')
          .then((response2) => {
            const teamsWithMembersBetweenFourAndSeven = response2.data.length;

            axios
              .get('http://localhost:8080/teams/members-more-than-seven')
              .then((response3) => {
                const teamsWithMembersMoreThanSeven = response3.data.length;

                this.setState({
                  pieChartData: [
                    { name: 'Teamms with less than 3 Members', value: teamsWithMembersLessThanThree },
                    { name: '4 to 7 Members', value: teamsWithMembersBetweenFourAndSeven },
                    { name: 'More than 7 Members', value: teamsWithMembersMoreThanSeven },
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
  const colors = ['#FF69B4', '#4B0082', '#FF4500', '#00BFFF'];
  return colors[index % colors.length];
};

export default TeamMembersPie;
