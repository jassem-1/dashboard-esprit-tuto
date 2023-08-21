import React, { useEffect, useState } from 'react';
import "./ProjectCard.css";

const ProjectCard = ({ projectId }) => {
  const [project, setProject] = useState(null);
  const [showAllTasks, setShowAllTasks] = useState(false);

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

  const visibleTasks = showAllTasks ? project.tasks : [];

  return (
    <div className="project-card">
      <div className="project-header">
        <div className="project-name">{project.name}</div>
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
        <h3>Tasks:</h3>
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
        <p className="no-tasks-text">No tasks for this project.</p>
      )}
    </div>
  );
};

export default ProjectCard;
