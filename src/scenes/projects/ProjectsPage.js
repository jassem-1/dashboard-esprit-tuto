import { Box } from '@mui/material'
import React from 'react'
import Header from '../../components/Header'
import ProjectCard from '../../components/ProjectCard';

function ProjectsPage() {
    const projectId = 1;
  return (
    <Box m="20px">
    <Header title="Projects"  />
    <Box height="75vh">
    <ProjectCard projectId={projectId} />
    </Box>
  </Box>
  )
}

export default ProjectsPage