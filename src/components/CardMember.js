import React, { useEffect, useState } from 'react';
import "./CardMember.css"
import { IconButton,  Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


import { avatarImagePaths, loadAvatarImage } from '../utils/avatarImages';
const CardMember = ({ userId , teamId }) => {
    const [showAllTasks, setShowAllTasks] = useState(false);
    const [user, setUser] = useState(null);
    const toggleShowTasks = () => {
      setShowAllTasks(!showAllTasks);
    };
    useEffect(() => {
        fetch(`http://localhost:8080/users/${userId}`)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => setUser(data))
          .catch(error => console.error('Error fetching data:', error));
    }, [userId]);
    
    
      if (user === null) {
        return <div>Loading...</div>;
    }

      const visibleTasks = showAllTasks ? user?.assignedTasks : (user?.assignedTasks || []).slice(0, 0);
 
      const randomAvatarIndex = Math.floor(Math.random() * avatarImagePaths.length);

      const randomAvatarSrc = loadAvatarImage(randomAvatarIndex);

      const handleRemoveMember = () => {
        fetch(`http://localhost:8080/teams/${teamId}/removeMember/${userId}`, {
          method: 'DELETE'
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          setUser(null);
        })
        .catch(error => console.error('Error removing member:', error));
      };

  return (
    <div className="member-card">
    <IconButton  onClick={handleRemoveMember}>
    <CloseIcon className="remove-button" />
  </IconButton>
    <div className="image-container">
    <img className="rounded-image" src={randomAvatarSrc} alt="Profile" />
  </div>
     
      <div className="name">{user.name}{" "}{user.username}</div>
       <div className="tasks">
        <h3>Tasks:</h3>
        {user.assignedTasks.length === 0 ? (
            <p className='no-tasks-text'>No tasks for this member.</p>
          ) : (
            <ul>
              {visibleTasks.map((task, index) => (
                <li key={index}>
                  <strong>{task.name}</strong>
                </li>
              ))}
            </ul>
          )}
          {user.assignedTasks.length > 0 && (
            <button className="show-more-button" onClick={toggleShowTasks}>
              {showAllTasks ? 'Show Less' : 'Show Tasks'}
            </button>
          )}
      </div>
    </div>
  );
};

export default CardMember;
