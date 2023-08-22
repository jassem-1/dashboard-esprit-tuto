import { Box, Grid, IconButton } from '@mui/material'
import  { useEffect, useState } from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import Header from '../../components/Header'
import ProjectCard from '../../components/ProjectCard';
import ProjectForm from '../../components/ProjectForm';




function ProjectsPage() {
    const [projects, setProjects] = useState([]);
    const [openProjectForm, setOpenProjectForm] = useState(false);
    const handleOpenProjectForm = () => {
        setOpenProjectForm(true);
      };
    
      const handleCloseProjectForm = () => {
        setOpenProjectForm(false);
      };
      const handleCreateProject = async (projectData) => {
        try {
          const response = await fetch('http://localhost:8080/projects', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(projectData),
          });
      
          if (!response.ok) {
            throw new Error('Failed to create project');
          }
      
          const createdProject = await response.json();
          // Update the projects list with the new project
          setProjects(prevProjects => [...prevProjects, createdProject]);
      
          handleCloseProjectForm(); // Close the project form dialog
        } catch (error) {
          console.error('Error creating project:', error);
        }
      };
      

    useEffect(() => {
      // Fetch all projects' data from the backend API
      fetch('http://localhost:8080/projects')
        .then(response => response.json())
        .then(data => setProjects(data))
        .catch(error => console.error('Error fetching projects:', error));
    }, []);

      const handleDeleteProject = (projectId) => {
    setProjects(projects.filter(project => project.id !== projectId));
  };
  
  return (
    <Box m="20px">
    <Header title="Projects"  />
    <IconButton style={{ color: 'white',fontSize:"small" }} onClick={handleOpenProjectForm}>
    Add a project<AddCircleOutlineIcon /> 
   </IconButton>
    <Box height="75vh">
    <Grid container spacing={3}>
    {projects.map(project => (
      <Grid item key={project.id} xs={12} sm={6} md={4} lg={3}>
        <ProjectCard projectId={project.id} onDelete={handleDeleteProject}/>
      </Grid>
    ))}
  </Grid>
    </Box>
    <ProjectForm open={openProjectForm} onClose={handleCloseProjectForm} onSubmit={handleCreateProject} />

  </Box>
  )
}

export default ProjectsPage