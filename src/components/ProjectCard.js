import React, { useEffect, useState } from 'react';
import "./ProjectCard.css";
import TaskForm from './TaskForm';
import { IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ProjectCard = ({ projectId, onDelete }) => {
  const [project, setProject] = useState(null);
  const [showAllTasks, setShowAllTasks] = useState(false);
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [availableUsers, setAvailableUsers] = useState([]); 
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);


  const handleShowConfirmDialog = () => {
    setShowConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setShowConfirmDialog(false);
  };
  useEffect(() => {
    fetch('http://localhost:8080/users/available')
      .then(response => response.json())
      .then(data => setAvailableUsers(data))
      .catch(error => console.error('Error fetching available users:', error));
  }, []);

  const handleOpenTaskForm = () => {
    setIsTaskFormOpen(true);
  };

  const handleCloseTaskForm = () => {
    setIsTaskFormOpen(false);
  };

  const handleTaskFormSubmit = ({ taskName, assigneeId, deadline, description }) => {
    const newTask = {
      name: taskName,
      description: description,
      deadline:deadline,
      assignee: { id: assigneeId }, 
      project: { id: projectId } 
    };

    fetch('http://localhost:8080/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTask)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      fetch(`http://localhost:8080/projects/${projectId}`)
      .then(response => response.json())
      .then(data => setProject(data))
      .catch(error => console.error('Error fetching project data:', error));
      handleCloseTaskForm(); 
    })
    .catch(error => console.error('Error creating task:', error));
  };






  useEffect(() => {
    fetch(`http://localhost:8080/projects/${projectId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setProject(data))
      .catch(error => console.error('Error fetching project data:', error));
  }, [projectId]);

  const toggleShowTasks = () => {
    setShowAllTasks(!showAllTasks);
  };

  if (!project) {
    return <div>Loading...</div>;
  }
  const handleDeleteProject = () => {
    fetch(`http://localhost:8080/projects/${projectId}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (response.ok) {
        onDelete(projectId);
      }
    })
    .catch(error => console.error('Error deleting project:', error));
  };

  const visibleTasks = showAllTasks ? project.tasks : [];

  return (
    <div className="project-card">
   
      <div className="project-header">
        <div className="project-name">{project.name}</div>
        <IconButton className="close-button" onClick={handleShowConfirmDialog}>
        <CloseIcon />
      </IconButton>
      </div>
      <p className='description-text'>Description:</p>
      <div className="project-description">{project.description}</div>
      <div className="dates">
        <p>Start Date: {project.startDate}</p>
        <p>End Date: {project.endDate}</p>
      </div>
      {project.tasks.length > 0 ? (
        <div className="tasks">
        <div className="tasks-header">
        <h3 className='tasks-display-text'>Tasks:
        <span className="add-task-text" onClick={handleOpenTaskForm}>Click here to add a task</span>

        </h3>
        <button className="see-more-button" onClick={toggleShowTasks}>
          {showAllTasks ? 'Hide Tasks' : 'See Tasks'}
        </button>
      </div>
          {showAllTasks && (
            <ul>
              {project.tasks.map((task, index) => (
                <li key={index}>
                  <strong className='task-name' >{task.name}</strong> - Assigned to: {task.assignee.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <p className="no-tasks-text">No tasks for this project.
        <span className="add-task-text" onClick={handleOpenTaskForm}>Click here to add a task</span>

        </p>
      )}
      <TaskForm
      open={isTaskFormOpen}
      onClose={handleCloseTaskForm}
      users={availableUsers}
      onSubmit={handleTaskFormSubmit}
    />
    <Dialog open={showConfirmDialog} onClose={handleCloseConfirmDialog}>
    <DialogTitle>Confirm Deletion</DialogTitle>
    <DialogContent>
      Are you sure you want to delete this project?
    </DialogContent>
    <DialogActions>
      <Button onClick={handleCloseConfirmDialog} sx={{color:"white"}} >
        Cancel
      </Button>
      <Button onClick={handleDeleteProject} sx={{color:"white"}}>
        Delete
      </Button>
    </DialogActions>
  </Dialog>
    </div>
  );
};

export default ProjectCard;
