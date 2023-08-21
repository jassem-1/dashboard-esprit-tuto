import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import TeamComponent from '../../components/TeamComponent'

function TeamsPage() {
    const [teams, setTeams] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState(null);
    useEffect(() => {
        // Make an API call to fetch the list of teams
        fetch('http://localhost:8080/teams')
          .then(response => response.json())
          .then(data => setTeams(data))
          .catch(error => console.error('Error fetching teams:', error));
      }, []);
      const handleTeamChange = (event) => {
        setSelectedTeam(event.target.value);
      };

      

      return (
    <Box m="20px">
      <Header title="Teams"  />
      <Box height="75vh">
       <FormControl fullWidth>
          <InputLabel>Select a Team</InputLabel>
          <Select value={selectedTeam} onChange={handleTeamChange}>
            {teams.map(team => (
              <MenuItem key={team.id} value={team.id}>{team.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        {selectedTeam !== null && <TeamComponent teamId={selectedTeam} />}
      </Box>
    </Box>
  )
}

export default TeamsPage