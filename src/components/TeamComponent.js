import React, { useEffect, useState } from 'react'
import CardMember from './CardMember';
import "./TeamComponent.css"
import { IconButton, Modal, FormControl, Select, MenuItem, Button, Paper, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';




function TeamComponent({ teamId }) {
    const [team, setTeam] = useState(null);
    const [availableUsers, setAvailableUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    fetch(`http://localhost:8080/teams/${teamId}`)
      .then(response => response.json())
      .then(data => setTeam(data))
      .catch(error => console.error('Error fetching team data:', error));

fetch(`http://localhost:8080/users/available`)
  .then(response => response.json())
  .then(data => setAvailableUsers(data))
  .catch(error => console.error('Error fetching available users:', error));


  }, [teamId]);
  if (!team) {
    return <div>Loading...</div>;
  }

  const handleAddMembersClick = () => {
    setIsModalOpen(true);
  };

  const handleUserChange = (event) => {
    setSelectedUser(event.target.value);
  };
  const handleAddUserToTeam = () => {
    if (selectedUser) {
      const updatedMembers = [...team.members, selectedUser];
      setTeam({ ...team, members: updatedMembers });

      fetch(`http://localhost:8080/teams/${teamId}/addUser/${selectedUser.id}`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(selectedUser),
      })
        .then(response => response.json())
        .then(updatedTeamData => {
          setTeam(updatedTeamData);
        })
        .catch(error => console.error('Error adding user to team:', error));


        setAvailableUsers(availableUsers.filter(user => user.id !== selectedUser.id));

      setIsModalOpen(false);
      setSelectedUser(null);
    }
  };

  return (
    <div>
    <h2>Team: {team.name}
    <IconButton style={{ color: 'grey',marginLeft:"20px",fontSize:"smaller" }} onClick={handleAddMembersClick}>
    Add Members  <AddCircleOutlineIcon /> 
   </IconButton>
    </h2>
    <div className="team-members">
    {team.members && team.members.length > 0 ? (
      team.members.map(member => (
        <div key={member.id} >
          <CardMember userId={member.id} teamId={team.id}/>
        </div>
      ))
    ) : (
      <p>No members in this team.</p>
    )}
  </div>
  <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="modal-center">
          <Paper elevation={3} className="modal-paper">
            <Typography variant="h6">Add Members to Team</Typography>
            <FormControl fullWidth>
              <Select value={selectedUser} onChange={handleUserChange}>
                <MenuItem value={null}>Select a User</MenuItem>
                {availableUsers.map(user => (
                  <MenuItem key={user.id} value={user}>{user.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button variant="contained" color="primary" onClick={handleAddUserToTeam}>Add User</Button>
            <Button variant="outlined" color="secondary" onClick={() => setIsModalOpen(false)}>Close</Button>

          </Paper>
        </div>
      </Modal>
  </div>
  )
}

export default TeamComponent